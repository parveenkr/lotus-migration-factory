# Cross-blueprint validation

ApplicationId: `49257BE3002293FD`. Final gate: **REVIEW_REQUIRED**. Governance permitted: **NO**.

## OUTPUT_EXISTENCE_JSON_AND_SCOPE — PASSED
29 required blueprint JSON files parsed without duplicate keys; all required stage reports present.

## INPUT_IDENTITY_AND_DESIGN_ISOLATION — PASSED
Source SHA-256 unchanged; canonical applicationId corroborated; forbidden design/deployment surfaces remain empty.

## INLINE_CONTRACTS_AND_RECORDS — PASSED
8667 populated typed records checked against required property lists from actual inline skill contracts; common nested root shapes and coverage types/counts checked.

## ACTUAL_SCRIPT_SCHEMA_AND_NEGATIVE_CONTROLS — PASSED
Bundled script-analysis.schema.json evaluated with explicit checker for its actual keyword vocabulary; seven negative mutations rejected. jsonschema package unavailable; no installation.

## PROVENANCE_RAW_VALUES_AND_GENERATED_REFERENCES — PASSED
2878 RFC6901 pointers resolved against actual source/generated artifacts; all retained raw evidence compared exactly; supplied spans and UI source identifiers checked.

## NORMALIZED_IDENTIFIERS_AND_GRAPH_LINKS — PASSED
29647 normalized identifier/evidence/graph references resolved; null endpoints remain explicitly external/unresolved. Collection and evidence IDs unique.

## ALL_FORM_VIEW_AND_FIELD_COVERAGE — PASSED
4/4 forms, 4/4 referenced subforms, 118/118 field occurrences, 12/12 views (0 folders), 70/70 columns and exact view inventory reconciled. Encoded filenames avoid source hierarchy path collisions.

## SCRIPT_SOURCE_RECONCILIATION_AND_GATE — PASSED
476 normalized fragments represent 576 source strings; 100 SourceFormula/ComputedFormula pairs share evidence-linked records. Required semantic gaps correctly block readiness.

## Cross-domain consistency and unresolved handoffs
- **Data Model ↔ Logic: REVIEW_REQUIRED / static consistency only.** 118 occurrence IDs retained; script-maintained item/read/write alias binding, runtime type variation and keys remain unresolved. Raw ordered data-flow is not a canonical typed field mapping.
- **Data Model ↔ Workflow: REVIEW_REQUIRED / static consistency only.** StatusCode/StatusName and four history fields have evidence-linked workflow profiles/handoffs. Eight mapped string codes and nine symbolic action transitions retained; dynamic source/target eligibility unresolved.
- **Data Model ↔ Security: REVIEW_REQUIRED / static consistency only.** 118 field metadata occurrences projected without treating IsEditable/HideWhen as authorization. Effective identities and actual document access items unavailable.
- **Data Model ↔ UI; Form ↔ Data Model; Form ↔ UI: REVIEW_REQUIRED / static consistency only.** Four form artifacts and nested subform field definitions reconcile exactly to all 118 canonical source field occurrences; UI reads generated artifacts only.
- **Homepage ↔ Navigation; Homepage ↔ UI; Navigation ↔ UI: REVIEW_REQUIRED / static consistency only.** Startup openframeset/fraMain and right frame viwKakuninByStatus consistent. Seven source view routes resolve. Embedded outline utlMain does not resolve to exported olMainMenu; close menu action has no body.
- **Navigation ↔ Workflow; Form ↔ Workflow: REVIEW_REQUIRED / static consistency only.** UI eligibility/HideWhen and conditional subforms preserved separately; cannot infer execution authorization or unconditional transitions.
- **Workflow ↔ Security; Workflow ↔ Logic: REVIEW_REQUIRED / static consistency only.** Roles/ByRef checks, confirmations/cancellations, history versus authoritative mutation, backend conflict save and UI save are distinct; interprocedural binding and agent signer/schedule gaps remain.
- **Rich Text ↔ Data Model: REVIEW_REQUIRED / static consistency only.** Four richtext field occurrence IDs resolve; 247 design templates do not establish runtime stored content. Payload, representation/fidelity and rich-text mutation aliases unresolved.
- **Integration ↔ Logic: REVIEW_REQUIRED / static consistency only.** Three endpoint groups; directory info.nsf/(UserInfoByUN3) and runtime DataChange copy target retain bindings/unknowns. Fourteen explicit directory item-to-property mappings retained; no connectivity or identity assurance.
- **View ↔ Data Model: REVIEW_REQUIRED / static consistency only.** All 70 source columns/formulas preserved. Field dependency IDs/candidates resolve when source names match; repeated subform field occurrences remain explicit ambiguities. Computed $ item names do not become stored fields.
- **Profile ↔ Data Model: REVIEW_REQUIRED / static consistency only.** No standard profile APIs found; two maintenance forms are ordinary configuration candidates, not invented profiles. No runtime instances enumerated.

