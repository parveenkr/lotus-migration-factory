# lotus-data-model-analyzer analysis

ApplicationId: `49257BE3002293FD`. Status: REVIEW_REQUIRED. Scope: APPLICATION.

## Evidence and findings
Four Form discriminators corroborated in view selection formulas; four conditional subforms are presentation reuse, not standalone entities. 118 field occurrences retained with exact source kinds/formulas; DISPLAY_ONLY separated from persisted items. No key, uniqueness, relationship cardinality or target schema invented. Four richtext occurrences handed off. Portfolio comparison NOT_ASSESSED; deterministic source descriptors computed. MaxLength null is unknown, RequiredLevel None does not override script validation.

Source fingerprint: SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Source: `input\ExtractedJson\synopsis.json`.

- `49257BE3002293FD:finding:d2534ca684f4ca8aaa29` **WARNING KEY_UNPROVEN**: No business key/uniqueness enforcement established. UNID/NoteID platform identity is not a selected target primary key. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:83644ef081b438153a59` **WARNING MISSING_RUNTIME_DATA**: No runtime document census; sparse/type variations, cardinality and actual stored rich text cannot be tested. Blocking: False. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:937d0e084732ed7409e5` **WARNING AMBIGUOUS_ENTITY**: Logical grouping follows explicit Form selections and subform inclusion; business aggregate boundaries and script-created item contracts require review. Blocking: True. Evidence: inspected root/source areas.

## Coverage and checks
- Forms: 4 discovered / 4 represented / 0 unresolved.
- Subforms: 4 discovered / 4 represented / 0 unresolved.
- Views: 12 discovered / 12 represented / 0 unresolved.
- Fields: 118 discovered / 118 represented / 0 unresolved.
- relationships: 0 discovered / 0 represented / 0 unresolved.
- keys: 0 discovered / 0 represented / 0 unresolved.
- constraints: 0 discovered / 0 represented / 0 unresolved.
- dependencies: 100 discovered / 100 represented / 0 unresolved.
- analyzerHandoffs: 10 discovered / 10 represented / 0 unresolved.
- responses: 0 discovered / 0 represented / 0 unresolved.
- profiles: 0 discovered / 0 represented / 0 unresolved.
- configuration: 0 discovered / 0 represented / 0 unresolved.
- sharedFields: 0 discovered / 0 represented / 0 unresolved.
- SOURCE: PASSED. Synopsis parsed; SHA-256 2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333
- PROVENANCE: PASSED. 159 source pointers/raw fragments/spans resolved and compared.
- COVERAGE: PASSED. Coverage counts reconcile discovered exported occurrences; this is not export completeness.
- STATIC_ONLY: PASSED. Original Notes code, formulas, APIs and external references were not executed.
- READINESS: FAILED. Blocking findings remain; no downstream implementation or certification is permitted.

## Handoff limits
No original code or external/runtime operations executed. No runtime, security, content-fidelity, connectivity or deployment certification. Required unknowns remain review-gated; numeric source inventory coverage does not prove semantic completeness. Resolve blocking findings before downstream implementation. No target capability evidence was fetched or assumed.
