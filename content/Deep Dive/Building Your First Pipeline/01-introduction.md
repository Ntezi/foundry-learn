# 01 — Introduction

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Overview | 01/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1873616) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Say what a data pipeline is and why Foundry treats it as the backbone of operational work.
- Place Pipeline Builder among Foundry's pipeline tools.
- Know what you will have built by the end: a pipeline from raw files to a customer-lifetime-value dataset.

## Key concepts
**[Course] Data pipeline.** A series of processing steps that turn raw data into something usable: cleaning, processing and integrating it so it can drive analysis and decisions. The course diagram shows pipeline outputs feeding the **Ontology**, which then powers operational applications.

**[Course] Why pipelines matter.** They carry data from its raw source form to an operationally valuable state. The course's line: the difference between a sea of unreadable data points and an organized dataset ready to use.

**[Course] Pipeline Builder.** Foundry's main **low-code / no-code** pipeline tool. It builds pipelines from a library of **pre-built Spark transforms** without much coding.

## How it connects to the rest of Foundry
**[Explanation]** Pipelines sit between ingestion and the Ontology:

```text
external system ──Data Connection──▶ raw dataset ──Pipeline Builder──▶ clean / joined datasets ──▶ Ontology objects ──▶ Workshop, AIP, OSDK
```

This matches the "south of the Ontology" layer in [the Intro course](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/05-high-level-architecture.md), and the pipeline step you already met in [the E2E speedrun](../../Speedrun/Your%20First%20End-to-End%20Workflow/11-transforming-data-introduction.md). This deep dive goes further into the cleaning, joining and validation choices behind that step.

**[Explanation] Pipeline Builder vs Code Repositories.** Both produce Foundry datasets with lineage. Pipeline Builder is a visual graph of pre-built transforms and suits most cleaning, joining and aggregating. Code Repositories (Python, Java or SQL transforms) suit logic that needs real code, external API calls (as in the [Data Connection deep dive](../Creating%20Your%20First%20Data%20Connection/38-rest-configure-code.md)), or heavy customization. Pipeline Builder can call custom code through UDFs ([lesson 21](21-user-defined-functions.md)).

## Course scope
Build a pipeline in about 60 minutes, then get a brief look at **branching, builds, schedules and data validation**. Ontologize publishes a follow-along video.

## Real-project relevance
**[Explanation]** On a real engagement the pipeline is where business meaning first gets encoded: which customer record wins, which timestamp is authoritative. Downstream teams building Workshop apps and AIP logic inherit those decisions without seeing them. The pipeline author's choices are effectively the team's data contract.

## Key takeaways
- The pipeline turns raw data into operational data, and its outputs usually feed the Ontology.
- Pipeline Builder is the default low-code tool. Code Repositories exist for when real code is needed.

## Review checklist
- [ ] I can draw the path from source system to Workshop and point to where this course sits.
- [ ] I can give one reason to choose Pipeline Builder and one to choose Code Repositories.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Permissions & Help](02-permissions-and-help.md)
