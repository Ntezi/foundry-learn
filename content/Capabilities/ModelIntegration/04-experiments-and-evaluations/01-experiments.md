# 01 — Experiments

*Sources: [Experiments](https://www.palantir.com/docs/foundry/model-integration/experiments/) · [Experiments (overview)](https://www.palantir.com/docs/foundry/integrate-models/experiments-overview/) · [Visualize experiments](https://www.palantir.com/docs/foundry/integrate-models/experiments-visualize/) · [API: Model experiments](https://www.palantir.com/docs/foundry/integrate-models/experiment-reference/) · checked October 23, 2026 · Ready for Review*

What happened *while* a model trained. An experiment is created from the `ModelOutput` that publishes the model, filled with hyperparameters and stepped metrics during training, published with the model version, and compared on the model page. Evaluations ([02](02-evaluations.md)) are the other half: what a finished version does on test data.

## What an experiment is

**[Docs]** "An experiment is an artifact that represents a collection of metrics produced during a model training job." The reason: model development "is inherently iterative, and it can be difficult to keep track of different attempts at producing a model"; experiments give "a lightweight Python API for logging details related to those different attempts".

**[Docs]** Created from `ModelOutput` in either authoring environment, published with the model, and viewed on the model page:

```python
# Code Repositories
from palantir_models.transforms import ModelOutput

@transform(input_data=Input("..."), model_output=ModelOutput("..."))
def compute(input_data, model_output):
    experiment = model_output.create_experiment(name="my-experiment")
    experiment.log_param("learning_rate", 1e-4)
    experiment.log_metric("train/loss", loss, step=step)
    model_output.publish(MyModelAdapter(model), experiment=experiment)
```

**[Docs]** In Code Workspaces the import is `palantir_models.code_workspaces.ModelOutput("my-alias")`, the alias being "an alias to a model in the current workspace". Names are deduplicated: "If any two experiments for a given model use the same name, they will be automatically deduplicated", so the same code can run repeatedly. "In order for experiments to be displayed in the model page, they must be published alongside a model version."

**[Docs]** Errors from the experiment itself (network failures, "overflowing the maximum size of the series") are handled by a mode chosen at creation: `FAIL` re-raises, `WARN` (the default) "Will log a warning for the error, then suppress all future errors", `SUPPRESS` logs nothing.

**[Explanation]** The default is the right one for a training job: a lost metric point should not cost you a trained model. Choose `FAIL` only when the experiment *is* the deliverable, say a hyperparameter sweep whose curves you will act on.

## The five kinds of log

**[Docs]** "Experiments support five types of logs: hyperparameters, metrics, images, plots, and tables."

| Log | Methods | Shape | Rules on the pages |
|---|---|---|---|
| Hyperparameters | `log_param(key, value)`, `log_params({...})` | Single key-value pairs, "static data associated with a model training job" | Types: Boolean, Date/Datetime, Float, Int, String; logging the same key again overwrites |
| Metrics | `log_metric(name, value, step=None)`, `log_metrics({...}, step=None)` | A **series** per name; each value at a step | Values numeric; "the step must be strictly increasing"; a step already logged raises; no step means auto-increment by 1 (independently per series for `log_metrics`) |
| Images | `log_image(series_name, image, caption=None, step=None)` | A series of images | PNG path, PNG bytes or a Pillow image; "other image formats will be rejected"; a saved Matplotlib figure is the way to log "custom charts" |
| Plots | `log_plot(series_name, fig, caption=None, step=None)` | A series of plots | Must be a Plotly `plotly.graph_objects.Figure` |
| Tables | `log_table(table_name, table, description=None)` | One table | A pandas or Polars DataFrame |

**[Docs]** The `train/loss` naming in the examples is a convention the visualisation respects, not a rule; the slash matters more in evaluations, where it defines subsets ([02](02-evaluations.md#subsets)).

## MLflow

**[Docs]** MLflow's autologging can be pointed at an experiment: create it, then `with experiment.as_mlflow_run(): mlflow.sklearn.autolog()` around the training code; Keras-style libraries use their MLflow callback inside the same block. Requires "MLflow >= 2.0.0".

**[Docs]** Limitations: "Logging can only be done at model publication (training) time"; "any asset that is not a PNG will be silently dropped"; "Tags are silently ignored"; "Nested runs are not supported".

**[Explanation]** Autologging is the cheapest way to get parameters and curves from code that already uses scikit-learn, XGBoost or Keras, and the four limitations are all about things MLflow does that the model page has no place for. If your training code is a notebook you own, the explicit `log_*` calls give you control over names, which the comparison view then rewards.

## Reading experiments on the model page

**[Docs]** Under the model's *Experiments* tab: "a hyperparameter table at the top, followed by line charts for each of the metrics", one row per experiment with its metric data overlaid. By default only the latest experiment is selected; "Up to five experiments can be selected for comparison at once". Charts expand to a dialog. A **parallel coordinate plot** can be added (*Add*, then *Parallel coordinate plot*) to show how parameters relate to one output metric, choosing its *Last*, *Min* or *Max* value. Images, plots and tables have their own tabs; images and plots are shown as one card per series with a segment per experiment, tables inline and colour-coded.

## Limits

**[Docs]** From the overview page, repeated in [99 — Limits](../99-reference/README.md):

| Limit | Value |
|---|---|
| Experiment, metric or hyperparameter name length | **100 characters** |
| Values across all metric series in an experiment | **100,000** |
| Hyperparameters per experiment | **500** |
| Rows per table | **100,000** |

"To increase these limits, contact Palantir support."

## For Kestrel

**[Example]** *Proposed* for the **delay model**: one experiment per training run, named for the feature set (`baseline-carrier-lane`, `plus-weather`), with `log_params` for the estimator type, the training window (which months of `Shipment` history) and the label rule (excluded excusals from *Mark delay as excused*, as [Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md) requires), and `log_metric` for the training and validation error per fold. The parallel coordinate plot is how Priya shows Daniel which training window produced the version behind Ama's queue thresholds. The error mode stays `WARN`; the model is the deliverable, the curves are evidence.

---
[Module index](README.md) · Next: [02 — Evaluations](02-evaluations.md)
