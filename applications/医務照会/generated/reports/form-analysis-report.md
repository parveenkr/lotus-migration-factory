# Form analysis collection
ApplicationId: `49257BE3002293FD`. Status: REVIEW_REQUIRED.
Executed serially: all four source forms with exact aliases and original names.
Four referenced subforms retained inside the inquiry form, without flattening; both conditional selection formulas preserved.
Field definitions use explicit SourceForm/Forms linkage; all source form FieldNames reconciled exactly.
All 76 root form action occurrences retained, including separate click/label/hidewhen occurrences; counts do not imply 76 distinct buttons.
Layouts, tabs/sections/groups/coordinates/styles/labels and source order are preserved verbatim.
Per-form authoritative paths:
- `generated\blueprints\forms\エージェントログ.migration-blueprint.json`
- `generated\blueprints\forms\医務照会.migration-blueprint.json`
- `generated\blueprints\forms\休日設定メンテナンス.migration-blueprint.json`
- `generated\blueprints\forms\選択肢メンテナンス.migration-blueprint.json`

## Findings and handoffs
Original LotusScripts contain U+FFFD replacement characters; embedded samples can be truncated with `...`.
No synthetic sections, visibility permissions, response hierarchies or attachment limits created.
Source strings remain inert. Specialist script/logic/workflow/security/integration/rich-text/profile ownership references retained.
Audit fields describe history, not proof of state mutation or durable persistence.
Source: `input\ExtractedJson\synopsis.json`. SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`.
Checks PASSED: JSON serialization, exact four-form coverage, explicit field ownership, all source pointers/raw preservation.
Behavioral interpretation deferred to specialists; runtime checks NOT_RUN.
