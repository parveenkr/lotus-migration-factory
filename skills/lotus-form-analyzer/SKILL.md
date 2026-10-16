# SKILL NAME/DESCRIPTION
name: lotus-notes-form-blueprint-generator
description: Analyzes Lotus Notes Forms and generates implementation-neutral migration blueprints preserving form structure, fields, actions, validations, subforms, attachments, response-document relationships, audit requirements, dependencies, and business intent for downstream migration generators.
---

# PURPOSE

  Analyze Lotus Notes Forms and generate a normalized migration blueprint.

  This skill is an analysis and blueprint generation skill.

  The generated migration blueprint becomes the authoritative source for downstream generators.

  This skill must:

  - Analyze Lotus Notes Forms
  - Preserve Business Logic References
  - Preserve Business Intent
  - Preserve Form Structure
  - Preserve Field Definitions
  - Preserve Layout Definitions
  - Preserve Actions
  - Preserve Validation Rules
  - Preserve Lotus Formula Logic
  - Preserve Subforms
  - Preserve Audit History Requirements
  - Preserve Attachment Behavior
  - Preserve Dependencies

  Generate:

  generated/blueprints/forms/<FormName>.migration-blueprint.json

  The generated blueprint must contain:

  - Form Definition
  - Layout Definition
  - Field Definitions
  - Section Definitions
  - Action Definitions
  - Validation Rules
  - Formula Definitions
  - Subform Definitions
  - Audit History Definitions
  - Attachment Definitions
  - Dependency Definitions
  - Presentation Hints
  - Implementation Hints
  - Migration Hints
  - Migration Risks

  This skill must not generate:

  - React Code
  - TypeScript Code
  - TSX Files
  - Fluent UI Components
  - TanStack Components
  - Power Apps Artifacts
  - Dataverse Artifacts
  - Workflows
  - UI Layout Implementations
  - Security Implementations
  - Executable Code

  The generated blueprint serves as the authoritative representation of the Lotus Notes Form.

  All downstream React generators, Power Platform generators, Dataverse generators, form generators, workflow generators, security generators, and future implementation generators must use the migration blueprint as the primary source of truth.

  If a downstream generator derives behavior that conflicts with the migration blueprint:

  The migration blueprint takes precedence.

  The generated blueprint must remain:

  - Implementation Neutral
  - Platform Independent
  - Vendor Neutral
  - Traceable To Lotus Notes Metadata
  - Suitable For Automated Validation
  - Suitable For Automated Code Generation
  - Reusable Across Multiple Target Platforms
  - Consumable By Downstream Generators

  All generated blueprint content must be traceable to Lotus Notes metadata extracted from synopsis.json.

  The purpose of this skill is to create a canonical migration model of a Lotus Notes Form that can be used by future Microsoft Power Platform, React, Dataverse, Workflow, Security, and other implementation generators without rereading the original Lotus Notes metadata.

---

# CORE PRINCIPLES

  ## Preserve

    Preserve exactly:

    - Business Behavior
    - Form Logic
    - Validation Rules
    - Actions
    - Formula Logic
    - Data Relationships
    - Subforms
    - Field Definitions
    - Field Order
    - Section Definitions
    - Section Order
    - Labels
    - Visibility Rules
    - Editability Rules
    - Reader Rules
    - Author Rules
    - Audit History Behavior
    - Attachment Behavior
    - Business Intent
    - Dependencies

    Every element represented in the source Lotus Notes Form must be preserved in the migration blueprint.

    The migration blueprint must remain traceable to the original Lotus Notes metadata.

  ## Normalize

    Normalize Lotus Notes metadata into a platform-neutral form model.

    Generate:

    - Form Definitions
    - Layout Definitions
    - Field Definitions
    - Section Definitions
    - Action Definitions
    - Formula Definitions
    - Subform Definitions
    - Attachment Definitions
    - Audit History Definitions
    - Dependency Definitions

    Normalization must:

    - Preserve original meaning
    - Preserve business intent
    - Preserve behavioral intent

    Normalization must not:

    - Remove metadata
    - Simplify metadata
    - Translate business meaning
    - Change validation behavior

  ## Analyze

    Analyze all Lotus Notes metadata associated with the Form.

    Identify:

    - Business Rule References
    - Formula Dependencies
    - Form Dependencies
    - Subform Dependencies
    - Database Dependencies
    - External Dependencies

    Generate migration guidance where possible.

    Preserve original source metadata whenever analysis cannot confidently determine the business intent.

  ## Blueprint Authority

    The generated migration blueprint becomes the authoritative representation of the Lotus Notes Form.

    Downstream generators must consume the migration blueprint rather than directly analyzing Lotus Notes metadata.

    If a downstream generator derives behavior that conflicts with the migration blueprint:

    The migration blueprint takes precedence.

  ## Implementation Neutrality

    The migration blueprint must remain:

    - Platform Independent
    - Vendor Neutral
    - Framework Independent
    - Implementation Neutral

    The blueprint must not contain:

    - React Implementations
    - TypeScript Implementations
    - Fluent UI Implementations
    - TanStack Implementations
    - Power Apps Implementations
    - Dataverse Implementations
    - Executable Code

    Implementation decisions belong to downstream generators.

  ## Metadata Integrity

    Never:

    - Invent Fields
    - Invent Sections
    - Invent Forms
    - Invent Actions
    - Invent Validation Rules
    - Invent Dependencies
    - Invent Formula Logic

    If metadata is missing:

    - Preserve Available Metadata
    - Record Migration Warnings
    - Record Migration Risks
    - Continue Blueprint Generation
    - Never Invent Replacement Values

    All blueprint content must be traceable to Lotus Notes metadata contained in synopsis.json.

---