## Required behavioral review (not structural downgrades)
- Script blueprint: 87 blocking finding occurrences. See `generated\blueprints\scripts\application.script-blueprint.json#/findings` and `/validation/blockingFindingIds`.
  - `49257BE3002293FD:finding:953d8477863d5228373a` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/1/Actions/41
  - `49257BE3002293FD:finding:2ec9cfb49a0afedbbfbb` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/1/Actions/53
  - `49257BE3002293FD:finding:71e965555d85ba1a6b60` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/1/LotusScripts/12
  - `49257BE3002293FD:finding:575d8449c016c6b43205` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/2/Actions/7
  - `49257BE3002293FD:finding:c2f202dd8a4962f131ed` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/2/Actions/8
  - `49257BE3002293FD:finding:69facce7db8e15c6dc86` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/2/Actions/9
  - `49257BE3002293FD:finding:b27c237840462bdcd73b` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/3/Actions/7
  - `49257BE3002293FD:finding:c0c8bb461d338a5add0e` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/3/Actions/8
  - `49257BE3002293FD:finding:66557b58d1e8798d8e03` UNKNOWN_LANGUAGE: Language/context unresolved at /Forms/3/Actions/9
  - `49257BE3002293FD:finding:74b780fa71a792dcd050` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/0/Actions/5
  - `49257BE3002293FD:finding:031b5b2a657d1baae309` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/1/Actions/5
  - `49257BE3002293FD:finding:a8976af13278c54e087c` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/2/Actions/5
  - `49257BE3002293FD:finding:f163ea2abcc750aef17c` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/3/Actions/5
  - `49257BE3002293FD:finding:bc1aa4a9bfa4280b8620` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/4/Actions/5
  - `49257BE3002293FD:finding:adb796a42801bd99acc0` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/6/Actions/2
  - `49257BE3002293FD:finding:c17e7dd619f74edb2a0e` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/7/Actions/2
  - `49257BE3002293FD:finding:1ba2f4b58857f8bb3c69` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/8/Actions/4
  - `49257BE3002293FD:finding:3c00b933ee2c3e993b90` UNKNOWN_LANGUAGE: Language/context unresolved at /Views/8/Actions/5
  - `49257BE3002293FD:finding:fcf10e0700152bbc9988` UNRESOLVED_REFERENCE: Call/import not uniquely bound in supplied source: funcWorkflowStatGet
  - `49257BE3002293FD:finding:bf9b362b4755dc69df67` UNSUPPORTED_LOGIC: Bounded lexical interpretation retains statements/branch nesting but does not complete receiver aliases, transitive argument/ByRef propagation, arbitrary Evaluate, DataChange generic editing/copy operations or event-to-action deduplication. These are required behavioral gaps, not an inventory-only success.
  - `49257BE3002293FD:finding:975879b5bae53b65f165` INCOMPLETE_EXPORT: Source completeness not evidenced; structured Functions/Dependencies/EventScripts may be empty while embedded bodies exist. Java area has no discovered source, not proof no original Java agents.

Static export limitations (no runtime payloads, unknown environment/membership, empty export timestamp) are distinguished from unresolved required script/data/role/call behavior. Both remain explicit; no runtime certification is implied.
