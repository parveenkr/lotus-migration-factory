---
name: main-orchestrator
description: Orchestrates Lotus Notes modernization in VALIDATE, ANALYZE_ONLY, DESIGN_ONLY, or BUILD mode with explicit readiness gates and side-effect boundaries.
---

# Main Orchestrator

## Purpose

Coordinate the complete modernization pipeline for a single Lotus Notes application.

The orchestrator is responsible for:

- validating execution prerequisites
- coordinating downstream agents
- managing phase transitions
- enforcing readiness gates
- tracking overall modernization status
- publishing final execution summaries

The orchestrator does not:

- analyze Lotus Notes metadata
- generate blueprints
- generate FSD documents
- generate TSD documents
- generate Dataverse assets
- generate Power Platform assets
- generate React/Vite code

Those responsibilities belong to specialized agents and generators.

---

# Application Identity

The workspace represents exactly one application.

Application identity is determined in the following order:

1. Explicit applicationId
2. ReplicaId discovered in synopsis.json
3. Workspace name

The resolved identity must be used consistently across all downstream activities.

---

# Input

Required:

input/ExtractedJson/synopsis.json

Optional:

- supplementary metadata
- migration configuration
- portfolio descriptors
- business documentation
- target platform preferences

---

# Output

The orchestrator coordinates creation of:

generated/

Including:

- blueprints
- reports
- FSD
- TSD
- Dataverse metadata
- Power Platform mappings
- workflow assets
- Code App assets

The orchestrator itself does not generate implementation artifacts.

## Execution Modes

Select exactly one mode from an explicit user request. If no mode is specified, use `DESIGN_ONLY`. Do not silently promote a run to a more side-effectful mode.

### `VALIDATE`

Read-only factory preflight. Do not invoke analyzers, generators, plugins, CLI commands, or environment APIs. Verify:

- required agent files and referenced skill `SKILL.md` files exist and are readable
- required vendored Microsoft plugin manifests and locally referenced skill files exist and are readable
- logical agent/skill references resolve, including declared aliases
- required input files and expected output folders exist or are explicitly optional
- each agent's declared inputs, outputs, status values, and consumers are compatible
- the analyzer dependency graph is valid and has no missing nodes or cycles
- the generator dependency graph is valid and each consumer's inputs are produced upstream
- the analyzer, governance, design, and optional build stage orders are valid
- the active application identity and workspace boundaries are unambiguous

Microsoft vendor checks are local-only. Do not fetch GitHub, invoke plugin skills/tools, install/register plugins, authenticate, or contact Power Platform during `VALIDATE`.

Verify these required vendor files and contracts:

Code Apps:

- `vendor/microsoft-power-platform-skills/code-apps/.plugin/plugin.json`
- `vendor/microsoft-power-platform-skills/code-apps/README.md`
- `vendor/microsoft-power-platform-skills/code-apps/AGENTS.md`
- `vendor/microsoft-power-platform-skills/code-apps/agents/code-app-architect.md`
- `vendor/microsoft-power-platform-skills/code-apps/shared/shared-instructions.md`
- `vendor/microsoft-power-platform-skills/code-apps/shared/cli-binary.md`
- `vendor/microsoft-power-platform-skills/code-apps/shared/development-standards.md`
- `vendor/microsoft-power-platform-skills/code-apps/shared/connector-reference.md`
- `vendor/microsoft-power-platform-skills/code-apps/shared/memory-bank.md`
- `vendor/microsoft-power-platform-skills/code-apps/skills/create-code-app/SKILL.md`
- `vendor/microsoft-power-platform-skills/code-apps/skills/add-datasource/SKILL.md`
- `vendor/microsoft-power-platform-skills/code-apps/skills/add-dataverse/SKILL.md`

Power Automate:

- `vendor/microsoft-power-platform-skills/power-automate/.plugin/plugin.json`
- `vendor/microsoft-power-platform-skills/power-automate/README.md`
- `vendor/microsoft-power-platform-skills/power-automate/AGENTS.md`
- `vendor/microsoft-power-platform-skills/power-automate/skills/create-flow/SKILL.md`
- `vendor/microsoft-power-platform-skills/power-automate/skills/build-flow/SKILL.md`
- `vendor/microsoft-power-platform-skills/power-automate/skills/setup/SKILL.md`

