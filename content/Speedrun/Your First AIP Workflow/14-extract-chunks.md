# 14 — Extract Chunks

## Why divide a page into smaller pieces?

A page can contain several topics. Later, a question about one topic should retrieve a manageable passage rather than bring along every unrelated paragraph. Chunking makes the unit of retrieval smaller and allows enrichment to run on individual segments.

Smaller is not always better. A short fragment may lose the subject of a sentence, a qualification or the explanation of a table. A larger chunk preserves more context but may dilute topic specificity and increase the text processed per call. Chunk size is a trade-off to evaluate against real questions.

## The course configuration

Create an **Extract Chunks** transform from Process PDFs. Add **Chunk string**, using `content` as input, set **Chunk size = 512**, and write the output back to `content`.

Then add **Explode array with position** on content. Use **Extract many struct fields** to take `position` into `chunkNumber` and `element` into `content`. Close the node. This mirrors the previous page-explosion pattern, but now the new rows are chunks within a page.

The inspected lesson text does not specify the chunk-size unit or a numeric overlap setting. These notes therefore preserve the value 512 without calling it 512 tokens, words or characters. Confirm the transform's current configuration/help during practice. The lesson describes possible overlap, but that is not evidence of a particular overlap value being selected.

## Track the new grain

If page 1 produces three chunks and page 2 produces two, the document now has five chunk rows. The page and media identity need to remain attached to each row. `chunkNumber` is local to the exploded page content; it is not by itself a unique identifier across the library.

Because the course chunks after page extraction, a paragraph crossing a page boundary is not necessarily kept intact. Overlap within a page would not automatically restore context from the preceding page. This is a limitation to inspect with actual documents, not a reason to assume the default workflow is useless.

## A chunk is a passage, not a guaranteed fact

The course treats chunks as small pieces of information. In practice, one can contain several claims, a reference list or only half of an explanation. Later retrieval selects passages that may be useful; it does not certify that every row is self-contained or correct.

An overlap can also cause the same phrase to appear in neighboring chunks. That can help preserve context, but it means counts of matching chunks are not automatically counts of independent pieces of evidence. Five matching chunks from one paragraph do not equal five independent studies.

## What to inspect later

Read a chunk next to its neighbors and source page. Check sentence continuity, repeated headers and whether important qualifications were separated from the claim. Try a representative question and ask whether the chunk contains enough context to support an answer.

**Remember:** chunking defines the unit the rest of the system reasons over. It is an information-design decision as well as a performance setting. Explain why reducing the size can increase both the number of model calls and the risk of losing context.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961894) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
