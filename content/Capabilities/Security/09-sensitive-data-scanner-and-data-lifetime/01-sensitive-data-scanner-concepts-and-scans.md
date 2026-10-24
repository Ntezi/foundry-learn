# 01 — Sensitive Data Scanner concepts and scans

*Sources: [Sensitive Data Scanner](https://www.palantir.com/docs/foundry/sensitive-data-scanner/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/sensitive-data-scanner/core-concepts/) · [Create a sensitive data scan](https://www.palantir.com/docs/foundry/sensitive-data-scanner/create-a-sensitive-data-scan/) · checked October 23, 2026 · Ready for Review*

A **scan design walkthrough**: what the scanner does, then the four screens of a scan with the decision each one asks. Match conditions and actions get their own note ([02](02-match-conditions-match-actions-best-practices-and-media-sets.md)); this one is about choosing **what** to scan and **when**.

## What it is

**[Docs]** Sensitive Data Scanner (SDS, formerly *Foundry Inference*) lets governance users "specify patterns of sensitive data to identify, along with the appropriate automated action to take when such sensitive data is found", as a **one-time** scan or **recurring** scans. The privacy rule: "discover sensitive data early so teams can minimize its use and apply protections before it spreads". It may be off by default; enable it in Control Panel under the organization's *Application access*, *Security and governance* section.

**[Concept]** Three parts: **match conditions** (how to recognise sensitive data: regular expression, overlap with a known list, or a language model), **match actions** (what to do on a match: create issues, apply markings, obfuscate with Cipher), and **scans** (which resources, which conditions, which actions, how often).

**[Explanation]** SDS is the first control in this area that works on **content** rather than on containers or identities. Everything in modules 01–03 assumes someone already knows which dataset is sensitive. The scanner is how that knowledge is produced, and kept current, for data that arrives faster than anyone can review it.

## Screen 1 — Resources to scan

**[Docs]** Resource types: **datasets, virtual tables, media sets** (audio, document and image formats). **Included** datasets and folders (at least one folder, project or space, or dataset); **excluded** ones; when both apply, "the most specific inclusion or exclusion will take precedence" (an included dataset inside an excluded folder is scanned).

**[Docs]** Scan strategy, three choices:

| Choice | Options | **[Docs]** guidance |
|---|---|---|
| **Transaction types** | **Scan only source datasets** (the recommended option: monitor "the “data boundary” in Foundry" without scanning everything), with checkboxes to narrow by type (manually entered, uploaded, Data Connection syncs…) and an opt-in for **virtual tables** (their source systems must be reachable at scan time); or **Scan all datasets**, including derived, at more compute | Source only |
| **Rows** | **Scan all rows** (the only way to guarantee correctness; can be slow) or **a random subset** (the count is approximate; smaller datasets are scanned whole) | All rows for a decision; a subset for tuning |
| **Schedule** | **One-time** (runs now; later datasets aren't scanned); **Recurring**: daily (00:00 UTC), weekly (Tuesday 00:00 UTC), monthly (the 1st, 00:00 UTC) or **continuous** (whenever new data is added), optionally with an initial scan of everything | |

**[Docs]** Included and excluded **markings**: an advanced filter "generally used to exclude datasets that already are protected", for example skipping anything already marked PII because a previous scan may have marked it.

**[Explanation]** "Source datasets only" is the design idea behind the whole tool. Sensitive data enters Foundry at a boundary (a sync, an upload, a virtual table) and then propagates by derivation; if the boundary is marked, propagation does the rest ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#two-ways-a-marking-is-inherited)). Scanning derived datasets mostly rediscovers what the marking already says, at the cost of reading every row again.

## Screen 2 — Match conditions

**[Docs]** Pick from the conditions available in the space, or create one here ([02](02-match-conditions-match-actions-best-practices-and-media-sets.md)). With a language model condition, "LLM usage is attributed to each scanned resource".

## Screen 3 — Match actions

**[Docs]** **Create issues** (tell named users), **Apply markings** (put access controls on matching datasets), **Obfuscate data** (encrypt or hash with Cipher), or **no action**. The boxed advice: on a large scan, run first with **No Match Actions**, verify the matches, then add actions from the scan's overview page; "Misconfigured match conditions may generate false positives, leading to unwanted issues, markings on datasets, or obfuscated data."

## Screen 4 — Review and run

**[Docs]** SDS computes the dataset list from the filters; *Run One-Time Scan*, or name and *Save as Recurring Scan*.

## After the scan: adding and reversing actions

**[Docs]** For **inactive scans created within the past seven days**:

| | Additional actions | Reversal |
|---|---|---|
| What | Apply more match actions to what the scan found | Delete the issues it created; remove the markings it applied. **Obfuscation can't be reversed** |
| Recurring scans | Apply only to matches found so far; future matches after reactivation **don't** get them | Reverses only results so far; a reactivated scan applies the original actions again unless you **edit the scan** to remove the action first |

**[Explanation]** The seven-day window and the "edit before reactivating" rule are the two things that go wrong in practice. A marking applied by a scan a month ago can't be undone from the scanner; it's removed by hand with *Remove marking* permissions ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking)). And reversing a recurring scan's markings without editing the scan reapplies them at the next run.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), two scans:

| Scan | Resources | Strategy | Conditions | Actions |
|---|---|---|---|---|
| **Boundary PII** | `Storefront [Datasource]` and `Kestrel Pay [Datasource]`, included as folders; the `/manual` upload folder ([08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md#for-kestrel)) included explicitly | Source datasets only (syncs, uploads, manually entered); all rows; **continuous**; exclude anything already marked `Customer PII` | Email, phone, the built-in card-number condition, plus a Kestrel customer-ID overlap ([02](02-match-conditions-match-actions-best-practices-and-media-sets.md#for-kestrel)) | **Apply `Customer PII`** (not reapplying manually removed markings) and **create issues** for Priya's group |
| **Carrier invoices** | The carrier invoice media set ([AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md)) | Weekly; subset while tuning, then all | A language-model condition for personal names and addresses in invoice text ([02](02-match-conditions-match-actions-best-practices-and-media-sets.md#media-sets)) | **Create issues** only, for Lena's team; no marking, because the media set is already inside the marked payments projects |

Both are first run with **No Match Actions** for one cycle, as the docs say, before the actions are switched on. No **Obfuscate** action anywhere: it needs an Admin licence, which [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#for-kestrel) decided Kestrel doesn't issue, and its outputs can't be reversed.

---
[Module index](README.md) · Next: [02 — Match conditions, match actions, best practices and media sets](02-match-conditions-match-actions-best-practices-and-media-sets.md)