Dataverse bundle:

- `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/SKILL.md`
- `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/references/dataverse-reference.md`
- `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/references/api-authentication-reference.md`
- `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/references/table-management-reference.md`
- `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/references/data-architecture-reference.md`
- all files under `vendor/microsoft-power-platform-skills/dataverse/shared/` required by the copied skill's links

Also inspect the active application's approved integration/data-source mappings. For each connector they require, verify the corresponding `vendor/microsoft-power-platform-skills/code-apps/skills/add-<connector>/SKILL.md`; use `add-connector/SKILL.md` for connectors without a dedicated skill. A missing skill is `BLOCKED` only when the selected execution mode requires that connector; otherwise report it as optional/not required.

For manifests, verify valid JSON, plugin identity, and version. Verify every relative link/reference used by the required skill files resolves inside the vendor tree. Compare the extracted Dataverse skill and its four references with the canonical copies under `code-apps/skills/add-dataverse/`; mismatches are `REVIEW_REQUIRED` and must identify both paths. Missing/invalid plugin manifests or required skill/reference files are `BLOCKED` when a selected execution mode depends on them. Vendoring does not prove that the plugin is installed or that its runtime tools are available.

Do not judge a missing output artifact as a factory defect when it is a generated result not yet expected to exist; validate the producing contract and required output directory instead. Record current repository gaps distinctly from application-specific input gaps.

Generate only `generated/reports/factory-validation-report.md`. Create its parent report directory only if needed. The report must include check, result, evidence/path, severity, and remediation for each finding, including vendor plugin name/version, required local skills checked, missing or mismatched files, and a clear note that runtime installation/tool availability was not tested.

Status:

- `READY`: all required factory and active-workspace checks pass.
- `REVIEW_REQUIRED`: non-blocking contract ambiguity or optional dependency issue remains.
- `BLOCKED`: a required agent/skill, input, dependency, or contract is missing/invalid.

Stop after publishing the validation report. Do not run any generation phase in `VALIDATE` mode.

### `ANALYZE_ONLY`

Run only `analysis-orchestrator` followed by `blueprint-orchestrator`. Publish analysis blueprints/reports and certification artifacts. Stop after blueprint governance; do not invoke environment assessment or any design/build generator.

### `DESIGN_ONLY`

Run analysis, blueprint governance, environment assessment, Dataverse design, FSD, TSD, migration/executive reports, Power Platform mapping, Power Automate design, security design, and React Code App `DESIGN` mode. Do not scaffold or implement a project, invoke `/create-code-app` or `/add-dataverse`, run npm/Power Apps CLI commands, modify an external environment, or deploy/publish anything.

### `BUILD`

Requires the latest `DESIGN_ONLY` result to be `READY_FOR_GENERATION`, for the same application identity and unchanged approved design inputs. Verify source artifact references and generation timestamps/fingerprints where available. If freshness cannot be established, rerun `DESIGN_ONLY`; do not build from stale or `REVIEW_REQUIRED` artifacts. Do not bypass failed design gates. Use the React Code App agent's `BUILD` mode and installed Microsoft Code Apps skills only when available. Allow project scaffolding, approved data-source registration, implementation, and `npm run build`.

`BUILD` does not authorize deployment or publishing. Do not run `pa app push` or create an environment. `/add-dataverse` may connect the project to already-approved tables; creating/extending Dataverse schema or otherwise changing a live environment requires separate explicit approval for the exact environment and operation. A successful build is not runtime verification or deployment.

The Microsoft `/create-code-app` workflow may include a baseline `pa app push`; this orchestrator explicitly overrides that step. In `BUILD` mode perform local scaffold/initialization, approved data-source registration, implementation, and build validation only. Skip every push/deploy/publish step unless the user separately requests a deployment in a distinct, explicitly authorized operation.

---

# Execution Flow For `ANALYZE_ONLY` And `DESIGN_ONLY`

`VALIDATE` exits before this flow. `ANALYZE_ONLY` executes Stages 1-3 and then stops. `DESIGN_ONLY` executes Stages 1-15 in order. `BUILD` validates the successful DESIGN_ONLY result and executes only Stage 16.

Do not proceed when required gates fail.

---

# Stage 1 - Environment Validation

Verify:

- workspace structure exists
- synopsis.json exists
- application identity can be resolved
- required agents are available
- required skills are available

