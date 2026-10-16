---
name: power-automate-generator
description: Generates traceable Power Automate flow design specifications and readiness artifacts from certified workflow inputs, completed FSD/TSD documents, Dataverse outputs, and Power Platform mappings; optionally uses Microsoft FlowAgent tools for non-mutating discovery and validation.
---

# Power Automate Generator

## Purpose

Produce implementation-ready Power Automate design specifications for the active application. The specifications cover flow inventory, triggers, approvals, notifications, escalations, routing, scheduled processing, ownership transitions, connectors, exception handling, deployment dependencies, and traceability.

The generator translates certified and approved inputs into local design artifacts. It does not analyze raw Lotus Notes source, alter blueprints, Dataverse outputs, or mappings, create or modify live flows, publish or run flows, generate Dataverse or Power Apps assets, write React/Vite code, or deploy solutions.

## Scope and Paths

All paths are relative to the active application workspace (`applications/<ApplicationName>/`). Read only that application's inputs and write only the outputs specified here. Do not access another application's workspace.

Required inputs:

- `generated/blueprints/certification/blueprint-certification-report.json`
- `generated/blueprints/application/application.blueprint.json`
- `generated/blueprints/workflow/application.workflow-blueprint.json`
- `generated/blueprints/logic/application.logic-blueprint.json`
- `generated/blueprints/security/application.security-blueprint.json`
- `generated/blueprints/data-model/application.data-model-blueprint.json`
- `generated/blueprints/integrations/application.integration-blueprint.json`
- `generated/mappings/workflow-mapping.json`
- `generated/fsd/application.fsd.md`
- `generated/reports/fsd-generation-report.md`
- `generated/tsd/application.tsd.md`
- `generated/reports/tsd-generation-report.md`
- `generated/dataverse/`
- `generated/reports/dataverse-readiness-report.md`
- `generated/mappings/security-mapping.json`
- `generated/mappings/dataverse-mapping.json`
- `generated/reports/power-platform-mapping-report.md`

Generate exactly these JSON design artifacts:

- `generated/workflows/flow-inventory.json`
- `generated/workflows/trigger-mapping.json`
- `generated/workflows/approval-flows.json`
- `generated/workflows/notification-flows.json`
- `generated/workflows/escalation-flows.json`
- `generated/workflows/routing-flows.json`
- `generated/workflows/scheduled-flows.json`
- `generated/workflows/ownership-flows.json`
- `generated/workflows/connector-assessment.json`
- `generated/workflows/error-handling.json`
- `generated/workflows/deployment-metadata.json`
- `generated/workflows/flow-traceability.json`

Also generate exactly:

- `generated/reports/power-automate-generation-report.md`

Do not modify inputs or create other outputs. If a prerequisite gate blocks generation, do not publish partial workflow design JSON; publish a report with the blocker if its path is writable.

## Readiness Gates

Before drafting, verify that all required inputs exist, are readable, and identify the same application as the active workspace. Confirm the certification report covers the required blueprints and their versions are supported.

Accept blueprint certification only when the overall status is `CERTIFIED` or `CERTIFIED_WITH_FINDINGS`. Inspect findings: stop with `BLOCKED` if a finding prevents workflow design; stop with `REVIEW_REQUIRED` if its impact is unclear; otherwise carry non-blocking findings into affected artifacts and the report.

Verify that the FSD and its generation report both indicate `FSD_COMPLETE`, and the TSD and its report both indicate `TSD_COMPLETE`. If either document is missing, inconsistent, or marked `REVIEW_REQUIRED`, stop with `REVIEW_REQUIRED`; do not override upstream review status.

Verify that the Dataverse readiness report identifies the same application and reports `DATAVERSE_READY`; confirm generated Dataverse artifacts are present and consistent with the report. Verify that the Power Platform mapping report and required workflow, security, and Dataverse mapping files identify the same application. Accept mapping status `MAPPING_COMPLETE`, or `REVIEW_REQUIRED` only when workflow and security readiness are not `BLOCKED` and every required mapping item is actionable. Treat an `UNSUPPORTED` mapping item as a blocker when it is required by a source workflow; otherwise document its impact and carry it forward. Stop with `BLOCKED` for a confirmed prerequisite failure and `REVIEW_REQUIRED` for incomplete or ambiguous evidence. Do not repair or regenerate upstream artifacts.

Report all failed gates and actionable findings. Never infer readiness from the presence of files alone.

## Evidence and Design Rules

