# 04 — Infrastructure security and disaster recovery

*Sources: [Protecting your self-hosted Foundry installation](https://www.palantir.com/docs/foundry/security/protect-foundry-installation/) · [Protecting your on-premise data connector](https://www.palantir.com/docs/foundry/security/protect-data-connector-installation/) · [Monitoring for vulnerabilities](https://www.palantir.com/docs/foundry/security/monitor-for-vulnerabilities/) · [Reporting security concerns](https://www.palantir.com/docs/foundry/security/report-security-concerns/) · [Disaster recovery](https://www.palantir.com/docs/foundry/security/disaster-recovery/) · checked October 23, 2026 · Ready for Review*

Five pages, sorted here by **who owns the box**. Two are for customers who run Foundry or a data connector on their own hardware; three apply to everyone: how Palantir handles vulnerabilities, how to report a problem, and what disaster recovery promises on the managed cloud. For an application developer the last three matter most; the first two are read so the exam's "self-hosted" answers don't surprise.

## If you run Foundry yourself

**[Docs]** Guidance for installations "outside of Palantir's managed SaaS platform", grouped as the page groups it, with the **numbers** that make it checkable:

| Area | **[Docs]** requirements |
|---|---|
| **Physical access** | Restricted to authorized personnel, time-bound, documented |
| **Data at rest** | Foundry already encrypts at the application level; also full-disk encrypt every server and storage device (LUKS, commercial, self-encrypting drives or cloud solutions); keys in an **HSM**; AES-256 or AES-128 |
| **Data in transit** | A trusted-CA certificate with a lifespan of **90 days, up to a maximum of one year**; **TLS 1.2 or higher** only; strong suites: ECDHE with CHACHA-POLY1305 or AES-GCM; avoid CBC |
| **Identity** | Named accounts, never shared; strong MFA (FIDO2 where possible, no SMS or email); passwordless "strongly recommended"; strong unique passwords, no reuse, rotation after entry on a wrong domain; zero trust by identity and device health |
| **Network** | Segmented in a dedicated VLAN or subnet; deny all inbound by default; allow-listed protocols, ports and subnets; not on the public Internet without IDS and a WAF; **egress** through a proxy with an allow-list by IP or domain, everything else denied; IDS, firewalls, DLP, network logs |
| **Hosts** | CIS or NIST hardening; a modern supported OS; critical vulnerabilities patched in **30 days or less**; host logs, host IDS, DLP |
| **Privileged access** | Backend reachable only through bastion or jump hosts; MFA for all infrastructure and cloud-level access |
| **Backups** | Full-disk backups of at least the **Rescue** service's data, ideally all hosts; encrypted, durable and/or offline ("Ransomware and other malicious actors typically try to destroy backups before performing other malicious actions"); restoration tested **at least annually** |
| **Patching** | Apollo-connected installations receive security updates automatically; otherwise apply them as soon as available, critical ones within **30 days** |

**[Docs]** The **data connector agent** page is the same list for a smaller box, with three differences: the agent "implements object-level encryption as part of the data ingestion process" using key material received from Foundry; its network inventory must include every source system it reads from; and it "includes the ability to self-update to the latest supported version". Its coordinator token and tarball were covered in [03](03-protecting-identity-tokens-phishing-and-files.md#tokens).

**[Explanation]** Almost nothing on these two pages is Foundry-specific; it's the standard hardening canon with Foundry's two services named (Rescue, Apollo) and three numbers attached (certificate lifetime, TLS floor, 30-day patching). That is the point: a self-hosted installation inherits none of the managed platform's "infrastructure security" layer from [00-01](../00-orientation/01-the-security-map.md), so the customer must build all of it.

## Vulnerabilities, for everyone

**[Docs]** Palantir runs "an aggressive vulnerability management program" with patching SLAs, covering its products and underlying infrastructure. **Security bulletins** are published, with CVEs where possible, giving summary, scope and impact, remediation and timeline; public disclosure "no more than 30 days after an issue has been identified, fixed, and communicated to our customers", with the right to delay. Customers get **private, embargoed bulletins** first, and can subscribe on SafeBase.

**[Docs]** **User-authored code** is the customer's problem: code in Foundry can import packages with known vulnerabilities; Palantir ships patched versions of common packages but won't auto-migrate user code, because that "may break pipelines or integrations", and "it is a customer responsibility to manage the software versions present in dependencies". In extreme cases (log4j is the example) Palantir "may push breaking package upgrades to mitigate critical security issues (e.g. log4j) without notice or warning".

**[Explanation]** For Kestrel this is Priya's and Daniel's responsibility, and the mechanism is the dependency pinning in Code Repositories plus the code-scanning rules in [05](05-code-scanning.md). The log4j clause is a planning fact: a critical upstream vulnerability can break a pipeline overnight, so a pinned environment that nobody can rebuild is a risk, not a safety.

## Reporting

**[Docs]**

| Situation | Route |
|---|---|
| **Ongoing incident** | Your Palantir representative, immediately; they page Information Security |
| **Routine security issue or a vulnerability you found** (customer) | Your representative, or email **cirt@palantir.com** with reproduction steps, encrypted with Palantir's GPG key and a return contact |
| **Bug bounty researcher** | HackerOne, under a disclose.io-based responsible disclosure policy; confirmation within up to **five business days** |
| **Questions** | Your representative, who escalates to security staff |

## Disaster recovery on the managed cloud

**[Docs]** Two scenario classes, two mechanisms:

| Scenario | Mechanism | **[Docs]** detail |
|---|---|---|
| **Large-scale disruption** (loss of a data centre) | **High availability**: active-active across multiple availability zones in a region, parallel processing, bidirectional replication, automatic failover | Loss of one zone "does not take the platform offline and does not result in permanent data loss"; the platform "may operate in a degraded state" |
| **Operational disruption** (accidental deletion, corruption, which replication faithfully copies everywhere) | **Automated backups** by **Rescue** of platform metadata and configuration: data catalog and ontology metadata, **ontology edits**, Code Repositories, Workshop modules and related state | Regular cadence; encrypted in transit and at rest in cloud object storage; continuously monitored; retention defaults to **seven days**, configurable on request |

**[Docs]** Restoration combines the Rescue backups "with data re-ingested from your customer-managed source systems". The backups cover database infrastructure, **not** the files in object storage; those rely on the cloud provider's durability features such as bucket versioning. Shared responsibility: Palantir protects the platform and its metadata and configuration; "The customer is responsible for the integrity and backup of data in customer upstream source systems." On-premises and customer-managed deployments have per-environment arrangements.

**[Explanation]** Read this against the areas already written. Ontology **edits** (action writebacks) are in Rescue's scope, so the Delivery Desk's holds and re-routes survive a restore to within the retention window; **datasets** are object storage, restored by re-ingestion from the source systems, which is why [Ontology 02-02](../../Ontology/02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md)'s rule that every dataset must be rebuildable from its sources is also the disaster-recovery plan. And seven days is a short window: a corruption noticed on day eight has no backup to go to, which is a reason to keep the monitoring in [02](02-audit-logs.md) prompt.

## For Kestrel

**[Example]** Kestrel is on the managed cloud with no self-hosted installation; the data connector question depends on whether the storefront source is reached by an on-premise agent, which [Deep Dive: Data Connection](../../../Tracks/Deep%20Dive/Creating%20Your%20First%20Data%20Connection/README.md) covered as a course but 17-02 doesn't record. *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), as operating rules:

- **Source-of-truth statement:** every dataset in the Datasource projects is re-ingestable from the storefront and ledger systems; the ledger's own backups are Kestrel Pay's responsibility, outside Foundry.
- **Rescue retention:** ask Palantir to raise it from the default seven days to **30**, so an ontology-edit corruption found in a monthly review is still recoverable. Logged as a request, since it needs Palantir.
- **Dependency hygiene:** Priya's and Daniel's repositories pin versions and are rebuilt against Palantir's patched bundles on a monthly schedule, so a forced upgrade lands on a repository that can be rebuilt.
- **Bulletins:** the two Data Governance Officers subscribe on SafeBase; an embargoed bulletin is handled by the platform administrators, who decide whether Kestrel is affected.
- **Incident route:** the Palantir representative for anything ongoing; `cirt@palantir.com` for the rest; written into the same page as the token-spill procedure ([03](03-protecting-identity-tokens-phishing-and-files.md#for-kestrel)).

---
[Module index](README.md) · Previous: [03 — Protecting identity, tokens, phishing and files](03-protecting-identity-tokens-phishing-and-files.md) · Next: [05 — Code scanning](05-code-scanning.md)
