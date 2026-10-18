# 30 — Name the table section: make the information hierarchy clear

Enable the table section's header, name it **All Orders**, choose the **Th** icon and remove the redundant parent header, following the course. This step organizes the page's meaning: the worker should distinguish the order collection from its summary charts and selected-order details.

Repeated headers can make a small screen feel like several unrelated applications. A clear section label gives the table one recognizable home without spending unnecessary space saying the same thing twice.

## A label makes a claim about scope

The tutorial calls the section All Orders even after the table is connected to the filtered object set. Interpret that as the name of the main order area, not proof that every Order is currently visible.

Imagine the worker has selected one customer and sees twelve rows beneath All Orders. Those twelve are all matching Orders in the current query, not necessarily the full company's order population. In your own application, an active-filter indicator, visible criteria or a more precise title can make that distinction clearer.

This is an explanatory improvement to consider, not a claim that this course step implements a dynamic title or count.

## What changes and what stays dependent on configuration

A section header describes an area. It does not change the table's object-set variable, remove filters, rename the object type or alter authorization. The Th icon helps visually identify a tabular area; it does not imply a new dataset was created.

In software-engineering terms, this resembles changing a component's heading rather than its query. If renaming the header appears to change the data, investigate other edits or active state instead of attributing it to the label itself.

## Inspect the page as a sequence of questions

At this point, the user should be able to identify where to choose a scope, where to scan the matching records and where to inspect one selection. The labels should support those distinctions. A parent header that repeats the table heading adds little; a details heading that makes the selected context understandable can add real value.

The underlying lesson is information architecture: organize and name regions according to how people interpret them. Good terminology prevents a technically correct interface from encouraging the wrong conclusion.

**A small review exercise:** apply a narrow filter and read the page without looking at the editor. Can you tell that the table is narrowed? If not, identify what context is missing before assuming the query is wrong.

**Remember:** labels guide interpretation. Their wording should be consistent with the scope a widget actually displays, especially when users make operational decisions from that display.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792185) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
