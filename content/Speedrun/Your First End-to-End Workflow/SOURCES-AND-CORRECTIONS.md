# E2E sources and revision decisions

Reviewed September 9, 2026. All 47 required lesson texts and the optional Marketplace alternative were read in the signed-in [official course](https://learn.palantir.com/speedrun-your-first-e2e-workflow). Every numbered note links its actual lesson. Embedded screenshots were not comprehensively inspected; current written instructions are the primary procedural evidence.

## Completion evidence

Before review: 2/47 in Learn, while older local notes claimed completion. After reviewing all required text lessons: **47/47 (100%)**, with [course certificate](https://verify.skilljar.com/c/vswho2k69ymw). Learn automatically marks these text lessons complete when opened. No bulk completion API was used and no assessment was answered. This confirms the portal’s course-completion state, not the learner’s comprehension or practical mastery. The historical claim remains preserved; its original cause of disagreement is not established.

The required count is 47. Existing numbering includes optional Marketplace as 09, so the complete collection ends at **48 — Additional Learning Material**. Optional badge assessment and feedback are not required for 47/47 and were not attempted.

## Corrections and added reasoning

| Lessons | Revision | Source/evidence |
|---|---|---|
| 02–06 | Added missing permissions, scenario and setup notes. Current project setup uses organization space/template and optionally changes other users from Editor to Viewer. Do not copy Discover from another course. | Current lessons 1944887, 1790983, 1790906, 1790882, 1790905 |
| 07–10 | Distinguish source snapshots, structured datasets, recurring Data Connection and optional Marketplace. Optional installation is not an extra mandatory build. | Current ingestion lesson text; optional 2121226 |
| 13–17 | Nonempty identifiers are not proof of uniqueness; customer-master duplicates can inflate joins; union does not prove global order identity. Old notes describe a left join, but current written lesson steps do not explicitly specify its type. Keep historical settings separate from official text. | Current cleaning/join/union lessons plus preserved earlier build records |
| 18–23 | Separate pipeline preview, defined output, deployment/build, saved object schema and indexing. Retain the historical API-name conflict and successful MariusTrainingOrder name; do not create a conflicting duplicate. | Current output/Ontology lessons and prior resource IDs |
| 28–29 | Explain filter criteria vs filtered object set vs selected active object. Course text alternates Order Filter/Order Filters; select the actual created variable. UI filtering does not grant or restrict data authorization. | Current filter/details lessons |
| 33 | Days Until Due is a property used by the chart, not a calculation created by this course. Local CSVs contain days_until_due. Do not claim the value advances with the calendar. | Current bar-chart lesson; local source headers inspected |
| 37–45 | Only Assign Order is implemented. Closing orders and source-system write-back are mentioned as future scope, not completed behavior. Restrict the course Action to the learner user, as the current text instructs. | Current Workshop conclusion, Action steps and final conclusion |
| 46 | Verify actual starting Assignee; earlier execution record already saw Gail Weber. Reapplying the same value does not demonstrate a change from Alfredo. | Current test lesson and preserved prior observation |
| 47 | Added the current Workflow Lineage walkthrough and cross-team change-impact reasoning. Bulk deletion, publishing and security changes are listed capabilities, not required actions to execute. | Current conclusion 1792219 |
| 48 | Added required Additional Learning Material note; separate optional badge and certification. | Current required lesson 1999680 and live completion summary |

## Supporting official documentation

- [Pipeline Builder overview](https://www.palantir.com/docs/foundry/pipeline-builder/overview): supporting platform context for pipeline construction; this course supplies the exact transforms.
- [Workshop overview](https://www.palantir.com/docs/foundry/workshop/overview): applications over object data, with Actions for write-back and Functions for business logic.
- [Action types overview](https://www.palantir.com/docs/foundry/action-types/overview): an Action Type defines a coordinated set of changes, inputs and side effects; object edits become part of shared application state.
- [Action permissions](https://www.palantir.com/docs/foundry/action-types/permissions): view/edit/apply distinctions and submission criteria; previously inspected this session’s study work.

Additional reasoning about identity, freshness, join cardinality and operator error is labelled as explanation in the notes. It is not an assertion that the tutorial implements all production controls.

## Preservation

Original 41 notes and pre-revision central trackers were archived before rewriting: [backup](../../study-backups/2026-09-09/e2e-revision/notes-before-revision.tar.gz). Their unique content and practical observations are preserved in archives; later teaching revisions move historical logs out of the main lesson text. Earlier per-lesson approval restrictions are historical; the current request authorizes course work. No unrelated workspace files were changed.

## First-half teaching revision — September 9, 2026

At the learner's request, lessons 01–24 were rewritten to explain purpose, concepts, use cases and software-engineering connections directly in the main text. Lesson-specific formats replace the repeated checklist template. Lessons 25–48 were left unchanged, pending learner review. [Review guide](FIRST-HALF-REVIEW.md).

Exact course procedures use the official lesson text already inspected earlier in this session; the course pages were not re-completed for this editorial pass. Public [Pipeline Builder](https://www.palantir.com/docs/foundry/pipeline-builder/overview), [Ontology](https://www.palantir.com/docs/foundry/ontology/overview) and [Workshop](https://www.palantir.com/docs/foundry/workshop/overview) overviews were checked for supporting context. Architectural analogies and invented worked examples are teaching explanations, not claims that the course implements a production architecture.

The supplied local CSVs were independently inspected with UTF-8 BOM handling: Office Goods 746 data rows/10 fields; Bureau 746/9; customers 59/4. Both order files had no missing or whitespace-only order IDs and no repeated IDs within or across the files. All order customer IDs matched the appropriate nonempty master lookup key exactly once. These are local-file observations, not a new Foundry execution. Under the described transformations they support an expected combined population of 1,492; the live output still needs separate verification.

The previous lesson-14 description of `orderPlacementDate` as a struct was an earlier imported-schema observation; the local CSV contains timestamp text. The revised note explains why the imported type must be inspected. Historical one-step approval instructions were moved out of the teaching path with the archived originals; the current pause after lesson 24 is the learner's explicit review request.

## Second-half teaching revision — September 9, 2026

The learner accepted the first half's explanatory depth and requested continuation. Lessons 25–48 were rewritten with purpose, worked scenarios, software-engineering comparisons, configuration reasoning and answer guidance. All previous files were archived with checksums. The accepted first-half explanations were retained; only review-status wording and the transition at lesson 24 were updated. [Second-half review](SECOND-HALF-REVIEW.md).

Course-specific steps rely on the signed-in lesson text already inspected in this study session and the recorded configuration, with historical execution clearly labelled. This pass did not rerun lessons or make live Foundry edits. Current supporting official references checked:

- [Workshop variables](https://www.palantir.com/docs/foundry/workshop/concepts-variables) and [object-set filter variables](https://www.palantir.com/docs/foundry/workshop/object-set-filter-variables): distinguish data definitions, criteria and selection.
- [Workshop publishing and versioning](https://www.palantir.com/docs/foundry/workshop/versions): save/publish can be coupled by a setting, and View can show a specific non-published version. Corrected the older unconditional autosave-versus-publish wording.
- [Action types](https://www.palantir.com/docs/foundry/action-types/overview), [permissions](https://www.palantir.com/docs/foundry/action-types/permissions), and [using Actions in Workshop](https://www.palantir.com/docs/foundry/workshop/actions-use): distinguish the rule, form, application default and permitted submission. Removed the earlier implication that prefilling a target guarantees a different target cannot be submitted.
- [Object edits overview](https://www.palantir.com/docs/foundry/object-edits/overview) and [how edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied): avoid universal claims about edit defaults or how future source updates interact with user edits; inspect the actual configuration.

Worked counts and `OG-101`/Alex scenarios are explicitly invented teaching examples. The test Order ID, historical Gail Weber before/after observation, Action API name and prior module versions remain historical evidence. The revision does not claim a new assignment transition, current production readiness, notification, external write-back, conflict handling or assessment pass.
