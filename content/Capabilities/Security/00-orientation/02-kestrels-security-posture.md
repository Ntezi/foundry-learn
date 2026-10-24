# 02 — Kestrel's security posture

*Sources: no new doc pages; the Kestrel decisions in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) and the *For Kestrel* sections of modules 01–10 · assembled October 23, 2026 · Ready for Review*

Every security rule Kestrel has **today**, from the earlier areas, and every rule this area added, with its status. This is the register Phase 7 worked from: each row marked **A** was adopted into [17-02 §7](../../Ontology/17-case-studies/02-kestrel-reference-model.md#7-security-environments-and-governance) on October 23, 2026 and built out in [11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md), [11-02](../11-kestrel-case/02-kestrel-pays-sensitive-data.md) and [11-03](../11-kestrel-case/03-the-customer-data-lifecycle.md); rows marked **C** were considered and not adopted; rows marked **O** are open items recorded in 17-02 §9. Everything here is **[Example]**.

## What Kestrel has from the earlier areas

| Rule | Decided in |
|---|---|
| One organization; one space `kestrel`, one ontology; a second organization and a shared space with Northwind Freight | [Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout), [12-05](../../Ontology/12-security-and-governance/05-shared-ontologies-and-cross-org.md) |
| Six projects in the Datasource → Transform → Ontology → Workflow chain: `Storefront [Datasource]`, `Kestrel Pay [Datasource]`, `Commerce [Transform]`, `Commerce [Ontology]`, `Payments [Ontology]`, `Delivery Desk [Workflow]` (17-02 §7 lists three; [04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md#for-kestrel) asks for all six) | [Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) |
| Markings `Customer PII` (on `Storefront [Datasource]/raw`) and `Kestrel Pay – Financial` (on the whole Kestrel Pay datasource project; inherited by the payments datasets) | [Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) |
| Object security policy for Kofi's region on `Shipment`; property security policy hiding contact properties on `Customer` | [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md) |
| Project-based Ontology permissions; two-approval policy by `ontology-governance` on protected ontology projects; *automatically protect new files* in `Commerce [Ontology]` | [Ontology 12-02](../../Ontology/12-security-and-governance/02-ontology-resource-permissions.md), [14-01](../../Ontology/14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md), [14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md), [DevTools 06-01](../../DevTools/06-branching-and-cross-app/01-global-branching.md) |
| The agent control ladder; staged writes for the Delivery Desk agent; no *Re-route shipment* tool for it | [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md), [16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md) |
| LLM data access: enrollment allowlist, Kestrel Pay model policy, scoped sessions for Kestrel Pay users; capacity limits | [AIP 08-03](../../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md), [08-04](../../AIP/08-security-governance-and-admin/04-capacity-and-rate-limits.md) |
| Customer portal: backend service, client credentials, service user, restricted application, explicit read scope; support portal through the API gateway | [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md), [DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#for-kestrel), [09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md) |
| Daniel is not an administrator; VS Code workspaces with local preview off; local Palantir MCP conditional on the provider agreement | [DevTools 09-02](../../DevTools/09-kestrel-case/02-daniels-developer-setup.md) |
| `Kestrel Platform` store needs approval for new versions; Delivery Desk v1.1 with locked prod | [DevTools 09-03](../../DevTools/09-kestrel-case/03-delivery-desk-product-release.md) |

## What this area added

Status: **A** adopted (Phase 7); **C** considered, not adopted; **O** open, needs a decision outside the notes.

### Containers and identities (module 01)

| # | Proposal | Status | Note |
|---|---|---|---|
| 1 | *Expand access* on the Kestrel organization held only by the security reviewer group | A | [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#for-kestrel) |
| 2 | Usage accounts: `kestrel` space default; `Payments [Ontology]` overrides to a Kestrel Pay account; the shared space on its own | A | 01-01 |
| 3 | Platform administrators group inherits Owner on every project in `kestrel` | A | 01-01 |
| 4 | `kestrel-standard` project template (viewers/editors/owners groups, Discoverer default, creator Owner) and `kestrel-pay` (adds the project marking and a constraint; datasource project only) | A | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#for-kestrel) |
| 5 | Folder-and-file role grants off everywhere (so link sharing is off) | A | 01-02 |
| 6 | `Merger` custom role in a Kestrel copy of *Project defaults* on the `kestrel` space | A | 01-02 |
| 7 | `Merger` role in the shared Northwind space | C | 01-02 |
| 8 | Two Portfolios, `Commerce` (curator Ama) and `Kestrel Pay` (curator Lena); none for the shared space. Closes the 17-02 §9 gap | A | [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#for-kestrel) |
| 9 | External groups nested in internal template groups; `kestrel-service-users` excluded from the 30-day inactivity rule; `kestrel-pay-auditors` with a maximum membership duration; `region` attribute from the identity provider | A | 01-03 |

### Mandatory controls (module 02)

| # | Proposal | Status | Note |
|---|---|---|---|
| 10 | One visible category `Kestrel data`, restricted to the Kestrel organization; marking permissions split: administrators manage, pipeline leads apply/remove `Customer PII`, Kestrel Pay engineers apply/remove `Kestrel Pay – Financial`, members granted by Ama's and Lena's leads after training | A | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#for-kestrel) |
| 11 | `Customer PII` stops in `Commerce [Transform]` where `customer_contact` (new dataset) splits from `customer_master`; the transform project's main branch protected with security approvals | A | 02-01 |
| 12 | CBAC | C | 02-01 |
| 13 | `policyRegion` dedicated policy column, an invariant transform (non-null, valid region) and a 20% shift statistics check; no NOT conditions | A | [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md#for-kestrel) |
| 14 | Property security marking pills on Kestrel Pay Object Tables; off on the warehouse-floor module | A | [02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md) |
| 15 | Cover pages on every project; the payments projects' pages discoverable with purpose, owner and request path only | A | 02-03 |

### Discretionary controls, diagnosis, downloads (module 03)

| # | Proposal | Status | Note |
|---|---|---|---|
| 16 | A download checkpoint on Delivery Desk exports; the agent's message drafting governed by markings, not the property policy | A | [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md#for-kestrel) |
| 17 | A restricted view for Kofi's region | C | [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md#for-kestrel) |
| 18 | `refunds_rv` restricted view in a `Kestrel Pay [Analysis]` project for Lena's Contour analyses, protected | A | 03-02 |
| 19 | Project constraints: *Allowed markings* `Kestrel Pay – Financial` only on the payments projects; *Prohibited* `Kestrel Pay – Financial` on `Delivery Desk [Workflow]`; a `Fraud [Analysis]` project allowed both markings for Tomás | A | [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md#for-kestrel) |
| 20 | Release checklist: emulation mode with `delivery-desk-viewers` only; *Check access* for one new agent; Kofi's region tested in the test enrollment | A | [03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md#for-kestrel) |
| 21 | Ask Palantir how the enrollment enforces downloads | O | [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md#for-kestrel) |
| 22 | If enforced: `foundry-data-proxy:get-files` removed from default roles, an `Exporter` role for Lena's group and the release group | A (conditional on 21) | 03-05 |

### Securing in practice (module 04)

| # | Proposal | Status | Note |
|---|---|---|---|
| 23 | 17-02 §7 completed to the six projects | A | [04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md#for-kestrel) |
| 24 | The audience-to-group matrix (CS agents, warehouse staff, Daniel, Priya, Lena's team, Tomás, Kestrel Pay engineers); writeback datasets stay in `Commerce [Ontology]` | A | [04-02](../04-securing-data-and-applications/02-securing-an-operational-application.md#for-kestrel) |
| 25 | Transaction types of Kestrel's pipelines recorded (needed for marking removal and Data Lifetime) | O | [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md) |
| 26 | Northwind: mutual organization discoverability, Kestrel users and groups hidden except the shared-project groups, Northwind admins via a synced group, `stop_requiring` under the transform project's branch policy with Lena and a security reviewer, an ingress rule for Northwind | A (ingress O) | [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md#for-kestrel) |

### Third-party applications (module 05)

| # | Proposal | Status | Note |
|---|---|---|---|
| 27 | Both portals managed by Kestrel, not discoverable to Northwind; organization-level consent off; enablement restrictions unrestricted; Third-party application administrator held by platform administrators only | A | [05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md#for-kestrel) |
| 28 | Support portal uses authorization code with PKCE and `offline_access`, stores rotated refresh tokens atomically; a code-scanning rule for personal tokens; API-calling jobs owned by service users | A | [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md#for-kestrel) |
| 29 | The six-item integration review; the support portal's rule that every query uses the current agent's token | A | [05-03](../05-third-party-applications-and-tokens/03-third-party-application-and-api-guidance.md#for-kestrel) |

### Approvals and Checkpoints (module 06)

| # | Proposal | Status | Note |
|---|---|---|---|
| 30 | Approver pools of two or more; `ontology-governance` approves proposals; training certificate attached in request comments; Approvals history as the first source for the quarterly marking review | A | [06-01](../06-approvals-and-checkpoints/01-approvals.md#for-kestrel) |
| 31 | Four checkpoint configurations: payments export (three types, marking matcher, service users exempt), *Issue refund* (ticket reference), marking member addition (acknowledgment), secret rotation (reauthentication); none on *Re-route shipment* or *Hold order*; `checkpoints:review-records` for Lena's team | A | [06-02](../06-approvals-and-checkpoints/02-checkpoints.md#for-kestrel) |

### Cipher, Compass, scanning, deletion (modules 07–09)

| # | Proposal | Status | Note |
|---|---|---|---|
| 32 | Channels `kestrel-pay-cards` (AES_SIV) and `kestrel-customer-hash` (SHA-256); Data Manager and rate-limited Operational User licences; no Admin licence; `Payment.cardNumber` as CipherText | A | [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#for-kestrel), [07-02](../07-cipher/02-cipher-workflows.md#for-kestrel) |
| 33 | A decrypting function; visual obfuscation; shipping the channel in a product | C | 07-02 |
| 34 | Resource Curator for Ama and Lena; Delivery Desk queue and two Object Views promoted; autosave question for the payments projects; monthly permanent deletion of the payments trash | A (autosave O) | [08-01](../08-compass/01-compass-projects-and-navigation.md#for-kestrel) |
| 35 | Tag categories `source`, `refresh`, `owner`; a `Delivery Desk` collection curated by Ama; uploads only in `Storefront [Datasource]/manual` with the import checkpoint | A | [08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md#for-kestrel) |
| 36 | Two SDS scans (boundary PII, continuous; carrier invoices, weekly), run first without actions; conditions and actions as listed; no obfuscation | A | [09-01](../09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md#for-kestrel), [09-02](../09-sensitive-data-scanner-and-data-lifetime/02-match-conditions-match-actions-best-practices-and-media-sets.md#for-kestrel) |
| 37 | Two Data Governance Officers (Lena and a platform administrator), each with Viewer on the space | A | 09-02 |
| 38 | `customer-source-365` fixed-date policy with a cutoff on the root source records, rolled forward quarterly; override `customer-master-indefinite` on `customer_master`; branch coverage `master` only; the 30-day deletion wording | A | [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md#for-kestrel), [09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md#for-kestrel) |
| 39 | Data Lifetime on the ledger | O (legal) | 09-03 |
| 40 | Latest-view-only policies | C | 09-04 |

### Governance and enterprise security (module 10)

| # | Proposal | Status | Note |
|---|---|---|---|
| 41 | The chain of responsibility (data owners, governance lead, officers, legal); a purpose statement per project; the review calendar | A | [10-01](../10-privacy-governance-and-enterprise-security/01-privacy-civil-liberties-and-data-protection.md#for-kestrel) |
| 42 | An audit.3 export dataset in `Audit [Governance]` with an `Audit` marking (a third marking in the `Kestrel data` category); `kestrel-audit-reader` application; four category-based queries; portal usage reconciled with Developer Console metrics | A | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md#for-kestrel) |
| 43 | Service-account register; hardware keys for administrators and marking managers; ingress allow-list mirrored in conditional access; token-spill procedure; managed workstations for uploads; Central Auth not adopted | A | [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#for-kestrel) |
| 44 | Source-of-truth statement; Rescue retention raised to 30 days (needs Palantir); monthly dependency rebuilds; SafeBase subscription; the incident route | A (Rescue O) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#for-kestrel) |
| 45 | Code scanning enrollment-wide in Error mode; two custom rules (token shape; `stop_propagating`/`stop_requiring`) | A | [10-05](../10-privacy-governance-and-enterprise-security/05-code-scanning.md#for-kestrel) |

## Gaps this area leaves

**[Explanation]** Open items (status **O**) that the notes could not settle from the docs: how the enrollment enforces downloads (21); the transaction types of Kestrel's pipelines (25); Northwind's ingress addresses (26); autosave in the payments projects (34); retention on the ledger (39); Rescue's retention (44). Each needs Palantir, legal or Kestrel's own records. They are recorded in [17-02 §9](../../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example) alongside the existing gaps.

---
[Module index](README.md) · Previous: [01 — The security map](01-the-security-map.md) · Next module: [01 — Organizations, projects, users and groups](../01-organizations-projects-users-and-groups/README.md)
