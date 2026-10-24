# 02 — Audit logs

*Sources: [Audit logs](https://www.palantir.com/docs/foundry/security/audit-logs-overview/) · [Audit log categories](https://www.palantir.com/docs/foundry/security/audit-log-categories/) · [Monitor audit logs](https://www.palantir.com/docs/foundry/security/monitor-audit-logs/) · checked October 23, 2026 · Ready for Review*

A **monitoring design note** in four parts: what a log holds, how it reaches you, the category model that makes queries durable, and the detections worth building first. The categories page is a reference table of about a hundred entries; this note reads the whole table and keeps the ones security work touches, with the full list in [99 — Limits and thresholds](../99-reference/limits-and-thresholds.md) deferred to Phase 7.

## What a log answers

**[Docs]** Audit logs are "a distilled record of all actions taken by users in the platform": **who** (user, session or service account), **what** (categorized by type and intent), **when**, **where** (which resources and systems). They can contain PII (names, email addresses) and other sensitive usage data, so they "should be considered sensitive and viewed only by persons with the necessary security qualifications". The recommended consumer is a customer-owned **SIEM**; Foundry can do "some light SIEM-native workflows" itself. The pipeline is "engineered to be append-only" with aggressively restricted archive access; removing something for legal reasons goes through Palantir Support.

## Two schemas, three deliveries

**[Docs]** Two schemas exist. **audit.3** is the one to use for anything new; **audit.2** is legacy, for history only, and new events will soon stop being archived in it.

| | audit.3 | audit.2 |
|---|---|---|
| Latency | **~15 minutes** | ~24 hours to archive |
| SIEM ingestion | Direct, through the `list-log-files` and `get-log-file-content` API endpoints | No public API; export to a Foundry dataset, then onward through Data Connection |
| Categories | Enforced: every log has at least one, each defines its request and result fields | Optional, inconsistent, in `_category`/`_categories` inside `request_params` |
| Backfill | None: audit.3 starts when enabled | Keeps everything before that |

**[Docs]** Three ways to get them: **direct to SIEM** (preferred for organizations with a security operations centre: minimal latency, native integration, no Foundry intermediary and no storage or compute spent in Foundry); **export to a Foundry dataset** per organization from Control Panel's *Audit logs* page (for organizations without a SIEM; analyse in Pipeline Builder or, for the scale, Code Repositories; "too large to effectively analyze in Contour without filtering"); or export then forward.

**[Docs]** SIEM polling uses `list-log-files` with token pagination: `nextPageToken` is **always** present, even with an empty `data` field; store it and resend it, and an open-ended `startDate` with no `endDate` polls forever "without missing logs or receiving duplicates".

**[Docs]** Authentication for the API, in order of preference: a **Developer Console application** with the `api:audit-read` scope using client credentials ([DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md)); plain OAuth2 client credentials; **user tokens, not recommended** (tied to one person, over-broad, hard to rotate, unclear trail). Whichever identity, it also needs the organization workflow **Create datasets with audit logs for the organization**, assigned in Control Panel, "in addition to" the scope; for a service account that's the application's service user. Exporting to a dataset needs `audit-export:orchestrate-v3` (Organization administrator).

**[Docs]** Export setup options: log type, location, **markings** (the dataset defaults to the organization marking; add more so only qualified administrators see "PII and search queries"), an optional start date, and an optional per-dataset **retention policy** of at most **730 days**, counted from the transaction that added the logs, not the event time; deletion may take up to seven days after marking. The two examples: start 2025-01-01 with 90-day retention shrinks sharply at day 90; start 30 days ago with 90-day retention grows into a rolling 90-day window. Each append pulls at most **100 GiB** of log data (and **10k files**) for audit.3 datasets, **10 GiB** for audit.2; schedules are hidden; audit.3 datasets Hive-partition on `date`, so filter by `date` first. Exports can be paused and resumed.

**[Docs]** **Attribution:** logs are one archive per environment; `uid` and `otherUids` are mapped to organizations, and an organization's export holds only its own. Service users' actions "will not typically be attributed to any organization", **except** the service user of a client-credentials application registered and used by one organization, which is attributed to it.

**[Explanation]** The attribution rule decides whether Kestrel's portal shows up in Kestrel's export: it does, because its application is Kestrel's. A Palantir-side service user doing backend work does not, which is also why the docs say to filter on non-empty `origins` to see user-initiated requests.

## The audit.3 record

**[Docs]** The fields that security queries use most: `categories` (a set), `entities` (every resource in the request and result), `name` (`PRODUCT_ENDPOINT` in snake-cased capitals, e.g. `DATA_PROXY_SERVICE_GENERATED_GET_DATASET_AS_CSV2`), `product` (immutable; the recommended filter), `service`, `uid` (the most downstream caller), `orgId`, `users` (all users in the log; today only `uid` is populated, the name, group and realm fields are empty "incompatible with the low-latency design", so enrich downstream), `origin` and `origins` (spoofable; empty origins mean a backend request made while fulfilling a user's), `result` (`ERROR`, `UNAUTHORIZED`…), `requestFields` and `resultFields` (shaped by the categories), `time`, `tokenId`, `sid`, `traceId`, `eventId` (groups lines of one event), `logEntryId` (unique; duplicates during ingestion share it and can be dropped), `producerType` (`SERVER` or `CLIENT`).

**[Docs]** An `apiGatewayRequest` category means an API gateway fulfilled the request; the gateway's own downstream calls share the `traceId` and have a `userAgent` starting with the gateway service's name.

## Categories: the model that outlives event names

**[Docs]** "Rather than needing to track hundreds of service-specific event names, categories let security analysts focus on high-level actions like data loading, permission changes, or authentication attempts, regardless of which product or feature generated the log." The docs' own before-and-after:

```python
# audit.2: fragile, depends on event names
export_events = audit_logs.filter(col("name").isin(["EXPORT_DATASET", "DOWNLOAD_FILE", "CREATE_EXTERNAL_CONNECTION"]))
# audit.3: robust
export_events = audit_logs.filter(col("categories").contains("dataExport"))
```

**[Docs]** The categories page lists about a hundred. The ones this area's controls produce, with the page's descriptions condensed:

| Family | Categories | What they record |
|---|---|---|
| **Data movement** | `dataLoad`, `dataExport`, `dataImport`, `dataPromote`, `dataCreate`, `dataDelete`, `dataTransform`, `dataMerge`, `dataSearch` | Reads returned to a user; exports out of the platform (CSV, external systems; `dataPromote` is to another Palantir system); imports from outside; a Contour JOIN or Gotham resolution is `dataMerge` |
| **Sharing** | `dataShare`, `dataShareCreate`, `dataShareDisable` | A discretionary share; creating or disabling a share link "that grants access to resources on visit" |
| **Ontology** | `ontologyDataLoad`, `ontologyDataSearch`, `ontologyDataTransform`, `ontologyLogic*`, `ontologyMetaData*` | Object reads and searches; function and type changes |
| **Permissions and identities** | `managementPermissions` (anything that changes permissions, with the precise change in the changes field), `managementGroups` (membership), `managementUsers`, `managementMarkings` (anything that modifies access to mandatory controls), `managementTokens`, `tokenGeneration`, `tokenAccess`, `tokenRevoke` | The audit.2 names `mandatoryControlManagement` and `mandatoryControlApplication` are replaced by `managementMarkings` and `managementPermissions` |
| **Authentication** | `userLogin`, `userLogout`, `authenticationCheck`, `authorizationCheck`, `oauth2InitiateAuthFlow` | Logins; token validation; permission checks; the start of an authorization-code flow |
| **Requests and justification** | `requestCreate`, `requestAccess`, `requestApprove`, `requestDisapprove`, `requestExecute`, `requestCancel`, `userJustify` | Approvals and pull requests; `userJustify` is a submitted **checkpoint** |
| **Context** | `inApplicationContext` (from a third-party application), `onBehalfOf` (usually a service user acting for others), `inEnrollmentContext`, `apiGatewayRequest`, `internal` ("low signal") | |
| **Secrets and LLMs** | `secretCreate`, `secretLoad`, `secretUse`; `llmInference`, `llmRoute` | Secret handling; a prompt through a model, and its routing by a proxy |
| **Infrastructure** | `configureInfra`, `createInfra`, `restartInfra`, `upgradeInfra`, `container*`, `codeExecution`, `monitor*`, `auditDataRedact`, `auditDataShareCreate` | Including the redaction of audit data after a spill |

**[Docs]** `dataUpdate` is a catch-all the docs steer away from in favour of `dataTransform` or `dataMerge`.

## Detections worth building first

**[Docs]** The monitoring page's use cases: compromised accounts (unusual logins, impossible travel), **exfiltration** ("Large-scale data loads followed by exports, especially outside normal working hours"), privilege escalation (unexpected permission changes), malicious code execution. Its investigation recipe: filter `dataLoad` for the user and time, read `resultFields` for what was loaded, filter `dataExport` to see whether anything left, read `users` and `entities` for the timeline, then **ask the user**. Its compliance recipe: `dataExport` on patient datasets, cross-referenced against training records, then continuous alerting and periodic reports.

**[Docs]** Query shapes, in the page's pseudo-code: `categories contains "dataExport"`; `categories contains "authenticationCheck" AND result = "FAILURE" GROUP BY uid HAVING COUNT(*) > 5`; `categories contains "managementPermissions" AND resource_id IN (sensitive_resource_list)`. Always filter on `time` first; categories before detailed fields; pre-index common fields.

**[Docs]** Best practices: **baseline first** (login times and places, access patterns, export behaviour, permission-change workflows: "Anomalies are only meaningful in context"); **defence in depth** (real-time alerts for critical events, periodic trend analysis, incident procedures, regular audits of coverage); and coordination with Palantir's **CIRT**, which monitors hosted platforms and will contact you about suspicious activity, while "Only you can ensure that usage of your platform is appropriate".

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), as the accountability half of [01](01-privacy-civil-liberties-and-data-protection.md#for-kestrel)'s review calendar. Kestrel has no SIEM recorded, so the Foundry export is the starting point, with the SIEM path noted for when Information Security provides one:

- **An audit.3 export dataset** per month-window: start date 30 days before creation, retention **365 days**, in a new `Audit [Governance]` project marked with the Kestrel organization and a new marking `Audit`, whose members are the two Data Governance Officers and the platform administrators only.
- **A Developer Console application `kestrel-audit-reader`** (backend service, client credentials, `api:audit-read`, restricted to nothing else), whose service user holds *Create datasets with audit logs for the organization*, ready for SIEM polling later; the build record ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)) requires its `nextPageToken` to be stored durably.
- **Four queries in a Code Repository**, built on categories not names: (1) `dataExport` where `entities` touches the payments projects, joined to the `userJustify` records for the same `traceId` so an export without a justification stands out; (2) `managementMarkings` and `managementPermissions` on `Customer PII`, `Kestrel Pay – Financial` and the three projects' owner groups, reviewed weekly by Lena; (3) `authenticationCheck` failures grouped by `uid`, the docs' threshold of 5; (4) `dataShareCreate` anywhere, which should be empty because link sharing is off ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#role-grants-on-folders-and-files)), so any row is a finding.
- **Portal attribution:** the portal's service user is Kestrel's, so its `onBehalfOf` and `inApplicationContext` rows appear in the export; a weekly count by `name` is the portal's usage report, which [DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md) got from Developer Console metrics; the two are reconciled once a quarter.

---
[Module index](README.md) · Previous: [01 — Privacy, civil liberties and data protection](01-privacy-civil-liberties-and-data-protection.md) · Next: [03 — Protecting identity, tokens, phishing and files](03-protecting-identity-tokens-phishing-and-files.md)
