---
name: tsd-generator
description: Generates a traceable Technical Solution Design (TSD) and generation report from certified application blueprints, a completed FSD, and Dataverse-ready outputs in the active application workspace.
---

# TSD Generator

## Purpose

Produce one implementation-oriented, reviewable Technical Solution Design (TSD) for the active application. The TSD supports solution architects, developers, implementation teams, deployment planning, and modernization governance.

The TSD translates approved and certified inputs into a technical design covering architecture, data, Dataverse, application components, workflows, security, integrations, content, reporting, deployment, non-functional requirements, risks, decisions, and traceability. It does not analyze raw Lotus Notes source, change blueprints or Dataverse artifacts, generate implementation assets, or deploy a solution.

The FSD remains the source for business requirements. The TSD explains how those requirements are supported technically without silently changing their business meaning.

## Scope and Paths

All paths are relative to the active application workspace (`applications/<ApplicationName>/`). Read only that application's inputs and write only the outputs specified here. Do not access another application's workspace.

Required inputs:

- `generated/blueprints/certification/blueprint-certification-report.json`
- `generated/blueprints/application/application.blueprint.json`
- `generated/blueprints/data-model/application.data-model-blueprint.json`
- `generated/blueprints/logic/application.logic-blueprint.json`
- `generated/blueprints/workflow/application.workflow-blueprint.json`
- `generated/blueprints/security/application.security-blueprint.json`
- `generated/blueprints/rich-text/application.rich-text-blueprint.json`
- `generated/blueprints/ui/application.ui-blueprint.json`
- `generated/blueprints/views/application.view-blueprint.json`
- `generated/blueprints/integrations/application.integration-blueprint.json`
- `generated/blueprints/profiles/application.profile-blueprint.json`
- `generated/fsd/application.fsd.md`
- `generated/reports/fsd-generation-report.md`
- `generated/dataverse/`
- `generated/reports/dataverse-readiness-report.md`

Generate exactly:

- `generated/tsd/application.tsd.md`
- `generated/reports/tsd-generation-report.md`

Do not modify inputs or create other outputs. If generation is blocked, do not publish a partial TSD; publish a report with the blocker if its output path is writable.

## Execution

### 1. Validate Readiness Gates

Before drafting, verify that all required files and Dataverse outputs exist, are readable, and are structurally usable. Confirm that the certification report and all required blueprints identify the same application as the active workspace and that the blueprints are covered by valid certification evidence with supported versions.

Accept only blueprint certification statuses `CERTIFIED` or `CERTIFIED_WITH_FINDINGS`. Do not infer certification from the presence of artifacts. For `CERTIFIED_WITH_FINDINGS`, inspect each finding: stop with `BLOCKED` if it prevents technical design, and stop with `REVIEW_REQUIRED` if its impact is unclear. Carry relevant non-blocking findings into the TSD and generation report.

Verify that the FSD and its generation report identify the same application and that the FSD status is `FSD_COMPLETE`. If the FSD is missing, inconsistent, or marked `REVIEW_REQUIRED`, stop with `REVIEW_REQUIRED`; do not override its business-review status.

Verify that the Dataverse readiness report identifies the same application and reports `DATAVERSE_READY`, and that generated Dataverse artifacts are present and consistent with that report. If the report or artifacts are missing, inconsistent, or not ready, stop with `BLOCKED` or `REVIEW_REQUIRED` according to the failure. Do not repair or regenerate Dataverse artifacts.

If any required input is missing, malformed, unsupported, or for another application, stop. Record the failed gate and actionable findings. Do not generate a TSD.

### 2. Establish Evidence and Design Status

- Use the certification report, certified blueprints, FSD, Dataverse outputs, and readiness report as the complete authoritative input set. Do not inspect raw Lotus Notes source, unrelated generated artifacts, or another application's files.
- Preserve the meaning and traceability of FSD requirements. Record any conflict between the FSD, blueprints, Dataverse outputs, and readiness report; do not silently resolve it.
- Label each material design statement as one of: `Confirmed` (directly specified by an authoritative input), `Derived` (necessary technical consequence of specified inputs, with reasoning), `Proposed` (recommendation requiring approval), or `TBD` (information or decision unavailable).
- For every proposed choice, state rationale, trade-offs, dependencies, and the decision owner or approval needed when known. Never present a proposal as an approved architecture or an existing capability.
- Do not invent target platforms, services, APIs, environments, network boundaries, security controls, capacity, performance targets, retention periods, or operational practices. Use `TBD` or `Not specified in the source artifacts` and add a decision or question when needed.
- When inputs conflict, identify the artifacts and identifiers involved, describe the design impact, mark affected sections `REVIEW_REQUIRED`, and record a question. Do not choose a source of truth unless the inputs establish precedence.
- Separate current-state facts from target-state design. Do not imply that a recommended target component is deployed or available.
- Keep business rationale concise and link it to FSD requirement IDs where available. Exclude unsupported business requirements and implementation code.

