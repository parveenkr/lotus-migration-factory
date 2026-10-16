---
name: power-platform-mapper
description: Produces traceable, advisory Power Platform source-to-target mapping JSON and a readiness report from certified blueprints, completed FSD/TSD documents, and Dataverse-ready outputs.
---

# Power Platform Mapper

## Purpose

Produce implementation mapping recommendations for the active application by relating certified source capabilities and approved design inputs to Power Platform capabilities. The mappings support downstream design and implementation planning; they are not approvals, deployments, or generated implementation assets.

The mapper covers Dataverse, workflow, security, user experience, reporting, integrations, and rich content. It identifies gaps, unsupported features, complexity, risk, readiness, and decisions requiring review. It does not analyze raw Lotus Notes source, modify blueprints or Dataverse outputs, generate Power Apps or flows, write React/Vite code, or create deployment packages.

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
- `generated/tsd/application.tsd.md`
- `generated/reports/tsd-generation-report.md`
- `generated/dataverse/`
- `generated/reports/dataverse-readiness-report.md`

Generate exactly these mapping files:

- `generated/mappings/dataverse-mapping.json`
- `generated/mappings/workflow-mapping.json`
- `generated/mappings/security-mapping.json`
- `generated/mappings/ui-mapping.json`
- `generated/mappings/reporting-mapping.json`
- `generated/mappings/integration-mapping.json`
- `generated/mappings/content-mapping.json`

Also generate exactly:

- `generated/reports/power-platform-mapping-report.md`

Do not modify inputs or create other outputs. If a prerequisite gate blocks mapping, do not publish mapping JSON; publish a report with the blocker if its output path is writable.

## Execution

### 1. Validate Readiness

Before mapping, verify that all required inputs exist, are readable, and are structurally usable. Confirm that the certification report, blueprints, FSD, TSD, Dataverse outputs, and readiness reports identify the same application as the active workspace.

Accept only certification statuses `CERTIFIED` or `CERTIFIED_WITH_FINDINGS`. Do not infer certification from artifact presence. Inspect certification findings: stop with `BLOCKED` if a finding prevents mapping; stop with `REVIEW_REQUIRED` if its impact is unclear; otherwise carry relevant non-blocking findings into affected mappings and the report.

Verify that the FSD and its report both indicate `FSD_COMPLETE`, and that the TSD and its report both indicate `TSD_COMPLETE`. If either document is missing, inconsistent, or marked `REVIEW_REQUIRED`, stop with `REVIEW_REQUIRED`; do not override upstream review status.

Verify that the Dataverse readiness report identifies the same application and reports `DATAVERSE_READY`. Confirm the generated Dataverse artifacts are present and consistent with that report. If readiness is blocked or artifacts contradict the report, stop with `BLOCKED`; if evidence is incomplete or its impact is unclear, stop with `REVIEW_REQUIRED`. Do not repair or regenerate Dataverse outputs.

If any required input is missing, malformed, unsupported, or belongs to another application, stop. Record the failed gate and actionable findings; do not generate mappings.

### 2. Ground Mappings in Evidence

- Use the certification report, certified blueprints, completed FSD/TSD, Dataverse outputs, and readiness report as the authoritative input set. Do not inspect raw Lotus Notes source or unrelated application artifacts.
- Preserve source meaning and identifiers. Reference source artifact names and stable source identifiers wherever available.
- Map each source capability to the narrowest supported target capability. Treat product names and capability lists below as candidate target categories, not evidence that a product, license, service, or configuration exists or is approved.
- Do not invent target products, services, connectors, APIs, environment configuration, implementation behavior, migration decisions, effort estimates, or organizational ownership.
- Distinguish source facts from recommendations. Every recommendation must state its rationale, relevant assumptions, trade-offs or gap, and any approval or validation needed. Mappings remain advisory until an authorized owner approves them.
- `SUPPORTED` means a target capability appears to support the source need; it does not mean configured, licensed, deployed, or approved. Use `UNSUPPORTED` only when evidence establishes that no viable target capability is available. If evidence is insufficient, use `PARTIAL`, set `reviewRequired` to `true`, and explain the uncertainty in `gaps`.
- When inputs conflict, do not silently resolve the conflict. Identify the conflicting artifacts and affected mappings, set `reviewRequired` to `true`, and record the conflict in the report.
- Link mappings to FSD requirement IDs, TSD sections or decision IDs, and Dataverse artifact identifiers when available. Do not fabricate traceability links.

