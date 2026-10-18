# Lesson 10 — Data Lineage Exploration

## Course Essentials
Node coloring exposes different dimensions: resource type, project, and repository. The course confirms all datasets are in one project but each derived dataset is produced by a different repository. The `ontology/airports` datasource contains about 4.3k rows and 18 columns and is produced in Pipeline Builder.

## Reasoning
Location, implementation ownership, and data dependency are different relationships. “Same project” does not imply “same codebase,” common owner, synchronized release, or consistent quality controls.

Preview answers what the data looks like; code answers how it was produced; node properties answer operational metadata. Good diagnosis combines all three.

## Practical Ontology Engineering
Many small repositories can improve isolation but increase coordination and version-drift risk. A monolithic pipeline simplifies discovery but enlarges the blast radius. Choose boundaries around ownership, release cadence, reuse, and failure isolation.

Counts are plausibility checks, not correctness proofs. Validate keys, nulls, duplicates, link coverage, freshness, and units.

## Deep Understanding Check
1. What risks arise when one object type depends on many independently released repositories?
2. Why is seeing transformation code insufficient to establish trust?

