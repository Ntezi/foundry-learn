# 34 — Configure a Vertex Template

## Replace a fixed selection with a reusable view

The exploratory graph contains a particular sample of Chunks. The final app needs a graph that changes with the user's question. A Vertex template captures how to build that view from a supplied object set.

Use the Save dropdown and choose **Save as template**. Add an object parameter for your **Chunk** type, then add a **Search Around** from that parameter through the relationship to **Entity**. Continue through the layer settings, keep the default styling, name it **Knowledge Graph Template** and select **Radial** layout. Review the summary and save the template in the training folder.

## Think of the parameter as a function input

Conceptually, the template takes `chunks` and renders those objects plus their linked entities under the configured layout. That is more reusable than saving a screenshot or permanently selecting the initial dozen objects.

Later, Workshop supplies its Relevant Chunks variable. The template defines the procedure; the variable determines the starting data. Reusing the template with another set should change the displayed evidence context without requiring a new template.

This resembles a UI component with typed props. The actual Chunk object type matters: a set from another learner's similarly named type may not satisfy the intended parameter contract.

## The traversal is bounded by configuration

The course adds one Search Around from Chunks to Entities. It does not configure arbitrary recursive expansion across every neighboring chunk or a causal reasoning process. Avoid describing the template as automatically exploring the whole corpus.

A single Entity can be connected to other chunks outside the supplied set. Those other chunks are not necessarily included merely because the Entity appears. Inspect the configured traversal rather than assuming graph closure.

## Template state versus input state

The template stores a view definition, including the relationship expansion and layout. The app later selects this template as a fixed backing resource while passing changing inputs. “Static” resource selection in that widget does not imply the graph's objects must stay static.

Keeping these two levels separate will make the Workshop lesson easier to understand: one setting chooses which renderer to use; another chooses what to render.

## Verify the reusable behavior later

Try two distinguishable Chunk sets and check that the graph follows the supplied input. Verify a known linked Entity and make sure the view is not stuck on the original sample. Record the template identity so the app references the intended saved resource.

**Remember:** a reusable template is a parameterized procedure for constructing a view. Explain why it is the right artifact for question-dependent graph display and why a fixed exploratory canvas would be insufficient.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962330) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
