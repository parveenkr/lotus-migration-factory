---
name: lotus-view-analyzer
description: Analyzes Lotus Notes View metadata from synopsis.json and generates a normalized migration blueprint that preserves structure, behavior, categorization, formulas, actions, security, navigation, dependencies, and business intent. The generated blueprint serves as the authoritative source for downstream migration and implementation generators.
---

# PURPOSE

Analyze Lotus Notes View metadata and generate a normalized migration blueprint.

This skill is an analysis and blueprint generation skill.

The generated migration blueprint becomes the authoritative source for downstream generators.

This skill must:

- Analyze Lotus Notes Views
- Preserve business intent
- Preserve view behavior
- Preserve categorization
- Preserve folder behavior
- Preserve formulas
- Preserve actions
- Preserve security
- Preserve navigation
- Preserve sorting
- Preserve filtering  
- Preserve dependencies

Produces (relative to the active application workspace):

View Collection:

```text
generated/blueprints/views/*.migration-blueprint.json
```

View Inventory:

```text
generated/blueprints/views/application.view-blueprint.json
```

Generate one `<ViewName>.migration-blueprint.json` per analyzed View and maintain the application View Inventory using the aggregation contract below.

The generated blueprint must contain:

- View Definition
- Column Definitions
- Formula Definitions
- Categorization Rules
- Folder Rules
- Action Definitions
- Security Rules
- Navigation Rules
- Dataverse Mapping Hints
- Power Platform Generation Hints
- Presentation Hints
- Implementation Hints
- Migration Hints
- Migration Risks
- Dependency Definitions

This skill must not generate:

- React Code
- TypeScript Code
- TSX Files
- Power Apps Artifacts
- Dataverse Artifacts
- Dashboards
- Galleries
- Workflows

The generated blueprint serves as the authoritative representation of the Lotus Notes View.

All downstream Microsoft Power Platform Skills, Dataverse generators, Power Apps generators, React/Vite generators, dashboard generators, gallery generators, and custom implementation generators must use the blueprint as the primary source of truth.

If a downstream generator derives behavior that conflicts with the blueprint, the blueprint takes precedence.

# BLUEPRINT VERSION

Current Blueprint Version:

```text
1.0
```

Every generated migration blueprint must include migrationBlueprintVersion = "1.0".

# INPUT MODEL

Primary metadata source:

```text
Input/ExtractedJson/synopsis.json
```

This skill must analyze Lotus Notes View metadata exclusively from synopsis.json.

The generated migration blueprint must be derived from Lotus Notes metadata contained in synopsis.json.

Process only the requested View.

Required Inputs:

```text
View Name
View Alias
```

View Alias takes precedence if multiple Views match the requested criteria.

View Name may be used as the primary identifier when Alias is unavailable.

Optional Inputs:

```text
Application Name
Database Name
Database Alias
Migration Context
Target Platform
```

Examples:

```text
Application Name:
Medical Inquiry System

Database Name:
MedicalInquiry.nsf

Database Alias:
MEDICAL

Target Platform:
Power Platform Code Apps
```

Optional inputs may be used only to enrich:

- Migration Hints
- Implementation Hints
- Presentation Hints
- Dataverse Mapping Hints
- Power Platform Generation Hints
- Migration Risk Analysis
- Dashboard Recommendations
- Gallery Recommendations

Optional inputs must never override Lotus Notes metadata extracted from synopsis.json.

Metadata precedence order:

```text
1. synopsis.json
2. Explicit user input
3. Migration context
4. Generated recommendations
```

If conflicting information exists:

```text
synopsis.json always wins.
```

Never infer metadata from:

```text
Screenshots
Generated Code
Power Apps Artifacts
React Components
Dataverse Schema
User Assumptions
Previous Migration Outputs
```

Never:

```text
Invent Views
Invent Columns
Invent Formulas
Invent Sorting Rules
Invent Filtering Rules
Invent Security Rules
Invent Actions
Invent Navigation Rules
Generate Synthetic Metadata
```

If metadata is missing:

```text
Record the missing information in migrationRisks.
Preserve available metadata.
Do not invent replacement values.
```

All blueprint content must be fully traceable to Lotus Notes metadata contained in synopsis.json.

The generated migration blueprint must allow downstream generators to create equivalent functionality without rereading the original Lotus Notes metadata.

