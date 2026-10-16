import assert from 'node:assert/strict';
import test from 'node:test';
import { attachFormVisibility, buildFormVisibilityScope, extractLibraryImports, resolveLibrarySymbol } from './library-resolution.mjs';

const common = {
  id: 'lib-common',
  name: 'libCommon',
  source: '',
  exports: ['funcPutExecLog', 'funcStartExecLog', 'funcOnErrorMsg'].map(name => ({ id: name, name, hasImplementation: true, visibility: 'PUBLIC' })),
};

function resolve(symbol, source = 'Dependencies: libCommon\nCall funcPutExecLog()', options = {}) {
  return resolveLibrarySymbol({ symbol, owner: { id: 'agent-1', source }, libraries: [common], ...options });
}

test('exported Dependencies metadata resolves all three logging helpers', () => {
  for (const symbol of ['funcPutExecLog', 'funcStartExecLog', 'funcOnErrorMsg']) {
    const result = resolve(symbol);
    assert.equal(result.resolutionStatus, 'RESOLVED');
    assert.equal(result.resolvedByDependencyMetadata, true);
    assert.equal(result.resolvedLibrary, 'libCommon');
    assert.equal(result.resolutionMethod, 'DEPENDENCY_METADATA');
    assert.equal(result.targetId, symbol);
    assert.deepEqual(result.visibilityPath, ['agent-1', 'lib-common']);
    assert.equal(result.visibilityEvidence[0].startOffset, 0);
  }
});

test('Use and dependency metadata merge without duplicating implementations', () => {
  const result = resolve('FUNCPUTEXECLOG', 'Use "libCommon"\nDependencies: LIBCOMMON');
  assert.equal(result.resolutionStatus, 'RESOLVED');
  assert.equal(result.resolvedByDependencyMetadata, false);
  assert.equal(result.resolutionMethod, 'USE_IMPORT');
  assert.equal(result.candidateIds.length, 1);
});

test('structured exported dependencies establish visibility with metadata provenance', () => {
  const result = resolve('funcPutExecLog', '', { owner: { id: 'agent-1', source: '', dependencies: ['libCommon'] } });
  assert.equal(result.resolvedByDependencyMetadata, true);
  assert.equal(result.visibilityEvidence[0].metadataIndex, 0);
});

test('comments and string literals never establish dependency visibility', () => {
  for (const source of [
    "' Dependencies: libCommon",
    '%REM\nDependencies: libCommon\n%END REM',
    'REM {Dependencies: libCommon}',
    'value = |\nDependencies: libCommon\nUse "libCommon"\n|',
  ]) {
    assert.deepEqual(extractLibraryImports(source), []);
    assert.equal(resolve('funcPutExecLog', source).resolutionStatus, 'UNRESOLVED');
  }
});

test('transitive imports follow metadata and Use edges with cycle protection', () => {
  const bridge = { id: 'bridge', name: 'Bridge', source: 'Use "libCommon"', exports: [] };
  const cyclicCommon = { ...common, source: 'Dependencies: Bridge' };
  const result = resolve('funcPutExecLog', 'Dependencies: Bridge', { libraries: [bridge, cyclicCommon] });
  assert.equal(result.resolutionStatus, 'RESOLVED');
  assert.equal(result.resolutionMethod, 'TRANSITIVE_LIBRARY_IMPORT');
  assert.equal(result.resolvedByDependencyMetadata, true);
  assert.deepEqual(result.visibilityPath, ['agent-1', 'bridge', 'lib-common']);
});

test('local and same-owner declarations take precedence over imported exports', () => {
  const definition = { id: 'local-put', name: 'funcPutExecLog' };
  assert.equal(resolve('funcPutExecLog', undefined, { localDeclarations: [definition] }).resolutionMethod, 'LOCAL_DECLARATION');
  assert.equal(resolve('funcPutExecLog', undefined, { sameOwnerDeclarations: [definition] }).resolutionMethod, 'SAME_OWNER_DECLARATION');
});