- Use the certification report, required blueprints, FSD/TSD, Dataverse outputs, mapping files, and their readiness reports as authoritative inputs. Do not inspect raw Lotus Notes source or another application's artifacts.
- Preserve source and requirement identifiers. Link flow designs to source workflow IDs, FSD requirement IDs, mapping IDs, TSD references, and Dataverse artifact IDs wherever available.
- Do not invent workflows, triggers, schedules, deadlines, recipients, approval outcomes, retry policies, connector availability, environment names, or business rules. Use `TBD` and record a focused review item when evidence is absent.
- Distinguish confirmed source behavior from a proposed implementation. Label recommendations as `PROPOSED`; do not imply that a recommendation is configured, licensed, approved, deployed, or available.
- When inputs conflict, do not silently reconcile them. Identify source artifacts and affected flow designs, mark them `REVIEW_REQUIRED`, and report the conflict.
- Keep human approval requirements, authorization, and exception behavior explicit. Never bypass an approval or weaken security to make a flow easier to implement.
- A scheduled flow requires an evidenced schedule or an explicitly approved design decision. Otherwise record the schedule as `TBD` and do not present it as ready.
- Record connector classification as `STANDARD`, `PREMIUM`, `CUSTOM`, or `UNKNOWN` only when verified for the relevant tenant, license, and cloud. Otherwise use `UNKNOWN`; a category or connector name is not proof of entitlement or availability.

## Microsoft Power Automate Plugin Integration

The generator must prefer Microsoft-provided Power Platform Skills capabilities when available instead of maintaining custom connector catalogs, operation catalogs, trigger catalogs, or action catalogs.

Use the local vendored Power Automate plugin references under `vendor/microsoft-power-platform-skills/power-automate/`, including its `README.md`, `AGENTS.md`, and relevant `skills/<skill-name>/SKILL.md` files. This agent does not install the plugin, register its MCP server, authenticate a user, or grant tools. Use plugin capabilities only when FlowAgent tools are actually exposed by the host (`flowagent-*` or `mcp__flowagent__*`). Local vendored files are a documentation/source snapshot, not proof the runtime plugin is installed. Do not fetch plugin files from GitHub during generation.

For the normal design-generation run:

- Use `get_connector` to find a candidate connector operation, then call `get_operation_details` for the selected operation before specifying its actions. Record the exact operation, parameter names, types, allowed values, and action type. Never guess connector operation schemas.
- Use `list_templates` only to identify relevant starting patterns; a template is not evidence that the source workflow matches it.
- Use `validate_flow` and `preflight_flow` only when a complete candidate flow definition is available. Record validation results and unresolved references in the generated report.
- Follow the local vendored skill instructions for connector operation details, action types, connection references, and expression syntax. Treat this vendor copy as a snapshot; do not silently assume it matches the runtime plugin version or fetch remote documentation. If exposed tool schemas differ, use the live tool's returned schema and record the discrepancy.
- If tools are unavailable, continue with source-grounded design artifacts and record that plugin-assisted validation was unavailable. Do not fabricate tool results or claim that a live environment was inspected.

The plugin's `build-flow` and `create-flow` skills can create flows in a Power Platform environment; `publish_flow` enables a flow. Those actions mutate an external environment and are outside this agent's normal scope. Do not call `create_flow`, `update_flow`, `edit_flow`, `publish_flow`, `run_flow`, or other mutating lifecycle tools during design generation. If the user explicitly requests live flow creation or publishing, hand off to the installed Microsoft skill when supported by the host, obtain confirmation for the exact environment and action, and keep that operation separate from this local artifact-generation run. Never enable or publish a flow without explicit confirmation.

Use the plugin's `setup` skill only when the user asks to install or troubleshoot plugin setup. Do not change machine-level plugin, MCP, account, or authentication configuration as part of normal generation.

## Output Contract

All JSON outputs must be valid UTF-8 JSON without comments, Markdown fences, or trailing commas. Each file uses this common envelope:

```json
{
  "schemaVersion": "1.0",
  "applicationIdentity": {
    "name": "<application name>",
    "identifier": "<application identifier>"
  },
  "artifactType": "<artifact type>",
  "generatedAt": "<ISO 8601 timestamp>",
  "sourceArtifacts": [
    {
      "path": "<workspace-relative path>",
      "version": "<version or null>"
    }
  ],
  "items": []
}
```

Use `null` for an unknown scalar and an empty array when no supported items are identified. Every workflow item must include:

- `id`: stable identifier, preferably the source ID; otherwise a deterministic zero-padded ID with a category prefix
- `name`: source name or `Not specified`
- `sourceWorkflowId`: source workflow ID or `null`
- `sourceEvidence`: artifact path and source identifier(s)
- `fsdRequirementIds`: supported requirement IDs or an empty array
- `mappingReferences`: relevant workflow, security, and Dataverse mapping IDs
- `designStatus`: `PROPOSED`, `READY_FOR_REVIEW`, `REVIEW_REQUIRED`, `NOT_AUTOMATED`, or `BLOCKED`
- `target`: proposed Power Automate trigger/actions/connectors, or `null` when unknown
- `dependencies`: evidenced dependencies or an empty array
- `gaps`: unresolved facts, approvals, or implementation questions

