# 01 — Review questions by module

*Sources: the notes each question links to · written October 23, 2026 · not yet attempted*

Scenario questions in the style of the Application Developer Associate exam: a situation, a question, and the answer folded away. Each is tagged with its exam domain from the [official guide](../../../Tracks/Application%20Developer/07_Exam_Guide.md):

- **D1** Ontology schema design and workflow assembly
- **D2** Action types and write-back patterns
- **D5** OSDK, APIs and external applications
- **D7** AIP Logic and AI-powered applications
- **D8** Application security, governance and operations
- **—** not in the Associate guide (useful for work, not the exam)

Most of this area is D8. Answer before opening each one; every answer links to the note that explains it. Kestrel questions use the design in [11](../11-kestrel-case/README.md).

## 00 — Orientation

**Q1 · D8** A reviewer says a Workshop module is insecure because the object security policy that hides other regions' shipments can be bypassed by exporting. Is that a fault in the policy?

<details><summary>Answer</summary>

No. Row and column policies are **discretionary**: they filter the read and stop there, by design. Anything that must survive derivation, export or a model's output needs a **mandatory** control (marking, CBAC, organization), or a checkpoint at the export. [00-01](../00-orientation/01-the-security-map.md), [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md)
</details>

**Q2 · D8** Which half of the shared responsibility model does MFA for Kestrel's users fall into, and which half does encryption of the platform's storage fall into?

<details><summary>Answer</summary>

MFA, identity and the people holding credentials are the **customer's**; the managed platform's infrastructure, including storage encryption and disaster recovery, is **Palantir's**. A self-hosted installation moves the infrastructure half to the customer too. [00-01](../00-orientation/01-the-security-map.md), [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md), [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md)
</details>

## 01 — Organizations, projects, users and groups

**Q3 · D8** Kestrel wants Northwind Freight's staff to work on one shared project without being able to list Kestrel's users and groups. Groups alone won't do it. What will?

<details><summary>Answer</summary>

A second **organization** for Northwind, and a shared space marked with both organizations. Organizations are the only control that hides users and groups from each other; inside one organization, groups govern but don't hide. [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#organizations-the-strictest-wall), [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md)
</details>

**Q4 · D8** A user moving a dataset from a Kestrel-only project into the shared Northwind project gets an error about *Expand access*. On which organization do they need it?

<details><summary>Answer</summary>

On the **source** organization, Kestrel's. Widening the audience is the sensitive direction and has its own permission; *Apply organization*, the narrowing direction, is the other one. [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#the-two-organization-permissions)
</details>

**Q5 · D8** Priya is Editor on `Payments [Ontology]`, which is marked `Kestrel Pay – Financial`, and she isn't a member of the marking. What can she do with its datasets?

<details><summary>Answer</summary>

