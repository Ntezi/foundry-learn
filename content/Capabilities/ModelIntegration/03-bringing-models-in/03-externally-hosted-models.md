# 03 — Externally hosted models

*Sources: [Integrate an externally hosted model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection/) · [Example: Integrate an Amazon SageMaker model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-sagemaker/) · [Example: Integrate a Vertex AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-vertex-ai/) · [Example: Integrate an Open AI model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-open-ai/) · [Example: Integrate a Databricks model](https://www.palantir.com/docs/foundry/integrate-models/external-model-connection-databricks/) · [Instrumentation and telemetry in models](https://www.palantir.com/docs/foundry/integrate-models/instrumentation-telemetry/) · checked October 23, 2026 · Ready for Review*

A model that Foundry does not run at all: the artifacts are a URL, a configuration map and encrypted credentials, and the adapter is an HTTP client. The connection page is the one to read closely, because it starts by saying when *not* to do this. The four provider examples share one shape; the telemetry page applies to every adapter in the area, not only external ones.

## When not to wrap

**[Docs]** The page's own warning, before the steps: wrapping "may not be the right solution if you do not intend to manage or evaluate the model in Foundry, or if you have a general purpose model that should not be bound to a specific object type in the Ontology, such as a large language model. Instead, you may want to call the model's external API directly from Foundry rather than wrapping it into a Foundry model." In that case credentials go in a Data Connection source, imported into external transforms for batch and into a function for live use. For language models specifically: "consider registering your model in the platform for use within AIP tools such as AIP Logic or Pipeline Builder's Use LLM Node", which "can be done using an externally hosted model in Foundry, but creating a model is not necessary".

**[Docs]** And one hard limit, top of the page: "Batch deployments are currently not supported for externally hosted models." Nor is automatic model evaluation in an objective. Batch inference is a Python transform.

**[Explanation]** So the externally hosted model is for a *predictive* model, hosted elsewhere for a reason (it was trained there, or must stay there), that you nevertheless want to version, release, serve live and bind to the Ontology from Foundry. It is not the way to call an LLM, and it is not a batch tool.

## The connection

**[Docs]** Three ingredients: connection details, an adapter "that tells Foundry how to create a connection to and interface with the externally hosted model", and "A Foundry egress policy that allows Foundry to connect to the externally hosted model". Seven steps: create the model (*+New → Model* in a project, or *Add model* in an objective); *Connect an externally hosted model*; *Custom connection* and an egress policy ("An egress policy enables a Foundry project or artifact to send data from Foundry to an external system"; configured in Control Panel by those with permission); choose the adapter, built to take an `ExternalModelContext` at load; set the **URL** (optional, "intended to be the URL of the model inference function") and the **connection configuration** (optional, "will not be encrypted and will be viewable with the model metadata in platform"); set the **credentials configuration** ("will be encrypted and safely stored alongside the Model", decrypted into the adapter at load); name, location and version notes.

**[Docs]** The permission consequence, in the page's words: "Users who have access to the model will be able to use this model to perform inference regardless of their underlying access to the external model."

**[Explanation]** That sentence is the governance decision hidden in the form. The credentials belong to whoever created the model; everyone who can use the model uses *those* credentials. Permission to the external system is replaced by permission to the Foundry model, so the model's project and roles are what now gate the external endpoint and its bill.

**[Docs]** Operating it: a live deployment in an objective (the egress policy "will be automatically added to the live deployment" when the objective is in the same project; otherwise import it into the hosting project); or a Python transform with `@use_external_systems(export_control=ExportControl(markings=[...]), egress=EgressPolicy(...))`, the egress policy being "the same egress policy as defined in the model", and dependencies `transforms-external-systems` and `external-model-adapters`.

## The adapter shape

**[Docs]** `pm.ExternalModelAdapter` with `init_external(cls, external_context)` reading `base_url`, `connection_config` and `resolved_credentials`, a constructor that builds the client "at model load time", a usually untyped tabular API (`pm.Pandas()` in and out) and a `predict()` that serialises rows to the provider's JSON, calls it, and turns the reply into a DataFrame. The four examples differ only in client and keys:

| Provider | Client | Connection configuration | Credentials | URL | Egress policy host |
|---|---|---|---|---|---|
| Amazon SageMaker | `boto3.client('runtime.sagemaker', ...)`, `invoke_endpoint` | `region_name`, `endpoint_name` | `access_key_id`, `secret_access_key` | not used | `runtime.sagemaker.us-east-1.amazonaws.com` (443) |
| Google Vertex AI | `aiplatform.init(...)`, `Endpoint(...).predict(instances=...)` | `region_name`, `project_id`, `endpoint_id` | `google_application_credentials` (the full service-account key file) | not used | `us-central1-aiplatform.googleapis.com` (443) |
| Open AI (Azure-hosted) | `openai.ChatCompletion.create(engine=..., messages=...)` | `api_type`, `api_version`, `engine` | `api_key` | the API endpoint | the endpoint's host (443) |
| Databricks Model Serving | `WorkspaceClient(host, token).serving_endpoints.query(...)` | `host`, `serving_endpoint_name` | `token` (a personal access token) | the serving endpoint URL | the workspace domain (443) |

**[Docs]** The examples log and re-raise provider errors with a hint that a failed call can mean a wrong egress policy or an endpoint that is no longer available, and warn that a large JSON reply deserialised on the executor "may cause an OOM". All were "tested with" pinned library versions the pages list. The Open AI adapter is a one-prompt-per-row chat-completion loop with typed `prompt` and `prediction` columns.

**[Explanation]** The table is the whole of the four pages: the adapter is a thin client, the two maps carry its settings, and the egress policy names the one host it may reach. Choose the Open AI example only for the shape; for an actual language model, the page above and [AIP 02](../../AIP/02-bring-your-own-model/README.md) point elsewhere.

## Instrumentation and telemetry

**[Docs]** Applies to "core machine learning models" (language models have their own page, [07-01](../07-language-models-migration-and-products/README.md)); results are viewed through Ontology and AIP observability ([Observability 03-02](../../Observability/03-ontology-and-aip-observability/02-trace-views-service-logs-and-debugging.md)). "Models support custom logs and custom spans. Metrics are not user-defined; Foundry records the total execution duration for all inference calls to a model." Every invocation gets "A single span over the total execution duration of an inference call, along with a single request log" automatically.

**[Docs]** Add `opentelemetry-api` and `opentelemetry-sdk` for logs and spans, `opentelemetry-instrumentation` to instrument outbound requests. Logs written through Python's `logging` "are routed to Foundry automatically"; spans come from `trace.get_tracer(__name__)` and `with tracer.start_as_current_span("preprocess"):` around a step. Third-party loggers and tracers must be pointed at the global providers.

**[Explanation]** For an externally hosted model, a span around the provider call is the one measurement that separates *our adapter is slow* from *their endpoint is slow*, which the Observability area's live-deployment rules cannot tell apart ([Observability 01-02](../../Observability/01-monitoring-views/02-monitoring-rules-reference.md)).

## For Kestrel

**[Example]** *Considered, not adopted*: no Kestrel model is hosted outside Foundry. The **Kestrel Pay LLM** is the case the page's warning describes exactly: a general-purpose language model that must not be bound to an object type, used from Logic and the *Use LLM* node, so it is a registered model in AIP served from the compute module `kestrel-pay-llm` ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md#kestrel-pays-decision)), not an externally hosted model and not a container model ([02](02-container-models.md#for-kestrel)). That closes the plan's question about why it stays where it is. One idea is *noted, not proposed*: if a carrier ever offers a hosted ETA model, it would come in through this page, with Kestrel's own egress policy for that one host and the credential-sharing rule above read out loud to Lena as governance lead ([Security 11-01](../../Security/11-kestrel-case/01-kestrels-access-model-built-out.md)), since everyone who can use the model would be using Kestrel's key. *Proposed* from the telemetry page, for both predictive models: a `logging` line per inference call with the row count and the model version, and two spans, `features` and `inference`, so the Delivery Desk triage path from [Observability 04-02](../../Observability/04-kestrel-case/02-triage-at-kestrel-from-alert-to-fix.md) has something to read when a live score is slow.

---
[Module index](README.md) · Previous: [02 — Container models](02-container-models.md) · Next module: [04 — Experiments and evaluations](../04-experiments-and-evaluations/README.md)
