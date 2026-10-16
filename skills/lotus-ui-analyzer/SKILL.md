---
name: lotus-ui-analyzer
description: Consolidates identity-matched Lotus Notes application, form, navigation, homepage, view, rich-text, and security evidence into a traceable UI experience blueprint without replacing specialized source blueprints or inventing missing behavior.
---

# Lotus UI Analyzer

## Purpose

Analyze and consolidate the user experience represented by the available, identity-matched application blueprints.

The UI blueprint is a cross-cutting experience projection consumed by:

- fsd-generator
- tsd-generator
- power-platform-mapper
- react-codeapp-generator

The analyzer is responsible for:

- UI composition analysis
- homepage analysis consolidation
- navigation analysis consolidation
- form experience analysis
- action analysis
- dialog analysis
- layout analysis
- view interaction analysis
- user journey analysis
- role-based UI identification
- application entry-point discovery
- cross-blueprint traceability and coverage reporting

The analyzer does not:

- generate React code
- generate Power Apps
- generate Dataverse assets
- generate workflows
- generate security models
- re-interpret or override specialized form, view, navigation, homepage, data-model, or security decisions

---

# Scope

Analyze only the active application workspace.

Workspace:

applications/<ApplicationName>/

Read only the active application's `generated/blueprints/` artifacts and the reports needed to validate their status. Do not read raw Lotus Notes source or another application's files.

Write:

generated/blueprints/ui/

generated/reports/

---

# Inputs

Required:

generated/blueprints/application/application.blueprint.json

generated/blueprints/data-model/application.data-model-blueprint.json

generated/blueprints/security/application.security-blueprint.json

Required for a complete UI analysis:

- all per-form artifacts declared by `lotus-form-analyzer` under `generated/blueprints/forms/`

- `generated/blueprints/navigation/navigation-blueprint.json`

- `generated/blueprints/homepage/homepage-blueprint.json`

- all per-view artifacts declared by `lotus-view-analyzer` under `generated/blueprints/views/`

- `generated/blueprints/rich-text/application.rich-text-blueprint.json`

If a detailed artifact set is absent, check the upstream analyzer report/inventory first. Do not infer that an empty directory means the application has no forms or views. A partial projection may be published only with `REVIEW_REQUIRED` and explicit `NOT_ASSESSED` coverage for missing categories.

---

# Outputs

generated/blueprints/ui/application.ui-blueprint.json

generated/reports/ui-analysis-report.md

---

# Stage 1 - Application Entry Points

Validate that inputs identify the same application and record the exact artifacts consumed. Treat the application blueprint as an inventory aid; do not treat a listed entry point as proof it is active or implemented.

Identify:

- launch pages
- homepage designs
- startup views
- default forms
- navigator entry points
- dashboard entry points

Generate:

application entry point inventory

---

# Stage 2 - Navigation Analysis

Consume the navigation blueprint as authoritative for navigation structure, routes, targets, and role-aware visibility. Do not rebuild or override its decisions. If it conflicts with application or homepage evidence, preserve both references and add a finding.

Analyze:

- navigators
- outlines
- menu structures
- form navigation
- view navigation
- action-based navigation
- cross-form navigation

Identify:

- navigation hierarchy
- navigation dependencies
- navigation flow

Generate:

navigation model

---

# Stage 3 - Homepage Analysis

Consume the homepage blueprint as authoritative for landing-page and startup experience. Use navigation blueprint metadata where applicable. Do not infer a homepage from the first form, view, or navigator encountered.

Analyze:

- homepages
- landing pages
- launch pages
- dashboards
- startup content
- embedded views
- embedded forms

Generate:

homepage blueprint

---

# Stage 4 - Form Experience Analysis

Consume all form migration blueprints as authoritative for form structure, fields, actions, validations, subforms, and dependencies. Preserve per-form identifiers and source names. Do not invent forms, fields, sections, or behavior to fill gaps.

Analyze:

- forms
- subforms
- tabs
- sections
- action bars
- buttons
- embedded content
- form inheritance
- dynamic behavior

For each form identify:

- purpose
- role
- interaction type
- related entities
- dependencies

---

# Stage 5 - View Experience Analysis

Consume all view migration blueprints as authoritative for view structure, columns, formulas, sorting, categories, folders, selection behavior, and actions. Preserve per-view identifiers; do not infer a view from a folder or embedded reference alone.

Analyze:

- views
- folders
- categories
- column layouts
- sorting
- filtering
- grouping
- embedded views

Generate:

view interaction model

---

# Stage 6 - Action Analysis

Identify:

- action bar commands
- shared actions
- form actions
- view actions
- navigation actions
- workflow actions

Classify:

CREATE

EDIT

DELETE

SEARCH

APPROVE

ROUTE

EXPORT

PRINT

CUSTOM