---

# VIEW NORMALIZATION

Before generating the migration blueprint, build a normalized internal ViewDefinition model.

All analysis, validation, mapping, dependency discovery, risk analysis, and blueprint generation must use the normalized model.

The normalized model establishes a vendor-neutral representation of the Lotus Notes View.

It must preserve business intent while decoupling the implementation from Lotus Notes technology.

Normalized ViewDefinition Model:

```json
{
  "source": {},
  "view": {},
  "columns": [],
  "formulas": [],
  "grouping": {},
  "folderBehavior": {},
  "sorting": {},
  "filtering": {},
  "actions": [],
  "security": {},
  "navigation": {},
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},    
  "migrationRisks": []
}
```

Model Guidelines:

```text
source
    Original Lotus Notes metadata.

view
    Core View information.

columns
    Normalized column definitions.

formulas
    Formula definitions and migration strategies.

grouping
    Categorization and hierarchy information.

folderBehavior
    Folder and tree hierarchy behavior.

sorting
    Default and user-defined sorting.

filtering
    Selection Formula and filtering behavior.

actions
    Notes View actions and commands.

security
    Readers, Authors, Roles and visibility rules.

navigation
    Links to forms, documents and related views.

dependencies
    Forms, databases, views, profile documents and integrations used by the view.

presentationHints
    Presentation semantics derived from Lotus Notes metadata.
    Includes icon meaning, status indicators, visual metadata,
    color metadata, and display intent.

presentationHints
    Presentation semantics derived from Lotus Notes metadata.

implementationHints
    Platform-agnostic implementation guidance for downstream generators.

migrationHints
    Migration recommendations, mappings and modernization guidance.

migrationRisks
    Migration blockers, unsupported features and implementation warnings.
```

Normalization Rules:

```text
Preserve all Lotus Notes metadata.

Do not discard information.

Do not rename metadata.

Do not translate business meaning.

Do not invent replacement values.

Do not generate implementation code.

Do not generate UI layouts.

Do not generate Power Apps artifacts.
```

Mandatory Preservation:

```text
Column Order
Column Visibility
Column Formulas
Selection Formula
Categorization
Folder Structure
Sorting Rules
Actions
Security Rules
Navigation Rules
Dependencies
Business Intent
```

If metadata cannot be fully normalized:

```text
Preserve the original value.

Record the issue in migrationRisks.

Continue blueprint generation.

Never replace missing metadata with invented values.
```

All blueprint output must be generated exclusively from the normalized ViewDefinition model.

---

# COLUMN ANALYSIS

Analyze all View columns defined in the Lotus Notes metadata.

Generate normalized column definitions for the migration blueprint.

Column metadata must be preserved exactly as defined in the source View.

Header Display Priority:

```text
1. DisplayJp
2. Title
3. DisplayEn
```

Generate displayName using the highest available value according to the priority order.

If all display values are empty:

```text
Preserve the column.
Record the issue in migrationRisks.
Do not invent a display name.
```

Never:

```text
Rename columns.
Translate column names.
Invent headers.
Invent display names.
Drop columns.
Reorder columns.
```

Analyze and preserve:

```text
Position
Column Number
Title
DisplayJp
DisplayEn
Item Name
Width
Alignment
Formula
Value Type
IsHidden
IsSorted
SortOrder
IsCategorized
IsResortAscending
IsResortDescending
DataFontColor
HeaderFontColor
```

Generate a normalized column model:

```json
{
  "columnName": "",
  "displayName": "",
  "sourceField": "",
  "dataType": "",
  "hidden": false,
  "categorized": false,
  "sortable": true,
  "formulaBased": false,
  "width": "",
  "alignment": "",
  "sourceFormula": ""
}
```

Hidden Columns:

```text
Preserve hidden columns.

Hidden columns may be used by:
- Categorization
- Sorting
- Filtering
- Security
- Calculations
- Navigation
- Actions

Do not exclude hidden columns from the migration blueprint.
```

Sorted Columns:

```text
Preserve all sorting metadata.

Identify:
- Default Sort Fields
- Sort Direction
- Multi-column Sorting
- User Resortability
```

Categorized Columns:

```text
Preserve category metadata.

Identify:
- Category Levels
- Hierarchical Categories
- Grouping Dependencies
```

