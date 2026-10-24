# 05 — ModelInput in transforms

*Sources: [ModelInput in transforms](https://www.palantir.com/docs/foundry/integrate-models/transform-model-input/) · checked October 23, 2026 · Ready for Review*

One API page, read as a reference sheet with its three recommendations pulled out: run the model as a sidecar, pin the version when the model is not retrained on a schedule, and use the distributed wrapper only for row-independent models. This is the class every Kestrel batch pipeline will use.

## The class

**[Docs]**

```python
from palantir_models.transforms import ModelInput

ModelInput(
    alias,                  # path or RID of the model
    model_version=None,     # RID or semantic version of a specific model version
    use_sidecar=False,      # run the model in a separate container
    sidecar_resources=None  # {"cpus": float, "memory_gb": float, "gpus": int}
)
```

| Parameter | Rule on the page | Since |
|---|---|---|
| `alias` | Path or RID of the model | — |
| `model_version` | "If not specified, the latest version will be used" | — |
| `use_sidecar` | "runs the model in a separate container to prevent dependency conflicts between the model adapter and transform environment" | `palantir_models` **0.1673.0** (with `@transform.using`, **0.2010.0**) |
| `sidecar_resources` | Only with `use_sidecar=True`; `cpus`, `memory_gb`, `gpus` | **0.1673.0** |

**[Docs]** In the transform, the parameter arrives as the loaded adapter. `model.transform(data_in)` converts the `TransformInput` or `LightweightInput` "into the tabular input (either a Spark or Pandas DataFrame) expected by your model adapter's API"; the result exposes each API output by name (`inference_results.df_out`). `model.predict(data_in.pandas())` is the direct alternative.

## The recommended shape

**[Docs]** "For use cases that do not require distributed inference in Spark, it is recommended to use lightweight transforms" (the default with `@transform.using`) "and run the model as a sidecar container".

```python
@transform.using(
    data_in=Input("path/to/input"),
    model_input=ModelInput("path/to/my/model", use_sidecar=True),
    out=Output("path/to/output"),
)
def my_transform(data_in: LightweightInput, model_input: ModelAdapter, out: LightweightOutput) -> None:
    out.write_pandas(model_input.transform(data_in).df_out)
```

## Why the sidecar

**[Docs]** Running a model in a sidecar container "is recommended for the majority of model inference use cases". Two reasons. First, "the exact same library versions used to produce the model will also be used to run inference with it", whereas importing the adapter library into the repository "will create a new environment solve that merges the constraints from the adapter code and the repository", which "may result in different library versions being used". Second, the adapter code for the chosen model version "will automatically be loaded in the sidecar without the user having to manually update the dependency and run checks in the repository". `predict()` calls are routed to the sidecar with no code change.

**[Docs]** Without a sidecar, the adapter library must be a dependency of the repository (the editor prompts for it), and there is a version drift to manage: with no `model_version`, each run "will automatically fetch the latest model files" but "will not automatically update the adapter library version", so a new model version whose adapter changed needs the library bumped in the *Libraries* sidebar and checks re-run. The adapter version per model version is on the model page under *Inference configuration*.

**[Explanation]** The sidecar turns two moving parts into one: model files and adapter code always come from the same version. The cost is a second container per transform run, with its own resources. For a model that is retrained on a schedule and consumed by several pipelines, that cost buys the absence of a whole class of *works in one repository, fails in another* bugs.

## Pinning a version

**[Docs]** `model_version` is "especially recommended if the model is not being retrained on a regular schedule as it helps prevent an unintended or problematic model from reaching production". Without it, the transform uses "the latest model available on the build's branch".

**[Explanation]** Two sentences from two pages make the rule: a regularly retrained model, consumed by a transform that should follow it, floats on *latest*; a model whose version should change only on a decision is pinned, or better, served through a Modeling Objective whose release is the decision ([05-03](../05-modeling-objectives-and-deployments/README.md)). A floating `ModelInput` in a production pipeline is a direct deployment by another name.

## Distributed inference

**[Docs]** `DistributedInferenceWrapper(model_input, ctx, num_partitions='auto', max_rows_per_chunk=1_000_000)` in a Spark transform "will be distributed to each of the executors", "with near-linear scalability", through Spark UDFs. `num_partitions='auto'` matches the executor count ("If you experience Out Of Memory (OOM) errors, try increasing this value"); more rows per chunk "means less overhead but more memory usage". The DataFrame in and out is a Spark DataFrame; the adapter API "should have one pandas DataFrame input and one pandas DataFrame output, with any number of input parameters"; a sidecar is "supported, but optional".

**[Docs]** The warning: "Do not use the DistributedInferenceWrapper for models that require multiple input rows to produce predictions", such as time series models, because Spark partitioning "makes no guarantees that all rows required for prediction (for example, all rows from a given time series) will be sent to the model as part of the same partition".

## For Kestrel

**[Example]** *Proposed* for the **delay model's nightly scoring transform**, which produces the dataset behind `Shipment.delayRisk` ([Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)): a lightweight transform with `use_sidecar=True`, in `Commerce [Transform]`, reading open shipments and writing `probability`, `band`, `modelVersion` and `scoredAt`. The model version is **not** floated on *latest*: the transform reads the version from the objective's *Production* release ([05-03](../05-modeling-objectives-and-deployments/README.md) settles how), because 15-03 wants the version to change only on a decision and the scored dataset must say which version scored it. No distributed wrapper: a few thousand open shipments a night do not need executors, and the rows are independent anyway. The **fraud model's** batch scoring of the ledger (the `riskAssessment` struct of [Ontology 05-03](../../Ontology/05-properties/03-structs.md)) follows the same pattern in a Kestrel Pay transform. The version that scored a row is written into the output, which is also how the open question from [01-02](../01-models-and-model-adapters/02-writing-a-model-adapter.md#for-kestrel) gets its first answer: in batch, the *transform* knows the version it pinned and can stamp it; the live path still has to be solved in module 05.

---
[Module index](README.md) · Previous: [04 — Spark ML, distributed training and GPUs](04-spark-ml-distributed-training-and-gpus.md) · Next module: [03 — Bringing models in](../03-bringing-models-in/README.md)
