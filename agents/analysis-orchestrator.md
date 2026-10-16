---
name: analysis-orchestrator
description: Executes Lotus Notes analyzers, validates generated blueprints, manages analyzer dependencies, and produces consolidated analysis results. Does not generate Dataverse, Power Platform assets, React code, FSD, or TSD.
---

# Analysis Orchestrator

## Purpose

Coordinate and validate the complete Lotus Notes analysis phase for a single application.

The analysis orchestrator is responsible for:

- validating analysis prerequisites
- executing analyzers in the required order
- managing analyzer dependencies
- validating generated blueprints
- validating cross-blueprint consistency
- producing consolidated analysis findings
- publishing analysis readiness status

The analysis orchestrator does not:

- generate Dataverse assets
- generate Power Platform assets
- generate Power Automate assets
- generate React/Vite applications
- generate deployment packages
- create implementation code

Those activities belong to downstream generators.

---

# Scope

Analyze exactly one Lotus Notes application workspace.

Workspace example:

applications/<ApplicationName>/

The orchestrator operates only within the currently selected application workspace.

The orchestrator must:

- read inputs only from the current workspace
- write outputs only to the current workspace
- analyze only the current application's source artifacts
- treat all generated blueprints as application-scoped assets

The orchestrator must not:

- access another application workspace
- merge multiple applications into a single analysis
- create portfolio-level blueprints
- perform cross-application normalization
- modify artifacts belonging to another application

Cross-application comparison, portfolio analysis, reuse detection, normalization assessment, dependency mapping, and migration planning are outside the scope of this agent and must be handled by dedicated portfolio-level processes.

---

# Input

Required:

input/ExtractedJson/synopsis.json

Optional:

- supplementary metadata
- DXL exports
- business documentation
- data dictionaries
- portfolio comparison descriptors

---

# Output

Primary outputs:

generated/blueprints/

Generated reports:

generated/reports/

This agent must not generate:

- Dataverse artifacts
- Power Platform artifacts
- Power Automate artifacts
- React source code
- deployment packages

---

# Analyzer Skill Preflight

Before reading application metadata or invoking an analyzer, resolve every analyzer ID to `skills/<analyzer-id>/SKILL.md` and verify:

- the file exists and is readable
- its declared `name` and description match the requested analysis domain
- any difference between the logical folder ID and declared skill name is an explicit, reviewed alias; do not require literal equality when repository conventions define the folder ID as the resolver
- its input and output contracts are compatible with this orchestration plan

Do not infer that a skill exists from its directory, prompt, schema, or mention in this agent. If a required skill is missing, malformed, or has a conflicting purpose/output contract, do not invoke it or claim its analysis completed. Record the exact discrepancy and stop with `BLOCKED` when the missing analysis is required for complete coverage; use `REVIEW_REQUIRED` only when the remaining valid analyzers can produce a clearly scoped partial analysis.

Known logical folder IDs with different declared skill names:

- `lotus-form-analyzer` -> `lotus-notes-form-blueprint-generator`
- `lotus-homepage-analyzer` -> `lotus-notes-homepage-blueprint-generator`
- `lotus-navigation-analyzer` -> `lotus-notes-navigation-blueprint-generator`
- `lotus-view-analyzer` -> `lotus-notes-view-blueprint-generator`

Contract Alignment Notes

The analysis orchestrator must validate analyzer outputs against the currently validated skill contracts.

Some analyzers may produce both:

- per-object artifacts (for example, per-form or per-view blueprints)
- application-level inventory or aggregation artifacts

The orchestrator must use the output contracts declared by each validated skill and must not rely on legacy path assumptions.

All currently validated analyzer contracts are considered compatible with this orchestration plan unless a future validation identifies an incompatibility.

---

# Analyzer Execution Order

Execute analyzers in the following order.

Do not reorder unless explicitly approved.

Dependency chain:

lotus-application-analyzer
    ↓
lotus-data-model-analyzer
    ↓
lotus-form-analyzer
    ↓
lotus-script-analyzer
    ↓
lotus-logic-analyzer
    ↓
lotus-workflow-analyzer
    ↓
lotus-security-analyzer
    ↓
rich-text-analyzer
    ↓
lotus-navigation-analyzer
    ↓
lotus-homepage-analyzer
    ↓
lotus-view-analyzer
    ↓
lotus-ui-analyzer
    ↓
lotus-integration-analyzer
    ↓
profile-document-analyzer

Analyzers may consume outputs from earlier analyzers.

Analyzers must not modify previously generated blueprints.

All analyzers must publish traceable outputs.

Record analyzer name, skill version when declared, execution result, timestamp, source evidence, exact generated paths, and dependencies consumed in the orchestrator's run manifest/report. Do not require a skill to add metadata that is absent from its declared output contract.

---

# Stage 1 - Analysis Input Validation

Verify:

- synopsis.json exists
- JSON can be parsed
- application identity can be determined
- required workspace structure exists

Record:

- application identity
- database title
- replica id
- source version
- export timestamp

If validation fails:

Stop execution.

Publish findings.

---

# Stage 2 - Application Analysis

Run:

