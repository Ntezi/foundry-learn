# 13 — Create an AIP Logic

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Create a resource with one clear responsibility

Inside the course's Foundry training folder, choose New → AIP Logic. The lesson also allows opening New from the folder's context menu. Rename the function **Review Patient for Clinical Trial**, verify the save location is your working folder in the learning Project, and save it.

This step creates the container for the logic you will configure. It does not yet define the patient input, call a model, modify a record or schedule anything. Keeping those milestones separate will make later troubleshooting much clearer.

## Why name it after a business operation?

A name like Test AI says almost nothing about the function's responsibility. Review Patient for Clinical Trial identifies the operation and its domain context. A teammate can begin to understand what arguments it might need and what result it might produce before opening the editor.

The name is still not a full contract. The following lessons supply that contract through `patient`, `clinicalTrial`, the output structure and the Action. Record the actual resource identity during practice because another function could have a similar display name.

The official overview describes AIP Logic as an environment for building, testing and releasing LLM-powered functions that work with the Ontology. That explains why this resource is more than a saved prompt: its configuration can connect data, model behavior and edits. [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview/).

## Saving, publishing and running are different

Saving retains your authoring work. Publishing and automation appear in the second half of this course. Running a preview is another separate step with its own evidence. Do not infer that the application calls the function merely because the resource has been saved in the same folder.

A software comparison is committing a function implementation versus deploying a service versus invoking its endpoint. The comparison is not an exact description of Foundry's lifecycle, but it protects you from treating every successful button click as the same kind of completion.

## Keep the function easy to inspect

Before adding blocks later, verify the resource is in the intended course folder and that the name identifies its purpose. After configuration, a reviewer should be able to follow the input-to-edit path without guessing which resource is the current one. Avoid several anonymous copies unless you deliberately create and document a variant.

If AIP Logic is unavailable under New, revisit location and authoring permissions. At this stage there is not yet enough evidence to blame a model provider, since a model invocation has not been reached.

**Review question:** you have saved the named function. What can you truthfully record? The resource exists in the intended location, if observed. You cannot yet record a correct eligibility decision, a persisted Ontology update, a published version or an active automation. In this notes pass even resource creation remains unexecuted.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279747) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
