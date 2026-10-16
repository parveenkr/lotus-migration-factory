import assert from 'node:assert/strict';
import test from 'node:test';
import { lexSource, summarizeLexedSources } from './comment-regions.mjs';

test('block documentation retains examples without executable references', () => {
  const source = '%REM\r\n funcWorkflowStatGet(0)\r\n funcWorkflowStatGet(1)\r\n%END REM';
  const result = lexSource(source);
  assert.equal(result.hasExecutableContent, false);
  assert.equal(result.symbolText.trim(), '');
  assert.deepEqual(result.metrics, { executableRegions: 0, commentRegions: 1, commentOnlyReferences: 1, filteredCommentReferences: 2 });
  assert.equal(result.regions[0].classification, 'COMMENT_DOCUMENTATION');
  assert.equal(result.regions[0].text, source);
});

test('apostrophe, Rem line, and Formula REM comments are excluded', () => {
  for (const source of ["' Call funcWorkflowStatGet()", 'Rem Call funcWorkflowStatGet()', 'REM {Call funcWorkflowStatGet()};']) {
    const result = lexSource(source);
    assert.equal(result.hasExecutableContent, false);
    assert.equal(result.metrics.filteredCommentReferences, 1);
    assert.equal(result.metrics.commentOnlyReferences, 1);
  }
});

test('mixed bodies retain real declarations and calls after decorated block comments', () => {
  const source = 'Function Real()\n%rem ****\nfuncWorkflowStatGet(0)\n%end rem ****\nCall Real() \' Call Missing()\nEnd Function';
  const result = lexSource(source, { dialect: 'LOTUSSCRIPT' });
  assert.match(result.symbolText, /Function Real\(\)/);
  assert.match(result.symbolText, /Call Real\(\)/);
  assert.doesNotMatch(result.symbolText, /funcWorkflowStatGet|Missing/);
  assert.equal(result.metrics.filteredCommentReferences, 2);
  assert.equal(result.hasExecutableContent, true);
});

test('a real call is not suppressed because documentation also mentions it', () => {
  const result = lexSource("' Call Missing()\nCall Missing()");
  assert.match(result.symbolText, /Call Missing\(\)/);
  assert.equal(result.metrics.commentOnlyReferences, 0);
  assert.equal(result.metrics.filteredCommentReferences, 1);
});

test('strings keep comment markers and never expose literal calls as symbols', () => {
  const source = 'text = "it\'s %REM REM { Call Fake() } and ""quoted"""\nCall Real()';
  const result = lexSource(source, { dialect: 'LOTUSSCRIPT' });
  assert.equal(result.metrics.commentRegions, 0);
  assert.equal(result.executableText, source);
  assert.doesNotMatch(result.symbolText, /Fake/);
  assert.match(result.symbolText, /Real/);
});

test('Formula comments preserve semicolons, escaped braces, and following code', () => {
  const source = 'REM { Call Fake(); nested { text } and \\} }; @IsMember("[Admin]"; @UserRoles)';
  const result = lexSource(source, { dialect: 'FORMULA' });
  assert.doesNotMatch(result.symbolText, /Fake/);
  assert.match(result.executableText, /@IsMember\("\[Admin\]"; @UserRoles\)/);
  assert.equal(result.metrics.commentRegions, 1);
});

test('bare Formula brace strings and escaped quotes are literals, not documentation', () => {
  const source = '{REM {literal}; Call Fake()} : "escaped \\" quote; REM {text}"';
  const result = lexSource(source, { dialect: 'FORMULA' });
  assert.equal(result.metrics.commentRegions, 0);
  assert.doesNotMatch(result.symbolText, /Fake|REM/);
  assert.equal(result.hasExecutableContent, true);
});

test('unterminated comment tails are preserved and never parsed as code', () => {
  for (const source of ['%REM\nCall Fake()', 'REM { Call Fake()']) {
    const result = lexSource(source);
    assert.equal(result.hasExecutableContent, false);
    assert.equal(result.regions.at(-1).reviewNotes.length, 1);
    assert.equal(result.regions.at(-1).text, source);
  }
});

test('documentation-only source does not contribute executable language evidence', () => {
  const source = 'Java examples: Call Fake() and Use "MissingLibrary"';
  const result = lexSource(source, { documentationOnly: true });
  assert.equal(result.hasExecutableContent, false);
  assert.equal(result.metrics.commentOnlyReferences, 2);
  assert.equal(result.metrics.filteredCommentReferences, 2);
});

test('regions reconstruct Unicode source and preserve offsets and line endings', () => {
  const source = 'value = "\u9589\u3058\u308b\ud83d\ude00"\r\n\' Call Fake()\r\nCall Real()';
  const result = lexSource(source);
  assert.equal(result.regions.map(region => region.text).join(''), source);
  assert.equal(result.executableText.length, source.length);
  assert.equal(result.symbolText.length, source.length);
  for (const region of result.regions) assert.equal(source.slice(region.startOffset, region.endOffset), region.text);
  assert.deepEqual(result.symbolText.match(/[\r\n]/g), source.match(/[\r\n]/g));
});

test('Java comments respect character literals, strings, and text blocks', () => {
  const source = 'char mark = \'x\'; String text = "// Fake()";\n/* Missing() */\nString block = """\n// literal\n""";\n// More()\nreal();';
  const result = lexSource(source, { dialect: 'JAVA' });
  assert.equal(result.metrics.commentRegions, 2);
  assert.doesNotMatch(result.symbolText, /Fake|Missing|More|literal/);
  assert.match(result.symbolText, /real\(\)/);
});

test('empty input has no executable or documentation regions', () => {
  const result = lexSource('');
  assert.deepEqual(result.regions, []);
  assert.equal(result.hasExecutableContent, false);
});

test('a literal value is not an executable symbol reference', () => {
  const result = lexSource('\' Call Fake()\nvalue = "Fake"');
  assert.equal(result.metrics.commentOnlyReferences, 1);
});

test('metrics deduplicate comment symbols and consider executable definitions across bodies', () => {
  const documentation = lexSource('%REM\nfuncWorkflowStatGet(0)\nfuncWorkflowStatGet(1)\n%END REM');
  const otherDocumentation = lexSource("' Call FuncWorkflowStatGet()");
  assert.deepEqual(summarizeLexedSources([documentation, otherDocumentation]), {
    executableRegions: 0,
    commentRegions: 2,
    commentOnlyReferences: 1,
    filteredCommentReferences: 3,
  });
  const definition = lexSource('Function funcWorkflowStatGet()\nEnd Function');
  assert.equal(summarizeLexedSources([documentation, definition]).commentOnlyReferences, 0);
});

test('Formula comments inside expressions are filtered without removing adjacent code', () => {
  const result = lexSource('@Do(REM {Call Fake()}; @True)', { dialect: 'FORMULA' });
  assert.equal(result.metrics.commentRegions, 1);
  assert.doesNotMatch(result.symbolText, /Fake/);
  assert.match(result.symbolText, /@Do\(/);
  assert.match(result.symbolText, /@True/);
});

test('LotusScript pipe-delimited strings preserve embedded comment markers', () => {
  const source = 'value = |\' Call Fake()\n%REM\nREM {text}|\nCall Real()';
  const result = lexSource(source, { dialect: 'LOTUSSCRIPT' });
  assert.equal(result.metrics.commentRegions, 0);
  assert.equal(result.executableText, source);
  assert.doesNotMatch(result.symbolText, /Fake|REM/);
  assert.match(result.symbolText, /Call Real\(\)/);
});