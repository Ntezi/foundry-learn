# 03 — Built-in evaluators, the FAQ and the evaluations API

*Sources: [Built-in evaluators](https://www.palantir.com/docs/foundry/integrate-models/evaluations-builtin/) · [Evaluations FAQ](https://www.palantir.com/docs/foundry/integrate-models/evaluations-faq/) · [API: Model evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluation-reference/) · checked October 23, 2026 · Ready for Review*

Three pages read as reference sheets. The built-in evaluators compute the standard metrics so you do not; the FAQ is eleven answers, most of which [02](02-evaluations.md) already covers and which are listed here so a question can be matched to its line; the API page is the method signatures. Not to be confused with the *model evaluators* of module 06, which run inside a Modeling Objective ([06-03](../06-evaluating-in-the-objective/README.md)).

## Built-in evaluators

**[Docs]** "palantir_models includes prebuilt evaluators for standard regression and classification models." One "runs inference on your model, compares the predictions against a ground-truth column, and logs a standard set of metrics to the evaluation for you". They "require scikit-learn to be installed in your environment"; writing your own metrics does not ([FAQ](#the-faq-matched-to-its-notes)).

**[Docs]** The driver is `palantir_models.evaluations.evaluate(model, inputs, targets, prediction_column, evaluator_config, evaluation=None, evaluation_df=None)`:

```python
@pm.transforms.evaluation("error_analysis")
@transform.using(test_data=Input("..."), housing_model=ModelInput("...", use_sidecar=True))
def compute(test_data, housing_model):
    evaluate(
        model=housing_model,
        inputs=test_data.pandas(),
        targets="actual_price",
        prediction_column="predicted_price",
        evaluator_config=RegressionEvaluatorConfig(),
    )
```

**[Docs]** Inside a decorated transform, `evaluate` "writes to the evaluation automatically; you do not need to call create_evaluation yourself"; pass `evaluation=` to log into one you created. It returns an `EvaluationResult` whose `metrics` attribute holds what was computed.

**[Docs]** The three arguments that need care:

| Argument | Rule |
|---|---|
| `inputs` | Forwarded to the model: a pandas or pyspark DataFrame "as a single argument; a tuple is unpacked as positional arguments; a dict is unpacked as keyword arguments" (except when the model declares one map or struct input). Spark frames "are materialized to pandas for metric computation, so the data must fit in memory on the driver" |
| `targets` | The ground-truth column name; "must resolve to exactly one column", looked up in `evaluation_df` if given, else in `inputs` |
| `prediction_column` | The output column holding predictions; "defaults to the value of targets", so set it when the names differ |

**[Docs]** What the adapter must satisfy: `evaluate` calls `predict` if overridden, else `transform`, and `predict` "should accept one argument per declared API input, matched by name"; inference must return a DataFrame (or a container of DataFrames) and "exactly one of those DataFrames must contain the prediction_column"; for classification `roc_auc`, the probability columns must be in the output too.

### Regression

**[Docs]** `RegressionEvaluatorConfig` logs `example_count`, `mean_absolute_error`, `mean_squared_error`, `root_mean_squared_error`, `r2`, `max_error`, `mean_absolute_percentage_error`.

### Classification

**[Docs]** `ClassificationEvaluatorConfig` serves binary and multiclass; which it is "is determined automatically from the number of unique classes found across the predictions and labels". All log `example_count`, `accuracy`, `precision`, `recall`, `f1`. Binary classifiers add `true_positives`, `true_negatives`, `false_positives`, `false_negatives`. Multiclass uses the `average` option ("weighted" by default; "micro", "macro" or "samples"), "Ignored for binary classifiers". With class probabilities, `roc_auc` is logged "using a one-vs-rest scheme".

**[Docs]** Probabilities come through exactly one of `class_probabilities_columns` (one column per class, by class index) or `class_probability_column` (one column of per-class arrays); "providing both raises an error"; without either, "roc_auc is omitted".

### Subsets with evaluators

**[Docs]** Every configuration accepts `subset`; when set, "all metrics logged by that evaluator are prefixed with subset/". Loop over `groupby("price_tier")` with `RegressionEvaluatorConfig(subset=tier)` and you get `affordable/mean_absolute_error` and `luxury/r2`.

## The FAQ, matched to its notes

**[Docs]** The eleven questions, each with the page's answer in a line and where the fuller treatment is:

| Question | Answer | Note |
|---|---|---|
| Evaluation vs experiment | Training run with stepped series and MLflow, from `ModelOutput`; versus one snapshot of a finished version, from `ModelInput` | [01](01-experiments.md), [02](02-evaluations.md#what-an-evaluation-is) |
| Where authored | Code Repositories, with the decorator and a `ModelInput` | [02](02-evaluations.md#writing-one) |
| Permission error on write | Model and repository must share a project | [02](02-evaluations.md#writing-one) |
| Which version | The one the `ModelInput` resolves: latest on the build's branch, or `model_version`, or `branch` | [02](02-evaluations.md#which-version-is-evaluated) |
| Evaluating a brand-new version | A schedule on publish, or *Run* on the evaluations view | [02](02-evaluations.md#reading-evaluations-on-the-model-page) |
| Unique names | Not needed; reused names are made unique; no name means the set name | [02](02-evaluations.md#writing-one) |
| Build fails | "Nothing is published" | [02](02-evaluations.md#writing-one) |
| Same model, several ways | One evaluation set per methodology, one transform each; up to 100 sets | [02](02-evaluations.md#evaluation-sets) |
| Comparing across versions | A set holds every version's evaluation by the same method | [02](02-evaluations.md#evaluation-sets) |
| What can be logged | Metrics, PNG or Pillow images, Plotly plots, pandas or Polars tables; subsets by prefix | [02](02-evaluations.md#the-four-kinds-of-log) |
| Is scikit-learn needed | "Only if you use the built-in evaluators" | above |

## The API, as a sheet

**[Docs]** From the reference page:

| Call | Signature | Notes |
|---|---|---|
| `@pm.transforms.evaluation(evaluation_set_name)` | A non-empty string | Wraps the transform; the set "is created automatically the first time the transform runs" |
| `ModelInput.create_evaluation(name=None) -> Evaluation` | "Must be called from within a transform decorated with @pm.transforms.evaluation" | Repeated calls return the same instance; committed on a successful build, aborted on failure |
| `Evaluation.log_metric(key, value)` | `value: int \| float` | Overwrites an existing key |
| `Evaluation.log_metrics(metrics)` | `Dict[str, int \| float]` | Batched |
| `Evaluation.log_image(name, image, caption=None)` | PNG path, bytes or Pillow image | — |
| `Evaluation.log_plot(name, plot_data, description=None)` | A Plotly `Figure` | — |
| `Evaluation.log_table(name, table, description=None)` | pandas or Polars DataFrame | — |
| `Evaluation.evaluation_rid` | property | The evaluation's resource identifier |

**[Docs]** The contrast the page itself draws: unlike an experiment, "an evaluation records a single snapshot of results rather than a stepped time series, so its logging methods do not accept a step argument".

## For Kestrel

**[Example]** *Proposed* for the **fraud model**: the built-in classification evaluator in an evaluation set `monthly_holdout`, with `targets="isFraud"`, `prediction_column="predictedFraud"` and `class_probability_column="score"` so `roc_auc` is logged alongside precision, recall and the confusion counts; the same evaluator again with `subset=` per `cardCountry` bucket, because a fraud model that is weak on one corridor is the kind of weakness Tomás ([Security 11-01](../../Security/11-kestrel-case/01-kestrels-access-model-built-out.md)) would want to see before a release. This means the fraud adapter in [01-02](../01-models-and-model-adapters/02-writing-a-model-adapter.md#for-kestrel) needs a hard label column as well as `score`: *proposed* `predictedFraud` as `score >= threshold`, with the threshold in the adapter's JSON configuration ([01-03](../01-models-and-model-adapters/03-serialization-save-and-load-upgrading-an-adapter.md#for-kestrel)). The evaluation repository must live in the same project as the model, so the fraud model and its evaluation repository both sit in `Payments [Ontology]`, under the Kestrel Pay engineers' editor group. For the **delay model**, whose output is a probability of lateness ([Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)), the classification evaluator with `class_probability_column="probability"` supplies precision, recall and `roc_auc` for [02](02-evaluations.md#for-kestrel), and the calibration plot stays hand-written, since no built-in evaluator draws it.

---
[Module index](README.md) · Previous: [02 — Evaluations](02-evaluations.md) · Next module: [05 — Modeling Objectives and deployments](../05-modeling-objectives-and-deployments/README.md)
