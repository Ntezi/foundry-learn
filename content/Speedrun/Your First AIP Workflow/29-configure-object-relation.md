# 29 — Configure the Object Relation

## Turn pairs into a traversable link

Start from the Entity type's overview and choose **Create new link type**, or use the new Object Relation option. Select **Join table dataset** as the relationship type. Choose your Chunk type as the other end, select **Join Table**, and map `entityName` to the Entity end and `chunkId` to the Chunk end.

Review the generated API name, submit, then **Save → Save to Ontology**. The friendly endpoint labels are not enough: the key mapping determines which actual objects are connected.

## Why this is more than drawing a line

The join-table rows define associations. The Ontology configuration tells the platform how those values identify objects on each side. Once available, consumers can search around through the relationship instead of writing the join repeatedly.

In relational terms, imagine an association table with two foreign keys. Selecting the wrong column or backing table can create empty or incorrect relationships even when the two object types individually contain valid data.

Use the synthetic example from the first half: C1 connects to A and B, while C2 connects to B. Searching around B should find C1 and C2. Searching around C1 should find A and B. That is a useful small case for verifying the endpoint mapping later.

## Check reference integrity and meaning separately

A dangling chunkId or entityName cannot identify the intended endpoint. Inspect unmatched keys if expected links are missing. Also inspect duplicate pairs and key normalization: deduplicating the Entity catalogue did not automatically deduplicate or normalize the relationship branch.

Even if every pair resolves, the relationship can still be semantically wrong because the model extracted an unsupported name. A valid link means the configured association exists, not that a scientific relationship has been established.

The graph represents “this entity name was extracted from this passage.” It does not represent “this entity causes that entity” or “these studies agree.” Read the connected Chunk content to determine what the source actually says.

## A useful debugging order

First verify both endpoint objects exist in the same intended context. Then verify the join-table values match their primary keys, the correct dataset is configured and the link definition is saved and available. Only after that investigate a visualization that appears to omit links.

This avoids recreating a Vertex graph to solve a problem in the semantic model. The fault belongs at the earliest boundary where the expected association disappears.

**Checkpoint:** explain why two populated object types do not prove their relationship works. Identify one structural failure and one semantic failure that could remain after saving this link.


**Go deeper in the Ontology area:** [06 — Links and relationships](../../Ontology/06-links/README.md)

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962320) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
