# 02 — Kestrel's developer resources

*Sources: no doc pages; the Kestrel model in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) and the notes linked below · checked October 22, 2026 · Ready for Review*

**[Concept]** The examples in this area use **Kestrel Commerce**, the online retailer defined in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md), with its payments arm **Kestrel Pay**. This note lists the developer resources Kestrel already has in that model, and the candidates this area adds. Nothing here is a doc fact: it's the running example. **Daniel**, Kestrel's application developer, owns most of it; **Priya** builds the pipelines.

## What Kestrel already has

| Resource | What it is | Defined in | Used in |
|---|---|---|---|
| Environments | Spaces `kestrel-dev` (with its own ontology), `kestrel-test` and `kestrel` (production) | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md) | [02-03](../02-developer-console-and-apis/03-operating-an-application.md), [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md) |
| Projects | `Commerce [Ontology]`, `Payments [Ontology]` (datasets marked `Kestrel Pay – Financial`), `Delivery Desk [Workflow]` | [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) | Throughout |
| Customer delivery-status portal | A backend outside Foundry with Kestrel's own customer login; a backend-service application with client credentials | [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md) | [01-02](../01-ontology-sdk/02-subscriptions.md), [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md), [02-04](../02-developer-console-and-apis/04-platform-apis.md) |
| Support portal | An external app calling `lateOrdersForRegion` through the API gateway | [Ontology 09-02](../../Ontology/09-functions/02-query-functions-and-ontology-edits.md) | [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md) |
| Functions repositories | `kestrel-functions` (TypeScript v2, by domain) and `kestrel-ml` (every Python function used in Workshop); VS Code workspaces; local SDK on | [Ontology 09-05](../../Ontology/09-functions/05-writing-functions-in-practice.md) | [05-02](../05-development-environments/02-vs-code-workspaces.md), [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md) |
| `kestrel-pay-llm` | Compute module hosting Kestrel Pay's self-hosted model | [AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md#kestrel-pays-decision) | [03-01](../03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md) to [03-03](../03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md) |
| Delivery Desk agent | An AIP chatbot with Ontology tools T1–T7 | [Ontology 16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md) | [04-01](../04-mcp-and-pro-code-agents/01-ontology-mcp.md), [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md) |
| Branching | Global branches in `kestrel-dev`; a two-approval custom policy on `Commerce [Ontology]` with contributor approval off | [Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md) | [06-01](../06-branching-and-cross-app/01-global-branching.md) |
| *Kestrel Delivery Desk* product | Workshop app, actions, functions, `Case`, `Message`; core types as inputs; published to the `Kestrel Platform` store | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md) | [05-04](../05-development-environments/04-superrepo-and-foundry-cli.md), [08](../08-product-delivery/README.md) |
| Apps | The Delivery Desk queue, Order panel, re-route review page, warehouse floor (mobile), `delivery-widgets` and others | [Ontology 17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications) | [06-02](../06-branching-and-cross-app/02-cross-application-interactivity.md) |
| Temperature sensor | A sensor object linked to `Vehicle`, only on refrigerated vans | [Ontology 15-01](../../Ontology/15-advanced-patterns/01-events-history-and-time.md#q4--time-series) | [07-01](../07-foundryts/01-foundryts.md) |

## What this area adds

**[Explanation]** Each note's *For Kestrel* section tests that note's tools against the model. On October 22 the adopted ones went into 17-02 (its *Added in the DevTools area* table and section 7), and the rest are listed there as considered; [09](../09-kestrel-case/README.md) builds out the three main ones.

| Candidate | Note | Status |
|---|---|---|
| Portal backend holds one `Shipment` subscription per open order | [01-02](../01-ontology-sdk/02-subscriptions.md#for-kestrel) | Adopted |
| Portal API habits; nightly export as its own application | [02-04](../02-developer-console-and-apis/04-platform-apis.md#for-kestrel) | Adopted |
| Offline dock checklist on the embedded Ontology | [02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md#for-kestrel) | Considered, not adopted |
| `kestrel-pay-llm` readiness probe and daytime override | [03-02](../03-compute-modules-and-custom-endpoints/02-configuration-and-sdks.md#for-kestrel) | Adopted |
| Custom endpoint for the support portal | [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md) | Considered, not adopted |
| Copilot Studio agent over Ontology MCP | [04-01](../04-mcp-and-pro-code-agents/01-ontology-mcp.md) | Considered, not adopted |
| Local Palantir MCP for Daniel's group | [04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md#for-kestrel) | Adopted, conditional on the model-provider agreement |
| Build-fixing pro-code agent | [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md#for-kestrel) | Considered, not adopted |
| Delay-risk modelling in JupyterLab | [05-01](../05-development-environments/01-code-workspaces.md#for-kestrel) | Considered, not adopted |
| Local transforms preview kept off | [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md#for-kestrel) | Adopted |
| Delivery Desk as a SuperRepo | [05-04](../05-development-environments/04-superrepo-and-foundry-cli.md#for-kestrel) | Considered, not adopted |
| Auto-protect new files in `Commerce [Ontology]` | [06-01](../06-branching-and-cross-app/01-global-branching.md#for-kestrel) | Adopted |
| App Pairing on Kofi's re-route page | [06-02](../06-branching-and-cross-app/02-cross-application-interactivity.md#for-kestrel) | Considered, not adopted |
| `TemperatureExcursion` events from FoundryTS | [07-01](../07-foundryts/01-foundryts.md#for-kestrel) | Adopted (planned type) |
| Source presets on the Delivery Desk's core-type inputs; folder tracking | [08-01](../08-product-delivery/01-devops-products.md#for-kestrel) | Presets adopted; folder tracking considered, not adopted |
| Approval for new versions in the `Kestrel Platform` store | [08-02](../08-product-delivery/02-stores-groups-and-export.md#for-kestrel) | Adopted |
| Installation suffixes, locked prod, the Environments view; packaging functions with their repository | [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#for-kestrel) | Adopted; resolved in [09-03](../09-kestrel-case/03-delivery-desk-product-release.md#outputs) |

---
[Module index](README.md) · Previous: [01 — The toolchain map](01-the-toolchain-map.md) · Next module: [01 — Ontology SDK](../01-ontology-sdk/README.md)
