# 29 — Add details: preserve the identity of the selected Order

A table is useful for comparing many records. A details panel is useful for understanding one. This lesson adds a right-hand details section and connects it to **Object table 1 Active object**, the table's selection output used by the course.

Add an **Object Set Title** and a **Property List**, bind both to that active-object output, show the Order properties in a single-column arrangement, and use flexible sizing. Add the **Button Group** area that will later contain assignment behavior.

## The selected Order is not the filtered population

If a filter produces 30 Orders and the worker clicks one row, the details panel should describe that one selected identity. Binding the panel to all 30 would express a different relationship.

Think of a frontend with both `visibleOrders` and `selectedOrderId`. They have different roles even when selection happens inside the component displaying the collection. The course's active-object variable supplies the selected context; inspect its actual variable definition and widget output instead of inferring its behavior from its name alone.

The Object Set Title provides recognizable context and the Property List provides its attributes. Both must follow the same selection. Otherwise a panel can show the title of one Order alongside the properties of another.

## An invented interaction trace

The table shows `OG-101` and `BS-209`, both titled Stapler. Select `OG-101`; its customer and assignee should appear. Select `BS-209`; those details should switch to the second Order.

A title that remains “Stapler” does not prove the selection failed. Compare the order ID and other differing properties. This is why stable identity from the first half matters inside the UI.

The later Assign button should operate on this same selected Order. Placing it beside the details makes that intended scope easier to understand, but physical proximity does not create a data binding. Lesson 45 will configure the parameter explicitly.

## Think about an empty or invalidated selection

What should the panel show before any row is selected? What happens when the worker applies a filter that excludes the selected Order? These are behaviors to inspect, not guarantees established by adding a Property List.

A well-designed interface should make the active context clear and avoid inviting an operation on a stale or ambiguous target. For your own applications, decide whether to clear selection, keep it with an explanation, or select another record intentionally. Do not silently equate “first visible row” with “the Order the worker chose.”

These are design considerations beyond the course's basic binding, not additional behavior already configured in the training app.

**Where this pattern appears elsewhere:** a ticket list beside a ticket inspector, a customer search beside a profile, or a claims queue beside a case review. The reusable lesson is to connect the inspector and commands to one explicit entity identity.

**Quick check:** selecting another row changes the title but not the properties. What is the likely configuration problem? The two widgets may depend on different variables. Inspect their inputs before changing the source dataset.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/2289621) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