### 3. Draft the TSD

Use the template below as the sole canonical document structure. Retain every section and explicitly mark unavailable content `Not specified in the source artifacts`, `TBD`, or `None identified`, as appropriate. Do not duplicate content across sections when a cross-reference is sufficient.

Give every technical requirement, risk, decision, and component a unique stable identifier (`NFR`, `RISK`, `ADR`, or `COMP` plus a zero-padded sequence). Prefer source-provided identifiers where they exist; otherwise assign identifiers in source order and retain them on regeneration. Do not renumber an unchanged item just because another item was added.

Include architecture or data diagrams only when the relationships shown are supported by inputs or explicitly labeled as a proposal. Mermaid diagrams may be used for source-supported designs; visually distinguish confirmed components and proposed/TBD boundaries. A diagram must not imply an integration, environment, trust boundary, or deployment topology that is not evidenced.

### 4. Validate and Publish

Before publishing, verify that:

- every required template section is present and populated or explicitly marked as unavailable
- each required input, version, application identity, and readiness status is recorded in the report
- architecture, data, Dataverse, workflow, security, integration, content, reporting, component, and deployment designs have source references or are labeled as proposals/TBD
- FSD requirement references and Dataverse table/column/relationship references exist in their respective inputs
- technical requirement, risk, decision, and component identifiers are unique and stable
- no conflict, assumption, proposal, limitation, or open decision is presented as confirmed
- risks, security considerations, deployment assumptions, and operational gaps are disclosed
- the document contains no unsupported target-state facts or implementation code
- only the two specified output files are produced

Use these document statuses:

- `TSD_COMPLETE`: all readiness gates passed and required document checks passed. Non-blocking proposals or open decisions may remain if they are clearly labeled and do not prevent implementation understanding.
- `REVIEW_REQUIRED`: a useful draft can be produced, but source conflicts, material gaps, unresolved decisions, or document-check failures require technical or governance review. Identify affected sections; do not represent the design as approved or implementation-ready.
- `BLOCKED`: a prerequisite gate failed or a finding prevents a reliable design. Do not generate a TSD.

Set validation to `PASSED` only when every required check passes. Use `REVIEW_REQUIRED` when material review items remain and `FAILED` when a required check fails. A non-blocking validation failure must be disclosed in both the TSD validation summary and generation report. If status is `BLOCKED`, the TSD must not be generated.

## TSD Template

Use the following structure and retain all headings.

---

# Technical Solution Design

## Document Control

Application Name:

Application Identifier:

Source System:

Document Version:

Generation Timestamp (ISO 8601):

Blueprint Certification Status:

FSD Status:

Dataverse Readiness Status:

Author: TSD Generator

Modernization Program:

---

# 1. Solution Overview

## Purpose

## Modernization Scope

## Target Platform and Constraints

Record only source-specified or approved target platforms and constraints. Label recommendations as proposals and missing information as TBD.

## Modernization Objectives

## Design Status Summary

Summarize confirmed, derived, proposed, and TBD aspects of the design.

---

# 2. Architecture Overview

## Current-State Architecture

Describe only what the certified artifacts establish.

## Target-State Architecture

## Architecture Principles and Constraints

## Modernization Strategy

## Architecture Diagram

Include a diagram only when its content is supported or clearly marked as a proposal. Identify unresolved boundaries and dependencies.

---

# 3. Application Architecture

## User Experience and Presentation

## Pages, Forms, Views, and Navigation

## Application Components

## Services and API Boundaries

## State and Error Handling

Describe only supported design choices. Mark routing, layouts, React/Vite implementation, APIs, or other target details TBD unless specified or approved by an authoritative input.

---

# 4. Dataverse Architecture

## Environment and Solution Context

## Table Inventory

| Table | Purpose | Ownership | Source Artifact | Readiness |
|---|---|---|---|---|

## Columns, Choices, Keys, and Constraints

## Relationships

| Relationship | Related Tables | Cardinality | Purpose | Source Artifact |
|---|---|---|---|---|

## Dataverse Security and Ownership

## Unsupported or Deferred Mappings

Use Dataverse outputs as the generated design baseline. Do not invent schema or modify the artifacts. Identify mappings requiring review.

---

# 5. Data Model Design

## Logical Entities

## Relationships and Cardinality

## Reference, Transaction, and Configuration Data

## Data Lifecycle and Quality Considerations

## Data Model Diagram

Include only when supported by the data-model blueprint and Dataverse outputs.

Distinguish the logical business model from the physical Dataverse schema and cross-reference Section 4 rather than duplicating its full inventory.

---

# 6. Workflow Architecture

## Workflow Inventory

| Workflow | Trigger | States and Transitions | Automation or Service | Source Evidence |
|---|---|---|---|---|

## Approvals and Escalations

