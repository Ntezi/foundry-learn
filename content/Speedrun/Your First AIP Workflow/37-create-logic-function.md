# 37 — Create a Logic Function

## Create the orchestration resource

In the training folder, choose **New → AIP Logic**. Name the resource **Ontology Augmented Generation**, confirm the save location and save it. The next lesson will define its input and blocks.

This resource is the place where you compose retrieval and generation. Creating it does not invoke a model, create a new foundation model or expose a finished function to Workshop. Those are separate actions.

## Separate the resource from the model

AIP Logic is an authoring environment for a workflow using model capabilities and platform data. The model is one dependency inside that workflow. The Logic resource defines what input is accepted, what data is retrieved, how the prompt is composed and which result is returned.

For a software engineer, this resembles an application-service orchestration layer. It can coordinate dependencies without forcing the UI to implement each backend step. That makes the function reusable by a consumer such as Workshop.

## Why a dedicated function is useful

The application should not need to reconstruct the prompting logic inside every display widget. A published function can provide a clear interface: question in, answer out. Keeping that interface separate from layout lets you inspect and test the question path independently.

However, the tutorial later also creates a separate Workshop retrieval variable for display. That is not automatically shared with this function. Reuse of the function centralizes generation logic, but the final application still has a duplicated retrieval configuration to understand.

## Names and identity

The Logic resource name is a friendly authoring label. The publishing lesson will also choose a function name and API name. Those fields serve different purposes, much as a source-file name and exported service method are related but not identical.

Record the actual resource identity during practice. If several learners have similarly named resources, selecting the right published function later requires more than matching the words Ontology Augmented Generation.

## The next meaningful checkpoint

Once the resource exists, define its input before composing blocks. Knowing the request contract prevents accidental dependence on an unbound text field or an unrelated variable. The input will be `userQuestion` of type String.

**Review question:** what does Save establish at this stage? It records the authoring resource. It does not establish a successful preview, publication or application binding. Treat those as separately observable milestones in the remaining lessons.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962333) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