test('multiple visible implementations are ambiguous, not missing', () => {
  const alternative = { ...common, id: 'alternative', name: 'Alternative', exports: [{ id: 'other-put', name: 'funcPutExecLog', hasImplementation: true }] };
  const result = resolve('funcPutExecLog', 'Dependencies: libCommon, Alternative', { libraries: [common, alternative] });
  assert.equal(result.resolutionStatus, 'AMBIGUOUS');
  assert.equal(result.resolutionMethod, 'AMBIGUOUS');
  assert.equal(result.targetId, null);
  assert.deepEqual(result.candidateIds, ['funcPutExecLog', 'other-put']);
});

test('invisible, private, and declaration-only exports do not resolve calls', () => {
  assert.equal(resolve('funcPutExecLog', '').resolutionStatus, 'UNRESOLVED');
  for (const definition of [
    { id: 'private', name: 'funcPutExecLog', visibility: 'PRIVATE' },
    { id: 'declared', name: 'funcPutExecLog', hasImplementation: false },
    { id: 'unknown', name: 'funcPutExecLog' },
  ]) {
    assert.equal(resolve('funcPutExecLog', undefined, { libraries: [{ ...common, exports: [definition] }] }).resolutionStatus, 'UNRESOLVED');
  }
});

test('built-ins are checked after visible declarations and libraries', () => {
  const result = resolve('MsgBox', '', { builtins: [{ id: 'builtin-msgbox', name: 'MsgBox' }] });
  assert.equal(result.resolutionMethod, 'BUILTIN');
  assert.equal(result.resolvedLibrary, null);
});

test('metadata accepts quoted names and preserves multiple header/import occurrences', () => {
  const source = 'Dependencies: "libCommon", "Library With Spaces"; Other\nUse "libCommon"';
  assert.deepEqual(extractLibraryImports(source).map(imported => imported.libraryName), ['libCommon', 'libCommon', 'Library With Spaces', 'Other']);
});

test('each form export surface supplies visibility to functions, events, actions, and routines', () => {
  const symbols = ['funcReturnMsg', 'funcOnErrorMsg', 'funcChkDate', 'clsAddressInfo'];
  const definitions = { ...common, exports: symbols.map(name => ({ id: name, name, hasImplementation: true, visibility: 'PUBLIC' })) };
  const surfaces = [
    { ImportedLibraries: ['libCommon'] },
    { LotusScriptOccurrences: [{ Event: 'options', Source: 'Use "libCommon"' }] },
    { LotusScriptOccurrences: [{ event: 'options', source: 'Use "libCommon"' }] },
    { LotusScripts: ['Form Script[options]:\nUse "libCommon"'] },
  ];
  for (const form of surfaces) {
    const scope = buildFormVisibilityScope(form, { id: 'form-1', jsonPointer: '/Forms/1' });
    for (const kind of ['FUNCTION', 'EVENT', 'ACTION', 'ROUTINE']) {
      const owner = attachFormVisibility({ id: `child-${kind}`, formId: 'form-1', kind, source: '' }, scope);
      for (const symbol of symbols) {
        const result = resolveLibrarySymbol({ symbol, owner, libraries: [definitions] });
        assert.equal(result.resolutionStatus, 'RESOLVED');
        assert.equal(result.resolvedByFormScope, true);
        assert.equal(result.formScopeId, 'form-1');
        assert.deepEqual(result.visibilityPath, [`child-${kind}`, 'form-1', 'lib-common']);
        assert.ok(result.visibilityEvidence[0].sourcePointer.startsWith('/Forms/1/'));
      }
    }
  }
});

