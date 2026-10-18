# 22 — Define Join Table

## Model the many-to-many relationship explicitly

One chunk can mention several entities, and one entity can appear in several chunks. A single scalar foreign key on either side cannot represent all those associations. The course uses a join table containing one chunk/entity pair per association.

Create **Get Join Table** from **Get Entities**, not from Deduplicate Entities. Add **Select columns** and keep `entityName` and `chunkId`. That branch still contains the occurrence information required to create the pairs.

## An example you can reason through

Use the same invented occurrences: C1 mentions A and B; C2 mentions B. Chunks has C1 and C2. Entities has A and B. Join Table contains `(C1, A)`, `(C1, B)` and `(C2, B)`.

Starting from B, you can find both C1 and C2 and read their source passages. Starting from C1, you can find A and B. That is the relational basis of the later graph navigation.

The course explains that a column is insufficient for this relationship. More precisely, its chosen Ontology-link workflow uses a join table; a single scalar foreign key cannot represent many-to-many cardinality. Other storage systems can represent associations using arrays or other structures, but that is not the course configuration being built here.

## A pair expresses association, not a scientific claim

The table says that an entity name was extracted for a chunk. It does not say whether the chunk supports, denies, compares or merely mentions a relationship. If A and B share a chunk, the graph provides a passage to investigate. It does not establish that A causes B.

This distinction prevents a common AI-graph misunderstanding: visual connections are only as semantically strong as the fields used to create them. To represent typed claims, you would need additional extraction, modeling and verification beyond these pairs.

## Keep reference integrity

Every chunkId should resolve to a Chunks row, and every entityName should resolve to an Entities row. Those are cross-output checks. Uniqueness within each individual output does not detect a dangling pair pointing to a missing target.

The shown join-table step only selects columns. It does not explicitly drop duplicate pairs. If the model repeats a name within one chunk, duplicate associations may remain even though the Entities catalogue is deduplicated. Inspect pair uniqueness and decide how to handle it during practice; do not claim the tutorial already configured that check.

An anti-join is a useful relational way to find unmatched keys: compare the relationship keys with each target table and inspect those without a match. This is an explanatory validation approach, not an executed query here.

**Remember:** entity uniqueness and relationship uniqueness are different contracts. Explain why deduplicating Entities does not automatically repair Join Table and why branching from the distinct-name catalogue would lose essential information.


**Go deeper in the Ontology area:** [06 — Links and relationships](../../Ontology/06-links/README.md)

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962310) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
