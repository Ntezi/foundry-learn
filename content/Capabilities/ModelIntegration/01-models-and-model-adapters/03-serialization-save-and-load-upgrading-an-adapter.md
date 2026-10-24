# 03 — Serialization, save and load, upgrading an adapter

*Sources: [Serialization for models](https://www.palantir.com/docs/foundry/integrate-models/serialization/) · [API: palantir_models.serializers reference](https://www.palantir.com/docs/foundry/integrate-models/auto-serialization-reference/) · [Upgrade model adapter without retraining](https://www.palantir.com/docs/foundry/integrate-models/upgrade-model-adapter/) · checked October 23, 2026 · Ready for Review*

How the trained thing gets to disk and back. Three pages: the default serializers and how to pick one per constructor argument; the reference that shows what each serializer actually does, and how to write one; and the small page that lets you fix an adapter without retraining the model it wraps.

## Why serialization is the adapter's job

**[Docs]** "To reuse models across workflows, Palantir needs to be able to deserialize stored weights." Because the process is specific to model types, "the author of the model adapter is expected to detail how this should happen", with two exceptions: container models, "where serialization is typically a part of the container lifecycle", and external models, "which have externally hosted weights".

**[Docs]** Nine default serializers: Dill, Cloudpickle, JSON, YAML, Hugging Face, PyTorch, TensorFlow, XGBoost, Spark MLlib.

## `@auto_serialize`

**[Docs]** Annotate the adapter's `__init__` with `@auto_serialize`. "By default, Palantir will automatically save and load each of your __init__ method's inputs using the Dill serializer." With arguments, one serializer per constructor argument, and then "every argument in your __init__ method must have an equivalent argument in your @auto_serialize definition". Below `palantir_models` **0.1536.0** every serializer had to be named.

```python
class AutoSerializationAdapter(pm.ModelAdapter):
    @pm.auto_serialize(model=DillSerializer(), config=JsonSerializer())
    def __init__(self, model, config={}):
        self.model = model
        self.prediction_column = config.get("prediction_column", "prediction")
```

**[Docs]** Dependencies: `palantir_models.serializers` "does not contain dependencies on the serialization frameworks below, except for dill". Using another serializer means adding its package to the environment yourself.

**[Explanation]** The pattern the second example shows is the useful one: the model object under Dill and a small configuration dictionary under JSON. Configuration that changes between versions (a prediction column name, a threshold) stays readable in the saved artifacts instead of being pickled into the adapter.

## The serializers, as a decision sheet

**[Docs]** From both pages:

| Serializer | What it wraps | How it saves | Notes on the pages |
|---|---|---|---|
| `DillSerializer` | Any Python object, "including scikit-learn and statsmodels" | `dill.dump` / `dill.load` to `dill.pkl`, with `recurse=True` | The default |
| `CloudPickleSerializer` | Any Python object, likewise | `cloudpickle.dump` / `load` to `cloudpickle.pkl` | — |
| `JsonSerializer` | A Python dictionary | `config.json` | — |
| `YamlSerializer` | A Python dictionary | `config.yaml` with `yaml.safe_dump` / `safe_load` | — |
| `HfPipelineSerializer(task, **kwargs)` | A `transformers.pipeline` | `save_pretrained` into a `pipeline` directory; re-created at load with the task | Needs `transformers`; the task string is required |
| `HfAutoModelSerializer(model_class=None, **kwargs)`, `HfAutoTokenizerSerializer(...)` | A `transformers` AutoModel and AutoTokenizer | `save_pretrained` / `from_pretrained` into `model` and `tokenizer` directories | Pass a specific class when "it is recommended to use the specific model or tokenizer classes rather than the generic ones" |
| `PytorchStateSerializer` | A `torch.nn.Module` state dictionary | `torch.save` / `torch.load` to `model_state_dict.pt` | The reference serialises the state dict, not the module |
| `TensorflowKerasSerializer(format, custom_objects)` | A `tensorflow.keras.Model` | `obj.save` / `load_model`; formats `DIR` (legacy), `H5`, `KERAS` | "Foundry will call obj.compile()" after loading |
| `XGBoostSerializer` | An `xgboost.sklearn.XGBModel` (classifier, regressor, ranker) | `save_model` / `load_model` to `xgboost_model.json` | — |
| `SparkMLAutoSerializer` | A `pyspark.ml.pipeline.Pipeline` | `PipelineModel.write().overwrite().save()` / `read().load()` | "any Spark MLlib model can be wrapped in a Pipeline object", so this is the general Spark serializer |

**[Observed]** The serialization page describes `JsonSerializer` as calling `yaml.safe_dump` and `json.safe_load`; the reference implementation uses `json.dump` and `json.load`. The reference is the code; the page's sentence looks like a copy of the YAML line.

## Writing your own

**[Docs]** Extend `ModelSerializer` and implement `__init__`, `serialize` (given a `ModelStateWriter`) and `deserialize` (given a `ModelStateReader`, returning the model); publish it "as a shared Python library". The page's reason: an organisation with a model format "that is reused and often integrated into Foundry" can "standardize and reduce duplicated code across different models and teams".

**[Docs]** When none of this fits, implement `load()` and `save()` on the adapter directly ([04](04-modeladapter-api-reference.md#save-and-load)).

## Upgrading an adapter without retraining

**[Docs]** "This feature only applies to models trained in Code Repositories." The use: fix a bug in the adapter, change `load`, `api`, `predict` or `run_inference`, or update the Python environment "in the event that a Python dependency was found to have a vulnerability or bug", all without touching the artifacts.

**[Docs]** The constraints: dependency changes "must be compatible with existing model artifacts"; so must the new method implementations; and "The updated model adapter must be located in the same Python module with the same class name as the original model adapter." The page's own advice is "to exercise caution while updating a model adapter and to test changes first on a new branch".

**[Docs]** The procedure: publish the adapter change (every commit in a Model Training template; a new tag in a Model Adapter Library); on the model page, *Inference Configuration → Upgrade model adapter*; *Create model version* makes "a new model version using the updated model adapter with the previously published model artifacts". And the catch: "If the previous model version has been submitted to a modeling objective, the updated model version will not automatically be submitted and must be submitted again."

**[Explanation]** This is the page to remember for operations. A security fix in a package the adapter depends on is a *new model version* with the *same weights*, and it goes through the objective's review again ([05-01](../05-modeling-objectives-and-deployments/README.md)). That is the right behaviour, since the inference environment changed, but it means a dependency patch has a review step and a release, not a hot fix.

## For Kestrel

**[Example]** *Proposed*: both models use `@auto_serialize` with `DillSerializer` for the scikit-learn estimator and `JsonSerializer` for a small configuration (the prediction column, the band thresholds for `delayRisk`, and, pending [05-01](../05-modeling-objectives-and-deployments/README.md), the model version string the adapter stamps on every output). Both production versions are to be trained in Code Repositories ([02](../02-training-models-in-foundry/README.md) weighs Model Studio for a baseline), so the upgrade-without-retraining path is open to them; Kestrel's rule for it, *proposed*: an adapter-only upgrade is treated like any other version (submitted, checked, reviewed), and the release note says *adapter only, weights unchanged*, so the reviewer knows no evaluation metric should have moved.

---
[Module index](README.md) · Previous: [02 — Writing a model adapter](02-writing-a-model-adapter.md) · Next: [04 — ModelAdapter API reference](04-modeladapter-api-reference.md)
