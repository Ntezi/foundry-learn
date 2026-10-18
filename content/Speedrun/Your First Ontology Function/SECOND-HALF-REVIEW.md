# Second-half review: columns, charts and Actions

Lessons **14–26** are now revised with deeper explanations for a software engineer new to Foundry. Your “continue” authorized this half using the established approach. All 26 lesson notes have now received the teaching-depth revision; understanding review and practical evidence remain separate.

## Read by the question you want to answer

| Topic | Start here | Main lesson to take away |
|---|---|---|
| Per-clinic comparison | [14](14-introduction.md), [15](15-add-an-additional-function-to-your-code.md), [16](16-add-a-function-backed-column-to-your-workshop.md) | A result needs stable object identity and a compatible consumer contract |
| Interpreting colors | [17](17-add-conditional-formatting-to-your-new-column.md) | Thresholds, overlaps, boundaries and missing values require explicit meaning |
| Trends | [18](18-introduction.md), [19](19-add-an-additional-function-to-your-code.md), [20](20-add-a-function-backed-chart-in-workshop.md) | A monthly result needs scope, valid periods and an explanation of available history |
| Operational changes | [21](21-introduction.md), [22](22-add-an-additional-function-to-your-code.md), [23](23-attach-your-function-to-an-action.md), [24](24-add-your-function-backed-action-to-workshop.md) | Proposed edits, authorized submission and observed state are separate |
| Transfer and next learning | [25](25-conclusion.md), [26](26-additional-learning-materials.md) | Choose response shapes and platform boundaries around the user's decision |

The code lessons are longer because small implementation choices affect the meaning of the result. The introduction lessons emphasize purpose; integration lessons emphasize bindings and diagnosis. You do not need to memorize every API name to explain the workflow.

## Work these scenarios before reading the guidance

1. Clinic A has DSO 40 and Clinic B has DSO 25. Why should the table function return object-keyed values instead of an array in row order?
2. The table contains a clinic with an empty DSO cell. What could be wrong even if the calculation itself is correct?
3. Which supplied functions explicitly fall back to all Financial records when clinicName is missing? Which use a direct equality filter?
4. A table filter leaves one clinic visible. Does the course column function now query only that clinic? Explain the dependency that would be needed.
5. Which conditions match DSO values 30, 35, 40 and 40.01? Why does rule order matter?
6. June 2026 has billed 1,200 and collected 900. May has billed 800 and collected 930. Calculate the June and May chart points separately.
7. Does the monthly chart show percentage changes or archived month-end decisions? What can cause an older bar to change later?
8. Did the local timestamp check prove the course expression fails? What still needs verification?
9. Preview returns review enabled and a goal. What does that establish, and what would prove persistence?
10. With DSO 40, what goal range does the demonstration multiplier produce? Why is that insufficient as a real policy?
11. A submission appears to time out. Why could blindly retrying the toggle be incorrect?
12. The function preview works but the Action fails in Workshop. Which boundaries should you inspect?

## Answer guidance

1. The key identifies the Clinic independently of sorting and filtering. Position does not reliably establish identity. The query's clinicName association and the output's object specifier have different roles.
2. Check whether the returned map contains that Clinic's specifier, whether the first Clinic page omitted it, and whether the function uses the table's actual object type. Missing output is not a calculated zero.
3. The scalar and monthly chart functions contain the explicit truthy-name fallback. The column and edit functions filter directly by clinicName. Undefined filter behavior is not established here; do not assume all four implementations behave identically.
4. No such guarantee follows from visibility. The supplied column function fetches its own Clinic page. Narrow computation needs an appropriate input and code that uses it; the course signature and documented table input remain an integration question.
5. At 30: none. At 35: only >30. At 40: >35 and >30. At 40.01: all three. Source order is >40 Danger, >35 Warning, >30 Success. Verify rendered priority and boundary behavior later; values at or below 30 have no match among these rules.
6. June: 30 + (300/930 × 31) = 40 days. May: 800/930 × 31 ≈ 26.67 days. May starts with May's billed amount and does not use later June collections. These are invented teaching figures.
7. It returns absolute monthly DSO calculations from currently available data. It is neither a percent-change series nor an automatic audit snapshot. Corrections to historical records can change recomputed points.
8. No. Local Node accepted the shortened expression for the tested months. Explicit first-of-month UTC construction also produced correct June, year-transition and leap-February boundaries locally. Actual Foundry runtime output, input validity and chart display still need checking.
9. It establishes that a proposed edit description was returned in that preview context. Applied Action evidence plus the intended Clinic's observed before/after state is needed to establish persistence.
10. Mathematically, 28 inclusive to 38 exclusive. A random target has no business justification, and unreliable DSO can yield an unreliable goal. The real process needs an explainable baseline and target rule.
11. The first submission may already have applied. A later toggle against refreshed state can undo it. Inspect the outcome and current object state before deciding how to proceed; concurrency and retry guarantees are not inferred from the snippet.
12. Inspect released function/version, Action rule and target parameter, actual input identity, relevant permissions/submission rules, execution outcome and resulting object state. Preview covers only part of this path.

## What changed in the evidence

- All three lesson 17 thresholds are now confirmed from the lesson text/screenshots: >40 Danger, >35 Warning, >30 Success. Their overlap and uncovered values are explained.
- The local date check did **not** reproduce Invalid Date for the tested shortened month strings. Notes now distinguish a portability/validation concern from a proven Foundry bug.
- Column and edit code use direct clinicName filters and duplicate the calculation. Their behavior is distinguished from the scalar/chart fallback rather than described as shared code.
- The table input discrepancy remains open for installed-runtime inspection. Live pagination, binding, formatting, Action persistence and goal clearing remain planned practical checks.

## Your review and the next step

Please review whether you can now explain why each component exists, where you would use it, and how you would recognize an incorrect result. Point out any passage that still assumes too much Foundry knowledge. Lessons 15, 17, 19 and 22 are useful starting points for checking depth.

After the notes review, follow [P0–P5](PRACTICE.md) for practice in the training environment. Practice remains **Not Started**. Learn completion remains **26/26**; no certification or practical mastery is inferred from that completion.

[Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · [Previous-note archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz)
