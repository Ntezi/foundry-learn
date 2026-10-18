# 22 — Create the Order type: identity, labels and indexing

This lesson maps `all_orders` into an Order object type in Ontology Manager. Its central design decisions are the primary key, the title, the property mappings and the intended Ontology context.

Use the authorized training Ontology. Select `all_orders` as the datasource, name the type **[username] Order**, set **Order Id** as the primary key and **Item Name** as the title, retain the prepared properties, leave automatic Action creation off, save to the Ontology and wait for indexing. If direct creation is unavailable, follow the course's supported Ontology/branch workflow with the appropriate permissions; a branch is not a way around authorization.

## Identity and a display label have different jobs

Consider two invented orders:

| Order Id | Item Name | Assignee |
|---|---|---|
| OG-101 | Stapler | Alex |
| BS-209 | Stapler | Sam |

The title “Stapler” helps a human recognize the item, but it cannot distinguish the Orders. `OG-101` and `BS-209` provide their identities. If Alex is replaced by another assignee, `OG-101` should remain the same Order.

A good primary key is nonempty, unique within the type and stable for the lifetime of the represented entity. A random key regenerated at every build would make an unchanged real order look like a new identity. The earlier pipeline work and cross-source uniqueness checks support this choice; selecting a field in Ontology Manager does not create those properties of the data.

## What property mapping means

The mapping connects prepared columns to the modeled properties applications will use. Retaining the eleven intended fields gives Workshop the order identity, customer context, assignment state and item details already assembled by the pipeline.

Mapping does not invent a value or calculation. In particular, exposing `days_until_due` does not establish that it is recalculated each day. Mapping `customer_name` does not automatically create a linked Customer object. Each is currently an attribute of the prepared Order representation.

## Display names and API names

A display name is for people. An API name is a developer-facing identifier used to reference the type programmatically. These need not be identical.

In the historical training build, `MariusOrder` conflicted with an existing API name, so the created type used `MariusTrainingOrder` while the display name remained **Marius Order**. Before creating anything again, inspect the existing type and datasource instead of choosing a similarly named shared object or making a duplicate.

The recorded type RID is `ri.ontology.main.object-type.b5b36a53-8eb5-481c-a6b7-ef05bc1627d3`. That is historical identification evidence; this revision did not reopen it.

## Saving a model is not the same as having queryable instances

Saving records the definition. The backing data must also be made available through the object layer's indexing/synchronization process. In this course, wait for the indexed result and inspect an actual Order before assuming Workshop can use it.

The earlier build recorded 1,492 indexed objects. A current check should confirm the intended datasource, current indexing status, count and a known Order's property values. A matching count alone would not detect a wrong customer name.

Automatic Actions are left off because read modeling and permitted state changes are separate decisions. The second half explicitly introduces assignment behavior.

**Remember:** primary key identifies, title helps recognition, mapping supplies properties, and indexing makes the data available for object use. These are four separate reasons behind the configuration.


**Go deeper in the Ontology area:** [04 — Object types](../../Ontology/04-object-types/README.md)

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792149) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
