# 03 — Model evaluators

*Sources: [Binary classification evaluator](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-binary-classification/) · [Regression evaluator](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-regression/) · [Custom evaluation library](https://www.palantir.com/docs/foundry/evaluate-models/evaluator-custom/) · checked October 23, 2026 · Ready for Review*

The evaluation libraries an objective's configuration can select: two defaults and the template for writing your own. Not the same thing as the *built-in evaluators* of [04-03](../04-experiments-and-evaluations/03-built-in-evaluators-the-faq-and-the-evaluations-api.md), which run inside a transform against one model version; these run inside the objective against every submission, over Spark, and their results are metrics datasets.

## Binary classification

**[Docs]** Produced "for every subset bucket configured in the evaluation dashboard", with the caveat that some metrics cannot be computed when "the generated subset does not contain both classes".

| Metric | The page's definition, condensed |
|---|---|
| Row count | Records in the evaluation dataset |
| Prior | "The proportion of positive results in the evaluation dataset"; "not a direct measure of model performance" |
| Accuracy | Proportion correctly categorised, 0 to 1 |
| Precision | True positives over true plus false positives |
| Recall | True positives over true positives plus false negatives; "Also known as sensitivity" |
| F1 score | "The harmonic mean of the precision and recall" |
| Matthews correlation coefficient | Combines both classes "equally", so it "will only be high when the classifier is performing well on both classes"; ranges -1 to 1 |
| ROC AUC (needs probability) | Area under the ROC curve; "a score of 0.5 is the expected score for a model that is randomly guessing" |

**[Docs]** Plots: confusion matrix; score distribution; and, with a probability, the probability distribution (a bucket width of 0.05, "which results in 20 total buckets"), the ROC curve, the TPR and FPR curves against prediction probability, and the lift curve ("lift is a measure of model performance on the positive class versus random chance").

**[Docs]** Fields: `inference_field` and `actual_field`, both required, "The expected value type for these columns is integer", with "a 1 is the positive class and a 0 is the negative class"; `probability_field`, optional, unlocks the five probability metrics and plots; `max_samples_for_roc`, default **200**.

**[Explanation]** The integer rule is a data-shaping requirement on the inference dataset: a boolean label or a `true`/`false` prediction column must become 0/1 before the evaluator sees it, which for a `palantir_models` adapter means in `predict()` and for a Model Studio model means a transform between the output and the evaluation dataset, or a numeric target to begin with. The prior is the metric to read first on every subset: a subset with a prior of 0.01 makes accuracy meaningless and recall everything.

## Regression

**[Docs]** Metrics per subset: row count; mean absolute error ("approaches 0 as a model performs better"); root mean squared error ("gives more weight to predictions that are further away"); R² ("the proportion of variance in the label data that is explained by the model"; "can be negative"); explained variance, which "differs from the R2 score when the average error is non-zero; this difference indicates model bias". Plots: score distribution; residuals, "where a residual is the label_value - prediction". Fields: `inference_field` and `actual_field` required; `histogram_bins`, default **10**.

**[Observed]** The regression page also says "The expected value type for these columns is integer", word for word as the classification page; for a regression target that reads like a copied sentence rather than a rule, since the metrics are defined on continuous values. Treated as a page oddity, not a limit, and listed in [99 — Limits](../99-reference/README.md) with that note.

## A custom evaluation library

**[Docs]** "An evaluation library is a published Python package in Foundry that produces a model evaluator", for "model performance, model fairness, model robustness, and other metrics in a reusable way across different modeling objectives". Once published it is available "to any users with view access to the published library". Steps: a repository from the **Model Evaluator Template Library** (*+ New → Repository type → Model Integration → Language template*); implement the `Evaluator` interface in `src/evaluator/custom_evaluator.py`; add parameters; "Commit and publish a new tag". A repository "can publish multiple evaluators", the extra modules listed in `build.gradle`.

**[Docs]** The interface is one method, `apply_spark(self, df: DataFrame) -> List[ComputedMetricValue]`. The docstring is the UI: `:display-name:` and `:description:` required; `:param <name>:` and `:metric <name>:` optional, and they become the configuration fields and metric descriptions shown in the objective. Parameter types: `int`, `float`, `bool`, `str`, and `Field[int]`, `Field[float]`, `Field[str]` for columns of the evaluation dataset (the objective offers matching columns); `Optional[...]` makes one optional. A `ComputedMetricValue(metric_name, metric_value)` carries a number, a Matplotlib figure, a Seaborn-style object with `get_figure`, `save` or `savefig`, or a `BarChart` or `LineChart`.

```python
class CustomEvaluator(Evaluator):
    """
        :display-name: Configurable Row Count Evaluator
        :description: Row count of the input DataFrame, filtered to the specified value.
        :param column: Filtered column
        :param value: Filtered value
        :metric Row Count: The unfiltered row count
        :metric Filtered Row Count: The filtered row count
    """
    def __init__(self, column: Field[int], value: int): ...
    def apply_spark(self, df):
        return [ComputedMetricValue("Row Count", df.count()),
                ComputedMetricValue("Filtered Row Count", df.filter(F.col(self.column.name) == self.value).count())]
```

**[Explanation]** The custom library is where an organisation's *definition of good* becomes code that every objective can select. It runs over Spark on the inference dataset, so it sees predictions and labels together and can compute anything a DataFrame can express; what it cannot do is see the model, so metrics that need the model object (feature importance, say) belong in an experiment instead.

## Which evaluator

| The model predicts | Library | Fields to map | Read first |
|---|---|---|---|
| A yes/no with or without a probability | Binary classification | `inference_field`, `actual_field` as 0/1 integers; `probability_field` for ROC AUC, lift and the curves | Prior, then recall and precision per subset |
| A number | Regression | `inference_field`, `actual_field` | MAE and the residual plot; explained variance against R² for bias |
| Several classes, a ranking, a business metric, a fairness ratio | Custom | Whatever the docstring declares | What the docstring says it means |

## For Kestrel

**[Example]** *Proposed*: the **binary classification** library on both objectives, as configured in [01](01-automatic-and-in-code-evaluation.md#for-kestrel), with the integer rule honoured by the adapters (`predictedLate` and `isLate`, `predictedFraud` and `isFraud` written as 0/1) and by a one-line cast in Priya's Model Studio pipeline for the baseline. `max_samples_for_roc` left at 200. One **custom evaluator**, *considered, proposed for later*: a *queue-order* metric for `Delivery delay`, the share of the day's actually-late shipments that fell in the top of the ranked list Ama's team would have worked, which is the number the operating thresholds are really tuned to and which no default evaluator computes; it would be a `Field[float]` for the probability, a `Field[int]` for the label and an `int` for the list length, published from a Model Evaluator Template Library repository in `Commerce [Ontology]`. It is not adopted until the baseline has run for a month and the default metrics have been read against the queue's behaviour; the first release does not wait for it.

---
[Module index](README.md) · Previous: [02 — The evaluation dashboard, metric views and MetricSets](02-the-evaluation-dashboard-metric-views-and-metricsets.md) · Next module: [07 — Language models, migration and products](../07-language-models-migration-and-products/README.md)
