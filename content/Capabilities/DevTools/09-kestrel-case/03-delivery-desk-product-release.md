# 03 — The Delivery Desk product release

*Sources: no new doc pages; every row links to the note that holds the docs' wording · written October 22, 2026 · Ready for Review. Everything here is **[Example]** unless a line says otherwise.*

[Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md) wrote the *Kestrel Delivery Desk* v1.0 spec before most of the apps existed. The Apps area then added an Order panel, a re-route review page, a mobile module, a widget set and a Carbon workspace, all in `Delivery Desk [Workflow]` ([Ontology 17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)). This page is **v1.1**: the spec extended with them, the DevTools decisions applied, and the release through `kestrel-dev`, `kestrel-test` and `kestrel`.

**Version:** adding outputs breaks nothing downstream, so v1.1 is a **minor** version. A major version would be needed only for a breaking change, such as a removed output or a changed column type ([08-01](../08-product-delivery/01-devops-products.md#linked-products)).

## Outputs

| Resource | New in v1.1? | Packaging rule | Note |
|---|---|---|---|
| *Delivery Desk queue* (Workshop) | — | Add it first, as the furthest-downstream resource; turn on **Installation configuration** for the packaging linter; a string parameter titles the test header `Delivery Desk queue (TEST)` | [Apps 04-01](../../Apps/04-workshop-in-production/01-publishing-versions-and-branching.md#packaging-with-marketplace) |
| Order panel (child module) | Yes | Comes in as a dependency of the queue and the review page | [Apps 02-04](../../Apps/02-workshop-data-and-logic/04-embedding-modules.md) |
| Re-route review page, with Kofi's reviewer chatbot | Yes | Add as a file output; the chatbot comes with the module that embeds it | [AIP 05-03](../../AIP/05-chatbot-studio/03-chatbots-outside-the-studio.md#3-marketplace) |
| Warehouse floor (mobile Workshop) | Yes | Same product as the queue | [Apps 11-02](../../Apps/11-kestrel-case/02-warehouse-floor-mobile.md) |
| Delivery Desk chatbot | — | Comes with the queue's chatbot drawer; its policy search is function-backed, so **no media set** travels with it | [AIP 05-03](../../AIP/05-chatbot-studio/03-chatbots-outside-the-studio.md#3-marketplace) |
| `delivery-widgets` (custom widget set) | Yes | Comes with the modules that embed it; vite plugin 3.1.0+; Ontology API names must match the source; **enable its Ontology APIs once after install** | [Apps 06-03](../../Apps/06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| Delivery Desk workspace (Carbon) | Yes | Workshop and object-type modules package; walkthroughs don't yet; default search can't use type groups | [Apps 11-03](../../Apps/11-kestrel-case/03-delivery-desk-workspace.md) |
| *Hold order*, *Re-route shipment*, *Send delay update* | — | Submission criteria use groups, not named users | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#spec-kestrel-delivery-desk-v10) |
| `deliveryRisk`, `draftDelayMessage` | — | Functions don't need their source code packaged; model aliases travel but can't be remapped | [Ontology 09-05](../../Ontology/09-functions/05-writing-functions-in-practice.md) |
| `Case` interface and its constraints; `Message` | — | As v1.0; `Case`'s implementations are still [Ontology RQ-28](../../Ontology/SOURCES.md) | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#spec-kestrel-delivery-desk-v10) |

**[Explanation]** The functions answer [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#for-kestrel)'s open point. The release-management guidance says to package a function with the product holding its source; the functions page says a function can be packaged **without** its source code. So the Delivery Desk product carries the two functions, not `kestrel-functions` or `kestrel-ml`, and the other functions in those repositories stay out.

## Inputs

| Input | Mapping | Note |
|---|---|---|
| `Order`, `Shipment`, `Customer` | **Source presets**, resolved by API name in each environment; **Allow custom values off**, so nobody maps a different type by mistake | [08-01](../08-product-delivery/01-devops-products.md#for-kestrel) |
| `PolicyDocument`, `PolicyChunk` | Inputs, not outputs: `PolicyChunk` has a **vector** property, which packaging doesn't support | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#not-packageable-so-out-of-scope), [Ontology 16-02](../../Ontology/16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| Groups (*CS agents*, *fraud*) and mandatory-control markings | As v1.0; groups can't become outputs | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#inputs-the-installer-maps-them) |
| Carrier tracking-event type | Stream-backed, so an input | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#not-packageable-so-out-of-scope) |

## Settings

| Setting | Choice | Note |
|---|---|---|
| Installation mode | Production | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#settings) |
| Store | `Kestrel Platform`, with **approval required for new versions**, so the author can't publish alone | [08-02](../08-product-delivery/02-stores-groups-and-export.md#for-kestrel) |
| Release channels | Test follows the middle channel, prod **Stable**; the channel's name is open ([RQ-10](../SOURCES.md#open-research-questions)) | [08-01](../08-product-delivery/01-devops-products.md#versions-channels-and-retirement) |
| Size | Well under 15,000 inputs and outputs while core types stay inputs | [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#size-and-permissions) |

## The release

| Step | Who | What | Note |
|---|---|---|---|
| 1 | Daniel | Merge the branch in `kestrel-dev`; check the queue's packaging linter is clean | [02](02-daniels-developer-setup.md), [Apps 04-01](../../Apps/04-workshop-in-production/01-publishing-versions-and-branching.md#packaging-with-marketplace) |
| 2 | Daniel | **Start new version**, changelog, Publish | [08-01](../08-product-delivery/01-devops-products.md#versions-channels-and-retirement) |
| 3 | Another platform engineer | **Approve** the draft | [08-02](../08-product-delivery/02-stores-groups-and-export.md#store-permissions) |
| 3a | Daniel | Tag the version with the **middle channel** test tracks, so test receives it ([RQ-10](../SOURCES.md#open-research-questions) covers its name) | [08-01](../08-product-delivery/01-devops-products.md#versions-channels-and-retirement) |
| 4 | — | Test upgrades within its maintenance window, if automatic upgrades (beta) are available; otherwise a manual upgrade. Installation suffix `TEST` | [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#upgrading) |
| 5 | Platform team | After install: enable `delivery-widgets`' Ontology APIs (first install only; it survives upgrades) | [Apps 06-03](../../Apps/06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| 6 | Ama's team | A week in `kestrel-test` on copies of real cases; the session-log reliability view shows no unexplained failures | [AIP 10-01](../../AIP/10-kestrel-case/01-building-delivery-desk.md) |
| 7 | Daniel | Tag the version **Stable** | [08-01](../08-product-delivery/01-devops-products.md#versions-channels-and-retirement) |
| 8 | Platform team | **Manual** prod upgrade in the maintenance window; the project stays **locked** (suffix `PROD`) | [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#for-kestrel) |
| 9 | Platform team | Check the **Environments** view: dev, test and prod on the expected versions | [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#release-management) |

**[Explanation]** If a bad version reaches test, **recall** it so nothing else installs it, and roll test back with **Upgrade or downgrade to version** ([08-01](../08-product-delivery/01-devops-products.md#versions-channels-and-retirement), [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#upgrading)).

## Considered, not adopted

- **Splitting** a core Ontology product out of the Delivery Desk (with a product group to validate the pair): the core types change per environment by design ([Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#which-environment-changes-what)), so there's nothing to version yet ([08-02](../08-product-delivery/02-stores-groups-and-export.md#for-kestrel)).
- **Folder tracking** of `Delivery Desk [Workflow]`: Ontology outputs (`Case`, `Message`, the actions) aren't in that project, so they'd stay manual outputs; revisit after they move to project permissions ([08-01](../08-product-delivery/01-devops-products.md#for-kestrel)).
- A **SuperRepo** ([05-04](../05-development-environments/04-superrepo-and-foundry-cli.md#for-kestrel)).

## Open items

- Is `RerouteProposal` an output? The agent's *Propose re-route* action writes it, and the model doesn't record whether it has a backing datasource ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)).
- [Ontology RQ-28](../../Ontology/SOURCES.md): does an install carry `Case`'s implementations?
- [RQ-10](../SOURCES.md#open-research-questions): the middle release channel's name.

---
[Module index](README.md) · Previous: [02 — Daniel's developer setup](02-daniels-developer-setup.md) · Next module: [10 — Practice](../10-practice/README.md)
