import { lexSource } from './comment-regions.mjs';

function normalize(name) {
  return name.trim().toLowerCase();
}

function metadataNames(value) {
  return [...value.matchAll(/"(?:[^"]|"")*"|[^,;]+/g)]
    .map(match => match[0].trim())
    .filter(Boolean)
    .map(name => name.startsWith('"') && name.endsWith('"') ? name.slice(1, -1).replaceAll('""', '"') : name);
}

export function extractLibraryImports(source = '', { dependencies = [] } = {}) {
  const lexed = lexSource(source, { dialect: 'LOTUSSCRIPT' });
  const imports = [];
  const patterns = [
    { pattern: /^[\t ]*Use[\t ]+"((?:[^"]|"")*)"/gim, method: 'USE_IMPORT' },
    { pattern: /^[\t ]*Dependencies[\t ]*:[\t ]*([^\r\n]*)/gim, method: 'DEPENDENCY_METADATA' },
  ];
  for (const { pattern, method } of patterns) {
    for (const match of lexed.executableText.matchAll(pattern)) {
      const keywordOffset = match.index + match[0].search(/\S/);
      if (!/[A-Za-z]/.test(lexed.symbolText[keywordOffset] ?? '')) continue;
      const names = method === 'USE_IMPORT' ? [match[1].replaceAll('""', '"')] : metadataNames(match[1]);
      for (const libraryName of names) {
        if (!libraryName.trim()) continue;
        imports.push({
          libraryName,
          resolutionMethod: method,
          startOffset: match.index,
          endOffset: match.index + match[0].length,
          metadataIndex: null,
        });
      }
    }
  }
  for (const [metadataIndex, libraryName] of dependencies.entries()) {
    if (typeof libraryName !== 'string' || !libraryName.trim()) throw new TypeError('Dependencies must contain nonempty library names');
    imports.push({ libraryName, resolutionMethod: 'DEPENDENCY_METADATA', startOffset: null, endOffset: null, metadataIndex });
  }
  return imports;
}

export function buildFormVisibilityScope(form, { id, jsonPointer, declarations = [] } = {}) {
  if (!id || !jsonPointer) throw new TypeError('Form visibility requires a stable ID and source JSON Pointer');
  const collected = [];
  for (const [index, libraryName] of (form.ImportedLibraries ?? []).entries()) {
    if (typeof libraryName !== 'string' || !libraryName.trim()) throw new TypeError('ImportedLibraries must contain nonempty names');
    collected.push({ libraryName, resolutionMethod: 'DEPENDENCY_METADATA', startOffset: null, endOffset: null, metadataIndex: index, sourcePointer: `${jsonPointer}/ImportedLibraries/${index}` });
  }
  for (const [index, occurrence] of (form.LotusScriptOccurrences ?? []).entries()) {
    if (normalize(occurrence.Event ?? occurrence.event ?? '') !== 'options') continue;
    if (normalize(occurrence.Scope ?? occurrence.scope ?? 'Form') !== 'form') continue;
    const property = typeof occurrence.Source === 'string' ? 'Source' : 'source';
    for (const imported of extractLibraryImports(occurrence[property] ?? '')) {
      collected.push({ ...imported, sourcePointer: `${jsonPointer}/LotusScriptOccurrences/${index}/${property}` });
    }
  }
  for (const [index, source] of (form.LotusScripts ?? []).entries()) {
    if (typeof source !== 'string' || !/^\s*Form Script\[options\]:/i.test(source)) continue;
    for (const imported of extractLibraryImports(source)) {
      collected.push({ ...imported, sourcePointer: `${jsonPointer}/LotusScripts/${index}` });
    }
  }
  const grouped = new Map();
  for (const imported of collected) {
    const key = normalize(imported.libraryName);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(imported);
  }
  const imports = [...grouped.values()].map(records => {
    const selected = records.find(record => record.resolutionMethod === 'USE_IMPORT') ?? records[0];
    return { ...selected, sourcePointers: [...new Set(records.map(record => record.sourcePointer))] };
  });
  return { id, name: form.Name ?? null, imports, declarations };
}

export function attachFormVisibility(owner, formScope) {
  if (!owner.formId || owner.formId !== formScope.id) throw new TypeError('Child form ID must match the attached visibility scope');
  return { ...owner, formScope };
}

function chooseCandidate(records, symbol) {
  return records.filter(record => normalize(record.name) === normalize(symbol) && record.hasImplementation !== false);
}