## Notifications and Timers

## Exceptions and Recovery

Describe implementation mechanisms only when supported or explicitly proposed. Do not imply that a workflow service or Power Automate flow already exists.

---

# 7. Security Architecture

## Identity and Authentication

## Roles and Authorization

## Record and Field Access

## Ownership and Teams

## Audit and Sensitive Data

## Security Gaps and Decisions

Separate source-established requirements from recommended controls. Do not claim compliance, configured controls, or identity-provider behavior without evidence.

---

# 8. Integration Architecture

## Integration Inventory

| Integration | Source | Target | Direction | Technology or Interface | Security | Status and Evidence |
|---|---|---|---|---|---|---|

## Data Exchange and Processing

## Failure Handling and Retry

## Dependencies and Open Decisions

Use `TBD` for unknown technology, protocols, endpoints, and security mechanisms. Distinguish a documented business integration from a designed or deployed technical interface.

---

# 9. Content Management Design

## Attachments and Files

## Rich Text and Embedded Content

## Storage and Retrieval

## Retention, Migration, and Access

Document only supported storage or retention decisions. Mark unresolved strategy and migration details as TBD.

---

# 10. Reporting Architecture

## Views, Searches, and Dashboards

## Data Sources and Refresh

## Access and Performance Considerations

Do not infer reporting technology, refresh frequency, or performance requirements.

---

# 11. Technical Components

## Component Inventory

| ID | Component | Responsibility | Dependencies | Status | Source Evidence |
|---|---|---|---|---|---|

Include application, workflow, integration, security, and reporting components where supported. Mark proposals and TBD components clearly; do not turn a component category into a claim that an implementation exists.

---

# 12. Deployment Architecture

## Environments

## Solution Packaging and Promotion

## Configuration and Secrets

## Release, Rollback, and Recovery

## Monitoring and Operations

Record DEV, TEST, UAT, or PROD only when specified; otherwise identify them as proposed environments or TBD. Do not assume environments, pipelines, monitoring, secrets stores, or release procedures exist.

---

# 13. Non-Functional Requirements

## NFR-001

### Category

### Requirement or Target

### Rationale

### Verification Approach

### Source or Status

Cover evidenced performance, scalability, reliability, maintainability, supportability, availability, auditability, accessibility, and recovery requirements. Include only categories supported by evidence or explicitly labeled proposals. Never invent numeric targets. Mark absent targets `Not specified` and identify approval or verification needs.

---

# 14. Risks and Technical Considerations

## RISK-001

### Description and Impact

### Likelihood or Severity

### Mitigation or Response

### Owner and Status

### Source Evidence

Cover relevant migration, dependency, integration, security, workflow, data, and operational risks. Use `Not assessed` when likelihood or severity is unknown; do not present a recommendation as an approved mitigation.

---

# 15. Modernization Design Decisions

## ADR-001

### Decision

### Status

Approved, Proposed, or Open.

### Context and Rationale

### Alternatives and Trade-offs

### Consequences and Dependencies

### Decision Owner and Source

Record Dataverse, ownership, relationship, workflow, security, integration, and deployment decisions when applicable. Do not imply approval without evidence.

---

# 16. Technical Traceability Matrix

| FSD Requirement | Blueprint Source | Logical Entity | Dataverse Artifact | Workflow or Component | Design Section | Status |
|---|---|---|---|---|---|---|

Trace FSD requirements to source blueprints and applicable technical design elements. Include only supported relationships; use `Not identified` or `TBD` when appropriate. Record uncovered requirements as a finding rather than silently omitting them.

---

# 17. Glossary

| Term | Definition | Source |
|---|---|---|

---

# Document Validation Summary

Blueprint Certification Status:

FSD Status:

Dataverse Readiness Status:

TSD Status: `TSD_COMPLETE` or `REVIEW_REQUIRED`

TSD Validation Status: `PASSED`, `REVIEW_REQUIRED`, or `FAILED`

Generated From: list the certification report, all ten required blueprints, FSD, FSD generation report, Dataverse outputs, and Dataverse readiness report.

Findings and Affected Sections:

---

## Separate Generation Report Output

Generate `generated/reports/tsd-generation-report.md` with:

- application name and identifier
- generation timestamp in ISO 8601 format
- TSD status and output path, or blocked status with no TSD path
- certification status and certification report reference
- each required blueprint's version and validation result
- FSD status and generation report reference
- Dataverse readiness status, artifact inventory, and validation result
- sections generated
- validation checks and results
- blockers, findings, conflicts, and affected sections
- assumptions, proposals, open decisions, and source limitations

Do not claim a check passed when it was not performed. Keep the report consistent with the TSD's status and validation summary.

## Completion

The TSD Generator is complete only after publishing the required output allowed by the status and recording its path in the report. Never generate Dataverse artifacts, Power Automate assets, React/Vite code, or deployment packages.