Formula-Based Columns:

```text
Preserve original Lotus Notes formulas.

Do not translate formulas in this section.

Formula conversion analysis must be handled by Formula Analysis.
```

Color Metadata:

```text
Preserve:
- DataFontColor
- HeaderFontColor

Generate color metadata as migration hints.

Do not generate UI color implementations.
```

Dependency Analysis:

For each column determine whether it depends on:

```text
Document Fields
Computed Values
Other Columns
Profile Documents
Database Lookups
External Systems
```

Record all detected dependencies.

Validation Rules:

```text
Every source column must exist in the normalized model.

Every hidden column must be preserved.

Every categorized column must be preserved.

Every sorted column must be preserved.

Every formula-based column must be preserved.
```

If a column cannot be fully analyzed:

```text
Preserve available metadata.

Record the issue in migrationRisks.

Continue blueprint generation.

Never invent replacement values.
```

# BLUEPRINT OUTPUT ARCHITECTURE

Generate only these artifacts within the active application workspace (`applications/<ApplicationName>/`):

```text
generated/blueprints/views/<ViewName>.migration-blueprint.json
generated/blueprints/views/application.view-blueprint.json
```

## View Inventory Aggregation Contract

The View Collection contains the authoritative per-view blueprints. The View Inventory is the single discovery entry point for downstream agents; it references those blueprints without duplicating their contents.

The inventory must use this structure:

```json
{
  "migrationBlueprintVersion": "1.0",
  "views": [
    {
      "viewName": "<source View name>",
      "viewAlias": null,
      "blueprintPath": "generated/blueprints/views/<ViewName>.migration-blueprint.json"
    }
  ]
}
```

Inventory generation rules:

- Copy `viewName` and `viewAlias` from the analyzed source metadata. Use `null` when an alias is unavailable; do not invent identifiers.
- Resolve every `blueprintPath` relative to the active application workspace, not the inventory directory. References must remain within that application's `generated/blueprints/views/` directory and point to existing, valid per-view blueprints; never reference the inventory itself.
- After successfully writing and validating a per-view blueprint, create or update the inventory. Match an existing entry by source alias when available, otherwise by source View name. Replace that entry on reruns instead of appending duplicates.
- Preserve entries for other analyzed Views during single-view runs. Do not analyze additional Views merely to update the inventory. If an existing inventory is malformed or contains ambiguous identities, report the blocker instead of overwriting it or silently dropping entries.
- Keep entries in deterministic order by `viewName`, then `viewAlias`. Serialize updates so concurrent per-view runs cannot overwrite each other's entries.
- Include each successfully generated View or folder exactly once. Do not list failed or ungenerated blueprints. An application with no source Views or folders must produce `"views": []`.
- A single-view run does not establish application-wide completeness. During application-wide analysis, reconcile the inventory against all source Views and folders in `synopsis.json`; report missing, duplicate, stale, or unresolved entries and do not declare the View stage complete until reconciliation passes.

Downstream consumption rules:

- Consumers expecting `application.view-blueprint.json` must read `generated/blueprints/views/application.view-blueprint.json` first and use its `views` entries to discover the collection. Do not scan the directory or assume this file has the per-view schema.
- Read the referenced per-view blueprints for detailed behavior; the inventory is a discovery index, not a substitute for the authoritative View definitions.
- Treat a missing or malformed inventory, duplicate entries, unsupported version, or missing/invalid referenced blueprint as a validation failure. Do not silently fall back to directory scanning.

The generated migration blueprint must serve as the authoritative representation of the Lotus Notes View.

The generated blueprint must contain:

```text
Source View Definition
View Metadata
Column Definitions
Formula Definitions
Categorization Rules
Folder Behavior
Sorting Rules
Filtering Rules
Action Definitions
Security Rules
Navigation Rules
Dependency Definitions
Dataverse Mapping Hints
Power Platform Generation Hints
Presentation Hints
Implementation Hints
Migration Hints
Migration Risks
```

The generated blueprint must be:

```text
Implementation Neutral
Platform Independent
Vendor Neutral
Traceable to Lotus Notes Metadata
Reusable Across Multiple Target Platforms
Consumable By Downstream Generators
Suitable For Automated Validation
Suitable For Automated Code Generation
```

