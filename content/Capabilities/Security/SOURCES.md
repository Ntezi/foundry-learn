# Sources, corrections and open questions

The register for every source used in the Security notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about product behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's own wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated** and collected in [99 — Limits and thresholds](99-reference/limits-and-thresholds.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.
- **How pages are read (this area):** each page is fetched into Claude's workspace and its full text is read there and kept in a page store (`PG.json`) for the quote and number checks; the quality review re-fetches every page. Nothing is summarised by a fetch tool.

## Register

<!-- register:start -->
### Sidebar inventory (October 23, 2026)

The *Security & governance* sidebar was read from the fetched HTML of the overview page on October 23, 2026: **105 links**, 104 documentation pages and the release-notes filter. `_tools/sec/raw.tsv` holds the list (SHA-256 `864d14079b02d41d4990191f0565727ecc95614d4858df23ac053e4e4704aef7`). All 104 pages were fetched the same day and answered 200.

| Section | Pages |
|---|---|
| Security & governance (top) | 3 |
| Platform security | 40 |
| Privacy and civil liberties | 3 |
| Approvals | 2 |
| Checkpoints | 6 |
| Cipher | 9 |
| Compass | 10 |
| Sensitive Data Scanner | 7 |
| Data Lifetime | 9 |
| Enterprise security | 12 |
| Code quality | 3 |
| **Total** | **104** |

### Pages and notes

