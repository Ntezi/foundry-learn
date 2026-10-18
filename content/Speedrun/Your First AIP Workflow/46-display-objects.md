# 46 — Display Objects

## Retrieve evidence for the application's list

Select the Section below the question input, set its layout to **Columns**, hide the Section Header and set Row height to **Flex**. Add an **Object list** on the left and create a new object-set variable named **Relevant Chunks**.

Set your Chunk type as the starting object set. Add a property filter on **Embedding**, bind Query to **User Question**, and set **K = 10**. The list now has a question-dependent retrieval source in the intended workflow.

## What K means

K is the requested number of nearest results. It is not a confidence percentage, a minimum relevance threshold or proof that the returned passages fully answer the question. If the corpus is small or poorly matched, the nearest available objects can still be unhelpful.

The course describes embedding the query compatibly with the stored vectors. Verify the actual Embedding property configuration and model compatibility during practice. Matching array dimensions alone is not a sufficient semantic contract.

The stored vectors came from summaries in the first half. The list therefore reflects similarity through that representation, even though the Chunk objects also retain original content.

## This search is separate from Logic's search

Lesson 38 also configured ten results, but inside the answering function. Relevant Chunks is a Workshop variable used for display. The function is only passed the question, not this object set.

The two paths can align under matching configuration and data, but identical K values do not prove they returned identical IDs. Type selection, model/property setup, execution timing, data changes or ranking ties can affect the comparison. These are possible causes to investigate, not observed mismatches in this session.

If the interface needs to show the exact evidence used for an answer, a stronger design would share the retrieval result or return its identities with the answer. That is a proposed improvement, not what the course configures.

## Inspect content, not just titles

Chunk titles are generated summaries. Use them to navigate, but inspect original content when judging support. A summary can be topically similar while omitting a qualification needed by the question.

Also remember that several chunks can overlap or come from the same paper. Ten objects are not necessarily ten independent sources. A useful evidence review includes source identity and context, not just a count of list entries.

## Practical checks

Use two distinguishable questions and inspect the resulting IDs and content. Test a question outside the corpus and note whether irrelevant candidates are returned. Compare the display set with the actual Logic retrieval for a controlled run before claiming exact correspondence.

**Remember:** this list exposes candidate evidence selected by Workshop. Explain why the nearest ten chunks can help a user investigate without proving either complete retrieval or answer correctness.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962678) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
