# Sources, corrections and open questions

The register for every source used in the Model integration notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about product behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's own wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated** and collected in [99 — Limits and thresholds](99-reference/README.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.
- **How pages are read:** each page is fetched into Claude's workspace (`_tools/mdl/fetch_pages.sh`) and its full text is read there and kept in a page store for the quote and number checks; the quality review re-fetches every page. Nothing is summarised by a fetch tool.

## Register

<!-- register:start -->
### Sidebar inventory (October 23, 2026)

The *Model connectivity & development* sidebar was read from the fetched HTML of the overview page on October 23, 2026: **99 links**, 98 documentation pages and the release-notes filter. `_tools/mdl/raw.tsv` holds the list (SHA-256 `5d36e1487bddf455f554831191f1420d2bd38b86b637c7cbbc2a27e8d93e4665`). All 98 pages were fetched the same day and answered 200.

| Section | Pages |
|---|---|
| Core concepts | 9 |
| Tutorial: Supervised machine learning | 8 |
| Developer guides | 3 |
| Integrate models › Models | 1 |
| Integrate models › Model adapters | 5 |
| Integrate models › Model experiments | 2 |
| Integrate models › Model evaluations | 5 |
| Integrate models › Models trained in Foundry | 6 |
| Integrate models › Models uploaded as files | 3 |
| Integrate models › Container models | 4 |
| Integrate models › Externally hosted models | 6 |
| Integrate models › API References | 8 |
| Model Studio | 3 |
| Model Studio › Model trainers | 3 |
| Model Studio › Configuration | 4 |
| Migrate from foundry_ml to palantir_models | 3 |
| Manage models › Manage a modeling project | 4 |
| Manage models › Modeling objective configuration | 10 |
| Manage models › Modeling live deployment reference & FAQ | 3 |
| Manage models › Evaluate models | 5 |
| Manage models › Model evaluators | 3 |
| **Total** | **98** |

### Pages and notes

