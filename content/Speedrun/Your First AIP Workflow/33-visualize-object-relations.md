# 33 — Visualize Object Relations

## Load a sample and follow its links

Name the graph **Knowledge Graph**. Choose **Add object**, locate your own Chunk type using your username, select about a dozen instances and add them to the canvas. Then select the loaded objects, choose **Search Around** and follow the relationship to Entity.

Finally, select the objects again and apply **Layout → Radial**. These are three different operations: choosing starting objects, traversing a modeled relationship and arranging the visible nodes.

## Search Around uses the Ontology relationship

The traversal asks which Entity objects are linked to the selected Chunks. It does not perform a fresh semantic search, call the LLM to extract more names or discover every concept in the PDFs. Its result depends on the link configured from Join Table.

In the C1/C2 example, selecting both chunks and traversing the link yields the linked entity objects. If B connects to both, the graph can show that shared association. Read the chunks to understand the relationship's meaning.

A missing expected Entity should lead you to inspect the source pair, endpoint keys and selected object set. It is not necessarily a failure of the graph renderer.

## Layout changes position, not evidence

Radial layout arranges the objects so relationships can be easier to inspect. It does not change the join table, improve entity resolution or assign a scientific importance score. A central-looking node is not automatically the most authoritative concept.

This is a familiar visualization principle: visual emphasis can be stronger than the semantics of the data. Explain the loaded scope and edge meaning so the user does not overinterpret the picture.

## Inspect one connection end to end

During practice, choose a visible Entity and identify a linked Chunk. Read its content, compare the extracted name and follow the media reference to the original document where available. This verifies the route from graph to evidence, rather than just checking that lines appear.

If the summary is misleading but content is accurate, that is a model-enrichment issue. If content is garbled, inspect PDF extraction. If the link points to an unrelated chunk, inspect the association data. The graph provides a convenient starting point for tracing these differences.

## What this sample cannot establish

A dozen selected chunks cannot establish complete corpus coverage. Shared mentions do not establish agreement, and multiple chunks from one document are not independent studies. The small canvas is an exploratory view, not a validated research conclusion.

**Review question:** what changed when you applied Radial, and what did not? Position changed. Object identity, configured links and the evidence behind them did not. Explain why this distinction matters before presenting the graph to someone unfamiliar with the pipeline.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962328) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
