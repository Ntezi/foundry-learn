# Limits and thresholds

*Sources: the pages linked in each row · numbers as read October 21–22, 2026 · compiled October 22, 2026 · Ready for Review*

Every number this area's notes state from the docs, in one place. **Numbers change**: check the linked page before relying on one. Rate tables are summarized; the full tables are in the linked notes.


## Ontology SDK

| What | Value | Docs page | Note |
|---|---|---|---|
| Load pages / iterate, Object Storage v1 | More than **10,000** results throws `ObjectsExceededLimit`; no limit on v2 | [TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md#limits-that-show-up-in-code) |
| Aggregation results | **10,000**, both storage versions | [TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md#limits-that-show-up-in-code) |
| Python `page_size` | Up to **10,000** | [Python OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md#limits-that-show-up-in-code) |
| Java default page size | **1,000** | [Java OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/java-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md) |
| Python versions | **3.10** to **3.14** | [Python OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md#python-and-java-specifics) |
| Unattached uploaded attachment (Python) | Deleted after **one hour** | [Python OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk/) | [01-01](../01-ontology-sdk/01-languages-and-generation.md#python-and-java-specifics) |
| Subscriptions | GA from OSDK **2.1**; one active subscription per query | [TypeScript subscriptions](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-subscriptions/) | [01-02](../01-ontology-sdk/02-subscriptions.md) |
| OSDK 1.x support after 2.0 | At least **one year** | [TypeScript migration](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk-migration/) | [01-03](../01-ontology-sdk/03-migration-testing-and-setup.md) |
| Python OSDK `starts_with` | Removed in **2.75.0** | [Python migration](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk-migration/) | [01-03](../01-ontology-sdk/03-migration-testing-and-setup.md) |

## Developer Console

| What | Value | Docs page | Note |
|---|---|---|---|
| Data resources and restrictions per application | **1,000** by default | [Developer Console](https://www.palantir.com/docs/foundry/developer-console/overview/) | [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md) |
| API-level security enforced | Applications created after **June 1, 2025** | [Application restrictions](https://www.palantir.com/docs/foundry/developer-console/application-restrictions/) | [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md) |
| Runtimes for the quick starts | Node **18+**; Python **≥3.10, <3.15**; Java **17** to **21** | [TypeScript](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-typescript/) · [Python](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-python/) · [Java](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-java/) | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md) |
| Hosted site upload | **1,000** files and **20 MB** per upload | [Hosting an application](https://www.palantir.com/docs/foundry/developer-console/deploy-custom-application-on-foundry/) | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md#hosting-on-foundry) |
| Node.js in the Foundry environment without nvm | **18.20.8** | [Manage Node.js version](https://www.palantir.com/docs/foundry/developer-console/manage-node-version-in-foundry-code-repository/) | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md) |
| Embedded Ontology template sync interval | `10_000` ms | [Embedded ontology](https://www.palantir.com/docs/foundry/developer-console/create-embedded-ontology-application/) | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md#offline-apps-with-the-embedded-ontology) |
| Application metrics | About **24 hours** latency; last **30 days**; hourly points up to **five days** | [Application metrics](https://www.palantir.com/docs/foundry/developer-console/application-metrics/) | [02-03](../02-developer-console-and-apis/03-operating-an-application.md#metrics) |
| Branching OSDK apps | npm TypeScript SDKs on Vite **6, 7 or 8**; `@osdk/client` and the branch plugin **2.77.0+**, `@osdk/cli` **0.104.0+** | [Branching Developer Console applications](https://www.palantir.com/docs/foundry/developer-console/branching-integration/) | [02-03](../02-developer-console-and-apis/03-operating-an-application.md#branching-the-application) |

## Platform APIs

| What | Value | Docs page | Note |
|---|---|---|---|
| Rate limit | **10,000** requests per minute, per user, across all endpoints | [Limits](https://www.palantir.com/docs/foundry/api/v2/general/overview/limits/) | [02-04](../02-developer-console-and-apis/04-platform-apis.md#limits) |
| Concurrency limit | **800** simultaneous requests, per user, across all endpoints | [Limits](https://www.palantir.com/docs/foundry/api/v2/general/overview/limits/) | [02-04](../02-developer-console-and-apis/04-platform-apis.md#limits) |
| *List objects* | **10,000** objects across pages | [Paging](https://www.palantir.com/docs/foundry/api/v2/general/overview/paging/) | [02-04](../02-developer-console-and-apis/04-platform-apis.md#paging) |
| Attachment size | **200 MB** (`AttachmentSizeExceededLimit`) | [Errors](https://www.palantir.com/docs/foundry/api/v2/general/overview/errors/) | [02-04](../02-developer-console-and-apis/04-platform-apis.md#errors) |
| Deprecation notice for stable endpoints | At least **twelve months** | [Versioning](https://www.palantir.com/docs/foundry/api/v2/general/overview/versioning/) | [02-04](../02-developer-console-and-apis/04-platform-apis.md#versioning) |

## Compute modules

| What | Value | Docs page | Note |
|---|---|---|---|
| Container ports | **1024** to **65535**, except **8945** and **8946** | [Container requirements](https://www.palantir.com/docs/foundry/compute-modules/containers/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md) |
| Concurrency per replica | Default **1** | [Scaling](https://www.palantir.com/docs/foundry/compute-modules/scaling/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md#scaling) |
| Autoscaling defaults | Thresholds **0.75**; scale-up delay **1 minute**; scale-down delay **30 minutes** | [Scaling](https://www.palantir.com/docs/foundry/compute-modules/scaling/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md#scaling) |
| Scheduled overrides | **One** per module | [Scaling](https://www.palantir.com/docs/foundry/compute-modules/scaling/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md#scaling) |
| Content directory | At most **100KB**, read-only | [Volumes](https://www.palantir.com/docs/foundry/compute-modules/volumes/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md) |
| Replica lifetime | At most **22 hours** | [Volumes](https://www.palantir.com/docs/foundry/compute-modules/volumes/) | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md) |
| Default replica resources | **1 vCPU, 4 GB**, no GPU | [Compute usage](https://www.palantir.com/docs/foundry/compute-modules/usage/) | [03-03](../03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md#cost) |
| Usage rates | vCPU **0.2**; GPU **1.2** (T4) to **4.7** (H100) | [Compute usage](https://www.palantir.com/docs/foundry/compute-modules/usage/) | [03-03](../03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md#cost) |
| Replica details kept | **7 days** | [Compute module history](https://www.palantir.com/docs/foundry/compute-modules/history/) | [03-03](../03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md) |
| Function version registered | Always **`0.0.0`** | [Functions](https://www.palantir.com/docs/foundry/compute-modules/functions/) | [03-01](../03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md) |

## Pro-code agents

| What | Value | Docs page | Note |
|---|---|---|---|
| Own execution logs | Past **24 hours** (not on CBAC) | [Build a pro-code agent in Foundry](https://www.palantir.com/docs/foundry/agents/create-agent/) | [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md#calling-an-agent) |

## Code Workspaces and VS Code

| What | Value | Docs page | Note |
|---|---|---|---|
| Auto-shutdown | Default **30 minutes**; maximum **6 hours** | [Getting started](https://www.palantir.com/docs/foundry/code-workspaces/getting-started/) | [05-01](../05-development-environments/01-code-workspaces.md#what-a-workspace-is) |
| Session length | At most **24 hours** (also `%%keep_alive`) | [Getting started](https://www.palantir.com/docs/foundry/code-workspaces/getting-started/) | [05-01](../05-development-environments/01-code-workspaces.md#what-a-workspace-is) |
| Default machine maximum | **8 CPUs, 64 GB** | [Interact with data](https://www.palantir.com/docs/foundry/code-workspaces/data/) | [05-01](../05-development-environments/01-code-workspaces.md#what-a-workspace-is) |
| Data checkpoints | Every **10 minutes**; kept up to **30 days** | [Getting started](https://www.palantir.com/docs/foundry/code-workspaces/getting-started/) | [05-01](../05-development-environments/01-code-workspaces.md#saving-work-syncs-and-checkpoints) |
| SQL query default limit | **One million** rows | [Interact with data](https://www.palantir.com/docs/foundry/code-workspaces/data/) | [05-01](../05-development-environments/01-code-workspaces.md#data-in-and-out) |
| Model inference request | **40 MB** (about **100,000** rows); deployments stop after **20 minutes** unused | [Train and interact with models](https://www.palantir.com/docs/foundry/code-workspaces/training-models/) | [05-01](../05-development-environments/01-code-workspaces.md#ontology-models-and-ai) |
| Dash, Streamlit and Shiny start-up | **30 seconds** | [JupyterLab](https://www.palantir.com/docs/foundry/code-workspaces/jupyterlab/) | [05-01](../05-development-environments/01-code-workspaces.md#applications) |
| Usage rates | **0.1** per vCPU; sidecar **0.25 vCPU, 3 GiB**; default VS Code profile (**0.75 CPU, 6 GB**) free | [Compute usage](https://www.palantir.com/docs/foundry/code-workspaces/compute-usage/) | [05-01](../05-development-environments/01-code-workspaces.md#cost) |
| Preview sample | **1000** rows by default | [Preview transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-preview/) | [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md#preview) |
| Local preview result cache | At most **10000** rows | [Security considerations](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/security-considerations/) | [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md#security-of-local-preview) |

## Global Branching

| What | Value | Docs page | Note |
|---|---|---|---|
| Branch inactivity | **35 days** by default; data deleted **7 days** later | [Core concepts](https://www.palantir.com/docs/foundry/global-branching/core-concepts/) | [06-01](../06-branching-and-cross-app/01-global-branching.md#code-and-builds-on-a-branch) |
| Open proposal after moving a resource | Up to **1 day** to show the new policy | [Resource protection](https://www.palantir.com/docs/foundry/global-branching/resource-protection-and-approval-policies/) | [06-01](../06-branching-and-cross-app/01-global-branching.md#protection-and-approval-policies) |
| Drop success toast | Disappears after **750 milliseconds** | [Design guidelines](https://www.palantir.com/docs/foundry/cross-app-interactivity/design-guidelines/) | [06-02](../06-branching-and-cross-app/02-cross-application-interactivity.md#design-guidelines) |

## FoundryTS

| What | Value | Docs page | Note |
|---|---|---|---|
| `Search.series` results | **1** to **10,000** (default 10,000) | [Search](https://www.palantir.com/docs/foundry/foundryts/search-search/) | [07-01](../07-foundryts/01-foundryts.md#getting-a-series) |
| `NodeCollection` defaults | `to_pandas(parallel=4)`; `to_dataframe(numPartitions=16)` | [NodeCollection](https://www.palantir.com/docs/foundry/foundryts/node-collection/) | [07-01](../07-foundryts/01-foundryts.md#collections) |

## Product delivery

| What | Value | Docs page | Note |
|---|---|---|---|
| Product size | **15,000** inputs and outputs combined; warning at **75%** | [Create a product](https://www.palantir.com/docs/foundry/foundry-devops/create-products/) | [08-01](../08-product-delivery/01-devops-products.md#building-a-product) |
| Product group members | Up to **100** | [Product groups](https://www.palantir.com/docs/foundry/foundry-devops/product-groups/) | [08-02](../08-product-delivery/02-stores-groups-and-export.md#product-groups) |
| Stale product version finding | Older than **six months** | [Product groups](https://www.palantir.com/docs/foundry/foundry-devops/product-groups/) | [08-02](../08-product-delivery/02-stores-groups-and-export.md#product-groups) |

---
[Module index](README.md) · [DevTools home](../README.md)
