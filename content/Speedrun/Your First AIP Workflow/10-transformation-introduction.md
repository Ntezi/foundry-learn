# 10 — Introduction — Transforming the Data

## What the first half is building

This module turns PDFs into three datasets: Chunks, Entities and Join Table. Chunks preserve passages and their source identity, with a generated summary and embedding. Entities contain distinct extracted names. Join Table records which entity names are associated with which chunks.

Those outputs prepare two complementary ways to find evidence later: semantic similarity through embeddings, and navigation through named entities and their chunk connections. Neither creates an answer by itself.

## Follow the changing row meaning

Initially, an input row references a document. After page extraction and explosion, a row corresponds to a page. After chunking and another explosion, a row corresponds to a chunk within a page. After exploding the entities array on a separate branch, a row corresponds to an entity occurrence associated with a chunk.

This is the concept of **grain**: what one row represents. It is especially useful for a software engineer accustomed to API objects, because the same column names can appear at several stages while the row meaning changes. Many pipeline bugs come from joining or counting rows without noticing that change.

If one document has two pages and each page produces three chunks, there are six chunk rows in that invented example. If every chunk mentions two entities, the occurrence branch has twelve rows. That growth is expected, not automatically duplication.

## Deterministic operations and model operations

Selecting columns, concatenating identifiers and exploding arrays have explicit transformation rules. Summarizing text and extracting entity names use an LLM and require a different kind of validation. A schema can confirm that entities is an array of strings; it cannot confirm every string is grounded in the source.

Keeping these distinctions clear helps debugging. If chunk IDs collide, inspect the key design and input positions. If an entity is unsupported, inspect the source text, prompt and model output. The fix belongs where the error was introduced.

## Why the graph branches

The LLM response contains both summary and entities. One branch extracts the summary and embeds it; another extracts and explodes the entity names. The entity branch then separates distinct names from occurrence pairs. This branching preserves information needed by each output without forcing all outputs to have the same grain.

**Remember:** a pipeline is a dataflow, not simply a sequence of screens. Before reading the detailed steps, sketch where the row meaning changes and where the branches split. The course index contains a diagram to compare with your sketch.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961882) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
