# 02 — Evaluations

*Sources: [Evaluations](https://www.palantir.com/docs/foundry/model-integration/evaluations/) · [Evaluations (overview)](https://www.palantir.com/docs/foundry/integrate-models/evaluations-overview/) · [Author and run evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluations-writing/) · [Visualize evaluations](https://www.palantir.com/docs/foundry/integrate-models/evaluations-visualize/) · checked October 23, 2026 · Ready for Review*

What a finished model version does on test data. An evaluation is written from a `ModelInput` inside a transform wrapped in `@pm.transforms.evaluation`, lands in a named **evaluation set** on the model, and is compared across versions on the model page. The two rules that organise everything: one set per *methodology*, and one evaluation per *model version*.

## What an evaluation is

**[Docs]** "An evaluation is a collection of metrics, images, plots, and tables that captures how a specific model version performs against a given set of test data." Because "every evaluation is tied to a single model version, an evaluation set lets you track how a metric evolves across versions as a model is retrained".

**[Docs]** How it differs from an experiment, from the FAQ ([03](03-built-in-evaluators-the-faq-and-the-evaluations-api.md)): an experiment records parameters and stepped metric series *as the model trains*; an evaluation is one snapshot of *a finished version* against test data; and the APIs differ, experiments being written from a `ModelOutput` and evaluations from a `ModelInput`.

## Evaluation sets

**[Docs]** "An evaluation set is a logical grouping of evaluations that share the same methodology." Every evaluation belongs to one; a set "holds all of the evaluations produced by that methodology across model versions". Up to **100** sets per model. In Code Repositories the grouping "is enforced by the @pm.transforms.evaluation decorator: the set name is fixed in the transform definition", so "To evaluate a model in a different way, define a separate transform with a different set name."

**[Docs]** The page's example: a house-price model with a *nationwide error analysis* set (aggregate MAE and R²) and a *price tier analysis* set (errors by affordable, mid-range and luxury, with a residual plot per tier).

**[Explanation]** The set is the unit of comparison, not the evaluation. Two versions compared inside one set were scored the same way; the same version in two sets was scored two ways. Naming the set after the *method* (`error_analysis`, `by_region`) rather than the date or the version keeps that true.

## Writing one

**[Docs]** Requirements: an upgraded repository and `palantir_models` **>= 0.2384.0**; and "The code repository where you author evaluation logic must be in the same project as the model you are evaluating", otherwise the write fails with a permission error.

```python
@pm.transforms.evaluation("error_analysis")
@transform.using(
    test_data=Input("/Housing/clean/test_set"),
    housing_model=ModelInput("/Housing/models/price_regressor", use_sidecar=True),
)
def compute(test_data, housing_model):
    df = test_data.pandas()
    predictions = housing_model.transform(df)["predicted_price"]
    residuals = df["actual_price"] - predictions
    evaluation = housing_model.create_evaluation(name="nationwide")
    evaluation.log_metrics({"mae": residuals.abs().mean(), "rmse": (residuals ** 2).mean() ** 0.5})
    evaluation.log_plot("residual_distribution", px.histogram(residuals, nbins=50))
```

**[Docs]** Names need not be unique ("Reused names are automatically made unique"); with no name, the set name is used. Commit semantics follow the build: "when the build succeeds the evaluation is automatically committed to the evaluation set on the model input. If the build fails, the evaluation is aborted and no results are published." Calling `create_evaluation` twice in one transform gives back the same evaluation, not a second one ([03](03-built-in-evaluators-the-faq-and-the-evaluations-api.md#the-api-as-a-sheet)).

**[Explanation]** The same-project rule is a permission boundary, not a convenience: the evaluation writes *to the model*. Plan the project layout so test data, the evaluation repository and the model share a project, or expect to move one of them.

## Which version is evaluated

**[Docs]** "An evaluation is always linked to a single model version: the version that the ModelInput resolves and loads into the transform." By default that is "the latest model version on the build's branch". Two arguments change it: `model_version` "pins a specific version" and "overrides the branch argument"; `branch` "resolves the latest version on a different branch". `use_sidecar=True` is recommended "whenever the model is defined outside the current repository", to keep the adapter's dependencies in their own container ([01-01](../01-models-and-model-adapters/01-what-a-model-asset-is.md#the-sidecar-setting)).

**[Docs]** To evaluate a version on another branch: run the transform on that branch, or set `branch="testing"` on the `ModelInput`; `model_version` always wins when both are given.

## Subsets

**[Docs]** "Subsets allow you to group related metrics, images, plots, and tables together by using a prefix/name naming convention." `nationwide/mae`, `northeast/mae`, `affordable/residuals`: "The prefix is arbitrary — the system groups on everything before the first" slash. A common pattern is to partition the test set by a column and log the same metrics per partition, which produces `affordable/mae`, `mid_range/mae` and `luxury/mae` metrics, with matching residual plots, "that can be compared side by side on the model page".

**[Explanation]** Subsets are how an evaluation answers the question a single number hides: *where* is the model wrong. For a model that feeds an operational queue, the subsets should be the groups the operators act on differently.

## The four kinds of log

**[Docs]** "Evaluations support four types of logs: metrics, images, plots, and tables." Unlike experiments, there is no `step` argument: an evaluation is one snapshot ([03](03-built-in-evaluators-the-faq-and-the-evaluations-api.md#the-api-as-a-sheet)). Metrics must be numeric, `int` or `float`, and logging an existing key replaces its value; images PNG or Pillow; plots Plotly figures; tables pandas or Polars. Plots and tables take a `description`, images a `caption`.

## Reading evaluations on the model page

**[Docs]** Under the model's *Evaluations* tab: the sidebar lists the evaluation sets; the *Overview* table shows a set's evaluations "from every branch, grouped by model version", newest version first, with *Branch* and *Group by* controls. *Actions → View metrics* opens the *Metrics* tab; *Compare evaluations* adds more. Hovering a selected evaluation shows the model version and a link to it. The *Metrics* tab groups by subset by default, with "a default Overall group" for metrics without a prefix; images and plots render "side by side if they share the same name"; the *Tables* tab shows one table at a time.

**[Docs]** Two operations live on the same page. *Run* evaluates a chosen model version "against the latest evaluation logic in your source repository". *Actions → Manage schedules* sets the evaluation to run "when a new model version is published for automatic evaluation, or on a schedule for automatic drift detection".

**[Explanation]** The second schedule is the one to notice: the same evaluation on the same version, repeated against a test dataset that keeps changing, is a drift monitor. It belongs next to the live-deployment monitoring rules from [Observability 01-02](../../Observability/01-monitoring-views/02-monitoring-rules-reference.md), which watch the endpoint but not the predictions.

## Limits

**[Docs]** Repeated in [99 — Limits](../99-reference/README.md):

| Limit | Value |
|---|---|
| Metric name length | **100 characters** |
| Image, plot or table name length | **100 characters** |
| Image caption length | **200 characters** |
| Upload size per image, plot or table | **5 MB** |
| Rows per table | **100,000** |
| Evaluation sets per model | **100** |

## For Kestrel

**[Example]** *Proposed* for the **delay model**: two evaluation sets. `holdout_month` scores each version on the most recent complete month of delivered shipments, where the outcome is known (late against `promisedDeliveryDate` or not), with precision and recall at the band thresholds and a calibration plot of predicted probability against the observed late rate; `by_region_and_carrier` logs the same metrics as subsets per `region` and carrier, because Ama's regional policy ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)) means a model that is good nationally but poor in one region is poor where it matters. The evaluation repository sits in `Commerce [Ontology]` with the model, which also puts it inside Daniel's and Priya's editor groups ([Security 11-01](../../Security/11-kestrel-case/01-kestrels-access-model-built-out.md)). A schedule runs both sets on every new version, and `holdout_month` again monthly on the latest release as the drift check. For the **fraud model**, the built-in classification evaluator does the same job ([03](03-built-in-evaluators-the-faq-and-the-evaluations-api.md#for-kestrel)).

---
[Module index](README.md) · Previous: [01 — Experiments](01-experiments.md) · Next: [03 — Built-in evaluators, the FAQ and the evaluations API](03-built-in-evaluators-the-faq-and-the-evaluations-api.md)
