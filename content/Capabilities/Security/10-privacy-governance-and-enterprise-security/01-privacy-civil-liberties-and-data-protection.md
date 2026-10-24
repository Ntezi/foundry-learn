# 01 — Privacy, civil liberties and data protection

*Sources: [Privacy and civil liberties](https://www.palantir.com/docs/foundry/privacy-civil-liberties/overview/) · [Privacy and civil liberties in practice](https://www.palantir.com/docs/foundry/privacy-civil-liberties/pcl-in-practice/) · [Data protection and governance](https://www.palantir.com/docs/foundry/security/data-protection-and-governance/) · checked October 23, 2026 · Ready for Review*

The **principles behind the tools**, written as a **map from principle to control**. Every earlier module ended with a Kestrel proposal; this note is where the docs say *why* those proposals should exist, and it closes with Kestrel's governance chain of responsibility, which the proposals have been assuming without naming.

## Whose job this is

**[Docs]** The PCL pages are "intended for people who make or implement decisions about data use": data owners, governance and privacy teams, legal and compliance, platform administrators, developers, use-case owners. Palantir's position: "an institution's ability to use data effectively should reinforce, rather than compromise, privacy and civil liberties", and the principles "are not compliance checks added after a system has been designed or deployed". The capabilities "support, rather than replace, an organization's governance and legal responsibilities"; they "do not determine whether a use is lawful, necessary, or proportionate". Palantir's PCL team can be asked, through your representative or Support, to connect policies to capabilities.

**[Docs]** *Data protection and governance* adds the vocabulary: **data protection** is the "technical and organizational means" that keep personal-data processing "limited to that which is necessary and proportional"; **data governance** is managing data "across the entire lifecycle of processing, from ingestion to access to deletion".

## Seven principles, and the control each one reaches for

**[Docs]** *PCL in practice* pairs each principle with capabilities and a worked example. Condensed, with this area's notes:

| Principle | **[Docs]** what it asks | **[Docs]** capabilities | Where in this area |
|---|---|---|---|
| **Proportionality and minimization** | Is the data use appropriate to the purpose; is collection, access, use and retention narrowed to what it requires. "Detection, restriction, or obfuscation does not replace that decision" | Sensitive Data Scanner to find it; markings and project roles to limit it; Cipher where direct identifiers aren't needed | [09-01](../09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md), [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md), [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md) |
| **Purpose limitation** | Define permitted purposes before granting access; reassess when a purpose ends. "An approval records a decision at a point in time; it does not authorize unrelated future uses" | Checkpoints for justification, Approvals for review, markings and project permissions for the boundary | [06-01](../06-approvals-and-checkpoints/01-approvals.md), [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| **Access governance** | Eligibility for a type of data **and** the person's role in the workflow; least privilege; groups; review as responsibilities change. "No single permission model defines an organization's policy" | Markings (eligibility), project roles (workflow), Approvals, Compass | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md), [04-02](../04-securing-data-and-applications/02-securing-an-operational-application.md) |
| **Privacy-enhancing transformations** | Replace identifiers or limit when originals are available; "Transforming a value does not automatically make data anonymous" | Cipher hashing, encryption, controlled decryption | [07-02](../07-cipher/02-cipher-workflows.md) |
| **Human agency and oversight** | Consequential actions stay reviewable; reviewers get enough context. "Human review is meaningful only when a reviewer has sufficient information, authority, and time to change the outcome" | Approvals before changes apply; Checkpoints at sensitive interactions; Automate staging an AIP Logic proposal for review | [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md), [06](../06-approvals-and-checkpoints/README.md) |
| **Accountability** | Who is responsible; records that support review. "Records alone do not create accountability" | Audit logs, checkpoint records, completed Approvals requests, Compass ownership | [02 Audit logs](02-audit-logs.md), [06](../06-approvals-and-checkpoints/README.md) |
| **Retention and deletion** | Reflect purpose and obligations; account for derived copies; define early | Data Lifetime, Compass trash and project management | [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md) |

**[Explanation]** Each row ends in a sentence the docs add to stop the control being mistaken for the decision. Together they say one thing: Foundry can **enforce** a governance decision it cannot **make**. Every proposal in this area is therefore two artefacts: the configuration, and the written decision that the configuration implements. [11](../11-kestrel-case/README.md) records both.

### The examples, in one line each

**[Docs]** A maintenance pipeline drops technician contact details that don't help the prediction, marks the raw dataset through an SDS match action, and hashes technician IDs with Cipher where repeat patterns matter. A supplier export is limited to forecasting fields, its project access routed through Approvals, and a checkpoint asks for the planning task behind a Workshop export. A facilities app marks contract resources so "broad application access" doesn't become "broad access to every underlying resource". A support pipeline hashes account IDs so analysts can group without identifying, with originals in a restricted project. An AIP Logic function's schedule change is staged by Automate for a planner's review. A contracts project has a named owner in Compass, checkpoint records for exports and actions, and a governance team that reviews audit events on a schedule. A warranty investigation sets retention for raw and derived data before work starts.

## The Fair Information Practice Principles

**[Docs]** *Data protection and governance* grounds all this in the OECD-based **FIPPs**: Collection Limitation, Data Quality, Purpose Specification, Use Limitation, Security Safeguards, Openness, Individual Participation (the rights to confirm, obtain, challenge and correct one's data), and Accountability. The common theme is **data minimization**: collect and use only for "explicit and authorized purposes", always with "security assurance in mind". Its worked example is a bank's new customer programme. Beyond FIPPs, fairness, non-discrimination and ethics may apply; requirements vary by jurisdiction and sector.

## What counts as sensitive

**[Docs]** "Context matters": some laws name sensitive elements (GDPR), others leave it to data owners or common recognition (Social Security numbers). The page's example categories: contact information, ID numbers, biometrics, dates (birth, admission, discharge), location, health, financial (income, assets, bills, account numbers), and others such as phone logs and IP addresses. It quotes **GDPR Article 4(1)** (personal data as "any information relating to an identified or identifiable natural person") and **Article 9(1)** (special categories: racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic and biometric data, health, sex life), summarizes **HIPAA**'s protected health information, and lists LGPD, Japan's APPI, PIPEDA, CCPA/CPRA, Virginia's CDPA and Colorado's CPA as other frameworks. "Consult your legal, compliance, and/or data protection team(s)" to understand the classifications that apply.

## Governance oversight: four procedures

**[Docs]** Before processing data:

1. **Identify a governance committee or lead.** It "does not need to be a formalized group"; responsibility typically sits with the **data owners**, and the requirements usually come from the DPO, Information Security, Compliance or Legal.
2. **Complete required privacy reviews**: threshold assessments, DPIAs, conformity assessments, privacy statements, records of processing, SORNs, as the organization or regulation requires.
3. **Work with Legal and Compliance** on the documentation a system needs before handling sensitive data, and engage them early.
4. **Ask Palantir's PCL team** when more guidance would help.

**[Docs]** The page's four best practices map onto this area's modules: **minimize** (drop columns and rows; Cipher as an extra layer), **account** (Checkpoints), **scan** (Sensitive Data Scanner, manual or watching for new data), **retain and delete** (decide "ideally before any data is ingested at all"; deletion "at some point becomes irreversible", so build in eligibility reviews).

## For Kestrel

**[Example]** The chain of responsibility the earlier proposals assumed, now stated, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)) in 17-02 §7:

| Role | Who | Decides |
|---|---|---|
| **Data owners** | Priya for storefront and commerce data; Lena for Kestrel Pay; Ama for customer-service records | Purpose, minimization, who is eligible, retention per dataset |
| **Governance lead** (the docs' "committee") | Lena, as the only person on both the commerce and payments side, with Priya and one platform administrator | Markings structure, SDS scans, Data Lifetime policies, the quarterly reviews |
| **Data Governance Officer** (platform role) | Lena and one platform administrator ([09-02](../09-sensitive-data-scanner-and-data-lifetime/02-match-conditions-match-actions-best-practices-and-media-sets.md#for-kestrel)) | The technical acts the lead decides |
| **Legal and compliance** | Outside Kestrel's named cast; recorded as the approver of the retention schedule and the privacy notice wording | Lawfulness, retention obligations, the 30-day deletion promise ([09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md)) |

Two things Kestrel wrote down before Phase 7 adopted anything: a one-page **purpose statement** per project (what the data is for, which decisions use it, who may see it), which the cover pages summarize ([02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)); and a **review calendar**: weekly checkpoint records for payments exports ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md#for-kestrel)), quarterly marking membership ([06-01](../06-approvals-and-checkpoints/01-approvals.md#for-kestrel)), quarterly roll-forward of `customer-source-365`. The docs' sentence to pin above it: records alone do not create accountability.

---
[Module index](README.md) · Next: [02 — Audit logs](02-audit-logs.md)
