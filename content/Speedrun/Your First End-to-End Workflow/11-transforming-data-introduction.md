# 11 — Transformation: design a common order contract

The input systems describe similar business activity in different ways. Transformation makes those differences explicit and produces data that downstream consumers can interpret consistently.

The course uses Pipeline Builder, a graphical tool for defining transformations and their dependencies. Think of the graph as a program: inputs feed operations, and an output depends on the operations upstream of it. A node is not just a diagram label; its configuration determines how data changes.

## Read the planned graph

```text
Office Goods orders → Clean Office Goods → Join Office Goods ─┐
                                           ↑                 │
                                customer reference           ├→ Union Orders → all_orders
                                           ↓                 │
Bureau orders       → Clean Bureau       → Join Bureau ───────┘
```

The diagram is a conceptual map of the course workflow. The customer reference is used by both joins; it is not added as another set of order rows.

**Cleaning** adapts each source to shared names and types and filters missing order IDs. **Joining** attaches customer identity and name to each order. **Unioning** collects the two prepared order populations into one table. These operations solve different problems, so their order matters.

## What is the shared contract?

A contract includes more than a list of fields. For this tutorial, each output record is treated as an identifiable Order, the due date has a compatible temporal type, customer context has consistent meaning, and the two branches expose the same intended columns.

As a software engineer, you can compare each cleaning branch with an adapter converting a vendor DTO into an internal DTO. `dueDateTime` and `order_due_date` can map to one shared property, but merely changing a name cannot prove that both source values use the same timezone or business definition.

The source-specific customer ID is another example: both clean branches use a column called `customer_id`, yet those values still belong to different systems. The customer joins reconcile their meaning through the appropriate lookup columns.

## Learn to read lineage

**Lineage** is the dependency relationship that lets you trace an output back through its inputs and transformations. If an application's customer name is wrong, lineage gives you a route back to the enrichment join and customer reference. It also helps answer which downstream resources may be affected by a schema change.

This course uses a batch pipeline. A batch executes work on a bounded set of input data when run. You will first configure and preview that work, then build its output; editing the graph does not itself guarantee that consumers have fresh data.

**Remember:** every transform should have a reason stated in business or data-contract terms. “The tutorial clicked this” is useful for reproduction but insufficient for understanding.

**Exercise:** explain why unioning the raw files first would make the integration harder. Look for inconsistent names/types and the need to retain enough source context to use the correct customer mapping.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791012) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
