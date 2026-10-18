# Lesson 15 — Create a Link Type

> Foundry execution is pending approval.

## Execution status — completed after correcting ontology scope

The first `[Marius] Flight Alert` was created in the default ontology, while `[OFT] Flight` belongs to **Hence - INTERNAL**. Cross-ontology selection was unavailable. The earlier “inaccessible” conclusion was corrected after opening `[OFT] Flight` by its API-name route and confirming Marius has the **Ontology Owner** role.

The Flight Alert type was recreated in Hence - INTERNAL and linked successfully.

### Final decision and verified access boundary

The chosen solution is to use the authoritative OFT ontology, not create a duplicate Flight type. The active editable ontology is the default ontology:

- Active ontology RID: `ri.ontology.main.ontology.00000000-0000-0000-0000-000000000000`
- `[OFT] Flight` RID: `ri.ontology.main.object-type.80ff4d8b-adfb-4450-83e3-1af22b8230ef`

### Completed resources

- Correct Flight Alert ID: `lydxpf6t.id-6ff22a26-539c-7315-696c-6a4cd6df1317`
- Correct Flight Alert RID: `ri.ontology.main.object-type.a5e40096-09de-4926-8c59-3fdb5c86c7cc`
- Link ID: `lydxpf6t.id-0ab5698f-ea80-ef4d-e2c7-a16484538828`
- Link RID: `ri.ontology.main.relation.96db1bcb-078f-4a02-a455-a9f5971ce971`
- Join: `[Marius] Flight Alert.Flight Id` → `[OFT] Flight.Flight Id`
- Cardinality: each alert has one Flight; each Flight has many alerts

The obsolete default-ontology Flight Alert still exists and requires separate deletion approval.

## Course Essentials
Define a foreign-key link from `[username] Flight Alert.Flight Id` to `[OFT] Flight` and model the relationship as one Flight to many Flight Alerts.

## Why links exist
The Flight already owns flight-specific facts. Linking avoids duplicating them on every alert and preserves a single authoritative representation.

Cardinality expresses the possible world, not merely today’s sample. Even if current data generates one alert per flight, delay and diversion may create multiple distinct alerts later. Therefore one-to-many is more faithful and future-safe.

## Practical Ontology Engineering
Validate referential coverage: null keys, unmatched keys, duplicates, and delayed arrival can create missing links. Decide whether such gaps are invalid, temporarily expected, or meaningful.

If the relationship itself needs timestamps, confidence, role, or history, promote it to an associative object rather than overloading a simple link.

## Deep Understanding Check
Why would declaring one-to-one from current observations be a modeling error? Under what business invariant would one-to-one be correct?

**Go deeper in the Ontology area:** [03 — Ontology fundamentals](../../Ontology/03-ontology-fundamentals/README.md) · [06 — Links and relationships](../../Ontology/06-links/README.md)
