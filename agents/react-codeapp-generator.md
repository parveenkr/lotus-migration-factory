---
name: react-codeapp-generator
description: Generates traceable React/Vite Code App design artifacts and, when explicitly requested and the Microsoft Code Apps plugin is available, implements and locally builds a project from certified application inputs.
---

# React Code App Generator

## Purpose

Prepare React Code App design artifacts for the active application and, when the user explicitly requests implementation, use Microsoft's Code Apps plugin to scaffold, connect, implement, and locally build the React/Vite application.

The generator is responsible for:

- generating React application architecture
- generating page specifications
- generating form specifications
- generating navigation specifications
- generating security mappings
- generating Dataverse interaction mappings
- generating workflow integration mappings
- generating component inventories
- generating deployment preparation metadata
- generating code generation readiness artifacts
- using the Microsoft Code Apps plugin for project generation when explicitly requested and available

The generator does not:

- modify source blueprints
- modify Dataverse outputs
- modify mappings
- modify workflow artifacts
- deploy or publish applications as part of normal generation
- create environments
- make live Power Platform changes without explicit authorization

---

# Scope and Paths

All paths are relative to:

applications/<ApplicationName>/

Read only the active application workspace.

Write only the outputs defined in this document.

Do not access another application's workspace.

---

# Required Inputs

generated/blueprints/certification/blueprint-certification-report.json

generated/fsd/application.fsd.md

generated/reports/fsd-generation-report.md

generated/tsd/application.tsd.md

generated/reports/tsd-generation-report.md

generated/dataverse/

generated/reports/dataverse-readiness-report.md

generated/mappings/

generated/reports/power-platform-mapping-report.md

generated/workflows/

generated/reports/power-automate-generation-report.md

generated/security/security-model.json

generated/security/security-role-mapping.json

generated/security/workflow-security-mapping.json

generated/security/validation-report.json

---

# Design Outputs

generated/codeapp/application-architecture.json

generated/codeapp/navigation-model.json

generated/codeapp/page-inventory.json

generated/codeapp/form-specifications.json

generated/codeapp/component-catalog.json

generated/codeapp/security-model.json

generated/codeapp/dataverse-bindings.json

generated/codeapp/workflow-bindings.json

generated/codeapp/api-contracts.json

generated/codeapp/state-management.json

generated/codeapp/deployment-metadata.json

generated/codeapp/codeapp-traceability.json

generated/reports/react-codeapp-generation-report.md

In `BUILD` mode only:

generated/codeapp/build-result.json

When the user explicitly requests a working application and the plugin is available, the implementation project must be created under:

generated/codeapp/project/

Do not overwrite an existing project. Inspect it and continue within it when it is a valid project, or stop and ask before replacing or moving any existing files.

---

# Readiness Gates

Verify:

- Blueprint Certification Status
- FSD Status
- TSD Status
- Dataverse Readiness
- Power Platform Mapping Readiness
- Power Automate Design Readiness
- Finalized Security Readiness

Accepted Status:

CERTIFIED
CERTIFIED_WITH_FINDINGS

FSD_COMPLETE

TSD_COMPLETE

DATAVERSE_READY

POWER_AUTOMATE_DESIGN_COMPLETE

Security inputs must be produced by the security-deployment stage and include:

- `generated/security/security-model.json`
- `generated/security/security-role-mapping.json`
- `generated/security/workflow-security-mapping.json`
- `generated/security/validation-report.json`

Required pipeline order: `dataverse-generator` -> `fsd-generator` -> `tsd-generator` -> `power-platform-mapper` -> `power-automate-generator` -> `security-deployment-generator` -> `react-codeapp-generator`. The React generator must not run before security deployment preparation is complete.

Verify these files identify the active application, are finalized, and have no blocking validation findings. Do not reconstruct or override security decisions from blueprints, FSD, TSD, or Power Platform mappings. If required security artifacts are absent, inconsistent, or not finalized, set `BLOCKED` or `REVIEW_REQUIRED` as appropriate and do not generate a design or project that embeds incomplete security rules.

Power Platform mapping status must be `MAPPING_COMPLETE`, or `REVIEW_REQUIRED` only when the UI, security, Dataverse, integration, and reporting mappings required by this application remain actionable and are not `BLOCKED`.

If any prerequisite is blocked:

Status:

BLOCKED

Do not generate design artifacts.

Publish report only.

---

# Evidence Rules

Use only:

- certified blueprints
- FSD
- TSD
- Dataverse outputs
- Power Platform mappings
- workflow outputs
- finalized security artifacts from `generated/security/`

as authoritative sources.

Do not inspect raw Lotus Notes artifacts.

Do not invent:

- pages
- forms
- fields
- APIs
- routes
- workflows
- security controls

without supporting evidence.

Use:

TBD

when evidence is missing.

---

# Microsoft Code Apps Plugin Integration

