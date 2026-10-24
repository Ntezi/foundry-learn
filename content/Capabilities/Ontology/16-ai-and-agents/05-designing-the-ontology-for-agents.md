# 05 — Designing the Ontology for agents

*Sources: [Ontology design: Validation](https://www.palantir.com/docs/foundry/ontology/ontology-design-validation/) · [Ontology design: Best practices](https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/) · [Chatbot Studio: application state](https://www.palantir.com/docs/foundry/chatbot-studio/application-state/) · [Chatbot Studio: tools](https://www.palantir.com/docs/foundry/chatbot-studio/tools/) · [Object type metadata](https://www.palantir.com/docs/foundry/object-link-types/object-type-metadata/) · checked October 3, 2026 · Ready for Review*

A person learns the business over months and fills gaps from memory. An agent starts every conversation with **only what the Ontology says**. The docs' validation guidance puts it as a test: does the Ontology hold enough context for an agent to reason "without the team's unwritten knowledge"? ([11-04 §5](../11-design/04-validation.md#5-comparing-people-and-agents))

Most of this note is **[Recommendation]**: the docs give the test, not a checklist. It's a **before-and-after review** of one type, then the checklist Kestrel now uses for every type an agent can see.

## Before: `Order`, as the humans knew it

**[Example]** Ama's team had no trouble with this. The Delivery Desk did, in its first week of testing.

| Element | As built | What the agent did with it |
|---|---|---|
| Description | *(empty)* | Guessed that `Order` includes returns. It doesn't: `Return Request` is separate |
| `status` | `PLACED`…`CANCELLED`, no descriptions | Told a customer `ON_HOLD` meant "awaiting stock". It means the order is paused before picking, for the reason in `holdReason`, which may be a payment-risk hold |
| `promisedDeliveryDate` | Date, no description | Fine |
| `eta` (on Shipment) | Timestamp, no time zone stated | Read UTC as local time, so ETAs for a partner region several hours from Accra were wrong |
| `total` | Decimal | Didn't say the currency; Lena's audit found 140 such properties ([14-05](../14-lifecycle-and-operations/05-migration-and-export-import.md#scenario-3--bulk-rename-140-property-descriptions)) |
| `flag2` | Boolean, prominent | Nobody remembered; the agent mentioned it to Ama as "flagged" |
| *Hold order* action | No description | Picked *Hold order* when asked to "pause" a **shipment** |

**[Explanation]** Every row is knowledge the humans held **outside** the Ontology. That's exactly the "people succeed, AI struggles" result the docs tell you to investigate.

## After

| Element | Change |
|---|---|
| Description | "A customer's purchase of one or more products from the storefront. Returns are `Return Request`; payments are in Kestrel Pay." |
| `status` | Enum **value type** with a description per value. `ON_HOLD`: "Paused before picking; see `holdReason`. Holds placed by *Hold order for payment* are payment-risk holds, and the customer must not be told why" ([10-06](../10-applications/06-automate-and-ontology-events.md)) ([05-02](../05-properties/02-value-types.md)) |
| `eta` | Description: "Estimated arrival, **UTC**"; the agent's system prompt says to convert to the customer's time zone |
| `total` | Description "Order total in the **order currency** (`currency`)" |
| `flag2` | Found to be dead; hidden, then deprecated through the cleanup tool ([14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md)) |
| *Hold order* | Description: "Pause **an order** before picking. To pause a shipment in transit, use *Hold shipment*." Its `reason` parameter already had an enum ([08-01](../08-actions/01-action-types.md)); the missing piece was the description |

**[Example]** After the changes, Kestrel reran its 40 validation questions through the agent ([11-04](../11-design/04-validation.md)): 26 correct before, 37 after. The three left were genuine data gaps.

## Why metadata is now prompt

**[Docs]** A few places where the docs confirm that Ontology and tool metadata reaches the model:

- Ontology context prints the **selected properties** of each object into the prompt ([01](01-ontology-as-ai-context.md#what-goes-into-the-prompt));
- an application variable's **description** "will be injected into the chatbot's prompt";
- the object query tool works over the **object types and properties** you configure.

**[Explanation]** The docs don't list everything that goes into a tool's prompt. In practice the model sees names, descriptions and enum values, because that's all it has to choose with. Treat every name and description an agent can reach as **instructions**.

## The checklist

For every object type, property and action an agent can see.

**Types**

- [ ] The description says what the type **is** and what it **isn't**, naming the neighbouring types.
- [ ] One real-world thing per type; no "misc" types ([11-01](../11-design/01-best-practices.md)).
- [ ] Links have **named sides** that read as sentences: "Order *has shipments*", "Shipment *belongs to order*" ([06-01](../06-links/01-link-types-and-cardinality.md)).

**Properties**

- [ ] Codes and statuses are **enum value types**, with a meaning for each value.
- [ ] Units, currency and time zone are in the description (or the formatting) of every number and timestamp.
- [ ] No meaningless names (`flag2`, `misc_1`). If nobody can explain it, hide it and deprecate it.
- [ ] Derived or model-produced values carry **provenance**: `modelVersion`, `scoredAt` ([15-03](../15-advanced-patterns/03-models-in-the-ontology.md)).
- [ ] Sensitive fields are excluded from the agent's **property selection**, not only protected by policy.

**Actions**

- [ ] One action per business operation, named as a verb on the right object ([Action Sprawl](../11-design/03-anti-patterns.md#action-sprawl)).
- [ ] The description says **when to use it and when not to**, naming the alternative.
- [ ] Parameters have real names and, where possible, enums or constraints. The model fills them; constraints catch its mistakes ([08-02](../08-actions/02-rules-and-parameters.md)).
- [ ] Submission criteria encode the rules a person "just knows" ("not after picking has started"). The agent can't know them otherwise ([08-03](../08-actions/03-submission-criteria.md)).

**History and time**

- [ ] Questions about the past have a structure that answers them ([15-01](../15-advanced-patterns/01-events-history-and-time.md)); "previous" values aren't hidden in extra properties.

**Validation**

- [ ] The type has been through an agent run of the validation questions, without the humans' path ([11-04 §5](../11-design/04-validation.md#5-comparing-people-and-agents)).
- [ ] Failures are triaged: missing metadata (fix here), missing data (pipeline), or missing logic (an action or function).

## Good for agents is good for people

**[Explanation]** Nothing on the checklist is agent-only. Descriptions, enums and clear action names also help the new hire, the auditor, and Ama on a bad day. The difference is that people **compensate** for a vague Ontology and agents **can't**, so the agent finds the gaps first. That's the strongest argument for running agent validation even if no agent will be deployed.

---
[Module index](README.md) · Previous: [04 — Human-in-the-loop and staged writes](04-human-in-the-loop-and-staged-writes.md) · Next module: [17 — Case studies](../17-case-studies/README.md)
