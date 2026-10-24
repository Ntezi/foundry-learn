# 03 — Project constraints

*Sources: [Project constraints](https://www.palantir.com/docs/foundry/security/project-constraints/) · [Manage Project constraints](https://www.palantir.com/docs/foundry/platform-security-management/manage-project-constraints/) · checked October 23, 2026 · Ready for Review*

A short **policy sheet**. Project constraints are the one control in this area that works on **combinations** of data rather than on who sees it, which makes them easy to forget and hard to replace.

## The rule

**[Docs]** Project owners can limit "which markings may or may not be applied on files within a Project". A file that would violate the constraint can't be saved into the project; a dataset that violates it "cannot be built until the violation is resolved".

| Type | Meaning |
|---|---|
| **No constraints** (default) | Any marking may be used as an access requirement in the project |
| **Allowed markings** | Only the listed markings may appear |
| **Prohibited markings** | The listed markings may not appear; everything else may |

**[Docs]** The purpose: "to prevent users from accidentally joining data". Someone may legitimately hold two markings and still be forbidden from **combining** the two kinds of data. The example is a bank whose compliance officers may read investment data and research data separately but must never join them; an *Allowed markings* constraint on the relevant projects makes the join impossible rather than merely forbidden.

**[Explanation]** Every other control in modules 01–03 asks *may this user see this?* A constraint asks *may this data sit next to that data?* Markings can't express that: a user with both markings passes both checks. The constraint is enforced on the **project**, so the join can't even be built.

## Managing one

**[Docs]** You need **Owner** on the project and *Apply marking* on **every** marking in the constraint. The constraint is set in the *Markings* section of the project's *Access* panel. You can't add or change a constraint "if doing so would cause an existing file in the Project to be in violation".

**[Docs]** Templates can carry constraints: new markings a template creates are automatically **allowed**, and can't be listed as prohibited ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#8-every-new-project-should-start-the-same-way)).

## When a violation appears anyway

**[Docs]** A constraint is checked when files are saved, but a marking can still arrive **by inheritance** from upstream after the constraint exists. The dataset shows a warning and **won't build** until one of three things happens:

1. Add the inherited marking to the allowed list.
2. Remove the inputs that bring the marking into the transformation.
3. Remove the upstream marking ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking)).

**[Docs]** CBAC has the same behaviour under the name *project maximum classification* ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#part-3--classification-markings-cbac)).

**[Explanation]** Option 1 is the dangerous one. It's the quickest fix and it's a policy change made by a project owner under build pressure. Treat a constraint change like a marking removal: review it. Option 2 is usually the right answer, because the constraint was telling you the pipeline is pulling in data it shouldn't.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), two constraints:

| Project | Constraint | Why |
|---|---|---|
| `Payments [Ontology]` and `Kestrel Pay [Datasource]` | **Allowed markings:** `Kestrel Pay – Financial` only | Nothing marked `Customer PII` may enter the payments projects. Kestrel keeps payment data and customer identity apart ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) already avoids copying payment data onto `Order`); this makes the separation a build-time rule rather than a convention. `Payment` links to `Order` by key, not by joined columns, so the Ontology link is unaffected |
| `Delivery Desk [Workflow]` | **Prohibited markings:** `Kestrel Pay – Financial` | The customer-service workflow project must never gain a payments dataset by someone referencing one in. Ama's team isn't eligible for the marking anyway; the constraint stops the dataset arriving at all |

**[Explanation]** The first constraint has a cost worth stating. Tomás's fraud work needs payments **and** customer attributes together (chargeback patterns by customer). Under this constraint that join can't live in the payments projects. It lives in a separate `Fraud [Analysis]` project, adopted in Phase 7, allowed both markings, with Tomás's group as its only members, and its outputs stay there. That's the bank example applied: the people who may hold both are few, and the place where both meet is one project everyone can see on the lineage graph.

---
[Module index](README.md) · Previous: [02 — Restricted views](02-restricted-views.md) · Next: [04 — Diagnosing access](04-diagnosing-access.md)
