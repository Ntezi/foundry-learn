# 47 — Display Object Relations

## Bind the reusable graph to current results

In the right-hand Section, add a **Vertex Graph** widget. Select **Static** for its backing input resource, choose **Knowledge Graph Template**, and supply **Relevant Chunks** as the template input.

The template's resource selection is fixed, while the supplied Chunk set changes with the question. “Static” here does not mean the graph must keep displaying the initial exploratory sample.

## Follow the actual dependency

User Question drives Relevant Chunks. That object set supplies the template parameter. The template follows the Chunk-to-Entity relationship and arranges the resulting view. It does not need a separate manually selected set of starting chunks.

This is the practical payoff of creating a parameterized template. The app reuses the graph definition while changing its context. It resembles rendering a reusable component with updated props.

## What the graph can explain

It can show which extracted entity names connect the displayed passages. A user can inspect shared concepts and navigate to content. The edge meaning still comes from the join table; no new causal or scientific relation is inferred by the widget.

The graph also does not show the model's hidden reasoning. It is a data visualization over Workshop's retrieval set. The Logic function retrieves independently, so do not label the displayed set as an exact execution trace without checking actual evidence alignment.

## Diagnose a graph that does not change

First inspect Relevant Chunks for the new question. If its IDs changed, check the template input binding and selected template identity. If the graph remains tied to the initial sample, you may have selected a saved graph or incorrect resource rather than the intended parameterized template.

If nodes appear but links do not, inspect the template's Search Around and the underlying Ontology relationship. A layout adjustment will not create a missing link.

## Verify with a known small set

During practice, test a set with an expected association, then change the question or supplied set and confirm the view follows it. Check that the input type matches your actual Chunk type, not another learner's type with a similar name.

Record both the displayed Chunk IDs and a representative linked Entity. That is stronger evidence than a screenshot with a dense graph whose data origin is unclear.

**Checkpoint:** why is choosing a static template compatible with a dynamic graph? The template defines how to render; Relevant Chunks determines what to render. Explain also why this graph alone cannot establish that the answer was grounded in the same objects.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962679) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
