# Sources, corrections and open questions

The register for every source used in the DevTools notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about product behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's own wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated** and collected in [99 — Limits and thresholds](99-reference/README.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.

## Register

<!-- register:start -->
### Sidebar inventory (October 21, 2026)

The *Developer toolchain* sidebar was read twice in the built-in browser on October 21, 2026: from the fetched HTML of the overview page and from the live page DOM. Both give **178 links**: 177 documentation pages and the release-notes filter. The *Product delivery* sidebar (overview at `devops/overview/`) gives **24 links**: 23 pages and the release-notes filter. `~/work/dtc/raw.tsv` holds the list; its SHA-256 over titles and paths matches the live extraction.

| Section | Pages |
|---|---|
| Developer toolchain | 1 |
| Ontology SDK | 12 |
| Ontology MCP | 7 |
| Palantir MCP | 7 |
| FoundryTS | 42 |
| SuperRepo | 9 |
| Developer Console | 18 |
| Pro-code agents | 9 |
| Compute modules | 17 |
| Custom Endpoints | 6 |
| Code Workspaces | 14 |
| VS Code workspaces | 6 |
| Palantir extension for Visual Studio Code | 11 |
| Global Branching | 7 |
| Cross-application interactivity | 11 |
| Product delivery | 23 |
| **Total** | **200** |

### API Reference, general pages (October 21, 2026)

A separate sidebar: the API Reference's own navigation, read from the live DOM of `api/v2/general/overview/introduction/`. Only its 8 *General* pages are in scope; the endpoint pages are not.

