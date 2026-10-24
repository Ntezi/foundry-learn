# 04 — Querying a live deployment, inference history, compute usage

*Sources: [API: Query a live deployment](https://www.palantir.com/docs/foundry/manage-models/live-deployment-reference/) · [Model inference history](https://www.palantir.com/docs/foundry/manage-models/model-inference-history/) · [Live deployment compute usage](https://www.palantir.com/docs/foundry/manage-models/compute-usage/) · [Modeling Objective live deployment FAQ](https://www.palantir.com/docs/foundry/manage-models/live-faq/) · checked October 23, 2026 · Ready for Review*

Four pages about a running live deployment: how to call it over HTTP, how to keep a record of every call, what it costs while it sits there, and the FAQ. The compute page is the one that changes a design: an objective live deployment uses compute-seconds "regardless of the number of incoming requests it receives".

## The two endpoints

**[Docs]** Both direct and objective deployments expose an HTTP endpoint. **Multi I/O** (*v2*): `<ENVIRONMENT_URL>/foundry-ml-live/api/inference/transform/ri.foundry-ml-live.<LIVE_DEPLOYMENT_RID>/v2`, POST, bearer token, `Content-Type: application/json`; the body is "A JSON object containing the information to be sent to the model", one named field per API input, each an array of row objects; the response is one named field per output. **Single I/O** (*v1*, sunset): the same URL without `/v2`, a body of `requestData` (an array) and `requestParams`, a response of `modelUuid` and `responseData`. "The single I/O endpoint is deprecated and only supported in modeling objective deployments."

```json
{ "inference_data": [ { "text": "Hello, how are you?" } ] }
→ { "output_data": [ { "prediction": "<Model prediction here>" } ] }
```

**[Docs]** Error codes: **400**, "an invalid request or model failure", usually an exception in inference with "The stacktrace will usually be available in the response body", or a request that "does not conform to the model API"; **422**, malformed JSON; **429**, too many requests ("Retry with backoff or reduce concurrency"); **500**, internal error; **503**, unavailable ("resource starvation, is out of memory, cannot handle more requests concurrently, or is automatically attempting to restart"; retry with backoff). The environment URL is copied from the *Query* tab's curl command.

**[Explanation]** Two of those codes are operational signals, not caller errors: 429 says the deployment is under-provisioned for the moment's concurrency, 503 that it is starving or restarting. Both belong with the live-deployment monitoring rules ([Observability 01-02](../../Observability/01-monitoring-views/02-monitoring-rules-reference.md)) rather than in a retry loop alone.

## Model inference history

**[Docs]** "The model inference history is a dataset in Foundry that captures all inference requests (inputs) and inference results (outputs) that are sent to a Modeling Objective live deployment." The uses the page names: drift detection, continuous retraining, performance evaluation over time, usage analysis. Create it from the deployment's *Model Inference History* card (*Create dataset*); "We strongly recommend adding Security Markings since inputs and outputs may contain sensitive information". Columns:

| Column | Holds |
|---|---|
| `timestamp`, `user_id`, `request_uuid` | When, who, which request |
| `live_rid`, `objective_rid`, `model_rid`, `model_version_rid` | Which deployment, objective, model and **model version** answered |
| `input`, `output` | JSON of the request and the response |
| `error` | "Detailed error message or stacktrace" when inference failed |

**[Docs]** Rules from the FAQ: the permission is `foundry-ml-live:edit-inference-ledger`, which typically comes with the Owner role on a modeling objective; the dataset must be saved "to the same project as its parent modeling objective"; an existing dataset cannot be used ("To ensure the model inference history matches the designated schema"); *Enable Recording* toggles it; *Remove* is permanent for the link, though "the dataset will still exist"; and "Not all inputs and outputs are guaranteed to appear in the inference history", because writes that fail "are not retried".

**[Explanation]** Two consequences. The history is the only place the platform writes the *exact* model version against a live answer, so it is the authoritative half of the version question from [01](01-the-objective-lifecycle.md#for-kestrel). And it is best-effort by design, which makes it evidence for analysis and audit, not a ledger that can prove a call never happened; anything that must be complete is written by the caller, as the *Record fraud score* action does ([Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md)).

## Compute usage

**[Docs]** The page covers objective live deployments only; direct deployments "are backed by compute modules and therefore follow the corresponding principles" ([DevTools 03-03](../../DevTools/03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md)). Live deployments "continuously reserve dedicated compute resources", so one "uses Foundry compute-seconds while the deployment is active", "regardless of the number of incoming requests it receives", from start until shut down (trashing the objective shuts it down). Usage is attributed to the objective and aggregated at its project. Each replica has identical vCPU (in millicores) and GiB of RAM; a container model's replica adds the container's own resources.

**[Docs]** The formulae:

- vCPU: `max(vCPUs_per_replica, GiB_RAM_per_replica / 7.5) × num_replicas × live_model_vcpu_usage_rate × time_active_in_seconds`, with a default vCPU rate of **0.2**;
- GPU: `GPUs_per_replica × num_replicas × live_model_gpu_usage_rate × time_active_in_seconds`, rates from **1.2** (T4) to **4.7** (H100);
- a container model adds `max(cores, Memory / 7.5) × num_replicas × rate × time` for the image.

The worked examples: two replicas at 0.5 vCPU and 1 GiB for 20 seconds is **4** compute-seconds; two V100 replicas for 20 seconds, **120**; the container example, 4 + 32 = **36**.

**[Docs]** Controlling it: "Deployments should be tuned for the peak expected number of simultaneous requests", with stress tests before "an operationally critical setting"; monitor for deployments "erroneously left running", "common on staging deployments"; load does not change usage ("A live deployment will service as many requests as its resources will allow it to without changing the number of compute-seconds it uses"); profiles can change while active, with no downtime. Administrators see running deployments per resource queue under *Resource queues → Continuous compute*.

**[Explanation]** The sentence about load is the whole economics of the thing: an objective live deployment is a reserved room, billed by the hour whether anyone comes in. The levers are replica count and profile, and the one habit that saves money is disabling staging deployments between test rounds.

## The FAQ, matched

| Question | Answer on the page |
|---|---|
| Which conda environment is deployed? | The one in the adapter of the published model, plus "necessary lightweight packages to serve your production model" |
| Request size? | "up to 50MB in a single request" by default, configurable |
| Monitors? | Yes, through a monitoring view |
| Private libraries? | Yes, if published as Foundry Python libraries; public ones need a discoverable channel |
| Who may create live deployments? | Permissioned separately from batch deployments, on request |
| Scaling? | "By default, each deployment is configured with 2 replicas, ensuring there is no downtime during upgrades", with a low default footprint; per-deployment and Control Panel overrides |
| GPUs? | Beta, "may not be available on your enrollment" |
| Turning it off? | Disable (re-enable later; "the deployment will upgrade to the latest release") or delete (irreversible, Target RID lost) |
| External APIs from the model? | Yes, with network egress configured for live deployments |
| Timeouts? | "A five minute timeout will occur due to the default dialog read timeout" |

## For Kestrel

**[Example]** *Proposed*. **Inference history** on both production live deployments, in the objective's project, with `Kestrel Pay – Financial` on the `Payment fraud` history and no marking on the `Delivery delay` history for as long as its inputs are the shipment features of [02-01](../02-training-models-in-foundry/01-model-studio.md#for-kestrel) and no customer field, to be revisited if the API moves to `pm.Object(Shipment)` ([05](05-models-in-the-ontology-and-model-functions.md#for-kestrel)); recording on; Owner on each objective held by the data owner (Priya, Lena) so the ledger permission sits with them. The fraud history is the drift and audit dataset, the delay history the drift dataset; neither is the record of what Kestrel *acted* on, which stays with *Record fraud score* and the scored `delayRisk` dataset. **Compute**: both deployments start on the default two-replica, low profile; the page's formula at 0.5 vCPU and 1 GiB gives 0.2 compute-seconds per second per deployment, about 17,000 a day each, before any request is made; Daniel stress-tests `deliveryRisk` at the queue's peak (Monday mornings, when Ama's team opens the most shipments) before raising it. Staging deployments are **disabled** after each test round, and the two monitoring views of [Observability 04-01](../../Observability/04-kestrel-case/01-the-delivery-desk-monitored.md) get the heartbeat and replica rules, `Commerce operations` for the delay deployment and `Kestrel Pay operations` for the fraud one. **Errors**: `liveFraudScore` and `deliveryRisk` treat 429 and 503 as *score unavailable* with backoff, and surface 400 to the developers, since it means the request shape and the API disagree.

---
[Module index](README.md) · Previous: [03 — Deployments: live, batch, direct and branching](03-deployments-live-batch-direct-and-branching.md) · Next: [05 — Models in the Ontology and model functions](05-models-in-the-ontology-and-model-functions.md)