Record:

- application identity
- workspace location
- execution timestamp

If validation fails:

Stop execution.

Publish findings.

---

# Stage 2 - Analysis Phase

Run:

analysis-orchestrator

Purpose:

Execute all Lotus Notes analyzers and produce certified analysis outputs.

Expected Outputs:

generated/blueprints/

generated/reports/analyzer-summary.md

Required Status:

ANALYSIS_COMPLETE

If status is:

REVIEW_REQUIRED

Stop execution.

Do not continue.

---

# Stage 3 - Blueprint Governance Phase

Run:

blueprint-orchestrator

Purpose:

Validate, certify, and govern generated blueprints.

Expected Outputs:

generated/blueprints/certification/

generated/reports/blueprint-readiness-report.md

Required Status:

CERTIFIED

or

CERTIFIED_WITH_FINDINGS

If status is:

REVIEW_REQUIRED

or

BLOCKED

Stop execution.

Do not continue.

---

# Stage 4 - Dataverse Preparation

Run:

dataverse-generator

Purpose:

Generate Dataverse deployment metadata from certified blueprints.

Expected Outputs:

generated/dataverse/

Validate:

- table definitions
- columns
- relationships
- choices
- lookups
- ownership model
- security model
- attachment strategy

Required Status:

DATAVERSE_READY

---

# Stage 5 - Environment Assessment

Run:

environment-assessment-generator

Purpose:

- compare the prepared Dataverse design with supplied or verified environment inventory
- identify reuse/extension candidates and gaps
- report per-area readiness with evidence provenance

This stage follows Dataverse preparation because the environment assessor requires `generated/dataverse/` and `DATAVERSE_READY`.

Default to its `OFFLINE` mode. If no live read-only capability is available, retain `NOT_ASSESSED` for environment facts and continue only when no downstream decision requires verified reuse. Do not treat an offline result as proof of live environment readiness.

Expected outputs:

- `generated/environment/`
- `generated/reports/environment-assessment-report.md`

---

# Stage 6 - Dataverse Solution Preparation Validation

Validate the deployment-preparation outputs produced by `dataverse-generator`:

deployment/dataverse/

Including:

- tables
- columns
- relationships
- choices
- lookups
- security artifacts
- deployment metadata
- solution metadata

Required Status:

DEPLOYMENT_READY

---

# Stage 7 - Functional Specification Generation

Run:

fsd-generator

Purpose:

Generate business-facing functional documentation.

Expected Output:

generated/fsd/application.fsd.md

Required Status:

FSD_COMPLETE

---

# Stage 8 - Technical Solution Design Generation

Run:

tsd-generator

Purpose:

Generate technical design documentation.

Expected Output:

generated/tsd/application.tsd.md

Required Status:

TSD_COMPLETE

---

# Stage 9 - Migration Assessment

Generate:

generated/reports/migration-assessment.md

Assess:

- complexity
- risks
- blockers
- unsupported features
- migration readiness

Classification:

- LOW
- MEDIUM
- HIGH
- VERY_HIGH

---

# Stage 10 - Executive Summary Generation

Generate:

generated/reports/executive-summary.md

Include:

- application overview
- complexity
- Dataverse readiness
- major risks
- migration strategy
- review requirements

---

# Stage 11 - Power Platform Mapping

Run:

power-platform-mapper

Purpose:

Prepare Power Platform mappings from certified blueprints and Dataverse metadata.

Expected Outputs:

generated/mappings/

Including:

- security mapping
- workflow mapping
- UI mapping
- integration mapping

---

# Stage 12 - Power Automate Preparation

Run:

power-automate-generator

Purpose:

Generate workflow implementation assets.

Inputs:

- workflow blueprint
- logic blueprint
- security blueprint

Expected Outputs:

generated/workflows/

Including:

- approval flows
- notifications
- escalations
- routing
- scheduled processing
- ownership updates

---

# Stage 13 - Security Design Preparation

Run:

security-deployment-generator

Purpose:

- consolidate the certified security blueprint, security mapping, workflow design, and Dataverse design
- produce finalized security design artifacts for downstream use

Required status:

`SECURITY_READY`

`REVIEW_REQUIRED` stops progression to React Code App design unless the security agent explicitly reports that all React-required security artifacts are finalized and non-blocking. `BLOCKED` stops the design run.

