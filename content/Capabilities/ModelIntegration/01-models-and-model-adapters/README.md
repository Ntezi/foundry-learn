# 01 — Models and model adapters

| | |
|---|---|
| Purpose | The unit everything else works on: a model asset and the adapter that lets the platform load, run and describe it. |
| Prerequisites | [00 — Orientation](../00-orientation/README.md) |
| Status | Ready for Review (4 of 4 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [What a model asset is](01-what-a-model-asset-is.md) | The model asset, its versions and permissions; what an adapter is for and what the platform does with it | [Overview](https://www.palantir.com/docs/foundry/integrate-models/integrate-overview/) · [Overview](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-overview/) | Ready for Review |
| 02 | [Writing a model adapter](02-writing-a-model-adapter.md) | Writing an adapter: the class, the API definition, inputs and outputs, publishing it with a model | [Creating model adapters](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-creation/) · [Model API definition](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-api/) | Ready for Review |
| 03 | [Serialization, save and load, upgrading an adapter](03-serialization-save-and-load-upgrading-an-adapter.md) | How model files are saved and loaded; automatic serialization and its supported types; upgrading an adapter without retraining | [Model serialization](https://www.palantir.com/docs/foundry/integrate-models/serialization/) · [API: Model save and load](https://www.palantir.com/docs/foundry/integrate-models/auto-serialization-reference/) · [Upgrade Model Adapter Without Retraining](https://www.palantir.com/docs/foundry/integrate-models/upgrade-model-adapter/) | Ready for Review |
| 04 | [ModelAdapter API reference](04-modeladapter-api-reference.md) | The ModelAdapter API reference, read as a reference sheet | [API: ModelAdapter reference](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-reference/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Related in other areas

- [Ontology 15-03 — Models in the Ontology](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)
- [Ontology 09-04 — Functions on models and LLMs](../../Ontology/09-functions/04-functions-on-models-and-llms.md)

---
← [00 — Orientation](../00-orientation/README.md) · [02 — Training models in Foundry](../02-training-models-in-foundry/README.md) → · [Model integration home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
