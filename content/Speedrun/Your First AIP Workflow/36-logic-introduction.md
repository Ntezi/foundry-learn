# 36 — Introduction — Creating an AIP Logic Function

## Answer a question using prepared evidence

The first-half pipeline performed model enrichment once per chunk during data preparation. This module builds a different function: it accepts a user's question, retrieves relevant Chunk objects and asks an LLM to answer from their content.

The distinction is timing and purpose. A summary describes a source passage before any particular question exists. An answer responds to a specific question using selected evidence. Both use models, but they are different interfaces in the workflow.

## Grounding does not require retraining

The function supplies context from the Ontology at execution time. It does not retrain the foundation model on the PDF library. The retrieved passages provide task-specific information without changing the model's weights through this tutorial.

For a software engineer, think of the model call as a service receiving a request plus evidence. The request's quality depends on selecting the right evidence and specifying how to use it. A model cannot reliably compensate for a passage that was never retrieved.

## Follow the implemented architecture

The upcoming function has a String input, a semantic-search block and a Use LLM block configured for **Single completion**. It is a fixed retrieval-and-generation path. The course discusses more autonomous tool-using modes elsewhere, but those are not enabled by this configuration.

Likewise, Entity links support the graph view, but the shown retrieval block searches the Chunk Embedding property. It does not traverse Entities to expand the answer context. Calling the resource Ontology Augmented Generation does not mean every Ontology relationship participates in the prompt.

## Reliability needs more than a prompt

The introduction suggests that Ontology grounding removes worries about hallucinations. It can improve grounding and inspection, but it cannot guarantee correctness. The corpus may lack the answer, the top results may be irrelevant, and the model may add unsupported detail despite instructions.

The function therefore asks the model to say when references are insufficient. That is a useful behavioral requirement to test, not a proof that it will always abstain correctly.

## What to learn from this module

Be able to identify the question input, retrieval scope, selected property, returned object count, formatted content and final output. These boundaries let you diagnose wrong answers without treating the LLM as an opaque source of every problem.

**Checkpoint:** explain why changing the answer style cannot repair missing source coverage. Then explain why a successful answer to one question is insufficient evidence that the function will reject questions the corpus cannot support.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962332) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
