---
name: lotus-notes-homepage-blueprint-generator
description: Analyzes Lotus Notes application metadata, navigation structures, landing page behavior, role-aware access patterns, and business entry points to generate a normalized homepage blueprint. The generated blueprint serves as the authoritative source for downstream homepage generators, React generators, Power Platform generators, and future user experience generators.
---

# PURPOSE

Analyze Lotus Notes application metadata and generate a normalized homepage blueprint.

This skill is an analysis and blueprint generation skill.

The generated homepage blueprint becomes the authoritative source for downstream homepage generators.

This skill must:

- Analyze Landing Pages
- Analyze Application Entry Points
- Analyze Navigation Structure
- Analyze Role-Aware Entry Experience
- Analyze Frequently Accessed Features
- Analyze Business Navigation Intent
- Analyze User Starting Context
- Preserve Homepage Business Intent
- Preserve Role-Aware Homepage Behavior

Generate:

generated/blueprints/homepage/homepage-blueprint.json

The generated blueprint must contain:

- Application Definition
- Homepage Definition
- Welcome Area Definition
- Navigation Card Definitions
- Quick Link Definitions
- Landing Experience Definitions
- Role-Based Homepage Definitions
- Homepage Dependencies
- Presentation Hints
- Implementation Hints
- Migration Hints
- Migration Risks

The generated homepage blueprint serves as the authoritative representation of the homepage experience.

If a downstream generator derives homepage behavior that conflicts with the blueprint:

The homepage blueprint takes precedence.

# BLUEPRINT VERSION

Current Blueprint Version:

1.0

Every generated homepage blueprint must include:

{
  "homepageBlueprintVersion": "1.0"
}

# INPUT MODEL

Primary Metadata Sources:

Input/ExtractedJson/synopsis.json

Optional Blueprint Sources:

generated/blueprints/navigation/navigation-blueprint.json

The homepage blueprint should leverage navigation blueprint metadata whenever available.

Required Inputs:

Application Name

Optional Inputs:

Database Name
Database Alias
Migration Context
Target Platform

Optional inputs may enrich:

- Welcome Content
- Presentation Hints
- Implementation Hints
- Migration Hints
- Migration Risk Analysis

Metadata Precedence:

1. synopsis.json
2. navigation-blueprint.json
3. explicit user input
4. migration context
5. generated recommendations

If conflicting information exists:

synopsis.json always wins.

Never infer metadata from:

- React Components
- Generated Applications
- Power Apps Artifacts
- Dataverse Artifacts
- Canvas Apps
- Screenshots
- User Assumptions

Never:

- Invent Landing Pages
- Invent Quick Links
- Invent Navigation Cards
- Invent Roles
- Invent Homepage Features
- Invent Business Functions

If metadata is missing:

- Preserve available metadata
- Record migration risks
- Never invent replacement values

# HOMEPAGE NORMALIZATION

Build a normalized HomepageDefinition model.

All homepage blueprint generation must use the normalized model.

Normalized Model:

{
  "application": {},
  "homePage": {},
  "welcomeArea": {},
  "navigationCards": [],
  "quickLinks": [],
  "roleBasedExperience": [],
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},
  "migrationRisks": []
}

Model Guidelines:

application
    Application-level metadata.

homePage
    Root homepage definition.

welcomeArea
    Homepage introduction and context.

navigationCards
    Card-based navigation destinations.

quickLinks
    Frequently accessed features.

roleBasedExperience
    Role-aware homepage behavior.

dependencies
    Homepage dependencies.

presentationHints
    Homepage presentation guidance.

implementationHints
    Platform-neutral implementation guidance.

migrationHints
    Migration recommendations.

migrationRisks
    Migration blockers and warnings.

Preserve all homepage metadata.

Do not discard information.

Do not invent homepage content.

# APPLICATION ANALYSIS

Analyze:

- Application Name
- Database Name
- Application Description
- Business Purpose
- Landing Context

Generate:

{
  "application": {
    "name": "",
    "description": "",
    "businessPurpose": ""
  }
}

Preserve original application purpose.

Do not invent descriptions.

# HOMEPAGE ANALYSIS

Analyze:

- Startup Experience
- Landing Views
- Landing Forms
- Landing Navigation
- Frequently Used Areas

Generate:

{
  "homePage": {
    "title": "",
    "description": "",
    "defaultExperience": "",
    "dependencies": []
  }
}

Preserve homepage intent.

Do not invent homepage behavior.

# WELCOME AREA ANALYSIS

Analyze:

- Application Introduction
- Landing Guidance
- User Context
- Business Context

Generate:

{
  "welcomeArea": {
    "title": "",
    "description": ""
  }
}

