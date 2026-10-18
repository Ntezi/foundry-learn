# 35 — Order the table columns around the operator's first questions

Set the first five table columns to **Customer Name, Item Name, Status, Assignee, Days Until Due**, in that order. The table still represents the same Orders; this step makes its most useful information easier to scan.

The course's order tells a compact story: who the work is for, what it concerns, where it stands, who owns it and how urgent it appears.

## Why those fields belong together

| Column | Question it helps answer |
|---|---|
| Customer Name | Whose order am I looking at? |
| Item Name | What was requested? |
| Status | What stage is recorded? |
| Assignee | Who is responsible? |
| Days Until Due | What timing context does the supplied value suggest? |

A worker should not need to open every row to answer these first questions. The details panel remains available for the complete record and precise identity.

This is similar to choosing the fields in a list-view DTO or designing a ticket queue. The best scanning order follows the decision, not necessarily database column order or alphabetical order.

## Display priority is not data importance

The long Order ID may be less useful as the first visible column, but it remains essential for distinguishing records and verifying an Action target. Keep identity accessible in the table or details; do not confuse “not visually prominent” with “safe to discard.”

Two rows can share customer, item and assignee yet be different Orders. A user-friendly description helps recognition but cannot replace the primary key when recording a test or investigating a change.

Likewise, changing a column label or position does not change the object's property mapping. A missing value may come from the source, the pipeline or the object model; rearranging the table cannot supply it.

## Read state and ownership together

An invented row might show Status `assigned` but no Assignee. That is a useful inconsistency to investigate. Another might have an Assignee while remaining `open`. Later, the Assign Order Action will express the course's intended relationship by setting an assignee and status together.

The table makes such combinations visible; it does not itself enforce the rule. Validation belongs in the relevant data or operational logic, not merely in how the row is displayed.

The timing field still has the snapshot limitation explained in lesson 33. Putting it in a prominent position makes its meaning more consequential, so avoid assuming that visual prominence proves freshness.

## Test readability using real work

Find an Order, explain its state from the first five columns, then open details and confirm its identity. Try a long customer or item name and check whether truncation prevents useful comparison. These checks evaluate whether the layout serves the task, not whether it matches one screenshot pixel for pixel.

**Remember:** design the list for comparison and the inspector for depth, while keeping the same identity behind both.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792193) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