The generated blueprint must become the single source of truth for:

```text
Microsoft Code Apps Skills
Microsoft Dataverse Skills
Microsoft Model Apps Skills
Gallery Generators
Dashboard Generators
Workflow Generators
Security Generators
React/Vite Generators
Power Apps Generators
Custom Migration Generators
```

Blueprint consumers must rely on the migration blueprint rather than directly analyzing Lotus Notes metadata.

If a downstream generator derives behavior that conflicts with the migration blueprint:

```text
The migration blueprint takes precedence.
```

The generated blueprint must not contain:

```text
React Components
TypeScript Code
TSX Files
Fluent UI Components
TanStack Tables
Power Apps YAML
Canvas App Definitions
Model Driven App Definitions
Dataverse Solution Files
Power Automate Definitions
UI Layout Implementations
Framework Specific Code
Platform Specific Code
Executable Code
```

The generated blueprint must preserve:

```text
Business Intent
View Structure
View Hierarchy
Column Definitions
Formula Logic
Categorization
Folder Behavior
Sorting Logic
Filtering Logic
Actions
Security Rules
Navigation Rules
Dependencies
```

Each element captured in the blueprint must be traceable back to Lotus Notes metadata extracted from synopsis.json.

The generated blueprint must provide sufficient information for downstream generators to create equivalent implementations without rereading the original Lotus Notes metadata.

The generated blueprint must remain stable regardless of the target implementation technology.

The same migration blueprint should be usable to generate:

```text
Power Platform Code Apps
Model Driven Apps
React Applications
Dashboards
Reporting Components
Gallery Pages
Search Experiences
Future Migration Targets
```

without requiring modification of the blueprint structure.

---

# VIEW BEHAVIOR ANALYSIS

Analyze and preserve all View behavior related to data presentation.

Generate implementation-neutral metadata describing the behavior of the View.

Preserve:

```text
Sorting
Filtering
Grouping
Categorization
Hierarchy
Folder Behavior
Pagination Requirements
Column Visibility
Column Ordering
Row Selection Behavior
Row Expansion Behavior
Search Requirements
Export Requirements
```

Generate normalized behavior definitions.

Example:

```json
{
  "viewBehavior": {
    "supportsSorting": true,
    "supportsFiltering": true,
    "supportsGrouping": true,
    "supportsCategorization": true,
    "supportsHierarchy": false,
    "supportsSearch": true,
    "supportsExport": true
  }
}
```

Analyze sorting behavior:

```text
Default Sort Order
Secondary Sort Order
User Resortability
Ascending Sort
Descending Sort
Multi-column Sort
```

Analyze filtering behavior:

```text
Selection Formula
Computed Filters
Hidden Filters
Dynamic Filters
```

Analyze grouping behavior:

```text
Categorized Columns
Multi-level Categories
Expandable Groups
Hierarchy Depth
```

Analyze visibility behavior:

```text
Visible Columns
Hidden Columns
Conditional Visibility
Security Controlled Visibility
```

Analyze interaction behavior:

```text
Document Open
View Navigation
Action Invocation
Selection Rules
Multi-select Support
```

Never generate:

```text
React Tables
TanStack Tables
Fluent UI Components
Power Apps Controls
Dataverse Artifacts
Implementation Code
```

The purpose of this section is to preserve View behavior for downstream implementation generators.

Implementation choices are the responsibility of downstream Microsoft Power Platform Skills and other code generation skills.

# FORMULA ANALYSIS

Preserve all Lotus Notes formulas.

Never ignore:

```text
$Fields
Computed Columns
Display Formulas
Hidden Formulas
Selection Formulas
Column Formulas
Color Formulas
```

Every detected formula must be represented in the migration blueprint.

Preserve:

```text
Original Formula Text
Formula Type
Formula Purpose
Referenced Fields
Dependencies
```

Generate a normalized formula definition:

```json
{
  "formulaType": "",
  "formulaText": "",
  "supported": true,
  "translationStrategy": "",
  "dependencies": []
}
```

Supported formulas include:

```text
@If
@Contains
@Text
@UpperCase
@LowerCase
@Trim
@Left
@Right
@Middle
@Substring
@Length
```

For supported formulas:

```text
Generate migration guidance.
Identify equivalent platform capabilities.
Describe the recommended migration strategy.
```