| Page | Section | Note | Read |
|---|---|---|---|
| [Introduction](https://www.palantir.com/docs/foundry/api/v2/general/overview/introduction/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Authentication](https://www.palantir.com/docs/foundry/api/v2/general/overview/authentication/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/api/v2/general/overview/getting-started/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Software development kit (SDK)](https://www.palantir.com/docs/foundry/api/v2/general/overview/sdks/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Paging](https://www.palantir.com/docs/foundry/api/v2/general/overview/paging/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Versioning](https://www.palantir.com/docs/foundry/api/v2/general/overview/versioning/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Limits](https://www.palantir.com/docs/foundry/api/v2/general/overview/limits/) | API Reference › General | 02-04 Platform APIs | read in full |
| [Errors](https://www.palantir.com/docs/foundry/api/v2/general/overview/errors/) | API Reference › General | 02-04 Platform APIs | read in full |

### Pages and notes

| Page | Section | Note | Read |
|---|---|---|---|
| [Overview](https://www.palantir.com/docs/foundry/dev-toolchain/overview/) | Developer toolchain | 00-01 The toolchain map | read in full |
| [Overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [Java OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/java-osdk/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [Python OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [Python OSDK migration guide](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk-migration/) | Ontology SDK | 01-03 Migration, testing and setup | read in full |
| [TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [TypeScript OSDK migration guide](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk-migration/) | Ontology SDK | 01-03 Migration, testing and setup | read in full |
| [Unit testing TypeScript OSDK code](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk-testing/) | Ontology SDK | 01-03 Migration, testing and setup | read in full |
| [Generate OSDK for other languages](https://www.palantir.com/docs/foundry/ontology-sdk/generate-osdk-for-other-languages/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [Subscribe to Ontology changes with the TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-subscriptions/) | Ontology SDK | 01-02 Subscriptions | read in full |
| [Subscribe to Ontology changes via WebSocket](https://www.palantir.com/docs/foundry/ontology-sdk/websocket-subscriptions/) | Ontology SDK | 01-02 Subscriptions | read in full |
| [Unsupported types for OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/unsupported-types/) | Ontology SDK | 01-01 Languages and generation | read in full |
| [Add an OSDK to a bootstrapped repository](https://www.palantir.com/docs/foundry/ontology-sdk/add-osdk-to-bootstrapped-repository/) | Ontology SDK | 01-03 Migration, testing and setup | read in full |
| [Overview](https://www.palantir.com/docs/foundry/ontology-mcp/overview/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Sample architecture](https://www.palantir.com/docs/foundry/ontology-mcp/sample-architecture/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/ontology-mcp/getting-started/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Authentication and authorization](https://www.palantir.com/docs/foundry/ontology-mcp/authentication-and-authorization/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [MCP tools and agent configuration](https://www.palantir.com/docs/foundry/ontology-mcp/mcp-tools-and-agent-configuration/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Debugging with MCP Inspector](https://www.palantir.com/docs/foundry/ontology-mcp/debugging-with-mcp-inspector/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Example MCP workflows](https://www.palantir.com/docs/foundry/ontology-mcp/example-mcp-workflows/) | Ontology MCP | 04-01 Ontology MCP | read in full |
| [Overview](https://www.palantir.com/docs/foundry/palantir-mcp/overview/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Installation](https://www.palantir.com/docs/foundry/palantir-mcp/installation/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/palantir-mcp/getting-started/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Example MCP workflows](https://www.palantir.com/docs/foundry/palantir-mcp/example-mcp-workflows/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Available tools](https://www.palantir.com/docs/foundry/palantir-mcp/available-tools/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Tool search](https://www.palantir.com/docs/foundry/palantir-mcp/tool-search/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Security](https://www.palantir.com/docs/foundry/palantir-mcp/security/) | Palantir MCP | 04-02 Palantir MCP | read in full |
| [Overview](https://www.palantir.com/docs/foundry/foundryts/overview/) | FoundryTS | 07-01 FoundryTS | read in full |
| [FoundryTS](https://www.palantir.com/docs/foundry/foundryts/foundryts/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [Interval](https://www.palantir.com/docs/foundry/foundryts/interval/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [NodeCollection](https://www.palantir.com/docs/foundry/foundryts/node-collection/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [functions.cumulative_aggregate](https://www.palantir.com/docs/foundry/foundryts/functions-cumulative-aggregate/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.derivative](https://www.palantir.com/docs/foundry/foundryts/functions-derivative/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.distribution](https://www.palantir.com/docs/foundry/foundryts/functions-distribution/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.dsl](https://www.palantir.com/docs/foundry/foundryts/functions-dsl/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.exponential_regression](https://www.palantir.com/docs/foundry/foundryts/functions-exponential-regression/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.first_point](https://www.palantir.com/docs/foundry/foundryts/functions-first-point/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.integral](https://www.palantir.com/docs/foundry/foundryts/functions-integral/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.interpolate](https://www.palantir.com/docs/foundry/foundryts/functions-interpolate/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.last_point](https://www.palantir.com/docs/foundry/foundryts/functions-last-point/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.linear_regression](https://www.palantir.com/docs/foundry/foundryts/functions-linear-regression/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.mean](https://www.palantir.com/docs/foundry/foundryts/functions-mean/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.periodic_aggregate](https://www.palantir.com/docs/foundry/foundryts/functions-periodic-aggregate/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.points](https://www.palantir.com/docs/foundry/foundryts/functions-points/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.polynomial_regression](https://www.palantir.com/docs/foundry/foundryts/functions-polynomial-regression/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.rolling_aggregate](https://www.palantir.com/docs/foundry/foundryts/functions-rolling-aggregate/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.scale](https://www.palantir.com/docs/foundry/foundryts/functions-scale/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.scatter](https://www.palantir.com/docs/foundry/foundryts/functions-scatter/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.series](https://www.palantir.com/docs/foundry/foundryts/functions-series/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.skip_nonfinite](https://www.palantir.com/docs/foundry/foundryts/functions-skip-nonfinite/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.statistics](https://www.palantir.com/docs/foundry/foundryts/functions-statistics/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.sum](https://www.palantir.com/docs/foundry/foundryts/functions-sum/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.time_extent](https://www.palantir.com/docs/foundry/foundryts/functions-time-extent/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.time_range](https://www.palantir.com/docs/foundry/foundryts/functions-time-range/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.time_series_search](https://www.palantir.com/docs/foundry/foundryts/functions-time-series-search/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.time_shift](https://www.palantir.com/docs/foundry/foundryts/functions-time-shift/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.time_weighted](https://www.palantir.com/docs/foundry/foundryts/functions-time-weighted/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.timestamp_scale](https://www.palantir.com/docs/foundry/foundryts/functions-timestamp-scale/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.udf](https://www.palantir.com/docs/foundry/foundryts/functions-udf/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.unit_conversion](https://www.palantir.com/docs/foundry/foundryts/functions-unit-conversion/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.value_shift](https://www.palantir.com/docs/foundry/foundryts/functions-value-shift/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [functions.where](https://www.palantir.com/docs/foundry/foundryts/functions-where/) | FoundryTS › API Reference | 99 FoundryTS functions | not yet read |
| [nodes.FunctionNode](https://www.palantir.com/docs/foundry/foundryts/nodes-function-node/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [nodes.SummarizerNode](https://www.palantir.com/docs/foundry/foundryts/nodes-summarizer-node/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [objects.FoundryObject](https://www.palantir.com/docs/foundry/foundryts/objects-foundry-object/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [objects.Object](https://www.palantir.com/docs/foundry/foundryts/objects-object/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [search.Property](https://www.palantir.com/docs/foundry/foundryts/search-property/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [search.Search](https://www.palantir.com/docs/foundry/foundryts/search-search/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [search.ontology](https://www.palantir.com/docs/foundry/foundryts/search-ontology/) | FoundryTS › API Reference | 07-01 FoundryTS | read in full |
| [Overview](https://www.palantir.com/docs/foundry/superrepo/overview/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/superrepo/core-concepts/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Create a SuperRepo](https://www.palantir.com/docs/foundry/superrepo/create-a-superrepo/) | SuperRepo › Development | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Foundry CLI](https://www.palantir.com/docs/foundry/superrepo/foundry-cli/) | SuperRepo › Development | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Tutorial: Develop with a SuperRepo](https://www.palantir.com/docs/foundry/superrepo/tutorial-develop-with-a-superrepo/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Prepare for your first deployment](https://www.palantir.com/docs/foundry/superrepo/prepare-first-deploy/) | SuperRepo › Deployment | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Advanced workflows](https://www.palantir.com/docs/foundry/superrepo/advanced-workflows/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Coming in the future](https://www.palantir.com/docs/foundry/superrepo/in-development/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [FAQ](https://www.palantir.com/docs/foundry/superrepo/faq/) | SuperRepo | 05-04 SuperRepo and the Foundry CLI | read in full |
| [Overview](https://www.palantir.com/docs/foundry/developer-console/overview/) | Developer Console | 02-01 Applications, scopes and restrictions | read in full |
| [Hosting an application on Foundry](https://www.palantir.com/docs/foundry/developer-console/deploy-custom-application-on-foundry/) | Developer Console › Core concepts | 02-02 Bootstrapping and hosting | read in full |
| [Application restrictions](https://www.palantir.com/docs/foundry/developer-console/application-restrictions/) | Developer Console › Core concepts | 02-01 Applications, scopes and restrictions | read in full |
| [Permissions](https://www.palantir.com/docs/foundry/developer-console/permissions/) | Developer Console › Core concepts | 02-01 Applications, scopes and restrictions | read in full |
| [Ontology MCP](https://www.palantir.com/docs/foundry/developer-console/ontology-mcp/) | Developer Console › Core concepts | 04-01 Ontology MCP | read in full |
| [Application metrics](https://www.palantir.com/docs/foundry/developer-console/application-metrics/) | Developer Console › Core concepts | 02-03 Operating an application | read in full |
| [Install an application with Marketplace](https://www.palantir.com/docs/foundry/developer-console/marketplace-installation/) | Developer Console › Core concepts | 02-03 Operating an application | read in full |
| [Branching Developer Console applications](https://www.palantir.com/docs/foundry/developer-console/branching-integration/) | Developer Console › Core concepts | 02-03 Operating an application | read in full |
| [Standalone OAuth clients (legacy)](https://www.palantir.com/docs/foundry/developer-console/oauth-clients/) | Developer Console › Core concepts | 02-01 Applications, scopes and restrictions | read in full |
| [Create a new application](https://www.palantir.com/docs/foundry/developer-console/create-application/) | Developer Console › How-to guides | 02-01 Applications, scopes and restrictions | read in full |
| [Bootstrap a TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-typescript/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Bootstrap a Python application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-python/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Bootstrap a Java application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-java/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Bootstrap a back-end TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-server-side-typescript/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Add OSDK to an existing application](https://www.palantir.com/docs/foundry/developer-console/how-to-add-to-existing-typescript/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Create an offline-capable application with the embedded ontology](https://www.palantir.com/docs/foundry/developer-console/create-embedded-ontology-application/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Create an application in a different organization](https://www.palantir.com/docs/foundry/developer-console/how-to-create-backend-service-app-different-org/) | Developer Console › How-to guides | 02-01 Applications, scopes and restrictions | read in full |
| [Manage Node.js version in a Foundry code repository](https://www.palantir.com/docs/foundry/developer-console/manage-node-version-in-foundry-code-repository/) | Developer Console › How-to guides | 02-02 Bootstrapping and hosting | read in full |
| [Overview](https://www.palantir.com/docs/foundry/agents/overview/) | Pro-code agents | 04-03 Pro-code agents | read in full |
| [Use cases for pro-code agents](https://www.palantir.com/docs/foundry/agents/use-cases/) | Pro-code agents | 04-03 Pro-code agents | read in full |
| [Scoped permissions for pro-code agents](https://www.palantir.com/docs/foundry/agents/scoped-permissions/) | Pro-code agents › Core concepts | 04-03 Pro-code agents | read in full |
| [Pro-code agent templates](https://www.palantir.com/docs/foundry/agents/agent-templates/) | Pro-code agents › Core concepts | 04-03 Pro-code agents | read in full |
| [Develop pro-code agents on a global branch](https://www.palantir.com/docs/foundry/agents/branching/) | Pro-code agents › Core concepts | 04-03 Pro-code agents | read in full |
| [Connect pro-code agents to external systems](https://www.palantir.com/docs/foundry/agents/sources/) | Pro-code agents › Core concepts | 04-03 Pro-code agents | read in full |
| [Publish and call a pro-code agent](https://www.palantir.com/docs/foundry/agents/publish-and-call/) | Pro-code agents › Core concepts | 04-03 Pro-code agents | read in full |
| [Build a pro-code agent in Foundry](https://www.palantir.com/docs/foundry/agents/create-agent/) | Pro-code agents › How-to guides | 04-03 Pro-code agents | read in full |
| [Build a pro-code agent with Continue](https://www.palantir.com/docs/foundry/agents/build-agent-continue/) | Pro-code agents › How-to guides | 04-03 Pro-code agents | read in full |
| [Overview](https://www.palantir.com/docs/foundry/compute-modules/overview/) | Compute modules | 03-01 Compute module concepts | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/compute-modules/get-started/) | Compute modules | 03-01 Compute module concepts | read in full |
| [Python SDK](https://www.palantir.com/docs/foundry/compute-modules/python-sdk/) | Compute modules › SDKs | 03-02 Configuration and SDKs | read in full |
| [Java SDK](https://www.palantir.com/docs/foundry/compute-modules/java-sdk/) | Compute modules › SDKs | 03-02 Configuration and SDKs | read in full |
| [TypeScript SDK](https://www.palantir.com/docs/foundry/compute-modules/typescript-sdk/) | Compute modules › SDKs | 03-02 Configuration and SDKs | read in full |
| [Execution modes](https://www.palantir.com/docs/foundry/compute-modules/execution-modes/) | Compute modules › Configuration | 03-01 Compute module concepts | read in full |
| [Containers](https://www.palantir.com/docs/foundry/compute-modules/containers/) | Compute modules › Configuration | 03-02 Configuration and SDKs | read in full |
| [Probes](https://www.palantir.com/docs/foundry/compute-modules/probes/) | Compute modules › Configuration | 03-02 Configuration and SDKs | read in full |
| [Scaling](https://www.palantir.com/docs/foundry/compute-modules/scaling/) | Compute modules › Configuration | 03-02 Configuration and SDKs | read in full |
| [Sources](https://www.palantir.com/docs/foundry/compute-modules/sources/) | Compute modules › Configuration | 03-02 Configuration and SDKs | read in full |
| [Volumes](https://www.palantir.com/docs/foundry/compute-modules/volumes/) | Compute modules › Configuration | 03-02 Configuration and SDKs | read in full |
| [Functions](https://www.palantir.com/docs/foundry/compute-modules/functions/) | Compute modules › Configuration | 03-01 Compute module concepts | read in full |
| [OSDK integration](https://www.palantir.com/docs/foundry/compute-modules/osdk-integration/) | Compute modules | 03-02 Configuration and SDKs | read in full |
| [Create a custom compute module client (Advanced)](https://www.palantir.com/docs/foundry/compute-modules/advanced-custom-client/) | Compute modules | 03-02 Configuration and SDKs | read in full |
| [Debugging](https://www.palantir.com/docs/foundry/compute-modules/debugging/) | Compute modules | 03-03 Debugging, history and cost | read in full |
| [Compute module history](https://www.palantir.com/docs/foundry/compute-modules/history/) | Compute modules | 03-03 Debugging, history and cost | read in full |
| [Usage and pricing](https://www.palantir.com/docs/foundry/compute-modules/usage/) | Compute modules | 03-03 Debugging, history and cost | read in full |
| [Overview](https://www.palantir.com/docs/foundry/custom-endpoints/overview/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/custom-endpoints/core-concepts/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Create an endpoint set](https://www.palantir.com/docs/foundry/custom-endpoints/create-endpoint-set/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Define custom endpoints](https://www.palantir.com/docs/foundry/custom-endpoints/define-endpoints/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Publish and deploy an endpoint set](https://www.palantir.com/docs/foundry/custom-endpoints/publish/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Use custom endpoints in your applications](https://www.palantir.com/docs/foundry/custom-endpoints/use-custom-endpoints/) | Custom Endpoints | 03-04 Custom endpoints | read in full |
| [Overview](https://www.palantir.com/docs/foundry/code-workspaces/overview/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Code viewer](https://www.palantir.com/docs/foundry/code-workspaces/code-viewer/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/code-workspaces/getting-started/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Interact with data](https://www.palantir.com/docs/foundry/code-workspaces/data/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Interact with external systems](https://www.palantir.com/docs/foundry/code-workspaces/external-systems/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Interact with the Ontology](https://www.palantir.com/docs/foundry/code-workspaces/ontology/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Train and interact with models](https://www.palantir.com/docs/foundry/code-workspaces/training-models/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [JupyterLab®](https://www.palantir.com/docs/foundry/code-workspaces/jupyterlab/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [RStudio® Workbench](https://www.palantir.com/docs/foundry/code-workspaces/rstudio/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Palantir-provided models](https://www.palantir.com/docs/foundry/code-workspaces/palantir-provided-models/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Security](https://www.palantir.com/docs/foundry/code-workspaces/security/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [FAQ](https://www.palantir.com/docs/foundry/code-workspaces/code-workspaces-faq/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Troubleshooting](https://www.palantir.com/docs/foundry/code-workspaces/troubleshooting/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Compute usage](https://www.palantir.com/docs/foundry/code-workspaces/compute-usage/) | Code Workspaces | 05-01 Code Workspaces | read in full |
| [Overview](https://www.palantir.com/docs/foundry/vs-code/overview/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [Choose between local development and VS Code workspaces](https://www.palantir.com/docs/foundry/vs-code/local-vs-workspace-guide/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [Benefits of VS Code workspaces](https://www.palantir.com/docs/foundry/vs-code/benefits/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [Global Branching](https://www.palantir.com/docs/foundry/vs-code/global-branching/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [AI development tools](https://www.palantir.com/docs/foundry/vs-code/ai-development-tools/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [Troubleshooting](https://www.palantir.com/docs/foundry/vs-code/troubleshooting/) | VS Code workspaces | 05-02 VS Code workspaces | read in full |
| [Overview](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/overview/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Feature list](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/extension-features/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Preview transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-preview/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Active Preview](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/active-preview/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Debug transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/debug-transforms/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Build transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-build/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Code-defined input filtering](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/code-defined-filtering/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Transforms type hints](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-type-hints/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Python libraries](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/python-libraries/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Environment debugger](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/environment-debugger/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Security considerations for local development](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/security-considerations/) | Palantir extension for Visual Studio Code | 05-03 The Palantir extension for VS Code | read in full |
| [Overview](https://www.palantir.com/docs/foundry/global-branching/overview/) | Global Branching | 06-01 Global Branching | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/global-branching/core-concepts/) | Global Branching | 06-01 Global Branching | read in full |
| [Integrations](https://www.palantir.com/docs/foundry/global-branching/integrations/) | Global Branching | 06-01 Global Branching | read in full |
| [Branch security](https://www.palantir.com/docs/foundry/global-branching/branch-security/) | Global Branching | 06-01 Global Branching | read in full |
| [Resource protection and approval policies](https://www.palantir.com/docs/foundry/global-branching/resource-protection-and-approval-policies/) | Global Branching | 06-01 Global Branching | read in full |
| [Global Branching application](https://www.palantir.com/docs/foundry/global-branching/application/) | Global Branching › Navigation | 06-01 Global Branching | read in full |
| [Branch taskbar](https://www.palantir.com/docs/foundry/global-branching/branch-taskbar/) | Global Branching › Navigation | 06-01 Global Branching | read in full |
| [Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/overview/) | Cross-application interactivity | 06-02 Cross-application interactivity | read in full |
| [App Pairing widget](https://www.palantir.com/docs/foundry/cross-app-interactivity/app-pairing/) | Cross-application interactivity › App Pairing | 06-02 Cross-application interactivity | read in full |
| [Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/drag-and-drop-overview/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Drag and drop between Ontology SDK applications](https://www.palantir.com/docs/foundry/cross-app-interactivity/osdk-drag-and-drop/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Create a drag-and-drop integration point](https://www.palantir.com/docs/foundry/cross-app-interactivity/tutorial/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Drag and drop between Foundry and Gotham](https://www.palantir.com/docs/foundry/cross-app-interactivity/enrichment-reference/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Implement drag and drop between Foundry and Gotham](https://www.palantir.com/docs/foundry/cross-app-interactivity/enrichment-tutorial/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Design guidelines](https://www.palantir.com/docs/foundry/cross-app-interactivity/design-guidelines/) | Cross-application interactivity › Drag and drop | 06-02 Cross-application interactivity | read in full |
| [Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/commands-overview/) | Cross-application interactivity › Commands | 06-02 Cross-application interactivity | read in full |
| [Objects](https://www.palantir.com/docs/foundry/cross-app-interactivity/objects/) | Cross-application interactivity › Media types reference | 06-02 Cross-application interactivity | read in full |
| [Object sets](https://www.palantir.com/docs/foundry/cross-app-interactivity/object-sets/) | Cross-application interactivity › Media types reference | 06-02 Cross-application interactivity | read in full |
| [Overview](https://www.palantir.com/docs/foundry/devops/overview/) | Product delivery | 08-01 DevOps products | read in full |
| [Core concepts](https://www.palantir.com/docs/foundry/devops/core-concepts/) | Product delivery | 08-01 DevOps products | read in full |
| [Overview](https://www.palantir.com/docs/foundry/marketplace/overview/) | Product delivery › Marketplace | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Getting started](https://www.palantir.com/docs/foundry/marketplace/getting-started/) | Product delivery › Marketplace | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Browse products](https://www.palantir.com/docs/foundry/marketplace/browse-products/) | Product delivery › Marketplace › Products | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Install a product](https://www.palantir.com/docs/foundry/marketplace/install-product/) | Product delivery › Marketplace › Products | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Foundry products](https://www.palantir.com/docs/foundry/marketplace/foundry-products/) | Product delivery › Marketplace › Products | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Installations](https://www.palantir.com/docs/foundry/marketplace/installations/) | Product delivery › Marketplace | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Upgrades](https://www.palantir.com/docs/foundry/marketplace/upgrades/) | Product delivery › Marketplace | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Overview](https://www.palantir.com/docs/foundry/foundry-devops/overview/) | Product delivery › Foundry DevOps | 08-01 DevOps products | read in full |
| [Create a product](https://www.palantir.com/docs/foundry/foundry-devops/create-products/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Linked products](https://www.palantir.com/docs/foundry/foundry-devops/linked-products/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Package multiple products](https://www.palantir.com/docs/foundry/foundry-devops/package-multiple-products/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Manage products](https://www.palantir.com/docs/foundry/foundry-devops/manage-products/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Track a source folder](https://www.palantir.com/docs/foundry/foundry-devops/folder-tracking/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Input presets](https://www.palantir.com/docs/foundry/foundry-devops/input-presets/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Supported resources](https://www.palantir.com/docs/foundry/foundry-devops/supported-resources/) | Product delivery › Foundry DevOps › Products | 08-01 DevOps products | read in full |
| [Overview](https://www.palantir.com/docs/foundry/foundry-devops/product-groups/) | Product delivery › Foundry DevOps › Product groups | 08-02 Stores, product groups and export | read in full |
| [Manage store permissions](https://www.palantir.com/docs/foundry/foundry-devops/manage-store-permissions/) | Product delivery › Foundry DevOps › Stores | 08-02 Stores, product groups and export | read in full |
| [Manage store tags](https://www.palantir.com/docs/foundry/foundry-devops/manage-store-tags/) | Product delivery › Foundry DevOps › Stores | 08-02 Stores, product groups and export | read in full |
| [Export and import products](https://www.palantir.com/docs/foundry/foundry-devops/export-import-products/) | Product delivery › Foundry DevOps › Stores | 08-02 Stores, product groups and export | read in full |
| [Overview](https://www.palantir.com/docs/foundry/devops-release-management/overview/) | Product delivery › Release management | 08-03 Marketplace installs, upgrades and releases | read in full |
| [Use DevOps for release management](https://www.palantir.com/docs/foundry/devops-release-management/use-devops-for-release-management/) | Product delivery › Release management | 08-03 Marketplace installs, upgrades and releases | read in full |
<!-- register:end -->

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 21, 2026 | Plan | Self-review, 7 fixes: Orientation is 1 page, not 3 (phase totals 39 and 23); overlap list completed (Ontology 06, 12-04, 14-05); Apps 04-01 and 07-02 added as branching overlaps; Developer Console *Ontology MCP* page moved to 04-01 and *Install an application with Marketplace* linked to 08; Ontology MCP candidate to be checked against Ontology 16-03; sidebar count marked provisional until the live recount; API Reference pages registered separately |
| Oct 21, 2026 | Structure | Live-DOM recount matches the fetched sidebars (178 + 24 links). FoundryTS has **31** `functions.*` pages, not 32 as the plan said |
| Oct 22, 2026 | Structure review | 4 fixes: `build.sh` runs the docs index before the module READMEs (99 README showed the index as Not Started); 09-03 builds on Ontology 14-04's *Kestrel Delivery Desk* v1.0 spec; 09-01 framed as Daniel's 10-04 design built out, and module 09 links Ontology 10-04, 14-04, 17-02; Intro course 14 linked from 01 and 02 only |
| Oct 22, 2026 | Phase 3 | Read 38 pages in full (00 overview, 01, 02 minus the Developer Console *Ontology MCP* page, which is read with module 04). 7 notes. Quotes and numbers matched by script against the page text: 2 quotes corrected to the doc wording (authentication page's "We are likely to change this behavior in the future"; restrictions page's "minimizes cases of privilege escalation"), 7 phrases of ours moved from quotes to italics. Kestrel storage version softened to an assumption (01-01); a Kestrel example that treated `Order.status` values as API enum values removed (02-04). RQ-01 to RQ-03 opened |
| Oct 22, 2026 | Phase 3 self-review | 5 fixes: **[Observed]** (our enrollment) replaced by **[Explanation]** in 01-01 and 02-02; four module-01 links retargeted from the 02 README to the notes; 02-02 offline example reframed for Accra warehouse staff (Kestrel has no drivers); 02-04 nightly export moved to its own application; 02-01 Kestrel table notes the automatically added backing datasets |
| Oct 22, 2026 | Phase 4 | Read 47 pages in full (03, 04, and the Developer Console *Ontology MCP* page held over from Phase 3). 7 notes. 21 quotes and 35 numbers matched by script: 1 quote corrected to the doc wording ("We do not provide destructive write tools"), 4 phrases of ours moved to italics. Kestrel claims tightened: `kestrel-pay-llm`'s execution mode marked as assumed, its minimum replica tied to AIP 02-02's requirement, the cost-view sentence aligned with AIP 02-01; OMCP per-property claim softened to "not documented". "AIP Agent Studio" corrected to AIP Chatbot Studio (formerly Agent Studio) in 04-03 and MAP. RQ-04 to RQ-06 opened |
| Oct 22, 2026 | Phase 4 self-review | 4 fixes: 03-02 `kestrel-pay-llm` probe and override marked as proposed settings for 17-02 (03-03 cost example says so); 04-02 local Palantir MCP made conditional on Kestrel's provider agreement, which the model doesn't record; 04-03 build-fixing agent tied to a dataset behind `Shipment`; 04-01 adds 16-03's pinning rule (`draftDelayMessage` blocked until OMCP pinning is shown) |
| Oct 22, 2026 | Phase 5 | Read 100 pages in full (05, 06, 07 and the 31 FoundryTS function pages). 7 notes and the FoundryTS functions table. 25 quotes and 19 multi-digit numbers matched by script; 2 phrases of ours moved from quotes to italics (15-01's *above 8 °C for 10 minutes*, *output* in RQ-09). Kestrel claims tightened while drafting: Priya's transform language marked as not recorded (05-02); the Delivery Desk's front end corrected to Workshop, not React, in the SuperRepo decision, and an unsupported offline-app suggestion removed (05-04); the extension example moved from *Full dataset* to *Code-defined filters* (05-03); the App Pairing example reworded, since map selections aren't proposals (06-02); 06-01 examples no longer assume a repository name or Priya's work on Daniel's branch. RQ-07 to RQ-09 opened |
| Oct 22, 2026 | Phase 5 self-review | 4 fixes: 07-01 `time_range` example uses `datetime` objects (strings are read as durations); 05-03 local preview off marked *proposed* for 17-02; 05-01 delay-risk training in JupyterLab marked *considered, not adopted* (not recorded in 15-03); 05-02 default-profile advice relabelled [Recommendation] |
| Oct 22, 2026 | Phase 6 | Read 23 Product delivery pages in full, and re-read the toolchain overview page (read in Phase 3). 5 notes: 08-01 to 08-03, 00-01, 00-02. 2 quotes and the numbers, operation names and UI labels used matched by script. Written to extend Ontology 14-04 and 14-05 rather than repeat them. 1 link anchor fixed (AIP 02-01 *Kestrel Pay's decision*). RQ-10 opened |
| Oct 22, 2026 | Phase 6 self-review | 4 fixes: Ontology 14-05's SuperRepo column now points to 05-04, with its TypeScript v2, locked-types and beta limits; 08-03 notes that automatic upgrades are beta; 08-03 says *once per environment*, not per space; 00-02 marks the portal subscription design *proposed* |
| Oct 22, 2026 | Phase 7 | 6 notes: 09-01 to 09-03 (build records, no new doc pages), 10-01 (37 questions), the limits list and the decision guide (5 flowcharts). 31 limits re-checked against the live pages by script: 3 rows pointed at the wrong page (replica history, agent logs, the 1,000-resource limit) and 1 page path was wrong (branching Developer Console applications); all corrected. 3 phrases in 10-01 changed from quote marks to italics or to the docs' exact wording. Kestrel decisions adopted into Ontology 17-02; *proposed* markers in 03-02, 05-03, 06-01, 07-01, 08-01, 08-02 and 00-02 updated to *adopted*, and 08-03's open point resolved in 09-03 (functions packaged without their repositories) |
| Oct 22, 2026 | Phase 7 self-review | 4 fixes: 17-02 says Python transforms in VS Code workspaces (Java would stay in Code Repositories); 09-03 adds the middle-channel tag before test upgrades; decision guide 5 splits Foundry products from export and import; API limits say per user, across all endpoints |
| Oct 22, 2026 | Phase 8 (quality review) | All 208 in-scope pages re-fetched from the live site. 68 quotes across every note, the glossary and the open questions matched the page text (0 mismatches). Bold doc numbers matched per note against that note's own source pages (144 numbers, 25 notes) and per row in the limits list (51 rows): 2 sourcing gaps fixed (05-02's free default profile now links *Compute usage*; the limits list's runtime row now links the Python and Java quick starts). Cross-note checks: branch lifecycle (35/7 days), release-channel names (RQ-10 only), `DELETED`/`REMOVED` (RQ-02 only), *AIP Chatbot Studio* naming, labels and headers. Links 682 files, 0 problems; 10 diagrams parse |

## Open research questions

| ID | Question | Status |
|---|---|---|
| RQ-01 | **Doc conflict.** *Unsupported types for OSDK* lists Marking and Vector as unsupported Python property types (skipped at generation), but the *Python OSDK* reference reads both inside `AllowBetaFeatures`, and the Python migration guide lists them as beta features. Does generation skip them unless something enables beta support, or is the unsupported-types page out of date? | Open (Oct 22). Seen in [01-01](01-ontology-sdk/01-languages-and-generation.md#what-wont-generate) |
| RQ-02 | **Doc conflict.** The TypeScript subscriptions page names the second update state `DELETED`; the WebSocket page, which the TypeScript `.subscribe` uses underneath, names it `REMOVED` and says it also covers objects that stop matching the filter. Does a TypeScript `DELETED` update also fire when an object leaves the filter? | Open (Oct 22). Seen in [01-02](01-ontology-sdk/02-subscriptions.md#where-the-two-pages-differ) |
| RQ-03 | **Doc conflict.** *Application restrictions* says a token request with no scope restrictions "will generate a token with no permissions", yet says an unrestricted client-credentials application with no requested scope gets every operation its service user has. Which wins, and does the first rule apply only to the authorization code grant? | Open (Oct 22). Seen in [02-01](02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#what-happens-when-no-scope-is-requested) |
| RQ-04 | **Doc conflict.** *Use custom endpoints in your applications* says custom endpoints work only with **unrestricted** Developer Console applications, then says to add the endpoints' backing functions and actions to the application's **resource access restrictions**, which unrestricted applications don't have. Which is it, and what bounds an unrestricted caller beyond its user's permissions? | Open (Oct 22). Seen in [03-04](03-compute-modules-and-custom-endpoints/04-custom-endpoints.md#calling-from-an-application) |
| RQ-05 | **Doc conflict.** Palantir MCP's security page says "We do not provide destructive write tools" and that writes are non-destructive or need human approval, but the tool list includes `manage_health_check`, which "creates, updates, or deletes health checks" with no proposal step (Ontology deletions are on a branch and go through a proposal). Is health-check deletion gated somewhere? | Open (Oct 22). Seen in [04-02](04-mcp-and-pro-code-agents/02-palantir-mcp.md#security-and-data-flow) |
| RQ-06 | **Doc conflict.** For Microsoft Copilot Studio, *MCP tools and agent configuration* says to create the app as **Backend service** with **User's permissions** and that this "will create the required service user". *Permissions* ties service users to **application** permissions (client credentials). Does a backend-service app with user permissions get a service user, and what is it used for? | Open (Oct 22). Seen in [04-01](04-mcp-and-pro-code-agents/01-ontology-mcp.md#authentication) |
| RQ-07 | **Doc conflict.** In *Preview transforms*, footnote 2 to the feature table says "Model input and output preview is supported in both VS Code workspaces and local development", then "Model input preview is only supported in VS Code workspaces". Which model previews work locally? | Open (Oct 22). Seen in [05-03](05-development-environments/03-palantir-extension-for-vs-code.md#preview) |
| RQ-08 | **Missing reference.** *Interact with the Ontology* (Code Workspaces) reads time series properties with `from foundryts import TimeSeries` and `TimeSeries.from_osdk(...)`, but the FoundryTS API reference has no `TimeSeries` class; its documented entry points are `Object(...).id(...).property(...)`, `functions.series` and `FoundryTS.search`. Is `TimeSeries` part of the same library, and what does it return? | Open (Oct 22). Seen in [07-01](07-foundryts/01-foundryts.md#where-it-runs) |
| RQ-09 | **Doc conflict.** *JupyterLab* says Dash and Streamlit apps can use restricted views as inputs and be published from a workspace in restricted outputs mode, each user seeing only permitted data. *Interact with data* says restricted outputs mode "prevents publishing outputs that derive from those views", and *Security* says it blocks writes to all Foundry outputs. Is a published application not an *output* here? | Open (Oct 22). Seen in [05-01](05-development-environments/01-code-workspaces.md#security) |
| RQ-10 | **Doc conflict.** *Manage products* names the release channels **Release**, **Pre-stable** and **Stable**; *Upgrades* names them **Release**, **Test** and **Stable**, with the same nesting. Is *Test* the old name for *Pre-stable*, or are they different channels? | Open (Oct 22). Seen in [08-01](08-product-delivery/01-devops-products.md#versions-channels-and-retirement) |

---
[DevTools home](README.md) · [Topic map](MAP.md) · [Glossary](GLOSSARY.md)
