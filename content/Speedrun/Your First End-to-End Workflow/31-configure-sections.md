# 31 — Configure sections: organize the screen around investigation

The next two lessons add charts. First create an area that can hold them without disrupting the order table and selected-order details. The course splits the application area, adds a lower **Charts** section, and configures regular padding, flexible height and columns.

The charts move above the records in lesson 34. At this step, focus on creating the container and its arrangement rather than treating its temporary position as the final design.

## What a section does

A section groups content and allocates space. It is similar to a layout container in a frontend: it determines how child elements are arranged but does not itself define their query or business logic.

Two charts placed side by side do not automatically use the same Orders. Their input variables must still be configured independently. Likewise, placing the details panel beside the table does not make it follow selection; that relationship came from lesson 29.

This distinction between spatial structure and data dependencies is especially useful in visual tools, where the screen's arrangement can make unrelated components appear connected.

## Understand the layout choices

**Padding** supplies space between a section's edges and its content. Regular padding helps avoid cramped labels and makes section boundaries easier to perceive.

**Flexible sizing** lets content share available space rather than relying only on fixed dimensions. It helps the page adapt, but it cannot guarantee that every label remains readable at every window size.

**Columns** provide separate places for the two summary views. The purpose is comparison: the worker can relate status distribution to the timing of the workload without navigating to another page.

These choices should support the work, not simply maximize the amount of content above the fold. A tiny chart with unreadable axes contributes less than a slightly larger one that answers a clear question.

## Verify with actual content in mind

Before the charts exist, inspect the empty section's placement and size. After they are added, revisit the layout using long labels and realistic data. Also check that the table remains usable and that the details panel does not make its associated record ambiguous.

A table requiring horizontal scrolling is not automatically a failure, but essential fields should not become unnecessarily difficult to compare. Lesson 35 will order those fields around the operator's first questions.

**Where this applies outside Foundry:** any internal application with a summary, a work list and an inspector. The same design tension exists in a hand-coded UI: enough information to decide, enough space to read it, and a clear route to the entity being acted on.

**Check yourself:** does creating a Charts section establish a summary of the filtered Orders? No. It establishes layout only; the chart widgets and their data bindings establish the summary.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792186) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
