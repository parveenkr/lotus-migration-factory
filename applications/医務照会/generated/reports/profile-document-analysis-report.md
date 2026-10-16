# profile-document-analyzer analysis

ApplicationId: `49257BE3002293FD`. Status: ANALYZED. Scope: APPLICATION.

## Evidence and findings
Inspected 476 normalized code-bearing source occurrences and all relevant synopsis areas for GetProfileDocument, GetProfileDocCollection, @GetProfileField, @SetProfileField and EditProfile. Zero actual matches. Two configuration-like ordinary maintenance forms are retained as excluded/resolved candidates, not true profile definitions. No profiles/instances/items/operations/consumers fabricated to populate collections. No runtime profile values supplied; no cache/replication/API-persistence behavior asserted. Indirect dynamic code remains bounded by upstream script review, so this is a source-inventory handoff only, not deployable configuration readiness.

Source fingerprint: SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Source: `input\ExtractedJson\synopsis.json`.

- `49257BE3002293FD:finding:f12439de50b1cf08e779` **WARNING NO_PROFILE_EVIDENCE_FOUND**: No standard Notes profile API/reference discovered in inspected normalized code occurrences, source containers or supplied synopsis areas. This is NOT a claim NO_PROFILES_EXIST. Blocking: False. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:d9a885ef7970cefb5b0e` **WARNING MISSING_RUNTIME_VALUES**: No profile-value snapshots or persisted instances exported. Ordinary maintenance forms/lookup views are not silently promoted to profiles. Blocking: False. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:c4b79b2a4288162ac920` **WARNING UNRESOLVED_CALL**: Generic DataChange dynamic formulas and unresolved script calls limit indirect discovery. Source behavior gaps remain in the script/logic handoff; no profile instance invented. Blocking: False. Evidence: inspected root/source areas.

## Coverage and checks
- codeOccurrencesSearched: 476 discovered / 476 represented / 0 unresolved.
- profileReferences: 0 discovered / 0 represented / 0 unresolved.
- ordinaryConfigurationCandidates: 2 discovered / 2 represented / 0 unresolved.
- runtimeProfileValues: 0 discovered / 0 represented / 0 unresolved.
- SOURCE: PASSED. Synopsis parsed; SHA-256 2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333
- PROVENANCE: PASSED. 14 source pointers/raw fragments/spans resolved and compared.
- COVERAGE: PASSED. Coverage counts reconcile discovered exported occurrences; this is not export completeness.
- STATIC_ONLY: PASSED. Original Notes code, formulas, APIs and external references were not executed.
- READINESS: NOT_RUN. Blocking findings remain; no downstream implementation or certification is permitted.

## Handoff limits
No original code or external/runtime operations executed. No runtime, security, content-fidelity, connectivity or deployment certification. Required unknowns remain review-gated; numeric source inventory coverage does not prove semantic completeness. Resolve blocking findings before downstream implementation. No target capability evidence was fetched or assumed.
