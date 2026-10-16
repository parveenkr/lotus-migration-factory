---
name: lotus-application-analyzer
description: Analyzes Lotus Notes application structure and generates a traceable application inventory blueprint. Discovers forms, subforms, views, folders, agents, script libraries, resources, fields, design elements, and application metadata for downstream analysis.
---

# Lotus Application Analyzer

## Purpose

Analyze the overall Lotus Notes application structure and generate a traceable application inventory blueprint.

This analyzer indexes design elements present in the supplied synopsis export. It does not certify that the export contains every design element or runtime artifact from the original Notes database. The synopsis remains the source of truth; downstream analyzers consume this inventory only where their own input contracts declare it.

The analyzer is responsible for:

- discovering application metadata
- discovering design elements
- discovering forms
- discovering subforms
- discovering views
- discovering folders
- discovering agents
- discovering script libraries
- discovering shared resources
- discovering fields
- identifying dependencies
- identifying application entry points
- generating application inventory blueprint

The analyzer does not:

- generate Dataverse designs
- generate Power Platform assets
- generate workflows
- generate security models
- generate UI designs
- generate React applications

Those activities belong to specialized analyzers.

---

# Scope

Analyze only the active application workspace.

Workspace:

applications/<ApplicationName>/

Read:

input/ExtractedJson/synopsis.json

Write:

generated/blueprints/application/

generated/reports/

Do not read or modify another application workspace.

---

# Inputs

Required:

input/ExtractedJson/synopsis.json

Optional:

input/supplementary/dxl/

input/supplementary/data-dictionary/

input/supplementary/exports/

input/supplementary/mime/

input/documents/

input/configuration/

Optional supplementary files may enrich descriptive context and coverage notes only. The synopsis is authoritative for extracted design elements. Preserve each supplementary source's path and evidence separately; do not use it to invent or silently override synopsis metadata.

---

# Outputs

generated/blueprints/application/application.blueprint.json

generated/reports/application-analysis-report.md

---

# Input Validation

Verify:

- synopsis.json exists
- synopsis.json is valid JSON
- application identity can be determined
- synopsis root has a supported structure
- source files can be read without modifying them

Resolve application identity in this order, consistent with the modernization orchestrator:

1. Explicit stable application ID supplied by the caller or run context
2. ReplicaId extracted from synopsis.json
3. Active application workspace name

Record the selected identity value and resolution source. Database title and ReplicaId are useful metadata but are not both mandatory: if title is missing, record `NOT_PROVIDED` and a finding; if ReplicaId is absent, use the next identity source and disclose that limitation. Stop with `BLOCKED` only when a stable application identity cannot be resolved or the required synopsis cannot be parsed.

Record:

- application name
- application identity value and resolution source
- database title, server, filepath, replica id, template and inheritance when present
- source export date when present
- source coverage and known export limitations

If validation fails:

Status:

BLOCKED

Publish report only.

---

# Stage 1 - Application Metadata Analysis

Identify:

- application name
- database title
- database description
- filepath
- replica id
- server name
- template name
- template inheritance
- database profile information
- source areas present, absent from the export, or unreadable

Generate:

Preserve extracted values and source references. Missing optional metadata must be represented as unknown/not provided rather than silently omitted or fabricated.

---

# Stage 2 - Form Discovery

Identify:

- forms
- response forms
- main forms
- hidden forms
- inherited forms
- form aliases

For each form capture:

- form id
- form name
- aliases
- field count
- action count
- dependencies

---

# Stage 3 - Subform Discovery

Identify:

- shared subforms
- embedded subforms
- computed subforms

For each subform capture:

- subform id
- subform name
- usage locations
- dependencies

---

# Stage 4 - View and Folder Discovery

Identify:

- views
- folders
- hidden views
- categorized views
- embedded views

For each element capture:

- name
- type
- usage
- dependencies

---

# Stage 5 - Field Inventory

Identify:

- field names
- field types
- usage locations
- reusable fields
- system fields

Capture:

- source location
- design element references
- original source type and aliases when present
- evidence status for each inventory assertion

Do not infer business meaning.

---

# Stage 6 - Agent Discovery

Identify:

- LotusScript agents
- Formula agents
- Java agents
- scheduled agents
- manual agents
- web agents

For each agent capture:

- name
- type
- trigger
- referenced elements
- dependencies

---

# Stage 7 - Shared Code Discovery

Identify:

- script libraries
- shared actions
- shared fields
- shared columns
- shared resources

Capture:

- references
- consumers
- dependencies

---

# Stage 8 - Resource Discovery

Identify:

- pages
- images
- style sheets
- file resources
- navigators
- outlines
- shared resources

For each resource capture:

- type
- identifier
- usage locations

---

# Stage 9 - Dependency Analysis