Classify an action only when source evidence supports the behavior. Keep source action type separate from any normalized interaction category. Do not infer consequential behavior such as `DELETE`, `APPROVE`, or `ROUTE` from a label alone.

---

# Stage 7 - Dialog Analysis

Identify:

- popup forms
- modal forms
- dialog interactions
- confirmation dialogs

Generate:

dialog inventory

---

# Stage 8 - User Journey Analysis

Identify:

- creation journeys
- inquiry journeys
- maintenance journeys
- approval journeys
- reporting journeys
- administration journeys

Map:

Entry Point
    ↓
Navigation
    ↓
Form/View
    ↓
Action
    ↓
Outcome

Every journey edge must reference an evidenced entry point, navigation item, form/view, action, or outcome. Mark derived or unresolved edges accordingly; do not manufacture a complete journey from disconnected UI inventories.

---

# Stage 9 - Role Based UI Analysis

Combine:

UI Components
+
Security Blueprint

Identify:

- reader experiences
- editor experiences
- approver experiences
- administrator experiences

Do not generate security decisions.

Only document UI dependencies.

Treat the security blueprint as authoritative for observed access rules. UI visibility, hidden actions, or client-side route guards are not server-side authorization and must not be described as enforcing Dataverse or document security.

---

# Stage 10 - Layout Analysis

Identify:

- sections
- groups
- tabs
- containers
- embedded layouts
- reusable UI patterns

Generate:

layout inventory

---

# Stage 11 - UI Blueprint Generation

Generate:

generated/blueprints/ui/application.ui-blueprint.json

Required sections:

{
    "uiBlueprintVersion": "1.0",
  "applicationIdentity": {},
    "sourceArtifacts": [],
    "inputCoverage": {},
  "entryPoints": [],
  "navigationModel": [],
  "homepages": [],
  "forms": [],
  "views": [],
  "actions": [],
  "dialogs": [],
  "layoutPatterns": [],
  "userJourneys": [],
  "roleBasedExperiences": [],
  "dependencies": [],
  "findings": []
}

Keep existing top-level collection names stable for downstream consumers. This UI blueprint is a cross-cutting projection; it does not replace or supersede specialized blueprints. For conflicts, preserve source references and report the conflict instead of selecting a new source of truth.

Every inventory item must include:

- stable `identifier`
- `name` or `type` where applicable
- `sourceReferences` identifying workspace-relative artifact paths and source item identifiers
- `dependencyReferences` using identifiers from supplied artifacts, or an explicit unresolved target
- `evidenceStatus` (`EXTRACTED`, `DERIVED`, `NOT_ASSESSED`, or `UNRESOLVED`)

`applicationIdentity` must contain the resolved application identifier and identity source. `sourceArtifacts` must list every consumed artifact and its scope/status. `inputCoverage` must record each category, artifact count, status (`ASSESSED`, `PARTIAL`, `NOT_ASSESSED`), and limitations. Assign deterministic identifiers; do not use current array order as identity.

---

# Validation

Verify:

- UI blueprint exists
- JSON valid
- supported `uiBlueprintVersion` present
- all required inputs identify the same application
- source artifact inventory and input coverage match the files actually consumed
- forms referenced exist
- views referenced exist
- navigation references valid
- homepage references valid
- dependencies traceable
- identifiers unique
- source item references resolve or have explicit unresolved findings
- conflicts are preserved and reported without silently overriding specialized blueprints
- role-aware UI statements do not claim server-side authorization

Status:

PASSED

REVIEW_REQUIRED

FAILED

Use `FAILED` for structural, identity, or referential-integrity failures that prevent safe publication. Use `REVIEW_REQUIRED` for a valid partial blueprint with missing inputs, unresolved references, or material conflicts. Use `PASSED` only when all required inputs and checks succeed.

---

# Report

Generate:

generated/reports/ui-analysis-report.md

Include:

- application identity
- entry point summary
- navigation summary
- homepage summary
- form summary
- view summary
- action summary
- user journey summary
- role-based experience summary
- input artifact inventory and coverage by category
- source conflicts, unresolved references, and assumptions
- whether journeys and role-aware experiences are evidenced, derived, or not assessed
- findings
- validation results

---

# Completion Status

UI_ANALYSIS_COMPLETE

REVIEW_REQUIRED

BLOCKED

`UI_ANALYSIS_COMPLETE` means all required input categories were available, identity and reference checks passed, and no material unresolved conflict remains. Use `REVIEW_REQUIRED` when a structurally valid partial projection has missing evidence, gaps, or material conflicts. Use `BLOCKED` when core inputs are missing/invalid or application identity cannot be reconciled.

---

# Completion Rules

Publish:

generated/blueprints/ui/application.ui-blueprint.json

generated/reports/ui-analysis-report.md

This blueprint is a traceable UI experience projection consumed by:

- fsd-generator
- tsd-generator
- power-platform-mapper

---