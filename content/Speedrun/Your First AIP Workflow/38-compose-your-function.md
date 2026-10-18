# 38 — Compose Your Function

## Trace the complete request

The function takes `userQuestion: String`, retrieves up to the configured ten Chunk objects through their Embedding property, formats their **Content**, and passes that reference text with the question to a single LLM completion. The final function output is the Use LLM result.

This is the core contract of the answering service. Understanding each value is more useful than memorizing the block icons.

## Configure retrieval

Add a function input named **userQuestion** with String type. Add **Semantic search**, create an object set for your Chunk type, choose **Embedding** as the property to search, set **Number of returned objects = 10**, and bind Query to userQuestion.

The block creates a result variable with a name like **Searched All (<username>) Chunks**. This is a set of retrieved objects, not the answer text. The actual number available may be smaller than ten. The configuration is a bounded nearest-results request, not a guarantee that all relevant information has been found.

The first half embedded each generated summary. Retrieval therefore ranks using summary vectors, even though the answer will use the original extracted content. A detail omitted from the summary can be harder to retrieve despite remaining in Content.

## Configure generation with the right evidence field

Add **Use LLM**. The course's system instructions require answering only from supplied references and saying when they are insufficient. In the task prompt, insert userQuestion using the variable picker. Then insert the semantic-search result, select **Content** in the property picker and add that property. This creates a formatted variable for the reference text.

Do not leave literal placeholder text such as `[user question]` or `[semantic search]` in place. Typing a label is different from binding a variable. Likewise, choosing Summary instead of Content changes the evidence provided to the model, even if the function still runs.

Set **Prompting strategy → Single completion** and confirm the function's output is **Use LLM**. The inspected steps do not configure an autonomous tool loop, Ontology edits or Entity traversal for generation.

## Search representation and answer representation differ

Imagine a synthetic chunk whose summary says “Service reliability review,” while its content contains a specific recovery limitation. The summary vector may bring it into a broad reliability search. Passing Content then gives the model access to the limitation that the summary omitted.

But if the question concerns a very specific omitted detail, the summary embedding might not retrieve that chunk at all. Passing rich Content helps only after retrieval selects the object. This is why retrieval quality and answer fidelity need separate evaluation.

## What the prompt cannot enforce by itself

An instruction to use only references is valuable, but not a mechanical proof of grounding. A model may misunderstand the source, combine incompatible claims or answer from prior knowledge. References can also contain text that looks like instructions; the application should treat document content as evidence rather than authority to change the task.

The tutorial's output is an answer string. It does not specify a structured list of supporting chunk IDs or per-claim citations. Formatting Content from objects does not itself establish a complete evidence log. Inspect what the actual formatted input includes before making claims about traceability.

A future design could return the retrieved identities alongside the answer and reuse them in the UI. That would make evidence alignment easier, but it is a supplemental improvement, not the course's implemented contract.

## Checks for later practice

For a known question, inspect the input string, retrieved object identities, formatted Content and final answer. Check a supported question, an unsupported question and a question where relevant evidence competes with similar but unhelpful passages.

**Remember:** the model answers from what was actually supplied, not everything in the corpus or everything visible in a neighboring widget. Explain why the ten-result setting is neither a confidence score nor an exhaustive-evidence guarantee.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962334) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