# INPUT MODEL

  Primary Metadata Source:

  Input/ExtractedJson/synopsis.json

  This skill must analyze Lotus Notes Form metadata exclusively from synopsis.json.

  The generated migration blueprint must be derived from Lotus Notes metadata contained in synopsis.json.

  Process only the requested Form.

  Required Inputs:

  Form Name
  Form Alias

  Form Alias takes precedence if multiple Forms match the requested criteria.

  Form Name may be used as the primary identifier when Alias is unavailable.

  Optional Inputs:

  Application Name
  Database Name
  Database Alias
  Migration Context
  Target Platform

  Example:

  Application Name:
  Medical Inquiry System

  Database Name:
  MedicalInquiry.nsf

  Database Alias:
  MEDICAL

  Target Platform:
  Power Platform Code Apps

  Expected Lotus Notes Metadata:

  {
  "Name": "",
  "Alias": "",
  "FieldNames": [],
  "Fields": [],
  "Actions": [],
  "EventReferences": [],
  "ScriptReferences": [],
  "Formulas": [],
  "Subforms": [],
  "WindowTitleFormula": "",
  "Layout": {},
  "Sections": [],
  "Readers": [],
  "Authors": [],
  "Attachments": [],
  "HideWhen": [],
  "Roles": []
  }

  Analyze and Preserve:
  - Form Metadata
  - Field Definitions
  - Layout Definitions
  - Section Definitions
  - Actions
  - Formula Language
  - Window Title Formulas
  - Readers Fields
  - Authors Fields
  - Roles
  - HideWhen Rules
  - Validation Rules
  - Subforms
  - Attachments
  - Audit History Metadata
  - Response Document Metadata

  The blueprint generator may identify references to:

  - Workflow Metadata
  - Security Metadata
  - LotusScript Metadata
  - Integration Metadata
  - Rich Text Metadata
  - Profile Document Metadata

  Detailed analysis of these areas is performed by specialized analyzers.

  Optional inputs may be used only to enrich:

  - Presentation Hints
  - Implementation Hints
  - Migration Hints
  - Migration Risk Analysis

  Optional inputs must never override Lotus Notes metadata extracted from synopsis.json.

  Metadata Precedence Order:

  1. synopsis.json
  2. Explicit user input
  3. Migration context
  4. Generated recommendations

  If conflicting information exists:

  synopsis.json always wins.

  Metadata Processing Priority:

    1. Layout Definitions
    2. Field Definitions
    3. Section Definitions
    4. Visibility Rules
    5. Actions
    6. Formula Language
    7. Subform Definitions
    8. Attachment Metadata
    9. Audit History Metadata
    10. Response Document Metadata

  Higher-priority metadata overrides lower-priority metadata only when conflicting source metadata exists.

  Never infer metadata from:

  - Screenshots
  - Generated Code
  - React Components
  - Power Apps Artifacts
  - Dataverse Schema
  - User Assumptions
  - Previous Migration Outputs

  Never:

  - Invent Forms
  - Invent Fields
  - Invent Actions
  - Invent Validation Rules
  - Invent Formulas
  - Invent Dependencies
  - Generate Synthetic Metadata

  If metadata is missing:

  Record the missing information in migrationRisks.

  Preserve available metadata.

  Do not invent replacement values.

  All blueprint content must be fully traceable to Lotus Notes metadata contained in synopsis.json.

  The generated migration blueprint must allow downstream generators to create equivalent functionality without rereading the original Lotus Notes metadata.

---

# FORM NORMALIZATION

  Before generating the migration blueprint, build a normalized internal FormDefinition model.

  All analysis, validation, dependency discovery, form analysis, risk analysis, and blueprint generation must use the normalized model.

  The normalized model establishes a vendor-neutral representation of the Lotus Notes Form.

  It must preserve business intent while decoupling the implementation from Lotus Notes technology.

  Normalized FormDefinition Model:

  {
    "traceability": {},
    "source": {},
    "form": {},
    "layout": {},
    "fields": [],
    "sections": [],
    "actions": [],
    "workflowReference": {},
    "securityReference": {},
    "logicReference": {},
    "formulas": [],
    "scriptReference": {},
    "subforms": [],
    "attachments": {},
    "auditHistory": {},
    "dependencies": [],
    "presentationHints": {},
    "implementationHints": {},
    "migrationHints": {},
    "migrationRisks": []
  }

  Model Guidelines:

  source
      Original Lotus Notes metadata.

  form
      Core form information and metadata.

  layout
      Logical layout structure and organization.

  fields
      Normalized field definitions.

  sections
      Form section definitions and hierarchy.

  actions
      Form actions and commands.

  workflowReference
      Reference metadata indicating workflow analysis ownership.

  securityReference
      Reference metadata indicating security analysis ownership.

  logicReference
      Reference metadata indicating business logic analysis ownership.

  scriptReference
      Reference metadata indicating LotusScript analysis ownership.

  formulas
      Formula language definitions and dependencies.

  subforms
      Subform references, behavior and conditional rendering metadata.

  attachments
      Attachment behavior and attachment-related metadata.

  auditHistory
      Audit trail and history tracking requirements.

  dependencies
      Forms, views, databases, profile documents, scripts, workflows and external integrations used by the form.

  presentationHints
      Presentation semantics derived from Lotus Notes metadata.

  implementationHints
      Platform-neutral implementation guidance for downstream generators.

  migrationHints
      Migration recommendations and modernization guidance.

  migrationRisks
      Migration blockers, unsupported features and implementation warnings.

  Normalization Rules:

  Preserve all Lotus Notes metadata.

  Do not discard information.

  Do not rename metadata.

  Do not translate business meaning.

  Do not invent replacement values.

  Do not generate implementation code.

  Do not generate UI layouts.

  Do not generate React artifacts.

  Do not generate Power Apps artifacts.

  Do not generate Dataverse artifacts.

  Mandatory Preservation:

  Form Structure
  Section Hierarchy
  Field Definitions
  Field Order
  Section Order
  Actions
  Workflow References
  Security References
  Validation Rules
  Formula Logic
  Subforms
  Attachment Behavior
  Audit History Requirements
  Dependencies
  Business Intent

  If metadata cannot be fully normalized:

  Preserve the original value.

  Record the issue in migrationRisks.

  Continue blueprint generation.

  Never replace missing metadata with invented values.

  All blueprint output must be generated exclusively from the normalized FormDefinition model.

