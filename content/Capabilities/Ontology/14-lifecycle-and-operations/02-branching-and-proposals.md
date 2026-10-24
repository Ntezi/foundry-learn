# 02 — Branching and proposals

*Sources: [Global Branching](https://www.palantir.com/docs/foundry/global-branching/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/global-branching/core-concepts/) · [Integrations](https://www.palantir.com/docs/foundry/global-branching/integrations/) · [Branch security](https://www.palantir.com/docs/foundry/global-branching/branch-security/) · [Resource protection and approval policies](https://www.palantir.com/docs/foundry/global-branching/resource-protection-and-approval-policies/) · [Branching the ontology](https://www.palantir.com/docs/foundry/ontologies/branching-ontology/) · [Review ontology proposals](https://www.palantir.com/docs/foundry/ontologies/review-ontology-proposals/) · [Ontology branches (legacy)](https://www.palantir.com/docs/foundry/ontologies/ontology-branches-legacy/) · [Branching action types](https://www.palantir.com/docs/foundry/action-types/branching-action-types/) · checked October 3, 2026 · Ready for Review*

This note follows **one branch from birth to merge**: `case-interface`, the branch on which Daniel introduced the `Case` interface ([07](../07-interfaces/README.md)). Each stage has a short story and the doc rules behind it.

## Which branching?

**[Docs]** There are two systems:

- **Global Branching**, formerly *Foundry Branching*, covers pipelines, datasets, the Ontology, Workshop, functions, actions, automations, Object Views, restricted views and more, all on **one branch**.
- **Legacy ontology branches**, formerly called *ontology proposals*, are being **sunset**. "On enrollments with Global Branching enabled, you can no longer create ontology branches."

When a Global Branching proposal includes Ontology changes, an **ontology proposal** is created automatically to track them.

**[Docs]** Global Branching is **not** release management. A branch develops a change in isolation. Release management moves versions between **environments** (dev, test, prod) using Marketplace installations ([04](04-marketplace-packaging.md)). The docs call the two "complementary solutions to different problems".

## Day 1 — Create the branch

Daniel opens the branch selector in Ontology Manager and creates `case-interface`, choosing the **`kestrel-dev`** ontology. `Case` ships to production inside the Delivery Desk product, so it's developed in dev ([04](04-marketplace-packaging.md#which-environment-changes-what)).

**[Docs]**

- Branch **only from main**.
- The **ontology chosen at creation is fixed**. You can't change things outside it on that branch.
- The branch's **space** follows from the ontology, and decides the organizations allowed, who administers it and the retention policy.
- **Organizations** gate access. "Choose a name that does not include sensitive information", because branch names can be seen outside the branch's organization restrictions.
- Whoever creates the branch becomes its **Owner**. Owners manage roles and proposals, and can set **Do not merge**. Space administrators have the same powers.
- **Branch roles don't grant edit rights.** You still need edit permission on each resource.

## Days 1–4 — Work on the branch

Daniel creates `Case`, implements it on Support Ticket, Chargeback and Fraud Case, and adds an *Escalate case* constraint.

**[Docs]** On a branch, Ontology resources can be created, modified or deleted **without affecting main**. Other Foundry resources are different: "creating or deleting Foundry resources on a branch will affect main".

**Testing on the branch.**

- **[Docs] Indexing.** Object types must be **indexed on the branch** before you can preview data or run actions. The proposal's **Preview status** tab shows which are indexed. **Indexing counts as a modification**. On protected resources it needs policy approval to merge, unless you remove the indexing changes first.
- **[Docs] Actions** run on the branch, but "Action edits on a branch are for testing only and will not be merged back into main". To keep tests safe, these are **off by default**:
  - **webhooks** don't execute;
  - **functions with external calls fail**;
  - **notifications** aren't sent.

  Each can be enabled per action type under *Security & Submission Criteria*. If you enable them, they hit the **real** external systems. Branch notifications can go to the **branch owner** instead of the real recipients.
- **[Docs] Functions.** TSv2 and Python functions are branchable only with a **local Ontology SDK**. The OSDK itself "is not currently branchable".

**[Explanation]** Daniel tests *Escalate case* with notifications set to *branch owner*, so support leads don't get test emails. He leaves the WMS webhook off. The Delivery Desk's TSv2 function uses a local SDK, so it can read the branched `Case` schema.

**What can't be branched yet.** **[Docs]** Object types created in **Pipeline Builder** "are not modifiable in Ontology Manager on a branch". **[Explanation]** Kestrel created `Shipment` in Ontology Manager ([04-04](../04-object-types/04-creating-and-editing-object-types.md#part-a--create-shipment)), so it can be changed on the branch. A type created as a Pipeline Builder output couldn't be. Its changes would go through the pipeline on the same global branch. Record how each type was created, because it decides where it gets edited.

## Day 3 — Main moves on

Priya adds `Shipment.trackingUrl` on main. Daniel's branch now shows a blue indicator on **Main branch updates**.

**[Docs]**

- If a branch has **no** Ontology changes, rebasing is automatic. Once it **has** Ontology changes, including indexing, you **rebase manually**.
- **Rebase branch** pulls in main's changes. Non-conflicting changes merge automatically.
- **True conflicts** (the same property of the same resource changed on both sides) need a choice: *Use Main branch changes*, *Keep current branch changes*, or a custom edit that resolves it. Then **Finish rebase and save**.
- **Known traps:**
  - if main **replaced or removed a datasource**, or a **conditional formatting rule set**, keeping your branch version makes the **merge fail**. Choose main's version.

## Day 5 — Proposal and review

**[Docs]**

- **Create proposal** from the branch taskbar. That needs branch Owner, or space administrator. **Checks** run straight away: conflicts with main, and required approvals.
- Each Ontology resource is a separate **task** with its own approval. Reviewers are grouped under **one ontology proposal**, so adding a reviewer to one resource adds them to all of them. Only users in a resource's project policy are *required* for that resource.
- **Approval policies** for **protected** resources come from the **project**, and can be default or custom:
  - **Default**: approver and contributor need edit access. "Satisfied automatically, when the contributor's own permissions cover the policy."
  - **Custom**: eligible reviewers, the number of approvals, and whether **contributors may approve**.
- **One rejection blocks the resource** until the rejecting user approves.
- "Users with approval rights can approve proposals even if not added as reviewers." **[Docs]** The docs say to use the reviewer list to track reviews, not to restrict them. Protect resources with roles and policies.

**Kestrel's custom policy on `Commerce [Ontology]`:** two approvals from *ontology-governance*, with **contributor approval off**. So Daniel can't approve his own `Case` interface, even though he has edit access.

## Day 6 — Merge

**[Docs]**

- Merge from the branch taskbar or the Global Branching app. **Anyone who can view the proposal** can merge once approvals and checks pass, unless **Do not merge** is set.
- The person merging may be applying changes they couldn't make themselves. That's by design.
- Build options at merge: **build all affected**, **modified only**, or **none**.
- A **partially failed merge can't be reverted**. Fix the errors and merge again.

**[Explanation]** Kestrel uses **build all affected** for Ontology merges. A new interface implementation doesn't need rebuilds, but a datasource change on the same branch would.

## After — the branch's life cycle

**[Docs]** A branch moves through these states:

- **Active.**
- **Inactive**, automatically after **35 days** of no activity by default. Ontology resources are **de-indexed**, data is deleted **7 days** later, and builds fail.
- **Archived**, manually. Same effects as inactive, but it can be restored.
- **Merged**, which is terminal.

Reactivating a branch may need a **no-op change** to re-index Ontology resources.

**[Explanation]** A long design review can push a branch past 35 days. Owners get an email and an in-platform notice. Reactivate it before the deadline, or expect to re-index.

## Legacy ontology branches, in brief

**[Docs]** On enrollments without Global Branching:

- An ontology branch *is* a proposal, created together with it.
- Reviewers must be editors or owners. Proposers with edit rights on everything can **approve their own changes**.
- Anyone who can edit the branch can merge an approved proposal.
- Proposals **can't be reverted automatically** and **can't be reopened** once closed.

**[Explanation]** The self-approval rule is the main governance gap. On a legacy enrollment, Kestrel would limit editor roles instead of relying on reviewers.

<!-- devtools-go-deeper -->
**Go deeper in the DevTools area:** [06 — Branching and cross-app interactivity](../../DevTools/06-branching-and-cross-app/README.md)

---
[Module index](README.md) · Previous: [01 — Saving, reviewing and restoring](01-saving-reviewing-and-restoring.md) · Next: [03 — Schema evolution and breaking changes](03-schema-evolution-and-breaking-changes.md)
