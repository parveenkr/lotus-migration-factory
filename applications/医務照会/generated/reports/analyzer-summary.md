# Analyzer summary

ApplicationId: `49257BE3002293FD`. Database: `医務照会DB_TEMPLATE`. Mode: ANALYZE_ONLY.

Final analysis gate: **REVIEW_REQUIRED**. **Governance/certification and blueprint-orchestrator are NOT permitted/invoked.**

Source `input\ExtractedJson\synopsis.json` (686305 bytes), SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`. Identity from caller corroborated by `/ReplicaId`. Export timestamp empty; source version not supplied.

## Analyzer execution inventory
All fourteen skills resolved/read; folder-to-declared-name aliases explicitly reviewed. No skill declares a package version; blueprint versions remain 1.0. Order is sequential, including script before logic. Final reconciliation replay preserves this order.

|Analyzer / declared skill|Status|Measured seconds|Coverage|
|---|---|---:|---|
|lotus-application-analyzer / lotus-application-analyzer|REVIEW_REQUIRED|0.01067|`{"Forms": 4, "Subforms": 4, "Views": 12, "Agents": 5, "ScriptLibraries": 4, "Fields": 118}`|
|lotus-data-model-analyzer / lotus-data-model-analyzer|REVIEW_REQUIRED|0.054968|`{"entities": 4, "fields": 118, "designElements": 29, "richTextHandoffs": 4, "analyzerHandoffs": 10, "workflowHandoffs": 6}`|
|lotus-form-analyzer / lotus-notes-form-blueprint-generator|REVIEW_REQUIRED|0.050252|`{"forms": 4, "referencedSubforms": 4, "formFieldOccurrences": 34, "subformFieldOccurrences": 84, "actionOccurrences": 76}`|
|lotus-script-analyzer / lotus-script-analyzer|REVIEW_REQUIRED|0.773622|`{"scriptOccurrences": 476, "routines": 248, "operations": 5000, "dependencies": 394, "findings": 87, "blockingFindings": 87, "areas": [{"area": "LOTUSSCRIPT", "status": "REVIEW_REQUIRED", "discoveredCount": 54, "representedCount": 54, "unresolvedCount": 54, "sourceCompleteness": "UNKNOWN"}, {"area": "FORMULA_LANGUAGE", "status": "REVIEW_REQUIRED", "discoveredCount": 404, "representedCount": 404, "unresolvedCount": 37, "sourceCompleteness": "UNKNOWN"}, {"area": "JAVA_AGENTS", "status": "NO_SOURCE_DISCOVERED", "discoveredCount": 0, "representedCount": 0, "unresolvedCount": 0, "sourceCompleteness": "UNKNOWN"}, {"area": "SCRIPT_LIBRARIES", "status": "REVIEW_REQUIRED", "discoveredCount": 4, "representedCount": 4, "unresolvedCount": 4, "sourceCompleteness": "UNKNOWN"}]}`|
|lotus-logic-analyzer / lotus-logic-analyzer|REVIEW_REQUIRED|0.493251|`{"fragments": 476, "routines": 248, "calls": 369, "rules": 404, "effects": 178, "controlFlow": 2184, "dataFlow": 1673}`|
|lotus-workflow-analyzer / lotus-workflow-analyzer|REVIEW_REQUIRED|0.351575|`{"workflows": 1, "states": 8, "transitions": 9, "entryPoints": 14, "effects": 172}`|
|lotus-security-analyzer / lotus-security-analyzer|REVIEW_REQUIRED|0.086367|`{"securityArtifacts": 208, "categories": {"ACL": 1, "ROLE": 5, "FIELD": 118, "VISIBILITY": 32, "SCRIPT": 29, "NAVIGATION": 1, "AGENT": 5, "PROTECTED_CONTENT": 17}, "roles": 5, "aclEntries": 6}`|
|rich-text-analyzer / rich-text-analyzer|REVIEW_REQUIRED|0.172113|`{"richTextFieldOccurrences": 4, "designTemplates": 247, "assets": 1, "operations": 30, "restrictions": 17}`|
|lotus-navigation-analyzer / lotus-notes-navigation-blueprint-generator|REVIEW_REQUIRED|0.004569|`{"navigationItems": 16, "groups": 2, "resolvedViewRoutes": 7, "unresolvedOutlineReferences": 1}`|
|lotus-homepage-analyzer / lotus-notes-homepage-blueprint-generator|REVIEW_REQUIRED|0.00596|`{"startupFramesets": 1, "initialContentTargets": 1, "explicitNavigationCards": 0, "explicitQuickLinks": 0, "unresolvedEmbeddedOutlines": 1}`|
|lotus-view-analyzer / lotus-view-analyzer|REVIEW_REQUIRED|0.080819|`{"views": 12, "folders": 0, "columns": 70, "actions": 47, "sourceCoverageReconciled": true}`|
|lotus-ui-analyzer / lotus-ui-analyzer|REVIEW_REQUIRED|0.066019|`{"sourceArtifacts": 23, "forms": 4, "views": 12, "actions": 123, "partialJourneys": 7, "sourcePointersChecked": 169}`|
|lotus-integration-analyzer / lotus-integration-analyzer|REVIEW_REQUIRED|0.189458|`{"operations": 31, "sourceSupportedOccurrences": 19, "candidateOccurrences": 12, "systems": 3, "endpoints": 3}`|
|profile-document-analyzer / profile-document-analyzer|ANALYZED|0.084351|`{"normalizedCodeOccurrencesSearched": 476, "profileApiMatches": 0, "ordinaryConfigurationCandidates": 2, "persistedProfileInstancesSupplied": 0}`|

Durations measure local generation/check function execution only; they are not end-to-end reasoning or original runtime execution time. Declared stage dependencies form the exact execution chain; actual consumed files are recorded separately in manifest `dependenciesConsumed` and `inputPaths`.

## Coverage is not semantic completeness
14/14 analyzers executed; 4/4 forms; 4/4 referenced subforms; 118/118 field occurrences; 12/12 views, 0 folders; 70/70 columns. Five agents and four libraries indexed from actual bodies. 476 normalized code fragments represent 576 source strings; 100 field SourceFormula/ComputedFormula duplicate exports share records with both evidence pointers. Four script coverage areas recorded; no Java source discovered is NOT proof no original Java agents.

All 54 discovered LotusScript fragments retain required semantic-review status. Lexical/control/data inventories are not claimed as fully typed interprocedural interpretation. Generic DataChange mutation/copy/delete/evaluation, method receivers, argument/ByRef propagation, lossy/truncated source and unresolved bindings are material required gaps. Creating valid JSON did not complete those behaviors.

## Priority findings and downstream prerequisites
- **Script blocking gaps:** exact IDs/codes in script blueprint `/findings` and `/validation/blockingFindingIds`; expanded references in cross-blueprint report. Source `Forms[1].LotusScripts[4..11]` really truncates around 623 characters, not merely a tool display. Longer action bodies were separately inspected without silently merging conflicting occurrences. Source U+FFFD strings/messages remain unchanged; no invented translation.
- **Behavior recovered:** funcWfStatGet maps eight string codes; it does not write state. funcUpdateRireki appends four history arrays and does not save. Actions explicitly assign state, invoke history, backend conflict-save helper, then conditional UI save. Backstep/re-request, confirmations, cancellation/errors and unknown endpoints retained. D01 physical deletion, D02 overdue flag, D03 soft-delete/unprocessed-document behavior retained separately.
- **Model:** four candidate logical aggregates supported by explicit Form discrimination, not blind form-to-table mapping; no primary keys/cardinality/target tables invented. Six lifecycle/history field profiles and four rich-text handoffs unresolved. Dynamic choice/lookup candidates are advisory, not relationships.
- **Security:** six ACL entries/five explicit role tokens retained. Root Roles are exporter summaries containing target suggestions; those are not source grants. Anonymous/default overlapping flags, effective identity and privilege-gated generic operations require review. UI hiding is not authorization.
- **Navigation/homepage:** seven menu-to-view routes resolve, original order and spacers retained. fraMain/right-frame launch corroborated. Embedded `utlMain` does not match `olMainMenu`; close action/page content incomplete. No synthetic cards/quicklinks/dashboard generated.
- **Views/UI:** all source view columns/actions/selection/sort/category metadata retained, including hidden/computed columns and unknown sort direction. UI consumes 23 generated artifacts only. Seven partial navigation journey edges are not fabricated business outcomes.
- **Rich text:** four richtext fields, 247 design templates, one image reference; no runtime CD/MIME/attachment payload certification. Whole-document 300*1024 size check is not a per-attachment limit.
- **Integrations/profiles:** directory endpoint bindings and fourteen item/property mappings retained, runtime copy destination unresolved, local selection lookups not mislabeled HTTP. No standard profile API found; no profile instances invented. No external/runtime operations executed.

Nonblocking static/export limitations include absent optional comparison/target-platform inputs and no runtime test evidence. They are not invented absence claims. Material source/behavior gaps above independently prevent ANALYSIS_COMPLETE. Downstream analyzers/generators must not consume these outputs as certified design.

Finding occurrences: 123; blocking occurrences: 114; migration-risk occurrences: 45. Counts include repeated domain handoffs, not distinct runtime defects.

## Validation and actual command results
- OUTPUT_EXISTENCE_JSON_AND_SCOPE: **PASSED**. 29 required blueprint JSON files parsed without duplicate keys; all required stage reports present.
- INPUT_IDENTITY_AND_DESIGN_ISOLATION: **PASSED**. Source SHA-256 unchanged; canonical applicationId corroborated; forbidden design/deployment surfaces remain empty.
- INLINE_CONTRACTS_AND_RECORDS: **PASSED**. 8667 populated typed records checked against required property lists from actual inline skill contracts; common nested root shapes and coverage types/counts checked.
- ACTUAL_SCRIPT_SCHEMA_AND_NEGATIVE_CONTROLS: **PASSED**. Bundled script-analysis.schema.json evaluated with explicit checker for its actual keyword vocabulary; seven negative mutations rejected. jsonschema package unavailable; no installation.
- PROVENANCE_RAW_VALUES_AND_GENERATED_REFERENCES: **PASSED**. 2878 RFC6901 pointers resolved against actual source/generated artifacts; all retained raw evidence compared exactly; supplied spans and UI source identifiers checked.
- NORMALIZED_IDENTIFIERS_AND_GRAPH_LINKS: **PASSED**. 29647 normalized identifier/evidence/graph references resolved; null endpoints remain explicitly external/unresolved. Collection and evidence IDs unique.
- ALL_FORM_VIEW_AND_FIELD_COVERAGE: **PASSED**. 4/4 forms, 4/4 referenced subforms, 118/118 field occurrences, 12/12 views (0 folders), 70/70 columns and exact view inventory reconciled. Encoded filenames avoid source hierarchy path collisions.
- SCRIPT_SOURCE_RECONCILIATION_AND_GATE: **PASSED**. 476 normalized fragments represent 576 source strings; 100 SourceFormula/ComputedFormula pairs share evidence-linked records. Required semantic gaps correctly block readiness.

Initial diagnostic attempts failed on BusinessRules string shape and root Role-summary equality; source shapes were then inspected and handling corrected before publishing the affected valid output. The first graph-validation attempt produced a false positive at `logic/application.logic-blueprint.json#/calls/0`: a Call correctly uses `calleeId`, not dependency `targetId`. The checker was corrected to discriminate these declared record contracts and then rerun against unchanged blueprints; original failed command and exact record/IDs remain in manifest. This is a validation-tool correction, not a downgrade of a real structural failure. Orchestrator metrics reconcile ten data-model handoffs as four rich-text plus six workflow, correcting an earlier overbroad richTextHandoffs label. No dependency installation or repository definition/input modification occurred. Script schema negative-control tests ran in memory; no original Notes code or formulas executed. Optional supplied DXL/document/screenshot files were not used to replace synopsis-only source facts; paths/reason are in manifest.

