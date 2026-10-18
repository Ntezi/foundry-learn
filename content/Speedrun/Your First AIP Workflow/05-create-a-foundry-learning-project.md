# 05 — Create a Foundry Learning Project

## Reuse before creating

The lesson explicitly says to skip Project creation if you already have your own Learning Project. In this study sequence, that is the first thing to check. A new course usually needs a new course folder, not another copy of your entire training workspace.

If creation is needed during practice, open **Files → New project**. Give it a name such as `Learning (<username>)` and a description that identifies it as training work. Select the organization's namespace if that option is present. The course sets the default role to **Discover**, then creates the Project.

The names and settings are course instructions. They are not a claim that those resources or permissions have been changed in this session.

## Understand the configuration choices

The description helps someone distinguish a training sandbox from an operational workflow. The namespace, where applicable, identifies the organizational context. The default role is an access setting, not just a display preference; follow the intended training convention and inspect what the enrollment actually exposes.

Do not treat Discover as permission to run every downstream tool, modify all objects or invoke every model. This lesson's Project configuration is only one part of the access requirements described in lesson 02.

## Why the home folder is not interchangeable

The course warns against using “Your files” or the home folder because some tools cannot be accessed there. The relevant distinction is resource context: a convenient personal file location is not necessarily a suitable home for the full pipeline-to-application workflow.

If you cannot create Projects, use the designated existing training Project or have the responsible administrator provision one. A random production Project is not a good substitute merely because it appears in the picker. The purpose is to learn in an appropriate resource boundary, with understandable ownership and dependencies.

## Evidence to record later

Record the Project name and identity or link, its purpose, and the course folder you use next. This gives later troubleshooting a stable reference. A screenshot of a successful creation dialog is less useful than being able to reopen the exact resource.

This mirrors environment selection in software development: “I created the database” is incomplete unless you know on which server and in which environment. Foundry similarly requires attention to where resources live and what they reference.

**Understanding check:** if the Learning Project already exists, what useful work remains in this lesson? Verify that it is the intended Project and that you can use it, then proceed to the course-specific folder. Do not recreate it just to reproduce the screenshots.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1973797) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