Nothing: a role is a set of operations on resources the user is allowed to see, and a marking the user lacks blocks access regardless of role. Roles answer *what can you do*, markings and organizations answer *what are you allowed to see*. [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#6-what-exactly-does-a-role-let-someone-do)
</details>

**Q6 · D8** Someone shares a single dataset from `Payments [Ontology]` by link. Which project setting would have prevented it, and what else does that setting remove?

<details><summary>Answer</summary>

Turning **off role grants on folders and files** in the project's settings. A share link is a direct grant on the file, so disabling per-file grants removes link sharing too, along with any existing per-file grants. [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#role-grants-on-folders-and-files)
</details>

**Q7 · D8** Release engineers need to merge to protected branches in Code Repositories without becoming Editors on the whole project. Where do you make that possible, and what permission does it take?

<details><summary>Answer</summary>

A **custom role** (the docs' `Merger`: Viewer plus the merge operations) inside a **custom role set** copied from *Project defaults* and applied to the **space**. It needs the *Manage roles and role sets* organization administrator permission. [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#7-we-need-a-role-that-doesnt-exist)
</details>

**Q8 · D8** You want every new project in the `kestrel` space to start with viewer, editor and owner groups, Discoverer as the default role, and the creator as Owner. Convention isn't enough. What makes it mandatory?

<details><summary>Answer</summary>

A **project template** for the space: it creates the groups from variables, sets the default role and the creator's role, and can apply markings and constraints. Every project uses some template; the default one just creates an empty project with the creator as Owner. [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#8-every-new-project-should-start-the-same-way)
</details>

**Q9 · D8** A developer back from a six-week holiday finds that every API token fails, but logging in to Foundry works and the tokens work again afterwards. What happened?

<details><summary>Answer</summary>

The account became **inactive** after 30 days without a login, which invalidates all its tokens; the next successful login reactivates it with no administrator involved. Service users that never log in should be excluded from the rule. [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#situation-my-token-stopped-working-after-a-holiday)
</details>

**Q10 · D8** Kestrel's auditors need access to the payments projects for one quarter and then should lose it without anyone remembering to remove them. Which group feature?

<details><summary>Answer</summary>

A group with a **maximum membership duration** (temporary membership), so each membership expires on its own. [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md)
</details>

## 02 — Markings and mandatory controls

**Q11 · D8** A dataset carries `Customer PII` and `Kestrel Pay – Financial`. Tomás holds both; Lena holds only the second. Who can open it?

<details><summary>Answer</summary>

Only Tomás. Markings are **conjunctive**: a user must be a member of every marking on the resource. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#part-1--what-a-marking-does)
</details>

**Q12 · D8** A user can see a derived dataset in the project, open its page and read its schema, but every attempt to read the data fails. What's the most likely cause?

<details><summary>Answer</summary>

They meet the **file** requirements (the marking on the dataset's own project) but not the **data** requirements inherited from an upstream dataset's marking. Failing the file requirements would have hidden the dataset entirely. *Check access* shows this under *Additional data requirements*. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#two-ways-a-marking-is-inherited), [03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md)
</details>

**Q13 · D8** Someone who has completed PII training is made a member of `Customer PII`. Does that let them see every PII dataset in Kestrel?

<details><summary>Answer</summary>

No. Markings restrict; they are not meant to provision access. Membership makes them **eligible**; their **role** on each project still decides what they open. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#markings-restrict-roles-provision)
</details>

**Q14 · D8** Kestrel wants one person to decide which datasets are PII, another to decide who may see PII, and neither of them to read PII. Which marking permissions do they hold?

<details><summary>Answer</summary>

The first holds *Apply marking* (and *Remove marking*); the second holds *Manage permissions*. Neither is a **member**, and only membership grants access to marked data. The four permissions are separate on purpose. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things)
</details>

**Q15 · D8** `Customer PII` is on the raw storefront data and should stop at `customer_master`, which has no contact columns. Where is that done, and what protects the step?

<details><summary>Answer</summary>

In the **transform** that produces `customer_master`, with `stop_propagating` on the output; the dataset must be rebuilt for it to take effect, and the docs want it on a **protected branch** with security approvals, because it is the one point where a mandatory control is lifted. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking), [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md)
</details>

**Q16 · D8** A granular policy for shipments compares the user's `region` attribute against a column, and someone proposes a second term: *not in group `contractors`*. Why do the docs object?

<details><summary>Answer</summary>

**NOT on group, marking or organization membership** is a misconfiguration because of scoped tokens, which carry only a subset of a user's permissions: a token lacking the attribute the NOT checks passes the condition and gets more than intended. Write what a user *must* have, not what they must lack. [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md)
</details>

**Q17 · D8** A policy's conditions add up to a cost of 12,000. What happens, and what are the unit costs?

<details><summary>Answer</summary>

It exceeds the **10,000** limit and can't be saved. A constant against a field costs 1, a collection against a field 1,000, a marking condition 3,000. [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md)
</details>

**Q18 · D8** A Workshop Object Table shows a marking pill next to a property. A colleague says the pill is what stops unauthorized users seeing the value. Correct?

<details><summary>Answer</summary>

No. Property security markings are **informational only**; Foundry checks the real requirements whether or not the pill is shown, and the pill can even understate the requirement. The control is the policy, not the display. [02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)
</details>

**Q19 · D8** Kestrel's payments projects are marked, so nobody outside the marking can find them to request access. What's the documented way to let people find them without seeing anything inside?

<details><summary>Answer</summary>

Make the project's **cover page** discoverable to the organization: users without access can read it, learn what the project is for and which group to request, and nothing else. It is the one documented exception to markings hiding existence. [02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)
</details>

## 03 — Discretionary controls, propagation and diagnosis

**Q20 · D7** An AIP Logic function reads `Customer` through a tool. The property security policy hides email from the running user. Can the model's answer contain the email?

<details><summary>Answer</summary>

Not for that user, because the tool read under their permissions. But once data is in the model's context nothing associates it with the source policy, so for a user who *can* see the email, the output can carry it anywhere. Only a **marking** governs who may run the function and see its output. [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md)
</details>

**Q21 · D8** When do the docs say to use both a restricted view and a marking on the same data?

<details><summary>Answer</summary>

When you need **both** behaviours: the view filters rows per user at the read, the marking on the **backing dataset** protects the source and every derivative, including anyone who bypasses the view. The docs recommend marking the backing dataset for stronger protection. [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md#choosing)
</details>

**Q22 · D8** Priya wants to build a transform on top of a restricted view. Why won't the docs let her, and what should the view be used for instead?

<details><summary>Answer</summary>

A view's contents depend on **who runs the read**, so a pipeline built on it isn't reproducible or user-independent; views can't be inputs to transforms or batch jobs. They can back an object type or feed Contour. [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md)
</details>

**Q23 · D8** Tomás may read customer data and payment data. Kestrel still doesn't want them joined except in one project. Which control enforces that, given he holds both markings?

<details><summary>Answer</summary>

**Project constraints**: *Allowed markings* of `Kestrel Pay – Financial` only on the payments projects and *Prohibited* on the operations project, so a dataset carrying the other marking can't be saved or built there. Markings govern who; constraints govern what may be combined where. [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md)
</details>

**Q24 · D8** A constraint is in place, yet a dataset in the project now shows a violation warning. How did the marking get in, and what happens to the dataset?

<details><summary>Answer</summary>

By **inheritance** from an upstream dataset after the constraint was set. The dataset **won't build** until one of three things happens: the marking is added to the allowed list, the inputs that bring it in are removed, or the upstream marking is removed. [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md)
</details>

**Q25 · D8** Daniel wants to test what Kofi sees before a Delivery Desk release. He tries emulation mode and still sees every region. Why, and what's the right test?

<details><summary>Answer</summary>

Emulation drops **groups and markings**, not **attributes**; Kofi's filter is on the `region` attribute, which stays Daniel's own. Test attribute policies with a real test user in a test environment; use emulation for group-, marking- and role-based access. [03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md)
</details>

**Q26 · D8** A user can open a Workshop module but one chart is blank. Which part of *Check access* do you read?

<details><summary>Answer</summary>

*Additional data requirements*: the module's own requirements pass, but a dependency behind the chart carries an inherited marking or the user lacks a role on it. *Access requirements* would have stopped them opening the module at all. [03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md)
</details>

**Q27 · —** An administrator proposes enabling *Propagate view requirements* on a project to protect derived data. What do the docs say?

<details><summary>Answer</summary>

It's a **deprecated** setting that most enrollments lost in October 2024, once disabled it can't be re-enabled, and the migration path is projects and markings. The same goes for *Ignore inherited permissions* (December 2024). [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md)
</details>

## 04 — Securing data and applications

**Q28 · D1, D8** Where does a marking belong in a Datasource → Transform → Ontology → Workflow project chain if the goal is to protect raw PII without blanking every downstream app?

<details><summary>Answer</summary>

On the **raw datasets or their folder**, not on the project: a project marking would propagate into every derived dataset in every downstream project. Then stop it in the transform that minimizes the data, and protect the stop. [04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md), [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md)
</details>

**Q29 · D8** Applying a marking to a live pipeline: what do the docs make you do before and after?

<details><summary>Answer</summary>

**Simulate** first to see what would be locked out, decide where the marking should stop, add `stop_propagating` there and rebuild, then apply and **simulate again** to prove the stop works. Skipping the second check is how every downstream module goes blank at once. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#applying-a-marking-to-a-live-pipeline), [04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md)
</details>

**Q30 · D8** Northwind must read `shared_shipments`, derived from Kestrel-only data. Which function removes the Kestrel organization requirement, and who should approve it?

<details><summary>Answer</summary>

`stop_requiring` in the transform, on a protected branch, approved by the data owner and a security reviewer: it's the organization-level twin of `stop_propagating`, the single point where a mandatory control is lifted. [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md)
</details>

## 05 — Third-party applications and tokens

**Q31 · D5** Kestrel's nightly export was built on a developer's personal token. Three things are wrong with that; name them.

<details><summary>Answer</summary>

The job stops when the developer's account goes inactive or they leave; a personal token has user-level access to every application, far more than the job needs; and the audit trail shows a person doing what a job did. Use a Developer Console application with client credentials and a **service user**. [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md), [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md)
</details>

**Q32 · D5** The support portal is a browser app that can't keep a secret. Which grant, and what replaces the secret?

<details><summary>Answer</summary>

**Authorization code with PKCE**: a public client sends a code challenge and later proves it with the verifier. Add `offline_access` for refresh tokens, store rotated refresh tokens atomically, and remember the authorization code lasts ten minutes. [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md)
</details>

**Q33 · D5** A support tool reads tickets with one agent's token and shows the results to a second agent who lacks access. The developer says both are Kestrel staff. What rule does it break?

<details><summary>Answer</summary>

Circumventing data controls: an application must never access data with one user's token and let another user interact with it. Every control is evaluated per user at the read; sharing happens in Foundry, not in the app. [05-03](../05-third-party-applications-and-tokens/03-third-party-application-and-api-guidance.md)
</details>

**Q34 · D5** An application is registered and shows a client ID and secret, but users get an error when connecting. What step is missing?

<details><summary>Answer</summary>

**Enablement** for the organization: registration alone doesn't make an application usable, and enablement is per organization and never automatic, even for the organization that registered it. [05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md#stage-2--enabled)
</details>

**Q35 · D5** A client secret is found in a public repository. In what order do you act?

<details><summary>Answer</summary>

Treat it as a security incident: **rotate or revoke** the credential first, tell Information Security, then rotate anything the credential could have reached. Palantir's revocation service may already have revoked a spilled *token*, silently; it can't notify you. [10-03](../10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#tokens), [05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md#stage-4--danger-zone)
</details>

## 06 — Approvals and Checkpoints

**Q36 · D8** A request for `Customer PII` membership plus Viewer on a project sits for days with no reviewer reacting. The eligible reviewer group has 60 members. Why might nobody know?

<details><summary>Answer</summary>

The *Added as reviewer* notification is sent for group-based eligibility only when the group has **fewer than 50** members. Keep approver pools small, or add reviewers by name. [06-01](../06-approvals-and-checkpoints/01-approvals.md)
</details>

**Q37 · D8** Who is eligible to approve a request by default?

<details><summary>Answer</summary>

Whoever could have performed the action themselves: the permission model seen from the other side. Reviewers approve tasks individually but should judge the effect of the whole request. [06-01](../06-approvals-and-checkpoints/01-approvals.md)
</details>

**Q38 · D2, D8** Kestrel wants every refund action to carry a ticket reference and every ledger export to carry a reason, without adding either to the action's own parameters. Which feature, and what does it *not* do?

<details><summary>Answer</summary>

**Checkpoints**: a *Submit action* configuration with a validated *Response* justification for the refund, and export configurations matched on the `Kestrel Pay – Financial` marking. A checkpoint records a justification; it does not grant or deny access, so it isn't a substitute for the marking. [06-02](../06-approvals-and-checkpoints/02-checkpoints.md)
</details>

**Q39 · D8** Lena wants to review checkpoint records for the payments projects but isn't a space administrator or a Data Governance Officer. What's the documented route?

<details><summary>Answer</summary>

The `checkpoints:review-records` operation on the checkpointed resource, granted through a **custom role** because no default role includes it. [06-02](../06-approvals-and-checkpoints/02-checkpoints.md)
</details>

## 07 — Cipher

**Q40 · D2, D8** Tomás needs to count payments per card without seeing card numbers. Deterministic or randomized encryption, and what's the trade-off?

<details><summary>Answer</summary>

**Deterministic** (AES_SIV): the same card gives the same ciphertext, so counting and joining work. The cost is frequency leakage, acceptable for high-cardinality card numbers, dangerous for a low-cardinality column. [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-an-algorithm)
</details>

**Q41 · D8** Which Cipher licence type is the only one audited at the level of the individual value, and which one do the docs treat as access to the keys themselves?

<details><summary>Answer</summary>

**Operational User** (single values, rate-limited, cell-level audit, can be made to bypass checkpoints for Functions and APIs). **Admin** (transforms in code) effectively grants key access and should go only to elevated users; Data Manager encrypts whole columns in Pipeline Builder and Contour without touching keys. [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-a-licence)
</details>

**Q42 · D2** A Workshop module shows `Payment.cardNumber` as ciphertext. What property type is that, and what does a function that decrypts it do to your audit trail?

<details><summary>Answer</summary>

A **CipherText** property with a plaintext type. A decrypting function makes decryption a side effect of whatever calls it; Kestrel keeps the single-value justification prompt instead, so every reveal is recorded. [07-02](../07-cipher/02-cipher-workflows.md)
</details>

## 08 — Compass

**Q43 · D1** A dataset is moved from `Storefront [Datasource]` into `Delivery Desk [Workflow]`. What travels with it, what may stop it, and why do the docs prefer a move to a share?

<details><summary>Answer</summary>

Its **markings** travel with it; a destination **project constraint** may refuse the move. Moving keeps the permission picture legible, where a share is a direct grant on one file that the project's roles don't show. [08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md)
</details>

**Q44 · D8** Why do the docs treat a manual CSV upload as more than a convenience?

<details><summary>Answer</summary>

An upload is **ingestion** with the same questions as any source: where it lands, which markings it inherits there, and who is told. Kestrel confines uploads to one folder behind the import checkpoint. [08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md#rule-3--uploads-are-ingestion-with-the-same-questions)
</details>

## 09 — Sensitive Data Scanner and Data Lifetime

**Q45 · D8** The scanner's first run would apply `Customer PII` to forty datasets. What do the docs say to do first?

<details><summary>Answer</summary>

Run one cycle with **no match actions** and tune the conditions against the findings; only then switch the marking action on, and don't re-apply markings someone removed by hand. [09-01](../09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md), [09-02](../09-sensitive-data-scanner-and-data-lifetime/02-match-conditions-match-actions-best-practices-and-media-sets.md)
</details>

**Q46 · D8** Lena should be able to scan the whole space without being Owner on every resource. Which role and which extra grant?

<details><summary>Answer</summary>

**Data Governance Officer** (Control Panel) plus **Viewer** on the space, which gives scanning privileges like a space owner. The same role creates and overrides deletion policies and reviews every checkpoint record in the organization. [09-02](../09-sensitive-data-scanner-and-data-lifetime/02-match-conditions-match-actions-best-practices-and-media-sets.md), [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md)
</details>

**Q47 · D1, D8** `customer_master` is built from source records that must be deleted after a year, but the master record must be kept. How does Data Lifetime allow both?

<details><summary>Answer</summary>

A fixed-date policy with a cutoff on the **root** source datasets, and an officer-only **policy override** on `customer_master` that breaks the inheritance of deletion dates, the mechanism the docs provide for aggregations and minimizations. [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md), [09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md)
</details>

**Q48 · D8** A policy's History tab shows a *Removal*. Was data deleted?

<details><summary>Answer</summary>

No. Removals are datasets removed from the policy. Actual and pending deletions are in the **Deletions** tab, and full deletion from the underlying stores can take up to about 30 days. [09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md)
</details>

## 10 — Privacy, governance and enterprise security

**Q49 · D8** Kestrel's audit export dataset is created with the organization marking only. What do the docs say to add, and why?

<details><summary>Answer</summary>

More **markings**, so only qualified administrators see it: the logs contain personal data and search queries. Also set a retention policy (at most 730 days) and query by `date` partition and by **category**, not by event name. [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md)
</details>

**Q50 · D8** A production pipeline broke overnight because a package version changed without warning. Which documented clause explains it, and what's the defence?

<details><summary>Answer</summary>

Palantir may push breaking package upgrades to mitigate critical issues (log4j is the example) without notice; dependency versions in user code are the customer's responsibility. Pin versions, rebuild on a schedule against patched bundles, and never keep an environment nobody can rebuild. [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#vulnerabilities-for-everyone)
</details>

**Q51 · D8** A corrupted ontology edit is noticed nine days after it happened on the managed cloud. Can Rescue restore it with default settings?

<details><summary>Answer</summary>

No: Rescue's retention defaults to **seven days** (configurable on request). Datasets in object storage aren't in its backups at all; they come back by re-ingestion from source systems, which is why every dataset must be rebuildable. [10-04](../10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#disaster-recovery-on-the-managed-cloud)
</details>

**Q52 · D8** Code scanning is off for the enrollment, but one repository is listed under *Always scan*. Is it scanned, and in which order are overrides resolved?

<details><summary>Answer</summary>

Yes. Repository overrides win, then project overrides, then the enrollment toggle; an *Always scan* entry is honoured even with the toggle off. Rules decide what is reported; enablement decides what is scanned. [10-05](../10-privacy-governance-and-enterprise-security/05-code-scanning.md)
</details>

---
[Module index](README.md) · Next module: [99 — Reference](../99-reference/README.md)
