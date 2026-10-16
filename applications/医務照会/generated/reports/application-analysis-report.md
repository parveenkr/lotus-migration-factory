# Application analysis
ApplicationId: `49257BE3002293FD`. Identity: caller stable ID, corroborated by `/ReplicaId`.
Status: REVIEW_REQUIRED. Structural inventory checks PASSED.

Source: `input\ExtractedJson\synopsis.json`, SHA-256 `2d4dc0b21ba7798f505e09ab47b9e5092a3f4c73b169050e427662dadb5de333`, 686305 bytes. Parsed as JSON object.
Title retained from `/DatabaseTitle`; `/ExportedAt` is empty. Server/path/template/inheritance not supplied.

## Discovery
{"Forms": 4, "Subforms": 4, "Views": 12, "Agents": 5, "ScriptLibraries": 4, "Fields": 118}
All inventory identifiers are unique, deterministic source-owner/name identifiers (not array-index identities).
Forms/subforms retain field/action counts; views retain folder/default and hidden-name metadata; agents retain triggers.
Navigation resources retain exact source pointers. Root Fields are occurrences, not assumed shared-field designs.
ExternalDependencies: three unresolved source references, not measured calls or confirmed active endpoints.

## Limitations and handoffs
No documents, binary attachments, runtime identity/membership or effective permissions supplied.
Zero `/TotalDocuments` and `/TotalAttachments` do not prove the original application lacked content or behavior.
Downstream stages must inspect original source; inventory is not behavioral interpretation.
Validated: JSON parse, identity, unique inventory identifiers, all inventory source pointers.
