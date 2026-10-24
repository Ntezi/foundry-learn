# 02 — Restricted views

*Sources: [Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/) · [Branching restricted views](https://www.palantir.com/docs/foundry/security/branching-restricted-views/) · [Manage restricted views](https://www.palantir.com/docs/foundry/platform-security-management/manage-restricted-views/) · checked October 23, 2026 · Ready for Review*

A **build record**: what a restricted view is, then one built step by step, then the permissions, branching and limits that bite afterwards. The Ontology area decided that object security policies, not restricted views, are Kestrel's default for row-level access ([12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md#two-families-of-mechanism)); this note explains the alternative fully so that decision can be re-checked at the end.

## What it is

**[Concept]** A restricted view is a **read-layer resource** on top of a backing dataset. Its **granular policy** ([02-02](../02-markings-and-mandatory-controls/02-granular-policies.md)) decides which rows each user sees. It "cannot be used as an input for transforms or other batch derivation jobs that produce new datasets", but it can be the **backing datasource of an object type**, so that one row = one object and the view decides which objects a user sees. The docs' example is sales representatives who see only the customers at their branch.

**[Docs]** The policy "filters what a user can read. It does not extend to functions, actions, AIP Logic, OSDK responses, writeback operations, or exports" ([01](01-access-control-propagation.md)).

**[Docs]** A policy compares three kinds of term: **user attributes**, a **column** of the backing dataset, and a **specific value** (string, Boolean, number or array). Almost every policy has at least one user-attribute term; that's what makes it user-based. Users, groups and organizations are referenced by **UUID**, never by name. And no NOT on memberships, for the scoped-token reason in [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md#what-a-policy-can-compare).

## Building one

**[Docs]** Design the policy first; make any pipeline and project changes it needs; then, with Owner or the specific permissions below, right-click the dataset and create the view **downstream** of it. Four steps:

| Step | What you decide | **[Docs]** guidance |
|---|---|---|
| **Save as** | Name and location | Usually a **different project** from the input dataset, so consumers can have Viewer on the downstream project and nothing on the upstream. Same project is allowed if markings protect the input |
| **Compose a granular policy** | The rules | Attributes, columns, values; see [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md) |
| **Review access requirements** | Markings on the upstream dataset **and** on the view | Users who should only see data through the view "should not have access to the upstream dataset". With marking permissions you can remove inherited markings from the view, or add markings to the upstream |
| **Summary** | Confirm | *Create* starts the first build. A **build schedule** is created automatically so the view rebuilds whenever the input updates |

**[Explanation]** The *Review access requirements* step is where the propagation model shows up in the UI. Removing the inherited marking from the view is what lets people **without** the marking read their rows through it. The docs' recommendation in [01](01-access-control-propagation.md#choosing) is to keep the marking on the **backing dataset** anyway, so anyone who gets round the view, or reads a sibling view, is still bound by it.

### Marking-backed views

**[Docs]** A variant where the policy term is the user's own markings against a **column of marking IDs** in the data. Each row lists the markings a reader must hold: row 1 needs A1 **and** A2, row 2 needs B1. Requirements: the column is a `STRING ARRAY` of marking UUIDs (several such columns are allowed, and organizations may be mixed in); annotating the column with the `marking_type.mandatory` typeclass is optional but helps some interfaces render it; the rule is *user's Markings* on the left, the column on the right, one rule per column, combined with AND or OR. Uploading the sample CSV needs the inferred schema changed from `STRING` to `ARRAY` of `STRING` under *Details > Schema*.

**[Explanation]** This is per-row mandatory control without one marking per resource: the investigations example in [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#four-ways-to-structure-markings) (`Case - xxxxxx`) could be one table with a marking column instead of thousands of datasets.

## Who may do what

**[Docs]** The permissions come from the *Granular Permissions Administration* workflow in the Roles interface (special platform permissions; "contact your Palantir representative").

| Permission | Needed on |
|---|---|
| Create restricted view resource | The folder or project |
| Create restricted view for dataset | The upstream dataset |
| Edit resource granular policy / Read resource granular policy | Resources |
| Edit restricted view resource | The view (policy, assumed markings) |
| View restricted view resource | The view's properties |
| View restricted view transaction | Historical transaction metadata |

**[Docs]** To **build** a view: view access on the input dataset and edit on the view. To use one in **Contour**: *Read restricted view*. To back an **object type** with one: view access to the input dataset, edit access to the view, and membership of the Ontology admin group for Ontology Manager. To use granular policies on dataset-backed objects in Object Explorer: *View ontology data source* on the dataset.

**[Explanation]** Note the second requirement for backing an object type: whoever configures it can read the view's policy and therefore change which rows the object type exposes. That's an Ontology-admin-level act, which is why the Ontology admin group is on the list.

## On a branch

**[Docs]** Restricted views work with Global Branching ([DevTools 06-01](../../DevTools/06-branching-and-cross-app/01-global-branching.md)):

- **Adding.** From the branch selector, *Add resource*; the branch must already exist on the backing dataset. Editing the policy or markings while on a branch adds the view to the branch automatically. Adding builds the view on the branch and **re-indexes** any object types it backs. Owners can edit policy and markings on the branch; **Editors can only build** it there.
- **Viewing.** Same permissions as the parent view. **Warning:** if the backing dataset's markings differ on the branch, "a viewer may be able to see data that was previously restricted on main"; check before sharing a branch.
- **Removing** from a branch discards all branch-only changes, **can't be undone**, and leaves main untouched.
- **Propagating.** After a change on the branch, index the backed object types on the branch (*Index object type* in Ontology Manager) so Workshop and Ontology Manager reflect it.
- **Merging** needs every approval satisfied and the view **rebased** if main moved. Rebasing is all-or-nothing per change: keep main's version or the branch's, "no way to resolve diffs at a finer granularity". Rebase before review when both are needed.
- **Protecting.** *Branch protection > Protect with project policy* on the view makes every edit to policy or markings on main go through a global branch on save. Reviewers are added in Global Branching or from the Approvals banner, get an email, and review side by side in the Compare tab.
- **Can't branch:** views on datasets that can't be branched (edit-only workflows, imported datasets, Fusion-built datasets).

**[Recommendation]** Protect every production restricted view. The policy is the security control; an unreviewed one-line edit to it is exactly what the `stop_propagating` rules in [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking) exist to prevent for markings.

## Limits that follow from the design

**[Docs]** A view's contents combine "the policy definition and the user's attributes and group memberships at a specific point in time". Transaction history keeps the policy's history; it can't keep every user's attribute history. Pipelines must be reproducible and "agnostic to the specific user running them", which a user-dependent view can't be.

| Operation | Supported? | **[Docs]** why |
|---|---|---|
| Reading (objects, Contour) | Yes | |
| On-the-fly calculations (Quiver, Functions, Contour) | Yes | From the accessible rows |
| Writeback on objects backed by a view | Yes | Governed by the writeback target ([01](01-access-control-propagation.md)) |
| Exporting (Quiver, Contour, others) | Yes | Nothing follows the export |
| Batch processing | **No** | Different users see different subsets |
| Saving transformed outputs as a dataset | **No** | Spark has no row-level permissions, so later transactions couldn't keep the guarantee |
| Syncing to Postgres | **No** | Row permissions on attributes wouldn't be maintained |

**[Docs]** Two more consequences: collaborators on a pipeline may see **different rows and aggregates** in the same view, and nothing stops a downstream transformation dropping the **columns the policy references**. The *No* rows are "integrity restrictions", "not confidentiality guarantees on the rows a user does read": data read through a view can still be written, exported or transformed under whatever controls those operations have.

## Marketplace

**[Docs]** A view can be added to a DevOps product as an output (*Add files*). Only string and Boolean constants, compared to columns or to *the user's groups*; not two field-constant conditions on the same field. The product packages **the policy, not the data**, and not the attributes or groups it depends on: the installer must make sure those exist in the destination, where the policy is evaluated at read time ([DevTools 08-01](../../DevTools/08-product-delivery/01-devops-products.md)).

## For Kestrel

**[Example]** The plan asked this note to re-check Kofi's regional access, which [Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md) moved from a restricted view to an object security policy. *Considered, not adopted* stands, for three reasons from these pages: the shipments dataset has to stay usable as a transform input (the batch-scored delay risk in [Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md) reads it), which a restricted view can't be; the object security policy uses the same granular-policy engine, so nothing is lost in expressiveness; and a policy on the object type is reviewed with the Ontology ([Ontology 14-01](../../Ontology/14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md)), which is where Kestrel's two-approval policy already lives.

**[Example]** *Adopted* where a restricted view **does** fit: Lena's **Contour** analyses over `Payments [Ontology]`'s refund ledger. Contour reads datasets, not objects, so the object security policy doesn't help there; a `refunds_rv` view in a `Kestrel Pay [Analysis]` project, filtering on the user's `payTeam` attribute, lets each finance analyst see their team's refunds while the `Kestrel Pay – Financial` marking stays on the backing dataset. Protected with the project policy; Editors (the analysts) can build it on a branch to test, Owners (Kestrel Pay engineers) change the policy. Adopted in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)).

---
[Module index](README.md) · Previous: [01 — Access control propagation](01-access-control-propagation.md) · Next: [03 — Project constraints](03-project-constraints.md)
