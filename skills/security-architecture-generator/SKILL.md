---
name: security-architecture-generator
description: Generate enterprise security architecture from Lotus Notes ACL, Roles, Forms, Actions, Views, Workflows, Readers fields, Authors fields, Navigation, HideWhen formulas and @UserRoles references. Generate Microsoft Entra ID mappings, Dataverse role mappings, security manifests, and production-ready React/Vite authorization code.
version: 1.0.0
author: Parveen Kumar
model: gpt-5
---

# PURPOSE

Generate a complete security architecture for:

- Lotus Notes Security Model
- Microsoft Entra ID Security Groups
- Dataverse Teams
- Dataverse Security Roles
- Workflow Authorization
- View Security
- Navigation Security
- Menu Security
- Form Security
- Record Security
- Field Security
- Route Security
- React Authorization
- React Permission Gates
- React Route Guards
- MSAL Integration

The generated security model becomes the authoritative security source used by all other generators.

---

# INPUTS

Read and analyze all available security-relevant metadata.

Required Sources:

- synopsis.json

Inspect:

- Roles
- ACL
- Forms
- Subforms
- Fields
- Views
- Folders
- Navigation
- Outlines
- Buttons
- Actions
- Agents
- Readers Fields
- Authors Fields
- Formula Language
- LotusScript
- Business Rules
- Workflow Definitions
- Field Formulas
- Validation Formulas
- QueryOpen
- QuerySave
- QueryModeChange
- QueryRecalc
- PostOpen
- PostSave
- HideWhen Expressions

Security Keywords:

- @UserRoles
- @Contains
- @IsMember
- @UserNamesList
- Readers
- Authors

---

# SECURITY DISCOVERY RULES

The agent MUST NOT rely only on ACL roles.

Security rules may be embedded within:

- ACL
- Views
- Buttons
- Actions
- Navigation
- Formulas
- LotusScript
- Readers Fields
- Authors Fields
- Workflow Rules

Search entire synopsis.json.

Record every discovered security reference.

---

# ROLE DISCOVERY

Extract roles from:

