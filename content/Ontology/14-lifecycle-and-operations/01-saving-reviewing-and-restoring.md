# 01 — Saving, reviewing and restoring changes

*Sources: [Save changes](https://www.palantir.com/docs/foundry/ontology-manager/save-changes/) · [Review and restore changes](https://www.palantir.com/docs/foundry/ontology-manager/restore-changes/) · [Branching the ontology](https://www.palantir.com/docs/foundry/ontologies/branching-ontology/) · [Viewing usage](https://www.palantir.com/docs/foundry/ontology-manager/view-usage/) · checked October 3, 2026 · Ready for Review*

The mechanics of the save cycle (working state, *Review edits*, *Update*, conflicts, History, restore) are covered in [03-02](../03-ontology-fundamentals/02-ontology-manager.md#the-save-cycle). This note is the **team agreement** Kestrel built on top of those mechanics. It sets out which changes may be saved straight to main, which need a branch and review, and what to do when a save goes wrong. Every rule cites the doc behaviour it depends on.

---

## Kestrel Ontology change policy (v1)

### 1. Three tiers of change

| Tier | Examples | Route | Why |
|---|---|---|---|
| **A — Cosmetic** | Descriptions, display names, render hints, formatting, type groups | **Save directly** after *Review edits* | **[Docs]** Display name, title key, render hints, type classes and visibility are *non-breaking*, even on edited properties ([04-04](../04-object-types/04-creating-and-editing-object-types.md#part-b--change-it-safely)) |
| **B — Additive** | New property, new link type, new action type, a new *experimental* object type, setting a status to **deprecated** | **Branch + proposal** for anything **active**. Save directly for experimental types | Additive changes rarely break readers, but they trigger reindexing ([13-01](../13-backend-architecture/01-backend-services.md#trace-1--priya-adds-a-property-to-shipment)) |
| **C — Breaking** | Type change, property deletion, datasource swap, primary key | **Branch + proposal + named reviewers**, a migration plan, and a consumer check ([03](03-schema-evolution-and-breaking-changes.md)) | **[Docs]** Ontology Manager detects breaking changes, requires a migration before saving, and asks you to **type the entity's name** to confirm destructive changes |

**[Docs]** Kestrel's active core types (`Commerce [Ontology]`) and payment types (`Payments [Ontology]`) are **protected**. Changes to them **must** go on a branch: "When modifying protected resources, the Save dialog is replaced with Create and save to branch." Protection needs project-based permissions ([12-02](../12-security-and-governance/02-ontology-resource-permissions.md)). Branching is covered in [02](02-branching-and-proposals.md).

**Gap: Object Views.** **[Docs]** An object type's Object View doesn't inherit its protection yet: the view and its modules "can still be edited directly on main even if the parent object type is protected" ([10-02](../10-applications/02-object-views-and-object-explorer.md#stop-5--daniel-configures-the-order-view)). **[Recommendation]** Until that ships, keep auto-publish off on the Order, Shipment and Payment views, so that view changes are saved first and published on purpose.

### 2. Before you save (tiers B and C)

1. **Check usage.** Open the type's Overview usage graph and its **Usage** tab: the last 30 days of reads, writes, active users, and which apps. **[Docs]** "No usage for the last 30 days" can mean the metrics tables aren't configured, not that nobody uses the type. Ask an Ontology admin to confirm the **Ontology metrics** toggle (changes take up to 60 minutes).
2. **Read every warning** in *Review edits*. **[Docs]** Errors block saving; warnings don't. The docs single out types with **writeback/edits**: take "extra caution… to ensure that the history of edits… is not removed".
3. **Never chain unrelated changes in one save.** **[Explanation]** Each entry in History is one save. Keep saves small, so that a restore undoes exactly one decision.

### 3. When two people edit at once

**[Docs]** If someone saved since you started, *Save* is greyed out until you choose **Update**. Conflicts then offer *keep latest* or *override with mine*.

**[Recommendation]** Never pick *override* on a resource you didn't author without asking its author. On protected resources this situation doesn't arise, because branches and rebases replace it ([02](02-branching-and-proposals.md)).

### 4. When a save goes wrong

| Situation | What to do | Doc basis |
|---|---|---|
| A save fails with a toast | Search the docs for the error name (prefix `OntologyMetadata:` or `Phonograph2:`) | Save changes |
| A saved change broke an app | **Restore** the object type to the version before it in **History**. The restore lands in your working state, so **save it** | Review and restore |
| The bad change included a **schema migration** | **Revert the migration** from History → Migrations → ⋯ → *Revert*, then save | [Schema migrations](https://www.palantir.com/docs/foundry/object-edits/schema-migrations/) |
| The bad change was a **merged proposal** | Undo it with a new change. **[Docs]** For legacy ontology branches, "Proposals cannot be reverted automatically" | Ontology branches (legacy) |
| Something other than an object type is wrong (link, action) | **[Docs]** Restore is documented for **object types** only. Re-apply the old configuration by hand, using its History entry as the reference | Review and restore |

**[Explanation]** Restore puts the *definition* back. It doesn't re-run a migration that already dropped edits. That's why tier C requires the migration choice to be reviewed **before** saving, not after.

### 5. Audit trail

**[Docs]** **History** on the Ontology home page shows every save, with author and time. You can hide changes to types you can't view, and merge consecutive entries by the same author. Each resource has its own History tab, and its footer shows the last editor.

**[Recommendation]** Kestrel's monthly governance review reads the global History. For each entry on an active or protected type, it checks that a proposal is linked. The tiers are Kestrel's own labels, not a History filter, so this is a read-through, not a query.

---

**Which environment?** This policy applies inside each environment. From [04](04-marketplace-packaging.md#which-environment-changes-what) on, Kestrel has dev, test and prod. Product resources change only in `kestrel-dev`; core types are changed under this policy in each environment.

**[Explanation] Why a written policy at all?** Ontology Manager lets any editor save straight to main on unprotected resources. The platform gives the mechanisms (protection, branches, warnings, history), but it doesn't choose the tiers for you. Those are a team decision, which is why it lives in a note like this.

---
[Module index](README.md) · Next: [02 — Branching and proposals](02-branching-and-proposals.md)
