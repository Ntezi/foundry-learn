# 01 — The toolchain map

*Sources: [Developer toolchain: Overview](https://www.palantir.com/docs/foundry/dev-toolchain/overview/) · checked October 22, 2026 · Ready for Review*

**[Concept]** The **developer toolchain** is everything Foundry offers for building on the Ontology in code: SDKs and APIs to reach it, places to run code, connectors for AI agents, environments to write code in, branching to change things safely, and DevOps and Marketplace to ship the result. The overview page lists the parts; this note sorts them by the job you're trying to do.

## What the overview lists

**[Docs]** Beyond the data-connection and app-building tools documented elsewhere, the toolchain provides:

- **Core APIs and SDKs.** The **Ontology SDK** generates TypeScript, Python and Java code for chosen object types, actions, functions and (with AIP) Logic functions; apps reach it with OAuth as public or confidential clients. The **platform APIs** cover datasets, the filesystem, administration, orchestration, connectivity, SQL and media sets, among others, with **platform SDKs** for Python and TypeScript usable alongside an OSDK.
- **Development environments.** Code Workspaces (VS Code, JupyterLab, RStudio) next to Pipeline Builder and Code Repositories; VS Code workspaces integrated with Developer Console for React apps; Global Branching for end-to-end changes.
- **Palantir MCP**, for AI IDEs and agents to build in the platform, and **Ontology MCP**, which "is designed for ontology consumers": external agents reading and writing production Ontology data.
- **Compute modules**, to run your own containers in any language, and **custom endpoints**, REST endpoints of your own design backed by actions and functions.

## By job

| I need to… | Use | Notes |
|---|---|---|
| Read objects and run actions from my own code | Ontology SDK | [01](../01-ontology-sdk/README.md) |
| Register an app, get tokens, choose scopes | Developer Console | [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md) |
| Host a front end on Foundry, or build one that works offline | Developer Console hosting; embedded Ontology | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md) |
| Manage datasets, builds, users or files from code | Platform APIs and SDKs | [02-04](../02-developer-console-and-apis/04-platform-apis.md) |
| Run code Foundry functions can't (any language, long-running, GPUs) | Compute modules | [03-01](../03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md) |
| Give an outside system a REST path of my own design | Custom endpoints (beta) | [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md) |
| Let an external AI agent use Ontology data | Ontology MCP | [04-01](../04-mcp-and-pro-code-agents/01-ontology-mcp.md) |
| Let my coding assistant build in Foundry | Palantir MCP | [04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md) |
| Write an agent in code | Pro-code agents (beta) | [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md) |
| Analyse data or train a model in a notebook | Code Workspaces (JupyterLab, RStudio) | [05-01](../05-development-environments/01-code-workspaces.md) |
| Write transforms, functions or OSDK apps in VS Code | VS Code workspaces, or the local Palantir extension | [05-02](../05-development-environments/02-vs-code-workspaces.md), [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md) |
| Define the Ontology, functions and app in one repository | SuperRepo and the Foundry CLI (beta) | [05-04](../05-development-environments/04-superrepo-and-foundry-cli.md) |
| Change several resources together and merge after review | Global Branching | [06-01](../06-branching-and-cross-app/01-global-branching.md) |
| Let users drag objects between apps, or sync two apps | Drag and drop, App Pairing, commands | [06-02](../06-branching-and-cross-app/02-cross-application-interactivity.md) |
| Query time series from Python | FoundryTS | [07-01](../07-foundryts/01-foundryts.md) |
| Package resources and install them elsewhere | DevOps and Marketplace | [08](../08-product-delivery/README.md) |

## Three distinctions that trip people up

**[Explanation]**

- **Palantir MCP vs Ontology MCP.** The first is for *builders* (structure: types, pipelines, code); the second for *consumers* (data: objects and actions, as one application's scope allows).
- **Global Branching vs release management.** A branch isolates a change inside one environment; DevOps and Marketplace move versions between environments ([08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#release-management)).
- **Functions vs compute modules vs custom endpoints.** Functions are the default for logic on the Ontology. A compute module is for code that can't be a function. A custom endpoint only changes the **shape** of the call an outside system makes; the logic behind it is still an action or function.

---
[Module index](README.md) · Next: [02 — Kestrel's developer resources](02-kestrels-developer-estate.md)