---

# FIELD CLASSIFICATION

  Every field must be analyzed and classified.

  Field classification establishes the business purpose of a field independent of the implementation technology.

  Classification results must be preserved in the migration blueprint.

  Generate a normalized field model:

  {
    "fieldName": "",
    "fieldType": "",
    "classification": "",
    "required": false,
    "visible": true,
    "editable": true,
    "sourceFormula": "",
    "dependencies": []
  }

  A field may belong to one primary classification.

  If classification cannot be determined with confidence:

  - Preserve original metadata
  - Record a migration warning
  - Record a migration risk
  - Do not invent field purpose

  ## UserField

    Editable business field.

    Represents business data entered or maintained by end users.

    Examples:

    IraiKana
    Birthday
    AnswerText

    Characteristics:

    - User Editable
    - Business Data
    - Visible To Users
    - Participates In Form Processing

  ## WorkflowField

    Workflow control field.

    Represents workflow state, approval status, routing logic, or lifecycle tracking.

    Examples:

    StatusCode
    StatusName
    ApprovalStatus

    Characteristics:

    - Workflow Controlled
    - State Tracking
    - Process Management
    - Approval Support

  ## AuditField

    Audit and history field.

    Records system activity, document changes, approvals, and modification history.

    Examples:

    KousinDate
    Kousinsya
    KousinStatus
    KousinSosiki

    Characteristics:

    - Read Only
    - History Tracking
    - Compliance Support
    - Change Audit

  ## SystemField

    System control field.

    Used internally by Lotus Notes or application infrastructure.

    Examples:

    BtnFlag
    SaveOptions
    DelFlag
    IraiOverFlag

    Characteristics:

    - System Managed
    - Internal Processing
    - Not Intended For User Editing

    Preserve system fields.

    Do not discard them.

  ## HiddenField

    Hidden metadata field.

    May participate in:

    - Business Logic
    - Validation Logic
    - View Logic
    - Action Logic
    - Security References
    - Workflow References

    Characteristics:

    - Hidden From Users
    - Logic Participation
    - Internal Processing

    Do not discard hidden fields.

    Preserve all dependencies.

  ## ComputedField

    Calculated field.

    Value is derived from formulas, workflow-related metadata, or other fields.

    Characteristics:

    - Formula Based
    - Computed Value
    - Derived Business Data

    Preserve:

    - Formula Definitions
    - Dependencies
    - Calculation Logic

  ## SecurityField

    Security-related field.

    Participates in authorization, visibility, ownership, Readers, Authors, or role assignment.

    Examples:

    Readers
    Authors
    ApproverRole

    Characteristics:

    - Access Control
    - Visibility Management
    - Ownership Tracking

    Preserve all security-related metadata and references.

  ## AttachmentField

    Attachment-related field.

    Represents document attachments or file references.

    Characteristics:

    - Attachment Storage
    - File References
    - Document Association

    Preserve attachment metadata.

  ## RelationshipField

    Reference field.

    Represents relationships to:

    - Forms
    - Documents
    - Views
    - Databases
    - External Systems

    Characteristics:

    - Referential Data
    - Navigation Support
    - Cross-Entity Relationships

    Preserve all relationship metadata.

  ## Classification Rules

    Every source field must exist in the migration blueprint.

    Every hidden field must be preserved.

    Every security-related field must be preserved.

    Every workflow-related field must be preserved.

    Every audit-related field must be preserved.

    Every attachment-related field must be preserved.

    Every computed field must be preserved.

    Never:

    - Discard Fields
    - Rename Fields
    - Translate Field Names
    - Change Business Meaning
    - Invent Field Classifications

    If a field cannot be fully classified:

    - Preserve Available Metadata
    - Record Migration Risks
    - Continue Blueprint Generation
    - Never Invent Replacement Values

  ## Analyzer References

    Field classification may identify references to:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Rich Text Metadata
    - Profile Document Metadata

    The blueprint generator must preserve and classify these references.

    Detailed analysis of these areas is the responsibility of specialized analyzers.

  ---

