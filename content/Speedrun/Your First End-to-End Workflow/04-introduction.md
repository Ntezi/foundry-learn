# 04 — Project setup: give the workflow a clear home

Before creating datasets and pipelines, establish where the course's resources belong. This looks like administration, but it addresses an engineering concern you already know: a system becomes difficult to maintain when its artifacts have no clear owner or discoverable location.

A Foundry **Project** groups resources and has access settings. A **folder** helps organize resources within that location. For this course, a learning Project contains a dedicated course folder. That folder will hold the source datasets, pipeline, output and application resources where appropriate; the Ontology also has its own model and governance context.

## What this resembles in a software project

A repository gives code a home; a deployment environment gives running resources a context. A Foundry Project has aspects of organization and controlled collaboration, but it is not identical to either a Git repository or an isolated runtime. Creating a folder does not create a new database or a new security policy for every referenced object.

This distinction matters when following screenshots. A resource can have a friendly visible name, a path that helps humans locate it, and a platform identifier used by other resources. Two similarly named pipelines are not necessarily the same pipeline.

## Why use a separate course folder?

You will soon have several datasets with related names. If the course assets are scattered among unrelated experiments, selecting the wrong `all_orders` output becomes easy. A dedicated location makes the intended dependency chain easier to inspect and makes later review or cleanup more deliberate.

Username-based naming is especially useful in a shared training environment: it tells other learners which resources belong to whom. In an existing workplace project, follow its naming and ownership conventions instead of introducing a competing pattern.

Our local `Learn/Speedrun/Your First End-to-End Workflow/` directory contains study notes. The Foundry training folder contains platform resources. Moving a Markdown file locally does not move its corresponding Foundry dataset or change its access settings.

## What to establish before proceeding

You should know the learning Project's name, the course folder's location and whether you can create the required training resources there. If an appropriate Project already exists, reusing it avoids duplicating the workflow simply to repeat setup instructions.

**Remember this when you build your own application:** organization is part of maintainability. A future developer needs to find both the application and the assets that feed it.

**Quick check:** if you find two resources named `Orders Pipeline`, how do you choose? Inspect their Project/folder, identifiers and inputs/outputs. The name alone is insufficient evidence.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790906) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
