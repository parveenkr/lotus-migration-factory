# lotus-logic-analyzer analysis

ApplicationId: `49257BE3002293FD`. Status: REVIEW_REQUIRED. Scope: APPLICATION.

## Evidence and findings
All 476 normalized script fragments (576 source strings) reconciled with script blueprint; identical field SourceFormula/ComputedFormula occurrences share a record retaining both evidence pointers. All 36 BusinessRules summary values retained separately as SUMMARY evidence, not executed rules. Functions inside raw bodies indexed despite empty Functions arrays. Source-visible calls/imports retain resolved or unresolved endpoints. Core inspected routines: funcWfStatGet (mapping, not mutation), funcUpdateRireki (history only), funcChkEditDoc (ByRef result separate), funcChkDocSize (whole-document bytes), funcEigyobiGet (first holiday document), funcAgeReturn, funcSaveConflictCheck (actual backend save). D01 scheduled source physically RemoveAll(True) against four date/flag predicates; D02 sets overdue flag for status 3000..5000 after five business days; D03 marks UnprocessedDocuments DelFlag/DelDate and saves then examines viwConflict. Trigger metadata is not a complete schedule. ItemViewer and DataChange have actual UI/admin routines, including rich text and copy/delete capabilities; generic dynamic semantics remain explicitly incomplete.

Source fingerprint: SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Source: `input\ExtractedJson\synopsis.json`.

- `49257BE3002293FD:finding:d9eedd8c04a0e8a1a7c1` **WARNING UNSUPPORTED_SYNTAX**: Ordered lexical control/data records retain source but do not establish a full typed interprocedural graph. Dynamic generic DataChange operations, method receivers, class properties, alias propagation and all source-summary conflicts require review. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:748d19d36d664ab5cd09` **WARNING TRUNCATED_SOURCE**: Inquiry Form LotusScripts[4..11] actually end in ellipses around 623 characters. Full Actions click bodies exist separately, and were inspected; do not merge their lossy labels/events by text similarity. Blocking: True. Evidence: 49257BE3002293FD:evidence:c21fae1416367637fb20.
- `49257BE3002293FD:finding:5afd9378b5ddda0029d6` **WARNING SOURCE_CONFLICT**: Many source script labels/comments contain U+FFFD replacement characters while layout metadata contains intact Japanese. Original spelling/business messages cannot be reconstructed safely. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:6da8391f587668b51007` **WARNING PERSISTENCE_UNKNOWN**: History helper funcUpdateRireki does not save or assign StatusCode. funcSaveConflictCheck performs backend Save; UI caller save is separate. Save/mail/delete statements are attempts, not runtime success. Blocking: True. Evidence: inspected root/source areas.

## Coverage and checks
- fragments: 476 discovered / 476 represented / 109 unresolved.
- routines: 248 discovered / 248 represented / 248 unresolved.
- calls: 369 discovered / 369 represented / 0 unresolved.
- controlFlow: 2184 discovered / 2184 represented / 2184 unresolved.
- dataFlow: 1673 discovered / 1673 represented / 1673 unresolved.
- rules: 404 discovered / 404 represented / 37 unresolved.
- effects: 178 discovered / 178 represented / 178 unresolved.
- SOURCE: PASSED. Synopsis parsed; SHA-256 2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333
- PROVENANCE: PASSED. 612 source pointers/raw fragments/spans resolved and compared.
- COVERAGE: PASSED. Coverage counts reconcile discovered exported occurrences; this is not export completeness.
- STATIC_ONLY: PASSED. Original Notes code, formulas, APIs and external references were not executed.
- READINESS: FAILED. Blocking findings remain; no downstream implementation or certification is permitted.

## Handoff limits
No original code or external/runtime operations executed. No runtime, security, content-fidelity, connectivity or deployment certification. Required unknowns remain review-gated; numeric source inventory coverage does not prove semantic completeness. Resolve blocking findings before downstream implementation. No target capability evidence was fetched or assumed.
