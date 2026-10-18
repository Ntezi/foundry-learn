# 17 — Embedding

## What an embedding adds

An embedding represents text as a numeric vector so that a retrieval system can compare texts in a model-defined space. It helps find passages about similar topics even when they do not share the exact same words.

It is not an encrypted copy, a readable summary, a primary key or a probability that a statement is correct. Similarity is evidence of potential relevance, not evidence that two passages agree or that either is true.

## The course embeds the summary

Create **Embed Chunks** from **Use LLM**. Extract the `summary` field from the `response` struct into a separate `summary` column. Add **Text to embeddings**, select **summary** as its input, choose a recommended model and name the output `embedding`. The example uses `text-embedding-ada-002`; inspect the models actually available when practicing.

Finally, drop `response` on this branch and close the node. Original `content` is not replaced by this instruction. You now have the source passage, generated summary and vector together for the Chunks output.

This detail is important: the course is not embedding the original PDF bytes or directly embedding the full chunk content. The model-generated summary is the text being represented. Retrieval quality therefore depends partly on what that summary preserves.

## The summary trade-off

A concise summary may remove irrelevant detail and make the dominant topic easier to retrieve. It can also omit a rare term, a qualification or a secondary topic that a later question needs. If the relevant concept was dropped before embedding, vector search over the summary may have difficulty finding the chunk.

That does not prove summary embeddings are always worse than content embeddings. It identifies a choice to evaluate. A later comparison could use representative questions to assess summaries versus source content, while keeping the retrieval setup comparable. Such a comparison is a supplemental experiment, not part of a completed course result.

## Keep vector comparisons meaningful

Vectors used together need a compatible embedding setup. A query vector and stored vectors from different model spaces are not interchangeable simply because both are arrays of numbers. Model changes may require regenerating stored embeddings and updating the query path consistently.

Even a matching vector dimension does not prove semantic compatibility. Record the model and relevant configuration rather than treating the column name embedding as a complete contract. No vector dimension is invented in these notes; inspect actual output and later Ontology configuration.

## Branching preserves what another output needs

Dropping `response` here removes the nested entities array from this branch. The next entity-processing path must therefore branch from **Use LLM**, where the response still exists. It should not start from Embed Chunks and then search for a field that was deliberately discarded.

This is ordinary dataflow reasoning: each branch has its own schema after transformations. A familiar graph layout does not mean all downstream nodes see all upstream fields.

**Understanding check:** why can a nearest vector be relevant yet insufficient to answer a question? Similarity selects a candidate passage; the source content still needs to contain supporting evidence. Explain also how a poor summary can affect both retrieval and the user's confidence in an answer.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962229) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
