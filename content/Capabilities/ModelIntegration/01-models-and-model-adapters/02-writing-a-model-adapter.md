# 02 — Writing a model adapter

*Sources: [Create a model adapter](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-creation/) · [Model adapter API](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-api/) · checked October 23, 2026 · Ready for Review*

Two decisions and one contract. The decisions: *where* the adapter class lives (three places, with different package names and reuse) and *what its API declares*. The contract: the API shape that evaluation, batch deployment and function publishing each demand, which is where most adapters go wrong.

## Where the adapter lives

**[Docs]** "There are two primary methods for creating a model adapter": a standalone **Model Adapter Library** repository, published "as a Python library for use across multiple consuming repositories", or a class defined "locally to the resource the model is being published from": the **Model Training template** in Code Repositories, or a separate `.py` file in a Jupyter workspace.

**[Docs]** The page's comparison, with its guidance folded in:

| | Model Training template | Jupyter workspace | Model Adapter Library |
|---|---|---|---|
| Authoring environment | Code Repositories | Jupyter notebook | Code Repositories |
| Supported model types | Foundry-produced | Foundry-produced | Python transforms, container, external |
| Adapter package name | Derived from the repository: `transforms-model-training-<repository rid>`, version from the Git commit; cannot be renamed or tagged | `cws_adapter`, version from the latest Git tag | Configurable (`condaPackageName` in the hidden `gradle.properties`); a tagged commit publishes a version |
| Limitation the page names | "Hard to reuse across repositories" | "Hard to reuse across repositories" | "Slower iteration cycles" |
| Use it for | "most models that are created in Foundry through Python transforms"; iterating on adapter and training logic together | Notebook training; the adapter "must be defined in a separate .py file and imported into the notebook" | Container-backed models, external models, and an adapter "that can be shared across repositories" |

**[Docs]** Details worth keeping: a Model Adapter Library repository "can publish multiple model adapters", but only `model_adapter.example_adapter` is published by default; others are listed in the hidden `build.gradle`. The training-template library "must be added to downstream repositories to be able to load the model as a ModelInput". In a Jupyter workspace, *Add model → Create new model* generates a skeleton adapter named after the model alias, and "Defining the adapter class directly in a notebook cell is not supported".

**[Explanation]** The rule of thumb that falls out: train-and-adapt in one repository when the model is yours and local; move the adapter to its own library when a second repository needs it, when the model is a container or an API, or when you want to control the package name and version. The migration cost is low, because the class is the same; only its home changes.

## What `api()` declares

**[Docs]** "The model adapter's api() method specifies the expected inputs and outputs in order to execute this model adapter's inference logic. Inputs and outputs are specified separately." At runtime, `predict()` "is called with the specified inputs".

```python
import palantir_models as pm

class ExampleModelAdapter(pm.ModelAdapter):
    @classmethod
    def api(cls):
        inputs = {
            "input_dataframe": pm.Pandas(columns=[("input_feature", float)]),
            "input_parameter": pm.Parameter(float, default=1.0),
        }
        outputs = {
            "output_dataframe": pm.Pandas(columns=[("input_feature", float), ("prediction", float)]),
        }
        return inputs, outputs

    def predict(self, input_dataframe, input_parameter):
        input_dataframe["prediction"] = self.model.predict(input_dataframe) * input_parameter
        return input_dataframe
```

**[Docs]** The seven API types: `pm.Pandas` and `pm.Spark` (dataframes), `pm.Parameter` ("constant, single-valued parameters"), `pm.FileSystem` (dataset filesystem access; outputs "only usable via calling .transform_write()"), `pm.MediaReference`, `pm.Object` and `pm.ObjectSet` (Ontology objects; the last three are "not supported as an API output").

**[Docs]** Columns: a list of names, or of `(<name>, <type>)` tuples; a bare name defaults to `Any`. Column types: `str`, `int`, `float`, `bool`, `list`, `dict`, `datetime.date`, `datetime.time`, `datetime.datetime`, `typing.Any`, `MediaReference`. "Column types are generally not enforced for batch inference, unlike live inference, and are mostly meant as documentation for consumers of this model adapter." Parameter types: the same scalars and collections plus `pm.NDArray(shape, dtype)`; "Parameter types are enforced", and a mismatch "will throw a runtime error".

**[Docs]** `NDArray` needs both a shape and a dtype; `-1` in a dimension skips the check for it; nine NumPy dtypes are supported (`np.str_`, `np.bool_`, four integer and three float widths). In transforms either an `np.ndarray` or a nested list is accepted; in Functions the input "must always" be "a JSON-compatible nested list", and an array output comes back as one.