For unsupported formulas:

```text
Preserve the complete original formula.

Mark the formula as requiring custom implementation.

Generate migration risk information.
```

Examples:

```text
@DbLookup
@DbColumn
@Command
@GetProfileField
@SetProfileField
@MailSend
```

Example output:

```json
{
  "formulaType": "ColumnFormula",
  "formulaText": "@DbLookup(...)",
  "supported": false,
  "translationStrategy": "Custom Implementation Required",
  "dependencies": [
    "External Database"
  ]
}
```

Dependency Analysis:

Identify references to:

```text
Document Fields
Profile Documents
Other Databases
Other Views
Environment Variables
External Systems
```

Record all dependencies in the migration blueprint.

Validation Rules:

```text
Every formula must be preserved.

Original formula text must never be modified.

Unsupported formulas must never be discarded.

Formula dependencies must be captured.

Formula purpose must be documented when determinable.
```

Never:

```text
Generate Helper Functions
Generate Accessors
Generate Utility Methods
```

The purpose of this section is to preserve formula behavior and provide migration guidance for downstream implementation generators.

---

# ACTION ANALYSIS

Analyze all Lotus Notes View Actions.

Preserve the original behavior and business intent of every action.

Generate normalized action definitions for the migration blueprint.

Never generate implementation code.

Analyze:

```text
Action Name
Action Order
Formula
Icon
Hide Formula
Enable Formula
Selection Requirements
Execution Behavior
Navigation Behavior
Dependencies
```

Generate a normalized action model:

```json
{
  "name": "",
  "actionType": "",
  "displayOrder": 0,
  "visibilityRule": "",
  "enableRule": "",
  "executionBehavior": "",
  "dependencies": []
}
```

Preserve:

```text
Name
Order
Visibility
Behavior
Formula
Execution Intent
Navigation Intent
```

Recognize common Notes actions:

```text
Compose
Open
Edit
Save
Close
Delete
Print
Refresh
Reply
Forward
Export
Import
Copy
Move
Search
```

Recognize Notes commands:

```text
@Command([Compose])
@Command([EditDocument])
@Command([FileSave])
@Command([FileCloseWindow])
@Command([ViewRefreshFields])
@Command([OpenDocument])
@Command([ToolsRunMacro])
```

Determine action purpose.

Examples:

```text
Create Document
Open Document
Edit Document
Refresh View
Export Data
Print Data
Run Agent
Navigate to View
Navigate to Form
Launch Workflow
```

Generate migration guidance.

Example:

```json
{
  "name": "Compose",
  "actionType": "CreateDocument",
  "executionBehavior": "Create New Document",
  "navigationTarget": "RequestForm"
}
```

Analyze dependencies.

Identify references to:

```text
Forms
Views
Agents
Profile Documents
Other Databases
External Applications
External URLs
```

Record all dependencies.

Analyze visibility rules.

Examples:

```text
Role Based Visibility
Reader Based Visibility
Author Based Visibility
Hide When Formulas
Enable When Formulas
```

Preserve all visibility behavior.

If action behavior cannot be fully determined:

```text
Preserve available metadata.

Record a migration risk.

Preserve the original Notes formula.

Do not invent behavior.
```

Validation Rules:

```text
Every Action Must Be Preserved
Every Action Formula Must Be Preserved
Every Visibility Rule Must Be Preserved
Every Dependency Must Be Preserved
Every Navigation Target Must Be Preserved
```

The purpose of this section is to provide sufficient action metadata so that downstream Power Platform, Dataverse, React, and Code App generators can implement equivalent behavior without rereading Lotus Notes metadata.

---

# SECURITY ANALYSIS

Analyze all Lotus Notes security metadata associated with the View.

Preserve the original security intent and access behavior.

Generate normalized security definitions for the migration blueprint.

Never generate implementation artifacts.

Analyze:

```text
Readers Fields
Authors Fields
@UserRoles
HideWhen Formulas
ACL References
Role-Based Visibility
Document Access Rules
Column Visibility Rules
View Visibility Rules
Action Visibility Rules
```

Generate a normalized security model:

```json
{
  "security": {
    "roles": [],
    "readRules": [],
    "writeRules": [],
    "visibilityRules": [],
    "actionRestrictions": [],
    "columnRestrictions": []
  }
}
```

