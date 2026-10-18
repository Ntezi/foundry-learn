# 01 — Course introduction: add reusable logic to the business model

In the previous speedrun, you prepared order data, represented it as Orders, and configured a Workshop application with an assignment Action. This course starts with prepared assets and asks a different question: what happens when the business needs a calculation that is more specialized than the available widget configuration?

You will write a TypeScript Function that queries Ontology objects and returns a result for Workshop. The first half ends with one calculated number on a metric card. Later lessons adapt the idea to table columns, charts and operational edits; we will revise those after your first-half review.

## Connect this to a domain service

As a software engineer, imagine a service method that accepts an optional Clinic, obtains its monthly financial facts, calculates a measure and returns a number. That is a useful starting analogy for this course's Function on Objects.

The **Ontology** supplies the business model: Clinic entities and Financial observations with named properties. The **generated SDK** supplies typed code bindings to that model. The **Function** implements the calculation. **Workshop** provides an interface that consumes its result.

The platform provides the execution and integration framework; you still own the meaning and correctness of the algorithm. A compiled function over well-typed objects can calculate the wrong business measure.

## Where should a calculation live?

| Need | A useful place to consider | Reason |
|---|---|---|
| Standardize raw fields for many consumers | Pipeline logic | Produces consistent prepared facts. |
| Format a number or express a simple supported UI calculation | Workshop configuration | Keeps presentation concerns close to the view. |
| Apply specialized, reusable logic to modeled entities | An Ontology Function | Gives the calculation a typed, reusable interface. |
| Use model-driven language reasoning | AIP Logic or an appropriate AI workflow | Serves a different requirement from deterministic arithmetic. |

These are decision guidelines, not rigid platform limits. A large calculation used identically by every consumer might be better precomputed. A cheap calculation that changes with the selected Clinic can be useful at interaction time. Consider cost, input scope, freshness requirements, reuse and ownership.

The phrase “north of the Ontology” means consuming modeled business entities rather than directly cleaning raw source records. It does not mean the function can ignore data quality or permissions.

## Recalculation is not fresh ingestion

Calling the Function again recalculates using the data available to that execution. If last month's reports are the newest available facts, the result is still based on those reports. This is the same distinction as the static Days Until Due property in the E2E course: a responsive screen does not guarantee fresh business inputs.

The course uses **TypeScript v2**. Functions are a broader platform capability; do not define the whole concept as inherently TypeScript-only. For this exercise, the selected generation determines the code and imports you should follow.

**Remember:** the new skill is placing a reusable calculation between a business model and its consumers. You are learning how to connect familiar code to Foundry's model and release lifecycle.

**Check yourself:** why not put the formula directly in every dashboard? Multiple implementations can disagree or drift. A shared function provides one explicit contract—provided its scope and definition are understood and maintained.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131538) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
