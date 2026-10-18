# 21 — Add Output for Entities

## Publish the distinct-name catalogue

Select **Deduplicate Entities → Add output → New dataset** and name the output **Entities**. Its intended grain is one row per distinct extracted entityName under the course's chosen name-based representation.

The dataset will later back an Ontology object type. Creating the output now defines a pipeline destination; a successful build and later Ontology configuration are separate milestones.

## What this dataset knows—and what it does not

After the preceding Select columns step, the catalogue contains entityName. It does not contain a validated definition, category, external registry ID or count of supporting studies. Those were not added by the shown transformations.

The prompt used categories to guide extraction, but returned an array of strings. A category mentioned in prompt instructions does not automatically become a column. This distinction is useful whenever an AI workflow appears to know more than its stored schema actually represents.

Similarly, the name's presence establishes that the processing path extracted it from at least some input occurrence, assuming the output was built correctly. It does not independently establish that the extraction was accurate or the concept was interpreted correctly.

## Identity becomes an application contract

The future relationship table refers to these names. If you later change their normalization or identity policy, update the relationship keys consistently. A cleaned display label and a stable canonical key can be separate concepts in a richer model, but the tutorial uses a simpler structure.

Think of this as a database migration concern. Changing a key on one table without updating references can break relationships even though both tables individually look valid.

## Meaningful practical checks

Check uniqueness and non-null/nonblank names in the built output, and inspect representative names against occurrence rows and source chunks. Compare the distinct-name count with the occurrence count: the catalogue should normally be no larger than the set of occurrence rows from which it is derived, but exact counts depend on real data and transform behavior.

Avoid prepopulating an expected entity count. LLM outputs can vary by model, configuration and source processing. Record actual results and explain differences rather than requiring an unverified screenshot count.

**Understanding check:** if Entities has one row for Entity B and Join Table has ten rows for B, is that inconsistent? Not necessarily. One entity can be associated with ten different chunks. Check the pairs and source passages before deciding whether they are legitimate relationships or duplicated extraction output.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962239) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