Preserve:

```text
Read Permissions
Write Permissions
Role Requirements
Visibility Rules
Action Restrictions
Document Ownership Rules
```

Analyze Readers fields.

Identify:

```text
Who can read the document.

Role dependencies.

User dependencies.

Group dependencies.
```

Analyze Authors fields.

Identify:

```text
Who can modify the document.

Ownership behavior.

Edit permissions.
```

Analyze @UserRoles usage.

Identify:

```text
Role Names.

Role Dependencies.

Role-Based Security Logic.
```

Analyze HideWhen formulas.

Determine impact on:

```text
Columns
Actions
Views
Commands
Sections
```

Preserve the original visibility behavior.

Generate migration guidance.

Example:

```json
{
  "visibilityRule": {
    "sourceType": "HideWhen",
    "scope": "Action",
    "dependsOn": [
      "ManagerRole"
    ]
  }
}
```

Analyze security dependencies.

Identify:

```text
ACL Roles
Readers Fields
Authors Fields
Profile Documents
Role Mappings
External Security Dependencies
```

Generate Dataverse migration hints.

Examples:

```text
Dataverse Security Roles
Business Units
Teams
Ownership Model
Field Level Security
Record Ownership
```

Generate Power Platform migration hints.

Examples:

```text
Role-Based Access
Record-Level Security
Field-Level Security
Page Visibility Rules
Command Visibility Rules
```

The purpose of this section is to preserve Lotus Notes security behavior and provide sufficient metadata for downstream security architecture generators.

Validation Rules:

```text
Every Reader Rule Must Be Preserved.

Every Author Rule Must Be Preserved.

Every Role Must Be Preserved.

Every Visibility Rule Must Be Preserved.

Every Action Restriction Must Be Preserved.

Every Security Dependency Must Be Preserved.
```

If security behavior cannot be fully analyzed:

```text
Preserve available metadata.

Record a migration risk.

Do not invent security rules.

Do not relax security behavior.
```

Security preservation takes precedence over modernization.

---

# NOTES ICON ANALYSIS

Analyze all Lotus Notes icon columns and icon formulas.

Identify columns that use Notes icon values instead of business data.

Examples:

```text
0
1
150
151
186
```

These values may represent status indicators, workflow states, warnings, priorities, approvals, rejections, or other business signals.

Generate normalized icon metadata.

Example:

```json
{
  "iconMetadata": {
    "sourceColumn": "StatusIcon",
    "iconBased": true,
    "sourceValues": [
      0,
      150,
      151
    ]
  }
}
```

Analyze whether the icon is used to represent:

```text
Workflow Status
Approval Status
Priority
Warning Indicator
Completion Status
Business State
Document Type
Custom Status
```

Generate semantic hints.

Example:

```json
{
  "presentationHints": {
    "field": "StatusIcon",
    "semanticType": "WorkflowStatus"
  }
}
```

Preserve:

```text
Original Icon Values
Original Formula
Column Dependencies
Business Meaning
```

If the icon meaning cannot be determined:

```text
Preserve the original icon value.

Record a migration warning.

Do not invent business meaning.
```

The purpose of this section is to preserve Notes icon behavior and business intent for downstream implementation generators.

# NAVIGATION ANALYSIS

Analyze all navigation behavior associated with the Lotus Notes View.

Preserve the original navigation intent and business behavior.

Generate normalized navigation definitions for the migration blueprint.

Never generate implementation code.

Analyze:

```text
Document Open Behavior
View Navigation
Form Navigation
Response Document Navigation
Action Navigation
URL Navigation
Cross Database Navigation
Related View Navigation
```

Generate a normalized navigation model:

```json
{
  "navigation": {
    "defaultAction": "",
    "documentOpenBehavior": "",
    "targetForms": [],
    "relatedViews": [],
    "navigationRules": []
  }
}
```

Preserve:

```text
Navigation Intent
Navigation Targets
Open Behaviors
Selection Behaviors
Response Relationships
Cross-View Navigation
```

Analyze row interaction behavior.

Identify:

```text
Single Click Behavior
Double Click Behavior
Selection Behavior
Open Document Behavior
Preview Behavior
Multi-Select Behavior
```

Example:

