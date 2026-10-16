---
name: fsd-generator
description: Generates a business-facing Functional Specification Document (FSD) and generation report from certified Lotus Notes application blueprints in the active application workspace.
---

# FSD Generator

## Purpose

Produce one complete, reviewable, business-facing Functional Specification Document (FSD) from certified blueprints for the active application. The FSD supports functional review, modernization validation, and UAT planning; it is not a technical design.

The generator consolidates blueprint evidence and explains application functionality, business processes, actors, rules, workflows, data, user interactions, security, reporting, integrations, and content management. It does not analyze raw Lotus Notes source, modify blueprints, generate a TSD, or create implementation, platform, or deployment artifacts.

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

Generate exactly:

- `generated/fsd/application.fsd.md`
- `generated/reports/fsd-generation-report.md`

Do not modify input artifacts or create additional outputs. If generation is blocked, do not publish a partial FSD; publish a report with the blocker if its output path is writable.

## Execution

### 1. Validate Inputs and Certification

Before drafting, verify that the certification report and all required blueprints:

- exist, are readable, and are structurally usable
- identify the same application as one another and the active workspace
- have supported versions and are covered by the certification decision
- have a valid overall certification status

Accept only `CERTIFIED` or `CERTIFIED_WITH_FINDINGS`. Do not infer certification from the presence of blueprints or from an individual blueprint's status. Treat the certification report as authoritative for the overall decision.

If an input is missing, malformed, for another application, unsupported, or not covered by valid certification evidence, stop with `BLOCKED`. If the overall status is `REVIEW_REQUIRED`, `BLOCKED`, missing, or unrecognized, stop and report that status and the failed gate. Do not generate an FSD.

For `CERTIFIED_WITH_FINDINGS`, inspect the findings before proceeding. If a finding explicitly blocks functional specification, stop with `BLOCKED`. If its impact is unclear, stop with `REVIEW_REQUIRED`. Otherwise proceed, carry relevant findings into the document, and identify affected content as requiring review. Generation does not resolve certification findings.

### 2. Ground the Document in Evidence

- Treat the certified blueprints and certification report as the authoritative inputs. Do not inspect raw Lotus Notes source or other applications' artifacts.
- Preserve source meaning while translating it into clear business language. Do not invent actors, behaviors, rules, outcomes, requirements, dates, metrics, or migration decisions.
- Distinguish confirmed facts, assumptions, and open questions. Each assumption must state its rationale and impact; never present an assumption as a confirmed requirement.
- When information is missing, write `Not specified in the source blueprints`. Raise a focused question when business confirmation is needed.
- When sources conflict, do not silently select or reconcile them. Identify the conflicting source artifacts, mark affected content for review, and add the conflict to Open Questions and the generation report.
- Reference source artifact names and source identifiers where available. Do not claim complete coverage beyond the evidence provided.
- Explain necessary business terminology in the glossary. Exclude physical schemas, implementation details, platform configuration, code, and deployment instructions.

### 3. Draft the FSD

Use the template below as the sole canonical section structure. Include every section; where evidence is absent, state `None identified in the available blueprints` or `Not specified in the source blueprints` as appropriate. Do not duplicate the same item across sections unless a cross-reference is useful.

Create concise, testable requirements only from explicit source evidence. Use unique, stable identifiers with zero-padded sequence numbers, grouped by category:

- `FR` - Functional
- `WFR` - Workflow
- `SR` - Security
- `RR` - Reporting
- `INT` - Integration
- `CM` - Content Management

Prefer source-provided identifiers when available. Otherwise assign identifiers deterministically in source order and retain them when regenerating the same FSD; do not renumber an unchanged requirement merely because another item was added.

Do not create a requirement from a possibility or unresolved interpretation; record it as an open question. For each requirement, include its category, business description, expected outcome, source evidence, and available actor/process/workflow/entity links. Include preconditions and acceptance criteria only when supported by source evidence; otherwise mark them as not specified. Use `Not identified` rather than fabricating a traceability relationship.

### 4. Validate and Publish

Before publishing, check that:

- all required template sections are present and populated or explicitly marked as not identified
- requirement identifiers are unique and conform to their category prefixes
- each requirement has source evidence, and traceability references are supported by the blueprints
- identified actors, business entities, processes, workflows, screens, reports, integrations, and content needs are represented in their relevant sections
- conflicts, certification findings, assumptions, source limitations, and material open questions are disclosed consistently
- the document contains no unsupported claims or technical design content
- the generation report records each blueprint's version and validation result, the certification result, document status, findings, assumptions, questions, and validation status
- only the two specified output files are produced

Use these statuses consistently:

- `FSD_COMPLETE`: input gates passed and required document checks passed; disclosed non-blocking assumptions or questions may remain.
- `REVIEW_REQUIRED`: a reviewable draft can be produced, but material evidence gaps, conflicts, findings, or document-check failures remain. Identify affected sections and do not represent the FSD as approved or fully validated.
- `BLOCKED`: an input or certification gate failed, or a finding prevents reliable specification. Do not generate an FSD.

Set validation to `PASSED` only when every required check passes. Use `REVIEW_REQUIRED` when review items remain and `FAILED` when a required check fails. A failed validation must be reported in both the FSD validation summary and the generation report.

## FSD Template

Use the following structure and retain all headings.

---

# Functional Specification Document

## Document Control

Application Name:

Application Identifier:

Source System:

Document Version (use a source-provided version or `Not specified`):

Generation Timestamp (ISO 8601):

Blueprint Certification Status:

