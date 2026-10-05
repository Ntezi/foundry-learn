# 05 — Writing functions in practice

*Sources: [Getting started](https://www.palantir.com/docs/foundry/functions/getting-started/) · [TSv2](https://www.palantir.com/docs/foundry/functions/typescript-v2-getting-started/), [Python](https://www.palantir.com/docs/foundry/functions/python-getting-started/) and [TSv1](https://www.palantir.com/docs/foundry/functions/typescript-v1-getting-started/) getting started · [Types reference](https://www.palantir.com/docs/foundry/functions/types-reference/) · [Local Ontology SDKs](https://www.palantir.com/docs/foundry/functions/local-sdks/) · [Python Ontology edits](https://www.palantir.com/docs/foundry/functions/python-ontology-edits/) · [Python staged writes](https://www.palantir.com/docs/foundry/functions/python-staged-writes/) · [TSv1 Ontology edits](https://www.palantir.com/docs/foundry/functions/api-ontology-edits/) · [Unique IDs](https://www.palantir.com/docs/foundry/functions/edits-generate-id/) · [Object identifiers](https://www.palantir.com/docs/foundry/functions/object-identifiers/) · [User-facing errors](https://www.palantir.com/docs/foundry/functions/user-facing-error/) · [Instrumentation](https://www.palantir.com/docs/foundry/functions/instrumentation-telemetry/) · [API calls](https://www.palantir.com/docs/foundry/functions/api-calls/) · [Source](https://www.palantir.com/docs/foundry/functions/source-aliases/) and [custom](https://www.palantir.com/docs/foundry/functions/custom-aliases/) aliases · [Platform SDK](https://www.palantir.com/docs/foundry/functions/platform-sdk/) · [Functions settings](https://www.palantir.com/docs/foundry/functions/functions-settings/) · [Deploy functions](https://www.palantir.com/docs/foundry/functions/functions-deployed/) · [Streaming](https://www.palantir.com/docs/foundry/functions/streaming-functions/) · [Use functions in the platform](https://www.palantir.com/docs/foundry/functions/use-functions/) · [Python in Pipeline Builder](https://www.palantir.com/docs/foundry/functions/python-functions-builder/) and [Workshop](https://www.palantir.com/docs/foundry/functions/python-functions-workshop/) · [Branching functions](https://www.palantir.com/docs/foundry/functions/branching-functions/) · [Functions in Marketplace](https://www.palantir.com/docs/foundry/functions/marketplace-functions/) · [Unit testing (TSv1)](https://www.palantir.com/docs/foundry/functions/unit-test-getting-started/) · [Attachments](https://www.palantir.com/docs/foundry/functions/attachments/) · [Media](https://www.palantir.com/docs/foundry/functions/media/) · checked October 3, 2026 · Ready for Review*

[01](01-functions-on-objects.md)–[04](04-functions-on-models-and-llms.md) explain what functions are and when to use them. This note is the other half: the **handbook** at the top of Kestrel's functions repository, `kestrel-functions` (TSv2), with notes for its Python sibling `kestrel-ml`. Each section is a house rule followed by the doc facts behind it. New joiners read it once; reviewers check pull requests against it.

---

## 1. Setting up

**House rule: TSv2 repositories by domain; every Python function used in Workshop goes in `kestrel-ml`; VS Code workspace; local SDK on.**

- **[Docs]** Repositories are created from a project (*+ New → Repository*) or in Code Repositories. **VS Code workspaces** are recommended: live preview, resource imports, SDK generation, branch management and release management through the Palantir extension.
- **[Docs]** **Live preview** runs in a **different runtime** from published functions: different CPU, memory and timeouts. A function that passes live preview can still time out when published.
- **[Docs]** **Tagging publishes every function in the repository**, not just the one you edited. New functions may take a while to appear in Workshop and the registry "while permissions propagate".
- **[Docs]** For Python, the docs recommend "grouping all functions for use in Workshop or Ontology-based applications in a single repository to minimize costs". **[Explanation]** A deployed repository runs one deployment for all its functions (section 5), so many small repositories means many deployments.

**Where code must live:**

| | TSv2 | Python | TSv1 |
|---|---|---|---|
| File | `typescript-functions/src/functions/<name>.ts`; the **file name must match the function name** | Any file; only `@function`-decorated functions are registered | A class exported from `functions-typescript/src/index.ts` |
| Declaration | The function is the file's **default export** | `@function` from `functions.api` | Public method with `@Function()`, `@OntologyEditFunction()` or `@Query({apiName})` (never `@Query` with `@Function`) |
| Types | Explicit input and return types | Explicit input and return types | Explicit input and return types |

- **[Docs]** Use the numeric aliases (`Integer`, `Long`, `Float`, `Double`) from `@osdk/functions` (TSv2), `@foundry/functions-api` (TSv1) or `functions.api` (Python), not a bare `number`. Map keys can only be scalars or an object type.
- **[Docs]** A **local Ontology SDK** (TSv2 and Python) is generated from the repository's resource imports, so its types always match the imports. It's **required for full Global Branching**. Generate it in the *Resources* panel, or with `./rune sdk generate`; migrate an older repository by setting `useSdkSidebar` to `false` in `functions.json` and choosing *Migrate*.
- **[Docs]** In TSv1, all imported resources must come from **one ontology**: importing from another overwrites the existing imports. Resources need an **API name** to be imported. TSv1 can only use **pure JavaScript** packages; anything needing Node.js system calls (such as `fs`) isn't supported.
- **[Docs]** A Python SDK's **package name can't be changed** after its first version.

## 2. Writing edits

**House rule: every edit function is reviewed with the action that will run it.** An edit function on its own changes nothing. **[Docs]** "Running an edit function outside of an Action will not actually modify any object data." ([08-04](../08-actions/04-function-backed-actions.md))

The mechanics differ by language. [09-02](02-query-functions-and-ontology-edits.md) shows the same change in all three; this table is the checklist.

| | Python | Python, staged writes (beta) | TSv1 |
|---|---|---|---|
| Declare | `@function(edits=[Order])`; many-to-many links as `OntologyLinkType(Order, "promotions")` | `@function(beta=True, edits=[…])`, listing types edited by **nested** calls too | `@OntologyEditFunction()` plus `@Edits(Order)` (recommended; otherwise inferred "on a best-efforts basis") |
| Container | `FoundryClient().ontology.edits()` | `client.ontology.staged_writes()`, from an injected `WriteableClient` (don't construct it) | `Objects.create()…`, edits recorded implicitly |
| Return | `list[OntologyEdit]` | Anything; edits aren't returned | `void` / `Promise<void>` |
| Read after write | No | **Yes**, including nested staged-write calls | No |

**[Docs] Traps the docs call out:**

- Python objects are **read-only**; get an editable view with `.edit(obj)` or `.edit(primary_key)`. The original object doesn't see the change.
- **Arrays:** in Python, mutating the list in place is "silently dropped"; assign a new list. In TSv1, copy the array, change the copy, assign it back.
- You can't change an existing object's **primary key**. A new object needs one.
- One-to-many links are edited through the **foreign key property**, not a link API.
- **Staged writes:** interface edits aren't supported, and live preview works only in Code Repositories, not in VS Code or local development.
- Searching for objects right after editing them, in a non-staged function, "may return unexpected results" ([09-02 "The two surprises"](02-query-functions-and-ontology-edits.md#the-two-surprises)).

**IDs for new objects.** **[Docs]** TSv2 has no built-in generator: use the `uuid` npm package. TSv1 has `Uuid.random()` from `@foundry/functions-utils`. The Python staged-writes example uses `uuid4()`. **[Recommendation]** Kestrel prefixes generated IDs by type (`CASE-…`) so a raw ID in a log says what it is.

**Comparing objects (TSv1).** **[Docs]** A new object's RID can be `undefined` until it's saved, so compare `typeId` **and** `primaryKey`, never the objects themselves. Use `FunctionsMap`, not a JavaScript `Map`, to key by object.

## 3. Errors and logs

**House rule: every error a user can cause is a `UserFacingError`; every function logs the object keys it touches.**

- **[Docs]** Throw `UserFacingError` (TSv1, TSv2 and Python all have it) for a message the user should see. Workshop and function-backed actions show it; a failing function-backed export shows it in the toast.
- **[Docs]** TSv1 can also declare **error types** with `FunctionsError`, and surfaces `WallTimeoutError` and `OutOfMemoryError` from the executor.
- **[Docs]** Telemetry by language:

| | Logs | Custom spans | Metrics |
|---|---|---|---|
| TSv1 | Yes (`console.log`) | No; product spans only (object loads, queries) | Product-defined only |
| TSv2 | Yes (OpenTelemetry logger, or `console`) | Yes | Product-defined only |
| Python | Yes (`logging`) | Yes | Product-defined only |

- **[Docs]** Every function gets one span for its whole run and a request log. TSv2 and Python automatically trace **outbound network requests**. Third-party logging or tracing libraries must go through the global OpenTelemetry provider.
- **[Docs]** "Do not log credentials, full API responses that may contain sensitive information, or other security-sensitive content."
- Where to read them: run history, traces and logs in [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#when-something-fails-the-triage-path).

## 4. Calling outside the function

**House rule: no hard-coded endpoints, models or settings. Use aliases.**

- **[Docs]** Functions can't call external APIs by default. You need a **Data Connection source** with **exports enabled** and **import into Code Repositories** allowed, imported through the resource imports sidebar, and declared by the function. Requests must use the source's client so that the right configuration applies.
- **[Docs]** Refer to sources through a **source alias** (TSv2 and Python): a portable key that a Marketplace installation can **remap per environment**. TSv1 uses the source's API name and has no aliases. **Custom aliases** do the same for strings such as feature flags or environment settings. Alias keys are unique per repository.
- **[Docs] Limits:** TSv1 can't fetch OAuth tokens from a source; deployed functions can't refresh OAuth tokens; functions used directly in Workshop (variables, widget content) can't trigger an interactive OAuth prompt; requests outside the source's **egress policies** fail with **HTTP 407**.
- **[Docs]** The **platform SDK** (`foundry-platform-sdk` for Python, `@osdk/foundry` for TSv2) calls Foundry's own APIs. The function's client has a fixed scope set: `api:admin-read`, `api:functions-read`, `api:ontologies-read`, `api:orchestration-read`, `api:usage:mediasets-read`, `api:usage:ontologies-write`. **Dataset reads aren't allowed**, even though they may work in live preview, which runs as you. TSv1 has no first-class authentication for it.
- **[Docs]** **Extended execution**, meaning calling **actions** from a function or getting a token that lives up to **four hours**, is off unless an administrator allowlists the repository, the function and (for Marketplace installs) the target project in **Control Panel → Functions settings**.
- **[Docs]** For webhooks, TSv1 imports the REST source and calls it in code; TSv2 and Python publish a **webhook function** instead.

## 5. Where it runs

**House rule: serverless unless a written reason says otherwise.**

**[Docs]** Serverless versus deployed (TSv2 and Python):

| | Serverless (default, recommended) | Deployed |
|---|---|---|
| Versions | Any version on demand | **One** version at a time per repository |
| Cost | Only while running | While the deployment runs |
| Third-party API clients | No; only the source's own client | Yes |
| GPUs, local caching, full service discovery | No | Yes |

- **[Docs]** A deployment hosts **all** functions in its repository and is configured in Ontology Manager (*Configure execution*): CPU, GPU, memory, autoscaling limits, environment variables, and a **per-version** timeout. Because only one version is hosted, the docs recommend adding a **new function** (for example `myFunction_v1`) when you need to change a deployed function with limited downtime.
- **[Docs]** **Streaming:** Python (`Iterable[T]` with `yield`) and TSv2 (`async function*` returning `AsyncIterable<T>`) can stream results, which suits LLM output ([09-04](04-functions-on-models-and-llms.md)). Calling them through the OSDK is **beta**.
- **[Docs]** In **Automate**, functions run asynchronously for up to **4 hours**, and a function's returned **edits are not applied**. Use an action effect to edit ([10-06](../10-applications/06-automate-and-ontology-events.md)).

## 6. Where it's used

**[Docs]**

- **Workshop variables**: recompute when an input variable changes, and **cache** results for identical inputs.
- **Function-backed columns** in the Object Table: in Python, take an object set and return `dict[ObjectType, ColumnType]` (or a custom type for several columns). Returning a media reference renders media.
- **Function aggregations** in Chart: XY and Quiver. In TSv1, aggregation metrics need **searchable** properties, and string buckets are `.topValues()` (top 1,000, fast) or `.exactValues()` (up to 10,000, slower). Python's `.from_osdk()` needs OSDK v2.
- **Slate**, under the *Platform* tab ("Foundry functions", distinct from Slate's own JavaScript functions).
- **Pipeline Builder**: Python UDFs run **once per row** in a sidecar container. Ontology types aren't supported there, sources must be importable into pipelines, and run history isn't kept ([14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#when-something-fails-the-triage-path)).

## 7. Branches and releases

**House rule: develop on the same global branch as the Ontology change; release through the product.**

- **[Docs]** Functions (TSv1, TSv2, Python and AIP Logic) can be developed and published on a **global branch**. Minimum template versions apply, and TSv2 and Python need a local SDK.
- **[Docs]** You publish to a **version target**: the stable version that lands on main at merge. On the branch, previews are tagged *Branched* and dependants pick up each new publish automatically. Branch versions aren't visible on other branches or on main, and only the version target is merged.
- **[Docs]** Query functions **can't depend on branched versions** of other functions. If the version target is published on main while you work, choose a new one and update dependants. Rebasing pulls newer main versions in.
- **[Docs]** For **Marketplace** ([14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md)):
  - functions don't need their **source code** packaged; fix bugs in the original and ship a new product version;
  - a deployed function can only be packaged if a deployment is running that version; if serverless isn't available in the target, it installs as deployed with default settings;
  - **model aliases can't be remapped** at install;
  - "Marketplace requires the SDK bindings to include **concrete object types, not only interfaces**". **[Explanation]** That bears on RQ-28: a packaged function written only against `Case` may not resolve in the target.

## 8. Testing (TSv1)

- **[Docs]** TSv1 repositories ship with **Jest**; tests live under `src/__tests__/`. `verifyOntologyEditFunction()` checks the edits a function makes; `.hasNoMoreEdits()` must come **last** and makes the check strict. `whenObjectSet` stubs searches and aggregations; stub objects need a `rid`. Dates, timestamps, UUIDs, users and groups can be mocked.
- **[Explanation]** These pages cover TSv1 only. For TSv2 and Python, Kestrel tests pure logic with the language's normal tools. It tests edits by running the action on a global branch, where the edits stay on the branch ([14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md#days-14--work-on-the-branch)). **Test runs** check submission criteria only; they write nothing ([08-03](../08-actions/03-submission-criteria.md)).

## 9. Files and media

- **[Docs]** TSv1 has strict memory limits: keep attachments and media **under 20 MB**, and TSv1 can't upload media. TSv2 and Python default to **1 GB**, adjustable in Ontology Manager.
- **[Docs]** An attachment created in a function persists only if an **edit links it to an object**. Otherwise only the uploader can see it, and it is deleted after a while.

---

## Review checklist for a pull request

- [ ] Types declared on every input and output; numeric aliases used.
- [ ] Edit functions declare every edited type (and m:n link type), and an action exists to run them.
- [ ] No array mutated in place; no primary key changed.
- [ ] Every user-caused failure is a `UserFacingError`; logs include object keys and no secrets.
- [ ] External calls go through a source alias; no hard-coded model or setting.
- [ ] Serverless, or a written reason for deployed.
- [ ] Developed on the same global branch as the Ontology change it depends on.

**Also read for this note** (TSv1 detail, testing and tooling pages whose facts are folded in above): [Navigating VS Code](https://www.palantir.com/docs/foundry/functions/navigating-vscode/) · [Language-agnostic: Configure notifications](https://www.palantir.com/docs/foundry/functions/configure-notifications/) · [Python: Functions on objects](https://www.palantir.com/docs/foundry/functions/python-functions-on-objects/) · [Python: Create a custom aggregation](https://www.palantir.com/docs/foundry/functions/python-functions-create-custom-aggregation/) · [Python: Local development](https://www.palantir.com/docs/foundry/functions/python-functions-local-development/) · [TSv1: Decorators](https://www.palantir.com/docs/foundry/functions/decorators/) · [TSv1: Error types](https://www.palantir.com/docs/foundry/functions/typescript-error-types/) · [TSv1: Handle undefined values](https://www.palantir.com/docs/foundry/functions/undefined-values/) · [TSv1: Debug functions](https://www.palantir.com/docs/foundry/functions/debug/) · [TSv1: Import resources into Code Repositories](https://www.palantir.com/docs/foundry/functions/resource-imports-sidebar/) · [TSv1: Add NPM dependencies](https://www.palantir.com/docs/foundry/functions/add-dependencies/) · [TSv1: Use webhooks](https://www.palantir.com/docs/foundry/functions/webhooks/) · [Functions on objects: Getting started](https://www.palantir.com/docs/foundry/functions/foo-getting-started/) · [Functions on objects: Custom aggregation (TSv1)](https://www.palantir.com/docs/foundry/functions/create-custom-aggregation/) · [Models: Language models in TSv1](https://www.palantir.com/docs/foundry/functions/language-models/) · [Models: Legacy language models](https://www.palantir.com/docs/foundry/functions/language-models-legacy/) · [Unit testing (TSv1): Create stub objects](https://www.palantir.com/docs/foundry/functions/unit-test-stub-objects/) · [Unit testing (TSv1): Verify Ontology edits](https://www.palantir.com/docs/foundry/functions/unit-test-ontology-edits/) · [Unit testing (TSv1): Stub object searches and aggregations](https://www.palantir.com/docs/foundry/functions/unit-test-object-searches/) · [Unit testing (TSv1): Mock dates, timestamps and UUIDs](https://www.palantir.com/docs/foundry/functions/unit-test-dates-timestamps/) · [Unit testing (TSv1): Mock users and groups](https://www.palantir.com/docs/foundry/functions/unit-test-users-groups/) · [Unit testing (TSv1): Debug](https://www.palantir.com/docs/foundry/functions/unit-test-debugging/).

---
[Module index](README.md) · Previous: [04 — Functions on models and LLMs](04-functions-on-models-and-llms.md) · Next module: [10 — Applications](../10-applications/README.md)