```json
{
  "documentOpenBehavior": {
    "interaction": "DoubleClick",
    "targetForm": "MedicalInquiry"
  }
}
```

Analyze action-based navigation.

Determine:

```text
Compose Actions
Open Actions
Edit Actions
Response Actions
Reply Actions
Forward Actions
Custom Navigation Actions
```

Capture all target destinations.

Analyze form navigation.

Identify:

```text
Primary Form
Response Forms
Alternate Forms
Target Forms
```

Generate navigation metadata.

Example:

```json
{
  "targetForms": [
    "MedicalInquiry",
    "MedicalResponse"
  ]
}
```

Analyze view relationships.

Identify:

```text
Related Views
Child Views
Parent Views
Alternate Views
Filtered Views
```

Generate relationship metadata.

Example:

```json
{
  "relatedViews": [
    "PendingRequests",
    "CompletedRequests"
  ]
}
```

Analyze dependencies.

Identify:

```text
Forms
Views
Documents
Response Documents
External Databases
External URLs
Applications
```

Record all dependencies.

Generate migration guidance.

Examples:

```text
Open Detail Page
Open Record
Create Record
Edit Record
Open Related View
Open Related Form
```

If navigation behavior cannot be fully determined:

```text
Preserve available metadata.

Record a migration risk.

Do not invent navigation behavior.

Do not invent destinations.
```

Validation Rules:

```text
Every Navigation Target Must Be Preserved.

Every Open Behavior Must Be Preserved.

Every Related View Must Be Preserved.

Every Related Form Must Be Preserved.

Every Navigation Dependency Must Be Preserved.
```

The purpose of this section is to preserve Lotus Notes navigation behavior and provide sufficient metadata for downstream Power Platform, Dataverse, React, and Code App generators.

---

# OUTPUT SCHEMA

Per-view blueprint:

```text
generated/blueprints/views/<ViewName>.migration-blueprint.json
```

Root structure:

```json
{
  "migrationBlueprintVersion": "1.0",
  "source": {},
  "view": {},
  "columns": [],
  "formulas": [],
  "grouping": {},
  "folderBehavior": {},
  "sorting": {},
  "filtering": {},
  "actions": [],
  "security": {},
  "navigation": {},
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},  
  "migrationRisks": []
}
```

Every per-view blueprint must conform to this schema. The separate `application.view-blueprint.json` inventory must conform to the View Inventory Aggregation Contract above.

---

# FORBIDDEN BEHAVIOR

Never:

```text
Generate React Code
Generate TypeScript Code
Generate TSX Files
Generate Power Apps Artifacts
Generate Dataverse Artifacts
Generate Dashboards
Generate Galleries
Generate Workflows
Generate Security Implementations
Generate Power Automate Flows
Generate UI Components
Generate Mock Data
Generate Sample Records
Generate Synthetic Metadata
Generate Placeholder Metadata
```

Never:

```text
Invent Views
Invent Columns
Invent Formulas
Invent Actions
Invent Security Rules
Invent Navigation Rules
Invent Dependencies
Invent Categorization Rules
Invent Sorting Rules
Invent Filtering Rules
```

Never:

```text
Ignore Formula Columns
Ignore Hidden Columns
Ignore Categorization
Ignore Folder Behavior
Ignore Security Rules
Ignore Selection Formula
Ignore Navigation Rules
Ignore Dependencies
Ignore Migration Risks
```

Never:

```text
Relax Security Constraints
Change Business Intent
Modify Original Behavior
Discard Metadata
Replace Metadata With Assumptions
```

If metadata is missing:

```text
Preserve available metadata.

Record a migration warning.

Record a migration risk.

Do not invent replacement values.
```

All generated blueprint content must be traceable to Lotus Notes metadata contained in synopsis.json.

The migration blueprint is an analysis artifact.

It must remain implementation-neutral and platform-independent.

---

# DEPENDENCY ANALYSIS

Identify all dependencies used by the View.

Examples:

```text
Forms
Views
Agents
Profile Documents
Databases
External Databases
External URLs
Environment Variables
External Applications
```

Generate:

```json
{
  "dependencies": []
}
```

Preserve all dependencies.

Never discard external references.

Record a migration warning if an external reference is missing.

Record a migration risk if an external reference cannot be resolved.

---