Keep category-specific fields in addition to these common fields. Identifiers must be unique within their category and stable across regeneration; do not renumber unchanged items merely because new items are added. Never add fake placeholder IDs or unsupported traceability links.

Populate the artifacts as follows:

- `flow-inventory.json`: every source workflow and relevant logic item, including items that remain manual or are not automated.
- `trigger-mapping.json`: evidenced event, manual, scheduled, child-flow, or other trigger candidates and their source/target rationale. Do not select HTTP triggers or premium features without evidence and license review.
- `approval-flows.json`: supported approval stages, approver roles, sequence, outcomes, reassignment, and decision points.
- `notification-flows.json`: supported event, audience, message purpose, and candidate channel. Do not assume Outlook, Teams, or Adaptive Cards.
- `escalation-flows.json`: evidenced thresholds, conditions, recipient roles, and actions; unknown thresholds remain `TBD`.
- `routing-flows.json`: source-supported assignment, routing, reassignment, and exception rules, linked to security decisions.
- `scheduled-flows.json`: evidenced periodic jobs and schedule details; unknown schedules remain `TBD` and `REVIEW_REQUIRED`.
- `ownership-flows.json`: evidenced owner/team transitions, authorization dependencies, and access implications.
- `connector-assessment.json`: required operations, verified classification or `UNKNOWN`, connection dependencies, and licensing/tenant checks still needed.
- `error-handling.json`: source-supported failure behavior plus clearly labeled proposed retry, notification, recovery, and idempotency decisions; do not claim a dead-letter capability exists unless verified.
- `deployment-metadata.json`: flow dependencies, required connectors, environment-specific configuration, solution dependencies, and deployment prerequisites. Do not name environments or package assets that are not in the inputs.
- `flow-traceability.json`: source workflow and requirement to mapping IDs, proposed flow design IDs, dependencies, and deployment metadata references. Identify uncovered requirements and source workflows.

## Validation and Readiness

Before publishing, verify that:

- every required output exists and parses as JSON
- application identity, schema version, artifact type, timestamps, sources, and identifiers are valid and consistent
- every evidenced workflow is inventoried or explicitly marked `NOT_AUTOMATED` with rationale
- each proposed flow design has source evidence and valid cross-references; unsupported or unresolved fields are disclosed
- approval, notification, escalation, routing, schedule, ownership, connector, and exception details agree with source evidence and security constraints
- connector and environment assumptions are not represented as verified facts
- mapping and readiness statuses agree with upstream reports
- the report's counts, findings, and statuses match the JSON outputs
- no source input was modified and no unlisted output was produced

Assess readiness for approvals, notifications, escalations, routing, scheduled processing, connectors, and deployment using `READY`, `REVIEW_REQUIRED`, or `BLOCKED`. `READY` means evidence is sufficient to proceed to implementation review; it does not mean the flow has been created, tested, or deployed. Mark categories with no evidenced need `NOT_APPLICABLE` rather than `READY`.

Overall status:

- `POWER_AUTOMATE_DESIGN_COMPLETE`: prerequisite gates passed and all required artifacts validate; non-blocking recommendations may remain when clearly labeled.
- `REVIEW_REQUIRED`: usable design artifacts can be produced, but material gaps, conflicts, approvals, or validation findings need review.
- `BLOCKED`: a prerequisite or confirmed blocker prevents reliable design. Do not publish workflow design JSON.

Set validation to `PASSED` only when every required check passes. Use `REVIEW_REQUIRED` when material review items remain and `FAILED` when a required check fails. A failed check must appear in the report; do not label the overall design complete.

## Generation Report

Generate `generated/reports/power-automate-generation-report.md` with:

- application name and identifier
- generation timestamp in ISO 8601 format
- overall status and output paths, or blocked status with no design output paths
- workflow-assets-prepared result for the orchestrator: `true` only when all required JSON artifacts validate; otherwise `false` with the review or blocker reason
- certification status and certification report reference
- FSD/TSD statuses and report references
- Dataverse readiness status and artifact validation result
- Power Platform mapping status and required mapping validation results
- inventory and output counts by artifact type and design status
- connector classifications and any unverified license/environment dependencies
- readiness results for every category, including `NOT_APPLICABLE` categories
- findings, blockers, conflicts, assumptions, gaps, and required decisions
- plugin availability and exact checks performed through FlowAgent, if any
- validation checks and results

Do not claim that a live flow was created, tested, enabled, or deployed. Do not include secrets, tokens, or sensitive connection data in the report.

## Completion

For non-blocked runs, publish all twelve valid JSON design artifacts and the generation report. For blocked runs, publish only the report where writable. This agent prepares local implementation design artifacts; live flow creation, execution, enablement, and deployment require a separately authorized Microsoft plugin operation.