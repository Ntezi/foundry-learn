# 40 — Publish Your Function

## Expose the tested interface to consumers

The course saves the Logic resource and chooses **Publish**. If asked, select the intended Ontology under the binding option. Set the display name to `(<username>) Ontology Augmented Generation` and the API name to `yourUsernameOntologyAugmentedGeneration`, substituting the appropriate username, then publish.

Publication makes the configured function available for consumption. It is separate from saving an authoring draft and from successfully invoking it inside Workshop.

## Display name versus API name

The display name helps a builder recognize the function in a picker. The API name is a programmatic identifier. Both should identify your resource clearly in a shared environment, but they are not interchangeable with the authoring file's friendly name.

This is similar to exporting an endpoint or package function from source code. The published contract matters to consumers even if the implementation is authored visually.

## Know which contract is being published

The tutorial exposes a question input and an answer output. Retrieval and reference formatting occur inside the function. The Workshop consumer will supply User Question and display the returned string.

If you later change a required input, output shape or object dependency, inspect downstream consumers. A function can still be valid in isolation while an old binding no longer matches. Record the published identity and selected version where exposed rather than assuming a newer draft is automatically used everywhere.

## Ontology binding is a real dependency

Selecting the intended Ontology matters because the function queries its Chunk objects and Embedding property. A similarly named type or function in another context is not equivalent. If the publish operation fails or the function is absent from Workshop, inspect the exact binding, publication result and access before rewriting the prompt.

A branch/proposal process can also affect which schema is available to consumers. Complete the actual enrollment's required process during practice rather than treating a saved branch definition as universally accessible.

## What publication does not establish

Publishing does not run the user's question, verify answer accuracy or publish the Workshop app. It also does not automatically prove that all intended users can access the function and supporting data.

The next integration steps add those checks. For now, the practical evidence would include the published function identity, its contract and successful publication outcome. No such resource was published in this notes phase.

**Review question:** why could a preview return a good answer while Workshop cannot find the function? The preview tests the authoring workflow; publication, visibility and consumer binding add separate requirements.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1967970) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
