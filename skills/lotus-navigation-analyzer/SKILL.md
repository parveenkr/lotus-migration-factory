---
name: lotus-notes-navigation-blueprint-generator
description: Analyzes Lotus Notes navigation metadata from synopsis.json and generates a normalized navigation blueprint that preserves navigation intent, menu hierarchy, landing pages, navigation actions, routing targets, security visibility, role-aware access, and application structure. The generated blueprint serves as the authoritative source for downstream shell generators, homepage generators, React generators, Power Platform generators, and future application generators.
---

# PURPOSE

Analyze Lotus Notes navigation metadata and generate a normalized navigation blueprint.

This skill is an analysis and blueprint generation skill.

The generated navigation blueprint becomes the authoritative source for downstream generators.

This skill must:

- Analyze Navigation Structures
- Analyze Menu Hierarchies
- Analyze Navigation Actions
- Analyze View Navigation
- Analyze Form Navigation
- Analyze Landing Pages
- Analyze Security Visibility
- Analyze Role-Based Access
- Preserve Navigation Intent
- Preserve Business Navigation Behavior

Generate:

generated/blueprints/navigation/navigation-blueprint.json

The generated blueprint must contain:

- Application Definition
- Navigation Structure
- Navigation Groups
- Navigation Items
- Navigation Routes
- Landing Page Definitions
- Navigation Dependencies
- Security Visibility Rules
- Role-Aware Navigation Rules
- Presentation Hints
- Implementation Hints
- Migration Hints
- Migration Risks

The generated blueprint serves as the authoritative representation of application navigation.

If a downstream generator derives behavior that conflicts with the blueprint:

The navigation blueprint takes precedence.

# BLUEPRINT VERSION

Current Blueprint Version:

1.0

Every generated blueprint must include:

{
  "navigationBlueprintVersion": "1.0"
}

# INPUT MODEL

Primary Metadata Source:

Input/ExtractedJson/synopsis.json

Analyze navigation-related metadata from:

- Views
- Folders
- Outlines
- Navigators
- Framesets
- Actions
- Forms
- Links
- Menu Definitions
- Security Metadata
- Roles

Required Inputs:

Application Name

Optional Inputs:

Database Name
Database Alias
Migration Context
Target Platform

Optional inputs may enrich:

- Presentation Hints
- Implementation Hints
- Migration Hints
- Migration Risk Analysis

Metadata precedence:

1. synopsis.json
2. Explicit user input
3. Migration context
4. Generated recommendations

If conflicting information exists:

synopsis.json always wins.

Never infer metadata from:

- React Code
- Generated UI
- Power Apps Artifacts
- Dataverse Schema
- Screenshots
- User Assumptions

Never:

- Invent Menus
- Invent Navigation Items
- Invent Landing Pages
- Invent Route Targets
- Invent Security Rules
- Invent Visibility Rules

If metadata is missing:

- Preserve available metadata
- Record migration risks
- Do not invent replacement values

# NAVIGATION NORMALIZATION

Build a normalized NavigationDefinition model.

All blueprint generation must use the normalized model.

Normalized Model:

{
  "application": {},
  "homePage": {},
  "navigationGroups": [],
  "navigationItems": [],
  "routes": [],
  "roleMappings": [],
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},
  "migrationRisks": []
}

Model Guidelines:

application
    Application level metadata

homePage
    Landing page metadata

navigationGroups
    Logical navigation sections

navigationItems
    Individual menu entries

routes
    Route definitions

roleMappings
    Role-based navigation visibility

dependencies
    Navigation dependencies

presentationHints
    Navigation presentation guidance

implementationHints
    Platform-neutral implementation guidance

migrationHints
    Migration recommendations

migrationRisks
    Risks and blockers

Preserve all navigation metadata.

Do not discard information.

Do not invent routes.

Do not invent menu items.

# LANDING PAGE ANALYSIS

Analyze landing page behavior.

Identify:

- Default Landing View
- Initial Navigation Target
- Startup Experience
- Home Navigation
- Role-Based Landing Pages