| Page | Section | Note | Read |
|---|---|---|---|
| [Overview](https://www.palantir.com/docs/foundry/security/overview/) | Security & governance | 00-01 The security map | read in full |
| [Shared security responsibility model](https://www.palantir.com/docs/foundry/security/shared-security-responsibility-model/) | Security & governance | 00-01 The security map | read in full |
| [Security glossary](https://www.palantir.com/docs/foundry/security/security-glossary/) | Security & governance | 00-01 The security map | read in full |
| [Securing a data foundation](https://www.palantir.com/docs/foundry/security/securing-a-data-foundation/) | Platform security › Getting started | 04-01 Securing a data foundation | read in full |
| [Securing a business application](https://www.palantir.com/docs/foundry/security/securing-a-business-application/) | Platform security › Getting started | 04-02 Securing an operational application | read in full |
| [Protecting sensitive data](https://www.palantir.com/docs/foundry/security/protecting-sensitive-data/) | Platform security › Getting started | 04-03 Protecting sensitive data and requesting justification | read in full |
| [Cross-Organization collaboration](https://www.palantir.com/docs/foundry/security/cross-organization-collaboration/) | Platform security › Getting started | 04-04 Cross-organization collaboration | read in full |
| [Checking permissions](https://www.palantir.com/docs/foundry/security/checking-permissions/) | Platform security › Getting started | 03-04 Diagnosing access | read in full |
| [Requesting justification for sensitive actions](https://www.palantir.com/docs/foundry/security/requesting-justification-for-sensitive-actions/) | Platform security › Getting started | 04-03 Protecting sensitive data and requesting justification | read in full |
| [Organizations and spaces](https://www.palantir.com/docs/foundry/security/orgs-and-spaces/) | Platform security › Concepts | 01-01 Organizations, spaces and enrollments | read in full |
| [Projects and roles](https://www.palantir.com/docs/foundry/security/projects-and-roles/) | Platform security › Concepts | 01-02 Projects, roles and project templates | read in full |
| [Portfolios](https://www.palantir.com/docs/foundry/security/portfolios/) | Platform security › Concepts | 01-03 Users, groups and Portfolios | read in full |
| [Users and groups](https://www.palantir.com/docs/foundry/security/users-and-groups/) | Platform security › Concepts | 01-03 Users, groups and Portfolios | read in full |
| [Cover pages](https://www.palantir.com/docs/foundry/security/cover-pages/) | Platform security › Concepts | 02-03 Property security markings and cover pages | read in full |
| [Project constraints](https://www.palantir.com/docs/foundry/security/project-constraints/) | Platform security › Concepts | 03-03 Project constraints | read in full |
| [Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/) | Platform security › Concepts | 03-02 Restricted views | read in full |
| [Branching restricted views](https://www.palantir.com/docs/foundry/security/branching-restricted-views/) | Platform security › Concepts | 03-02 Restricted views | read in full |
| [Markings](https://www.palantir.com/docs/foundry/security/markings/) | Platform security › Concepts | 02-01 Markings and classification-based access controls | read in full |
| [Classification-based Access Controls](https://www.palantir.com/docs/foundry/security/classification-based-access-controls/) | Platform security › Concepts | 02-01 Markings and classification-based access controls | read in full |
| [Emulation mode](https://www.palantir.com/docs/foundry/security/emulation-mode/) | Platform security › Concepts | 03-04 Diagnosing access | read in full |
| [Property security markings](https://www.palantir.com/docs/foundry/security/property-security-markings/) | Platform security › Concepts | 02-03 Property security markings and cover pages | read in full |
| [Access control propagation](https://www.palantir.com/docs/foundry/security/access-control-propagation/) | Platform security › Concepts | 03-01 Access control propagation | read in full |
| [Manage organizations and spaces](https://www.palantir.com/docs/foundry/platform-security-management/manage-orgs-and-spaces/) | Platform security › Management | 01-01 Organizations, spaces and enrollments | read in full |
| [Manage roles](https://www.palantir.com/docs/foundry/platform-security-management/manage-roles/) | Platform security › Management | 01-02 Projects, roles and project templates | read in full |
| [Manage users](https://www.palantir.com/docs/foundry/platform-security-management/manage-users/) | Platform security › Management | 01-03 Users, groups and Portfolios | read in full |
| [Manage groups](https://www.palantir.com/docs/foundry/platform-security-management/manage-groups/) | Platform security › Management | 01-03 Users, groups and Portfolios | read in full |
| [Manage markings](https://www.palantir.com/docs/foundry/platform-security-management/manage-markings/) | Platform security › Management | 02-01 Markings and classification-based access controls | read in full |
| [Manage Project constraints](https://www.palantir.com/docs/foundry/platform-security-management/manage-project-constraints/) | Platform security › Management | 03-03 Project constraints | read in full |
| [Manage Project templates](https://www.palantir.com/docs/foundry/platform-security-management/manage-project-templates/) | Platform security › Management | 01-02 Projects, roles and project templates | read in full |
| [Manage granular policies](https://www.palantir.com/docs/foundry/platform-security-management/manage-granular-policies/) | Platform security › Management | 02-02 Granular policies | read in full |
| [Manage restricted views](https://www.palantir.com/docs/foundry/platform-security-management/manage-restricted-views/) | Platform security › Management | 03-02 Restricted views | read in full |
| [Migrate from and disable "Propagate view requirements" setting [Planned deprecation]](https://www.palantir.com/docs/foundry/platform-security-management/disabling-propagate-view-requirements/) | Platform security › Management | 03-05 Download controls and the two deprecated settings | read in full |
| [Migrate from and disable "Ignore inherited permissions" setting [Planned deprecation]](https://www.palantir.com/docs/foundry/platform-security-management/disabling-ignore-inherited-permissions/) | Platform security › Management | 03-05 Download controls and the two deprecated settings | read in full |
| [Overview](https://www.palantir.com/docs/foundry/platform-security-third-party/third-party-apps-overview/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Managing third-party applications](https://www.palantir.com/docs/foundry/platform-security-third-party/manage-3pa/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Registering third-party applications](https://www.palantir.com/docs/foundry/platform-security-third-party/register-3pa/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Enabling third-party application access](https://www.palantir.com/docs/foundry/platform-security-third-party/enabling-3pa-access/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Authorizing third-party application access](https://www.palantir.com/docs/foundry/platform-security-third-party/authorizing-3pa-access/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Danger zone actions](https://www.palantir.com/docs/foundry/platform-security-third-party/danger-zone-actions/) | Platform security › Third-party applications | 05-01 Third-party applications in Control Panel | read in full |
| [Writing OAuth2 clients for Foundry](https://www.palantir.com/docs/foundry/platform-security-third-party/writing-oauth2-clients/) | Platform security › Third-party applications | 05-02 OAuth2 clients and user-generated tokens | read in full |
| [User-generated tokens](https://www.palantir.com/docs/foundry/platform-security-third-party/user-generated-tokens/) | Platform security › Third-party applications | 05-02 OAuth2 clients and user-generated tokens | read in full |
| [Foundry third-party application & API guidance](https://www.palantir.com/docs/foundry/platform-security-third-party/3pa-api-guidance/) | Platform security › Third-party applications | 05-03 Third-party application and API guidance | read in full |
| [Download controls](https://www.palantir.com/docs/foundry/security/download-controls/) | Platform security | 03-05 Download controls and the two deprecated settings | read in full |
| [Overview](https://www.palantir.com/docs/foundry/privacy-civil-liberties/overview/) | Privacy and civil liberties › Principles and practices | 10-01 Privacy, civil liberties and data protection | read in full |
| [Privacy and civil liberties in practice](https://www.palantir.com/docs/foundry/privacy-civil-liberties/pcl-in-practice/) | Privacy and civil liberties › Principles and practices | 10-01 Privacy, civil liberties and data protection | read in full |
| [Data protection and governance](https://www.palantir.com/docs/foundry/security/data-protection-and-governance/) | Privacy and civil liberties | 10-01 Privacy, civil liberties and data protection | read in full |
| [Overview](https://www.palantir.com/docs/foundry/approvals/overview/) | Approvals | 06-01 Approvals | read in full |
| [Review a request](https://www.palantir.com/docs/foundry/approvals/review-a-request/) | Approvals | 06-01 Approvals | read in full |
| [Overview](https://www.palantir.com/docs/foundry/checkpoints/overview/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/checkpoints/core-concepts/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Checkpoint types](https://www.palantir.com/docs/foundry/checkpoints/checkpoint-types/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Configure checkpoints](https://www.palantir.com/docs/foundry/checkpoints/configure-checkpoints/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Review checkpoint records](https://www.palantir.com/docs/foundry/checkpoints/review-checkpoint-records/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Add checkpoint configurations to a Marketplace product](https://www.palantir.com/docs/foundry/checkpoints/checkpoints-marketplace/) | Checkpoints | 06-02 Checkpoints | read in full |
| [Overview](https://www.palantir.com/docs/foundry/cipher/overview/) | Cipher | 07-01 Cipher concepts and getting started | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/cipher/core-concepts/) | Cipher | 07-01 Cipher concepts and getting started | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/cipher/getting-started/) | Cipher | 07-01 Cipher concepts and getting started | read in full |
| [Apply operations on columns of datasets](https://www.palantir.com/docs/foundry/cipher/apply-operations/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Decrypt individual values across applications](https://www.palantir.com/docs/foundry/cipher/decrypt-individual-values/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Use CipherText properties in Functions and Actions](https://www.palantir.com/docs/foundry/cipher/ciphertext-in-functions-and-actions/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Example use case](https://www.palantir.com/docs/foundry/cipher/example-use-case/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Add Cipher to a Marketplace product](https://www.palantir.com/docs/foundry/cipher/cipher-marketplace/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Use Cipher for visual obfuscation](https://www.palantir.com/docs/foundry/cipher/visual-obfuscation/) | Cipher › Workflows | 07-02 Cipher workflows | read in full |
| [Overview](https://www.palantir.com/docs/foundry/compass/overview/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Quicksearch](https://www.palantir.com/docs/foundry/compass/quicksearch/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Create a Project](https://www.palantir.com/docs/foundry/compass/create-a-project/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Tags](https://www.palantir.com/docs/foundry/compass/tags/) | Compass | 08-02 Moving, sharing, tagging, uploading and the Data Catalog | read in full |
| [Resource status](https://www.palantir.com/docs/foundry/compass/resource-status/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Manually upload data](https://www.palantir.com/docs/foundry/compass/manually-upload-data/) | Compass | 08-02 Moving, sharing, tagging, uploading and the Data Catalog | read in full |
| [Move and share resources](https://www.palantir.com/docs/foundry/compass/move-and-share-resources/) | Compass | 08-02 Moving, sharing, tagging, uploading and the Data Catalog | read in full |
| [Use Project navigation panel](https://www.palantir.com/docs/foundry/compass/use-project-navigation-panel/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Use Project details panel](https://www.palantir.com/docs/foundry/compass/use-project-details-panel/) | Compass | 08-01 Compass, projects and navigation | read in full |
| [Data Catalog](https://www.palantir.com/docs/foundry/compass/data-catalog/) | Compass | 08-02 Moving, sharing, tagging, uploading and the Data Catalog | read in full |
| [Overview](https://www.palantir.com/docs/foundry/sensitive-data-scanner/overview/) | Sensitive Data Scanner | 09-01 Sensitive Data Scanner concepts and scans | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/sensitive-data-scanner/core-concepts/) | Sensitive Data Scanner | 09-01 Sensitive Data Scanner concepts and scans | read in full |
| [Create a sensitive data scan](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-a-sensitive-data-scan/) | Sensitive Data Scanner | 09-01 Sensitive Data Scanner concepts and scans | read in full |
| [Create match conditions](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-match-conditions/) | Sensitive Data Scanner | 09-02 Match conditions, match actions, best practices and media sets | read in full |
| [Create match actions](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-match-actions/) | Sensitive Data Scanner | 09-02 Match conditions, match actions, best practices and media sets | read in full |
| [Best practices](https://www.palantir.com/docs/foundry/sensitive-data-scanner/best-practices/) | Sensitive Data Scanner | 09-02 Match conditions, match actions, best practices and media sets | read in full |
| [Media set scanning](https://www.palantir.com/docs/foundry/sensitive-data-scanner/media-set-scanning/) | Sensitive Data Scanner | 09-02 Match conditions, match actions, best practices and media sets | read in full |
| [Overview](https://www.palantir.com/docs/foundry/data-lifetime/overview/) | Data Lifetime | 09-03 Data Lifetime concepts and deletion policies | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/data-lifetime/core-concepts-data-lifetime/) | Data Lifetime | 09-03 Data Lifetime concepts and deletion policies | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/data-lifetime/getting-started/) | Data Lifetime | 09-03 Data Lifetime concepts and deletion policies | read in full |
| [Implications of deletion policies](https://www.palantir.com/docs/foundry/data-lifetime/deletion-policies-implications/) | Data Lifetime › Workflows | 09-04 Data Lifetime in operation | read in full |
| [Create a deletion policy](https://www.palantir.com/docs/foundry/data-lifetime/creating-a-deletion-policy/) | Data Lifetime › Workflows | 09-03 Data Lifetime concepts and deletion policies | read in full |
| [Remove a deletion policy](https://www.palantir.com/docs/foundry/data-lifetime/removing-a-policy/) | Data Lifetime › Workflows | 09-04 Data Lifetime in operation | read in full |
| [View policy activity history](https://www.palantir.com/docs/foundry/data-lifetime/view-changes-applied-policy/) | Data Lifetime › Workflows | 09-04 Data Lifetime in operation | read in full |
| [Create a policy override](https://www.palantir.com/docs/foundry/data-lifetime/policy-overrides/) | Data Lifetime › Workflows | 09-04 Data Lifetime in operation | read in full |
| [FAQ](https://www.palantir.com/docs/foundry/data-lifetime/FAQ/) | Data Lifetime › Workflows | 09-04 Data Lifetime in operation | read in full |
| [Audit logs](https://www.palantir.com/docs/foundry/security/audit-logs-overview/) | Enterprise security › Security auditing | 10-02 Audit logs | read in full |
| [Audit log categories](https://www.palantir.com/docs/foundry/security/audit-log-categories/) | Enterprise security › Security auditing | 10-02 Audit logs | read in full |
| [Monitor audit logs](https://www.palantir.com/docs/foundry/security/monitor-audit-logs/) | Enterprise security › Security auditing | 10-02 Audit logs | read in full |
| [Protecting identity](https://www.palantir.com/docs/foundry/security/single-sign-on-security/) | Enterprise security | 10-03 Protecting identity, tokens, phishing and files | read in full |
| [Protecting your self-hosted Foundry installation](https://www.palantir.com/docs/foundry/security/protect-foundry-installation/) | Enterprise security › Infrastructure security | 10-04 Infrastructure security and disaster recovery | read in full |
| [Protecting your on-premise Foundry Data Connector](https://www.palantir.com/docs/foundry/security/protect-data-connector-installation/) | Enterprise security › Infrastructure security | 10-04 Infrastructure security and disaster recovery | read in full |
| [Protecting tokens and API keys](https://www.palantir.com/docs/foundry/security/protect-tokens-api-keys/) | Enterprise security › Infrastructure security | 10-03 Protecting identity, tokens, phishing and files | read in full |
| [Protecting against phishing](https://www.palantir.com/docs/foundry/security/protect-phishing/) | Enterprise security › Infrastructure security | 10-03 Protecting identity, tokens, phishing and files | read in full |
| [Protecting against malicious files](https://www.palantir.com/docs/foundry/security/protect-malicious-files/) | Enterprise security › Infrastructure security | 10-03 Protecting identity, tokens, phishing and files | read in full |
| [Monitoring for vulnerabilities](https://www.palantir.com/docs/foundry/security/monitor-for-vulnerabilities/) | Enterprise security › Infrastructure security | 10-04 Infrastructure security and disaster recovery | read in full |
| [Reporting security concerns](https://www.palantir.com/docs/foundry/security/report-security-concerns/) | Enterprise security › Infrastructure security | 10-04 Infrastructure security and disaster recovery | read in full |
| [Disaster recovery](https://www.palantir.com/docs/foundry/security/disaster-recovery/) | Enterprise security › Infrastructure security | 10-04 Infrastructure security and disaster recovery | read in full |
| [Code scanning overview](https://www.palantir.com/docs/foundry/security/code-scanning-overview/) | Code quality › Code scanning | 10-05 Code scanning | read in full |
| [Enable code scanning](https://www.palantir.com/docs/foundry/security/enable-code-scanning/) | Code quality › Code scanning | 10-05 Code scanning | read in full |
| [Manage code scanning rules](https://www.palantir.com/docs/foundry/security/manage-code-scanning-rules/) | Code quality › Code scanning | 10-05 Code scanning | read in full |
<!-- register:end -->

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 23, 2026 | Phase 8 (quality review) | All 104 pages re-fetched and found unchanged. 311 quotes (notes, glossary, open questions) matched by two independent scripts: 0 missing. Every bold `[Docs]` number and all 27 limits rows found on their pages; 6 values reworded to the pages' phrasing (fewer than 50 members in 06-01 and 12-01; 100 GiB of log data and 10k files per append, 10 GiB for audit.2 in 10-02; the scanner schedule wording in 99). Cross-area: the `kestrel-pay` template no longer marks `Payments [Ontology]` at project level, which Ontology 02-04 deliberately leaves unmarked, and its constraint is *allowed markings* as in 03-03 (01-02, 04-01, 00-02, 11-01, 11-02, 17-02 §7). Links 743 files, 0 problems; 15 diagrams parse; navigation and format checked by script. Results and known limitations in [QUALITY-REVIEW](QUALITY-REVIEW.md) |
| Oct 23, 2026 | Phase 7 | No new pages. 7 notes: the three Kestrel case build records (11-01 to 11-03), 52 review questions (12-01), the limits list, the decision guide and the roles matrix (99). The 45-row register in 00-02 settled: 37 adopted into Ontology 17-02 §7, 5 considered and not adopted, 3 open plus 3 partly open items recorded in 17-02 §9; every *proposed* marker in modules 01–10 changed to *adopted* with a link to module 11. Limits list checked row by row against the page store: 4 rows reworded to the pages' phrasing (fewer than 50 members; the SDS schedule wording; 100 GiB and 10k files per append; 10 GiB for audit.2). Self-review fixes: 12-01 Q16's reason for the NOT rule corrected to scoped tokens, Q24's three documented remedies, Q43's unverified claim about role grants removed; three per-person role grants in 11-01 that no earlier note recorded are marked *new here*; 11-02 restored after a tooling mistake overwrote it (content verified by size and diagram check); the corrections-log rows for Phases 4–6, which had been recorded only in PROGRESS, added below. 295 quotes, 0 problems; 15 diagrams parse |
| Oct 23, 2026 | Phase 6 | Read 18 pages in full (the audit-categories table whole). 7 notes (modules 10 and 00). 73 quotes and every doc number matched; the whole area re-checked: 295 quotes, 0 problems. RQ-09 opened. Self-review: 3 fixes applied, among them the `Audit` marking reconciled to a third marking in `Kestrel data` and Kestrel's identity provider stated as an assumption |
| Oct 23, 2026 | Phase 5 | Read 35 pages in full (modules 07–09). 8 notes. 61 quotes and every doc number matched. RQ-07 and RQ-08 opened. Self-review: 3 fixes applied, among them unrecorded Kestrel details (an invoice-review module, the ledger pipeline's tool, an export schedule) removed or softened |
| Oct 23, 2026 | Phase 4 | Read 22 pages in full (modules 04–06). 9 notes. 80 quotes and every doc number matched: 8 quotes corrected, 6 own phrases moved to italics. RQ-05 and RQ-06 opened. Self-review: 3 fixes applied, among them an invented shared-space name removed and the approval group named `ontology-governance` as in Ontology 14-02 |
| Oct 23, 2026 | Phase 3 | Read 29 pages in full (the 3 top pages, modules 01–03). 11 notes. 81 quotes and every multi-digit doc number matched by script against the page store: 9 quotes corrected to the doc wording (for example "govern access to the resource itself", "Specifying names instead of IDs is not supported to prevent renaming-related issues", "testing workflows before releasing to end-users"), 25 phrases of ours moved from quote marks to italics (question-style headings and our own summaries). **Module 02 regrouped:** *Property security markings* is a Workshop display feature, not a control, and *Cover pages* is project documentation, not a notice before opening; 02-02 is now *Granular policies* alone and 02-03 *Property security markings and cover pages*. The plan's Kestrel candidate *property security markings vs the existing property policy* is withdrawn (02-03 explains). Kestrel proposals recorded for Phase 7: `kestrel-standard` and `kestrel-pay` project templates, a `Merger` role, two Portfolios, a `kestrel-service-users` group, a `customer_contact` dataset where `Customer PII` stops, a `policyRegion` column with invariant and statistics checks, `Fraud [Analysis]` and `Kestrel Pay [Analysis]` projects, two project constraints, download checkpoints and an `Exporter` role conditional on enrollment enforcement. RQ-01 to RQ-04 opened |
| Oct 23, 2026 | Structure self-review | 4 fixes: the area README counts the generated docs index as written (1 of 43), as the 99 README does; the three top pages are labelled *Security & governance* in the register and docs index, as in the inventory; the Learn README's AIP line (still "notes being written") corrected to complete; the handover's *Apps 01-03* for Workshop permissions is 01-04, which the structure links |
| Oct 23, 2026 | Plan | Self-review, 8 fixes: the three top pages assigned to 00-01; *Checking permissions* moved beside emulation mode (03-04); cover pages given their own note; the property-security-markings candidate made a choice against the existing property policy; transaction checkpoints disambiguated from Checkpoints; the four gaps this area closes listed; the fetch-and-read mechanics stated for approval; counts taken from `sec_modules.py` (module 01 has 9 pages, 43 notes in all) |

## Open research questions

| ID | Question | Status |
|---|---|---|
| RQ-01 | **Doc gap.** *Property security markings* says the pills show "the markings and Classification-based Access Controls (CBAC) values configured through object and property security policies", but a property security policy (Ontology 12-03) is a granular policy on user attributes and need not reference any marking. What does the pill show for a property whose policy has no marking condition, and does a policy's marking condition count as *the marking the property carries*? | Open (Oct 23). Seen in [02-03](02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md) |
| RQ-02 | **Doc conflict.** *Access control propagation* says markings "Apply to datasets, transactions, files, and columns" and calls CBAC "Column-level mandatory controls"; the *Markings* page describes markings on files, folders and projects only, and *Classification-based Access Controls* describes file, data and project classifications, none column-level. Is there a column-level marking or classification outside marking-backed restricted views? | Open (Oct 23). Seen in [03-01](03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md) |
| RQ-03 | **Doc conflict.** *Manage markings* says under *Apply Markings* that `stop_propagating` "will only take effect on protected branches", and under *Remove Markings* that the branch must be "both protected and have the setting Require security approvals before merging enabled". Is the security-approvals setting required in both cases? | Open (Oct 23). Seen in [02-01](02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking) |
| RQ-04 | **Doc gap.** *Manage restricted views* says using a restricted view in Contour needs "the Read restricted view permission", which is not among the seven granular-permission roles the same page lists. Which role grants it, and is it part of Viewer by default? | Open (Oct 23). Seen in [03-02](03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md#who-may-do-what) |
| RQ-05 | **Doc inconsistency.** *Checkpoint types* lists *AIP Analyst save analysis* twice, under *Download* ("Saving an AIP Analyst analysis.") and under *Other* ("Saving an AIP Analyst analysis resource."). Are these two types, or one type listed in two categories? | Open (Oct 23). Seen in [06-02](06-approvals-and-checkpoints/02-checkpoints.md#the-catalogue) |
| RQ-06 | **Doc error (likely).** *Writing OAuth2 clients* describes the `refresh_token` parameter of a refresh request as "The access token that was obtained previously for the given user", while the endpoint table says it is the refresh token obtained with the authorization code. The table reading is the one the note uses. | Open (Oct 23). Seen in [05-02](05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md#refreshing-and-the-rules-that-revoke) |
| RQ-07 | **Doc errors (copy-paste).** *Apply Cipher operations to columns of datasets* introduces the Contour *Decryption* section with "To use the Cipher board to encrypt data, first select the columns to be decrypted", and the Python *Visual obfuscation* section with "To hash a column, you will need to define an EncrypterInput". The surrounding steps are read as written; the sentences themselves are wrong. | Open (Oct 23). Seen in [07-02](07-cipher/02-cipher-workflows.md) |
| RQ-08 | **Terminology.** *Data Lifetime: Core concepts* defines policies "at the namespace level" and names a *Namespace Viewer* role, while *Organizations and spaces* says spaces "have been rebranded from their previous name, namespaces". Is *Namespace Viewer* the same as Viewer on a space? The notes assume so. | Open (Oct 23). Seen in [09-03](09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md#two-kinds-of-policy) |
| RQ-09 | **Two 30-day rules.** *Manage users* says an account with no login for 30 days becomes inactive, its tokens invalid, and reactivates on login; *Protecting identity* says Central Auth accounts unused for more than 30 days "may be disabled without notice". Is Central Auth disablement a separate mechanism from Multipass inactivity, and does a login undo it? | Open (Oct 23). Seen in [10-03](10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#identity) |

---
[Security home](README.md) · [Topic map](MAP.md) · [Glossary](GLOSSARY.md)