test('form scope merges case-insensitive imports and retains all source pointers', () => {
  const scope = buildFormVisibilityScope({
    ImportedLibraries: ['LIBCOMMON'],
    LotusScriptOccurrences: [{ Event: 'options', Source: 'Use "libCommon"' }],
    LotusScripts: ['Form Script[options]:\nUse "libcommon"'],
  }, { id: 'form-1', jsonPointer: '/Forms/1' });
  assert.equal(scope.imports.length, 1);
  assert.equal(scope.imports[0].resolutionMethod, 'USE_IMPORT');
  assert.deepEqual(scope.imports[0].sourcePointers, ['/Forms/1/ImportedLibraries/0', '/Forms/1/LotusScriptOccurrences/0/Source', '/Forms/1/LotusScripts/0']);
});

test('local declarations shadow form declarations, which shadow library exports', () => {
  const scope = buildFormVisibilityScope({ ImportedLibraries: ['libCommon'] }, {
    id: 'form-1', jsonPointer: '/Forms/1', declarations: [{ id: 'form-helper', name: 'funcOnErrorMsg' }],
  });
  const owner = attachFormVisibility({ id: 'child', formId: 'form-1', source: '' }, scope);
  const formResult = resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner, libraries: [common] });
  assert.equal(formResult.resolutionMethod, 'FORM_DECLARATION');
  assert.equal(formResult.targetId, 'form-helper');
  const localResult = resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner, libraries: [common], localDeclarations: [{ id: 'local-helper', name: 'funcOnErrorMsg' }] });
  assert.equal(localResult.targetId, 'local-helper');
  assert.equal(localResult.resolvedByFormScope, false);
});

test('form scope rejects mismatched ownership and does not leak to other forms', () => {
  const scope = buildFormVisibilityScope({ ImportedLibraries: ['libCommon'] }, { id: 'form-1', jsonPointer: '/Forms/1' });
  assert.throws(() => attachFormVisibility({ id: 'child', formId: 'form-2' }, scope), /must match/);
  assert.throws(() => resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner: { id: 'child', formId: 'form-2', formScope: scope }, libraries: [common] }), /must match/);
  const empty = buildFormVisibilityScope({}, { id: 'form-2', jsonPointer: '/Forms/2' });
  const result = resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner: attachFormVisibility({ id: 'child', formId: 'form-2' }, empty), libraries: [common] });
  assert.equal(result.resolutionStatus, 'UNRESOLVED');
});

test('form options ignore comment imports and non-options occurrences', () => {
  const scope = buildFormVisibilityScope({
    LotusScriptOccurrences: [{ Event: 'options', Source: "' Use \"libCommon\"\n%REM\nUse \"Other\"\n%END REM" }, { Event: 'click', Source: 'Use "NotGlobal"' }, { Scope: 'Action', Event: 'options', Source: 'Use "ActionOnly"' }],
    LotusScripts: ['Form Script[click]:\nUse "NotGlobal"'],
  }, { id: 'form-1', jsonPointer: '/Forms/1' });
  assert.deepEqual(scope.imports, []);
});

test('inherited transitive imports retain form provenance and candidate ambiguity', () => {
  const scope = buildFormVisibilityScope({ ImportedLibraries: ['Bridge'] }, { id: 'form-1', jsonPointer: '/Forms/1' });
  const owner = attachFormVisibility({ id: 'child', formId: 'form-1' }, scope);
  const bridge = { id: 'bridge', name: 'Bridge', source: 'Use "libCommon"', exports: [] };
  const result = resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner, libraries: [bridge, common] });
  assert.equal(result.resolutionMethod, 'TRANSITIVE_LIBRARY_IMPORT');
  assert.equal(result.resolvedByFormScope, true);
  assert.deepEqual(result.visibilityPath, ['child', 'form-1', 'bridge', 'lib-common']);
  const alternative = { id: 'alternative', name: 'Alternative', exports: [{ id: 'other-error', name: 'funcOnErrorMsg', hasImplementation: true }] };
  bridge.source += '\nUse "Alternative"';
  assert.equal(resolveLibrarySymbol({ symbol: 'funcOnErrorMsg', owner, libraries: [bridge, common, alternative] }).resolutionStatus, 'AMBIGUOUS');
});