# 02 — Configuration and SDKs

*Sources: [Containers](https://www.palantir.com/docs/foundry/compute-modules/containers/) · [Probes](https://www.palantir.com/docs/foundry/compute-modules/probes/) · [Scaling](https://www.palantir.com/docs/foundry/compute-modules/scaling/) · [Sources](https://www.palantir.com/docs/foundry/compute-modules/sources/) · [Volumes](https://www.palantir.com/docs/foundry/compute-modules/volumes/) · [Python SDK](https://www.palantir.com/docs/foundry/compute-modules/python-sdk/) · [Java SDK](https://www.palantir.com/docs/foundry/compute-modules/java-sdk/) · [TypeScript SDK](https://www.palantir.com/docs/foundry/compute-modules/typescript-sdk/) · [OSDK integration](https://www.palantir.com/docs/foundry/compute-modules/osdk-integration/) · [Create a custom compute module client](https://www.palantir.com/docs/foundry/compute-modules/advanced-custom-client/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Everything on a compute module's **Configure** page: the images, how Foundry checks they're healthy, how many replicas run, what they can reach, and what they share. Then the three SDKs that hide the plumbing, and what you write if you don't use one.

## Images

**[Docs]** Four hard requirements:

- run as a **non-root numeric** user;
- build for **linux/amd64**;
- reference a **digest or any tag except `latest`**;
- expose ports only between **1024 and 65535**, excluding **8945 and 8946** (the compute module service uses them).

**[Docs]** Push images to an **Artifacts repository** (**Publish > Docker**). A replica that stays in *Starting* for a long time often has a large image (over 5 GB) ([03](03-debugging-history-and-cost.md#replica-states)).

## Logs

**[Docs]** Logging is set per container:

- **SLS format**: structured, with `SafeArg` / `UnsafeArg` for non-sensitive and sensitive values. Plain `System.out.println` isn't captured in SLS mode.
- **Plaintext**: human-readable; the output goes into the SLS `message` field, so both kinds are kept. The page recommends it as the default.
- **Sources**: `stdout` (the container needs `/bin/sh` with `set` and `tee`; optionally merge `stderr`) or **log files** matched by path patterns under a directory that must be **empty at start-up**.

**[Docs]** The SDKs log in SLS for you: Python `get_logger` and `set_internal_log_level`, Java `SafeLogger` (adds `session_id`, `job_id` and `pid` to every line), TypeScript `SlsLogger`.

## Reserved environment variables

**[Docs]** Foundry sets these; you can't overwrite them:

| Variable | What it holds |
|---|---|
| `CLIENT_ID`, `CLIENT_SECRET` | The third-party application's credentials, in function mode with application permissions |
| `BUILD2_TOKEN` | Path to the pipeline-mode token file |
| `SOURCE_CREDENTIALS`, `SOURCE_CONFIGURATIONS_PATH` | Paths to JSON files of source secrets and configuration (only if a source is attached) |
| `FOUNDRY_ONTOLOGY_RID` | For Marketplace installs: the **installation** project's ontology |
| `MAX_CONCURRENT_TASKS` | Per-replica concurrency (default 1); changes while a replica runs aren't picked up |
| `COMPUTE_SESSION_ID`, `FOUNDRY_COMPUTE_MODULE_RID` | The replica's and the module's identifiers |
| `RUNTIME_HOST`, `RUNTIME_PORT`, `RUNTIME_API`, `GET_JOB_URI`, `POST_RESULT_URI`, `POST_SCHEMA_URI`, `MODULE_AUTH_TOKEN`, `DEFAULT_CA_PATH` | For custom clients talking to the compute module service |

## Probes

**[Docs]** Two probe types, same checks, different consequences:

| | On failure |
|---|---|
| **Readiness** | The container is marked unresponsive and gets **no queries** until it passes again |
| **Liveness** | The container is **restarted** |

**[Docs]** A probe is either **exec** (a command; exit code 0 passes; the default readiness probe is `echo`) or **HTTP** (a GET; status 200 to 399 passes; same port rules as above). Both have a timeout. The page's readiness example downloads a dataset file at start-up and exits 1 if it fails, so the replica takes no traffic until its data is there.

## Scaling

**[Docs]** Settings:

- **Minimum replicas**: above zero keeps instances running (and billing) at all times; **zero** lets the module scale to nothing, but it scales up immediately on a request, on first deploy, and whenever load is **predicted**.
- **Maximum replicas**: the cap on cost and runaway scaling. Predictive scaling respects it.
- **Concurrency limit**: requests per replica at once; default **1** (sequential). The SDKs handle it; custom clients read `MAX_CONCURRENT_TASKS`.
- **Load** = running jobs ÷ (replicas × concurrency limit). Scale up by one when load ≥ the **scale-up threshold** for the **scale-up delay**; scale down by one when it's below the **scale-down threshold** for the **scale-down delay**.

| Setting | Default | Rule |
|---|---|---|
| Scale-up threshold | **0.75** | Between 0.0 and 1.0; not below the scale-down threshold |
| Scale-down threshold | **0.75** | Between 0.0 and 1.0; not above the scale-up threshold |
| Scale-up delay | **1 minute** | At most the scale-down delay |
| Scale-down delay | **30 minutes** | — |

**[Docs]** **Scheduled overrides** change minimum and maximum replicas for chosen days and hours, in a timezone; only **one** override is supported.

**[Explanation]** With both thresholds at 0.75, the delays do the damping: scale up fast after a minute of pressure, scale down slowly after half an hour of quiet. A lower concurrency limit means more replicas for the same load, and more cost ([03](03-debugging-history-and-cost.md#cost)).

## Sources

**[Docs]** Compute modules use a "zero trust" model: **no network access at all** by default, not even to other Foundry services. A **source** from Data Connection supplies both egress (its network policies) and credentials. The source must be in the module's project (or added as a reference), allow **import into compute modules** on its **Code import** tab, and have an **API name**.

**[Docs]** Secrets arrive as JSON in the file named by `SOURCE_CREDENTIALS`, keyed by source API name then secret name. REST sources prefix secrets with `additionalSecret`. The Python SDK's `get_source("<API name>")` (install `foundry-compute-modules[sources]`) gives `get_secret()` and a ready HTTPS client; the TypeScript SDK has `getCredential()` and can validate declared sources at start-up.

**[Docs]** To add or remove a source you must **stop** the module. Network policy changes need a **full restart**; credential changes roll out with a rolling upgrade.

## Volumes

**[Docs]** Volumes share files between the containers **of one replica**. Both types are **ephemeral**:

- **empty directory**: created empty when the replica starts, read-write, deleted when it ends;
- **content directory**: pre-loaded, **read-only**, at most **100KB** in total; good for environment-specific configuration.

**[Docs]** Names start with a letter, use lower-case letters, numbers and hyphens, up to 63 characters. Mount at an absolute path other than `/`. Replicas live at most **22 hours** and can be replaced at any time, so keep lasting state in datasets or the Ontology.

## The three SDKs

| | Python (`foundry-compute-modules`) | Java (`com.palantir.computemodules:lib`) | TypeScript (`@palantir/compute-module`) |
|---|---|---|---|
| Register | `@function`, typed with `TypedDict` or `dataclass` | `ComputeModule.builder().add(fn, In.class, Out.class, "name")`; records or `@JsonProperty` classes | `register(...)`, typed with **TypeBox** `definitions` |
| Stream | `@function(streaming=True)` | — | `registerStreaming(...)`; output declared as `Type.Array`; each `write()` must be valid JSON |
| Auth | `RefreshingOauthToken` (refreshes every 30 minutes), `retrieve_third_party_id_and_creds()` | `RefreshingOauthToken`, `PipelinesAuth.retrievePipelineToken()` | `getEnvironment()` gives the build token or third-party credentials |
| Extras | `get_source()` | `EnvVars.Reserved.CLIENT_ID.get()` | `getResource(alias)` in pipeline mode; `getServiceApi(FoundryService.STREAM_PROXY)` calls Foundry services **without a source** |

**[Docs]** Older Java modules built on `DeployedAppRuntime` need **Include runtime** switched **off** on the Configure tab.

## Using the OSDK inside a module

**[Docs]** The steps:

1. Create a Developer Console app: language, **Backend service**, **Application permissions**.
2. Grant its service user access to the object types (**and** backing datasets where needed): in Developer Console, **OAuth & restrictions > Troubleshoot access**, then add the client ID in each resource's **Security** tab.
3. Add a **source** for your Foundry hostname.
4. On the module's Configure tab: **Application permissions > Use other app credentials**, enter that app's client ID and secret.
5. In code: build `ConfidentialClientAuth` from `CLIENT_ID` / `CLIENT_SECRET` and create the `FoundryClient`.

**[Docs]** Building locally, the OSDK package comes from a private Artifacts repository: pass `FOUNDRY_TOKEN` as a **Docker build secret** (`--secret id=FOUNDRY_TOKEN,env=FOUNDRY_TOKEN`), never as a build argument. In Code Repositories, add the generated **Conda** (Python) or **Maven** (Java) SDK as a library instead.

**[Docs]** After a Marketplace install, initialise the client with `FOUNDRY_ONTOLOGY_RID`, and keep entity **API names identical** between source and target ontologies ([02-03](../02-developer-console-and-apis/03-operating-an-application.md#shipping-with-marketplace)).

## Writing your own client

**[Docs]** Without an SDK, the entry container must loop forever:

1. Optionally **POST the function schemas** to `POST_SCHEMA_URI`.
2. **GET** a job from `GET_JOB_URI`: 200 with `jobId`, `queryType` (the function name), `query` (the payload) and, in some modes, `authHeader`; **204** when there's nothing (the endpoint long-polls).
3. **POST** the result to `POST_RESULT_URI/<jobId>` as `application/octet-stream`; expect 204.

**[Docs]** Every call carries the `Module-Auth-Token` header (from the file `MODULE_AUTH_TOKEN`) and verifies TLS with `DEFAULT_CA_PATH`. "Connection refused" at start-up is expected; retry after a short sleep. **Every job must get a result posted**, or the replica may stop receiving jobs.

## For Kestrel

**[Example]** The configuration `kestrel-pay-llm` needs, read against these pages. The readiness probe and the scheduled override were added here and **adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22:

| Setting | Value | Why |
|---|---|---|
| Execution mode | Function mode, no platform permissions (assumed: the model pages don't name a mode, but AIP calls the module, so it can't be pipeline mode) | It answers inference requests; it never calls Foundry APIs |
| Sources | **None** | The whole point is that inference traffic can't leave Kestrel's control ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md#kestrel-pays-decision)); with no source, the module has no egress at all |
| Minimum replicas | **1** | Required for compute-module-backed models ([AIP 02-02](../../AIP/02-bring-your-own-model/02-rest-and-compute-module-backed-models.md)); loading weights from zero would take minutes |
| Readiness probe | An exec probe that checks the weights are loaded | No queries reach a replica that can't answer yet |
| Scheduled override | Minimum 2 during Lena's team's working hours | Predictable daytime load |

**[Explanation]** The fallback design, `kestrel-pay-redacting-proxy`, is the opposite case: it **must** have a source, because its job is to forward redacted requests to an external provider.

---
[Module index](README.md) · Previous: [01 — Compute module concepts](01-compute-module-concepts.md) · Next: [03 — Debugging, history and cost](03-debugging-history-and-cost.md)
