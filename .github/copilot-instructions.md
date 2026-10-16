# Repository Conventions

## Repository Structure

agents/
skills/
applications/
generated/
portfolio/
templates/
docs/

## Agent Resolution

Agent references are logical identifiers.

Resolve:

<agent-name>

from:

agents/<agent-name>.md

Examples:

main-orchestrator
analysis-orchestrator
blueprint-orchestrator
dataverse-generator
fsd-generator
tsd-generator

## Skill Resolution

Skill references are logical identifiers.

Resolve:

<skill-name>

from:

skills/<skill-name>/SKILL.md

Examples:

lotus-application-analyzer
lotus-data-model-analyzer
lotus-logic-analyzer
lotus-workflow-analyzer
lotus-security-analyzer
rich-text-analyzer
lotus-ui-analyzer
lotus-view-analyzer
lotus-integration-analyzer
profile-document-analyzer

## Application Workspace Rules

Applications operate inside:

applications/<ApplicationName>/

Agents and skills must:

- read only from the active application workspace
- write only to the active application workspace
- treat generated artifacts as application-scoped assets

Agents and skills must not:

- access another application workspace
- modify artifacts belonging to another application
- merge multiple applications into a single analysis

## Output Rules

All generated outputs must remain within the active application workspace.

Examples:

applications/<ApplicationName>/generated/
applications/<ApplicationName>/reports/
applications/<ApplicationName>/deployment/

Do not write outputs outside the current application workspace unless explicitly performing portfolio-level processing.