### 3. Create the Mapping Files

Each mapping file must be valid UTF-8 JSON without Markdown fences, comments, or trailing commas. Use this common top-level structure:

```json
{
  "mappingFormatVersion": "1.0",
  "applicationIdentity": {
    "name": "<application name>",
    "identifier": "<application identifier>"
  },
  "mappingType": "<dataverse|workflow|security|ui|reporting|integration|content>",
  "generatedAt": "<ISO 8601 timestamp>",
  "sources": [
    {
      "artifact": "<workspace-relative source path>",
      "version": "<source version or null>"
    }
  ],
  "mappings": []
}
```

Each item in `mappings` must use this common structure; category-specific information belongs in `details`:

```json
{
  "mappingId": "<stable category-prefixed identifier>",
  "sourceArtifact": "<workspace-relative path>",
  "sourceIdentifier": "<source identifier or null>",
  "sourceCapability": "<source behavior or asset>",
  "targetCapability": "<target capability or null>",
  "targetArtifact": "<Dataverse or design artifact reference, or null>",
  "mappingStatus": "SUPPORTED|PARTIAL|CUSTOMIZATION_REQUIRED|UNSUPPORTED",
  "complexity": "LOW|MEDIUM|HIGH|VERY_HIGH",
  "complexityRationale": "<evidence-based explanation>",
  "risk": {
    "severity": "LOW|MEDIUM|HIGH|CRITICAL",
    "description": "<risk or null>"
  },
  "recommendation": {
    "action": "<recommended next step or null>",
    "rationale": "<reason or null>",
    "approvalRequired": true
  },
  "traceability": {
    "fsdRequirementIds": [],
    "tsdReferences": [],
    "dataverseReferences": []
  },
  "gaps": [],
  "reviewRequired": false,
  "details": {}
}
```

Use JSON `null` for an unknown scalar and an empty array when no items are evidenced; do not use placeholder prose where a typed value is required. Set `approvalRequired` to `true` for recommendations that need human approval and `false` only when the action is already authorized by an input. Use the following stable ID prefixes: `DV`, `WF`, `SEC`, `UI`, `REP`, `INT`, and `CM`, followed by a zero-padded sequence. Prefer source IDs where supported; otherwise assign in source order and retain IDs across regenerations.

Mapping statuses:

- `SUPPORTED`: the target capability supports the mapped need based on available evidence; no claim of implementation or deployment.
- `PARTIAL`: the target covers only part of the need, or evidence is incomplete; describe the gap and set `reviewRequired` when confirmation is needed.
- `CUSTOMIZATION_REQUIRED`: a supported target approach requires custom configuration, extension, or implementation beyond direct mapping; explain what remains to be designed.
- `UNSUPPORTED`: the evidence establishes that the need has no viable target capability in the assessed scope; describe the blocker and impact.

Complexity values are relative assessments, not delivery estimates. Explain the rationale using evidenced factors such as data volume/shape, workflow branching, security variance, interface count, or content migration. If the evidence is too limited to assess complexity, use `HIGH` only when a defensible risk-based rationale exists; otherwise use `MEDIUM`, explain the uncertainty, and require review. Do not invent effort, duration, or cost.

### 4. Map Each Capability Area

Create one mapping entry for each in-scope source capability, including unsupported or partially supported items. Use an empty `mappings` array only when the source artifacts establish that no capabilities exist in that category; explain this in the report. Do not silently omit items.

**Dataverse** (`DV`): map every source entity and relevant attribute, relationship, choice, lookup, and ownership concept to the generated Dataverse artifact. Identify unsupported, partial, renamed, or deferred mappings and preserve source-to-target references.

**Workflow** (`WF`): map workflow states, transitions, approvals, escalations, notifications, routing, and scheduled behavior. Candidate capabilities include Power Automate, Dataverse triggers, business rules, or custom logic. Do not assume a flow or service exists.

**Security** (`SEC`): map ACL concepts, readers/authors, roles, ownership, teams, and approval authorities to candidate security roles, teams, business units, field security, or record ownership. Identify privilege differences and unresolved access decisions.

