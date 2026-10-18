# 32 — Create a Vertex Graph

## Create a place to explore the modeled objects

In the course's training folder, choose **New → Vertex graph**. This creates the graph resource you will populate in the next lesson. The instruction is short because the important work is selecting and understanding the objects, not creating the empty canvas.

Keep the graph in the course context so it is easy to distinguish from unrelated explorations. The local lesson file and the Foundry graph are separate resources; writing this note does not create the graph.

## The empty canvas is a consumer

At this point, the Chunks dataset should already have been built and exposed through its object type in later practice. The graph consumes those objects. Creating the canvas does not index the object type, populate empty datasets or repair an unavailable Ontology branch.

If you cannot find your objects when adding data next, trace the dependency backward. Are you using the correct Ontology and object type? Has indexing completed? Does the expected object exist and is it accessible? Repeatedly creating empty graphs will not solve those conditions.

## Resource identity and save location

A graph has its own identity and saved configuration. In the next lesson, the course names it Knowledge Graph. A similar name elsewhere does not guarantee it references the same types or contains the same selected objects.

This mirrors a saved database query or dashboard. The saved artifact is useful because it captures a particular exploration, but you still need to know which data it targets. Record the actual resource link during practice.

## A deliberate small starting point

The course will add roughly a dozen chunks rather than immediately fill the canvas with the entire library. That keeps the relationships inspectable and makes it easier to understand Search Around. It is a teaching choice, not a claim about a maximum supported graph size.

Use that small sample to learn the interaction and verify one known relationship. Do not infer corpus-wide conclusions from the sample. A later larger graph may need additional filtering or visual organization to remain useful.

**Checkpoint:** distinguish creating a graph resource from adding objects, searching around links and saving a reusable template. Each adds a different capability. The first gives you a canvas; the later steps give it data, relationships and a reusable input contract.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962326) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
