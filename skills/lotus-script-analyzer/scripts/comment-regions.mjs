const supportedDialects = new Set(['LOTUSSCRIPT', 'FORMULA', 'JAVA', 'UNKNOWN']);

function mask(text) {
  return text.replace(/[^\r\n]/g, ' ');
}

function lineEnd(source, start) {
  const newline = source.indexOf('\n', start);
  return newline < 0 ? source.length : newline;
}

function statementStart(source, offset) {
  let previous = offset - 1;
  while (previous >= 0 && /[\t ]/.test(source[previous])) previous--;
  return previous < 0 || /[\r\n:;]/.test(source[previous]);
}

function quotedEnd(source, start, dialect, quote) {
  let offset = start + 1;
  while (offset < source.length) {
    if (source[offset] === '\\' && dialect !== 'LOTUSSCRIPT') {
      offset += 2;
    } else if (source[offset] === quote) {
      if (source[offset + 1] === quote && dialect !== 'JAVA') offset += 2;
      else return Math.min(offset + 1, source.length);
    } else {
      offset++;
    }
  }
  return source.length;
}

function braceEnd(source, start) {
  let depth = 1;
  let offset = start + 1;
  while (offset < source.length) {
    if (source[offset] === '\\') offset += 2;
    else if (source[offset] === '{') {
      depth++;
      offset++;
    } else if (source[offset] === '}') {
      depth--;
      offset++;
      if (depth === 0) return { end: offset, closed: true };
    } else offset++;
  }
  return { end: source.length, closed: false };
}

function referenceCandidates(region, dialect) {
  const candidates = new Map();
  const patterns = [
    /\b([A-Za-z_][A-Za-z0-9_$]*)\s*\(/g,
    /\bCall\s+([A-Za-z_][A-Za-z0-9_$.]*)/gi,
    /\bUse(?:LSX)?\s+"([^"]+)"/gi,
  ];
  for (const pattern of patterns) {
    for (const match of region.text.matchAll(pattern)) {
      const name = match[1];
      const startOffset = region.startOffset + match.index + match[0].indexOf(name);
      const normalized = dialect === 'JAVA' ? name : name.toLowerCase();
      candidates.set(`${startOffset}:${normalized}`, {
        name,
        normalized,
        startOffset,
        endOffset: startOffset + name.length,
      });
    }
  }
  return [...candidates.values()].sort((first, second) => first.startOffset - second.startOffset);
}