Identify dependencies between:

- forms
- subforms
- fields
- views
- folders
- agents
- resources

Generate dependency graph.

Classify:

DIRECT

INDIRECT

UNKNOWN

Use `DIRECT` only for an explicit source reference, `INDIRECT` only when a complete evidence-backed dependency chain exists, and `UNKNOWN` for unresolved or candidate relationships. Do not infer dependencies from name similarity alone. Retain unresolved endpoints and cycles as findings.

---

# Stage 10 - Application Inventory Blueprint

Generate:

generated/blueprints/application/application.blueprint.json

Required structure:

{
  "applicationBlueprintVersion": "1.0",
  "applicationIdentity": {},
  "applicationMetadata": {},
  "sourceCoverage": {},
  "forms": [],
  "subforms": [],
  "views": [],
  "folders": [],
  "agents": [],
  "scriptLibraries": [],
  "resources": [],
  "fields": [],
  "dependencies": [],
  "findings": []
}

Keep these existing top-level collection names stable for downstream consumers. `applicationIdentity` and `applicationMetadata` have their own typed fields; inventory records must not be forced into the same shape. Every inventory item must contain:

- stable `identifier`
- `name` and `type` where applicable
- `sourceReference` containing a workspace-relative artifact path and JSON Pointer when available
- `dependencyReferences` containing resolvable identifiers or explicit unresolved targets
- `evidenceStatus` (`EXTRACTED`, `DERIVED`, `NOT_PROVIDED`, or `UNRESOLVED`)

`applicationIdentity` must record the resolved identifier, display name, and `resolutionSource`. `applicationMetadata` must preserve source values and represent absent optional metadata as `null` or an explicit `NOT_PROVIDED` state. `sourceCoverage` must record the synopsis path, parse result, source areas examined, areas present, areas absent from the export, areas not exported or unreadable, record counts where available, and known completeness limitations.

Assign deterministic identifiers from source IDs where available; otherwise use type-qualified source names and owner context. When duplicates remain ambiguous, retain separate evidence references and create a finding instead of assigning order-dependent or random IDs. Do not treat a JSON array index alone as a stable identifier.

The dependency collection must identify source and target identifiers (nullable when unresolved), dependency type, classification, source evidence, and resolution status. Do not discard external references, cycles, or unknown dependencies.

Do not include passwords, tokens, connection strings, or unnecessary business/document payloads. Redact secrets while retaining the source locator and a redaction marker, and record the resulting evidence limitation.

---

# Validation

Verify:

- blueprint generated
- JSON valid
- supported `applicationBlueprintVersion` present
- application identity present
- inventory collections present
- identifiers unique
- references valid
- dependencies traceable
- source coverage and missing/unreadable areas recorded
- absent metadata distinguished from confirmed absence
- no unsupported claims of complete source/application coverage
- no secrets or unnecessary sensitive payloads included

Status:

PASSED

REVIEW_REQUIRED

FAILED

Use `FAILED` for structural or integrity failures that prevent safe publication. Use `REVIEW_REQUIRED` for a structurally valid blueprint with unresolved evidence, incomplete export coverage, ambiguous dependencies, or material findings. Missing optional descriptive metadata alone is not a structural failure.

---

# Report

Generate:

generated/reports/application-analysis-report.md

Include:

- application identity
- identity resolution source
- synopsis and supplementary input paths used
- source coverage and known export limitations
- forms discovered
- subforms discovered
- views discovered
- folders discovered
- agents discovered
- script libraries discovered
- resources discovered
- fields discovered
- dependency summary
- findings
- validation results

---

# Completion Status

APPLICATION_ANALYSIS_COMPLETE

REVIEW_REQUIRED

BLOCKED

`APPLICATION_ANALYSIS_COMPLETE` means the blueprint and report were structurally validated for the available source. It does not certify that the synopsis is a complete export of the Notes application. Use `REVIEW_REQUIRED` when the output is usable but coverage/evidence gaps remain; use `BLOCKED` when required input, identity, or structural validation prevents reliable publication.

---

# Completion Rules

For successful execution:

Publish:

generated/blueprints/application/application.blueprint.json

generated/reports/application-analysis-report.md

Do not generate any downstream artifacts.

This blueprint is a shared application inventory and discovery index. It does not replace synopsis.json or specialized analyzer outputs. Downstream analyzers may use it for discovery and cross-reference where their contracts declare:

- lotus-data-model-analyzer
- lotus-form-analyzer
- lotus-logic-analyzer
- lotus-workflow-analyzer
- lotus-security-analyzer
- rich-text-analyzer
- lotus-navigation-analyzer
- lotus-homepage-analyzer
- lotus-ui-analyzer
- lotus-view-analyzer
- lotus-integration-analyzer
- profile-document-analyzer

---