**[Docs]** Objects: `pm.Object(ExampleRestaurant)` and `pm.ObjectSet(ExampleRestaurant)`, with the type "imported from an Ontology SDK generated for a chosen Ontology". **[Explanation]** This is the option [Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md) pointed at when it said the hand mapping from properties to columns is where bugs live: declare the object type in the API and the model receives the object.

## Extra columns and column order

**[Docs]** "For tabular outputs, the list of columns specified in the API should only contain the required columns." Columns not in the API still arrive in `predict()` and may be returned: passing `input_feature` and `extra_column` returns both plus `prediction`. Two cautions follow: some models "require that only columns used during training are passed", so extract the feature columns before calling the model; and column order is "not necessarily preserved" when inputs arrive "via REST API requests as JSON objects", so reorder before inference.

**[Explanation]** The first caution is also the trick behind the evaluation requirement below: because extra columns flow through, a label column can ride along with the features without being declared.

## What the API must look like downstream

**[Docs]** Three sets of requirements, one per consumer:

| Consumer | Requirement | Why the page gives |
|---|---|---|
| **Objective batch deployment** and automatic evaluation | "only compatible with models that have a single tabular dataset input"; with several inputs, run batch inference in a Python transform instead | — |
| **Objective evaluation** | "a single tabular input and a single tabular output", both carrying the label columns; the label "should not be included in the list of columns of the input or output tables"; `predict()` "should not drop the label or ground truth columns" | Declared columns are enforced in live inference, so a declared label "would prevent usage of the model for live inference in cases where the label column is not present"; and evaluation runs "on the inference output from the predict method", so a dropped label cannot be compared |
| **Function publishing** and models in Functions | Inputs only `Parameter`, tabular, `Object` or `ObjectSet`; no `typing.Any`; tabular inputs must list their columns ("Simply using pm.Pandas() or pm.Spark() is not allowed as it would be implicitly interpreted as a TypeScript Array<any>"); collections must give element types (`list[str]`, `dict[str, str]`) | Functions are strongly typed; changing the API of a model with a published function "will require an update of the consumers of said function" |

**[Docs]** The page's regression example does exactly this: the API lists `median_income`, `housing_median_age` and `total_rooms` but not `house_price`; `predict()` keeps `house_price` in the dataframe if it is present, selects only the three features for the model, and writes `prediction`.

**[Recommendation]** Write the API for the strictest consumer you will ever have. An adapter that satisfies the function rules (typed columns, typed collections, no `Any`) and the evaluation rules (one tabular in, one out, labels undeclared and preserved) can still be used in a plain transform; the reverse is not true, and changing the API later means re-versioning every function that imports it.

## For Kestrel

**[Example]** *Proposed* adapter for the **fraud model**, written to match the API [Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md) already assumed for `liveFraudScore`:

```python
class FraudScoreAdapter(pm.ModelAdapter):
    @pm.auto_serialize(model=DillSerializer())
    def __init__(self, model):
        self.model = model

    @classmethod
    def api(cls):
        features = [("amount", float), ("cardCountry", str), ("ipCountry", str), ("merchantCategory", str)]
        # isFraud (the label) is deliberately not declared
        return {"df_in": pm.Pandas(features)}, {"df_out": pm.Pandas(features + [("score", float), ("modelVersion", str)])}

    def predict(self, df_in):
        keep = ["amount", "cardCountry", "ipCountry", "merchantCategory"]
        if "isFraud" in df_in.columns:
            keep.append("isFraud")
        df_in["score"] = self.model.predict_proba(df_in[keep[:4]])[:, 1]
        df_in["modelVersion"] = self.version
        return df_in
```

**[Explanation]** Three choices in it, each traceable to a page: one tabular input and one tabular output, so an objective can evaluate and batch-deploy it; the label `isFraud` undeclared and carried through, so the same adapter serves live scoring and evaluation; typed columns and no `Any`, so `liveFraudScore` can be published and typed in TypeScript. Where `self.version` comes from is an open question for [05-01](../05-modeling-objectives-and-deployments/README.md): the adapter does not know its own model version unless something tells it, and 15-03 requires `modelVersion` on every stored score. The adapter lives in the **Model Training template** of the Kestrel Pay training repository, since no second repository needs it yet; it moves to a Model Adapter Library the day one does. The delay model's adapter follows the same shape with `Shipment` features and a `delayRisk` probability; whether to declare `pm.Object(Shipment)` instead of columns is a question for [05-05](../05-modeling-objectives-and-deployments/README.md).

---
[Module index](README.md) · Previous: [01 — What a model asset is](01-what-a-model-asset-is.md) · Next: [03 — Serialization, save and load, upgrading an adapter](03-serialization-save-and-load-upgrading-an-adapter.md)
