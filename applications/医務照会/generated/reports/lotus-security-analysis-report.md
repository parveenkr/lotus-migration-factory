# lotus-security-analyzer analysis

ApplicationId: `49257BE3002293FD`. Status: REVIEW_REQUIRED. Scope: APPLICATION.

## Evidence and findings
ACL observed: -Default-/OtherDomainServers noaccess; All-KCA, All-UONAD, LocalDomainServers and one canonical named principal manager with explicit delete privilege and all five roles; MaxInternetAccess editor. Raw ACL flags retained without expanding groups or mapping identities. Root Roles are summary strings, not bare role names: explicit Role tokens reconciled exactly against Acl.Roles; embedded target suggestions are not source authorization. No typed Authors/Readers field definitions found among 118 exported occurrences; no claim none exist at runtime. funcChkEditDoc visible branches require DanTanto for 1000/2000/6000, ImuSyai for 5000 via execution-success plus ByRef membership results; QueryModeChange has g_blnBtnEditFlag bypass path for 2500/3000/4000/7000. These UI event checks are not universal server authorization. Navigation DanKanri hide rule and all exported HideWhen/readonly/paragraph restrictions preserved. No live access testing, vulnerability claims, authorization implementation or certification performed.

Source fingerprint: SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Source: `input\ExtractedJson\synopsis.json`.

- `49257BE3002293FD:finding:6b3970d425d137f6d4a6` **WARNING EXECUTION_CONTEXT_UNKNOWN**: Five agents lack signer/effective-user metadata; directory group membership and runtime document access items are absent. Actual-user permissions cannot be determined. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:91bc0e81ea7fa88d3b44` **WARNING UI_ONLY_CONTROL**: HideWhen, hidden design names, view selection, paragraph hide flags and read-only fields do not establish authorization. Preserve them separately from database ACL. Blocking: False. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:f931b3e258206aab06eb` **WARNING SOURCE_CONFLICT**: Acl.AnonymousEntry identifies -Default- with IsDefault=true and IsAnonymous=true. Preserve both flags; separate named Anonymous entry and effective anonymous behavior are not independently corroborated. Blocking: True. Evidence: 49257BE3002293FD:evidence:d43485bc61aeca4c76b5.
- `49257BE3002293FD:finding:745780182a2ad5e93826` **WARNING UNRESOLVED_REFERENCE**: EmbeddedOutlines references utlMain while exported outline alias is olMainMenu; do not silently equate them. Blocking: True. Evidence: 49257BE3002293FD:evidence:4a0b0b518f6201d6643e.
- `49257BE3002293FD:finding:a4a513dd123949401b14` **WARNING UNSUPPORTED_LOGIC**: Required generic DataChange privilege-dependent mutation/copy/delete behavior and transitive role/ByRef bindings remain partially interpreted. Script analyzer's blocking unknowns propagate. Blocking: True. Evidence: inspected root/source areas.

## Coverage and checks
- ACL: 1 discovered / 1 represented / 0 unresolved.
- AGENT: 5 discovered / 5 represented / 5 unresolved.
- FIELD: 118 discovered / 118 represented / 0 unresolved.
- NAVIGATION: 1 discovered / 1 represented / 1 unresolved.
- PROTECTED_CONTENT: 17 discovered / 17 represented / 0 unresolved.
- ROLE: 5 discovered / 5 represented / 0 unresolved.
- SCRIPT: 29 discovered / 29 represented / 4 unresolved.
- VISIBILITY: 32 discovered / 32 represented / 0 unresolved.
- READER: 0 discovered / 0 represented / 0 unresolved.
- AUTHOR: 0 discovered / 0 represented / 0 unresolved.
- RESPONSE: 0 discovered / 0 represented / 0 unresolved.
- SOURCE: PASSED. Synopsis parsed; SHA-256 2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333
- PROVENANCE: PASSED. 208 source pointers/raw fragments/spans resolved and compared.
- COVERAGE: PASSED. Coverage counts reconcile discovered exported occurrences; this is not export completeness.
- STATIC_ONLY: PASSED. Original Notes code, formulas, APIs and external references were not executed.
- READINESS: FAILED. Blocking findings remain; no downstream implementation or certification is permitted.

## Handoff limits
No original code or external/runtime operations executed. No runtime, security, content-fidelity, connectivity or deployment certification. Required unknowns remain review-gated; numeric source inventory coverage does not prove semantic completeness. Resolve blocking findings before downstream implementation. No target capability evidence was fetched or assumed.