export function lexSource(source, { dialect = 'UNKNOWN', documentationOnly = false } = {}) {
  if (typeof source !== 'string') throw new TypeError('Source must be a string');
  if (!supportedDialects.has(dialect)) throw new TypeError(`Unsupported dialect: ${dialect}`);

  const comments = [];
  const literals = [];
  const addComment = (startOffset, endOffset, closed = true) => {
    comments.push({
      classification: 'COMMENT_DOCUMENTATION',
      startOffset,
      endOffset,
      text: source.slice(startOffset, endOffset),
      reviewNotes: closed ? [] : ['Unterminated comment; remainder retained as documentation.'],
    });
  };

  if (documentationOnly && source.length > 0) addComment(0, source.length);
  let offset = documentationOnly ? source.length : 0;
  while (offset < source.length) {
    if (dialect === 'JAVA' && source.startsWith('"""', offset)) {
      let closing = offset + 3;
      while (closing < source.length) {
        if (source[closing] === '\\') closing += 2;
        else if (source.startsWith('"""', closing)) break;
        else closing++;
      }
      const end = Math.min(closing + 3, source.length);
      literals.push([offset, end]);
      offset = end;
    } else if (source[offset] === '"' || (dialect === 'JAVA' && source[offset] === "'") || (dialect === 'LOTUSSCRIPT' && source[offset] === '|')) {
      const end = quotedEnd(source, offset, dialect, source[offset]);
      literals.push([offset, end]);
      offset = end;
    } else if (dialect === 'JAVA' && source.startsWith('//', offset)) {
      const end = lineEnd(source, offset);
      addComment(offset, end);
      offset = end;
    } else if (dialect === 'JAVA' && source.startsWith('/*', offset)) {
      const closing = source.indexOf('*/', offset + 2);
      const end = closing < 0 ? source.length : closing + 2;
      addComment(offset, end, closing >= 0);
      offset = end;
    } else if (dialect !== 'JAVA' && source[offset] === "'") {
      const end = lineEnd(source, offset);
      addComment(offset, end);
      offset = end;
    } else if (dialect !== 'JAVA' && source[offset] === '%' && /^[\t ]*$/.test(source.slice(source.lastIndexOf('\n', offset - 1) + 1, offset)) && /^%REM\b/i.test(source.slice(offset))) {
      const closingPattern = /^[\t ]*%END[\t ]+REM\b[^\r\n]*/gim;
      closingPattern.lastIndex = offset + 4;
      const closing = closingPattern.exec(source);
      const end = closing ? closing.index + closing[0].length : source.length;
      addComment(offset, end, Boolean(closing));
      offset = end;
    } else if (dialect !== 'JAVA' && /[Rr]/.test(source[offset]) && (offset === 0 || !/[A-Za-z0-9_$.]/.test(source[offset - 1])) && /^REM\b/i.test(source.slice(offset))) {
      let body = offset + 3;
      while (/[\t ]/.test(source[body] ?? '') && body < source.length) body++;
      if (source[body] === '{') {
        const result = braceEnd(source, body);
        addComment(offset, result.end, result.closed);
        offset = result.end;
      } else if (dialect !== 'FORMULA' && statementStart(source, offset)) {
        const end = lineEnd(source, offset);
        addComment(offset, end);
        offset = end;
      } else offset++;
    } else if ((dialect === 'FORMULA' || dialect === 'UNKNOWN') && source[offset] === '{') {
      const result = braceEnd(source, offset);
      literals.push([offset, result.end]);
      offset = result.end;
    } else offset++;
  }

  const regions = [];
  let previousEnd = 0;
  for (const comment of comments) {
    if (previousEnd < comment.startOffset) {
      regions.push({
        classification: 'EXECUTABLE_CODE',
        startOffset: previousEnd,
        endOffset: comment.startOffset,
        text: source.slice(previousEnd, comment.startOffset),
        reviewNotes: [],
      });
    }
    regions.push(comment);
    previousEnd = comment.endOffset;
  }
  if (previousEnd < source.length) {
    regions.push({
      classification: 'EXECUTABLE_CODE',
      startOffset: previousEnd,
      endOffset: source.length,
      text: source.slice(previousEnd),
      reviewNotes: [],
    });
  }

  const executableText = regions.map(region => region.classification === 'COMMENT_DOCUMENTATION' ? mask(region.text) : region.text).join('');
  let symbolText = '';
  previousEnd = 0;
  for (const [start, end] of literals) {
    symbolText += executableText.slice(previousEnd, start) + mask(executableText.slice(start, end));
    previousEnd = end;
  }
  symbolText += executableText.slice(previousEnd);

  const normalize = name => dialect === 'JAVA' ? name : name.toLowerCase();
  const executableSymbols = new Set((symbolText.match(/[A-Za-z_][A-Za-z0-9_$]*/g) ?? []).map(normalize));
  const commentReferences = comments.flatMap(region => referenceCandidates(region, dialect));
  const commentOnlySymbols = [...new Set(commentReferences
    .filter(reference => !executableSymbols.has(reference.normalized))
    .map(reference => reference.normalized))].sort();

  return {
    regions,
    executableText,
    symbolText,
    hasExecutableContent: /[^\s;:]/.test(executableText),
    executableSymbols: [...executableSymbols].sort(),
    commentReferences,
    commentOnlySymbols,
    metrics: {
      executableRegions: regions.filter(region => region.classification === 'EXECUTABLE_CODE' && /[^\s;:]/.test(region.text)).length,
      commentRegions: comments.length,
      commentOnlyReferences: commentOnlySymbols.length,
      filteredCommentReferences: commentReferences.length,
    },
  };
}

export function summarizeLexedSources(results) {
  const executableSymbols = new Set(results.flatMap(result => result.executableSymbols));
  const commentOnlySymbols = new Set(results.flatMap(result => result.commentReferences)
    .filter(reference => !executableSymbols.has(reference.normalized))
    .map(reference => reference.normalized));
  return {
    executableRegions: results.reduce((total, result) => total + result.metrics.executableRegions, 0),
    commentRegions: results.reduce((total, result) => total + result.metrics.commentRegions, 0),
    commentOnlyReferences: commentOnlySymbols.size,
    filteredCommentReferences: results.reduce((total, result) => total + result.metrics.filteredCommentReferences, 0),
  };
}