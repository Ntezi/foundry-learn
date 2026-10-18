# 23 — Add Output for the Join Table

## Complete the three-output handoff

The course first uses **Layout nodes** to tidy the graph, then selects **Get Join Table → Add output → New dataset** and names it **Join Table**. Layout changes readability, not the transformation's meaning. The output establishes the third dataset boundary for the later Ontology relationship.

You should now be able to explain three different row grains: Chunks has passages, Entities has distinct extracted names, and Join Table has associations between the two. They are complementary outputs, not redundant copies of the same table.

## Why a small table can be central to the application

The join table may contain only two columns, but it controls which objects are connected later. A wrong pair can guide a user or retrieval workflow toward irrelevant evidence. A missing pair can hide a useful passage from entity-based navigation.

This is familiar from relational applications: a bridge table such as user_role can have few columns while determining important behavior. Its quality deserves attention proportional to its role, not its width.

## Check the outputs together

A useful validation set includes non-null relationship keys, unique intended pairs, and references that exist on both sides. Also inspect a few actual passages to confirm the named entity is present or legitimately represented by the extraction.

These checks operate at different levels. Referential integrity establishes that a link points somewhere; source comparison establishes that the link makes sense. Passing one does not imply passing the other.

If a normalization change is introduced to entityName, all three affected stages—occurrences, distinct catalogue and relationship pairs—need a coherent policy. Changing only a display string in Entities can leave the join-table names unmatched.

## Preserve lineage through the graph

Follow the output back to Get Entities and then Use LLM. This reveals that the relationships are model-derived metadata rather than manually verified facts. Follow chunkId back through Create Chunk ID to the source media item and page. That gives a route to inspect the evidence behind a suspicious connection.

A clear graph layout makes those traces easier, which is the practical value of the first course step. It does not optimize the pipeline or deduplicate data by itself.

**Review question:** if all three output datasets build successfully, what relationship errors could still exist? Consider missing targets, duplicate pairs, incorrect extraction and name ambiguity. A successful build establishes execution, while these checks establish whether the resulting graph will mean what you intend.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962311) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
