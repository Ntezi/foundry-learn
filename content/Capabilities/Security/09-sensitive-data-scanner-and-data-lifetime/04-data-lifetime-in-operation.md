# 04 — Data Lifetime in operation

*Sources: [Implications of deletion policies](https://www.palantir.com/docs/foundry/data-lifetime/deletion-policies-implications/) · [Remove a deletion policy](https://www.palantir.com/docs/foundry/data-lifetime/removing-a-policy/) · [View policy activity history](https://www.palantir.com/docs/foundry/data-lifetime/view-changes-applied-policy/) · [Create policy overrides](https://www.palantir.com/docs/foundry/data-lifetime/policy-overrides/) · [FAQ](https://www.palantir.com/docs/foundry/data-lifetime/FAQ/) · checked October 23, 2026 · Ready for Review*

**Scenarios**, each a situation a policy owner meets after a policy exists: a new transaction lands, a branch is involved, someone needs a dataset kept, someone asks "was it deleted?". The rules come from the implications page; the mechanics from the four short ones.

## Scenario A — A fixed-date policy meets new transactions

**[Docs]** A fixed deletion date policy assigns the date to "all transactions across all branches". With a **cutoff date**, only transactions committed **before** the cutoff get a date; later ones get none. Other services' policies (Retention) aren't considered.

**[Explanation]** So without a cutoff, a fixed-date policy on a growing dataset is a time bomb for *everything*, including data that arrives the day before the date. The cutoff is what makes *delete the 2025 intake* mean the 2025 intake. Kestrel's quarterly roll-forward in [03](03-data-lifetime-concepts-and-deletion-policies.md#for-kestrel) is a fixed date **plus** a cutoff one year earlier, renewed each quarter.

## Scenario B — Latest-view-only and branches

**[Docs]** Under *keep latest view only*:

| Transaction | Deletion date |
|---|---|
| In the **latest view** on a branch the policy covers | None. "A transaction will not be marked for deletion if it is in the latest view on any one policy branch" |
| **Not** in the latest view, even if in an older view on a covered branch, or the latest view on a branch the policy **doesn't** cover | The creation date of the newest transaction |

**[Docs]** When a new transaction arrives: on an **uncovered** branch, it gets a deletion date equal to its own creation date; on a covered branch **without** a new view (an update), no date; on a covered branch **with** a new view (a `SNAPSHOT`), no date for itself, and the dataset is re-evaluated so the previous views get dates. Downstream datasets inherit the date, or its absence, from their parents.

**[Explanation]** Two surprises here. First, a development branch not listed in the policy is **deleted on sight**: every transaction on it is marked for deletion as it's created. A policy must list every branch whose data should live, which for Kestrel means the global branches developers use ([DevTools 06-01](../../DevTools/06-branching-and-cross-app/01-global-branching.md)). Second, "latest view only" on an `APPEND` dataset does nothing to old appended transactions while they remain part of the current view; it's a snapshot-dataset policy, which is one more reason the transaction types of Kestrel's pipelines need recording ([04-03](../04-securing-data-and-applications/03-protecting-sensitive-data-and-requesting-justification.md)).

## Scenario C — Someone needs a derived dataset kept

**[Docs]** A **policy override** "breaking the inheritance of deletion dates from upstream transactions", for cases where "successful aggregations or minimizations render datasets exempt from deletion requirements". **Officer only.** From the dataset's *Details > Lineage-aware retention policies*:

| Override | Effect |
|---|---|
| **Override inherited policies** (with a superseding policy) | Replaces the inherited policy on this dataset and everything downstream with the chosen one; applies immediately. A downstream dataset that already has a different policy "through another lineage" is **not** changed |
| **Override without superseding policy** | Removes all deletion dates from the dataset and everything downstream; those transactions "may not have deletion dates" at all |

**[Explanation]** The override is the deliberate seam between *delete the source* and *keep the derived*. An aggregate (orders per region per month) contains no customer, so the regulation that deletes the customer doesn't reach it; the override is where that legal judgment is recorded in the system. Because it's officer-only and a Checkpoints type exists for it, the judgment has a name and a reason attached.

## Scenario D — Removing a policy from a dataset

**[Docs]** In the application: *Policies* tab, the policy, *Root datasets*, the dataset's menu, *Remove policy from dataset*, confirm.

**[Explanation]** Removing a policy stops **future** assignment; the FAQ's 30-day store lag (Scenario F) means transactions already marked may still be deleted. Treat removal as "no new dates", not "undo".

## Scenario E — *Was it deleted, and who did what?*

**[Docs]** A policy's **History** tab lists every action on it, latest first: **Applications** (a dataset added) and **Removals** (a dataset removed). The FAQ is explicit that Removals "only refers to when a dataset was removed from a policy", not to data deletion. Deletions, actual and pending, are in the **Deletions** tab, filterable by transaction ID (found on the dataset's *History* tab under *Transaction RID*) or time range.

## Scenario F — The FAQ's four answers

**[Docs]** Policies apply to **datasets only**, not media sets or model assets. Large deletion requests are **rate limited** (policy evaluation and transaction deletion), which also caps compute. After a new `SNAPSHOT` under latest-view-only, transactions are marked "at multiple points during the day", but the stores underneath (S3 is named) take time: "the longest duration you can expect for data to be fully deleted is around **30 days**".

**[Explanation]** The 30 days matters for any promise Kestrel makes to a customer or regulator: "deleted" means marked now, gone within about a month. Write the promise that way.

## For Kestrel

**[Example]** Completing [03](03-data-lifetime-concepts-and-deletion-policies.md#for-kestrel)'s proposal, *adopted* in Phase 7 ([11-03](../11-kestrel-case/03-the-customer-data-lifecycle.md)):

- **Override with superseding policy** on `customer_master`: the inherited `customer-source-365` is replaced by `customer-master-indefinite`, a fixed-date policy with a far-future date and a cutoff in the past, so the master record outlives its sources while still being governed by *some* policy whose history is visible. Lena's quarterly review ([06-01](../06-approvals-and-checkpoints/01-approvals.md#for-kestrel)) includes the override's checkpoint record.
- **Branch coverage:** `customer-source-365` lists `master` only. Developers' global branches on the source datasets are therefore short-lived by construction, which matches [DevTools 06-01](../../DevTools/06-branching-and-cross-app/01-global-branching.md)'s branch lifecycle; the risk is recorded so nobody keeps a long-running branch on a source dataset.
- **The customer-deletion promise** in Kestrel's privacy notice reads *removed from our systems within 30 days of the retention date*, not *immediately*, and the Deletions tab is the evidence.
- **Not adopted:** latest-view-only on any Kestrel dataset for now; the only snapshot datasets whose history Kestrel would purge are the ones a fixed-date policy already covers.

---
[Module index](README.md) · Previous: [03 — Data Lifetime concepts and deletion policies](03-data-lifetime-concepts-and-deletion-policies.md) · Next module: [10 — Privacy, governance and enterprise security](../10-privacy-governance-and-enterprise-security/README.md)
