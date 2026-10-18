# 05 — High-Level Architecture of the Platform

*Module: Course Introduction - Why Foundry & AIP? · Inspected September 23, 2026 · Notes: Ready for Review*

## One architecture, organized around the Ontology

Delivering "many agents, many tools" needs more than a data lake, an ML platform or an app builder on its own. It needs a unified architecture built for composability, and the course says that architecture is organized around one concept: **the Ontology**, the shared world where humans and AI both operate.

## The layers in the course diagram

The architecture diagram (inspected directly) shows:

- **Bottom, "south" of the Ontology:** Data Sources (transactions, IoT/sensor, geospatial, unstructured, relational), Logic Sources (supervised/unsupervised ML, entity resolution, optimizers, forecast models, rule-based logic), and Systems of Action (ERP, SCM, MES, scheduling, edge).
- **Middle:** the Ontology, with objects such as Plant, Warehouse, Customer, Order and Forecast, and links and actions between them.
- **Top, "north" of the Ontology:** Analytics & Workflows, Automations, and Products & SDKs (via SDK/API).
- **Across the top:** AI + human teaming. Models (multimodal, open source, commercial) plus people (operators, developers, analysts).

## AI Infrastructure

The whole stack is what the course calls **AI Infrastructure**: the layer between raw model capability and enterprise outcomes. A model alone can't understand your business, respect governance, integrate with your systems or take real actions. The Ontology is what makes the stack composable.

**Remember:** south = what feeds the Ontology (data, logic, actions); north = what is built on it (analytics/workflows, automations, products/SDKs).

**Review question:** why isn't a frontier model enough by itself? It lacks business context, governance, integration with existing systems and the ability to take governed actions.


**Go deeper in the Ontology area:** [00 — Orientation](../../Ontology/00-orientation/README.md)

---
[Official lesson](https://learn.palantir.com/introduction-to-foundry-aip-for-enterprise-organizations/2492909) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Engineering comparisons and review questions are teaching additions. Next: 06 — What is the Ontology?.
