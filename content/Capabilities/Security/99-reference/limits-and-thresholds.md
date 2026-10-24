# Limits and thresholds

*Sources: the pages linked in each row · numbers as read October 23, 2026 · compiled October 23, 2026 · Ready for Review*

Every number this area's notes state from the docs, in one place. **Numbers change**: check the linked page before relying on one. Kestrel's own choices (a 60% regex threshold, 20 decryptions an hour, 365-day audit retention) are design decisions, not documented limits, and are not listed here; they live in [11](../11-kestrel-case/README.md).

## Accounts, groups and tokens

| What | Value | Docs page | Note |
|---|---|---|---|
| Account becomes inactive, all its tokens invalid | After **30 days** without a successful login; the next login reactivates it | [Manage users](https://www.palantir.com/docs/foundry/platform-security-management/manage-users/) | [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md) |
| Central Auth accounts | Unused for more than **30 days** may be disabled without notice | [Protecting identity](https://www.palantir.com/docs/foundry/security/single-sign-on-security/) | [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#identity) |
| Temporary group membership reminder | **Seven days** before expiry; none if the membership was set for less than seven days | [Manage groups](https://www.palantir.com/docs/foundry/platform-security-management/manage-groups/) | [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md) |
| Session token (`PALANTIR_TOKEN`) | Default **16 hours** | [Protecting tokens and API keys](https://www.palantir.com/docs/foundry/security/protect-tokens-api-keys/) | [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#tokens) |
| OAuth2 authorization code | Expires after **10 minutes** | [Writing OAuth2 clients](https://www.palantir.com/docs/foundry/platform-security-third-party/writing-oauth2-clients/) | [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md) |
| Refresh token inactivity | Unused for **30 days** → invalidated | [Writing OAuth2 clients](https://www.palantir.com/docs/foundry/platform-security-third-party/writing-oauth2-clients/) | [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md) |

## Policies, approvals and checkpoints

| What | Value | Docs page | Note |
|---|---|---|---|
| Granular policy cost | Constant against a field **1**; collection against a field **1,000**; marking condition **3,000**; total under **10,000** | [Manage granular policies](https://www.palantir.com/docs/foundry/platform-security-management/manage-granular-policies/) | [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md) |
| Policy-data statistics check (the docs' example) | Stop if more than **20%** of an organization hierarchy changes between daily builds | [Manage granular policies](https://www.palantir.com/docs/foundry/platform-security-management/manage-granular-policies/) | [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md) |
| *Added as reviewer* notification | Sent for group-based eligibility only when the group has **fewer than 50** members | [Approvals](https://www.palantir.com/docs/foundry/approvals/overview/) | [06-01](../06-approvals-and-checkpoints/01-approvals.md) |
| Checkpoint prompt title | Under **45** characters | [Configure checkpoints](https://www.palantir.com/docs/foundry/checkpoints/configure-checkpoints/) | [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| Recent justifications offered | The user's **5** most recent from the past month (*Response* and *Dropdown* types) | [Configure checkpoints](https://www.palantir.com/docs/foundry/checkpoints/configure-checkpoints/) | [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |

## Deprecated settings

| What | Value | Docs page | Note |
|---|---|---|---|
| *Propagate view requirements* | Most enrollments lost it in **October 2024**; once disabled, can't be re-enabled | [Disable "Propagate view requirements"](https://www.palantir.com/docs/foundry/platform-security-management/disabling-propagate-view-requirements/) | [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) |
| *Ignore inherited permissions* | Most enrollments lost it in **December 2024**; once disabled, can't be re-enabled | [Disable "Ignore inherited permissions"](https://www.palantir.com/docs/foundry/platform-security-management/disabling-ignore-inherited-permissions/) | [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) |

## Cipher, Compass, scanning and deletion

| What | Value | Docs page | Note |
|---|---|---|---|
| Cipher library: old method names deprecated | Since version **0.75.0** (`_column` methods replace them; the old ones still work with warnings) | [Apply Cipher operations](https://www.palantir.com/docs/foundry/cipher/apply-operations/) | [07-02](../07-cipher/02-cipher-workflows.md) |
| Media set upload transaction | At most **10,000** files per transaction; one open transaction per media set | [Manually upload data](https://www.palantir.com/docs/foundry/compass/manually-upload-data/) | [08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md) |
| Quicksearch object search | At most **250 object types**, by status (Active and Prominent, then Normal, then Experimental) | [Quicksearch](https://www.palantir.com/docs/foundry/compass/quicksearch/) | [08-01](../08-compass/01-compass-projects-and-navigation.md#quicksearch) |
| SDS recurring schedules | Daily, every day at **00:00 UTC**; weekly, every **Tuesday** at 00:00 UTC; monthly, every **1st** day of the month at 00:00 UTC; or continuous | [Create a sensitive data scan](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-a-sensitive-data-scan/) | [09-01](../09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md) |
| Full deletion after a transaction is marked | Up to around **30 days** in the underlying stores | [Data Lifetime FAQ](https://www.palantir.com/docs/foundry/data-lifetime/FAQ/) | [09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md) |

## Audit, infrastructure and recovery

| What | Value | Docs page | Note |
|---|---|---|---|
| Audit log latency | **~15 minutes** to availability; ~24 hours to archive | [Audit logs](https://www.palantir.com/docs/foundry/security/audit-logs-overview/) | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) |
| Audit export dataset retention policy | At most **730 days**, counted from the transaction that added the logs | [Audit logs](https://www.palantir.com/docs/foundry/security/audit-logs-overview/) | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) |
| Audit export append | At most **100 GiB** of log data (and **10k files**) per append for audit.3; **10 GiB** for audit.2 | [Audit logs](https://www.palantir.com/docs/foundry/security/audit-logs-overview/) | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) |
| Self-hosted: TLS certificate lifespan | **90 days**, up to a maximum of **one year** | [Protecting your self-hosted installation](https://www.palantir.com/docs/foundry/security/protect-foundry-installation/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md) |
| Self-hosted: TLS floor | **1.2** or higher | [Protecting your self-hosted installation](https://www.palantir.com/docs/foundry/security/protect-foundry-installation/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md) |
| Self-hosted: critical vulnerabilities patched | In **30 days** or less | [Protecting your self-hosted installation](https://www.palantir.com/docs/foundry/security/protect-foundry-installation/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md) |
| Security bulletin public disclosure | No more than **30 days** after an issue is identified, fixed and communicated to customers | [Monitoring for vulnerabilities](https://www.palantir.com/docs/foundry/security/monitor-for-vulnerabilities/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#vulnerabilities-for-everyone) |
| Bug bounty confirmation | Up to **five business days** | [Reporting security concerns](https://www.palantir.com/docs/foundry/security/report-security-concerns/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#reporting) |
| Rescue backup retention | Defaults to **seven days**; configurable on request | [Disaster recovery](https://www.palantir.com/docs/foundry/security/disaster-recovery/) | [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#disaster-recovery-on-the-managed-cloud) |

---
[Module index](README.md) · [Security home](../README.md)
