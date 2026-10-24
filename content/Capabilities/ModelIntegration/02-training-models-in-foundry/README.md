# 02 — Training models in Foundry

| | |
|---|---|
| Purpose | Training a model inside Foundry: without code in Model Studio, or in Jupyter, Code Repositories and Spark. |
| Prerequisites | [01 — Models and model adapters](../01-models-and-model-adapters/README.md) |
| Status | Ready for Review (5 of 5 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Model Studio](01-model-studio.md) | Model Studio: what it trains, how a studio is set up, inputs, compute resources, troubleshooting and the FAQ | [Model Studio](https://www.palantir.com/docs/foundry/model-integration/model-studio/) · [Overview](https://www.palantir.com/docs/foundry/model-studio/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/model-studio/core-concepts/) · [Navigation](https://www.palantir.com/docs/foundry/model-studio/navigation/) · [Inputs](https://www.palantir.com/docs/foundry/model-studio/configuration-inputs/) · [Compute resources](https://www.palantir.com/docs/foundry/model-studio/configuration-compute-resources/) · [Troubleshooting](https://www.palantir.com/docs/foundry/model-studio/troubleshooting/) · [FAQ](https://www.palantir.com/docs/foundry/model-studio/faq/) | Ready for Review |
| 02 | [Model Studio trainers](02-model-studio-trainers.md) | The three trainers: time series forecasting, regression and classification | [Time series forecasting](https://www.palantir.com/docs/foundry/model-studio/trainers-timeseries-forecasting/) · [Regression](https://www.palantir.com/docs/foundry/model-studio/trainers-regression/) · [Classification](https://www.palantir.com/docs/foundry/model-studio/trainers-classification/) | Ready for Review |
| 03 | [Training in Jupyter and Code Repositories](03-training-in-jupyter-and-code-repositories.md) | Training in a Jupyter code workspace and in Code Repositories; the scikit-learn example end to end | [Train in a Jupyter® notebook](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-workspaces/) · [Train in Code Repositories](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-repositories/) · [Example: Binary classification with scikit-learn](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-repositories-sklearn/) | Ready for Review |
| 04 | [Spark ML, distributed training and GPUs](04-spark-ml-distributed-training-and-gpus.md) | Spark ML models, distributed training and training with GPUs | [Spark ML models](https://www.palantir.com/docs/foundry/integrate-models/spark-models/) · [Spark distributed model training](https://www.palantir.com/docs/foundry/integrate-models/spark-distributed-model-training/) · [Train models with GPUs](https://www.palantir.com/docs/foundry/model-integration/gpu-training/) | Ready for Review |
| 05 | [ModelInput in transforms](05-modelinput-in-transforms.md) | ModelInput in transforms: using a model inside a Python transform, read as a reference sheet | [API: ModelInput in transforms](https://www.palantir.com/docs/foundry/integrate-models/transform-model-input/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Related in other areas

- [Apps 10-01 — Workflow Lineage](../../Apps/10-workflow-tools/01-workflow-lineage.md)
- [DevTools 05-01 — Code Workspaces](../../DevTools/05-development-environments/01-code-workspaces.md)

---
← [01 — Models and model adapters](../01-models-and-model-adapters/README.md) · [03 — Bringing models in](../03-bringing-models-in/README.md) → · [Model integration home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
