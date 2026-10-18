# 24 — Deploy Pipeline

## Move from an authored graph to built outputs

The course saves the pipeline, opens Deploy, selects all output datasets and chooses **Deploy pipeline**. Select Chunks, Entities and Join Table together. An output omitted from the build can leave the later Ontology configuration without current data even if another output succeeds.

Saving records the definition. Deployment configures execution. A completed build produces data. Inspecting the built data establishes whether the result meets the intended contract. Those milestones should not be collapsed into “the pipeline works.”

## Resource references are dependencies

If deployment warns about resources, the lesson says to choose **Import resources → Add references**, then deploy again if necessary. This registers the required resource references in the workflow's context. It is not the same operation as uploading the PDFs again and does not automatically grant missing permissions.

Inspect which resources are being referenced. A warning may be telling you about a real dependency boundary; blindly adding unrelated resources would make the graph harder to understand.

## The cached-LLM job-grouping error

The lesson documents a specific error: outputs sharing a cached LLM upstream must be placed in the same non-default job grouping. The three outputs share the Use LLM ancestor even though they branch into different final schemas.

For that error, open **Deploy Settings → Configure**. Move Chunks from Single jobs into a **New Group**, named Group 1 in the example. Move Entities and Join Table into that **same** group. Apply, save and retry deployment. Creating three separate custom groups would not satisfy the stated requirement.

The important engineering idea is that logical output separation does not mean the execution engine can always schedule outputs independently. Shared upstream processing can impose grouping constraints. Follow this documented remedy when the specific error appears; do not assert that every pipeline always needs this exact grouping or that caching guarantees free, deterministic reruns.

## Diagnose failures by stage

A missing resource reference, unavailable model, invalid transform schema and failed model response are different failure classes. Inspect the deployment or build error before modifying data transformations. If the error is about grouping, rewriting the extraction prompt will not address it.

Likewise, a successful small LLM trial is not evidence that the full corpus build will complete under actual resource and model conditions. Full execution can expose problematic rows or scale-related limits absent from the trial.

## What to record after a real build

Record the pipeline identity and version, build outcome, output identities, selected model configuration and relevant data checks. Inspect non-null/unique chunk IDs, representative extracted text, the distinct-name catalogue and relationship integrity. The next lesson shows where the course opens deployment history and the build report.

No pipeline was deployed in this notes revision. The documented troubleshooting path is source-backed guidance for later practice, not an error we reproduced or fixed in your enrollment.

**Checkpoint:** explain why “Save succeeded,” “Deploy was accepted,” “Build completed” and “outputs are correct” are four different statements. This distinction will also matter when the second half configures Ontology objects from those outputs.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962312) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
