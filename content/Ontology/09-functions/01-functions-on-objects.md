# 01 — Functions on objects

*Sources: [Functions overview](https://www.palantir.com/docs/foundry/functions/overview/) · [Functions on objects](https://www.palantir.com/docs/foundry/functions/functions-on-objects/) · [Feature support by language](https://www.palantir.com/docs/foundry/functions/language-feature-support/) · [Import object, interface and link types](https://www.palantir.com/docs/foundry/functions/ontology-imports/) · checked October 2, 2026 · Ready for Review*

## Where functions fit, for a data engineer

Priya already writes transforms. A Foundry **function** is a different tool, and it helps to say exactly how.

| | Transform (Pipeline Builder / Code Repositories) | Function |
|---|---|---|
| Runs | On a schedule or build, over **datasets** | **On request**, "quickly in operational contexts" |
| Input | Whole datasets | Objects, object sets, scalars, often **one user's current selection** |
| Output | New dataset versions | A value, an object set, or **Ontology edits** |
| Typical latency | Minutes | Interactive |
| Analogy | Batch ETL job | A serverless function with the Ontology already wired in |

**[Docs]** Functions run server-side in an isolated environment. They have "first-class support for authoring logic based on the Ontology": reading properties, traversing links and making edits. The docs contrast this with ordinary Functions-as-a-Service, saying functions "go far beyond" FaaS because data storage, retrieval and modification come with Foundry's security, lineage and transparency guarantees.

**[Docs]** "Functions on objects" (FOO) is an informal label: "there is no formal notion of a 'function on objects' … as being distinct from any other function".

**[Docs] What they're used for**, from the overview:

- returning object sets or values to Workshop;
- **function-backed columns**;
- aggregations for charts;
- **function-backed actions** ([08-04](../08-actions/04-function-backed-actions.md));
- Slate backends;
- Quiver metrics;
- external enrichment;
- streaming (especially LLM output);
- Python sidecars in Pipeline Builder.

**Kestrel's first three functions:**

1. `deliveryRisk(shipment)` gives a score from 0 to 1 and a reason. It feeds a column in Ama's late-orders table.
2. `refundPolicyCheck(refund)` checks the refund against policy. It is used by *Approve refund* and by the Delivery Desk agent.
3. `cancelOrder(...)` is the edit function behind *Cancel order* ([08-04](../08-actions/04-function-backed-actions.md)).

## Choosing a language

**[Docs]** The choice is TypeScript v1, TypeScript v2, Python, or AIP Logic, which is no-code. This is the support table, cut down to the rows that change decisions:

| Capability | AIP Logic | TSv1 | TSv2 | Python |
|---|---|---|---|---|
| Objects, edits, Workshop, API gateway | Yes | Yes | Yes | Yes |
| **Interfaces** | No | No | **Yes** | No |
| **Language models** (proxy endpoints, model aliases) | No | No | Yes | Yes |
| **Staged writes** (beta) | No | No | Yes | Yes |
| **Deployed** execution | No | No | Yes | Yes |
| Usable in **Pipeline Builder** | No | No | No | **Yes** |
| **Media** | No | **Full** (OCR, transcription) | Partial | Partial |
| **Webhooks** | No | Direct | Via a webhook function | Via a webhook function |
| Bring-your-own-model (function interface) | Yes | Yes | No | No |
| OSDK | — | — | **Yes** | **Yes** |

**[Docs]** The docs recommend **TypeScript v2** over v1 for:

- a full **Node.js** runtime (`fs`, `child_process`, `crypto`; broader npm compatibility);
- first-class **OSDK** support, with the same code in and out of the platform;
- configurable resources up to **8 vCPUs and 5 GB** of memory;
- staged writes.

The docs also prefer **serverless** to deployed execution in most cases. Serverless runs several versions on demand, which makes upgrades safer. It only costs when it runs, and it needs less maintenance.

**Kestrel's choice:**

- **TSv2** for all three functions, because `Case` is an interface ([07](../07-interfaces/01-interfaces.md)) and only TSv2 can use it.
- **Python** for a later Pipeline Builder enrichment step.

**[Explanation]** The one argument for **TSv1** today is media: OCR on damaged-parcel photos. Even then, keep that one function in TSv1 and write the rest in TSv2. Don't write the repository around the exception.

## The import step everyone forgets

**[Docs]** Any object, interface or link type a function uses must be **imported into the project that contains the repository**. In the **Resource Imports** sidebar, choose **Add**, pick the types (and interfaces), then **Save**. What happens next depends on the language:

- **TSv1:** Code Assist restarts, and the types appear in `@foundry/ontology-api`. A private ontology appears as `@foundry/ontology-api/<ontology-api-name>`.
- **TSv2:** generate the **Ontology SDK**, then import from `@ontology/sdk`.
- **Python:** generate the Python OSDK. Import objects from `ontology_sdk.ontology.objects` and object sets from `ontology_sdk.ontology.object_sets`.

**[Docs]** "Importing more than one ontology into a single project is unsupported."

**[Explanation]** Two practical consequences:

- **Link types are imported separately.** Search Around methods are only generated for imported links ([06-03](../06-links/03-traversal-and-search-arounds.md)). If `order.shipments` doesn't exist in your code, check the imports before you check the Ontology.
- **One ontology per project.** If Kestrel Pay ever moves to its own ontology, a function that reads both payments and orders needs a shared ontology ([03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md)). It can't import both.

## A first read-only function

```typescript
// TSv2: deliveryRisk.ts
import { Client, Osdk } from "@osdk/client";
import { Shipment } from "@ontology/sdk";
import { Double } from "@osdk/functions";

export default async function deliveryRisk(
    client: Client,
    shipment: Osdk.Instance<Shipment>,
): Promise<Double> {
    const carrier = await shipment.$link.carrier.fetchOne();    // throws if missing: see 06-03
    const order = await shipment.$link.order.fetchOne();        // promise date lives on Order (05-01)
    const lateRate = carrier.lateRate30d ?? 0;
    const slackHours = (Date.parse(order.promisedDeliveryDate!) - Date.parse(shipment.eta!)) / 3.6e6;
    return Math.min(1, lateRate * (slackHours < 24 ? 2 : 1));
}
```

**[Explanation]** It's fine as a sketch, but it makes two classic mistakes:

- It takes a **single object**, which the docs call the least efficient input type.
- Used as a Workshop column, it runs **two** `fetchOne()` calls **per row**.

[03](03-function-lifecycle.md) rewrites it over an object set.

---
[Module index](README.md) · Next: [02 — Query functions and Ontology edits](02-query-functions-and-ontology-edits.md)