Author: FSD Generator

Modernization Program (use a source-provided value or `Not specified`):

---

# 1. Executive Summary

## Purpose

## Business Objectives

## Scope

## Out of Scope

---

# 2. Application Overview

## Application Description

## Primary Business Functions

## Business Capabilities

## Application Classification

Choose only classifications supported by evidence: Workflow, Case Management, Document Management, CRUD, Reporting, Knowledge Base, or Hybrid.

---

# 3. Stakeholders and Actors

## User Roles

| Actor | Description | Responsibilities | Source Evidence |
|---|---|---|---|

## Administrative Roles

## Approval Roles

## External Participants

---

# 4. Functional Areas

## Functional Area FA-001

### Description

### Supported Business Functions

### Users

Repeat the subsection for each evidenced functional area. Assign stable, unique `FA` identifiers.

---

# 5. Business Processes

## Process BP-001

### Name

### Description

### Trigger

### Inputs

### Outputs

### Actors

### Process Flow

Describe the business flow, decisions, approvals, routing, and completion activities in source-supported terms.

Repeat the subsection for each evidenced process. Assign stable, unique `BP` identifiers.

---

# 6. Workflow Summary

## Workflow WF-001

### Workflow Name

### Description

### Triggering Event

### States and Transitions

### Approval Points

### Escalation Rules

### Notifications

Repeat the subsection for each evidenced workflow. Assign stable, unique `WF` identifiers.

---

# 7. Functional Requirements

For each requirement, use the identifier prefix matching its category (`FR`, `WFR`, `SR`, `RR`, `INT`, or `CM`).

## FR-001

### Requirement Name and Category

### Business Description

### Actors

### Preconditions

### Related Process, Workflow, and Entities

### Business Rules

### Expected Outcome

### Acceptance Criteria

### Source Evidence

Repeat for all source-supported requirements. Mark unsupported fields as not specified; do not infer behavior.

---

# 8. Business Data Summary

## Entity: <Entity Name>

### Description

### Business Purpose

### Key Attributes

### Relationships

Repeat for each evidenced business entity or document type. Do not include physical database design or unsupported attributes.

---

# 9. Screen and Interaction Summary

## Screen UI-001

### Screen Name

### Purpose

### Actors

### Actions

### Data Displayed

### Inputs

Repeat for each evidenced screen, form, view, or dashboard. Assign stable, unique `UI` identifiers where the source does not provide identifiers.

---

# 10. Business Rules

## Rule BR-001

### Rule Name

### Description

### Trigger

### Outcome

### Source Evidence

Repeat for each evidenced validation, approval, routing, ownership, or processing rule. Assign stable, unique `BR` identifiers.

---

# 11. Security Overview

## Access Model

## Roles

## Approval Authorities

## Ownership Concepts

## Security Constraints

Describe business-visible access and responsibilities only. Do not document technical security implementation.

---

# 12. Reporting and Views

## Report or View RV-001

### Name

### Purpose

### Audience

### Content

Repeat for each evidenced report, view, search, categorization, or user-facing summary. Assign stable, unique `RV` identifiers.

---

# 13. Integration Summary

## Integration INT-001

### External System

### Business Purpose

### Direction

Inbound, Outbound, or Bidirectional, only as evidenced.

### Information Exchanged

Repeat for each evidenced integration, including relevant email or file exchange. Do not infer a live integration from an incidental mention.

---

# 14. Attachments and Content Management

## Attachments

## Rich Text Content

## Embedded Content

## Document Storage Requirements

## Retention Considerations

Include only source-supported requirements or clearly labeled assumptions and questions.

---

# 15. Assumptions

For each assumption, state its rationale, impact, and related section. If none, state `None identified`.

---

# 16. Open Questions

List unresolved findings, incomplete evidence, conflicts, and decisions requiring business review. Include affected section and source references. If none, state `None identified`.

---

# 17. Risks and Considerations

## Functional Risks

## Data Risks

## Workflow Risks

## Migration Risks

Include only evidenced or explicitly labeled risks. Do not make migration decisions on behalf of the business.

---

# 18. Glossary

| Term | Definition | Source |
|---|---|---|

---

# Appendix A - Source Artifacts

List the required blueprints and relevant source artifact names or identifiers used. Summarize coverage and limitations; do not claim that uninspected source material was reviewed.

---

# Appendix B - Traceability Matrix

| Requirement | Process | Workflow | Actor | Entity | Source Evidence |
|---|---|---|---|---|---|

Map requirements to processes, workflows, actors, entities, and evidence where supported. Use `Not identified` when no supported link exists.

---

# Document Validation Summary

Blueprint Certification Status:

FSD Status: `FSD_COMPLETE` or `REVIEW_REQUIRED`

FSD Validation Status: `PASSED`, `REVIEW_REQUIRED`, or `FAILED`

Generated From: list all ten required blueprints and the certification report.

Findings and Affected Sections:

---

## Separate Generation Report Output

Generate `generated/reports/fsd-generation-report.md` with:

- application name and identifier
- generation timestamp in ISO 8601 format
- FSD status and output path
- certification status and certification report reference
- each required blueprint's version and validation result
- sections generated
- validation checks and results
- blockers, findings, and affected sections
- assumptions, open questions, and source limitations

Do not include technical implementation artifacts or claim a check passed when it was not performed.

## Completion

The FSD Generator is complete only after publishing the required output(s) allowed by the execution status and recording their paths in the report. Never generate a TSD, Dataverse artifact, Power Platform or Power Automate asset, React/Vite code, or deployment package.