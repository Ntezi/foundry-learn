# 04 — ModelAdapter API reference

*Sources: [API: ModelAdapter reference](https://www.palantir.com/docs/foundry/integrate-models/model-adapter-reference/) · checked October 23, 2026 · Ready for Review*

The longest page in module 01 (about 4,300 words), read in full and written as a reference sheet: the four methods, the two state accessors, the two context objects, the input and output classes, the enforcement rules, and the media-reference helper. The *why* is in [01](01-what-a-model-asset-is.md) and [02](02-writing-a-model-adapter.md); this note is for looking something up.

## The class and its four methods

**[Docs]** "The ModelAdapter class is an abstract base class that all model adapter implementations must extend. There are four abstract methods that all model adapters must implement", with the qualification that `load()` and `save()` "are not required for model adapters defined with default serializers".

| Method | Called when | What it must do | Signature notes |
|---|---|---|---|
| `load(cls, state_reader, container_context=None, external_model_context=None)` | A `ModelInput` is used in a transform, or a live or batch deployment starts; "before any transforms or inference logic is executed" | Weights: read what `save()` wrote and initialise the model. Containers: use the context "to initialize any class variables the adapter might need", typically the service URIs to POST to. External: "initialize and persist a connection to their externally hosted model" | A classmethod returning an adapter instance |
| `save(self, state_writer)` | "whenever a model adapter is published in a transform via model.publish()" | Write the trained state and metadata to the writer; the contents are "packaged into a zip file that is persisted in an artifacts repository referenced by the newly-created model version" | "only required if this ModelAdapter is being used to wrap a newly trained or refit model in Foundry" |
| `api(cls)` | At publish and at every call | Return the `ModelApi`: inputs and outputs | Classmethod; the types are in [02](02-writing-a-model-adapter.md#what-api-declares) |
| `predict(self, *args, **kwargs)` **or** `run_inference(self, inputs, outputs)` | Every inference | `predict` for "a multi (>=1) input to single output (tabular or parameter) model", arguments named as in `api()`; `run_inference` for several outputs or filesystem outputs, given two named tuples | "the run_inference() method is not defined by the user if predict() is used" |

**[Docs]** `predict()` arguments: "It is not required that the arguments retain the same order as they are defined; however, the names must match." The single return value is written to the single output.

**[Docs]** `run_inference()`: `inputs.<name>` is the object passed to `model.transform()` for that API input (a Pandas input arrives as "a pandas representation of the my_input_data TransformInput"); `outputs.<name>.write(df)` fills each output, and the transform reads them back as `my_model_outputs.<name>` and writes them to datasets with `write_pandas`.

## Save and load

**[Docs]** `ModelStateWriter` (from `palantir_models.models`): `open(asset_file_path, mode="wb")` for a file-like object, `put_file(local_file_path, asset_file_path=None)`, `put_directory(local_root_path, asset_root_path="/")`. `ModelStateReader`: `open(asset_file_path, mode="rb")`, `extract_to_temp_dir(root_dir=None)`, `extract(destination_path=None)`. "A ModelStateReader object is also provided to containerized models, and is backed by the user's uploaded zip file."

**[Docs]** When to write these yourself: "when, for example, there is no default serializer available for a modeling framework you are using or when you require manual control over which models are loaded into memory at any given time". Otherwise [03](03-serialization-save-and-load-upgrading-an-adapter.md).

## The two context objects

**[Docs]** Provided to `load()` "if, and only if" the model is of that kind; neither class needs importing in the adapter.

| Context | Fields | Example on the page |
|---|---|---|
| `ContainerizedApplicationContext` | `services()`: "Mapping from individual container name to list of service URIs the container provides"; `shared_empty_dir_mount_path()`: a directory "readable and writable by containers and by the model entrypoint" | `{"container1": ["localhost:8080"], "container2": ["localhost:8080", "localhost:8081"]}`; the adapter takes `services["container1"][0]` as its host and port |
| `ExternalModelContext` | `external_model()` with `base_url()` and `connection_configuration()` ("User-defined dictionary of unencrypted configuration fields" such as "the model name, inference parameters, or prediction thresholds"); `resolved_credentials()`: "Mapping of user-defined decrypted secret values" | The adapter builds an HTTP client from the URL, the configuration map and the secrets at load time |

**[Explanation]** Configuration and credentials are deliberately two maps: the first is readable in the model's settings, the second is decrypted only into the running adapter. Put the model name and thresholds in the first and nothing but secrets in the second ([03-03](../03-bringing-models-in/README.md)).

## Inputs

**[Docs]** `ModelInput` groups `Tabular`, `Parameter`, `FileSystem`, `MediaReference`, `Object` and `ObjectSet` inputs (from `palantir_models.models.api`):

| Input | Constructor | Accepts at inference | Notes |
|---|---|---|---|
| `TabularInput(name, df_type=DFType.SPARK, columns)` | columns as `ModelApiColumn(name, type, required=True)` | `TransformInput`, Pandas or Spark dataframe; converted to `df_type` | "Spark DataFrames are only supported for tabular inputs in the adapter API which specify df_type=DFType.SPARK" |
| `ParameterInput(name, type, default=None)` | scalar, `list`, `dict`, `typing.Any`, `palantir_models.NDArray` | A constant value | Default used when the argument is not passed |
| `FileSystemInput(name)` | — | "Only TransformInputs are supported" | — |
| `MediaReferenceInput(name)` | — | A media reference string, converted to a `MediaReference` object | — |
| `ObjectInput(object_type)`, `ObjectSetInput(object_type)` | an OSDK object type | An instance of the type or its primary key; an `ObjectSet` instance or an object set rid | The type comes from an Ontology SDK |

**[Docs]** Column types for tabular inputs are the list in [02](02-writing-a-model-adapter.md#what-api-declares); "The List and Dict type aliases from the typing library are also accepted" (`List[str]`, `Dict[str, float]`).

## Outputs

**[Docs]** `TabularOutput(name)` (no `df_type`: "It is able to accept both Pandas and Spark dataframes"), `ParameterOutput(name, type, default=None)` (the default is used "If not written to via run_inference()"), and `FileSystemOutput`.

## Enforcement

**[Docs]** "As a general principle, the model adapter API is not strictly enforced at inference time, although enforcement is generally stricter for live inference and particularly for Functions", which are strongly typed. The rules:

- Parameter types "are always enforced"; a wrong type throws.
- Extra tabular columns pass through; "Foundry will not drop additional columns from the input before passing it to the predict method", which is what makes evaluation work ([02](02-writing-a-model-adapter.md#what-the-api-must-look-like-downstream)).
- In batch inference, missing declared columns do not throw. `MediaReference` columns are the exception: each element is converted to a `MediaReference` object, "both for batch and live inference".
- In live inference, inputs "will be cast to their declared type (if defined)", and a missing or uncastable declared column throws.

**[Explanation]** So the same adapter is lenient in a pipeline and strict behind an endpoint. Test the live path separately: a batch job that ran clean can still fail live on a column the API declared and the caller forgot.

## `MediaReference`

**[Docs]** The object a media-reference string becomes: `media_reference`, `media_item_rid`, `get_media_item()` (file-like), `get_media_item_via_access_pattern(name, path)`, `transform_media_item(output_path, transformation)` (computed "by Mio, not by this Spark module"), `get_media_item_metadata()` (width, height and so on), `transform_and_wait(transformation, output_path="", poll_interval_seconds=3.0, poll_timeout_seconds=30.0)` (raises `TimeoutError` past the timeout), `transformation_calculation_hint(transformation, output_paths)` to pre-warm. The page's image classifier reads each referenced item inside `predict()` and appends a prediction per row.

## For Kestrel

**[Example]** Both Kestrel models are weights with default serializers, one tabular input and one tabular output, so of this page they use `api()`, `predict()` and the enforcement rules. The one rule that bites: `liveFraudScore` ([Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md)) calls the live path, where declared columns are cast and a missing one throws. *Proposed*: the wrapper's hand mapping from `Payment` properties to the four columns is covered by a test that posts a payment with every declared column, and the function's error is surfaced to Tomás as *score unavailable*, not as a blank. Neither model needs `run_inference()`, a context object or media references; [09-01](../09-kestrel-case/README.md) says so explicitly so nobody adds them.

---
[Module index](README.md) · Previous: [03 — Serialization, save and load, upgrading an adapter](03-serialization-save-and-load-upgrading-an-adapter.md) · Next module: [02 — Training models in Foundry](../02-training-models-in-foundry/README.md)
