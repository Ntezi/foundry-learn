# Topic map

Find a note by task. Rows link to the module until the note is written, then to the note.

| I need to… | Go to |
|---|---|
| Understand what a model is in Foundry and how training, objectives, deployments and functions fit together | [00-01 The modelling map](00-orientation/01-the-modelling-map.md) |
| Tell a Foundry model from an AIP LLM, a model evaluation from an AIP Eval, a container model from a compute module | [00-01 The modelling map](00-orientation/01-the-modelling-map.md) |
| See every modelling decision Kestrel has today, and what's still open | [00-02 Kestrel's modelling posture](00-orientation/README.md) |
| Understand the model asset and why every model needs an adapter | [01-01 What a model asset is](01-models-and-model-adapters/01-what-a-model-asset-is.md) |
| Write a model adapter and define its API | [01-02 Writing a model adapter](01-models-and-model-adapters/02-writing-a-model-adapter.md) |
| Save and load model files, or change an adapter without retraining | [01-03 Serialization, save and load, upgrading an adapter](01-models-and-model-adapters/03-serialization-save-and-load-upgrading-an-adapter.md) |
| Look up a ModelAdapter method or type | [01-04 ModelAdapter API reference](01-models-and-model-adapters/04-modeladapter-api-reference.md) |
| Train a model without code in Model Studio | [02-01 Model Studio](02-training-models-in-foundry/01-model-studio.md) |
| Pick a Model Studio trainer: forecasting, regression or classification | [02-02 Model Studio trainers](02-training-models-in-foundry/02-model-studio-trainers.md) |
| Train a model in a Jupyter code workspace or in Code Repositories | [02-03 Training in Jupyter and Code Repositories](02-training-models-in-foundry/03-training-in-jupyter-and-code-repositories.md) |
| Train with Spark, across several machines, or on GPUs | [02-04 Spark ML, distributed training and GPUs](02-training-models-in-foundry/04-spark-ml-distributed-training-and-gpus.md) |
| Use a model inside a Python transform | [02-05 ModelInput in transforms](02-training-models-in-foundry/05-modelinput-in-transforms.md) |
| Register model weights I already have as files, or import a Hugging Face model | [03-01 Models uploaded from files](03-bringing-models-in/01-models-uploaded-from-files.md) |
| Register a container image as a model, or decide between a container model and a compute module | [03-02 Container models](03-bringing-models-in/02-container-models.md) |
| Connect a model hosted outside Foundry (SageMaker, Vertex AI, OpenAI, Databricks) | [03-03 Externally hosted models](03-bringing-models-in/03-externally-hosted-models.md) |
| Record metrics and parameters while training and compare runs | [04-01 Experiments](04-experiments-and-evaluations/01-experiments.md) |
| Record how a model version performs on test data | [04-02 Evaluations](04-experiments-and-evaluations/02-evaluations.md) |
| Use a built-in evaluator, or look up the evaluations API | [04-03 Built-in evaluators, the FAQ and the evaluations API](04-experiments-and-evaluations/03-built-in-evaluators-the-faq-and-the-evaluations-api.md) |
| Create a Modeling Objective; submit, review, release or archive a model | [05-01 The objective lifecycle](05-modeling-objectives-and-deployments/01-the-objective-lifecycle.md) |
| Add checks to submissions or change an objective's settings | [05-02 Checks on submissions and objective settings](05-modeling-objectives-and-deployments/02-checks-on-submissions-and-objective-settings.md) |
| Choose between a live, a batch and a direct deployment; use a deployment on a branch | [05-03 Deployments: live, batch, direct and branching](05-modeling-objectives-and-deployments/03-deployments-live-batch-direct-and-branching.md) |
| Query a live deployment, read its inference history, or see what it costs | [05-04 Querying a live deployment, inference history, compute usage](05-modeling-objectives-and-deployments/04-querying-a-live-deployment-inference-history-compute-usage.md) |
| Put a model in the Ontology and call it from a function | [05-05 Models in the Ontology and model functions](05-modeling-objectives-and-deployments/05-models-in-the-ontology-and-model-functions.md) |
| Evaluate every submission automatically, or write the evaluation in code | [06-01 Automatic and in-code evaluation](06-evaluating-in-the-objective/01-automatic-and-in-code-evaluation.md) |
| Read the evaluation dashboard, change a metric view, or look up MetricSets | [06-02 The evaluation dashboard, metric views and MetricSets](06-evaluating-in-the-objective/02-the-evaluation-dashboard-metric-views-and-metricsets.md) |
| Choose or write an evaluator | [06-03 Model evaluators](06-evaluating-in-the-objective/03-model-evaluators.md) |
| Wrap a language model in an adapter, or call one from a transform | [07-01 Language model adapters](07-language-models-migration-and-products/README.md) |
| Move code off `foundry_ml` | [07-02 Migrating from foundry_ml to palantir_models](07-language-models-migration-and-products/README.md) |
| Ship a model in a DevOps product or through Marketplace | [07-03 Deploying models with DevOps and Marketplace](07-language-models-migration-and-products/README.md) |
| Follow the docs' tutorial from an empty project to a deployed model | [08-01 Project setup and training three ways](08-tutorial-supervised-machine-learning/README.md) |
| See Kestrel's delivery-delay model trained, evaluated, released and served | [09-01 The delivery-delay model end to end](09-kestrel-case/README.md) |
| See Kestrel's fraud model and where the Kestrel Pay model sits | [09-02 The fraud model and the Kestrel Pay model](09-kestrel-case/README.md) |
| Test myself on this area | [10-01 Review questions by module](10-practice/README.md) |
| Look up a documented limit | [Limits and thresholds](99-reference/README.md) |
| Choose a training tool, an import path, a deployment type or an evaluator | [Decision guide](99-reference/README.md) |

---
[Model integration home](README.md) · [Sources](SOURCES.md) · [Glossary](GLOSSARY.md)