Generate:

{
  "homePage": {
    "title": "",
    "description": "",
    "defaultRoute": "",
    "dependencies": []
  }
}

Preserve original navigation intent.

Do not invent landing pages.

# NAVIGATION GROUP ANALYSIS

Analyze all menu structures.

Identify:

- Navigation Categories
- Navigation Sections
- Menu Hierarchies
- Parent Child Groups

Generate:

{
  "navigationGroups": [
    {
      "id": "",
      "title": "",
      "children": []
    }
  ]
}

Preserve hierarchy.

Preserve ordering.

Never reorder menus.

# NAVIGATION ITEM ANALYSIS

Analyze all navigation targets.

Examples:

- Views
- Forms
- Folders
- Actions
- URLs
- Databases

Generate:

{
  "id": "",
  "title": "",
  "route": "",
  "sourceType": "",
  "sourceName": "",
  "visible": true
}

Preserve:

- Menu Name
- Navigation Target
- Position
- Visibility
- Dependencies

Never invent targets.

# ROUTE ANALYSIS

Generate normalized route definitions.

Example:

{
  "route": "/pending-requests",
  "targetType": "View",
  "targetName": "PendingRequests"
}

Preserve:

- Route Intent
- Navigation Target
- Dependencies

Do not generate implementation routes.

Do not generate React Router code.

Routes represent navigation intent only.

# ROLE ANALYSIS

Analyze:

- Roles
- Readers
- Visibility Rules
- Security Restrictions

Generate:

{
  "roleMappings": [
    {
      "role": "",
      "navigationItems": []
    }
  ]
}

Preserve visibility behavior.

Preserve security intent.

Never weaken security.

# NAVIGATION ACTION ANALYSIS

Analyze actions that trigger navigation.

Identify:

- Open View
- Open Form
- Compose Document
- Open URL
- Open Related Record
- Open Database

Generate:

{
  "navigationAction": {
    "actionName": "",
    "actionType": "",
    "target": ""
  }
}

Preserve original navigation intent.

# DEPENDENCY ANALYSIS

Identify dependencies:

- Forms
- Views
- Databases
- URLs
- Framesets
- Outlines
- Actions
- Security Roles

Generate:

{
  "dependencies": []
}

Preserve all dependencies.

Never remove external references.

# OUTPUT SCHEMA

Generate:

generated/blueprints/navigation/navigation-blueprint.json

Schema:

{
  "navigationBlueprintVersion": "1.0",
  "application": {},
  "homePage": {},
  "navigationGroups": [],
  "navigationItems": [],
  "routes": [],
  "roleMappings": [],
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},
  "migrationRisks": []
}

All output must conform to this schema.

# FORBIDDEN BEHAVIOR

Never generate:

- React Components
- TypeScript
- TSX Files
- AppRoutes.tsx
- HomePage.tsx
- LeftNavigation.tsx
- TopHeader.tsx
- Breadcrumb.tsx
- Fluent UI Components
- React Router Definitions
- Dataverse Artifacts
- Power Apps Artifacts
- Workflows
- Security Implementations

Never:

- Invent Navigation Structures
- Invent Routes
- Invent Menus
- Invent Security Rules
- Invent Landing Pages
- Invent Visibility Rules

Never:

- Modify Business Intent
- Relax Security Rules
- Discard Metadata
- Replace Metadata With Assumptions

If metadata is missing:

- Preserve available metadata
- Record migration warnings
- Record migration risks
- Never invent replacement values

All blueprint content must be traceable to metadata contained in synopsis.json.

The generated navigation blueprint is an analysis artifact.

It must remain:

- Vendor Neutral
- Platform Independent
- Framework Independent
- Implementation Neutral
- Suitable For Automated Validation
- Suitable For Automated Code Generation
- Suitable For Downstream Navigation Generators
- Suitable For Homepage Generators
- Suitable For React Application Shell Generators
- Suitable For Power Platform Navigation Generators