# 03 — Data Lifetime concepts and deletion policies

*Sources: [Data Lifetime](https://www.palantir.com/docs/foundry/data-lifetime/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/data-lifetime/core-concepts-data-lifetime/) · [Getting started](https://www.palantir.com/docs/foundry/data-lifetime/getting-started/) · [Create a deletion policy for a dataset](https://www.palantir.com/docs/foundry/data-lifetime/creating-a-deletion-policy/) · checked October 23, 2026 · Ready for Review*

A **concept note with a permission matrix**. Data Lifetime is the one tool in this area whose mistakes **destroy data**, so the note spends as long on who may touch a policy as on what a policy does. [04](04-data-lifetime-in-operation.md) covers what happens after a policy is applied.

## What it is

**[Docs]** Data Lifetime sets **lineage-aware retention policies** on datasets: they "govern the deletion of transactions within a dataset on which they are applied, along with any downstream datasets". The privacy rule: "define retention deliberately rather than keep data by default". Regulations may require deleting data **and all its descendants**; which ones is a question for "your organization's legal and privacy teams".

**[Concept]** The idea is the propagation model of [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md) applied to **deletion**: a deletion date assigned to a source transaction follows that transaction's descendants through derivation, so deleting the raw record also deletes every row that was computed from it.

## Two kinds of policy

**[Docs]** Policies are defined "at the namespace level" (the space, [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#spaces-the-container-with-the-settings)) and applied to datasets in it; once applied, every transaction gets a deletion date by the policy's rule:

| Policy | Rule | Typical use |
|---|---|---|
| **Fixed deletion date** | Every transaction in the root dataset gets the same deletion time, unless a **cutoff date** limits it to transactions committed before the cutoff | *Delete this intake and everything derived from it on 1 March* |
| **Latest view only** | Transactions **not in the current view** are marked for deletion now; transactions in the latest view get no date | Keep only the current snapshot; purge history as it's superseded |

### Not the same as the Retention application

**[Docs]** **Retention policies** (the Retention application) delete transactions by rule but "are not lineage-aware and thus do not propagate to downstream datasets". Data Lifetime policies propagate, and the docs suggest applying them to **root or upstream** datasets, which Retention doesn't require. Both can exist on one enrollment, but Data Lifetime "does not consider other retention policies": if Retention will delete a transaction on Tuesday and Data Lifetime says Wednesday, Data Lifetime reports Wednesday.

**[Explanation]** So a Data Lifetime deletion date is a **latest** date, not an exact one. Anything else on the enrollment may delete sooner. For a legal hold that means data must be **kept**, Data Lifetime can only promise what its own policies do; Retention has to be checked separately.

## Who may do what

**[Docs]** The role that matters is the **Data Governance Officer** (Control Panel). Default roles: *Namespace Viewer* can view policies; *Dataset Editor* can set and remove policies on datasets; the officer can create, update and delete policies for namespaces they can view, and set, remove and **override** policies on datasets they can view.

**[Docs]** Two matrices. Actions **only an officer** can take, with the extra permission each needs:

| Action | Needs (as officer) |
|---|---|
| Create a policy | Namespace Viewer |
| Update or delete a policy | Namespace Viewer or Policy Viewer |
| Set or remove a policy on a dataset | Namespace Viewer, Policy Viewer or Dataset Viewer |
| Set a policy **override** on a dataset | Namespace Viewer, Policy Viewer or Dataset Viewer |

Actions **any user** can take, by permission held:

| Action | Namespace Viewer | Policy Viewer | Dataset Viewer | Dataset Editor |
|---|---|---|---|---|
| View a policy | Yes | Yes | | |
| View the policies on a dataset | Yes | Yes | Yes | |
| Set a policy on a dataset | Yes | Yes | | Yes |
| Remove a policy from a dataset | Yes | Yes | | Yes |

**[Explanation]** Read the two tables together: a **Dataset Editor** can apply an existing policy to their own dataset and so start a lineage-wide deletion, but cannot **create** a policy or **override** one. Creating defines what "delete" means; overriding stops a deletion from propagating. Both are officer-only. That split is the safeguard: the people who build pipelines can use the policies the governance officer wrote, and nobody can quietly exempt a dataset from one.

**[Docs]** The getting-started page's warning: policy changes "can cause significant impacts on data integrity, including accidental data loss or retaining data longer than legally allowed"; restrict the privilege to trusted users; overrides need a higher level still; and integrate with **Checkpoints** so applying or removing a policy requires a justification ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md): the *Retention policy application* type).

## Creating and applying a policy

**[Docs]** The Data Lifetime application is under *Applications > Security & governance*. Steps: *+ New Policy* with name, type and deletion date; *Create policy* lands on its configuration page; *Apply to dataset*; choose the dataset; *Select*; a green success message confirms. Policies can also be set from a dataset's *Details > Lineage-aware retention policies*, though the application is recommended. You need the officer role or Dataset Editor.

**[Recommendation]** Apply at the **root**. The docs say so for a reason that follows from the model: a policy on a derived dataset deletes that dataset's transactions and their descendants, but not the raw source they came from, so the sensitive data survives upstream where fewer people look.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), one policy to start, and one deliberately not created:

- **`customer-source-365`**, a **fixed deletion date** policy rolled forward by Priya's team each quarter (the docs offer no relative "N days" policy, so a fixed date with a cutoff is renewed on a schedule), applied to the **root** `CustomerSourceRecord` datasets in `Storefront [Datasource]` ([Ontology 15-04](../../Ontology/15-advanced-patterns/04-entity-resolution-across-sources.md)): raw source records older than a year are deleted with every derived row, including `MatchCandidate`s. `customer_master` is **not** affected by design, because it is produced from the records with an **override** (next note), the aggregation the override exists for.
- **No policy on the ledger.** Payment records have a statutory retention that is longer than Kestrel would ever choose to delete, and Data Lifetime cannot promise *keeping* anyway. The Kestrel Pay projects use the Retention application only, if at all, and that is a question for Lena and legal, logged as open.
- **Officers:** the same two people as for SDS ([02](02-match-conditions-match-actions-best-practices-and-media-sets.md#for-kestrel)); Priya's group holds Dataset Editor and can apply `customer-source-365` to a new source dataset but can neither change the date nor override.

---
[Module index](README.md) · Previous: [02 — Match conditions, match actions, best practices and media sets](02-match-conditions-match-actions-best-practices-and-media-sets.md) · Next: [04 — Data Lifetime in operation](04-data-lifetime-in-operation.md)