**UI** (`UI`): map forms, views, dialogs, navigation, dashboards, and actions to candidate model-driven apps, canvas apps, React Code Apps, or Dataverse views. Follow the TSD where a target approach is specified; otherwise present options as recommendations, not selections.

**Reporting** (`REP`): map views, searches, summaries, dashboards, and reports to candidate Dataverse views, Power BI, model-driven dashboards, or custom reporting. Do not assume licensing, refresh behavior, or a reporting platform.

**Integration** (`INT`): map APIs, databases, files, email, and external systems to candidate connectors, Dataverse APIs, custom connectors, Azure services, or external APIs. Record direction, data exchanged, dependencies, security considerations, and unknown protocols/endpoints as details or gaps. Do not infer a technical interface from a business-level integration mention.

**Content** (`CM`): assess rich text, attachments, embedded content, and linked content against candidate Dataverse file columns, rich text, SharePoint, or blob storage. Record access, migration, retention, and storage gaps; do not select a strategy absent evidence or approval.

### 5. Assess Gaps, Complexity, and Readiness

Include gap analysis and overall complexity/readiness in the mapping report; do not create separate gap or assessment files.

Classify gap severity as `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`. State the affected capability, impact, evidence, and next action. Classify overall migration complexity as `LOW`, `MEDIUM`, `HIGH`, or `VERY_HIGH`, with rationale by data, workflow, security, integration, UI, and content area. These are relative assessments, not delivery estimates.

Assess readiness for each in-scope target area using `READY`, `REVIEW_REQUIRED`, or `BLOCKED`. `READY` means the mapping evidence is adequate to proceed to the next design/implementation stage; it does not mean implementation is deployed. Use `REVIEW_REQUIRED` for unresolved material questions or approvals and `BLOCKED` for a confirmed prerequisite or capability blocker. Do not label an out-of-scope area ready; mark it not assessed in the report.

Overall mapping status:

- `MAPPING_COMPLETE`: all required outputs are valid and traceable, with no unresolved critical blockers. Non-blocking recommendations may remain if clearly identified.
- `REVIEW_REQUIRED`: mappings are usable for review, but important gaps, conflicts, approvals, or evidence limitations remain. Identify affected categories and mappings.
- `BLOCKED`: prerequisites failed or a confirmed blocker prevents reliable mapping. Do not generate mapping JSON.

### 6. Validate and Publish

Before publishing, verify that:

- all seven JSON files parse and conform to the common structure and enumerated values
- application identity, mapping type, timestamp, sources, and mapping IDs are valid and consistent
- every evidenced in-scope source capability has a mapping or a documented reason for omission
- every mapping has source evidence, a target capability or explicit unknown, a status, complexity rationale, risk, recommendation, and traceability fields
- FSD, TSD, and Dataverse references resolve to actual input identifiers or sections
- unsupported items, gaps, assumptions, conflicts, approval needs, and uncertainty are disclosed
- mapping statuses do not imply deployment, licensing, configuration, or approval
- the report totals and readiness results agree with the seven JSON files
- no input artifact was changed and no unlisted artifact was produced

If JSON validation fails, correct the affected output before publishing. If reliable mappings cannot be produced, set `REVIEW_REQUIRED` or `BLOCKED` as appropriate and do not publish malformed or misleading JSON.

## Mapping Report

Generate `generated/reports/power-platform-mapping-report.md` with:

- application name and identifier
- generation timestamp in ISO 8601 format
- overall mapping status and output inventory
- certification status and certification report reference
- each required blueprint's version and validation result
- FSD and TSD statuses and references
- Dataverse readiness status and artifact validation result
- per-category mapping totals by mapping status
- readiness results for each in-scope target area
- complexity assessment with rationale by capability area
- gap analysis with severity, impact, evidence, and next action
- unsupported features, risks, findings, assumptions, and approval decisions
- traceability coverage and uncovered source requirements/capabilities
- validation checks and results

Do not claim a check passed when it was not performed. Keep the report consistent with the JSON outputs; do not repeat full mapping entries when a stable mapping ID and summary are sufficient.

## Completion

Complete the run only after publishing the report and all seven valid mapping files when status permits. If blocked, publish only the report where writable. Never generate Power Apps, Power Automate flows, Dataverse artifacts, React/Vite code, or deployment packages. These mappings are advisory implementation-planning inputs, not authorization to build or deploy.