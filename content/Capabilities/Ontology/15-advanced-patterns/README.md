# 15 — Advanced patterns

| | |
|---|---|
| Purpose | Modeling situations the basic building blocks do not handle on their own. |
| Prerequisites | [11 — Ontology design](../11-design/README.md) |
| Status | Ready for Review (4 of 4 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Events, history and time](01-events-history-and-time.md) | Five questions about one shipment, five structures: current state, events, edit history, time series, process logs | [Time series](https://www.palantir.com/docs/foundry/time-series/time-series-overview/) · [User edit history](https://www.palantir.com/docs/foundry/object-edits/user-edit-history/) | Ready for Review |
| 02 | [Scenarios](02-scenarios.md) | A planning decision from first idea to merge: temporary and persisted scenarios, governance, merge actions, OSDK, limits | [Ontology scenarios](https://www.palantir.com/docs/foundry/ontology/overview-ontology-scenario/) · [Temporary scenarios](https://www.palantir.com/docs/foundry/ontology/temporary-scenario/) · [Persisted scenarios](https://www.palantir.com/docs/foundry/ontology/persisted-scenario/) · [Merge scenarios](https://www.palantir.com/docs/foundry/ontology/merge-scenario/) · [Scenarios with OSDK](https://www.palantir.com/docs/foundry/ontology/osdk-scenario/) | Ready for Review |
| 03 | [Models in the Ontology](03-models-in-the-ontology.md) | An ADR: batch property vs live function vs prediction objects; provenance, feedback, deployment upgrades | [Models in the Ontology](https://www.palantir.com/docs/foundry/ontology/models/) · [Direct model deployments](https://www.palantir.com/docs/foundry/manage-models/create-a-model-deployment/) | Ready for Review |
| 04 | [Entity resolution across sources](04-entity-resolution-across-sources.md) | A design doc: matching, stable master IDs via an append-only crosswalk, survivorship, review actions | [Multi-datasource object types](https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Seen in our courses

- [Speedrun — Mining Your First Business Process (event log)](../../../Tracks/Speedrun/Mining%20Your%20First%20Business%20Process/README.md)

---
← [14 — Lifecycle and operations](../14-lifecycle-and-operations/README.md) · [16 — AI and agents](../16-ai-and-agents/README.md) → · [Ontology home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
