# 02 — Model Studio trainers

*Sources: [Time series forecasting trainer](https://www.palantir.com/docs/foundry/model-studio/trainers-timeseries-forecasting/) · [Regression trainer](https://www.palantir.com/docs/foundry/model-studio/trainers-regression/) · [Classification trainer](https://www.palantir.com/docs/foundry/model-studio/trainers-classification/) · checked October 23, 2026 · Ready for Review*

Three trainers, one engine. All three are built on AutoGluon, train several model types, and may end with "a weighted ensemble of models" if that beats any single one. The regression and classification pages are near-identical; the forecasting page is the different one, because it needs a second dataset and has its own parameters. Read as a decision sheet: which trainer, which preset, which parameters to touch.

## What all three share

**[Docs]** Each "trains a number of models in parallel or sequentially to help it determine the best performing model", "may also take advantage of ensembling", and shows "The structure of the model ensemble" on the output model's experiment page under *Plots*. Each outputs "a Foundry model that contains the best model as determined by the validation steps", with the experiment holding "parameters, metrics, and plots".

**[Docs]** Shared parameters: an **evaluation metric** used to score models during training; a **training preset**, "an abstraction above more complex arguments around bagging and stacking"; a **time limit**, after which "the training portion of the job will end, but the job will not finish until model validation is complete and the model has been published"; **excluded model types**; and an advanced **hyperparameters** field with the same caveat on every page: "When this field is defined, any model not supplied in the hyperparameter field will be ignored", it "can produce poor results", and "In the majority of cases, the default hyperparameters provide strong enough results". Arguments in it "will be sent directly to the underlying model implementation".

**[Explanation]** The hyperparameter field is also how the *No models trained* error of [01](01-model-studio.md#troubleshooting-and-the-evaluation-trap) happens: name two model types in it and every other type is excluded. Treat the field as *replace the model list*, not *tune the model list*.

## Time series forecasting

**[Docs]** Built on AutoGluon's `TimeSeriesPredictor`; predicts "future data across a number of pre-defined lookahead steps". Twelve model types: AutoETS, DeepAR, DirectTabular, ETS, NPTS, Naive, PatchTST, RecursiveTabular, SeasonalNaive, TemporalFusionTransformer, Theta, TiDE.

**[Docs]** Two datasets. The **training dataset** needs "at minimum a timestamp column and a target value column", plus optional mappings: an **item ID** when "multiple time series" share a dataset (a SKU per product); **known covariates**, "columns that are known throughout the entire forecast horizon" (holidays, event dates); the remaining columns are **past covariates**, "values that fluctuate and are not known in advance". The **static dataset** holds time-independent metadata (store location, pricing tier), one row per item ID, joined on it.

**[Docs]** Parameters beyond the shared ones: **forecast horizon length**; **quantile levels** for "a probabilistic distribution forecast" (a 0.1 quantile means the actual value is predicted to fall below it 10% of the time); **resample options** (a frequency alias such as `B` or `W`, or `auto`, with numeric and categorical aggregation methods); a **missing value fill strategy**; **enable ensemble**. For forecasting, "The higher an evaluation metric is, the better the model's performance."

**[Docs]** Presets: `best_quality` (statistical, deep-learning and classical models, "a longer validation step and multiple backtests"), `high_quality`, `medium_quality` (statistical and classical plus TemporalFusionTransformer, "a decently performing model with a faster training time"), `fast_training` ("only recommended for prototyping").

## Regression and classification

**[Docs]** Both built on AutoGluon's `TabularPredictor`; both may use **stacking** (the predictions of one layer of models are used to train a further layer, "and this process may be repeated") and **bagging** (each architecture "trained on multiple random samples of the data" and combined), controlled by the preset. Nine model types: GBM (LightGBM), CAT (CatBoost), XGB, RF, XT, KNN, LR, NN_TORCH, FASTAI. The regression page notes that strictly classification models "can still be applied in regression when stacking is used".

**[Docs]** Presets, identical on both pages: `best_quality` and `high_quality` enable stacking and bagging (the second "may be slightly less accurate" but faster); `good_quality` enables both "with decent predictive accuracy"; `medium_quality` disables them, "the fastest training time, but moderate predictive accuracy", "for prototyping".

**[Docs]** Shared extras: a **training time limit** ("respected on a best effort basis" with stacking presets) and an **inference time limit** ("Any model that surpasses this time limit will be skipped"; not recommended "unless strict inference time limits are required"); a **prediction column name** override ("By default, the target column name will be used"); and the advanced **stacking configuration** (*Fit weighted ensemble*, *Fit last ensemble with all models*, both recommended; *Fit full weighted ensemble*, which depends on the second).

**[Docs]** Metric direction differs: regression error metrics (MAE, MSE, RMSE) are better lower, while R² and Pearson correlation are better higher; for classification, "All classification evaluation metrics follow this pattern" of higher is better.

### Classification

**[Docs]** One parameter of its own: **Predict probabilities**. "If true, class probabilities will be returned instead of a single class prediction", in extra columns named `{prediction_column_name}_proba_{class_label}`.

**[Explanation]** Two parameters decide whether a Model Studio model fits the rest of the lifecycle. *Prediction column name* must differ from the target or objective evaluation breaks ([01](01-model-studio.md#troubleshooting-and-the-evaluation-trap)). *Predict probabilities* is what turns a yes/no classifier into a score a queue can sort on, and it is what the built-in classification evaluator's `class_probabilities_columns` option expects ([04-03](../04-experiments-and-evaluations/03-built-in-evaluators-the-faq-and-the-evaluations-api.md#classification)).

## Which trainer

| Question | Trainer | Watch for |
|---|---|---|
| A number that changes over time, to be projected forward? | Time series forecasting | Two datasets; known vs past covariates; the resampling frequency |
| A number per row, from features known at prediction time? | Regression | Error metrics are better lower; set the prediction column name |
| A category per row, or a probability of one? | Classification | *Predict probabilities*; set the prediction column name |
| Any of them for a first look? | Same trainer, `medium_quality` or `fast_training` | Presets, not hyperparameters, are the knob to turn |

## For Kestrel

**[Example]** *Proposed*, continuing [01](01-model-studio.md#for-kestrel): the delay baseline uses the **classification** trainer on `isLate`, *Predict probabilities* on, prediction column `predictedLate`, with the target written as 0/1 so the output has `predictedLate_proba_1` (the objective's evaluator needs integer labels, [06-03](../06-evaluating-in-the-objective/03-model-evaluators.md#binary-classification)), which [09-01](../09-kestrel-case/README.md) maps onto `delayRisk.probability`. Preset `medium_quality` for the first run, `good_quality` once the features settle; no hyperparameters. The evaluation metric is the one that matches how the queue uses the score: a ranking metric rather than plain accuracy, because Ama acts on the top of the sorted list, not on a threshold alone. The forecasting trainer is *considered, not adopted*: Kestrel's questions are per shipment, not a demand curve, and the Delivery Desk has no forecasting use case recorded in [17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md). The **fraud model** does not go through Model Studio at all: its adapter was already specified in code ([01-02](../01-models-and-model-adapters/02-writing-a-model-adapter.md#for-kestrel)) and the Kestrel Pay engineers own the training repository.

---
[Module index](README.md) · Previous: [01 — Model Studio](01-model-studio.md) · Next: [03 — Training in Jupyter and Code Repositories](03-training-in-jupyter-and-code-repositories.md)
