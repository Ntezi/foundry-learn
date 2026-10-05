# 03 — Models in the Ontology

*Sources: [Models in the Ontology](https://www.palantir.com/docs/foundry/ontology/models/) · [Model connectivity and development](https://www.palantir.com/docs/foundry/model-integration/overview/) · [Create a direct model deployment](https://www.palantir.com/docs/foundry/manage-models/create-a-model-deployment/) · [Functions on models](https://www.palantir.com/docs/foundry/functions/functions-on-models/) · checked October 3, 2026 · Ready for Review*

[09-04](../09-functions/04-functions-on-models-and-llms.md) shows the plumbing: how a function calls a deployed model. This note is the design question above it: **where does a model's output live in the Ontology, and how does it stay trustworthy?** It's written as an **architecture decision record** for one Kestrel model.

---

## ADR-007: Delivery-delay predictions

**Status:** accepted · **Owner:** Priya (data), Daniel (apps) · **Consumers:** Ama's queue, the Delivery Desk agent

### Context

A model predicts, for each open shipment, the probability that it arrives after `promisedDeliveryDate`. Ama wants to call customers **before** they complain. The agent wants to mention the risk when a customer asks.

**[Docs]** The docs describe two routes into the Ontology:

- **Batch:** objects are backed by datasets that "leverage a model for batch inference", built in a pipeline;
- **Live:** create a model, configure a **direct model deployment**, publish a **wrapper function** (optionally called from another function), and use that function in Workshop, Vertex and other apps.

**[Docs]** Why bother mapping models to the Ontology at all: results are expressed as **properties of real things** (a forecast, an estimate, a classification), so users don't need to understand machine learning; one model's output can serve the next use case; and the Ontology becomes a "digital twin" of logic, not only data.

### Options

| | A. Batch property | B. Live function | C. Prediction objects | D. Batch + live |
|---|---|---|---|---|
| What | Pipeline scores all open shipments; `Shipment.delayRisk` comes from the backing dataset | A function calls the deployment on demand | Each run writes `DelayPrediction` objects linked to `Shipment` | A as the default, B on request |
| Freshness | As fresh as the schedule | Live | As fresh as the schedule | Both |
| Filter and sort across thousands | **Yes**: an indexed property | **No**: computed per call | Yes, via links | Yes (on A) |
| History of predictions | No (overwritten) | No | **Yes** | No |
| Cost shape | Indexing compute per run ([13-05](../13-backend-architecture/05-limits-usage-and-compute.md)) | Deployment + per-call compute | Indexing; object count grows per run | Both |

### Decision

**D: a batch property for the queue, plus a live function for the one shipment on screen.** Prediction history goes into a **dataset**, not objects.

**[Example] What this replaces.** In [09-01](../09-functions/01-functions-on-objects.md#where-functions-fit-for-a-data-engineer), `deliveryRisk(shipment)` fed a **function-backed column** in Ama's table. That worked for one page of rows but couldn't sort the whole queue. After this ADR, the queue sorts on `Shipment.delayRisk`, and `deliveryRisk` becomes the live function that wraps the model for the shipment on screen.

### Rationale

- **[Explanation]** Ama's queue *sorts and filters* by risk across all open shipments. Only an indexed property can do that. A live function can't sort 4,000 shipments it hasn't been called on.
- **[Explanation]** When Ama opens one shipment after the carrier posts a new scan, the live function gives the current number. The Object View shows both, labelled "as of 06:00" and "now".
- **[Explanation]** Option C would turn every scoring run into new objects: the [Time Machine](../11-design/03-anti-patterns.md#the-time-machine) by another route. Nobody acts on last Tuesday's prediction; data scientists analyse it, and they want a dataset.

### Consequences and rules

1. **Provenance on every stored output.** `delayRisk` is a struct: `probability`, `band`, `modelVersion`, `scoredAt`. The same pattern as `Payment.riskAssessment` ([05-03](../05-properties/03-structs.md)). Without `modelVersion`, nobody can tell which model said what.
2. **The live function returns; it doesn't write.** If a live score should be kept, an action records it ([09-04](../09-functions/04-functions-on-models-and-llms.md#pattern-1--wrap-a-predictive-model)), and the action's own history says who saved it and when.
3. **Feedback from outcomes.** **[Docs]** Foundry "enables ML feedback loops from production data, outcomes, applications, and user actions". **[Explanation]** At Kestrel, the outcome is simply the delivered timestamp, which the pipeline already has; and Ama's *Mark delay as excused* action (weather, customer not home) becomes a label that training should exclude. Design the action so its reason is a **property**, not free text, or the data scientists can't use it.
4. **Deployments upgrade themselves.** **[Docs]** A direct model deployment **automatically upgrades** with no downtime when a new model version is published to its branch, and its function gets a new version too. For control over when a model changes, the docs point to a **Modeling Objective** live deployment instead. **[Recommendation]** Kestrel uses a Modeling Objective for this model, because Ama's queue thresholds were tuned against a specific version.
5. **Scaling.** **[Docs]** Direct deployments can scale from zero, add a replica at **75%** capacity up to the configured maximum, scale down after **30 minutes** without requests, and take scheduled overrides (busier on weekday mornings).
6. **Agents read the property, not the model.** **[Explanation]** The Delivery Desk agent gets `delayRisk` through its object query tool, with the `band` and `scoredAt` fields. It doesn't call the model, so its answer matches what Ama sees ([16-03](../16-ai-and-agents/03-ontology-tools-for-agents.md)).

### Rejected alternatives, briefly

- **Model output as a derived property.** **[Explanation]** Derived properties are computed from linked objects at read time ([05-05](../05-properties/05-derived-properties.md)); they can't call a model.
- **Writing the score with an automation on every scan.** **[Explanation]** Possible with Automate ([10-06](../10-applications/06-automate-and-ontology-events.md)), but at scan volume it duplicates the batch pipeline at a higher cost per object.

---

## The general pattern

| Question | If yes |
|---|---|
| Will people filter, sort or aggregate on the output across many objects? | Batch property, with provenance fields |
| Must it reflect the last few minutes? | Live function, for one object or a small set |
| Will anyone act on, link or comment on individual predictions? | Prediction objects (rare) |
| Is the history only for analysis? | A dataset |
| Must the model version change only on a decision? | Modeling Objective deployment, not a direct deployment |

---
[Module index](README.md) · Previous: [02 — Scenarios](02-scenarios.md) · Next: [04 — Entity resolution across sources](04-entity-resolution-across-sources.md)
