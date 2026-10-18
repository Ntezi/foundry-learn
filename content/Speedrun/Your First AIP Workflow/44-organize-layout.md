# 44 — Organize the Layout

## Arrange the interface around the task

Name the app **Ontology Augmented Generation App**. Open the Layout panel, select the **Page** layer—not the Page (Default) page identifier—set padding to **Regular**, and choose **Rows** as the layout direction.

This creates a top-to-bottom structure suitable for entering a question, inspecting evidence and reading the response. The course later places the object list and graph side by side inside one row.

## The layout tree is a component hierarchy

Workshop organizes Sections and Widgets in a tree. A section controls the arrangement of its children, while each widget has its own data and display settings. Selecting a parent changes the configuration you are editing.

For a software engineer, compare this with nested layout containers in a frontend. Setting flex direction on an outer container and on an inner container has different effects. Here, Rows on the page and Columns in the evidence section are compatible choices at different levels.

## Presentation should support interpretation

The question belongs where the user can see what the results respond to. Evidence should be accessible rather than hidden behind the answer. A clear layout can make comparison easier, but it cannot establish evidence correctness by itself.

A graph beside an answer still needs an explanation of what its objects represent. In this tutorial it is driven by Workshop's Relevant Chunks, while the answer function performs its own retrieval. Good placement should not imply an exact provenance relationship that the dataflow has not guaranteed.

## Diagnose the selected layer

If changing layout has an unexpected effect, inspect which Page, Section or Widget is selected. Do not keep changing unrelated controls. The same label can appear in navigation and in the layout hierarchy with different roles.

A missing region can be a layout problem; an empty region with no data can be a binding problem. Separate those symptoms before modifying the function or data source.

## What this lesson does not configure

Rows and Regular padding do not create User Question, perform semantic search or invoke the Logic function. They organize where those interactions will appear. This is why the following lessons explicitly create and bind variables.

**Remember:** layout is a hierarchy, while dataflow is a dependency graph. They interact, but they are not the same structure. Explain why moving a widget visually does not automatically change its input variable or the function it calls.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962674) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
