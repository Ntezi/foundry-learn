# Decision guide

*Sources: the notes each branch links to · compiled October 22, 2026 · Ready for Review. The flowcharts are ours; every leaf links to the note with the docs' wording.*

Five decisions that come up on almost every developer-toolchain project, as flowcharts. Each ends at the note to read next.

## 1. Which tool runs the code?

```mermaid
flowchart TD
    A{Does the code read or write<br/>only your Ontology?} -- yes --> B{Does it run inside Foundry?}
    B -- "yes, as logic on objects" --> F["Function, not this area (Ontology 09)"]
    B -- "no, in your own app" --> O["Ontology SDK (01-01)"]
    A -- "no: datasets, builds, users, files" --> P["Platform APIs and SDKs (02-04)"]
    F -. "can't be a function: another language,<br/>long-running, a model host" .-> C["Compute module (03-01)"]
    O -. "the caller needs a fixed REST shape" .-> E["Custom endpoint, beta (03-04)"]
```

[Ontology 09](../../Ontology/09-functions/README.md) · [01-01](../01-ontology-sdk/01-languages-and-generation.md) · [02-04](../02-developer-console-and-apis/04-platform-apis.md) · [03-01](../03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md) · [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md)

## 2. Which application type and grant?

```mermaid
flowchart TD
    A{Are the users Foundry users?} -- yes --> B{Does the code run in a browser,<br/>desktop or mobile app?}
    B -- yes --> CF["Client-facing · user permissions ·<br/>authorization code (02-01)"]
    B -- "no, a server" --> BU["Backend service · user permissions,<br/>or both permission types (02-01)"]
    A -- "no, or it's a batch job" --> BS["Backend service · application permissions ·<br/>client credentials · a service user (02-01)"]
    CF --> R{Do you know every resource<br/>it needs at build time?}
    BU --> R
    BS --> R
    R -- yes --> RS["Restricted (the default) (02-01)"]
    R -- no --> UR["Unrestricted, with an explicit scope (02-01)"]
```

**[Explanation]** Two checks after the flowchart: a backend service can't be hosted on Foundry ([02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md#hosting-on-foundry)), and a service user only sees rows that its object security policies let it see ([09-01](../09-kestrel-case/01-customer-portal-built-out.md)).

[02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md) · [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md)

## 3. Which agent connector?

```mermaid
flowchart TD
    A{Who is the agent for?} -- "a developer building in Foundry" --> PM["Palantir MCP (04-02)"]
    A -- "an external agent using Ontology data" --> OM["Ontology MCP (04-01)"]
    A -- "a background job you write in code" --> PA["Pro-code agent, beta (04-03)"]
    A -- "users chatting inside Foundry" --> CS["AIP Chatbot Studio (AIP 05)"]
    PM --> L{Runs locally with a third-party model?}
    L -- yes --> G["Tool outputs leave Foundry: check the provider agreement (04-02)"]
    L -- no --> W["In a VS Code workspace: data stays in Foundry (05-02)"]
```

[04-01](../04-mcp-and-pro-code-agents/01-ontology-mcp.md) · [04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md) · [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md) · [AIP 05](../../AIP/05-chatbot-studio/README.md) · [05-02](../05-development-environments/02-vs-code-workspaces.md#ai-development-tools)

## 4. Which development environment?

```mermaid
flowchart TD
    A{What are you writing?} -- "analysis, a notebook, a model" --> CW["JupyterLab or RStudio in Code Workspaces (05-01)"]
    A -- "Java transforms or SQL; reviewing pull requests" --> CR["Code Repositories (05-02)"]
    A -- "Python transforms, functions, OSDK apps, compute modules" --> V{Need third-party extensions<br/>or your own machine?}
    V -- no --> VW["VS Code workspace (05-02)"]
    V -- yes --> LP{Admin enabled local preview<br/>and you have Download on every input?}
    LP -- yes --> LE["Local VS Code + Palantir extension (05-03)"]
    LP -- no --> VW
    A -- "a new Ontology-anchored React product, all in code" --> SR["SuperRepo, beta (05-04)"]
```

[05-01](../05-development-environments/01-code-workspaces.md) · [05-02](../05-development-environments/02-vs-code-workspaces.md) · [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md) · [05-04](../05-development-environments/04-superrepo-and-foundry-cli.md)

## 5. How does a change reach production?

```mermaid
flowchart TD
    A{Is the change within one environment?} -- yes --> GB["Global branch, proposal, merge (06-01)"]
    A -- "no, it moves between environments" --> M{Same enrollment?}
    M -- yes --> MP["DevOps product, installed per space (08-01, 08-03)"]
    M -- no --> X{Managed by Palantir<br/>across enrollments?}
    X -- yes --> FP["Foundry products via Apollo, beta (08-03)"]
    X -- no --> EI["Export and import between local stores (08-02)"]
    GB --> MP
```

**[Explanation]** The two usually work together: branch within `dev`, merge, then publish a product version and install it in `test` and `prod` ([09-03](../09-kestrel-case/03-delivery-desk-product-release.md)).

[06-01](../06-branching-and-cross-app/01-global-branching.md) · [08-01](../08-product-delivery/01-devops-products.md) · [08-02](../08-product-delivery/02-stores-groups-and-export.md) · [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md)

---
[Module index](README.md) · [DevTools home](../README.md)
