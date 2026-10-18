# Deep Dive: Building Your First Pipeline

[Official course](https://learn.palantir.com/deep-dive-building-your-first-pipeline) · [Study plan](../../STUDY-PLAN.md) · [Progress](../../PROGRESS.md)

| | |
|---|---|
| Type and track | Deep Dive; [Data Engineer track](https://learn.palantir.com/page/training-track-data-engineer) (course summary link) |
| Published duration | 60 minutes (course introduction) |
| Prerequisites | Foundry access; Compass and Pipeline Builder; create/edit a learning Project; upload files (or the Marketplace alternative); create Pipeline Builder resources. No prior course named as required. |
| Learn status | Registered; 0/23 shown on Sep 24 before reading. Lessons were read without clicking through each page, so Learn completion wasn't updated. |
| Notes | **Ready for Review**: all 24 lessons (23 required + optional Marketplace install), with review guide and practice plan |
| Practice | **Not Started** |
| Why it's in the sequence | It deepens the pipeline step from the E2E speedrun. It is the "raw → clean → joined" layer that feeds the Ontology deep dive and every app, and it supports the data-integration parts of Foundry Aware and the Associate exams. |

**The central question:** how do you turn three messy raw files into a trustworthy per-customer dataset, and how do you *know* it's trustworthy? The course builds a Pipeline Builder pipeline: clean each source, join them, catch a bad join in Contour, aggregate to customer revenue, then look at segmenting, UDFs, scheduling, branching, data expectations and incremental processing.

**How to use these notes:** read the lessons in order. Each separates **[Course]** content from **[Docs]** and our **[Explanation]**. Then work through the [review guide](REVIEW.md). Only then move to the [practice plan](PRACTICE.md). Corrections and doc checks are in [sources and corrections](SOURCES-AND-CORRECTIONS.md).

## Lessons

| # | Notes | Module |
|---|---|---|
| 01 | [Introduction](01-introduction.md) | Overview |
| 02 | [Permissions & Help](02-permissions-and-help.md) | Overview |
| 03 | [Introduction](03-project-setup-introduction.md) | Setting up your Project and Folder |
| 04 | [Create a Foundry Learning Project](04-create-learning-project.md) | Setting up your Project and Folder |
| 05 | [Create a Course-Specific Training Folder](05-create-training-folder.md) | Setting up your Project and Folder |
| 06 | [Introduction](06-data-preprocessing-introduction.md) | Data Preprocessing and Cleaning |
| 07 | [Download the Data Sources](07-download-the-data-sources.md) | Data Preprocessing and Cleaning |
| 08 | [[Optional] Deploy Datasets via Marketplace](08-optional-deploy-datasets-via-marketplace.md) | Data Preprocessing and Cleaning |
| 09 | [Create a New Pipeline](09-create-a-new-pipeline.md) | Data Preprocessing and Cleaning |
| 10 | [Basic Transforms: Clean the Products Dataset](10-basic-transforms-clean-products.md) | Data Preprocessing and Cleaning |
| 11 | [Advanced Transforms: Clean the Customers Dataset](11-advanced-transforms-clean-customers.md) | Data Preprocessing and Cleaning |
| 12 | [Work with Different File Types: Preprocess and Clean the Transactions Dataset](12-work-with-different-file-types.md) | Data Preprocessing and Cleaning |
| 13 | [Introduction](13-data-integration-introduction.md) | Data Integration, Joining, and Aggregations |
| 14 | [Simple Joins: Join Transactions and Products](14-simple-joins.md) | Data Integration, Joining, and Aggregations |
| 15 | [Chaining Joins: Join Transactions x Products with Customers](15-chaining-joins.md) | Data Integration, Joining, and Aggregations |
| 16 | [Add a Dataset Output](16-add-a-dataset-output.md) | Data Integration, Joining, and Aggregations |
| 17 | [Identify a Bad Join: Drill into Transactions x Products](17-identify-a-bad-join.md) | Data Integration, Joining, and Aggregations |
| 18 | [Create an Operationally Valuable Dataset](18-create-an-operationally-valuable-dataset.md) | Data Integration, Joining, and Aggregations |
| 19 | [Introduction](19-additional-considerations-introduction.md) | Additional Considerations and Best Practices |
| 20 | [Other Pipeline Builder Capabilities](20-other-pipeline-builder-capabilities.md) | Additional Considerations and Best Practices |
| 21 | [User-Defined Functions (UDFs)](21-user-defined-functions.md) | Additional Considerations and Best Practices |
| 22 | [Best Practices: Segmenting your Pipeline and Materializing Outputs](22-segmenting-and-materializing-outputs.md) | Additional Considerations and Best Practices |
| 23 | [Pipeline Maintainability](23-pipeline-maintainability.md) | Additional Considerations and Best Practices |
| 24 | [Summary](24-summary.md) | Conclusion |

Optional Course Feedback was not opened.

**Go deeper in the Ontology area:** [02 — Foundry data foundations](../../Ontology/02-foundry-data-foundations/README.md)