Preserve onboarding intent.

Never generate marketing content.

Never generate synthetic messages.

# NAVIGATION CARD ANALYSIS

Analyze all homepage navigation destinations.

Examples:

- Major Views
- Frequently Accessed Forms
- Common Tasks
- Primary Business Functions

Generate:

{
  "navigationCards": [
    {
      "title": "",
      "description": "",
      "targetRoute": "",
      "sourceType": "",
      "sourceName": ""
    }
  ]
}

Preserve:

- Navigation intent
- Destination
- Business purpose

Never invent cards.

Never invent destinations.

# QUICK LINK ANALYSIS

Analyze quick access requirements.

Examples:

- Frequently Used Views
- Frequently Used Forms
- Common User Tasks

Generate:

{
  "quickLinks": [
    {
      "title": "",
      "targetRoute": ""
    }
  ]
}

Preserve original user intent.

Never invent quick links.

# ROLE-BASED EXPERIENCE ANALYSIS

Analyze:

- Roles
- Readers
- Visibility Rules
- User Categories

Generate:

{
  "roleBasedExperience": [
    {
      "role": "",
      "navigationCards": [],
      "quickLinks": []
    }
  ]
}

Preserve:

- Security behavior
- Visibility behavior
- Role restrictions

Never weaken security.

# DEPENDENCY ANALYSIS

Identify dependencies:

- Views
- Forms
- Navigation Targets
- Roles
- Group Memberships
- Databases
- URLs

Generate:

{
  "dependencies": []
}

Preserve all dependencies.

Do not discard external references.

# PRESENTATION ANALYSIS

Generate presentation metadata.

Examples:

{
  "presentationHints": {
    "preferredLayout": "",
    "navigationStyle": "",
    "cardPresentationStyle": ""
  }
}

These are recommendations only.

Never generate implementation code.

# IMPLEMENTATION ANALYSIS

Generate platform-neutral implementation guidance.

Examples:

{
  "implementationHints": {
    "supportsNavigationCards": true,
    "supportsQuickLinks": true,
    "supportsRoleAwareHomepage": true
  }
}

Do not generate framework-specific guidance.

Do not generate React guidance.

# MIGRATION ANALYSIS

Identify:

- Unsupported homepage features
- Missing metadata
- Security challenges
- Role mapping risks

Generate:

{
  "migrationHints": {},
  "migrationRisks": []
}

Preserve migration concerns.

Never invent risks.

# OUTPUT SCHEMA

Generate:

generated/blueprints/homepage/homepage-blueprint.json

Root Structure:

{
  "homepageBlueprintVersion": "1.0",
  "application": {},
  "homePage": {},
  "welcomeArea": {},
  "navigationCards": [],
  "quickLinks": [],
  "roleBasedExperience": [],
  "dependencies": [],
  "presentationHints": {},
  "implementationHints": {},
  "migrationHints": {},
  "migrationRisks": []
}

All output must conform to this schema.

# VALIDATION

Verify:

## Homepage

- Homepage Definition Exists
- Homepage Metadata Preserved
- No Duplicate Navigation Cards
- No Duplicate Quick Links

## Security

- Role Restrictions Preserved
- Visibility Rules Preserved
- Security Intent Preserved

## Dependencies

- All Dependencies Captured
- All Navigation Targets Captured
- No Missing References

## Blueprint Integrity

- Schema Compliance
- Traceability To Source Metadata
- Migration Version Present

# FORBIDDEN BEHAVIOR

Never generate:

- React Components
- TypeScript
- TSX Files
- Fluent UI Components
- HomePage.tsx
- Navigation Components
- Route Definitions
- Power Apps Artifacts
- Dataverse Artifacts
- Workflow Logic
- Reports
- Dashboards
- Charts
- Canvas Apps
- Model-Driven Apps
- Security Implementations

Never:

- Invent Navigation Cards
- Invent Quick Links
- Invent Homepage Features
- Invent Landing Pages
- Invent Roles
- Invent Security Rules

Never:

- Modify Business Intent
- Relax Security Behavior
- Discard Metadata
- Replace Metadata With Assumptions

If metadata is missing:

- Preserve available metadata
- Record migration warnings
- Record migration risks
- Never invent replacement values

All blueprint content must be traceable to metadata contained in synopsis.json.

The generated homepage blueprint is an analysis artifact.

It must remain:

- Vendor Neutral
- Platform Independent
- Framework Independent
- Implementation Neutral
- Suitable For Automated Validation
- Suitable For Automated Code Generation
- Suitable For Homepage Generators
- Suitable For React Generators
- Suitable For Power Platform Generators