# FORM STRUCTURE ANALYSIS

  Analyze the complete Lotus Notes Form structure.

  Generate normalized form metadata for the migration blueprint.

  Form structure metadata must be preserved exactly as defined in the source Form.

  Preserve exactly:

  - Form Definition
  - Section Order
  - Section Hierarchy
  - Group Order
  - Field Order
  - Labels
  - Window Title Behavior
  - Form Visibility Rules
  - Form-Level Metadata
  - Layout Relationships

  Do not:

  - Rename Labels
  - Rename Fields
  - Merge Sections
  - Remove Sections
  - Reorganize Layouts
  - Change Business Meaning
  - Alter Field Relationships

  unless the source metadata explicitly requires it.

  Analyze and preserve:

  - Form Name
  - Form Alias
  - WindowTitleFormula
  - Section Definitions
  - Group Definitions
  - Field Definitions
  - Layout Metadata
  - Visibility Metadata
  - Editability Metadata
  - Validation Metadata

  Generate a normalized form model:

  {
    "form": {
      "name": "",
      "alias": "",
      "title": "",
      "description": "",
      "windowTitleFormula": ""
    },
    "sections": [],
    "groups": [],
    "fields": []
  }

  ## Window Title Analysis

    Analyze:

    - WindowTitleFormula
    - Computed Titles
    - Dynamic Titles
    - Context-Sensitive Titles

    Preserve:

    - Original Formula
    - Referenced Fields
    - Dependencies
    - Business Intent

    Generate:

    {
      "windowTitle": {
        "formula": "",
        "dependencies": [],
        "purpose": ""
      }
    }

    Do not generate:

    - Page Titles
    - Document Titles
    - Browser Titles
    - React Metadata

    These implementation decisions belong to downstream generators.

  ## Section Analysis

    Analyze all section definitions.

    Identify:

    - Section Order
    - Section Hierarchy
    - Expand/Collapse Behavior
    - Visibility Behavior

    Generate:

    {
      "sections": [
        {
          "name": "",
          "order": 0,
          "visibilityRules": [],
          "dependencies": []
        }
      ]
    }

    Preserve section hierarchy exactly.

    Preserve references to workflow and security metadata when section behavior depends on them.

  ## Group Analysis

    Analyze field grouping organization.

    Identify:

    - Group Membership
    - Display Order
    - Logical Relationships

    Generate:

    {
      "groups": [
        {
          "name": "",
          "fields": [],
          "dependencies": []
        }
      ]
    }

    Preserve logical grouping relationships.

  ## Field Ordering Analysis

    Preserve:

    - Original Ordering
    - Business Grouping
    - Section Relationships

    Never:

    - Reorder Fields
    - Merge Groups
    - Flatten Structure

    unless the source metadata explicitly requires it.

  ## External Analyzer References

    Form structure metadata may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Logic Metadata
    - Integration Metadata
    - Profile Document Metadata
    - Rich Text Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Dependency Analysis

    Identify relationships to:

    - Actions
    - Validation Rules
    - Formulas
    - Subforms
    - Attachments
    - Response Relationships

    Record all dependencies in the migration blueprint.

    Preserve references to:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Logic Metadata
    - Integration Metadata
    - Profile Document Metadata
    - Rich Text Metadata

    when discovered.

  ## Validation Rules

    Every source field must exist in the blueprint.

    Every section must be preserved.

    Every group must be preserved.

    Every field relationship must be preserved.

    Every title definition must be preserved.

    Every dependency must be preserved.

    If a form structure cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve the structure, organization, dependencies, and business intent of the Lotus Notes Form so that downstream generators can create equivalent implementations without rereading the original Lotus Notes metadata.

---

# ACTION ANALYSIS

  Analyze all Lotus Notes Actions associated with the Form.

  Preserve the original action behavior, execution intent, visibility logic, and business purpose.

  Generate normalized action definitions for the migration blueprint.

  Never generate implementation code.

  Analyze:

  - Form Actions
  - Action Bar Actions
  - Shared Actions
  - Embedded Actions
  - Workflow Actions
  - Navigation Actions
  - Administrative Actions
  - Print Actions
  - Export Actions
  - Email Actions
  - Agent Execution Actions
  - URL Actions
  - Database Actions
  - Response Document Actions

  Generate a normalized action model:

  {
    "actions": [
      {
        "name": "",
        "actionType": "",
        "purpose": "",
        "visibilityRules": [],
        "dependencies": []
      }
    ]
  }

  ## Action Discovery

    Identify actions from:

    - Form Metadata
    - Shared Actions
    - Action Bars
    - Formula Language
    - HideWhen Logic

    Preserve references to LotusScript-based actions when discovered.

    Preserve:

    - Action Names
    - Action Order
    - Action Behavior
    - Action Purpose
    - Dependencies

    Do not rename actions.

    Do not change business intent.

  ## Action Classification

    Classify each action into one or more categories.

    Examples:

    - NavigationAction
    - DataAction
    - AdministrativeAction
    - ReportingAction
    - IntegrationAction
    - UtilityAction

    Generate:

    {
      "actionClassification": {
        "actionName": "",
        "classifications": []
      }
    }

    Preserve original action purpose.

    Do not invent classifications.

  ## Navigation Action Analysis

    Identify actions used for navigation.

    Examples:

    - Open Form
    - Open View
    - Open Document
    - Open Response
    - Open Database
    - Open URL

    Generate:

    {
      "navigationAction": {
        "actionName": "",
        "targetType": "",
        "target": "",
        "dependencies": []
      }
    }

    Preserve navigation intent.

    Preserve navigation targets.

  ## Data Operation Analysis

    Identify actions used for data manipulation.

    Examples:

    - Save
    - Edit
    - Delete
    - Create
    - Clone
    - Copy
    - Archive

    Generate:

    {
      "dataAction": {
        "actionName": "",
        "operation": "",
        "dependencies": []
      }
    }

    Preserve data behavior exactly.

    Do not alter business processing.

  ## Agent Execution Analysis

    Identify actions that execute Lotus Notes agents.

    Examples:

    - Run Agent
    - Background Processing
    - Batch Processing
    - Data Synchronization

    Generate:

    {
      "agentAction": {
        "actionName": "",
        "agentName": "",
        "dependencies": []
      }
    }

    Preserve all agent references.

    Record agent dependencies.

  ## Email Action Analysis

    Identify actions used for mail-related processing.

    Examples:

    - Send Mail
    - Approval Notification
    - Escalation Notification
    - Status Notification
    - Reminder Notification

    Generate:

    {
      "emailAction": {
        "actionName": "",
        "notificationType": "",
        "dependencies": []
      }
    }

    Preserve communication intent.

    Preserve notification behavior.

  ## Export And Reporting Analysis

    Identify actions used for:

    - Printing
    - Exporting
    - Reporting
    - Downloading
    - Document Generation

    Generate:

    {
      "reportingAction": {
        "actionName": "",
        "reportType": "",
        "dependencies": []
      }
    }

    Preserve reporting intent.

    Preserve document generation requirements.

  ## Integration Action Analysis

    Identify actions interacting with:

    - External Systems
    - APIs
    - Other Databases
    - Shared Services
    - Document Repositories

    Generate:

    {
      "integrationAction": {
        "actionName": "",
        "integrationType": "",
        "dependencies": []
      }
    }

    Preserve integration references and dependencies.

    Detailed integration analysis is performed by the Integration Analyzer.

  ## Visibility Analysis

    Analyze action visibility rules.

    Identify:

    - HideWhen Rules
    - Formula-Based Visibility
    - State-Based Visibility

    Generate:

    {
      "actionVisibility": {
        "actionName": "",
        "visibilityRules": [],
        "dependencies": []
      }
    }

    Preserve visibility behavior exactly.

    Preserve references to workflow and security metadata when visibility depends on them.

    Do not simplify visibility logic.

  ## Formula Analysis

    Analyze formulas associated with actions.

    Identify:

    - Execution Conditions
    - Validation Logic
    - Visibility Logic
    - Navigation Logic

    Generate:

    {
      "actionFormulaDependency": {
        "actionName": "",
        "formulas": [],
        "dependencies": []
      }
    }

    Preserve formula behavior.

  ## LotusScript References

    {
      "scriptReferences": [
        {
          "scriptName": "",
          "analyzedBy": "lotus-script-analyzer"
        }
      ]
    }

  ## External Analyzer References

    Actions may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Profile Document Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Dependency Analysis

    Identify dependencies involving:

    - Forms
    - Subforms
    - Views
    - Agents
    - Formula Language
    - Databases
    - External Systems
    - External URLs

    Record all dependencies.

    Preserve references to:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Profile Document Metadata

    when discovered.

  ## Migration Risk Analysis

    Identify:

    - Unsupported Actions
    - Unsupported Agent Dependencies
    - External System Dependencies
    - Missing Action Metadata
    - Complex Dependency Chains

    Generate migration risks.

    Preserve original behavior whenever possible.

  ## Validation Rules

    Every action must be preserved.

    Every action dependency must be preserved.

    Every visibility rule must be preserved.

    Every workflow reference must be preserved.

    Every security reference must be preserved.

    Every agent dependency must be preserved.

    Every formula dependency must be preserved.

    Every integration dependency must be preserved.

    Every navigation dependency must be preserved.

    If action behavior cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve Lotus Notes action behavior, navigation intent, dependencies, visibility logic, and business purpose so that downstream generators can create equivalent functionality without rereading the original Lotus Notes metadata.

