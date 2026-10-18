# 04 — Project setup: organize the function's dependency chain

Use one appropriate learning Project and a folder dedicated to this course. That keeps the installation, application and repository understandable as parts of one exercise. Follow your organization's naming and ownership conventions when they differ from the tutorial.

Unlike the previous E2E workflow, this course provides much of the data and application foundation through Marketplace. Your main addition is code. The location should therefore help you trace both the supplied assets and the function you build on top of them.

## What belongs together conceptually?

```text
Course installation
    → backed Clinic and Financial types
    → Clinic Finance Tracker application

Functions repository
    → references those types through generated bindings
    → releases a calculation consumed by that application
```

This is a conceptual dependency map, not a claim that every Ontology resource is controlled solely by its folder location. The Ontology has its own identity and governance context.

A **Project** gives resources a collaboration and access context. A **folder** organizes them for navigation. A **repository** holds versioned source code. These are not interchangeable containers just because each has a name in the interface.

## Connect this to an ordinary software workspace

You might keep an API, test fixtures and deployment instructions under a clear project structure. The structure helps people find related pieces, but actual imports and configuration determine their dependencies.

The same applies here. Placing a repository beside Clinic Finance Tracker does not bind the app to its function. Importing the right object references and selecting the released function will establish that connection later.

Nor does a new folder create an isolated copy of a shared Ontology. Two installations can still require distinct entity names even when their files live in different folders. Lesson 08 makes that naming boundary explicit.

## Avoid recreating setup that already serves its purpose

If an appropriate learning Project exists from the earlier course, reuse it and create or inspect this course's folder. You need a clear destination, not a new Project for every individual lesson.

Separate Projects can make sense when ownership or access needs differ, but that is a design decision based on the actual environment. Do not infer isolation or safe cleanup merely from a visually tidy tree.

Our local `Learn/Speedrun/Your First Ontology Function/` directory contains notes. The Foundry course folder contains platform resources. Updating the notes does not install those resources or publish a function.

**Remember:** resource organization helps you navigate; configured dependencies establish what the software uses. Both are needed to make a learning build understandable to the next person.

**Quick check:** if the card uses the wrong function version, would moving the repository beside the app fix it? No. You must inspect and update the consumer's actual function binding.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131543) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
