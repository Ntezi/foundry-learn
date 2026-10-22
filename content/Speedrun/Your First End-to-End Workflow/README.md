# Speedrun: Your First End-to-End Workflow

[Official course](https://learn.palantir.com/speedrun-your-first-e2e-workflow) · [Course certificate](https://verify.skilljar.com/c/vswho2k69ymw) · reviewed September 9, 2026.

**Learn: 47/47 required lessons complete (100%).** At the start of the September 9 course review, the live portal showed 2/47 despite the historical tracker’s completion claim. All required text lessons were opened and read; Learn automatically recorded their completion. The optional Marketplace alternative was also read. No optional badge assessment, feedback or certification exam was taken.

**Notes: all 48 teaching revisions complete; second half ready for review.** You accepted the explanatory depth of lessons 01–24 and asked to continue. Lessons 25–48 now explain Workshop state, filtering, charts, publishing, Actions, testing and lineage with worked examples and software-engineering connections. Start with the [second-half review guide](SECOND-HALF-REVIEW.md), or revisit the [first-half guide](FIRST-HALF-REVIEW.md). The 48 numbered files comprise 47 required lessons plus optional Marketplace at position 09; earlier versions and execution logs are archived.

**Practice is separately tracked:** [practical plan and evidence](PRACTICE-AND-EVIDENCE.md). Learner comprehension and practical mastery are not inferred from assisted lesson review or the completion certificate.

## The workflow

Office Goods orders + Bureau orders → source-specific cleaning → customer-master joins → union → built all_orders dataset → indexed Order objects → Workshop filtered object set → table/charts/details → selected-order Assign Action → observed Assignee/Status.

The underlying business problem is managing one fulfillment queue while two transactional systems remain separate. The tutorial uses static data and does not implement source-system write-back, recurring ingestion or a close-order command.

## Lesson tracker

Current review: lessons 25–48. The first half’s explanatory depth was accepted; this does not mark independent mastery as verified. Read at your own pace using both review guides and their answer guidance. Practical execution remains separately tracked.

| Position | Module | Actual lesson | Learn | Notes revision |
|---:|---|---|---|---|
| 01 | Overview | [Introduction](01-overview-introduction.md) | Complete | Depth accepted; understanding checks available |
| 02 | Overview | [Permissions & Help](02-permissions-help.md) | Complete | Depth accepted; understanding checks available |
| 03 | Overview | [The Use Case](03-the-use-case.md) | Complete | Depth accepted; understanding checks available |
| 04 | Setting up your Project and Folder | [Introduction](04-introduction.md) | Complete | Depth accepted; understanding checks available |
| 05 | Setting up your Project and Folder | [Create a Foundry Learning Project](05-create-a-foundry-learning-project.md) | Complete | Depth accepted; understanding checks available |
| 06 | Setting up your Project and Folder | [Create a Course-Specific Training Folder](06-create-a-course-specific-training-folder.md) | Complete | Depth accepted; understanding checks available |
| 07 | Ingestion: Getting Data Into Foundry | [Introduction](07-ingestion-introduction.md) | Complete | Depth accepted; understanding checks available |
| 08 | Ingestion: Getting Data Into Foundry | [Manual Upload](08-manual-upload.md) | Complete | Depth accepted; understanding checks available |
| 09 | Ingestion: Getting Data Into Foundry | [[Optional] Deploy Datasets via Marketplace](09-optional-deploy-datasets-via-marketplace.md) | Optional alternative read | Depth accepted; understanding checks available |
| 10 | Ingestion: Getting Data Into Foundry | [Conclusion](10-ingestion-conclusion.md) | Complete | Depth accepted; understanding checks available |
| 11 | Transforming the Data | [Introduction](11-transforming-data-introduction.md) | Complete | Depth accepted; understanding checks available |
| 12 | Transforming the Data | [Create a new Pipeline and add data](12-create-pipeline-and-add-data.md) | Complete | Depth accepted; understanding checks available |
| 13 | Transforming the Data | [Clean Bureau SAS](13-clean-bureau-sas.md) | Complete | Depth accepted; understanding checks available |
| 14 | Transforming the Data | [Clean Office Goods Corp](14-clean-office-goods-corp.md) | Complete | Depth accepted; understanding checks available |
| 15 | Transforming the Data | [Join Clean Office Goods with Customer List](15-join-clean-office-goods-with-customer-list.md) | Complete | Depth accepted; understanding checks available |
| 16 | Transforming the Data | [Join Clean Bureau with Customer List](16-join-clean-bureau-with-customer-list.md) | Complete | Depth accepted; understanding checks available |
| 17 | Transforming the Data | [Union Datasets](17-union-datasets.md) | Complete | Depth accepted; understanding checks available |
| 18 | Transforming the Data | [Set a Dataset Output](18-set-a-dataset-output.md) | Complete | Depth accepted; understanding checks available |
| 19 | Transforming the Data | [Finalize and Run Pipeline](19-finalize-and-run-pipeline.md) | Complete | Depth accepted; understanding checks available |
| 20 | Transforming the Data | [Conclusion](20-transforming-data-conclusion.md) | Complete | Depth accepted; understanding checks available |
| 21 | Creating the Ontology | [Introduction](21-creating-the-ontology-introduction.md) | Complete | Depth accepted; understanding checks available |
| 22 | Creating the Ontology | [Create your Object](22-create-your-object.md) | Complete | Depth accepted; understanding checks available |
| 23 | Creating the Ontology | [Conclusion](23-creating-the-ontology-conclusion.md) | Complete | Depth accepted; understanding checks available |
| 24 | Building the Workshop Application | [Introduction](24-workshop-introduction.md) | Complete | Depth accepted; understanding checks available |
| 25 | Building the Workshop Application | [Create the Workshop Module](25-create-workshop-module.md) | Complete | Rewritten; ready for review |
| 26 | Building the Workshop Application | [Add Workshop Title](26-add-workshop-title.md) | Complete | Rewritten; ready for review |
| 27 | Building the Workshop Application | [Create an Object Table](27-create-object-table.md) | Complete | Rewritten; ready for review |
| 28 | Building the Workshop Application | [Create Filter](28-create-filter.md) | Complete | Rewritten; ready for review |
| 29 | Building the Workshop Application | [Add Object Details](29-add-object-details.md) | Complete | Rewritten; ready for review |
| 30 | Building the Workshop Application | [Rename the Object Table](30-rename-object-table.md) | Complete | Rewritten; ready for review |
| 31 | Building the Workshop Application | [Configure Sections](31-configure-sections.md) | Complete | Rewritten; ready for review |
| 32 | Building the Workshop Application | [Create Pie Chart](32-create-pie-chart.md) | Complete | Rewritten; ready for review |
| 33 | Building the Workshop Application | [Create Bar Chart](33-create-bar-chart.md) | Complete | Rewritten; ready for review |
| 34 | Building the Workshop Application | [Move Charts to the Top](34-move-charts-to-top.md) | Complete | Rewritten; ready for review |
| 35 | Building the Workshop Application | [Configure Object Table](35-configure-object-table.md) | Complete | Rewritten; ready for review |
| 36 | Building the Workshop Application | [Saving and Viewing your Workshop Module](36-save-and-view-workshop.md) | Complete | Rewritten; ready for review |
| 37 | Building the Workshop Application | [Conclusion](37-workshop-conclusion.md) | Complete | Rewritten; ready for review |
| 38 | Configuring Actions | [Introduction](38-configuring-actions-introduction.md) | Complete | Rewritten; ready for review |
| 39 | Configuring Actions | [Enabling edits to your object](39-enable-object-edits.md) | Complete | Rewritten; ready for review |
| 40 | Configuring Actions | [Create the "Assign Order" Action](40-create-assign-order-action.md) | Complete | Rewritten; ready for review |
| 41 | Configuring Actions | [Finish configuring the Action](41-finish-configuring-action.md) | Complete | Rewritten; ready for review |
| 42 | Configuring Actions | [Conclusion](42-configuring-actions-conclusion.md) | Complete | Rewritten; ready for review |
| 43 | Making your Workshop Application Operational | [Introduction](43-operational-workshop-introduction.md) | Complete | Rewritten; ready for review |
| 44 | Making your Workshop Application Operational | [Open your Workshop Module](44-open-workshop-module.md) | Complete | Rewritten; ready for review |
| 45 | Making your Workshop Application Operational | [Add Actions to your Workshop](45-add-actions-to-workshop.md) | Complete | Rewritten; ready for review |
| 46 | Making your Workshop Application Operational | [Test Your New Application](46-test-operational-application.md) | Complete | Rewritten; ready for review |
| 47 | Wrapping Up | [Conclusion](47-wrapping-up-conclusion.md) | Complete | Rewritten; ready for review |
| 48 | Wrapping Up | [Additional Learning Material](48-additional-learning-material.md) | Complete | Rewritten; ready for review |

## Next step

Review [lessons 25–48](SECOND-HALF-REVIEW.md), focusing on the selection-to-Action path and the worked test scenarios. Then use the practical plan to verify the existing training build when access is available. Notes completion does not resolve the existing Foundry sign-in blocker.

[Central progress](../../PROGRESS.md) · [Study plan](../../STUDY-PLAN.md) · [Corrections](SOURCES-AND-CORRECTIONS.md)

<!-- apps-go-deeper -->
**Go deeper in the Apps area:** [Workshop foundations](../../Apps/01-workshop-foundations/README.md) · [actions in Workshop](../../Apps/02-workshop-data-and-logic/01-actions-in-workshop.md) · [publishing](../../Apps/04-workshop-in-production/01-publishing-versions-and-branching.md)
