# lotus-integration-analyzer analysis

ApplicationId: `49257BE3002293FD`. Status: REVIEW_REQUIRED. Scope: APPLICATION.

## Evidence and findings
Observed boundaries: active Notes application, runtime-server info.nsf directory, and runtime-selected DataChange copy target. clsAddressInfo binds server via @Subset(@DbName;1), path info.nsf, view (UserInfoByUN3), key current Notes user or canonicalized explicit argument. DataChange GetCopyDB uses CurrentDatabase for blank argument or server/path split from strDBInfo; CopyToDatabase is a separate attempted write, not a proven successful migration. Field @DbLookup reads local viwSearchSelection column 2 with empty server/database expressions and @IsError fallback; this is not HTTP/REST/SQL and is not an external endpoint by itself. Design samples and Notes summaries remain CANDIDATE, not independent active integrations. No standard mail/HTTP/SOAP/ODBC/COM/file-exchange operations discovered in inspected strings, which does not prove none exist in the original application. No endpoints resolved over network, no authentication tested, no source operations executed. Governance/owner/SLA/freshness/retention controls not established; proposed acceptance checks are advisory only.

Source fingerprint: SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Source: `input\ExtractedJson\synopsis.json`.

- `49257BE3002293FD:finding:930ab64eb6fb8608c315` **WARNING UNRESOLVED_ENDPOINT**: Directory path info.nsf and view (UserInfoByUN3) are literal; server comes from runtime @Subset(@DbName;1). DataChange copy database comes from Split(strDBInfo,";") with CurrentDatabase fallback. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:84c66ab226aa08cd2c6b` **WARNING UNKNOWN_IDENTITY**: Effective Notes identity, cross-database ACL and group expansion are not supplied. User lookup output is not authentication/authorization. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:4a718bd88cca61555bdb` **WARNING CONTRACT_INCOMPLETE**: Directory field/property consumers and generic DataChange copy/delete alias propagation have not been fully bound. Source call-level shapes are not full external schemas. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:73abede50804d1740d4f` **WARNING RESILIENCE_UNKNOWN**: IsOpen/IsNothing/Size and On Error branches exist, but no complete timeout/retry/atomicity/failure-recovery contract established. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:3bdc64ed718933f02c22` **WARNING SOURCE_CONFLICT**: One lookup cache option contains replacement characters (NoCac��e). Preserve exact source; do not silently repair to NoCache. Blocking: True. Evidence: inspected root/source areas.
- `49257BE3002293FD:finding:074779b5dbaa74c39120` **WARNING MISSING_DEPLOYMENT_METADATA**: Host/environment/schedule/version/service ownership metadata not supplied; extracted dependency Count is not invocation frequency. Blocking: False. Evidence: inspected root/source areas.

## Coverage and checks
- integrationOccurrences: 31 discovered / 31 represented / 31 unresolved.
- exportedExternalDependencies: 3 discovered / 3 represented / 3 unresolved.
- endpoints: 3 discovered / 3 represented / 2 unresolved.
- SOURCE: PASSED. Synopsis parsed; SHA-256 2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333
- PROVENANCE: PASSED. 37 source pointers/raw fragments/spans resolved and compared.
- COVERAGE: PASSED. Coverage counts reconcile discovered exported occurrences; this is not export completeness.
- STATIC_ONLY: PASSED. Original Notes code, formulas, APIs and external references were not executed.
- READINESS: FAILED. Blocking findings remain; no downstream implementation or certification is permitted.

## Handoff limits
No original code or external/runtime operations executed. No runtime, security, content-fidelity, connectivity or deployment certification. Required unknowns remain review-gated; numeric source inventory coverage does not prove semantic completeness. Resolve blocking findings before downstream implementation. No target capability evidence was fetched or assumed.