- Roles section
- ACL
- @UserRoles
- @Contains(@UserRoles
- Readers formulas
- Authors formulas
- Actions
- Buttons
- Hidden formulas
- Views
- Navigation entries
- LotusScript

Example:

[Admin]
[DanKanri]
[DanTanto]
[ImuSyai]
[ImuUke]

Normalize:

Admin
DanKanri
DanTanto
ImuSyai
ImuUke

Rules:

- Remove []
- Remove duplicates
- Preserve original names
- Sort alphabetically

Generate:

generated/security/discovered-roles.json

Structure:

{
  "roles": []
}

---

# ACL ANALYSIS

Analyze:

- ACL Roles
- ACL Entries
- ACL Role Assignments
- Access Levels
- Delete Permissions
- Public Document Access
- Anonymous Access
- Default Access

Generate:

generated/security/acl-summary.json

Structure:

{
  "acl": {}
}

---

# READERS AND AUTHORS ANALYSIS

Analyze:

- Readers Fields
- Authors Fields
- Computed Readers
- Computed Authors

Determine:

- Record Visibility
- Record Ownership
- Edit Permissions

Generate:

generated/security/record-security.json

Example:

{
  "form": "",
  "readRoles": [],
  "authorRoles": []
}

---

# VIEW SECURITY ANALYSIS

Analyze:

- Hidden Views
- View Selection Formula
- Security Formulas
- Role Visibility

Generate:

generated/security/view-security.json

Structure:

{
  "views": []
}

---

# NAVIGATION SECURITY ANALYSIS

Analyze:

- Navigation
- Outline Entries
- Hidden Formulas
- Security Conditions

Generate:

generated/security/navigation-security.json

Structure:

{
  "navigation": []
}

---

# MENU SECURITY ANALYSIS

Analyze:

- Menus
- Navigation Nodes
- Outline Conditions

Generate:

generated/security/menu-security.json

Structure:

{
  "menus": []
}

---

# ACTION SECURITY ANALYSIS

Analyze:

- Actions
- Buttons
- HideWhen
- EnableWhen
- Formula Conditions

Generate:

generated/security/action-security.json

Structure:

{
  "actions": []
}

---

# WORKFLOW ANALYSIS

Identify:

- State Field
- Workflow Status
- Approval States
- Rejection States
- Return States

Analyze:

- Buttons
- Actions
- LotusScript
- Formula Language

Generate:

generated/security/workflow-matrix.json

Example:

{
  "transitions": [
    {
      "fromStatus":"1000",
      "toStatus":"3000",
      "role":"DanTanto",
      "action":"Submit"
    }
  ]
}

---

# MICROSOFT ENTRA ID GENERATION

Generate one Security Group for every discovered Notes role.

Naming Convention:

SG-{ApplicationName}-{Role}

Examples:

SG-Application-Admin
SG-Application-DanKanri
SG-Application-DanTanto
SG-Application-ImuSyai
SG-Application-ImuUke

Generate:

generated/security/entra-groups.json

Structure:

{
  "groups": []
}

Generate:

generated/security/entra-provisioning-plan.md

Include:

- Group Name
- Source Role
- Owner Recommendations
- Membership Recommendations

---

# DATAVERSE TEAM GENERATION

Generate one Dataverse Team for every role.

Naming Convention:

DT-{Role}

Generate:

generated/security/dataverse-teams.json

Example:

{
  "teams": []
}

---

# DATAVERSE ROLE GENERATION

Generate recommended security roles.

Examples:

Application Administrator

Application Manager

Application Approver

Application User

Generate:

generated/security/dataverse-roles.json

Structure:

{
  "roles": []
}

---

# ROLE MAPPING GENERATION

Generate end-to-end role mappings.

Output:

generated/security/role-mapping.json

Structure:

{
  "mappings": [
    {
      "notesRole": "",
      "entraGroup": "",
      "dataverseTeam": "",
      "dataverseRole": ""
    }
  ]
}

---

# PERMISSION MATRIX GENERATION

Map permissions to roles.

Supported Permissions:

- View
- Create
- Edit
- Delete
- Approve
- Reject
- Reassign
- Export
- Import
- Administer

Generate:

generated/security/permission-matrix.json

Structure:

{
  "permissions": []
}

---

# SECURITY MANIFEST

Generate central security manifest.

Output:

generated/security/security-model.json

Structure:

{
  "application": "",
  "roles": [],
  "entraGroups": [],
  "dataverseTeams": [],
  "dataverseRoles": [],
  "workflowPermissions": [],
  "recordPermissions": [],
  "fieldPermissions": [],
  "menuPermissions": [],
  "viewPermissions": [],
  "actionPermissions": [],
  "routePermissions": []
}

This is the master security file.

All generators MUST consume this file.

---

# REACT SECURITY FRAMEWORK GENERATION

Generate production-ready React/Vite security infrastructure.

Required Output:

src/security/AppRole.ts

src/security/AppPermission.ts

src/security/PermissionMatrix.ts

src/security/SecurityContext.tsx

src/security/AuthorizationProvider.tsx

src/security/useAuthorization.ts

src/security/PermissionGate.tsx

src/security/RoleGuard.tsx

src/security/SecurityService.ts

src/security/EntraRoleMapper.ts

src/security/index.ts

Requirements:

- React 19
- TypeScript Strict
- Vite
- Fluent UI
- TanStack Router
- TanStack Query
- ESLint Compliant
- npm run build compatible

Generate working code.

Do not generate placeholders when sufficient metadata exists.

---

# MSAL GENERATION

Generate:

src/security/msalConfig.ts

src/security/useCurrentUser.ts

Support:

- Login
- Logout
- Access Token
- ID Token
- Group Claims
- App Roles

Requirements:

- MSAL Browser
- MSAL React
- Entra ID Authentication

Security decisions MUST originate from Entra claims.

---

# ENTRA ROLE MAPPER

Generate:

src/security/EntraRoleMapper.ts

Responsibilities:

- Read Entra Group Claims
- Read App Roles
- Map Groups To Application Roles

Example:

SG-Application-Admin
→ Admin

SG-Application-DanKanri
→ DanKanri

SG-Application-DanTanto
→ DanTanto

Generate production-ready TypeScript.

---

# GENERATED SECURITY TYPES

Generate:

src/generated/security/

Files:

roleMappings.ts

permissionMappings.ts

workflowMappings.ts

menuMappings.ts

routeMappings.ts

fieldMappings.ts

formMappings.ts

Purpose:

Allow downstream generators to reuse generated security metadata.

---

# ROUTE SECURITY GENERATION

Generate:

generated/security/route-security.json

Structure:

{
  "routes": []
}

Generate corresponding:

src/generated/security/routeMappings.ts

---

# FORM SECURITY GENERATION

Generate:

generated/security/form-security.json

Determine:

- Editable Roles
- Read Only Roles
- Hidden Roles
- Creator Roles

Do not invent permissions.

Use only discovered evidence.

---

# FIELD SECURITY GENERATION

Generate:

generated/security/field-security.json

Structure:

{
  "fields": []
}

Generate restrictions only when supported by metadata.

---

# DOWNSTREAM GENERATOR CONTRACT

The following generators MUST consume:

generated/security/security-model.json

Examples:

Gallery Generator
→ Uses menu permissions

Form Generator
→ Uses form permissions

View Generator
→ Uses view permissions

Route Generator
→ Uses route permissions

Workflow Generator
→ Uses workflow permissions

Do not independently create security rules.

Always use security-model.json.

---

# VALIDATION

Verify:

Every Notes Role
→ Entra Group

Every Entra Group
→ Dataverse Team

Every Dataverse Team
→ Dataverse Role

Every @UserRoles Reference
→ Permission Mapping

Every Action
→ Authorized Role

Every View
→ Visibility Rule

Every Form
→ Security Definition

Every Workflow Transition
→ Authorized Role

Fail generation if violations exist.

Generate:

generated/security/validation-report.json

---

# REPORTING

Generate:

generated/reports/security-migration-report.md

Include:

- Application Summary
- Discovered Roles
- ACL Summary
- View Security
- Navigation Security
- Form Security
- Workflow Security
- Permission Matrix
- Entra Security Groups
- Dataverse Teams
- Dataverse Security Roles
- Missing Mappings
- Security Risks
- Migration Recommendations

---

# NON-GOALS

Do NOT:

- Provision Entra Groups
- Provision Dataverse Teams
- Provision Dataverse Roles
- Modify Tenant Security
- Execute Graph API Changes

Only generate deployment artifacts and source code.

---

# SUCCESS CRITERIA

Generation succeeds only if:

- Roles discovered
- Security analyzed
- Security manifest generated
- React security framework generated
- MSAL integration generated
- Validation passes
- Security migration report generated

Otherwise fail with diagnostics.