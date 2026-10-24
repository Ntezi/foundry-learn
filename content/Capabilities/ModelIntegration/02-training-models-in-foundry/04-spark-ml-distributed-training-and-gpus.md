# 04 — Spark ML, distributed training and GPUs

*Sources: [Support for Spark ML Models in palantir_models](https://www.palantir.com/docs/foundry/integrate-models/spark-models/) · [Spark distributed model training](https://www.palantir.com/docs/foundry/integrate-models/spark-distributed-model-training/) · [Train models with GPUs](https://www.palantir.com/docs/foundry/model-integration/gpu-training/) · checked October 23, 2026 · Ready for Review*

Three pages about scale, and all three start by narrowing their own scope: Spark ML is supported with caveats and discouraged behind an endpoint; distributed training is XGBoost on Spark and nothing else yet; GPUs need a resource queue on the project and the right build of the library. Read them for the rules that stop a job from running at all.

## Spark ML models

**[Docs]** Foundry supports Spark MLlib "with some caveats due to the specificities of Spark as an inherently distributed machine learning framework". Some features "rely on encapsulating the model in a container image", and "Foundry does not yet support building such a container image for Spark models". So: "we recommend that users favor frameworks that natively support single-node training and inference", such as scikit-learn, XGBoost or Keras, and "Spark ML is particularly discouraged if the model is to be consumed as a REST API". Live inference with Spark models is "technically supported as an experimental feature in Modeling Objectives" and "generally discouraged".

**[Docs]** Where it does fit: train in Code Repositories ("code workspaces run on a single node and code workbooks are considered legacy"); the API takes Spark DataFrames (`pm.Spark`); pipeline models auto-serialize with `SparkMLAutoSerializer`, "introduced in version 0.1599.0 of palantir_models". The example trains a random-forest classifier on Iris in a `Pipeline` of `VectorAssembler`, `StringIndexer` and `RandomForestClassifier`, and the adapter's `predict()` drops the Spark vector columns (`features`, `rawPrediction`, `probability`) before returning the frame, keeping only the `label` the API declared.

**[Explanation]** The reason behind the caveats is the deployment model: a live deployment is a container with the adapter in it, and a Spark model needs a cluster, not a container. Batch inference over datasets is where Spark belongs, and even there [05](05-modelinput-in-transforms.md) offers a way to spread a single-node model across executors instead.

## Distributed training

**[Docs]** "Currently, only PySpark XGBoost estimators are directly supported for distributed model training in Foundry." The benefits claimed: faster training and "much larger datasets than what single-node approaches can fit in memory". Four steps:

1. **Spark profile.** "applying the KUBERNETES_OPEN_PORTS_ALL profile is mandatory for distributed training", through `@configure(profile=[...])`.
2. **Estimator.** `SparkXGBClassifier` or `SparkXGBRegressor` from `xgboost.spark`. For GPUs: a project on a GPU resource queue, the `EXECUTOR_GPU_ENABLED` profile, and `device='gpu'` or `'cuda'`.
3. **Hyperparameter search**, optionally, with Optuna, which "integrates well with Spark and distributed training workflows without additional setup".
4. **Adapter.** `XGBoostSerializer` "does not directly support XGBoost's Spark estimators"; extract the `Booster` with `.get_booster()` and wrap *that*. Distributed inference, if needed, goes through a PySpark UDF.

**[Docs]** The page's training transform also sets `DYNAMIC_ALLOCATION_DISABLED` and `NUM_EXECUTORS_2`.

**[Explanation]** Step 4 is the part that makes the result ordinary: what gets published is a plain XGBoost booster with the standard serializer, so everything downstream (objectives, live deployments, functions) sees a single-node model. Distribution was a property of the training job, not of the model.

## GPUs

**[Docs]** "Only jobs originating in projects with an assigned GPU resource queue can use GPUs." The flag icon in the project's file tree shows whether one is assigned; *Resource management administrators*, configured in Control Panel, assign queues in the Resource Management application. GPU types vary by enrollment and "Your enrollment may not have any available GPU types."

**[Docs]** The recommended route is a Jupyter code workspace with one or more GPUs configured, from the *Settings* menu of the Code Workspaces sidebar (Jupyter or VS Code). Order matters: enable the GPU first, then install the library, then verify. The troubleshooting section is all about that order:

| Symptom | Cause | Fix |
|---|---|---|
| CPU-only package installed | The library was installed before the GPU existed; conda "resolves to a CPU-only build variant" (build string contains `cpu`; GPU builds contain `cuda`) | Install after adding the GPU, or reset the environment |
| "Unsolvable environment error" mentioning `__cuda` | A GPU build was forced (`tensorflow=2.17.0=*cuda*`) with no GPU present | Add the GPU, then install |
| Adding a GPU changes nothing | The restore "uses the existing lock file" | Reinstall, `maestro env reset --hard`, or change a dependency to force a new solve |

**[Docs]** In Code Repositories, "The recommended method for using GPUs in Python transforms is to use the lightweight decorator" with a type: `@lightweight(gpu_type='NVIDIA_T4')`. Spark transforms use the `DRIVER_GPU_ENABLED` and `EXECUTOR_GPU_ENABLED` profiles instead, taking whatever type the queue offers. "Prefer lightweight to driver-only Spark jobs": Spark adds overhead "for distributing work and converting Spark DataFrames into Python objects", so use it only to distribute to executors, when the model takes Spark frames natively, or to run a model as a container (Spark only).

**[Docs]** Installing GPU packages in Code Repositories has a twist: the servers that solve the conda environment "do not have a GPU and cannot be configured to use one", so the CUDA version is declared through `CONDA_OVERRIDE_CUDA` in the most nested `build.gradle` (the `transforms-python` or `transformers-model-training` folder, never the top level), with `pytorch-gpu`, `tensorflow-gpu` or a build-string constraint. Find the maximum CUDA version with `nvidia-smi` in a GPU workspace. "GPUs are not available when previewing your transform", so preview behaviour can differ from a build.

**[Docs]** Library advice: prefer conda to pip, because conda "does not allow packages with incompatible dependencies to be installed" and so protects `transforms-python` and `palantir_models`; pip installs "ignoring any dependency requirements from your conda packages". Verify with the page's PyTorch matmul benchmark or `watch -n0.2 nvidia-smi`.

**[Docs]** Inference with a GPU model from another repository: `use_sidecar=True` with `sidecar_resources={"gpus": 1, "cpus": 3.4, "memory_gb": 16}`, so the model loads "with the required Python environment" in a container next to each executor and driver ([05](05-modelinput-in-transforms.md)).

## For Kestrel

**[Example]** *Considered, not adopted*, as the [plan](../README.md) anticipated and these pages confirm: Kestrel's two models are tabular, train on months of shipments and payments that fit in one worker's memory, and are served live, which is exactly where the Spark page says not to use Spark ML. Distributed XGBoost would need the `KUBERNETES_OPEN_PORTS_ALL` profile and a project on a GPU queue for the GPU variant; neither project has a resource queue recorded in [17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md), and nothing in the use case asks for one. If a future model does need a GPU (the plan names none), the rule from this page goes into [00-02](../00-orientation/README.md) now: request the queue for the project *before* building the environment, because a library installed first will be the CPU build and will stay so until the environment is reset.

---
[Module index](README.md) · Previous: [03 — Training in Jupyter and Code Repositories](03-training-in-jupyter-and-code-repositories.md) · Next: [05 — ModelInput in transforms](05-modelinput-in-transforms.md)
