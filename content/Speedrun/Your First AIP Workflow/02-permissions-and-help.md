# 02 — Permissions & Help

## Access follows the workflow's dependencies

The course needs Pipeline Builder, Ontology Manager, Vertex, Logic, Workshop and AIP features. These are separate capabilities because the workflow spans data transformation, semantic modeling, graph exploration, model orchestration and application building.

Being signed into Palantir Learn establishes access to training content. It does not establish access to a Foundry enrollment or permission to create resources there. Similarly, opening Pipeline Builder does not prove that its Use LLM capability or a particular model is available.

## The course's access requirements

You need permission to create or use a Learning Project, upload files, edit that Project, create Foundry resources, create Ontology assets and use AIP developer capabilities. The course specifically names the LLM block in Pipeline Builder and AIP Logic for the last requirement.

If Project creation is unavailable, an administrator can create the training Project. If uploads are unavailable, an administrator can supply the files with instructions for copying or using them. The optional Marketplace lesson provides another possible import route. The course lists no workaround for missing resource-authoring, Ontology-authoring or AIP developer permissions: those capabilities need to be available for the relevant practical step.

These are not reasons to request broad access immediately. First identify the precise blocked operation and existing authorized training location. A clear request such as “I can edit the training Project but cannot see Use LLM on this transform” is more actionable than “Foundry does not work.”

## Where to investigate

The lesson points to **Support → Training** in Foundry. Your organization may publish local conventions and restrictions there. These can explain why generic screenshots differ from your enrollment or which resources are pre-provisioned.

Use the exact error and resource identity when troubleshooting. A missing media set could mean the wrong folder, no read access or a failed import. A missing model selector could reflect capability access. These symptoms require different fixes; do not keep changing a prompt to solve an access problem.

For a software engineer, this resembles separating authentication, authorization, feature enablement and dependency availability. The browser session, Project role and model capability answer different questions.

## What this notes phase establishes

We have read the requirements, not tested those capabilities in your Foundry environment. Later practice should record which enrollment and training Project are used, which step succeeds and any exact permission failure. No passwords or broad permission changes are needed to write these notes.

**Check your understanding:** why can viewing a course lesson and seeing a model example both succeed while running Use LLM fails? The lesson is documentation; actual model execution depends on the target enrollment's capabilities and permissions. Keep that distinction visible when recording progress.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961847) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
