# 37 — Workshop conclusion: a working read experience is the foundation

The intended result so far is a dashboard over Orders: filters define the current scope, charts summarize it, the table lists individual records and the details panel explains the selection. This is a useful read experience before any assignment behavior is added.

The section's deeper lesson is consistency across representations. Several widgets can look reasonable individually while disagreeing about the population or selected entity. A dependable application makes those relationships explicit.

## Reconstruct the read path

```text
Order type → Base Orders
                 + filter criteria → Filtered Orders → table and charts
                                                       │
                                                       └→ active Order → details
```

Explain each arrow as a dependency. The filtered set is derived from the base population and user criteria. The table's active Order comes from selection. Details should follow that identity, not simply the first record in an unrelated set.

This is the visual-tool version of a familiar frontend problem: avoid maintaining several independent copies of state that are supposed to represent the same thing.

## What is already useful?

A worker can locate relevant work and inspect who owns it. A manager can understand the recorded status distribution. Those are meaningful capabilities even before write operations exist.

However, seeing that an Order is unassigned does not assign it. The next sections add the concrete **Assign Order** operation, which sets an assignee and changes Status to `assigned`.

Some course prose mentions closing orders. The required implementation steps do not create a close-order Action. Existing rows with status `closed` come from the data; displaying them does not demonstrate a command for closing another Order.

## A review based on questions, not screenshots

Can a worker tell whether filters are active? Do the charts and table describe the same intended scope? Does selecting between two Orders with the same item title still update the correct details? Is a zero-result view distinguishable from an error or loading state?

These checks ask whether the screen supports understanding. A screenshot can show attractive widgets but cannot, by itself, establish the interaction contracts between them.

The stored Days Until Due field is also still a snapshot-derived value. A read interface can faithfully present a stale value. That is why the first half's data provenance and freshness concerns remain relevant during application review.

## Prepare for the write path

Before adding a command, be clear about its target and intended outcome. The target will be the selected Order. The user will supply an Assignee. The rule will set Status to `assigned`. The application must then make the resulting state observable.

**What to retain:** a read-only application is complete for its read scope when users can reliably find, compare and inspect the right entities. Operational changes add another contract; they are not merely one more decorative button.

**Self-check:** what evidence would show that the interface can close an Order? A configured close operation and an observed authorized state transition—not the presence of closed Orders in a chart.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792196) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
