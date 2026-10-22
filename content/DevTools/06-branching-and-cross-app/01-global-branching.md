# 01 — Global Branching

*Sources: [Global Branching: Overview](https://www.palantir.com/docs/foundry/global-branching/overview/) · [Global Branching: Core concepts](https://www.palantir.com/docs/foundry/global-branching/core-concepts/) · [Global Branching: Integrations](https://www.palantir.com/docs/foundry/global-branching/integrations/) · [Branch security](https://www.palantir.com/docs/foundry/global-branching/branch-security/) · [Resource protection and approval policies](https://www.palantir.com/docs/foundry/global-branching/resource-protection-and-approval-policies/) · [Global Branching application](https://www.palantir.com/docs/foundry/global-branching/application/) · [Branch taskbar](https://www.palantir.com/docs/foundry/global-branching/branch-taskbar/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Global Branching** (formerly *Foundry Branching*) lets you change resources in several applications on **one branch**, test the whole workflow without touching production, and merge it through a single **proposal**. [Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md) follows one Ontology branch from creation to merge. This note is the developer's view: which resources branch, what happens to code and builds, and the security and protection rules that 14-02 summarizes.

**[Docs]** It is not release management. A branch isolates a change; release management moves versions between environments. The overview calls them "complementary solutions to different problems": develop a large feature on a global branch, merge it into the development environment, then promote it with Marketplace ([08](../08-product-delivery/README.md)).

## What can be branched

**[Docs]** The integrations page links each application's own branching page:

| Area | Applications |
|---|---|
| Ontology | Ontology, action types, materializations, Object Views, restricted views |
| Data | Pipeline Builder, Code Repositories, Data Lineage, Workflow Lineage |
| Logic | TypeScript v1, v2 and Python functions; AIP Logic; Automate; direct model deployments |
| Apps and editors | Workshop, Developer Console and the OSDK, VS Code workspaces, Insight |

**[Docs]** Two limitations are called out:

- **TypeScript v2 and Python functions** branch fully only with a **local Ontology SDK**. Without one, a repository can reference a function version on a branch but can't change function code against branched schemas.
- **Developer Console branching** supports only TypeScript SDKs installed with **npm** in apps using **Vite 6, 7 or 8**.

## What a branch does to your resources

**[Docs]**

- Editing a resource on a branch leaves `main` alone, but **creating or deleting** a non-Ontology resource on a branch affects `main`. Ontology entities can be created, changed or deleted on the branch only.
- Some applications make you add a resource to the branch first; others add it on first save.
- **Removing** a resource from the branch returns it to its `main` version, and can break other branched resources that depend on it: check lineage first.
- **Rebasing** brings `main`'s changes in. Non-conflicting changes are merged automatically; a true conflict (the same property of the same resource changed on both sides) needs a manual choice. Each application has its own rebase screen.
- At **merge**, choose **build all affected**, **modified only** or **none**. A partially failed merge can't be reverted: the proposal page and its **Merge history** tab show which resources merged; fix the rest and merge again.

## Code and builds on a branch

**[Docs]** Code follows the branch it's checked out on. In a VS Code workspace, transforms preview and build against the active global branch, functions preview and tag against it ([05-02](../05-development-environments/02-vs-code-workspaces.md#global-branching-in-the-editor)), and OSDK apps read it through the `branch` parameter ([02-03](../02-developer-console-and-apis/03-operating-an-application.md)). Pro-code agents have their own branch rules ([04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md#branches-and-external-systems)).

**[Docs]** The lifecycle hits code hardest. By default a branch becomes **Inactive** after **35 days** without activity and its data is deleted **7 days** later (set per space in **Control Panel > Spaces > Actions > Global branch retention policy**). On an inactive or **Archived** branch, Ontology resources are de-indexed, data and logic may be deleted, and **builds fail immediately**. After reactivating or restoring:

| Resource | To restore it |
|---|---|
| Ontology entities | A no-op change (for example to a description), or reindex from the Ontology Manager banner |
| Code repositories | A no-op commit, then **build from the repository**: a first build from Data Lineage won't re-create the job specs |
| Pipeline Builder | Deploy and build again |
| Build schedules | Un-pause them: repeated failures pause schedules on the branch |

**[Docs]** Working with git directly from your machine, nothing stops you committing to an inactive or archived branch, but whatever you build there may be deleted. AI FDE refuses to modify such a branch and asks you to reactivate it.

## Who can do what

**[Docs]** Branch **roles** manage the branch; they don't grant edit rights on its resources.

| Who | Can |
|---|---|
| **Owner** (the creator by default; at least one per branch) | Edit branch and proposal metadata, manage roles and organizations, create and close proposals, remove the inactive label, archive or restore, set or clear **Do not merge**; receives branch notifications |
| **Space administrator** | The same as an owner, but **without** the notifications |
| **Anyone who can view the proposal** | Merge it, once approvals and checks pass and **Do not merge** isn't set |

**[Docs]** The merging user may apply changes to resources they couldn't edit themselves. That's deliberate: editing on the branch already needed edit permission, reviewers approve the change, and merging only applies it. One exception: Ontology resources **not yet migrated to projects** don't enforce *only editors can modify on a branch*, so they need an editor's approval.

**[Docs]** **Organizations** gate access to the branch itself; they must be a subset of the space's. When creating a branch, your own organization is preselected if the space has none or includes it; otherwise all of the space's are. Branch names can show on resources outside those organizations, so keep them free of sensitive information. The **ontology** chosen at creation fixes where you can make changes; the **space** follows from it (choose it yourself only for the default ontology) and sets the organizations, administrators and retention policy.

## Protection and approval policies

**[Docs]** A **protected** resource (branch-lock icon in Compass) can only be changed on a branch and merged with approval. Resource owners protect or unprotect from the file system, one at a time or in bulk; Workshop modules also from **Settings > Branch protection**. A project's **Branch protection** tab defines its **approval policy** and can **automatically protect new files**. Unprotected resources on a branch still need approval from a user with edit permission, which the contributor can satisfy themselves.

**[Docs]** **Default policies** come from the application that owns each resource, usually *contributor and approver need edit access*. Each is satisfied **automatically** when the contributor's permissions cover it, or **by review**. The docs' example: a resource with two policies needing permissions `X` and `Y` can be merged by a user holding both without anyone else. A **custom policy** sets eligible reviewers, the number of approvals and whether **contributors** (anyone who changed the resource on the branch) may approve; only project owners can change it, and open proposals are re-evaluated when it changes.

**[Docs]**

- Protection **moves with a resource** to a new project, which then applies its own policy. An open proposal can take up to a day to show the new policy (updating the resource or trying to merge refreshes it sooner).
- **Code Repositories** and **Pipeline Builder** keep their own branch protection and policies, defined in the resource. Opting them into project policies is planned.
- One **rejection** blocks the whole proposal until the same user approves.
- To see what applies, select the reviewer button on the proposal: **Approval policies** lists default and custom policies, **Manage reviewers** who was asked.

## The application and the taskbar

**[Docs]** The **Global Branching application** lists your open proposals and branches (active and inactive), all branches (filter by status and creator), and all proposals. A branch page shows its modified resources, space, organizations, ontology and comments; its **Security** tab manages roles. A proposal page lists each resource with its reviewers, checks and actions; the **Changes** tab shows diffs for every supported type **except Workshop, Pipeline Builder and AIP Logic**. **Archiving a branch closes its open proposal.** Proposals are **Open**, **Merged** or **Closed**; merged branches are terminal and only visible in the application.

**[Docs]** The **branch taskbar** is the blue bar at the bottom of supported applications (gray in unsupported ones). It switches branches, lists modified resources (and opens them in Workflow Lineage or Data Lineage), and walks through **Create proposal**, review and **Merge proposal**, which is enabled once all checks pass.

## For Kestrel

**[Example]** Daniel's `case-interface` branch ([Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md)) also touches code. In his VS Code workspace he runs **Palantir: Checkout Global Branch**, adds the Delivery Desk's TSv2 repository to the branch when prompted, previews its function against the branched `Case` (it uses a local SDK, so the branched schema is visible), and tags a version from the **Tags** page, which creates the tag against the branch.

**[Example]** Suppose a branch also carried a change to one of Priya's transforms and sat untouched for 35 days. Reactivating it isn't enough: she makes a no-op commit in the transforms repository and builds **from the repository**, because a build started in Data Lineage wouldn't restore the job specs.

**[Recommendation]** Kestrel's two-approval custom policy on `Commerce [Ontology]` protects only resources that are marked protected. Turn on **automatically protect new files** in that project so a new object type or action can't skip review. **Adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22.

---
[Module index](README.md) · Next: [02 — Cross-application interactivity](02-cross-application-interactivity.md)
