# Second-half review: from object data to operational behavior

Lessons **25–48** now use the deeper teaching approach you accepted for the first half. The full set of 48 numbered notes has been rewritten. This guide helps you review the application and Action concepts together; it does not mark independent practical mastery as complete.

## Read in four connected stages

| Lessons | Main question | What you should be able to explain |
|---|---|---|
| 25–31 | How does the application hold and display context? | Module, widgets, base/filtered sets, active selection and layout. |
| 32–37 | What do the summaries and published view actually mean? | Population, aggregation, due-day freshness, display priorities and module version. |
| 38–42 | What does assignment guarantee? | Target, parameters, fixed rule, form choices, edit capability and submission restrictions. |
| 43–48 | How does a user invoke and verify that operation? | Selection-to-target binding, observed state transition, lineage and learning boundaries. |

Use the [course index](README.md) for every lesson. For an initial depth check, read [28 — Filters](28-create-filter.md), [33 — Due-day chart](33-create-bar-chart.md), [38 — Actions](38-configuring-actions-introduction.md), [45 — Button binding](45-add-actions-to-workshop.md) and [46 — End-to-end test](46-test-operational-application.md).

## Keep this dependency map in mind

```text
Prepared data → Order objects → Base Orders
                                   + filter criteria
                                   → Filtered Orders → table + charts
                                                        │
                                                        → active Order → details
                                                               │
                                                               → Assign form target
                                                                   + assignee input
                                                                   → Action rule
                                                                   → observed Order state
```

The same underlying Order identity must survive the path from selection to submission. The filtered collection and the selected entity play different roles. The command may change whether that entity still belongs in the current filtered collection.

## Questions to try before reading the guidance

1. The filter panel changes, but the table does not. Which three connections should you inspect?
2. A table shows 12 matching Orders while a status chart shows 100. What would make this a configuration mistake, and what would make it an intentional comparison?
3. Two Orders both have the title Stapler. How do you verify that the details and Action refer to the one you selected?
4. Why can Days Until Due remain unchanged after reloading the application tomorrow?
5. Does saving a Workshop module always keep changes separate from the published version?
6. Why should Assign Order set Status itself instead of asking the user for an arbitrary status?
7. Why does enabling object edits not prove that your colleague can submit the Action?
8. What does the Order parameter's local default accomplish, and what does it not guarantee?
9. An Order disappears from an open-only table after assignment. How can that be correct, and how would you verify it?
10. The test Order already has Gail Weber as assignee before you submit Gail Weber again. What can you honestly claim?
11. If you change the Status property's meaning, which consumers would you inspect first?
12. What is still missing before you can claim that the original order system received the assignment?

### Answer guidance

1. Inspect the Filter List's output criteria, their use in the filtered object-set definition, and the table's selected input variable. A control and a table are not linked merely by sharing a page.
2. It is a mistake if both should describe the current filtered workload but the chart uses the base population. It can be intentional if a clearly labelled chart provides global context. The tutorial intends shared filtered scope.
3. Compare the exact Order identity through table selection, details and the opened form. A shared title does not distinguish entities.
4. It is stored in the training CSV data and is not recomputed by this course's chart. Reloading can retrieve the same old value. A live calculation needs a defined source, reference time and update mechanism.
5. No. Workshop supports automatically publishing when saving. Inspect the module setting and the version actually being viewed.
6. The command represents assignment. The fixed rule keeps the resulting status consistent with that intention, instead of relying on the user to coordinate related edits manually.
7. Edit capability, applicable object access and Action submission criteria are separate concerns. Diagnose the specific operation and user rather than inferring access from a visible app or checkbox.
8. It prefills the target from the selected context. It does not replace authorization, validation or inspection of the final target; do not assume a default always locks the form field.
9. Once its updated Status is assigned, it no longer satisfies an open-only filter. Find the same ID in an appropriate scope and inspect its resulting Assignee and Status. Observe actual refresh/selection behavior rather than assuming timing.
10. You can report the actual before-state, accepted submission and observed after-state. You cannot claim that the assignee changed from Alfredo to Gail when Alfredo was not observed.
11. Inspect the status filters, pie/bar grouping, table/detail displays and Assign Action's static rule, using lineage to identify other consumers. Then verify behavior after any coordinated change.
12. A configured and verified external write-back integration. An object edit or a success notification does not establish that either original transactional system changed.

## One worked scenario connecting the lessons

This is an invented example for reasoning, not a live test result.

A worker filters to open Orders for one customer. The table and charts represent that same scope. They select `OG-101`; the details panel and Assign form both identify `OG-101`. They submit Alex as assignee. The configured rule sets Assignee to Alex and Status to assigned. Once the updated state is reflected, `OG-101` no longer matches the open filter. The worker verifies the same ID in a broader scope and sees the expected values.

If the Order disappears, that observation alone does not mean it was deleted. If a success notification appears, that alone does not prove the correct target changed. The full identity-and-state trace explains what happened.

## How to review the depth

Tell me which lesson still leaves you unable to explain why the step exists, where you would use it, or how to recognize an incorrect result. You can use these questions as self-study; no exam or badge submission is involved.

The notes distinguish exact course configuration, invented teaching examples, current documentation context and historical practical evidence. They do not claim that notifications, closed-order validation, conflict handling, audit configuration or external write-back have been implemented.

## Preservation and next practical step

The previous versions are preserved in the [second-half archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz), with [checksums](../../study-backups/2026-09-09/e2e-second-half-depth/SHA256SUMS). The first half's teaching content is retained; its review-status wording and the old pause at lesson 24 have been updated to reflect your instruction to continue.

Review this half, then use the [practical evidence plan](PRACTICE-AND-EVIDENCE.md) to verify the existing Foundry resources when access is available. No live app or Action was changed by this documentation pass.
