# 02 — Match conditions, match actions, best practices and media sets

*Sources: [Create match conditions](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-match-conditions/) · [Create Match Actions](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-match-actions/) · [Best practices](https://www.palantir.com/docs/foundry/sensitive-data-scanner/best-practices/) · [Media set scanning](https://www.palantir.com/docs/foundry/sensitive-data-scanner/media-set-scanning/) · checked October 23, 2026 · Ready for Review*

A **reference sheet** for the two building blocks of a scan, then the docs' operating rules and the media-set variant. Read [01](01-sensitive-data-scanner-concepts-and-scans.md) first for where these fit.

## Match conditions

**[Docs]** Built-in conditions cover common PII (Social Security numbers, emails, phone numbers), but "their effectiveness varies based on your specific data structure and format"; check them against your data and make custom ones. Custom conditions are created from the SDS landing page (*Add* under *Custom Match Conditions*) or inside a scan (*Create new match condition*), and belong to the **space**.

| Type | How it matches | Options | When |
|---|---|---|---|
| **Regular expression** | A **content regex** against cell values, a **column name regex** against headers, or both combined: content, column name, both, or either | **Content threshold**: the percentage (over 0, up to 100) of a column's cells that must match for the dataset to count; unset means one match is enough. *Generate Regex with AI* writes the regex from a description such as "all email addresses" and shows matching examples | Data with a shape |
| **Language model** | An LLM classifies content, column names, both or either against a natural-language prompt, with optional correct and counter examples and a *Full prompt preview* | A model must be selected; usage is attributed to each scanned resource; "Scans that evaluate all rows with language model match conditions can be slow and costly" | Data that can't be written as a regex or a list |
| **Overlap** | A cell equals any value in a chosen column of an existing dataset that already holds the sensitive values (the example: `EL_employee_name` in `accounts_with_context`) | | Names and other things you have an exhaustive list of |

**[Explanation]** The threshold turns a regex from a detector of **mentions** into a detector of **columns**. One email in a free-text notes column is a mention; a column that is 95% emails is a contact column. For the *Apply markings* action, you want the second, because the first marks every dataset with a stray address in a comment.

## Match actions

**[Docs]** Created from the landing page (*Add* under *Available match actions*) or inside a scan.

| Action | **[Docs]** settings | Reversible from SDS? |
|---|---|---|
| **Apply markings** | The marking(s); **Reapply markings that have been manually removed** (off by default: a marking SDS applied and a user removed stays removed) | Yes, within 7 days ([01](01-sensitive-data-scanner-concepts-and-scans.md#after-the-scan-adding-and-reversing-actions)) |
| **Create issues** | Assignees (the example: *Governance admin*, *Data control officer*); issue text, label, severity; **notify the dataset creator**; don't open a new issue if a previous one was **archived** or **closed** | Yes, within 7 days |
| **Obfuscate data** | A Cipher **channel** (AES GCM SIV, AES SIV, SHA-512 or SHA-256; **no visual obfuscation**) and an **Admin licence**, "as it requires cryptographic key access"; the licence must be **in the same project** as the scanned resources; one **output dataset per scanned dataset**; mode: entire column (default), entire row, matched cell only, matched segments only | **No**; created datasets are deleted by hand. "We recommend running this scan on a small amount of data" |

**[Explanation]** The *reapply* default encodes a judgment: a human who removed a marking knew something the scanner doesn't. Turn it on only where the policy is that no human may unmark without a change in the scan, which is a strong position and should be written down as such.

## The docs' operating rules

**[Docs]** SDS "should be used by those with some baseline proficiency in Foundry". The rules:

- **Compute.** Scan where data **enters** ("boundary" datasets); exclude subfolders whose sensitivity is known; exclude datasets already marked PII or PHI. A content regex over every row is expensive; SDS checks **column names first** and skips builds where a match is impossible, for *column name only* and *column name and content* conditions. For LLM conditions, use a row subset while tuning; *Scan all rows* only when you need complete detection before acting.
- **Markings are binary.** A scan that applies a restrictive marking by mistake "can block users from essential workflows and be hard to fix"; limit the action's scope.
- **Permissions.** A user "can only do what they are allowed to with SDS without exceeding their individual permissions on the resource". Two ways in: space roles, or the **Data Governance Officer** role plus Viewer on the space, which "grants scanning privileges like a Space Owner" without Owner on every resource.

| Action | Governance Officer + Space Viewer | Space Owner | Space Editor | Space Viewer |
|---|---|---|---|---|
| Configure conditions and actions | Yes | Yes | | |
| Manage recurring scans | Yes | Yes | | |
| Run scans | Yes | Yes | | |
| Cancel scans | Yes | Yes | | |
| View scan status | Yes | Yes | Yes | Yes |
| View conditions and actions | Yes | Yes | Yes | Yes |

**[Docs]** Editors "can only request SDS interactions based on the Owner's preferences", such as running a scan with pre-configured conditions; Viewers only see outcomes.

**[Explanation]** The officer role is the same person as the checkpoint reviewer in [06-02](../06-approvals-and-checkpoints/02-checkpoints.md#who-can-read-the-records): one organization-level governance identity that can see and act across projects without being Owner of any of them. That's the shape of a data protection officer's access in Foundry, and it's why Kestrel's version of the role is held by two named people, not a group everyone can request.

## Media sets

**[Docs]** SDS scans media sets by converting items to text, **OCR** for images and PDFs, **transcription** for audio, then running a **content-only regex** or a **content-based language model** condition; a model with **vision** can classify images directly. Issues are **aggregated**: one issue per media set however many items match. Results show matched and scanned counts, a preview of the first **ten** matches, and a detail view.

**[Docs]** Limits: OCR and transcription aren't exact (split words, changed capitalization, text found in images without text), so a regex that assumes formatting may miss; to see what SDS saw, build a Pipeline Builder pipeline with *Extract text from PDF*, *Extract text from images* or *Transcribe audio into text*. For cost: sample items, prefer weekly or monthly to continuous. Recurring media scans are **incremental** (only added or updated items; an info icon marks an incremental result); *View scan history* shows every incremental run, and a **full re-scan** is recommended after deleting PII, to confirm it's gone.

## For Kestrel

**[Example]** The conditions and actions behind [01](01-sensitive-data-scanner-concepts-and-scans.md#for-kestrel)'s two scans, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Conditions:** the built-in email and phone conditions, re-checked against Kestrel's storefront export format before use (the docs' warning); a **content regex with a 60% threshold** for card numbers, so a stray number in a note doesn't mark a dataset; a **column-name regex** `(?i)(email|phone|card|dob|birth)` as a cheap first pass; an **overlap** condition on `customer_master.customerId`, so any boundary dataset carrying Kestrel customer IDs is found even when it has no email column; for the invoice media set, a **language-model** condition with a vision model, prompt *personal names, home addresses or personal phone numbers of individuals, not company contacts*, with counter examples from real Northwind invoice headers.
- **Actions:** *Apply `Customer PII`* with reapply **off**, because Priya's `stop_propagating` decisions ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#for-kestrel)) are deliberate removals; *Create issues* assigned to Priya's group, label `sds`, severity by scan, dataset creator notified, no new issue when closed.
- **Governance Officer:** Lena and one platform administrator, each with Viewer on the `kestrel` space; nobody holds it through a group.

---
[Module index](README.md) · Previous: [01 — Sensitive Data Scanner concepts and scans](01-sensitive-data-scanner-concepts-and-scans.md) · Next: [03 — Data Lifetime concepts and deletion policies](03-data-lifetime-concepts-and-deletion-policies.md)
