# 01 — Foundations (prerequisite concepts)

| | |
|---|---|
| Purpose | The general data-modeling ideas the Foundry docs assume you already know. Each note is kept short and ends by mapping the idea onto Foundry. This is not a generic Data Engineering course. |
| Prerequisites | [00 — Orientation](../00-orientation/README.md) |
| Status | Ready for Review (5 of 5 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Entities, attributes and relationships](01-entities-attributes-relationships.md) | Conceptual modeling; entity vs attribute vs relationship; cardinality; ER diagrams; how each maps to object types, properties and link types | [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/) · [Add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/) | Ready for Review |
| 02 | [Keys and identity](02-keys-and-identity.md) | Natural, surrogate and composite keys; determinism and stability across rebuilds; identity vs display; why this matters for primary keys and edits | [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) | Ready for Review |
| 03 | [Normalization and denormalization](03-normalization-and-denormalization.md) | Store each fact once; update anomalies; when denormalizing is a deliberate trade-off; dimensional (fact/dimension) models and why a fact table is not automatically an object type | [Ontology design: Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) | Ready for Review |
| 04 | [Semantic layers and domain models](04-semantic-layers-and-domain-models.md) | Semantic/metrics layers; domain-driven design and ubiquitous language; knowledge graphs and W3C OWL; what Palantir means by "ontology" and what it adds (actions, security, writeback) | [The Ontology system](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) | Ready for Review |
| 05 | [Operational vs analytical systems](05-operational-vs-analytical-systems.md) | OLTP vs OLAP; systems of record vs systems of action; writeback; event-driven updates; why Foundry's Ontology is operational, not just a catalog | [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology/) · [Change data capture](https://www.palantir.com/docs/foundry/data-integration/change-data-capture/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

---
← [00 — Orientation](../00-orientation/README.md) · [02 — Foundry data foundations](../02-foundry-data-foundations/README.md) → · [Ontology home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