---

# SUBFORM ANALYSIS

  Analyze all Lotus Notes subforms associated with the Form.

  Preserve the original subform structure, relationships, behavior, and business intent.

  Generate normalized subform definitions for the migration blueprint.

  Never generate implementation code.

  Analyze:

  - Subform References
  - Selection Formulas
  - Conditional Rendering Logic
  - Visibility Rules
  - Embedded Subforms
  - Dynamic Subform Selection
  - Shared Subforms
  - Response Subforms

  Generate a normalized subform model:

  {
    "subforms": [
      {
        "name": "",
        "alias": "",
        "selectionFormula": "",
        "purpose": "",
        "visibilityRules": [],
        "dependencies": []
      }
    ]
  }

  Preserve:

  - Subform Names
  - Subform Aliases
  - Selection Formulas
  - Conditional Logic
  - Business Intent

  Do not flatten subforms.

  Do not merge subforms.

  Do not reorganize subforms.

  ## Subform Reference Analysis

    Analyze:

    - Direct References
    - Dynamic References
    - Conditional References
    - Computed References

    Identify:

    - Source Form
    - Referenced Subform
    - Reference Type
    - Dependency Relationships

    Generate:

    {
      "subformReference": {
        "parentForm": "",
        "subformName": "",
        "referenceType": "",
        "dependencies": []
      }
    }

    Preserve all reference relationships.

  ## Conditional Subform Analysis

    Analyze all conditional subform logic.

    Examples:

    - Status-Based Selection
    - Role-Based Selection
    - Formula-Based Selection

    Preserve:

    - Original Selection Formula
    - Evaluation Logic
    - Dependencies
    - Business Intent

    Generate:

    {
      "conditionalSubform": {
        "subform": "",
        "selectionFormula": "",
        "dependencies": []
      }
    }

    Do not simplify conditional logic.

    Do not alter conditional behavior.

  ## Field Dependency Analysis

    Analyze fields contained within subforms.

    Identify:

    - Business Fields
    - Workflow Fields
    - Audit Fields
    - Hidden Fields
    - Security Fields
    - Attachment Fields

    Generate:

    {
      "fieldDependencies": []
    }

    Preserve all field relationships.

  ## Shared Subform Analysis

    Identify shared subforms reused across forms.

    Examples:

    - Audit History Sections
    - Attachment Sections
    - Approval Sections

    Generate:

    {
      "sharedSubform": {
        "name": "",
        "usedBy": [],
        "purpose": ""
      }
    }

    Preserve reusability metadata.

    Do not duplicate shared subforms.

  ## Embedded Subform Analysis

    Analyze nested and embedded subforms.

    Identify:

    - Parent Subforms
    - Child Subforms
    - Hierarchy Relationships
    - Dependency Chains

    Generate:

    {
      "subformHierarchy": {
        "parent": "",
        "children": []
      }
    }

    Preserve hierarchy exactly as defined in source metadata.

  ## External Analyzer References

    Subforms may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Profile Document Metadata
    - Rich Text Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Dependency Analysis

    Identify dependencies involving:

    - Fields
    - Sections
    - Forms
    - Views
    - Databases
    - External Systems

    Record all dependencies.

    Preserve references to workflow, security, script, integration, rich text, and profile-document artifacts when discovered.

  ## Migration Risk Analysis

    Identify:

    - Unsupported Selection Formulas
    - Complex Dynamic Subform Selection
    - Circular Dependencies
    - Missing Subform References
    - External Dependencies

    Generate migration risks.

    Preserve behavior whenever possible.

  ## Validation Rules

    Every subform must be preserved.

    Every subform reference must be preserved.

    Every selection formula must be preserved.

    Every conditional dependency must be preserved.

    Every shared subform relationship must be preserved.

    Every embedded subform hierarchy must be preserved.

    Every dependency must be preserved.

    If subform behavior cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve Lotus Notes subform behavior, relationships, dependencies, and business intent so that downstream generators can create equivalent functionality without rereading the original Lotus Notes metadata.

