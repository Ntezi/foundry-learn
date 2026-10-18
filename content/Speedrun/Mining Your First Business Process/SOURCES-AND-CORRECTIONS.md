# Sources and interpretation notes

Inspected September 12, 2026 through the signed-in [official course](https://learn.palantir.com/speedrun-mining-your-first-business-process). Registered, read required lessons 01–13, and verified 13/20 (65%) on the overview. The index and lesson-manifest.json map each prepared note to its actual lesson ID. Continuation: all remaining lesson bodies 14–20 were read, and the overview confirmed 20/20 (100%) with course certificate g5mndqs6heeh. Optional feedback remained unopened.

The notes paraphrase the course. Engineering comparisons, synthetic event histories, duration calculations, data-quality checks and review questions are teaching additions. They do not report results from the user's Foundry environment. The two conditional-formatting screenshots in lesson 17 were inspected directly for exact ranges and inclusivity. No live Foundry screen was used.

| Source wording or possible confusion | Treatment in the notes |
|---|---|
| Early overview describes manual data upload | The actual first-half procedure uses the named Marketplace package. Follow the specific installation lesson. |
| Installation introduction mentions adding agentic functionality | Flagged as an apparent copied introduction; this exercise mines claims histories. No agent or model call is taught in these steps. |
| Timestamp format contains a literal T | T separates date and time; it does not establish UTC. Confirm the actual parser's timezone handling. |
| A graph describes how claims flowed | Qualify this as what available, correctly correlated and ordered logs support. Missing or delayed events limit the conclusion. |
| Seven states and nine transitions | Source example counts, not verified counts from a local installation or universal expected output. |
| Removing graph states | This does not delete the underlying events or objects. |
| Rename generated artifacts | The demonstrated operation changes a Log Object Type display name/plural after checking lineage; do not assume API identifiers or all resources are renamed. |
| Real-time process visibility | Product capability does not establish fresh ingestion for the installed training fixture. |

The [current official Machinery overview](https://www.palantir.com/docs/foundry/machinery/overview/) was checked for product context: Machinery supports modeling and analyzing business processes and their state changes. Its broader capabilities do not mean every capability is configured by this speedrun.

The older process-mining/overview documentation link supplied by the course could not be opened by the research tool. This is a source-access limitation, not proof that the destination is unavailable in every browser. The linked installation deep-dive was not separately inspected; the notes do not invent its unseen prompts.

A Learn course certificate is available from required-page completion. No completed hands-on build, learner hours, optional feedback submission or certification progress is claimed. Central status is maintained in [PROGRESS.md](../../PROGRESS.md).

## Second-part interpretation corrections

- Lesson 16 defines Historical Count as entry/transition occurrences. Its narrative's 266 entries, 16 exits and 170 non-high-risk cases are source examples, not observed local results; do not silently treat occurrences as unique claims.
- The introductory use of “throughput” for average exit time is ambiguous. Use actual metric tooltips and units. No unverified duration formula is supplied.
- Current durations increase as the old notional fixture ages. A current risk flag may differ from risk at the time of routing.
- The lesson 17 screenshots show Success [0,100) and Danger [101,400). The illustrated rules leave integer 100 and all counts at or above 400 uncovered. Any complete-range alternative in the notes is a teaching proposal.
- Total Counts Alert is a Current Count view, not a monetary aggregation or notification. Publishing is a separate concern from saving an edit.
- Lesson 18's predicate is state AND risk with Objects added to set. It has no time-in-state condition. Live monitoring does not prove instant delivery; initial membership, grouping windows and re-entry semantics were not established by the course text.
- The summary's “long-term solution” language exceeds the demonstrated remediation: no upstream routing-rule change or before/after improvement measurement is shown. The notes distinguish diagnosis, monitoring and repair.
- The conclusion's future-course promise was not verified as a current availability claim. Linked follow-up courses were not completed in this continuation.