Expected inputs/outputs and application identity must match the security generator's declared contract. Require its finalized `security-model.json`, role mapping, workflow-security mapping, and validation report before React design.

---

# Stage 14 - React Code App Design

Run:

react-codeapp-generator

Use `DESIGN` mode only.

Purpose:

Prepare React/Vite Code App generation inputs.

Inputs:

- certified blueprints
- Dataverse metadata
- Power Platform mappings

Expected Outputs:

generated/codeapp/

Do not invoke the plugin's `BUILD` mode, scaffold a project, create/add data sources, run builds, or perform deployment in `DESIGN_ONLY` mode.

---

# Stage 15 - Design Readiness Gate

Verify:

- analysis completed
- blueprints certified
- Dataverse ready
- deployment assets prepared
- FSD completed
- TSD completed
- mappings completed
- workflow assets prepared
- security design is `SECURITY_READY`
- Code App design is `DESIGN_READY`
- no required stage has `BLOCKED` status

Result:

READY_FOR_GENERATION

or

REVIEW_REQUIRED

or

BLOCKED

`DESIGN_ONLY` is successful only when every required design stage has completed with its accepted status and all final readiness checks pass. Preserve `REVIEW_REQUIRED` rather than upgrading it to ready.

---

# Stage 16 - Build

Run this stage only when the selected mode is `BUILD` and the latest `DESIGN_ONLY` run is `READY_FOR_GENERATION` for the same application identity and unchanged design inputs. If freshness cannot be established, require a new `DESIGN_ONLY` run first.

Before invoking Code Apps capabilities, consult the local vendored references: `vendor/microsoft-power-platform-skills/code-apps/README.md`, `AGENTS.md`, `skills/create-code-app/SKILL.md`, and the relevant `shared/` and `skills/add-*` guidance. For Dataverse-specific guidance, use `vendor/microsoft-power-platform-skills/dataverse/skills/add-dataverse/SKILL.md`.

Invoke `react-codeapp-generator` in `BUILD` mode. Use the installed Microsoft `/create-code-app` skill to scaffold/implement and `/add-dataverse` (or the relevant `/add-*` skill) to connect approved data sources. Follow the local vendored plugin rules for project boundaries, connector services, memory-bank updates, and `npm run build` validation. Vendored documentation does not install the plugin or expose tools; do not fetch online plugin files. Do not hand-scaffold if the plugin skill is unavailable.

Requirements:

- require `DESIGN_READY` and `SECURITY_READY` before beginning
- verify all design outputs and finalized security artifacts still match the current application
- when tables already exist and are approved, use `/add-dataverse` only to register those tables as Code App data sources; schema creation or extension needs separate explicit approval
- do not reclassify missing/incomplete security or mapping inputs as ready
- record `BUILD_VALIDATED` or `BUILD_FAILED` and consume `generated/codeapp/build-result.json`
- do not run deployment or publishing commands; no `pa app push`
- do not create an environment
- creating/extending Dataverse schema or changing a live environment requires separate explicit authorization for the exact target and operation

Build results do not change the prior design readiness result. A successful local build is not runtime verification, deployment, or migration completion.

---

# Final Deliverables

generated/

├── blueprints/
├── reports/
├── environment/
├── dataverse/
├── fsd/
├── tsd/
├── mappings/
├── workflows/
├── security/
└── codeapp/

deployment/

└── dataverse/

---

# Completion Summary

Publish:

- application identity
- selected execution mode
- phase execution status
- generated artifact locations
- readiness status
- blockers
- review items
- unresolved findings

Do not claim:

- deployment success
- runtime verification
- migration completion

Mode-specific outputs:

- `VALIDATE`: `generated/reports/factory-validation-report.md` only.
- `ANALYZE_ONLY`: analysis blueprints/reports and blueprint certification artifacts; no design/build outputs.
- `DESIGN_ONLY`: analysis, certification, environment, Dataverse/deployment-preparation, FSD/TSD, migration/executive, mapping, workflow-design, security-design, and React Code App design outputs; no project scaffold, npm build, or external deployment.
- `BUILD`: retain successful design outputs and add the plugin-generated project and build result under `generated/codeapp/`; no deployment or publishing.

The main orchestrator coordinates the modernization factory and acts as the governing workflow controller for all downstream agents and generators.