---

# AUDIT HISTORY ANALYSIS

  Analyze all audit history metadata associated with the Form.

  Preserve the original audit trail behavior and business intent.

  Generate normalized audit history definitions for the migration blueprint.

  Never generate implementation code.

  Analyze:

  - Audit History Sections
  - Change History Fields
  - Approval History
  - Status Change History
  - Modification Tracking
  - Ownership Changes
  - Timestamp Tracking
  - User Tracking

  Detect audit history metadata such as:

  更新履歴
  History
  Rireki

  or fields such as:

  KousinDate
  Kousinsya
  KousinStatus
  KousinSosiki

  Generate a normalized audit history model:

  {
    "auditHistory": {
      "enabled": true,
      "historyType": "",
      "trackingFields": [],
      "approvalTracking": false,
      "dependencies": []
    }
  }

  ## Audit Field Analysis

    Identify audit-related fields.

    Examples:

    - Created Date
    - Created By
    - Updated Date
    - Updated By
    - Status History
    - Approval History

    Generate:

    {
      "auditField": {
        "fieldName": "",
        "purpose": "",
        "dependencies": []
      }
    }

    Preserve:

    - Original Field Names
    - History Behavior
    - Tracking Purpose
    - Dependencies

    Do not rename audit fields.

    Do not change business meaning.

  ## Approval History Analysis

    Analyze approval tracking requirements.

    Identify:

    - Approvers
    - Approval Dates
    - Approval Results
    - Comments

    Generate:

    {
      "approvalHistory": {
        "enabled": true,
        "trackedActivities": [],
        "dependencies": []
      }
    }

    Preserve approval history requirements.

  ## Read-Only Analysis

    Determine whether audit history is:

    - Read Only
    - Partially Editable
    - System Generated

    Generate:

    {
      "auditBehavior": {
        "editable": false,
        "systemManaged": true
      }
    }

    Preserve original editability behavior.

    Do not weaken audit controls.

  ## External Analyzer References

    Audit metadata may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Profile Document Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Audit Dependency Analysis

    Identify dependencies involving:

    - Forms
    - Subforms
    - External Systems

    Record all dependencies.

    Preserve references to workflow, security, script, integration, and profile-document artifacts when discovered.

  ## Migration Risk Analysis

    Identify:

    - Missing Audit Metadata
    - External Audit Dependencies
    - Unsupported Audit Mechanisms
    - Complex Dependency Chains

    Generate migration risks.

  ## Validation Rules

    Every audit field must be preserved.

    Every audit dependency must be preserved.

    Every approval history requirement must be preserved.

    Every audit restriction must be preserved.

    Every tracking requirement must be preserved.

    If audit behavior cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve audit history behavior, tracking requirements, dependencies, and business intent so that downstream generators can implement equivalent audit tracking without rereading the original Lotus Notes metadata.

---

# ATTACHMENT ANALYSIS

  Analyze all attachment-related metadata associated with the Form.

  Preserve the original attachment behavior and business intent.

  Generate normalized attachment definitions for the migration blueprint.

  Never generate implementation code.

  Analyze:

  - Attachment Fields
  - Embedded Attachments
  - File References
  - Attachment Restrictions
  - Attachment Visibility Rules

  Detect attachment metadata such as:

  Attachment
  AttachDoc

  Generate a normalized attachment model:

  {
    "attachments": {
      "enabled": true,
      "attachmentFields": [],
      "restrictions": [],
      "dependencies": []
    }
  }

  ## Attachment Field Analysis

    Identify:

    - Attachment Fields
    - File Storage Fields
    - File Reference Fields
    - Document Attachment Areas

    Generate:

    {
      "attachmentField": {
        "fieldName": "",
        "purpose": "",
        "dependencies": []
      }
    }

    Preserve:

    - Field Names
    - Restrictions
    - Dependencies
    - Business Intent

  ## Attachment Restriction Analysis

    Analyze:

    - File Type Restrictions
    - File Size Restrictions
    - Visibility Rules
    - Access Restrictions

    Generate:

    {
      "attachmentRestriction": {
        "restrictionType": "",
        "value": ""
      }
    }

    Preserve all attachment restrictions.

  ## External Analyzer References

    Attachment metadata may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Integration Metadata
    - Profile Document Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Dependency Analysis

    Identify dependencies involving:

    - Forms
    - Subforms
    - Databases
    - External Repositories
    - External Systems

    Record all dependencies.

    Preserve references to workflow, security, script, integration, and profile-document artifacts when discovered.

  ## Migration Risk Analysis

    Identify:

    - Unsupported Attachment Mechanisms
    - External Repository Dependencies
    - Missing Attachment Metadata
    - Complex Dependency Chains
    - Unsupported Storage Patterns

    Generate migration risks.

  ## Validation Rules

    Every attachment field must be preserved.

    Every attachment dependency must be preserved.

    Every attachment restriction must be preserved.

    Every visibility rule affecting attachments must be preserved.

    Every attachment relationship must be preserved.

    If attachment behavior cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve attachment behavior, dependencies, restrictions, and business requirements so that downstream generators can create equivalent attachment functionality without rereading the original Lotus Notes metadata.

---