| Page | Section | Note | Read |
|---|---|---|---|
| [Overview](https://www.palantir.com/docs/foundry/model-integration/overview/) | Core concepts | 00-01 The modelling map | read in full (Oct 23) |
| [Getting started](https://www.palantir.com/docs/foundry/model-integration/getting-started/) | Core concepts | 00-01 The modelling map | read in full (Oct 23) |
| [Models](https://www.palantir.com/docs/foundry/model-integration/models/) | Core concepts | 00-01 The modelling map | read in full (Oct 23) |
| [Model Studio](https://www.palantir.com/docs/foundry/model-integration/model-studio/) | Core concepts | 02-01 Model Studio | read in full (Oct 23) |
| [Modeling Objectives](https://www.palantir.com/docs/foundry/model-integration/objectives/) | Core concepts | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Experiments](https://www.palantir.com/docs/foundry/model-integration/experiments/) | Core concepts | 04-01 Experiments | read in full (Oct 23) |
| [Evaluations](https://www.palantir.com/docs/foundry/model-integration/evaluations/) | Core concepts | 04-02 Evaluations | read in full (Oct 23) |
| [Functions on models](https://www.palantir.com/docs/foundry/model-integration/functions-on-models/) | Core concepts | 05-05 Models in the Ontology and model functions | read in full (Oct 23) |
| [Selecting the right modeling tool](https://www.palantir.com/docs/foundry/model-integration/what-to-use/) | Core concepts | 00-01 The modelling map | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/model-integration/tutorial-intro/) | Tutorial: Supervised machine learning | 08-01 Project setup and training three ways | not yet read |
| [Set up a machine learning project in Foundry](https://www.palantir.com/docs/foundry/model-integration/tutorial-set-up-project/) | Tutorial: Supervised machine learning | 08-01 Project setup and training three ways | not yet read |
| [Train a model in Model Studio](https://www.palantir.com/docs/foundry/model-integration/tutorial-train-model-studio/) | Tutorial: Supervised machine learning | 08-01 Project setup and training three ways | not yet read |
| [Train a model in Jupyter® notebooks](https://www.palantir.com/docs/foundry/model-integration/tutorial-train-jupyter-notebook/) | Tutorial: Supervised machine learning | 08-01 Project setup and training three ways | not yet read |
| [Train a model in Code Repositories](https://www.palantir.com/docs/foundry/model-integration/tutorial-train-code-repositories/) | Tutorial: Supervised machine learning | 08-01 Project setup and training three ways | not yet read |
| [Evaluate a model in the Modeling Objectives application](https://www.palantir.com/docs/foundry/model-integration/tutorial-evaluate-manage-models/) | Tutorial: Supervised machine learning | 08-02 Evaluate, productionize, conclude | not yet read |
| [Productionize a model](https://www.palantir.com/docs/foundry/model-integration/tutorial-productionize/) | Tutorial: Supervised machine learning | 08-02 Evaluate, productionize, conclude | not yet read |
| [Conclusion and next steps](https://www.palantir.com/docs/foundry/model-integration/tutorial-conclusion/) | Tutorial: Supervised machine learning | 08-02 Evaluate, productionize, conclude | not yet read |
| [Model functions](https://www.palantir.com/docs/foundry/model-integration/model-functions-guide/) | Developer guides | 05-05 Models in the Ontology and model functions | read in full (Oct 23) |
| [Train models with GPUs](https://www.palantir.com/docs/foundry/model-integration/gpu-training/) | Developer guides | 02-04 Spark ML, distributed training and GPUs | read in full (Oct 23) |
| [Deploy models with DevOps and Marketplace](https://www.palantir.com/docs/foundry/model-integration/marketplace-models/) | Developer guides | 07-03 Deploying models with DevOps and Marketplace | not yet read |
| [Overview](https://www.palantir.com/docs/foundry/integrate-models/integrate-overview/) | Integrate models › Models | 01-01 What a model asset is | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-overview/) | Integrate models › Model adapters | 01-01 What a model asset is | read in full (Oct 23) |
| [Creating model adapters](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-creation/) | Integrate models › Model adapters | 01-02 Writing a model adapter | read in full (Oct 23) |
| [Model serialization](https://www.palantir.com/docs/foundry/integrate-models/serialization/) | Integrate models › Model adapters | 01-03 Serialization, save and load, upgrading an adapter | read in full (Oct 23) |
| [Model adapters in the Ontology](https://www.palantir.com/docs/foundry/integrate-models/model-asset-osdk/) | Integrate models › Model adapters | 05-05 Models in the Ontology and model functions | read in full (Oct 23) |
| [Model API definition](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-api/) | Integrate models › Model adapters | 01-02 Writing a model adapter | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/integrate-models/experiments-overview/) | Integrate models › Model experiments | 04-01 Experiments | read in full (Oct 23) |
| [Visualize experiments](https://www.palantir.com/docs/foundry/integrate-models/experiments-visualize/) | Integrate models › Model experiments | 04-01 Experiments | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/integrate-models/evaluations-overview/) | Integrate models › Model evaluations | 04-02 Evaluations | read in full (Oct 23) |
| [Author and run evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluations-writing/) | Integrate models › Model evaluations | 04-02 Evaluations | read in full (Oct 23) |
| [Visualize evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluations-visualize/) | Integrate models › Model evaluations | 04-02 Evaluations | read in full (Oct 23) |
| [Built-in evaluators](https://www.palantir.com/docs/foundry/integrate-models/evaluations-builtin/) | Integrate models › Model evaluations | 04-03 Built-in evaluators, the FAQ and the evaluations API | read in full (Oct 23) |
| [FAQ](https://www.palantir.com/docs/foundry/integrate-models/evaluations-faq/) | Integrate models › Model evaluations | 04-03 Built-in evaluators, the FAQ and the evaluations API | read in full (Oct 23) |
| [Train in a Jupyter® notebook](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-workspaces/) | Integrate models › Models trained in Foundry | 02-03 Training in Jupyter and Code Repositories | read in full (Oct 23) |
| [Train in Code Repositories](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-repositories/) | Integrate models › Models trained in Foundry | 02-03 Training in Jupyter and Code Repositories | read in full (Oct 23) |
| [Example: Binary classification with scikit-learn](https://www.palantir.com/docs/foundry/integrate-models/model-asset-code-repositories-sklearn/) | Integrate models › Models trained in Foundry | 02-03 Training in Jupyter and Code Repositories | read in full (Oct 23) |
| [Spark ML models](https://www.palantir.com/docs/foundry/integrate-models/spark-models/) | Integrate models › Models trained in Foundry | 02-04 Spark ML, distributed training and GPUs | read in full (Oct 23) |
| [Spark distributed model training](https://www.palantir.com/docs/foundry/integrate-models/spark-distributed-model-training/) | Integrate models › Models trained in Foundry | 02-04 Spark ML, distributed training and GPUs | read in full (Oct 23) |
| [Upgrade Model Adapter Without Retraining](https://www.palantir.com/docs/foundry/integrate-models/upgrade-model-adapter/) | Integrate models › Models trained in Foundry | 01-03 Serialization, save and load, upgrading an adapter | read in full (Oct 23) |
| [Upload a model from pre-trained files](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files/) | Integrate models › Models uploaded as files | 03-01 Models uploaded from files | read in full (Oct 23) |
| [Example: Upload a scikit-learn model](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files-iris/) | Integrate models › Models uploaded as files | 03-01 Models uploaded from files | read in full (Oct 23) |
| [Import a Hugging Face model](https://www.palantir.com/docs/foundry/integrate-models/import-huggingface-models/) | Integrate models › Models uploaded as files | 03-01 Models uploaded from files | read in full (Oct 23) |
| [Overview](https://www.palantir.com/docs/foundry/integrate-models/container-overview/) | Integrate models › Container models | 03-02 Container models | read in full (Oct 23) |
| [Upload images with a container model](https://www.palantir.com/docs/foundry/integrate-models/upload-image-container-model/) | Integrate models › Container models | 03-02 Container models | read in full (Oct 23) |
| [Example: Implement a container model adapter](https://www.palantir.com/docs/foundry/integrate-models/container-model-adapter-example/) | Integrate models › Container models | 03-02 Container models | read in full (Oct 23) |
| [FAQ](https://www.palantir.com/docs/foundry/integrate-models/container-models-faq/) | Integrate models › Container models | 03-02 Container models | read in full (Oct 23) |
| [Integrate an externally hosted model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [Example: Integrate a SageMaker model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-sagemaker/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [Example: Integrate a Vertex AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-vertex-ai/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [Example: Integrate an Open AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-open-ai/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [Example: Integrate a Databricks model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-databricks/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [Instrumentation and telemetry](https://www.palantir.com/docs/foundry/integrate-models/instrumentation-telemetry/) | Integrate models › Externally hosted models | 03-03 Externally hosted models | read in full (Oct 23) |
| [API: ModelAdapter reference](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-reference/) | Integrate models › API References | 01-04 ModelAdapter API reference | read in full (Oct 23) |
| [API: ModelInput in transforms](https://www.palantir.com/docs/foundry/integrate-models/transform-model-input/) | Integrate models › API References | 02-05 ModelInput in transforms | read in full (Oct 23) |
| [API: Model save and load](https://www.palantir.com/docs/foundry/integrate-models/auto-serialization-reference/) | Integrate models › API References | 01-03 Serialization, save and load, upgrading an adapter | read in full (Oct 23) |
| [API: Model experiments](https://www.palantir.com/docs/foundry/integrate-models/experiment-reference/) | Integrate models › API References | 04-01 Experiments | read in full (Oct 23) |
| [API: Model evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluation-reference/) | Integrate models › API References | 04-03 Built-in evaluators, the FAQ and the evaluations API | read in full (Oct 23) |
| [API: Language model adapters](https://www.palantir.com/docs/foundry/integrate-models/language-models-adapters/) | Integrate models › API References | 07-01 Language model adapters | not yet read |
| [API: Language model transform inputs](https://www.palantir.com/docs/foundry/integrate-models/language-models-transforms-inputs/) | Integrate models › API References | 07-01 Language model adapters | not yet read |
| [API: Generic chat completion](https://www.palantir.com/docs/foundry/integrate-models/language-models-generic-chat-completion/) | Integrate models › API References | 07-01 Language model adapters | not yet read |
| [Overview](https://www.palantir.com/docs/foundry/model-studio/overview/) | Model Studio | 02-01 Model Studio | read in full (Oct 23) |
| [Core concepts](https://www.palantir.com/docs/foundry/model-studio/core-concepts/) | Model Studio | 02-01 Model Studio | read in full (Oct 23) |
| [Navigation](https://www.palantir.com/docs/foundry/model-studio/navigation/) | Model Studio | 02-01 Model Studio | read in full (Oct 23) |
| [Time series forecasting](https://www.palantir.com/docs/foundry/model-studio/trainers-timeseries-forecasting/) | Model Studio › Model trainers | 02-02 Model Studio trainers | read in full (Oct 23) |
| [Regression](https://www.palantir.com/docs/foundry/model-studio/trainers-regression/) | Model Studio › Model trainers | 02-02 Model Studio trainers | read in full (Oct 23) |
| [Classification](https://www.palantir.com/docs/foundry/model-studio/trainers-classification/) | Model Studio › Model trainers | 02-02 Model Studio trainers | read in full (Oct 23) |
| [Inputs](https://www.palantir.com/docs/foundry/model-studio/configuration-inputs/) | Model Studio › Configuration | 02-01 Model Studio | read in full (Oct 23) |
| [Compute resources](https://www.palantir.com/docs/foundry/model-studio/configuration-compute-resources/) | Model Studio › Configuration | 02-01 Model Studio | read in full (Oct 23) |
| [Troubleshooting](https://www.palantir.com/docs/foundry/model-studio/troubleshooting/) | Model Studio › Configuration | 02-01 Model Studio | read in full (Oct 23) |
| [FAQ](https://www.palantir.com/docs/foundry/model-studio/faq/) | Model Studio › Configuration | 02-01 Model Studio | read in full (Oct 23) |
| [Migrate to foundry_ml [planned deprecation] to palantir_models](https://www.palantir.com/docs/foundry/migrate-models/overview/) | Migrate from foundry_ml to palantir_models | 07-02 Migrating from foundry_ml to palantir_models | not yet read |
| [Migration instructions: foundry_ml [planned deprecation] to palantir_models](https://www.palantir.com/docs/foundry/migrate-models/how-to/) | Migrate from foundry_ml to palantir_models | 07-02 Migrating from foundry_ml to palantir_models | not yet read |
| [Palantir models migration FAQ](https://www.palantir.com/docs/foundry/migrate-models/migration-reference-faq/) | Migrate from foundry_ml to palantir_models | 07-02 Migrating from foundry_ml to palantir_models | not yet read |
| [Create a modeling objective](https://www.palantir.com/docs/foundry/manage-models/create-a-modeling-objective/) | Manage models › Manage a modeling project | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Create a direct model deployment](https://www.palantir.com/docs/foundry/manage-models/create-a-model-deployment/) | Manage models › Manage a modeling project | 05-03 Deployments: live, batch, direct and branching | read in full (Oct 23) |
| [Branching direct model deployments](https://www.palantir.com/docs/foundry/manage-models/branching-direct-model-deployments/) | Manage models › Manage a modeling project | 05-03 Deployments: live, batch, direct and branching | read in full (Oct 23) |
| [API: Query a live deployment](https://www.palantir.com/docs/foundry/manage-models/live-deployment-reference/) | Manage models › Manage a modeling project | 05-04 Querying a live deployment, inference history, compute usage | read in full (Oct 23) |
| [Submit a model to an objective](https://www.palantir.com/docs/foundry/manage-models/submit-model/) | Manage models › Modeling objective configuration | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Configure objective metadata](https://www.palantir.com/docs/foundry/manage-models/configure-objective-metadata/) | Manage models › Modeling objective configuration | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Set up checks for all submissions](https://www.palantir.com/docs/foundry/manage-models/set-up-checks/) | Manage models › Modeling objective configuration | 05-02 Checks on submissions and objective settings | read in full (Oct 23) |
| [Review a model submission](https://www.palantir.com/docs/foundry/manage-models/review-model/) | Manage models › Modeling objective configuration | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Release a model](https://www.palantir.com/docs/foundry/manage-models/release-model/) | Manage models › Modeling objective configuration | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Archive models in an objective](https://www.palantir.com/docs/foundry/manage-models/archive-model/) | Manage models › Modeling objective configuration | 05-01 The objective lifecycle | read in full (Oct 23) |
| [Set up and use a Modeling Objective live deployment](https://www.palantir.com/docs/foundry/manage-models/set-up-live/) | Manage models › Modeling objective configuration | 05-03 Deployments: live, batch, direct and branching | read in full (Oct 23) |
| [Set up a batch deployment](https://www.palantir.com/docs/foundry/manage-models/set-up-batch/) | Manage models › Modeling objective configuration | 05-03 Deployments: live, batch, direct and branching | read in full (Oct 23) |
| [Modeling objective settings](https://www.palantir.com/docs/foundry/manage-models/modeling-objective-settings/) | Manage models › Modeling objective configuration | 05-02 Checks on submissions and objective settings | read in full (Oct 23) |
| [Model inference history](https://www.palantir.com/docs/foundry/manage-models/model-inference-history/) | Manage models › Modeling objective configuration | 05-04 Querying a live deployment, inference history, compute usage | read in full (Oct 23) |
| [Models in the Ontology](https://www.palantir.com/docs/foundry/manage-models/models-in-the-ontology/) | Manage models › Modeling live deployment reference & FAQ | 05-05 Models in the Ontology and model functions | read in full (Oct 23) |
| [Modeling Objective live deployment FAQ](https://www.palantir.com/docs/foundry/manage-models/live-faq/) | Manage models › Modeling live deployment reference & FAQ | 05-04 Querying a live deployment, inference history, compute usage | read in full (Oct 23) |
| [Live deployment compute usage](https://www.palantir.com/docs/foundry/manage-models/compute-usage/) | Manage models › Modeling live deployment reference & FAQ | 05-04 Querying a live deployment, inference history, compute usage | read in full (Oct 23) |
| [Automatically evaluate model performance](https://www.palantir.com/docs/foundry/evaluate-models/model-evaluation-automatic/) | Manage models › Evaluate models | 06-01 Automatic and in-code evaluation | read in full (Oct 23) |
| [Evaluate model performance in code](https://www.palantir.com/docs/foundry/evaluate-models/model-evaluation-code/) | Manage models › Evaluate models | 06-01 Automatic and in-code evaluation | read in full (Oct 23) |
| [Review model metrics in the evaluation dashboard](https://www.palantir.com/docs/foundry/evaluate-models/review-model-metrics/) | Manage models › Evaluate models | 06-02 The evaluation dashboard, metric views and MetricSets | read in full (Oct 23) |
| [Customize modeling objective metric views](https://www.palantir.com/docs/foundry/evaluate-models/customize-metric-views/) | Manage models › Evaluate models | 06-02 The evaluation dashboard, metric views and MetricSets | read in full (Oct 23) |
| [MetricSet reference](https://www.palantir.com/docs/foundry/evaluate-models/metric-sets-reference/) | Manage models › Evaluate models | 06-02 The evaluation dashboard, metric views and MetricSets | read in full (Oct 23) |
| [Binary classification](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-binary-classification/) | Manage models › Model evaluators | 06-03 Model evaluators | read in full (Oct 23) |
| [Regression](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-regression/) | Manage models › Model evaluators | 06-03 Model evaluators | read in full (Oct 23) |
| [Custom model evaluator](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-custom/) | Manage models › Model evaluators | 06-03 Model evaluators | read in full (Oct 23) |
<!-- register:end -->

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 23, 2026 | Plan | Self-review, 6 fixes: sidebar groups recovered from the fetched nav's element depths after a first parse merged them (9 + 8 + 3 + 40 + 10 + 3 + 25 = 98, asserted by `mdl_modules.py`); modules regrouped by topic rather than sidebar order (the objectives, experiments and evaluations concept pages with their modules; *Functions on models* and *Model functions* together in 05-05); a disambiguation table for *model*, *evaluation* and *container* put in 00-01; phases rebalanced to 23 / 31 / 29 / 15 pages; the Kestrel Pay LLM kept in AIP's scope, recorded here rather than redesigned; the folder named `ModelIntegration` with both the sidebar's and the URL's names in the README |
| Oct 23, 2026 | Structure | Self-review, 4 fixes: empty placeholder row in the open-questions table replaced by a sentence; `fetch_pages.sh` and `gen_mdl.py` still named the Observability tools; module 02's related link pointed at the DevTools area README rather than 05-01 |
| Oct 23, 2026 | Phase 3 | Self-review, 3 fixes: the delay model's proposed evaluation used regression metrics (MAE in hours) although Ontology 15-03 defines its output as a probability of lateness; 04-02 and 04-03 now use the classification evaluator and a calibration plot. 01-03 stated as fact that both Kestrel models are trained in Code Repositories; now part of the proposal, with Model Studio weighed for a baseline in module 02. Two glossary rows for the sidecar merged |
| Oct 23, 2026 | Phase 4 | Self-review, 3 fixes: 02-01 first said the delay model's inputs carry `Customer PII` through `Commerce [Transform]`; Security 11-01 records that the marking is split off *inside* that project, so the note now says a training dataset built downstream of the split is unmarked. A link labelled *05-03* in 02-05 pointed at Ontology 05-03 and read as this area's 05-03; relabelled. 03-01 said the AIP area *did not want* the Kestrel Pay LLM as a model asset; it recorded no such wish, so the sentence now says nothing in its decision calls for one. Also: the plan's *Model Studio regression* baseline for the delay model is replaced by the classification trainer with probabilities, following the Phase 3 fix |
| Oct 23, 2026 | Phase 5 | Self-review, 4 fixes: 05-01 said `Payments [Ontology]` is marked `Kestrel Pay – Financial` by the project; Ontology 02-04 leaves it unmarked at project level, so the marking now sits on the inference-history dataset (the recurring slip from the Security and Observability reviews, caught again). 05-03 said the Delivery Desk's functions use global branches; DevTools 09-02 records Daniel working on global branches in `kestrel-dev`, so the sentence now says that. 05-04 proposed `Customer PII` on the delay model's inference history and put both deployments in the Kestrel Pay view; the inputs are shipment features, so no marking, and each deployment goes to its own view. 02-02 named the probability column `predictedLate_proba_true`; with the 0/1 labels the objective's evaluator requires it is `predictedLate_proba_1` |

## Open research questions

None opened at structure time. Questions this area reuses from earlier areas will be listed here with their original ID; new ones are numbered RQ-NN.

---
[Model integration home](README.md) · [Topic map](MAP.md) · [Glossary](GLOSSARY.md)