export function resolveLibrarySymbol({ symbol, owner, libraries, localDeclarations = [], sameOwnerDeclarations = [], builtins = [] }) {
  const formScope = owner.formScope;
  if (formScope && owner.formId !== formScope.id) throw new TypeError('Child form ID must match the attached visibility scope');
  const attemptedScopes = ['LOCAL_DECLARATIONS'];
  const result = (candidates, method) => {
    const unique = [...new Map(candidates.map(candidate => [candidate.definition.id, candidate])).values()];
    const resolved = unique.length === 1 ? unique[0] : null;
    return {
      symbol,
      resolutionStatus: resolved ? 'RESOLVED' : unique.length > 1 ? 'AMBIGUOUS' : 'UNRESOLVED',
      resolvedByDependencyMetadata: resolved?.metadata ?? false,
      resolvedLibrary: resolved?.library?.name ?? null,
      resolvedByFormScope: Boolean(resolved?.formScopeId),
      formScopeId: resolved?.formScopeId ?? null,
      resolutionMethod: resolved ? (resolved.method ?? method) : unique.length > 1 ? 'AMBIGUOUS' : 'NONE',
      targetId: resolved?.definition.id ?? null,
      candidateIds: unique.map(candidate => candidate.definition.id).sort(),
      visibilityPath: resolved?.path ?? [],
      visibilityEvidence: resolved?.evidence ?? [],
      attemptedScopes: [...attemptedScopes],
    };
  };
  const local = chooseCandidate(localDeclarations, symbol);
  if (local.length) return result(local.map(definition => ({ definition })), 'LOCAL_DECLARATION');
  attemptedScopes.push('SAME_OWNER_DECLARATIONS');
  const sameOwner = chooseCandidate(sameOwnerDeclarations, symbol);
  if (sameOwner.length) return result(sameOwner.map(definition => ({ definition })), 'SAME_OWNER_DECLARATION');

  if (formScope) {
    attemptedScopes.push('FORM_SCOPE');
    const declarations = chooseCandidate(formScope.declarations, symbol);
    if (declarations.length) return result(declarations.map(definition => ({ definition, formScopeId: formScope.id, path: [owner.id, formScope.id] })), 'FORM_DECLARATION');
  }

  const queue = [{ container: owner, path: [owner.id], metadata: false, evidence: [], libraryDepth: 0, formScopeId: null }];
  const visited = new Set([owner.id]);
  const candidates = [];
  attemptedScopes.push('IMPORTED_LIBRARIES', 'DEPENDENCY_METADATA_LIBRARIES', 'TRANSITIVE_LIBRARY_IMPORTS');
  for (let position = 0; position < queue.length; position++) {
    const current = queue[position];
    const imports = extractLibraryImports(current.container.source, { dependencies: current.container.dependencies ?? [] });
    if (position === 0 && formScope) imports.push(...formScope.imports.map(imported => ({ ...imported, inheritedFormId: formScope.id })));
    for (const imported of imports) {
      for (const library of libraries.filter(candidate => normalize(candidate.name) === normalize(imported.libraryName))) {
        if (visited.has(library.id)) continue;
        visited.add(library.id);
        const { inheritedFormId, ...importRecord } = imported;
        const formScopeId = inheritedFormId ?? current.formScopeId;
        const path = [...current.path, ...(inheritedFormId ? [inheritedFormId] : []), library.id];
        const evidence = [...current.evidence, { ownerId: inheritedFormId ?? current.container.id, ...importRecord }];
        const metadata = current.metadata || imported.resolutionMethod === 'DEPENDENCY_METADATA';
        const method = current.libraryDepth > 0 ? 'TRANSITIVE_LIBRARY_IMPORT' : imported.resolutionMethod;
        const exported = chooseCandidate(library.exports ?? [], symbol).filter(definition => definition.hasImplementation === true && definition.visibility !== 'PRIVATE');
        candidates.push(...exported.map(definition => ({ definition, library, path, evidence, metadata, method, formScopeId })));
        queue.push({ container: library, path, metadata, evidence, libraryDepth: current.libraryDepth + 1, formScopeId });
      }
    }
  }
  if (candidates.length) return result(candidates);
  attemptedScopes.push('LOTUSSCRIPT_BUILTINS');
  const builtin = chooseCandidate(builtins, symbol);
  return result(builtin.map(definition => ({ definition })), 'BUILTIN');
}