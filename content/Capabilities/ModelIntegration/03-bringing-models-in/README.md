# 03 — Bringing models in

| | |
|---|---|
| Purpose | Bringing a model trained elsewhere in: as files, as a container image, or as an API someone else hosts. |
| Prerequisites | [01 — Models and model adapters](../01-models-and-model-adapters/README.md) |
| Status | Ready for Review (3 of 3 notes written) |

## Notes in reading order

| # | Note | Covers | Official pages | Status |
|---|---|---|---|---|
| 01 | [Models uploaded from files](01-models-uploaded-from-files.md) | Registering model weights uploaded as files; the scikit-learn and Hugging Face examples | [Upload a model from pre-trained files](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files/) · [Example: Upload a scikit-learn model](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files-iris/) · [Import a Hugging Face model](https://www.palantir.com/docs/foundry/integrate-models/import-huggingface-models/) | Ready for Review |
| 02 | [Container models](02-container-models.md) | Container models: what the image must do, uploading it, the adapter example and the FAQ; when a container model and when a compute module | [Overview](https://www.palantir.com/docs/foundry/integrate-models/container-overview/) · [Upload images with a container model](https://www.palantir.com/docs/foundry/integrate-models/upload-image-container-model/) · [Example: Implement a container model adapter](https://www.palantir.com/docs/foundry/integrate-models/container-model-adapter-example/) · [FAQ](https://www.palantir.com/docs/foundry/integrate-models/container-models-faq/) | Ready for Review |
| 03 | [Externally hosted models](03-externally-hosted-models.md) | Externally hosted models: the connection, the SageMaker, Vertex AI, OpenAI and Databricks examples, instrumentation and telemetry | [Integrate an externally hosted model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection/) · [Example: Integrate a SageMaker model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-sagemaker/) · [Example: Integrate a Vertex AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-vertex-ai/) · [Example: Integrate an Open AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-open-ai/) · [Example: Integrate a Databricks model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-databricks/) · [Instrumentation and telemetry](https://www.palantir.com/docs/foundry/integrate-models/instrumentation-telemetry/) | Ready for Review |

All notes in this module are written. Read them in order, or jump in through the [topic map](../MAP.md).

## Related in other areas

- [AIP 02 — Bring your own model](../../AIP/02-bring-your-own-model/README.md)
- [DevTools 03 — Compute modules and custom endpoints](../../DevTools/03-compute-modules-and-custom-endpoints/README.md)

---
← [02 — Training models in Foundry](../02-training-models-in-foundry/README.md) · [04 — Experiments and evaluations](../04-experiments-and-evaluations/README.md) → · [Model integration home](../README.md) · [Topic map](../MAP.md) · [Glossary](../GLOSSARY.md)
