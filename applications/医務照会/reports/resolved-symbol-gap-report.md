# Resolved Symbol Gap Report

## Scope And Method

Source: [application.script-blueprint.json](../generated/blueprints/scripts/application.script-blueprint.json), blueprint version `1.1`, analysis status `REVIEW_REQUIRED`.

Filter: findings whose `code` is `UNRESOLVED_REFERENCE`. Group symbol names case-insensitively, preserving their reported spelling. Resolve finding `artifactIds` to script owners. Match candidate definitions against normalized `routines` in scripts whose `kind` is `LIBRARY`, using exact case-insensitive symbol names.

An occurrence is one finding record, not a unique source call site. Counts are not deduplicated across repeated exports or script records. Candidate presence does not establish caller visibility, signature compatibility, or successful resolution; findings and the source blueprint remain unchanged.

## Summary

- Unresolved-reference findings: **245**.
- Distinct symbols: **14**.
- Symbols with exactly one candidate library definition: **14**.
- Symbols without a candidate library definition: **0**.
- Owning forms: **3**. Owning views: **0**. Owning agents: **0**.
- Candidate libraries: `libCommon`, `libImuForm`, `libErrorCheck`, `clsAddressInfo`.

## Findings By Symbol

The owner column lists forms. No view or agent owners were found for these groups.

| Symbol | Occurrence Count | Owning Forms | Candidate Library | Candidate Definition |
| --- | ---: | --- | --- | --- |
| `funcReturnMsg` | 102 | 休日設定メンテナンス; 医務照会; 選択肢メンテナンス | `libCommon` | `Function funcReturnMsg( strMsgCode As String ) As String` |
| `funcOnErrorMsg` | 29 | 休日設定メンテナンス; 医務照会; 選択肢メンテナンス | `libCommon` | `Function funcOnErrorMsg(strRoutine As String, intErrNo As Integer, intErrLine As Integer, strErrStatus As String) As String` |
| `funcUpdateRireki` | 20 | 医務照会 | `libImuForm` | `Function funcUpdateRireki(doc As NotesDocument, strStatusCode As String) As Boolean` |
| `funcWfStatGet` | 20 | 医務照会 | `libImuForm` | `Function funcWfStatGet(strStatusCode As String, intExecFlag As Integer) As Variant` |
| `funcSaveConflictCheck` | 19 | 医務照会 | `libErrorCheck` | `Function funcSaveConflictCheck(doc As NotesDocument) As Boolean` |
| `funcChangeDocMode` | 18 | 医務照会 | `libErrorCheck` | `Function funcChangeDocMode(uidoc As NotesUIDocument, blnShowMsg As Boolean) As Boolean` |
| `clsAddressInfo` | 14 | 休日設定メンテナンス; 医務照会; 選択肢メンテナンス | `clsAddressInfo` | `Public Class clsAddressInfo` |
| `funcChkDocSize` | 7 | 医務照会 | `libErrorCheck` | `Function funcChkDocSize(docTarget As NotesDocument, intLimitSize As Integer) As Boolean` |
| `funcBirthField` | 5 | 医務照会 | `libImuForm` | `Function funcBirthField ( uidoc As NotesUIDocument ) As Boolean` |
| `funcErrChkDan` | 4 | 医務照会 | `libErrorCheck` | `Function funcErrChkDan(uidoc As NotesUIDocument) As Boolean` |
| `funcAgeReturn` | 2 | 医務照会 | `libImuForm` | `Function funcAgeReturn( strBirthDay As String, strDefDate As String ) As Integer` |
| `funcChkEditDoc` | 2 | 医務照会 | `libImuForm` | `Function funcChkEditDoc ( strStatusCode As String, blnRet As Boolean ) As Boolean` |
| `funcErrChkImu` | 2 | 医務照会 | `libErrorCheck` | `Function funcErrChkImu(uidoc As NotesUIDocument) As Boolean` |
| `funcChkDate` | 1 | 休日設定メンテナンス | `libErrorCheck` | `Function funcChkDate( strDate As String , blnRet As Boolean ) As Boolean` |
| **Total** | **245** | **3 distinct forms** | **4 distinct libraries** | **14 candidate definitions** |

## Definition Traceability

All IDs below refer to records in the source blueprint. Each candidate's `evidenceIds` links to its retained library source evidence. These are candidate declarations recorded by the blueprint, not newly verified implementations.

| Symbol | Candidate Routine ID | Library Evidence ID |
| --- | --- | --- |
| `funcReturnMsg` | `routine-a62414eba7f17b7c` | `evidence-2f5f31840400316d` |
| `funcOnErrorMsg` | `routine-6a3d9c510cb5b23a` | `evidence-2f5f31840400316d` |
| `funcUpdateRireki` | `routine-bf175e89b14858bf` | `evidence-38500fa2ca0e30d4` |
| `funcWfStatGet` | `routine-caada7eb952b933b` | `evidence-38500fa2ca0e30d4` |
| `funcSaveConflictCheck` | `routine-82a006b873f8c26a` | `evidence-c22ccb4c50d40ce0` |
| `funcChangeDocMode` | `routine-2fab710c48308d72` | `evidence-c22ccb4c50d40ce0` |
| `clsAddressInfo` | `routine-f8b247b4162cb3e0` | `evidence-1af6c5a5d0bb461e` |
| `funcChkDocSize` | `routine-a893adb30ab7512a` | `evidence-c22ccb4c50d40ce0` |
| `funcBirthField` | `routine-24a8450496b409aa` | `evidence-38500fa2ca0e30d4` |
| `funcErrChkDan` | `routine-8f3712daec7a55e7` | `evidence-c22ccb4c50d40ce0` |
| `funcAgeReturn` | `routine-4c4af3bb8ddd62c1` | `evidence-38500fa2ca0e30d4` |
| `funcChkEditDoc` | `routine-dbf6e5f893e25e77` | `evidence-38500fa2ca0e30d4` |
| `funcErrChkImu` | `routine-f280fc5aa3e72ac1` | `evidence-c22ccb4c50d40ce0` |
| `funcChkDate` | `routine-aeebe651fd99baaa` | `evidence-c22ccb4c50d40ce0` |

## Interpretation

Every grouped symbol has a candidate definition already represented in an exported library. This finding set therefore does not, by itself, demonstrate missing library definitions. The remaining checks are caller-specific visibility/import metadata, transitive visibility, access scope, and invocation compatibility before any unresolved finding can be cleared. `clsAddressInfo` is a class candidate, not a function candidate.

No analyzer contracts, source metadata, findings, or resolution statuses were modified to produce this report.