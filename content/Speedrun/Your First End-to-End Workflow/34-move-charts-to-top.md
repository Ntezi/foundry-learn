# 34 — Move charts to the top: support overview, then investigation

Use the Charts section's **Move** control to place it above the detailed order table. This changes the reading order of the page. It should not change the charts' variables, their aggregation settings or the table's selection behavior.

The course is moving toward an overview-first interface: see the workload pattern, inspect the relevant records, then examine a particular Order. Each level answers a different question.

## Why spatial order affects the workflow

A supervisor opening the inbox may first want to know whether work is accumulating in a particular status or due-day range. Summaries near the top help orient that investigation. The table then provides the underlying records, and the details panel supports the selected case.

Compare this with arranging a debugging dashboard: an error-rate summary can direct attention, but you still need individual requests and logs to explain what happened. A summary is an entry point, not the complete investigation.

The order is a design choice rather than a universal rule. A worker who repeatedly enters a known Order ID may benefit more from immediate search and details. When building your own app, choose the layout around the dominant task instead of assuming that charts should always occupy the first screen.

## Moving a section is different from recreating its contents

Use the existing section's move operation rather than rebuilding equivalent charts in a new place. Recreating widgets can introduce separate variable bindings or leave duplicate summaries in the module. Moving the existing section preserves its role while changing where it appears.

After moving, verify that the charts still reference the filtered set and that the page retains a clear relationship between table selection and details. A layout edit may expose sizing problems even when the data bindings are unchanged.

## Inspect with the window a user will have

Check whether the summaries consume so much vertical space that the worker must repeatedly scroll to find and select an Order. Also check the visibility of the filter controls: a filtered summary without visible filter context can be misread as a global result.

These are observations to make during review, not assertions about the current training app's viewport. The purpose is to learn how presentation can affect interpretation without changing the underlying data.

**What to remember:** a useful information hierarchy gives the user a path from a broad question to an identifiable record. It does not replace the need for consistent queries and correct selection.

**Quick check:** the charts moved successfully but now show a different population. Was that an intended consequence? No. Inspect whether a data binding or active filter changed alongside the move; position alone should not redefine the query.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792191) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