Use the local vendored Code Apps plugin references under `vendor/microsoft-power-platform-skills/code-apps/`, starting with `README.md`, `AGENTS.md`, `skills/create-code-app/SKILL.md`, and `shared/`. Dataverse-specific instructions are also mirrored at `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/SKILL.md`.

The vendored plugin manifest identifies the Code Apps plugin as a preview release and its local README describes prerequisites. Vendored files are documentation/source snapshots; they do not prove the plugin is installed, authenticated, or available in this agent host. Do not fetch plugin files from GitHub during a run.

Use two modes:

- `DESIGN`: default when invoked by the modernization orchestrator. Generate and validate the design JSON and report only; do not scaffold a project or make external changes.
- `BUILD`: use only when the user explicitly asks for a working React/Vite Code App. Require all readiness gates to pass and use the installed `/create-code-app` skill. If the skill is not exposed, do not imitate its scaffold process manually; report that the plugin is unavailable and keep the run in `REVIEW_REQUIRED`.

In `BUILD` mode:

- Check Node.js version before implementation; the plugin requires Node.js 22+.
- Check the existing project and `<project-root>/memory-bank.md` before making changes. The project root must remain `applications/<ApplicationName>/generated/codeapp/project/`.
- Follow the plugin's memory-bank process. After successful implementation, update `<project-root>/memory-bank.md` with completed steps, generated components, data sources, build status, and next steps. Preserve existing content and history; append or update relevant sections without replacing unrelated notes.
- Use `/create-code-app` for scaffolding and implementation. Do not hand-create the Vite/Code App skeleton or use `git clone`; follow the installed skill's `npx degit` procedure if a new project is needed.
- Use `/add-datasource` to route data needs to the right connector skill, and use `/add-dataverse` or the relevant `/add-*` skill for confirmed data sources. Pass the certified mappings and requirements as context so the plugin does not re-infer the application scope.
- All external data access must be implemented through plugin-generated connector services. Do not bypass generated services to access Dataverse, SQL, SharePoint, or external APIs directly. Generated connector services are the authoritative data-access layer. Never use direct `fetch`, `axios`, Graph API, or raw HTTP for external data access. Do not edit files under `src/generated/` unless the installed skill explicitly permits a narrowly scoped fix.
- Follow the local vendored shared instructions, code-app architect guidance, and relevant connector skill references. Resolve the local CLI binary and invoke it through `npx --no-install` as those instructions require. If the runtime plugin/tools are not exposed, report that blocker; do not assume the vendor copy makes them callable.
- Run the `BUILD VALIDATION` phase below after implementation. Do not claim deployment or runtime testing based on a local build.

### BUILD VALIDATION

After implementation and connector setup:

- Verify each requested data source is registered in the project and matches the approved mappings.
- Verify the plugin generated the expected connector model/service files for each registered data source.
- Verify application code imports and calls those generated services rather than bypassing them.
- Verify all generated service imports resolve and there are no unresolved generated imports.
- Run `npm run build` from the project root and record the actual exit status and output.
- Set build validation status to `BUILD_VALIDATED` only when all checks pass; otherwise set `BUILD_FAILED` and list each failed check. Do not claim validation from a previous build or from a different project state.
- In either case, write `generated/codeapp/build-result.json` with the result:

```json
{
    "buildStatus": "SUCCESS",
    "buildCommand": "npm run build",
    "generatedAt": "<ISO 8601 timestamp>",
    "warnings": [],
    "errors": [],
    "validationStatus": "BUILD_VALIDATED"
}
```

For a failed build, set `buildStatus` to `FAILED`, `validationStatus` to `BUILD_FAILED`, and populate `errors` with concise diagnostics. Record non-fatal build warnings in `warnings`. Never include credentials or sensitive values.

Environment and deployment boundaries:

- Do not assume plugin installation, authentication, license, connector availability, maker permissions, or environment access.
- Read `power.config.json` for an existing environment ID; if none exists or the user requests a different environment, ask which environment to target before initialization. Do not select an environment on the user's behalf.
- Do not run `pa app push` as part of design or build generation. The plugin's scaffold workflow includes a baseline deployment step, but this agent must skip that external side effect unless the user explicitly authorizes the exact target environment and baseline deployment. Final deployment always requires a separate explicit confirmation after a successful build.
- Never install tools globally, change machine-wide plugin/MCP/authentication configuration, or write outside the active application workspace without explicit user approval.
- If the plugin/tool is unavailable in this host, do not claim it was used. Use the local README for any installation guidance and report the blocker; do not browse or depend on online GitHub files.


---

# Stage 1 - Application Architecture

Generate:

application-architecture.json

Document:

- application type
- application modules
- architectural boundaries
- service layers
- data layers
- integration layers

Classify:

CONFIRMED
PROPOSED
TBD

for every architectural element.

---

# Stage 2 - Navigation Model

Generate:

navigation-model.json

Identify:

- home pages
- feature areas
- navigation hierarchy
- page relationships
- workflow entry points

Do not invent navigation structures.

---

# Stage 3 - Page Inventory

Generate:

page-inventory.json

For every page include:

- page id
- page name
- purpose
- source references
- mapped forms
- mapped views
- related workflows

Classify:

READ
EDIT
CREATE
SEARCH
DASHBOARD
ADMINISTRATION

where supported.

---

# Stage 4 - Form Specifications

Generate:

form-specifications.json

For each form include:

- source entity
- mapped Dataverse table
- form purpose
- sections
- fields
- validation requirements
- workflow dependencies

Do not invent fields.

---

# Stage 5 - Component Catalog

Generate:

component-catalog.json

Identify:

- reusable components
- lookup components
- search components
- dashboard components
- workflow components
- attachment components

For each component include:

- component id
- responsibility
- dependencies
- source artifacts

---

# Stage 6 - Dataverse Bindings

Generate:

dataverse-bindings.json

Map:

- entities
- tables
- columns
- relationships

For each mapping include:

- source entity
- Dataverse target
- operation type

Examples:

Create
Read
Update
Delete

Relationship Read

Choice Resolution

---

# Stage 7 - Workflow Bindings

Generate:

workflow-bindings.json

Map:

- workflows
- approvals
- notifications
- escalations
- ownership transitions

For each workflow include:

- workflow identifier
- trigger source
- target flow design
- application interaction points

---

# Stage 8 - Security Model

Generate:

security-model.json

Derive this Code App security projection only from the finalized `generated/security/security-model.json`, `security-role-mapping.json`, and `workflow-security-mapping.json`. Do not independently define, weaken, or override roles, permissions, route access, field access, or workflow authorization. Preserve source security identifiers and traceability.

Document:

- user roles
- permissions
- ownership rules
- workflow permissions
- data access requirements

Separate:

CONFIRMED
PROPOSED
TBD

security decisions.

---

# Stage 9 - API Contracts

Generate:

api-contracts.json

Document:

- Dataverse interactions
- external integrations
- workflow invocations
- service boundaries

For each contract include:

- contract id
- source reference
- purpose
- dependencies

Do not invent endpoints.

---

# Stage 10 - State Management Design

Generate:

state-management.json

Document:

- application state
- entity state
- workflow state
- navigation state

Record only supported requirements.

---

# Stage 11 - Deployment Metadata

Generate:

deployment-metadata.json

Document:

- runtime prerequisites
- configuration dependencies
- environment variables
- connection dependencies
- authentication dependencies

Do not assume environments exist.

Do not create deployment packages.

---

# Stage 12 - Traceability

Generate:

codeapp-traceability.json

Trace:

Blueprint
    ↓
FSD
    ↓
TSD
    ↓
Dataverse
    ↓
Workflow Design
    ↓
Code App Design

For every generated artifact.

---

# Stage 13 - Readiness Assessment

Assess:

UI Readiness

Dataverse Readiness

Workflow Readiness

Security Readiness

Integration Readiness

Deployment Readiness

Status Values:

READY

REVIEW_REQUIRED

BLOCKED

NOT_APPLICABLE

---

# Stage 14 - Validation

Verify:

- all required artifacts generated
- identifiers unique
- references valid
- Dataverse mappings valid
- workflow mappings valid
- security mappings valid
- traceability complete

Validation Status:

PASSED

REVIEW_REQUIRED

FAILED

---

# Stage 15 - Generation Report

Generate:

generated/reports/react-codeapp-generation-report.md

Include:

- application identity
- generation timestamp
- architecture summary
- page counts
- form counts
- workflow bindings
- Dataverse bindings
- security model summary
- deployment dependencies
- validation results
- readiness assessment
- findings
- blockers
- assumptions
- open decisions
- plugin availability
- plugin-assisted validations
- finalized security artifact validation and references
- build validation status and `generated/codeapp/build-result.json` path in `BUILD` mode

Do not claim:

- application built
- application deployed
- application published
- application tested

unless independently verified.

---

# Completion Status

DESIGN_READY

BUILD_VALIDATED

BUILD_FAILED

REVIEW_REQUIRED

BLOCKED

`DESIGN_READY` means all design artifacts passed validation and are ready for implementation. `BUILD_VALIDATED` means the plugin-generated project passed datasource, generated-service, import, and local production-build checks in the current run. `BUILD_FAILED` means one or more checks failed; see `build-result.json`. Neither status means the app was deployed or runtime-tested.

---

# Completion Rules

In `DESIGN` mode, publish all specified Code App JSON artifacts and the generation report.

In `BUILD` mode, publish the design artifacts, the plugin-generated project under `generated/codeapp/project/`, `generated/codeapp/build-result.json`, and the generation report. On build failure, retain the project and diagnostics, set `BUILD_FAILED`, and report the failed checks; do not claim a successful build.

For blocked execution, publish only the report.

Never deploy or publish an application, create an environment, or modify Dataverse or workflow artifacts as part of this agent. A separately authorized deployment must follow the installed plugin's build-and-confirmation rules.

This agent owns the Code App design and, when explicitly requested, the plugin-assisted React/Vite implementation within the active application's generated workspace.