# RESPONSE DOCUMENT ANALYSIS

  Analyze all Lotus Notes Response Document behavior associated with the Form.

  Preserve the original parent-child relationships, document hierarchy, response chains, navigation behavior, dependencies, and business intent.

  Generate normalized response document definitions for the migration blueprint.

  Never generate implementation code.

  Analyze:

  - Parent Documents
  - Response Documents
  - Response-to-Response Documents
  - Response Hierarchies
  - Response Relationships
  - Document Threads
  - Approval Chains
  - Discussion Threads
  - Review Cycles
  - Response Navigation

  Generate a normalized response document model:

  {
    "responseRelationships": [
      {
        "parentForm": "",
        "responseForm": "",
        "relationshipType": "",
        "dependencies": []
      }
    ]
  }

  ## Parent Document Analysis

    Identify documents that serve as parents.

    Analyze:

    - Parent Form
    - Parent Document Type
    - Parent Ownership

    Generate:

    {
      "parentDocument": {
        "formName": "",
        "purpose": "",
        "dependencies": []
      }
    }

    Preserve:

    - Parent Relationships
    - Business Purpose
    - Dependencies

    Do not alter parent document behavior.

  ## Response Document Analysis

    Identify all response documents.

    Analyze:

    - Response Forms
    - Response Document Types
    - Response Purpose
    - Response Dependencies
    - Response Visibility

    Generate:

    {
      "responseDocument": {
        "formName": "",
        "purpose": "",
        "dependencies": []
      }
    }

    Preserve:

    - Response Form Names
    - Response Relationships
    - Response Purpose
    - Dependencies

    Do not flatten response structures.

  ## Response Hierarchy Analysis

    Analyze document hierarchies.

    Identify:

    - Parent Documents
    - Child Documents
    - Grandchild Documents
    - Multi-Level Response Chains

    Generate:

    {
      "responseHierarchy": {
        "parent": "",
        "children": [],
        "hierarchyDepth": 0
      }
    }

    Preserve hierarchy structure exactly.

    Do not simplify hierarchies.

  ## Relationship Analysis

    Determine relationship types.

    Examples:

    - Request → Approval
    - Request → Comment
    - Request → Review
    - Request → Response
    - Approval → Approval Comment
    - Case → Follow Up
    - Inquiry → Answer

    Generate:

    {
      "relationship": {
        "parentForm": "",
        "childForm": "",
        "relationshipType": "",
        "businessPurpose": ""
      }
    }

    Preserve business intent.

    Do not invent relationship types.

  ## Response Navigation Analysis

    Analyze navigation patterns involving response documents.

    Identify:

    - Open Parent Document
    - Open Response Document
    - Open Related Responses
    - Navigate Hierarchies
    - Expand Response Trees

    Generate:

    {
      "navigationDependency": {
        "navigationType": "",
        "dependencies": []
      }
    }

    Preserve navigation intent.

    Preserve document relationships.

  ## Discussion Thread Analysis

    Identify discussion-style response patterns.

    Examples:

    - Comments
    - Replies
    - Reviews
    - Conversations
    - Discussion Threads

    Generate:

    {
      "threadModel": {
        "enabled": true,
        "threadType": "",
        "dependencies": []
      }
    }

    Preserve threading behavior.

    Do not flatten conversations.

  ## External Analyzer References

    Response document structures may reference:

    - Workflow Metadata
    - Security Metadata
    - LotusScript Metadata
    - Profile Document Metadata
    - Integration Metadata

    The blueprint generator must preserve these references.

    Detailed analysis of these areas is performed by specialized analyzers.

  ## Dependency Analysis

    Identify dependencies involving:

    - Forms
    - Subforms
    - Views
    - Parent Documents
    - Child Documents
    - Databases
    - Formula Language
    - External Systems

    Record all dependencies.

    Preserve references to workflow, security, script, profile document, and integration artifacts when discovered.

  ## Migration Risk Analysis

    Identify:

    - Complex Response Hierarchies
    - Deep Response Chains
    - Circular Relationships
    - Missing Parent Forms
    - Cross-Database Relationships
    - Complex Dependency Chains

    Generate migration risks.

    Preserve original behavior whenever possible.

  ## Validation Rules

    Every Parent Document relationship must be preserved.

    Every Response Document relationship must be preserved.

    Every hierarchy level must be preserved.

    Every navigation dependency must be preserved.

    Every response chain must be preserved.

    Every discussion thread relationship must be preserved.

    Every dependency must be preserved.

    If response document behavior cannot be fully analyzed:

    - Preserve available metadata
    - Record the issue in migrationRisks
    - Continue blueprint generation
    - Never invent replacement values

    The purpose of this section is to preserve Lotus Notes Response Document behavior, hierarchy, navigation intent, dependencies, and business meaning so that downstream generators can create equivalent functionality without rereading the original Lotus Notes metadata.

---

