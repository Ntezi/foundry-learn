# Speedrun: Your First Ontology Function

[Official course](https://learn.palantir.com/speedrun-your-first-ontology-function) · checked 2026-09-09 · published duration 45–60 minutes (catalogue), under one hour (course overview) · Application Developer track, Starting from Scratch step 4.

The previous tracker recorded 26/26 required Learn lessons complete. The signed-in course now confirms 26/26 (100%). This is course completion, not certification or practical mastery. Foundry execution remains Not Started. The 26 lesson texts and supplied code were inspected this session; screenshots were not comprehensively inspected. Optional feedback was not submitted.

**Notes: all 26 lessons revised in depth.** You authorized continuing after the first half; lessons 14–26 now explain row identity, query scope, formatting, monthly calculations and governed edits. Start with the [second-half review guide](SECOND-HALF-REVIEW.md), or revisit the [first-half guide](FIRST-HALF-REVIEW.md). Prior versions are archived; course completion, understanding review and practical mastery remain separate.

## Learning map

Clinic + monthly Financial objects → imported/generated SDK bindings → TypeScript v2 Functions → Workshop variable, column, chart → function-backed Action → updated Clinic state.

| Output | Purpose | Important boundary |
|---|---|---|
| Double | Overall or selected-clinic KPI | Calculation scope is not automatically the visible table filter |
| Record<ObjectSpecifier<Clinic>, Double> | Align results to Clinic rows | Course snippet and documented input requirements differ |
| TwoDimensionalAggregation<Range<TimestampISOString>, Double> | Monthly chart | Validate date conversion and incomplete periods |
| Edits.Object<Clinic>[] | Describe proposed Clinic changes | Persistence requires the Action execution surface |

## Lesson tracker

Current scope: review lessons 14–26, completing the column/chart/Action path. First-half continuation was authorized; independent understanding review remains separate. Practice remains Not Started; earlier planned dates are not completed study time.

| # | Module | Actual lesson | Notes revision | Practice | Exercise |
|---:|---|---|---|---|---|
| 01 | Overview | [Course Introduction](01-course-introduction.md) | Deep revision; continuation authorized | Not Started | P0 |
| 02 | Overview | [Permissions & Help](02-permissions-help.md) | Deep revision; continuation authorized | Not Started | P0 |
| 03 | Overview | [The Use Case](03-the-use-case.md) | Deep revision; continuation authorized | Not Started | P0 |
| 04 | Project Setup | [Introduction](04-introduction.md) | Deep revision; continuation authorized | Not Started | P0 |
| 05 | Project Setup | [Create a Foundry Learning Project](05-create-a-foundry-learning-project.md) | Deep revision; continuation authorized | Not Started | P1 |
| 06 | Project Setup | [Create a Course-Specific Training Folder](06-create-a-course-specific-training-folder.md) | Deep revision; continuation authorized | Not Started | P1 |
| 07 | Uploading the Data | [Introduction](07-introduction.md) | Deep revision; continuation authorized | Not Started | P1 |
| 08 | Uploading the Data | [Deploy Assets via Marketplace](08-deploy-assets-via-marketplace.md) | Deep revision; continuation authorized | Not Started | P1 |
| 09 | Create a Function-Backed Variable | [Introduction](09-introduction.md) | Deep revision; continuation authorized | Not Started | P1 |
| 10 | Create a Function-Backed Variable | [Create a Code Repository](10-create-a-code-repository.md) | Deep revision; continuation authorized | Not Started | P1 |
| 11 | Create a Function-Backed Variable | [Add Ontology Object References and Generate the SDK](11-add-ontology-object-references-and-generate-the-sdk.md) | Deep revision; continuation authorized | Not Started | P1 |
| 12 | Create a Function-Backed Variable | [Add Code to Your Repository](12-add-code-to-your-repository.md) | Deep revision; continuation authorized | Not Started | P1 |
| 13 | Create a Function-Backed Variable | [Configure Your Function in Workshop](13-configure-your-function-in-workshop.md) | Deep revision; continuation authorized | Not Started | P1 |
| 14 | Create a Function-Backed Column in Workshop | [Introduction](14-introduction.md) | Second-half revision: ready for review | Not Started | P2 |
| 15 | Create a Function-Backed Column in Workshop | [Add an Additional Function to Your Code](15-add-an-additional-function-to-your-code.md) | Second-half revision: ready for review | Not Started | P2 |
| 16 | Create a Function-Backed Column in Workshop | [Add a Function-Backed Column to Your Workshop](16-add-a-function-backed-column-to-your-workshop.md) | Second-half revision: ready for review | Not Started | P2 |
| 17 | Create a Function-Backed Column in Workshop | [Add Conditional Formatting to Your New Column](17-add-conditional-formatting-to-your-new-column.md) | Second-half revision: ready for review | Not Started | P2 |
| 18 | Create a Function-Backed Chart in Workshop | [Introduction](18-introduction.md) | Second-half revision: ready for review | Not Started | P3 |
| 19 | Create a Function-Backed Chart in Workshop | [Add an Additional Function to Your Code](19-add-an-additional-function-to-your-code.md) | Second-half revision: ready for review | Not Started | P3 |
| 20 | Create a Function-Backed Chart in Workshop | [Add a Function-Backed Chart in Workshop](20-add-a-function-backed-chart-in-workshop.md) | Second-half revision: ready for review | Not Started | P3 |
| 21 | Create a Function-Backed Action | [Introduction](21-introduction.md) | Second-half revision: ready for review | Not Started | P4 |
| 22 | Create a Function-Backed Action | [Add an Additional Function to Your Code](22-add-an-additional-function-to-your-code.md) | Second-half revision: ready for review | Not Started | P4 |
| 23 | Create a Function-Backed Action | [Attach Your Function to an Action](23-attach-your-function-to-an-action.md) | Second-half revision: ready for review | Not Started | P4 |
| 24 | Create a Function-Backed Action | [Add Your Function-Backed Action to Workshop](24-add-your-function-backed-action-to-workshop.md) | Second-half revision: ready for review | Not Started | P4 |
| 25 | Conclusion | [Conclusion](25-conclusion.md) | Second-half revision: ready for review | Not Started | P5 |
| 26 | Conclusion | [Additional Learning Materials](26-additional-learning-materials.md) | Second-half revision: ready for review | Not Started | P5 |

## Next step

Review [lessons 14–26](SECOND-HALF-REVIEW.md) and their worked examples before the planned practice. The column-input question and runtime checks remain in [sources and corrections](SOURCES-AND-CORRECTIONS.md). All formatting thresholds are now source-verified; local Node accepted the tested course date expressions. No dependent Foundry practical steps have been performed.

[Central study plan](../../STUDY-PLAN.md) · [Central progress](../../PROGRESS.md) · [Practice plan](PRACTICE.md)

**Go deeper in the Ontology area:** [09 — Functions](../../Ontology/09-functions/README.md)
