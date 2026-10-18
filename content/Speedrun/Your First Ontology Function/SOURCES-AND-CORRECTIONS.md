# Sources, corrections, and unresolved evidence

Checked 2026-09-09. Primary evidence was the signed-in Palantir Learn curriculum and all 26 required text lessons, including the four supplied TypeScript snippets. Read-only navigation was used; no completion buttons, Foundry exercises, or certification tests were executed. Firecrawl could not resolve its service host and the public web fetcher returned 403 for Learn; the browser provided access. Public Palantir documentation was accessible.

## Evidence boundaries

- The current course reports **26/26 complete**. The old tracker said the same; this has now been corroborated at course level.
- Reading an official procedure does not verify that the procedure works in this enrollment. No repositories, SDKs, releases, applications, or Actions were created or tested this session.
- Text and code coverage: 26/26 required lessons. Embedded screenshots were not comprehensively inspected; all three conditional-formatting thresholds were specifically verified from text/screenshots during the second-half revision. Optional feedback is not an instructional requirement and was not submitted.
- These notes paraphrase course material, label additional reasoning, and preserve earlier observations. The course’s “customer engineer” scenario is used for FDE reasoning; supplemental design recommendations are not course requirements.

## Substantive corrections

| Where | Earlier omission or overstatement | Reviewed correction and evidence |
|---|---|---|
| Lesson 1 | FoO defined as inherently TypeScript | The course uses TypeScript v2; the broader feature also supports Python. [Functions overview](https://www.palantir.com/docs/foundry/functions/overview) |
| Lesson 11 | SDKs always manually generated dependency snapshots | Course shows a version/install flow; newer local SDKs update from resource imports and are bundled when tagging. Identify the actual mode. [Local SDKs](https://www.palantir.com/docs/foundry/functions/local-sdks) |
| Lesson 12 | Optional clinic described without fallback consequences | Supplied code queries all financials if clinicName is absent or empty, even when a Clinic was supplied. Missing months/amounts and insufficient history have silent behavior. [Actual scalar lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131599) |
| Lesson 15 | “Fetches Clinics” could imply all clinics | One `fetchPage()` reads one page with no continuation handling; financial queries then repeat per clinic. Course prose says FunctionsMap but v2 code returns Record. [Actual column lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131559) |
| Lessons 15–16 | Input contract mismatch omitted | Object Table documentation specifies an object-set input (object array also supported); the course snippet only accepts Client. Record both; verify the accepted signature in the installed runtime before integration. [Object Table specification](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/#function-backed-columns) |
| Lesson 17 | Color outcomes lacked complete text evidence | Text and inspected screenshots confirm `> 40` Danger, `> 35` Warning and `> 30` Success in course order. Conditions overlap; values at/below 30 match none. Rendered priority remains a practical check. [Actual formatting lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131742) |
| Lesson 19 | UTC buckets described as though construction were guaranteed valid | Course expects YYYY-MM but appends a time without a day. Local Node accepted the tested June, December and leap-February expressions; this is not a reproduced failure. Explicit day construction also passed local boundary checks. Actual Foundry output still needs preview validation. [Actual chart-code lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131743) |
| Lesson 22 | Preview/edit declaration could be mistaken for persistence or authorization | Edits declares entity types and returns a batch. Ordinary edit-function execution outside an Action does not persist object changes. [TypeScript v2 edits](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits) |
| Lessons 22–24 | Toggle/random goal presented without operational consequences | Explain duplicate submission, competing operators, and policy ownership. These are supplemental design considerations, not tested concurrency guarantees. Random multiplier is [0.7, 0.95). |
| Release sequence | Commit/tag/build/consumption blurred | Preserve course tags 1.0.0–1.0.3, but verify successful release build and consumer selection separately. Published versions are immutable; required-input/output changes can break consumers. [Versioning](https://www.palantir.com/docs/foundry/functions/functions-versioning) |

## Supporting documentation and purpose

- [Functions overview](https://www.palantir.com/docs/foundry/functions/overview): server-side isolated logic and supported languages.
- [Use functions in Workshop](https://www.palantir.com/docs/foundry/workshop/functions-use): consumption relationships; select the appropriate language generation when reading examples.
- [Object Table](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/#function-backed-columns): v2 map output, object input, and runtime-input optimization.
- [Chart XY](https://www.palantir.com/docs/foundry/workshop/widgets-chart/#function-aggregations-function-backed-layers): chart aggregation return contracts.
- [Local SDKs](https://www.palantir.com/docs/foundry/functions/local-sdks): distinguish manual course workflow from automatically generated local bindings.
- [TypeScript v2 edits](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits): proposed batches versus persisted Action changes.
- [Action permissions](https://www.palantir.com/docs/foundry/action-types/permissions): distinguish view, edit, and apply; check submission criteria and relevant data permissions.
- [Function versioning](https://www.palantir.com/docs/foundry/functions/functions-versioning): compatibility and immutable published versions.
- [Current Associate guide](https://learn.palantir.com/page/palantir-application-developer-associate-certification-exam-guide): explicit relevance to Ontology Functions, Actions, Workshop, and security domains. This speedrun is partial preparation, not coverage of all eight exam domains.

## Supplemental worked example — paper reasoning only

Assume the newest month has 30 days, 1,200 billed, and 900 collected; the previous month has 30 days and 900 collected. Following the **course algorithm**, start from 1,200. The newest 900 does not cover it, so add 30 days and leave 300. The previous month covers the balance, so add 300/900 × 30 = 10 days. Result: 40 days.

This illustrates the snippet; it is not a validation of an accounting standard or an observed Foundry result. Ask the metric owner whether billed amount is the appropriate starting balance, how credits and partial periods should behave, and how insufficient history should be surfaced. Do not silently change the formula in the training build.

## Before calling the notes Reviewed

Explain the four output contracts; resolve the column input and month-conversion questions; explain the now-confirmed formatting thresholds and plan rendered boundary checks; identify SDK mode and installed API names when access is available. Access-dependent details can remain explicit preflight checks, but do not proceed past a dependent practice step while its contract is unresolved.

## First-half teaching revision — September 9, 2026

At the learner's request, lessons 01–13 were rewritten using the deeper explanatory approach accepted for the E2E notes. At that checkpoint, lessons 14–26 remained unchanged pending review. The learner subsequently authorized continuation; the second-half revision is recorded below. Earlier versions are archived; first-half teaching text replaces short summaries and repeated historical appendices. [First-half review guide](FIRST-HALF-REVIEW.md).

The signed-in course overview again showed 26/26 complete. The scalar code in lesson 2131599 and Workshop binding instructions in 2131635 were reopened and read. Other course-specific steps use the official text already inspected in this session. Public local-SDK, TypeScript v2 getting-started and function-versioning documentation was checked for supporting context. No live exercise, release, installation, assessment or feedback submission was performed.

Additional code-reading explanations: the loop only iterates observed month keys and therefore does not count entirely missing calendar months; the UTC day-zero expression computes month lengths; async iteration of records is not a live ingestion stream; the newest billed total is the sole starting amount. Empty/undefined months and malformed values should not be conflated: the explicit skip only tests undefined. No dedicated validation of reporting format, complete periods, negative values or unique clinic names is supplied. These observations describe the actual snippet rather than an implemented fix.

The expanded worked example uses June 2026 (30 days), billed 1,200 and collected 900, then May 2026 (31 days), collected 930: 30 + 300/930 × 31 = 40. The aggregation example uses 600/600 and 600/1,200 over 30 days: clinic results 30 and 15, simple mean 22.5, combined result 20. Arithmetic was checked locally; these are invented examples, not live clinic results or validation of an accounting methodology.

## Second-half teaching revision — September 9, 2026

Lessons 14–26 now have detailed purpose, code reasoning, examples and integration diagnostics. Source rechecks covered column code, the three formatting rules, monthly code and edit code. Object Table and TypeScript v2 edit documentation were reopened. The edit snippet copies the calculation and filters directly by clinicName; it does not invoke the scalar or use its explicit all-clinic fallback. The same direct-filter distinction applies to the column snippet.

Local Node accepted the course's shortened `YYYY-MMT00:00:00.000Z` examples for 2026-06, 2026-12 and 2028-02. Explicit first-day UTC construction returned next-month boundaries with durations 30, 31 and 29 days respectively. This corrects any implication that a runtime failure was already proven. Actual Foundry preview remains outstanding. The June/May example yields 40 and approximately 26.67 days; the illustrative DSO-40 goal range is mathematically [28, 38). No live data or mutations were used.

The [second-half review](SECOND-HALF-REVIEW.md) separates source-confirmed details, local checks and planned runtime evidence. The preceding notes are preserved in the [second-half archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). Practice remains Not Started; learner understanding review is still required.