# FORBIDDEN BEHAVIOR

  The Form Blueprint Generator is an analysis and blueprint generation skill.

  Its responsibility is to analyze Lotus Notes Form metadata and generate a normalized migration blueprint.

  It must never generate implementation artifacts.

  Never Generate:

  - React Components
  - TypeScript Files
  - TSX Files
  - Fluent UI Components
  - TanStack Form Implementations
  - TanStack Table Implementations
  - React Router Implementations
  - Power Apps Artifacts
  - Canvas Apps
  - Canvas YAML
  - Power Fx
  - Dataverse Artifacts
  - Dataverse Tables
  - Dataverse Forms
  - Model-Driven Apps
  - Power Automate Flows
  - PCF Controls
  - Deployment Scripts
  - Infrastructure Definitions
  - Security Implementations
  - Workflow Implementations
  - UI Implementations
  - Layout Implementations
  - Executable Code
  - Placeholder Code
  - Sample Data
  - Mock Data

  Never Generate:

  - FormPage.tsx
  - FormActions.tsx
  - WorkflowDefinition.ts
  - WorkflowHooks.ts
  - AuditHistoryTable.tsx
  - AttachmentUploader.tsx
  - Validators
  - Services
  - Hooks
  - Utility Functions

  Implementation decisions belong to downstream generators.

  Never Perform:

  - Workflow Analysis
  - Security Analysis
  - LotusScript Analysis
  - Logic Analysis
  - Integration Analysis
  - Rich Text Analysis
  - Profile Document Analysis

  These responsibilities belong to specialized analyzers.

  The blueprint generator may preserve references to these artifacts but must not replace or duplicate the analysis performed by specialized analyzers.

  Never Invent:

  - Forms
  - Fields
  - Sections
  - Labels
  - Actions
  - Validation Rules
  - Attachments
  - Subforms
  - Formulas
  - Dependencies
  - Navigation Targets
  - Response Relationships

  Never Generate:

  - Synthetic Metadata
  - Placeholder Metadata
  - Sample Metadata
  - Assumed Metadata
  - Replacement Metadata

  Never Modify:

  - Business Intent
  - Validation Intent
  - Action Intent
  - Navigation Intent
  - Audit Logic
  - Attachment Behavior
  - Response Document Relationships

  Never:

  - Rename Fields
  - Rename Forms
  - Rename Actions
  - Rename Roles
  - Rename Sections
  - Rename Subforms

  unless explicitly defined by source metadata.

  Never Discard:

  - Hidden Fields
  - System Fields
  - Security Fields
  - Workflow Fields
  - Audit Fields
  - Attachments
  - Subforms
  - Actions
  - Formulas
  - Validation Logic
  - Visibility Logic
  - Response Relationships
  - Dependencies

  Every source artifact represented within the form blueprint scope must be preserved.

  Never Simplify:

  - Validation Logic
  - Formula Logic
  - Visibility Logic
  - Response Relationships
  - Attachment Behavior
  - Audit History Behavior

  Preserve the original behavior whenever possible.

  If metadata is missing:

  - Preserve Available Metadata
  - Record Migration Warnings
  - Record Migration Risks
  - Continue Blueprint Generation
  - Never Invent Replacement Values

  If behavior cannot be fully analyzed:

  - Preserve Original Metadata
  - Record Analysis Limitations
  - Record Migration Risks
  - Continue Blueprint Generation

  All generated blueprint content must be traceable to Lotus Notes metadata contained within:

  Input/ExtractedJson/synopsis.json

  The generated migration blueprint is the authoritative representation of the Lotus Notes Form.

  Downstream generators must consume the migration blueprint rather than directly analyzing Lotus Notes metadata.

  If a downstream generator derives behavior that conflicts with the migration blueprint:

  The migration blueprint takes precedence.

  The generated blueprint must remain:

  - Implementation Neutral
  - Platform Independent
  - Vendor Neutral
  - Framework Independent
  - Technology Independent
  - Suitable For Automated Validation
  - Suitable For Automated Code Generation
  - Suitable For Future Migration Targets
  - Consumable By Downstream Generators

---

# OUTPUT SCHEMA

  Output:
  {
    "traceability": {
      "sourceFormName": "",
      "sourceFormAlias": "",
      "metadataSource": "Input/ExtractedJson/synopsis.json",
      "generatedBy": "lotus-notes-form-blueprint-generator"
    },
    "migrationBlueprintVersion": "1.0",
    "source": {},
    "form": {},
    "layout": {},
    "fields": [],
    "sections": [],
    "actions": [],
    "formulas": [],
    "subforms": [],
    "attachments": {},
    "auditHistory": {},
    "responseRelationships": [],
    "workflowReference": {
      "analyzedBy": "lotus-workflow-analyzer"
    },
    "securityReference": {
      "analyzedBy": "lotus-security-analyzer"
    },
    "logicReference": {
      "analyzedBy": "lotus-logic-analyzer"
    },
    "scriptReference": {
      "analyzedBy": "lotus-script-analyzer"
    },
    "integrationReference": {
      "analyzedBy": "lotus-integration-analyzer"
    },
    "richTextReference": {
      "analyzedBy": "rich-text-analyzer"
    },
    "profileReference": {
      "analyzedBy": "profile-document-analyzer"
    },
    "dependencies": [],
    "migrationHints": {},
    "migrationRisks": [],
    "complexity": {},
    "compatibility": {},
    "presentationHints": {},
    "implementationHints": {}
  }

---

# COMPLEXITY CLASSIFICATION

  The complexity classification provides an assessment of the overall complexity of the Lotus Notes Form structure and the form-related metadata analyzed by this skill.

  This classification helps estimate migration effort, implementation risk, testing requirements, and the need for specialized analyzer involvement.

  Complexity analysis within this skill is limited to:

  - Form Structure
  - Field Definitions
  - Field Classifications
  - Actions
  - Validation Rules
  - Formula References
  - Subforms
  - Attachments
  - Audit History
  - Response Document Relationships

  Complexity for the following areas is determined by specialized analyzers:

  - Workflow
  - Security
  - LotusScript
  - Business Logic
  - Integrations
  - Rich Text
  - Profile Documents

  Output:

  {
    "complexity": {
      "overall": "Low|Medium|High|VeryHigh",
      "formStructure": "Low|Medium|High|VeryHigh",
      "fields": "Low|Medium|High|VeryHigh",
      "actions": "Low|Medium|High|VeryHigh",
      "subforms": "Low|Medium|High|VeryHigh",
      "attachments": "Low|Medium|High|VeryHigh",
      "auditHistory": "Low|Medium|High|VeryHigh",
      "responseDocuments": "Low|Medium|High|VeryHigh"
    }
  }

---

# COMPATIBILITY ANALYSIS

  This section provides an analysis of the compatibility of the Lotus Notes Form blueprint with downstream form-generation targets.

  Compatibility analysis within this skill is limited to:

  - Form Structure
  - Field Definitions
  - Field Types
  - Validation Metadata
  - Actions
  - Layout Metadata
  - Subforms
  - Attachments
  - Audit History Metadata
  - Response Document Metadata

  Compatibility analysis for the following areas is performed by specialized analyzers:

  - Workflow
  - Security
  - LotusScript
  - Business Logic
  - Integrations
  - Rich Text
  - Profile Documents

  This section identifies blueprint elements that may require:

  - Manual Migration
  - Human Review
  - Additional Analyzer Output
  - Platform-Specific Handling

  Output:

  {
    "compatibility": {
      "unsupportedFeatures": [],
      "partiallySupportedFeatures": [],
      "manualMigrationRequired": [],
      "analyzerDependencies": []
    }
  }

---