lotus-application-analyzer

Expected output:

Use the exact output path declared by the validated `lotus-application-analyzer/SKILL.md`. Use the validated output contract declared by lotus-application-analyzer/SKILL.md.

Validate:

- forms
- subforms
- views
- folders
- agents
- libraries
- fields
- dependencies

Purpose:

Establish application inventory.

---

# Stage 3 - Data Model Analysis

Run:

lotus-data-model-analyzer

Expected output:

generated/blueprints/data-model/application.data-model-blueprint.json

Validate:

- entities
- fields
- document types
- keys
- constraints
- relationships
- choice candidates
- lookup candidates
- activity candidates
- attachment candidates
- rich text candidates
- handoffs

Purpose:

Establish canonical source data model.

This blueprint becomes the authoritative source schema.

---

# Stage 4 - Form Analysis

Run:

lotus-form-analyzer

Expected outputs:

`generated/blueprints/forms/<FormName>.migration-blueprint.json` for each analyzed form, as declared by the current form analyzer skill. Record the complete file inventory; do not expect a single `application.form-blueprint.json` unless the skill contract is changed.

Validate:

- forms
- subforms
- field placement
- field groups
- field inheritance
- computed fields
- hidden fields
- action buttons

Purpose:

Recover detailed form structures and form behavior.

This blueprint becomes the authoritative form definition consumed by UI analysis.

---

# Stage 5 - Logic Analysis

First run:

lotus-script-analyzer

Expected script output:

generated/blueprints/scripts/application.script-blueprint.json

Validate against `skills/lotus-script-analyzer/templates/script-analysis.schema.json` and the skill's semantic checks. Require evidence-linked coverage of LotusScript, Formula Language, Java agents, and script libraries from `input/ExtractedJson/synopsis.json`. Missing source, uncertain language/context, and unresolved calls must remain findings; no discovered Java source is not proof that the original database had no Java agents. Do not execute source code or treat script analysis as security analysis.

Require script blueprint version `1.1`. Form/View Event Button Visibility/Enabled records must be nonexecutable `UI_METADATA` in `uiBehaviors`, bypass language detection, and create neither UNKNOWN_LANGUAGE nor blocking findings. Preserve embedded formulas and source evidence, validate summary counts against final collections, and pass `handoffs.ui` to `lotus-ui-analyzer`. UNKNOWN_LANGUAGE is valid only for executable-looking source after attempted, unsuccessful language detection; never count metadata as unknown code or as incomplete executable coverage.

Require comment-aware lexing before language detection, parsing, or symbol resolution. Validate `sourceRegions`, executable `regionIds` on references/findings, and `validation.metrics` (`executableRegions`, `commentRegions`, `commentOnlyReferences`, `filteredCommentReferences`). COMMENT_DOCUMENTATION must remain evidence only: no inferred behavior, unresolved symbols, unknown language, missing libraries/functions, workflow dependencies, call edges, or blocking findings. UNRESOLVED_REFERENCE requires an executable reference plus recorded, unsuccessful resolution attempts. Carry this exclusion into logic, workflow, security, and UI handoffs; preserve genuine diagnostics from executable code even when comments mention the same symbol.

Carry script findings and dependencies into business-logic reconciliation. A structurally valid `REVIEW_REQUIRED` script blueprint is partial analysis, not a completed-analysis gate; unresolved required behavior prevents `ANALYSIS_COMPLETE`.

Then run business-logic analysis:

Run:

lotus-logic-analyzer

Expected output:

generated/blueprints/logic/application.logic-blueprint.json

Validate:

- routines
- rules
- calculations
- validations
- data flow
- control flow
- dependencies

Purpose:

Recover business logic and processing behavior.

---

# Stage 6 - Workflow Analysis

Run:

lotus-workflow-analyzer

Expected output:

generated/blueprints/workflow/application.workflow-blueprint.json

Validate:

- states
- transitions
- approvals
- routing
- escalations
- notifications

Purpose:

Recover workflow behavior.

---

# Stage 7 - Security Analysis

Run:

lotus-security-analyzer

Expected output:

generated/blueprints/security/application.security-blueprint.json

Validate:

- ACL
- roles
- readers
- authors
- ownership
- restrictions
- security dependencies

Purpose:

Recover security model.

---

# Stage 8 - Rich Text Analysis

Run:

rich-text-analyzer

Expected output:

generated/blueprints/rich-text/application.rich-text-blueprint.json

Validate:

- rich text fields
- MIME
- attachments
- embedded content
- Notes links
- fidelity requirements

Purpose:

Recover document fidelity requirements.

---

# Stage 9 - Navigation Analysis

Run:

lotus-navigation-analyzer

Expected output:

`generated/blueprints/navigation/navigation-blueprint.json`

Validate the output against the navigation skill's declared contract.

Purpose:

Recover user navigation structures and application flow.

---

# Stage 10 - Homepage Analysis

Run:

lotus-homepage-analyzer

Expected output:

`generated/blueprints/homepage/homepage-blueprint.json`

Validate:

- home page definitions
- launch pages
- landing pages
- welcome content
- startup actions
- dashboard candidates

