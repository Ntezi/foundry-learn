# 02 — Container models

*Sources: [Container models](https://www.palantir.com/docs/foundry/integrate-models/container-overview/) · [Upload images with a container model](https://www.palantir.com/docs/foundry/integrate-models/upload-image-container-model/) · [Example: Implement a container model adapter](https://www.palantir.com/docs/foundry/integrate-models/container-model-adapter-example/) · [FAQ](https://www.palantir.com/docs/foundry/integrate-models/container-models-faq/) · checked October 23, 2026 · Ready for Review*

A model whose artifacts are a container image. The adapter does not load weights; it finds the running container's address and sends it requests. Four pages: when to do this, the push-and-configure walk-through, the smallest possible adapter, and a FAQ that holds most of the hard limits. The last section says when a container *model* and when a *compute module*, which the orientation note promised.

## When a container model

**[Docs]** Foundry "allows users to package container images along with a model adapter to create a container-backed Model", consumable "as with non-container-backed models". Useful when models "are especially large, pre-trained, written in a language Foundry does not natively support (such as R), or already containerized for other usage". Governance lives in Control Panel: enabling container usage and "managing vulnerabilities"; "If the container setting is not enabled, all Foundry jobs and deployments relying on imported containers will fail." The FAQ adds that container workflows need the Rubix engine as their backing infrastructure, so not every Foundry instance supports them.

## Pushing an image and configuring a version

**[Docs]** Four steps:

1. **Create the model** from a modeling objective (*+Add model → Import containerized model*). The resource "will control the model permissions; users with Viewer permission on this resource will be able to pull the image back out of Foundry".
2. **Push the image.** *Generate token*, then the given Docker commands with the image name and tag; "the tag is not allowed to be 'latest'", and images must meet Foundry's image requirements. Availability "may take several minutes".
3. **Configure the model version**: pick one or more images; choose the semantic version change, description and configuration file; select the adapter from a Model Adapter Library repository ("the Select a model adapter dropdown will populate with the latest versions of any valid adapters defined in the repository"); set per-image runtime details: memory, arguments, environment variables, exec command. "Specifying the port on which the image is listening is critical if your adapter uses the requests library." Telemetry can be enabled here if the container supports it.
4. **Use it**: submit to an objective, or in a transform, where a container model "requires" the second `ModelInput` argument, a version RID, plus a dependency on the adapter library.

**[Docs]** Testing the adapter before publishing: the `@sidecar(image=..., tag=..., volumes=[Volume("shared")])` transforms decorator runs the image next to a transform, so the adapter class can be instantiated by hand with the shared volume path (`/opt/palantir/sidecars/shared-volumes/shared`) and `localhost:PORT`, and `transform_write(source_df, output)` exercised.

**[Explanation]** Two of those details are the difference between a working and a hanging deployment: the port, which the adapter needs to know and the configuration must expose, and the version RID, which a container model needs in `ModelInput` where a weights model could float on *latest*.

## The smallest adapter

**[Docs]** The example wraps "a simple flask server listening at the /mirror endpoint" that echoes a `text` field as `returnedText`:

```python
class ExampleIdentityFunctionModelAdapter(pm.ContainerModelAdapter):
    def __init__(self, shared_volume_path, model_host_and_port): ...

    @classmethod
    def init_container(cls, container_context):
        shared_volume_path = container_context.shared_empty_dir_mount_path
        model_host_and_port = list(container_context.services.values())[0][0]
        return cls(shared_volume_path, model_host_and_port)

    @classmethod
    def api(cls):
        return {"input_df": pm.Pandas(columns=[("text", str)])}, {"output_df": pm.Pandas(columns=[("text", str), ("returnedText", str)])}

    def predict(self, input_df):
        # one POST to http://<host:port>/mirror per row, results into a new DataFrame
```

**[Docs]** `init_container()` receives the `ContainerizedApplicationContext` of [01-04](../01-models-and-model-adapters/04-modeladapter-api-reference.md#the-two-context-objects): the services map (container name to service URIs) and the shared directory. The FAQ: "there is no standard base image provided nor required", and no required API either, since "how Foundry interacts with the image will be defined by the model adapter implementation"; the common pattern is an image listening on a port and an adapter sending POST requests.

**[Explanation]** The example posts one row at a time, which is fine for a mirror and wrong for anything with volume. A real adapter batches rows into one request where the image allows it, for the same reason [Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md) gave for model functions: a call per row is the slowest shape there is.

## The FAQ, as limits

| Question | Answer on the page |
|---|---|
| Where are all uploaded images listed? | Control Panel, for administrators, with their vulnerabilities |
| Live deployments? | Yes, "container models can be used within live and batch deployments" |
| Maximum image size? | "images larger than 22 GB will time out during the Docker push step" |
| Windows containers? | No: "all images pushed into the platform must be built for the Linux platform" |
| Several containers per model? | Yes, "but there is no orchestration support": all start together, with no start-order guarantee |
| Telemetry? | Toggle *Enable telemetry* when creating a version; the image needs `/bin/sh` and the `set` and `tee` commands; telemetry "only works in Python transforms and live deployments", not batch deployments; test with `docker run --entrypoint /bin/sh <image> -c 'set -a && tee -a' && echo "Telemetry compatible"` |

## Container model or compute module

**[Explanation]** Both run your image inside Foundry ([DevTools 03-01](../../DevTools/03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md)). The question is what you want around the image:

| You want | Choose | Because |
|---|---|---|
| Versions, submissions, reviews, releases, evaluation, a function on the model, Workflow Lineage as a model | A **container model** | It is a model asset; everything in modules 04–06 applies, and the adapter gives it a typed API |
| A general service with its own API, called from functions or apps, scaled on demand, possibly serving many things | A **compute module** | It is not tied to one tabular API or to the model lifecycle; DevTools 03 covers replicas, logs and cost |
| A language model to use in AIP Logic or a *Use LLM* node | Neither: a **registered model** in AIP ([AIP 02](../../AIP/02-bring-your-own-model/README.md)) | The externally hosted model page says so in as many words ([03](03-externally-hosted-models.md#when-not-to-wrap)) |

## For Kestrel

**[Example]** *Considered, not adopted*. Kestrel's **Kestrel Pay LLM** runs in the compute module `kestrel-pay-llm` and is registered in AIP with its own data-access policy ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md#kestrel-pays-decision)). Re-packaging it as a container model would gain the model lifecycle (versions, an objective) and lose what Kestrel Pay actually needs: use from Logic and the *Use LLM* node, and the marking policy that lets only that model see `Kestrel Pay – Financial` data. The container pages say nothing about either, and the externally hosted page says a general-purpose language model should not be bound to an object type. So the compute module stays, and [DevTools 03-01](../../DevTools/03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md)'s rule stands: no more compute modules for ordinary logic. The two predictive models are weights, not images. The one container-model case that could appear at Kestrel is the one the DevTools note named, a carrier's routing library shipped as a binary; if it ever does, it is a container model only if someone wants to *evaluate and release* it, and otherwise a compute module.

---
[Module index](README.md) · Previous: [01 — Models uploaded from files](01-models-uploaded-from-files.md) · Next: [03 — Externally hosted models](03-externally-hosted-models.md)
