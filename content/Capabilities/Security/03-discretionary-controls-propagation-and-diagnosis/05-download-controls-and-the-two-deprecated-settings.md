# 05 — Download controls and the two deprecated settings

*Sources: [Download controls](https://www.palantir.com/docs/foundry/security/download-controls/) · [Migrate from and disable "Propagate view requirements" setting](https://www.palantir.com/docs/foundry/platform-security-management/disabling-propagate-view-requirements/) · [Migrate from and disable "Ignore inherited permissions" setting](https://www.palantir.com/docs/foundry/platform-security-management/disabling-ignore-inherited-permissions/) · checked October 23, 2026 · Ready for Review*

Two halves. First a **defence-in-depth sheet** for downloads, the point where [01](01-access-control-propagation.md)'s model runs out. Then two **migration runbooks** for settings that are being retired because they did, badly, what projects and markings now do well.

## Part 1 — Download controls

**[Docs]** A download is "an action a user can take in a platform to transfer data to their local machine": *Download as CSV* on a dataset, Contour's Export board, Excel or CSV export from Workshop. Limiting downloads for users who don't need them upholds least privilege and guards against "inadvertent data spills".

**[Docs]** Why it's not comprehensive: downloads are one route out. Automated exports, calls to external systems and webhooks each have their own controls; clipboard, screenshots and printing are transfers too. "Download controls should always be coupled with other strategies".

### The four layers

| Layer | **[Docs]** what it does | **[Docs]** limitation |
|---|---|---|
| **Roles** | Viewer, Editor and Owner can all download; only **Discoverer** lacks download operations. A custom role can remove download workflows while keeping other privileges | Enforcement **varies by enrollment**: on enrollments configured to restrict downloads, removing `foundry-data-proxy:get-files` (*Download*) from a role prevents downloads; on others it may not if the role still grants read. "contact Palantir Support to confirm how downloads are enforced for your enrollment." Some downloads (SAML metadata) are governed in Control Panel, not by roles |
| **Checkpoints** | A reminder, acknowledgement or **justification** before the download; records reviewable in the Checkpoints app. Enable by configuring every checkpoint type in the **Download** category (their names usually contain *Export*, e.g. *Notepad Export*) | Not every download action has a checkpoint |
| **Cipher** | Sensitive values encrypted by default stay encrypted in the file if downloaded; only holders of the key permissions can reveal them in Foundry | Only values in datasets and objects can be encrypted |
| **Audit logs** | Retrospective: the `dataExport` category covers downloads ([10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md)) | After the fact |

**[Docs]** On enrollments that enforce download operations, the common pattern is to **remove the download operations from the default roles** in a custom role set and grant them back through a dedicated role such as **Exporter**. Then any workflow that reads a resource's files needs that role, **even for the Owner**: packaging a dataset with static data into a Marketplace product reads the files, so the packager needs `foundry-data-proxy:get-files` whatever their role.

**[Explanation]** The role layer is the only one that *prevents*; the other three *discourage, degrade or record*. And whether the role layer prevents anything at all depends on the enrollment. So the honest design is: ask Palantir how your enrollment enforces downloads; if it does, build the Exporter pattern; in every case add the checkpoint and read the `dataExport` logs, because those don't depend on the answer.

## Part 2 — "Propagate view requirements" (planned deprecation)

**[Docs]** When enabled on a project, every dataset in it "will require users to have access permissions to view its downstream datasets", in this project or any other. Most enrollments lost the setting in **October 2024**; the rest are "strongly encouraged" to migrate to projects and markings, which "offer improved security legibility". Once disabled it **can't be re-enabled**.

**[Explanation]** It was marking-like propagation keyed on a project's **roles**. The problem is legibility: a user failing downstream couldn't see *which* upstream requirement they failed, and the requirement wasn't named anywhere. A marking is the same propagation with a name, a membership list and administrators.

### Runbook

**[Docs]** Everything runs from **Upgrade Assistant**, which lists the projects with the setting on and clears each one's pending action when done.

1. **Classify.** Does the project hold sensitive data at all (PII, financial, anything regulation or the data owner calls sensitive)? If not, go to step 4. If so, categorize: "Datasets X, Y, and Z in this Project contain PII, and datasets A, B, and C in this Project contain Financial Information".
2. **Check existing markings.** In Data Lineage with *Permissions* colouring, shield icons show marked resources. If every sensitive dataset already carries the right marking, directly or inherited, the setting "is likely redundant and can be safely disabled".
3. **Mark what isn't marked, as far upstream as possible.** The page's approach 1 (incorrect): mark the sensitive dataset in this project, leaving the upstream it derives from unmarked. Approach 2 (recommended): mark the **upstream**, and let it propagate. Reuse an existing marking for the category (one PII marking, not two) and create a new one only when the data is unique **and** originates here. Before applying: add everyone who currently has access to those datasets as **members** of the marking so nobody loses access (noting they then see that marking's data platform-wide), then follow the apply procedure in [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#applying-a-marking-to-a-live-pipeline). Mark the whole project only if all its data is one category; otherwise the datasets or their folder.
4. **Disable** the setting in the project's *Settings* tab.
5. **Confirm** in Upgrade Assistant.

## Part 3 — "Ignore inherited permissions" (planned deprecation)

**[Docs]** When enabled on a folder or file, every permission on it and its children is **revoked unless explicitly added** there: Viewer on the project no longer gives Viewer on that folder. Most enrollments lost it in **December 2024**. Once disabled it **can't be re-enabled**. If Upgrade Assistant shows *Update required*, run the update first: it separates this migration from the *Propagate view requirements* one.

**[Explanation]** This was a project inside a project: a sub-tree with its own grants, invisible from the project's access panel. The replacement is to make it an actual project, or to say what's special about it with a marking.

### Runbook

**[Docs]** Choose by asking:

| Option | Ask |
|---|---|
| **Just disable** | Was it enabled for legacy reasons no longer relevant? Does the folder need separate permissions at all? |
| **Move to another project** | Does a project with the stricter permissions and a similar set of users already exist? You need Editor on the destination; review its permissions first and add users to mirror the old folder's |
| **Create a new project** | Does the data need its own space? Has the folder grown large enough? Assign the same permissions the folder's users had, then *Move* |
| **Apply an existing marking** | Is the data sensitive, is there a marking that means this, and do you want downstream protection? Add the folder's users as members first |
| **Create a new marking** | Sensitive **and** unique; same membership step |

Then disable the setting in the folder's or file's *Settings* tab (an emptied folder can usually be deleted) and confirm in Upgrade Assistant.

**[Recommendation]** Across both migrations the page repeats one instruction: **add the current users as marking members before applying the marking.** Do it even when it feels like over-granting. A migration that locks people out gets reverted in a hurry, and the hurried fix is usually worse than either setting was.

## For Kestrel

**[Example]** Kestrel's enrollment is recent enough that neither deprecated setting was ever used; the runbooks are reference. Download controls, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Ask Palantir** whether the enrollment enforces download operations. Recorded as an open item, not assumed.
- **If enforced:** a `kestrel` role set in which Viewer, Editor and Owner lose `foundry-data-proxy:get-files`, plus an **`Exporter`** role granted to Lena's finance group (regulatory reporting) and to the DevOps release group (packaging the Delivery Desk product, [DevTools 09-03](../../DevTools/09-kestrel-case/03-delivery-desk-product-release.md)). Customer-service agents don't get it.
- **Regardless:** download checkpoints with **justification** on every *Export* type, reviewed weekly by Lena's team for `Payments [Ontology]` ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md)); `dataExport` audit events from the payments projects fed to the monitoring in [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md); Cipher on card numbers in `Payment` ([07-01](../07-cipher/01-cipher-concepts-and-getting-started.md)), so a downloaded ledger carries ciphertext.

---
[Module index](README.md) · Previous: [04 — Diagnosing access](04-diagnosing-access.md) · Next module: [04 — Securing data and applications](../04-securing-data-and-applications/README.md)