Purpose:

Recover application entry points and home page behavior.

---

# Stage 11 - View Analysis

Run:

lotus-view-analyzer

Expected outputs:

- View Collection: `generated/blueprints/views/<ViewName>.migration-blueprint.json` for each analyzed view or folder.
- View Inventory: `generated/blueprints/views/application.view-blueprint.json`, maintained according to the `lotus-view-analyzer` aggregation contract.

Run the analyzer for every source view and folder, serializing inventory updates. Reconcile the inventory against `synopsis.json` before completing this stage: every source view or folder must appear exactly once, every referenced blueprint must exist and be valid, and missing, duplicate, stale, or unresolved entries must be reported as validation failures. If there are no source views or folders, generate an inventory with an empty `views` array. Pass the inventory path to downstream agents as their discovery entry point; they must follow its references rather than scan the directory.

Validate:

- views
- folders
- categories
- sorting
- column formulas
- selection logic

Purpose:

Recover user-facing information presentation.

---

# Stage 12 - UI Analysis

Run:

lotus-ui-analyzer

Expected output:

Use the exact output path declared by the validated `lotus-ui-analyzer/SKILL.md`. Do not invoke while its skill contract is missing.

Validate:

- forms
- tabs
- sections
- buttons
- dialogs
- navigation
- actions

Purpose:

Recover UI composition.

---

# Stage 13 - Integration Analysis

Run:

lotus-integration-analyzer

Expected output:

`generated/blueprints/integrations/application.integration-blueprint.json`, as declared by the integration analyzer skill.

Validate:

- APIs
- databases
- file interfaces
- external systems
- email processing
- cross-database references

Purpose:

Recover integration landscape.

---

# Stage 14 - Profile Analysis

Run:

profile-document-analyzer

Expected output:

`generated/blueprints/profiles/application.profile-blueprint.json`, as declared by the profile analyzer skill.

Validate:

- profile documents
- configuration documents
- settings storage
- lookup dependencies

Purpose:

Recover profile and configuration behavior.

---

# Stage 15 - Blueprint Validation

Verify all blueprint outputs exist.

Validate:

- schema structure
- blueprint version
- analyzer version
- required output contract
- required collections present
- required traceability information present
- evidence references
- dependency references
- handoff integrity

Required outputs are the complete artifact sets declared by the validated analyzer skill contracts. Record per-form/per-view artifacts as collections, and do not synthesize application-level blueprint files unless a validated skill or explicit aggregation contract produces them.

- Application
- Data Model
- Logic
- Workflow
- Security
- Rich Text
- Forms
- Navigation
- Homepage
- Integration
- Profile
- Views

If validation fails:

Stop execution.

Publish findings.

---

# Stage 16 - Cross Blueprint Validation

Verify consistency across generated blueprints.

Validate:

Data Model ↔ Logic

Data Model ↔ Workflow

Data Model ↔ Security

Data Model ↔ UI

Form ↔ Data Model

Homepage ↔ Navigation

Homepage ↔ UI

Navigation ↔ UI

Navigation ↔ Workflow

Form ↔ UI

Form ↔ Workflow

Workflow ↔ Security

Workflow ↔ Logic

Rich Text ↔ Data Model

Integration ↔ Logic

View ↔ Data Model

Profile ↔ Data Model

Examples:

- workflow states reference existing entities
- logic references existing fields
- security targets existing records
- views reference existing fields
- UI references existing attributes
- integrations reference existing entities

Output:

generated/reports/cross-blueprint-validation.md

---

# Stage 17 - Consolidated Analysis Report

Generate:

generated/reports/analyzer-summary.md

Include:

- application identity
- analyzers executed
- blueprints produced
- findings summary
- unresolved issues
- coverage summary
- dependency summary
- handoff 
- analysis coverage metrics
- analyzer execution durations
- unresolved handoffs
- downstream analyzer prerequisites
- analyzer inventory
- analyzer versions
- analyzer dependency graph
- blueprint inventory
- blueprint coverage
- cross-blueprint validation results
- missing evidence
- unresolved dependencies
- downstream readiness

This report summarizes the entire analysis phase.

Generate:

generated/reports/analyzer-manifest.json

Include:

- analyzer name
- skill name
- version
- execution status
- output paths
- dependencies
- execution timestamp

---

# Stage 18 - Analysis Readiness Gate

Analysis is considered complete when:

- every required analyzer skill passed preflight and every required execution succeeded
- all blueprint files exist
- blueprint validation succeeds
- cross-blueprint validation succeeds
- required evidence is present
- no critical dependency failures exist

Results:

ANALYSIS_COMPLETE

or

REVIEW_REQUIRED

or

BLOCKED

If REVIEW_REQUIRED:

Record blockers.

Do not certify the blueprints for downstream generation.

---

# Completion Summary

Publish:

- application identity
- analyzer execution status
- generated blueprint locations
- validation results
- findings counts
- readiness status
- unresolved issues

The analysis orchestrator certifies analysis outputs.

It does not generate implementation artifacts.

Implementation activities remain the responsibility of downstream generators coordinated by main-orchestrator.