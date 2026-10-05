# 02 — Why an Ontology

*Sources: [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology/) · [Models in the Ontology](https://www.palantir.com/docs/foundry/ontology/models/) · [The Ontology system (Architecture center)](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) · checked October 2, 2026 · Ready for Review*

## The argument in brief
- **[Docs]** Palantir's central claim is that the Ontology represents the **decisions** of an enterprise, not just its data. Traditional data architectures don't capture the reasoning behind a decision or the action that follows it.
- **[Docs]** Every operational decision has four parts, and the Ontology brings all four into one system:

  | Part | The question it answers |
  |---|---|
  | **Data** | What do we know? |
  | **Logic** | How do we evaluate the options? |
  | **Action** | How is the decision carried out? |
  | **Security** | Is it allowed? |

- **[Docs]** Because decisions are made *in* the system, it also captures **decision data** and **decision lineage**. That record can be used to learn and to improve AI.
- **[Explanation]** The practical test: an analytical system tells you something. An operational system lets you act on it, records that you did, and keeps the people and agents involved within policy.

## What's wrong with the usual stack

**[Docs]** The page makes two complaints about conventional architectures:

- Traditional **data** architectures don't capture the reasoning that goes into a decision or the actions that follow. This limits learning and the use of AI.
- Conventional **analytics** architectures don't place computation in "lived reality". They remain disconnected from operations.

**[Concept]** In data-engineering terms, the usual flow is one-way:

```text
source systems → warehouse → reports
```

Someone reads a report, then makes the decision in another tool, by email or in a spreadsheet. The decision, its reasons and its outcome rarely come back into the data platform. The next analysis has to guess what happened.

## The four parts of a decision

### Data
**[Docs]**
- The Ontology includes all kinds of enterprise data: structured, streaming and edge, unstructured, imagery and more.
- It also includes **decision data**: the context around a decision, the options considered, and the downstream effects of the choice made.
- Data from ERPs, manufacturing systems (MES) and warehouse systems (WMS) is combined with IoT, edge, unstructured and geospatial sources. All of it becomes objects, properties and links that change in real time and are built into workflows.
- **Decision lineage** records when a decision was made, against which version of the data, and through which application. It is captured automatically and is available to developers and agents.
- The docs add that decision data from the edge can be captured through the lightweight *Embedded Ontology*.

### Logic
**[Docs]**
- Logic is the reasoning that decides when and how to make a decision. Examples:
  - a business rule inside a core system;
  - a forecast model kept in a data-science workbench;
  - an optimization model that produces a plan.
- Deterministic functions and conventional statistics complement the non-deterministic reasoning of LLMs.
- A "**logic binding**" paradigm gives one interface for combining logic from different environments: on-premises, cloud, SaaS, or Foundry itself.

### Action
**[Docs]**
- Closing the action loop is "what distinguishes an operational system from an analytical system."
- Data elements are the **nouns**; actions are the **verbs**. Reasoning by humans or AI joins them into "complete sentences".
- Human and agent actions can be:
  - staged safely as **scenarios**;
  - governed by the same access controls as data and logic;
  - **written back** to enterprise systems such as transactional systems, edge devices and custom apps.

### Security
**[Docs]**
- Security combines:
  - **marking-, purpose- and role-based policies**;
  - **dynamic lineage** across data, logic, action and applications;
  - change and release management that covers both human and agent workflows.
- Granular policies are computed at runtime for every interaction. They combine row- and column-level restrictions, user-group attributes (including those coming from SSO), and markings that propagate through pipelines.
- **Tool use** by agents goes through the same security architecture as data access. At minimum, a tool can be invoked only by someone with access to the underlying objects, properties and links.
- Every action, human or agent, needs explicit authorization grants. Access to logs is governed by markings too.

## What each part becomes in Foundry

This page is about purpose rather than configuration. Each part maps onto concrete features that later modules explain:

| Part | Foundry features | Module |
|---|---|---|
| Data | Object types, properties, links backed by datasets, streams, virtual tables | [04](../04-object-types/README.md)–[06](../06-links/README.md), [02](../02-foundry-data-foundations/README.md) |
| Logic | Functions, models in the Ontology, AIP Logic | [09](../09-functions/README.md), [15](../15-advanced-patterns/03-models-in-the-ontology.md) |
| Action | Action types, side effects (webhooks, notifications), scenarios, writeback | [08](../08-actions/README.md), [15](../15-advanced-patterns/02-scenarios.md) |
| Security | Project-based permissions, markings, object and property security policies | [12](../12-security-and-governance/README.md) |

### Models are part of it too
**[Docs]** The *Models in the Ontology* page gives the end-to-end path for live inference:
1. Create a model in Foundry.
2. Configure a direct model deployment.
3. Publish a wrapper function around it, which can be orchestrated from other functions.
4. Use that function in Workshop, Vertex and other apps.

Batch inference can instead back objects through datasets. The page claims three benefits:

- **Interpretability:** results appear as real-world properties, such as a forecast or a classification. Users don't need to understand ML.
- **Economies of scale:** a forecast built for one use case can be reused by the next.
- **Connectivity at scale:** the Ontology becomes a single source of truth for logic as well as data. That makes enterprise-wide simulation possible.

## Warehouse versus operations room

| | Analytical stack (warehouse + BI) | Decision-centric Ontology |
|---|---|---|
| Main output | Reports, dashboards | Decisions and their execution |
| Direction of flow | Source → warehouse → people | Source → Ontology → people and agents → **back to source systems** |
| Where logic lives | Spread across SQL views, notebooks and BI calculations | Bound to the model as functions and models; reusable |
| What gets recorded | Data versions | Data versions **plus** decisions, their inputs and the applications used |
| Security model | Mostly role grants on tables | Roles, markings and purpose-based policies, computed per interaction and carried through lineage |

**[Analogy]** A warehouse is a library: excellent for reading about the world. The Ontology aims to be an operations room: you read, decide, act and log in one place.

**[Analogy] Where this breaks:** Foundry also contains a full analytical toolset (Contour, Quiver, notebooks), and many Ontology uses are partly analytical. The difference is emphasis and the closed loop, not a ban on analytics.

## The AI angle
- **[Docs]** The page argues that the Ontology lets agents go "beyond the data-centric limitations of retrieval-augmented generation". Agents use data, logic and actions through an **extensible tools paradigm**.
- **[Docs]** By default, agent actions can be **staged** for a human to review. Trusted, well-tested processes can then be allowed to close the loop automatically, and that latitude can be widened or narrowed over time.
- **[Docs]** Decision lineage across thousands of users and agents can feed model fine-tuning and agent prompting principles.
- **[Explanation]** Treat the RAG comparison as positioning. The concrete, checkable mechanisms behind it are tools with permissions, actions with confirmation, and scenarios. Those are studied in [16 — AI and agents](../16-ai-and-agents/README.md). Claims about learning from decision lineage at scale describe a direction, not a single feature you configure.

## The same story at Kestrel

**[Docs]** The page uses a fictional medical manufacturer, *Onyx*, hit by a supplier disruption. It follows four stages: visibility, simulation, execution with writeback to WMS, ERP and planning systems, then learning.

**[Example]** Here is the same arc for [Kestrel](04-running-example.md) when a carrier strike hits the Accra region:

| Stage | Without an Ontology | With the Ontology |
|---|---|---|
| **See** | Ama exports open orders, Kofi exports shipments, someone joins them in a spreadsheet | Open `Order` objects link to `Shipment` objects and their `Carrier`. A filter shows every at-risk order with the customer behind it |
| **Decide** | A meeting to argue about which orders to re-route | A delivery-risk **function** ranks orders. A re-routing plan is staged as a **scenario** for review |
| **Act** | Kofi re-keys changes into the WMS. Ama emails customers by hand | A *Re-route shipment* **action** updates the shipments, writes back to the WMS through a webhook, and notifies the customer |
| **Learn** | Nobody can say later which orders were re-routed, or why | The action log records who re-routed what, when, on which data. Next time, the Delivery Desk agent can propose the same plan for a human to approve |

## If you're scoping a project
- **[Recommendation]** Justify an Ontology project with **decisions**, not tables: "Lena approves refunds here, with these rules" is a better scope than "ingest the payments ledger". This matches the use-case scoping in our [Scoping course notes](../../Courses/Scoping%20Use%20Cases%20for%20Foundry%20%26%20AIP/README.md).
- **[Recommendation]** Plan the action and writeback path early. If decisions still happen outside Foundry, the decision lineage the page promises won't exist.
- **[Explanation]** Writeback raises the stakes. The source systems' own rules and the Ontology's action rules must agree, or someone must decide which one wins.

## Traps
- Treating the Ontology as a reporting layer and never adding actions. You get a nicer warehouse, not decision capture.
- Assuming "the Ontology is secure" means data stays protected **after** an action or function reads it. Only some controls travel with the data. See [02 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md).
- Letting agents act without a staging or review step before their behaviour has been evaluated.

## Reading this page critically
- **[Explanation]** This is a vision page. Many statements ("dynamically computed at runtime for every interaction", "learning at scale") summarize several features. Each concrete mechanism is verified in its own module before we rely on it.
- **[Docs] Consistency with the Learn course:** our [Intro course note 08](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/08-three-pillars.md) teaches **three pillars** (data, logic, action) plus common security and governance. The docs page counts **four components**, with security as the fourth. They agree in substance; use the docs' four-part version when precision matters.

## In the Learn courses
- [Intro course 03 — Linear to decision-centric systems](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/03-linear-to-decision-centric-systems.md)
- [Intro course 08 — Three pillars](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/08-three-pillars.md)
- [Intro course 11 — Systems of action](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/11-systems-of-action.md)
- [Intro course 13 — Automations and progressive automation](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/13-automations-and-progressive-automation.md)

---
[Module index](README.md) · Previous: [01 — What the Ontology is](01-what-the-ontology-is.md) · Next: [03 — Architecture at a glance](03-architecture-at-a-glance.md)