## Analyzer dependency graph
`lotus-application-analyzer -> lotus-data-model-analyzer -> lotus-form-analyzer -> lotus-script-analyzer -> lotus-logic-analyzer -> lotus-workflow-analyzer -> lotus-security-analyzer -> rich-text-analyzer -> lotus-navigation-analyzer -> lotus-homepage-analyzer -> lotus-view-analyzer -> lotus-ui-analyzer -> lotus-integration-analyzer -> profile-document-analyzer`

## Exact generated artifact inventory
- `generated\blueprints\application\application.blueprint.json`
- `generated\reports\application-analysis-report.md`
- `generated\blueprints\data-model\application.data-model-blueprint.json`
- `generated\reports\data-model-analysis-report.md`
- `generated\blueprints\forms\エージェントログ.migration-blueprint.json`
- `generated\blueprints\forms\医務照会.migration-blueprint.json`
- `generated\blueprints\forms\休日設定メンテナンス.migration-blueprint.json`
- `generated\blueprints\forms\選択肢メンテナンス.migration-blueprint.json`
- `generated\reports\form-analysis-report.md`
- `generated\blueprints\scripts\application.script-blueprint.json`
- `generated\blueprints\logic\application.logic-blueprint.json`
- `generated\reports\lotus-logic-analysis-report.md`
- `generated\blueprints\workflow\application.workflow-blueprint.json`
- `generated\reports\lotus-workflow-analysis-report.md`
- `generated\blueprints\security\application.security-blueprint.json`
- `generated\reports\lotus-security-analysis-report.md`
- `generated\blueprints\rich-text\application.rich-text-blueprint.json`
- `generated\reports\rich-text-analysis-report.md`
- `generated\blueprints\navigation\navigation-blueprint.json`
- `generated\blueprints\homepage\homepage-blueprint.json`
- `generated\blueprints\views\01_業務%5C05_照会確認（Dr確認用）.migration-blueprint.json`
- `generated\blueprints\views\01_業務%5C04_受付確認(書類受付用).migration-blueprint.json`
- `generated\blueprints\views\01_業務%5C01_進捗確認（進捗別）.migration-blueprint.json`
- `generated\blueprints\views\01_業務%5C02_進捗確認（担当者別）.migration-blueprint.json`
- `generated\blueprints\views\01_業務%5C03_照会参照.migration-blueprint.json`
- `generated\blueprints\views\(99_システム%5C01_エージェントログ一覧).migration-blueprint.json`
- `generated\blueprints\views\(99_システム%5C02_削除文書一覧).migration-blueprint.json`
- `generated\blueprints\views\20_メンテナンス%5C01_休日設定.migration-blueprint.json`
- `generated\blueprints\views\20_メンテナンス%5C02_選択肢メンテナンス.migration-blueprint.json`
- `generated\blueprints\views\(99_システム%5C03_競合文書一覧).migration-blueprint.json`
- `generated\blueprints\views\(99_システム%5C04_選択肢検索用一覧).migration-blueprint.json`
- `generated\blueprints\views\(99_システム%5C99_All).migration-blueprint.json`
- `generated\blueprints\views\application.view-blueprint.json`
- `generated\blueprints\ui\application.ui-blueprint.json`
- `generated\reports\ui-analysis-report.md`
- `generated\blueprints\integrations\application.integration-blueprint.json`
- `generated\reports\lotus-integration-analysis-report.md`
- `generated\blueprints\profiles\application.profile-blueprint.json`
- `generated\reports\profile-document-analysis-report.md`
- `generated\reports\analyzer-manifest.json`
- `generated\reports\analyzer-summary.md`
- `generated\reports\cross-blueprint-validation.md`

## Handoff
STOP. Parent may report the review-required analysis but must not certify, run blueprint-orchestrator or generate design/build assets. Resolve required script/call/identity/navigation/model gaps and rerun analysis/validation before an ANALYSIS_COMPLETE handoff.
