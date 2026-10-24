# 01 — Models uploaded from files

*Sources: [Publish a model from pre-trained files](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files/) · [Example: Upload a scikit-learn model](https://www.palantir.com/docs/foundry/integrate-models/model-asset-files-iris/) · [Import a Hugging Face model](https://www.palantir.com/docs/foundry/integrate-models/import-huggingface-models/) · checked October 23, 2026 · Ready for Review*

The first of the three ways in for a model that was not trained here. The pattern is small: put the files in a dataset with no schema, write a transform that loads them into a Python object, wrap that object in an adapter, publish. The Hugging Face page adds the network question: model files that live on the internet either come in as a dataset or through an egress policy.

## The pattern

**[Docs]** Foundry "enables the creation of a model that wraps weights produced outside of the platform": open-source weights, "models trained in a local development environment", notebook models, "model weights from legacy systems". Once wrapped, the model gets the platform's features: batch pipelines and live hosting, versioning and lineage, Modeling Objectives, binding to the Ontology.

**[Docs]** Four steps:

1. **Upload the files to an unstructured dataset** (*+ New → Dataset → Import new data*); "The dataset will be unstructured, meaning it will not have a tabular schema", and many files can share it.
2. **Create a Model Training repository** to hold the loading logic (a *Model Integration* repository with the Model Training template).
3. **Publish**: a transform that "Loads the saved model files into a proper Python object from the unstructured dataset", "Instantiates a model adapter using that loaded Python object", and "Publishes the model adapter as a model resource". `copy_model_to_driver(model_files.filesystem())` copies every file to the driver; then, for a pickle, `pickle.load`; "The same file loading logic applies to most other cases", where the framework's own load function reads its files.
4. **Consume**: live or batch in an objective, or a transform.

```python
@transform(model_files=Input("<Model Files Dataset>"), model_output=ModelOutput("<Your Model Path>"))
def compute(model_files, model_output):
    model_files_path = copy_model_to_driver(model_files.filesystem())
    with open(os.path.join(model_files_path, "model.pkl"), "rb") as f:
        model = pickle.load(f)
    model_output.publish(model_adapter=ExampleModelAdapter(model))
```

**[Explanation]** Notice what is *not* special: after step 3 the model is indistinguishable from one trained in Foundry. The adapter still uses `@auto_serialize`, so the platform re-serialises the loaded object into the model version's own artifacts; the uploaded dataset is a one-time source, not the thing deployments read. That also means the Python environment matters twice: the repository must have the library version that can *unpickle* the file (the example pins `scikit-learn 1.3.2`, the version the model was trained with), and the adapter's environment carries that version forward.

## The scikit-learn example

**[Docs]** A K-nearest-neighbours classifier trained locally on Iris with Python 3.8.0 and scikit-learn 1.3.2, saved with `pickle.dump` as `iris_model.pkl`. The transform opens the file through `model_files.filesystem().open(...)`, and the adapter is `IrisModelAdapter(model, "target")`, with two auto-serialised constructor arguments (the model and the prediction column name, both under `DillSerializer`), four typed float inputs and the same columns plus `("target", int)` as output.

**[Docs]** The consumption half is the shortest walk through module 05 in the docs: *New → Modeling Objective*; *Model Submissions → Submit a Model → Add Model → Submit model from Foundry*; open the submission and *Create new release*; back on the objective, *Deployments → Create deployment*; then the deployment's *Query* tab to "test the model by adding values and observing the outputs". [05-01](../05-modeling-objectives-and-deployments/README.md) and [05-03](../05-modeling-objectives-and-deployments/README.md) take each step apart.

## Hugging Face models

**[Docs]** The page opens with a deprecation: the *Import an open source model* feature is gone, and the language model adapters' source code is "provided for reference only"; "replacement adapters should be published, maintained and extended at your discretion directly from Foundry adapter repositories". Frameworks such as Hugging Face and spaCy are available as conda or PyPI packages, but they "typically require users to download pre-trained models or corpora from the internet", which Foundry's security model blocks: it "by default denies access to the public internet for user-written Python code".

**[Docs]** Two routes:

| Route | How | Notes on the page |
|---|---|---|
| **Files as a dataset** | Download the model from the Hub; upload every file from its *Files and versions* tab as a schema-less dataset (front-end upload or a Data Connection sync from a shared drive); in a transform, `copy_model_to_driver` then `AutoTokenizer.from_pretrained(temp_dir)` and `AutoModel.from_pretrained(temp_dir)`; wrap in an adapter | "only one binary model file is required" (`pytorch_model.bin` or `tf_model.h5`), PyTorch preferred; a Spark profile such as `DRIVER_MEMORY_MEDIUM` may be needed to fit the model in memory |
| **Allowlisted domains** | A network egress policy for the Hugging Face domains (ten are listed, from `huggingface.co` to the regional CDN hosts); the repository adds `transforms-external-systems` and the transform uses `@use_external_systems(export_control=..., egress=EgressPolicy(...))`; load by name with `cache_dir=tempfile.mkdtemp()` | The domains "can change without warning"; the `PermissionError: [Errno 13] Permission denied: '/.cache'` error means a cache directory must be passed |

**[Docs]** Either way the model becomes a Palantir model "by wrapping the language model with a model adapter", and is consumed through `ModelInput` like any other.

**[Explanation]** The dataset route is the governed one: the files are versioned and marked like any dataset, and no code touches the internet. The egress route is for teams that iterate across many Hub models and have the policy approved; it is also the only one that works for the `from_pretrained("bert-base-cased")` habit most notebooks start from. For a language model that will be *called* rather than *fine-tuned*, the externally hosted path or AIP's registered models are usually the better fit ([03](03-externally-hosted-models.md), [07-01](../07-language-models-migration-and-products/README.md)).

## For Kestrel

**[Example]** *Considered, not adopted* for the two predictive models: both are trained inside Foundry, so nothing is uploaded. *Noted for one case*: if Priya prototypes the delay model in a Jupyter workspace and wants that exact object in production, the page says notebook models are a legitimate source of files; but [02-03](../02-training-models-in-foundry/03-training-in-jupyter-and-code-repositories.md#for-kestrel) already decided that the production version is retrained by a transform, so the upload path is the exception, not the route. The **Kestrel Pay LLM** is self-hosted in a compute module ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md)); importing its weights as a Hugging Face dataset would make it a model asset in this area's sense, which nothing in the AIP area's decision calls for; [03](03-externally-hosted-models.md#for-kestrel) explains why. One rule from this note does go into Kestrel's posture ([00-02](../00-orientation/README.md)): any uploaded model file is pinned to the library version it was saved with, recorded in the model's release note.

---
[Module index](README.md) · Next: [02 — Container models](02-container-models.md)
