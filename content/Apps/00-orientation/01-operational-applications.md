# 01 — Operational applications

*Sources: [Use case development](https://www.palantir.com/docs/foundry/app-building/overview/) · [What is an operational application?](https://www.palantir.com/docs/foundry/app-building/operational-apps/) · [Connecting analytics to operations](https://www.palantir.com/docs/foundry/app-building/analytics-operations/) · [Conduct sentiment analysis with AIP](https://www.palantir.com/docs/foundry/app-building/sentiment-analysis/) · checked October 21, 2026 · Ready for Review*

**[Concept]** A dashboard tells someone what's happening and stops. An **operational application** carries on to the decision: it shows what's needed to decide, lets the user try the options, and records the choice back into the Ontology, where everyone else sees it at once. Every builder in this area exists to make that loop cheaper to build.

**[Docs]** The docs' five steps for turning a read-only idea into an operational app:

| Step | What it means | Where this area covers it |
|---|---|---|
| 1. **Start with the decision**, not the screen | Name the choice the user is there to make | [02](02-choosing-a-builder.md) |
| 2. **Surface the right information** at the right time | Live objects, links and properties the decision needs, and nothing else | Workshop [01](../01-workshop-foundations/README.md)–[03](../03-workshop-widgets/README.md) |
| 3. **Test the impact** before committing | Fork the Ontology in a **scenario**, apply actions and models, compare options | [Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md) |
| 4. **Turn information into action** | Decide inside the app, through **actions** and their submission criteria | [02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md) |
| 5. **Close the loop** | The edit is atomic and visible everywhere; side effects, webhooks, **Automate**, agents and the **action log** carry it further | [08](../08-automate/README.md) |

**[Docs]** The docs' checks for *a dashboard, not an operational application*:

- no decision is named;
- nothing is written back;
- the user has to act somewhere else;
- alternatives can't be compared;
- decisions stay local instead of reaching everyone working on the same data.

**[Docs]** The same page asks for privacy and civil-liberties thinking when an app uses sensitive data or supports consequential decisions: limit information to the stated purpose, and add accountable review points (Approvals, Checkpoints) before automated or AI-assisted actions change operational data.

## The docs' example, and Kestrel's

**[Docs]** A logistics coordinator with a late shipment of parts for an assembly plant. With a dashboard, they piece the picture together from spreadsheets and emails, book a carrier by phone, and nobody else knows. With an operational app, they see only what the decision needs, simulate each carrier in a scenario, commit with **one action** that reassigns the carrier, notifies the customer and updates planning, and the decision becomes auditable data. Later, an **agent** takes the routine reassignments within limits the coordinator sets, and escalates the rest.

**[Explanation]** Kestrel has the same shape. The Delivery Desk queue is step 4 (*Hold order*, *Re-route shipment*); planning scenarios are step 3 ([Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md)); the re-route agent proposing changes for Kofi to approve is the agent extension ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)). The applications are listed in [03](03-running-example.md).

## Analytics feeding operations

**[Docs]** Exploration becomes part of a workflow when it's packaged: a **Quiver dashboard** can be embedded in Workshop or opened as a Carbon tab ([09-02](../09-carbon-workspaces/02-modules-and-navigation.md)). Validated **models** reach users through Workshop scenarios, as forecasts or estimates in terms they recognise.

**[Docs]** The sentiment-analysis guide is an example of AI in the data layer rather than the app: Pipeline Builder's **Use LLM** node with a sentiment template, prompt testing on a sample, and a starter pack in *Build with AIP*. **[Explanation]** It sits in this sidebar, but its tools are Pipeline Builder and AIP; the AIP area covers the LLM side ([AIP 03](../../AIP/03-aip-logic/README.md)).

## The tools in the sidebar

**[Docs]** The overview groups the tools:

- **Application building**: Workshop, OSDK React (with Pilot), custom widgets (also buildable with Pilot), Slate, and **Code Workspaces applications** (Streamlit, Dash, Shiny).
- **Workflow building and management**: Workflow Lineage, Automate, Carbon, Solution Designer, Use Cases.
- **Developer toolchain**: the OSDK from Developer Console, and the REST APIs.

**[Explanation]** Code Workspaces applications and the developer toolchain aren't in this sidebar section, so this area doesn't cover them; the OSDK basics are in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md).

---
[Module index](README.md) · Next: [02 — Choosing a builder](02-choosing-a-builder.md)
