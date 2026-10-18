# 04 — Human-in-the-loop and staged writes

*Sources: [Chatbot Studio: tools](https://www.palantir.com/docs/foundry/chatbot-studio/tools/) · [AIP Logic with Automate](https://www.palantir.com/docs/foundry/logic/aip-logic-integration-automate/) · [Staged writes in AIP Logic](https://www.palantir.com/docs/foundry/logic/staged-writes/) · [Staged writes (TSv2)](https://www.palantir.com/docs/foundry/functions/typescript-v2-staged-writes/) · [Evals and Ontology edits](https://www.palantir.com/docs/foundry/aip-evals/ontology-edits/) · [Ontology scenarios](https://www.palantir.com/docs/foundry/ontology/overview-ontology-scenario/) · checked October 3, 2026 · Ready for Review*

An agent that can only read is safe and limited. An agent that writes freely is useful and dangerous. Between the two is a **ladder** of controls, each giving a person a different moment to say no. This note lays out the ladder, places each Delivery Desk operation on a rung, and then covers **staged writes**, the execution model underneath most of the rungs.

## The control ladder

| Rung | The agent… | A person… | Mechanism [Docs] |
|---|---|---|---|
| **0 · Read** | Answers questions | Reads the answer, with citations | Retrieval context, object query tool ([01](01-ontology-as-ai-context.md)) |
| **1 · Draft** | Returns text or values; writes nothing | Copies, edits or discards | A **function** tool that only returns |
| **2 · Propose** | Writes a **proposal**, not the change | Accepts or rejects the proposal | A *Propose…* action writing a proposal object; or an automation set to **stage** actions for review |
| **3 · Confirm** | Prepares an action | Clicks confirm before it runs | An **action tool** configured to run **after user confirmation**; command tools ask for approval by default |
| **4 · Sandbox** | Applies real actions in a **scenario** | Compares, then merges or discards | Scenario-scoped actions; a merge action ([15-02](../15-advanced-patterns/02-scenarios.md)) |
| **5 · Act** | Applies the action itself | Monitors, reverts if needed | An action tool on **automatic**, or an automation applying edits; criteria, logs and metrics as for any action ([14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md)) |

**[Explanation]** Higher rungs aren't "more advanced"; they're **less supervised**. Climb a rung only when the one below has a track record: evaluations passing, and people accepting nearly every proposal unchanged.

## Where Kestrel puts each operation

| Operation | Rung | Reason |
|---|---|---|
| Explain a delay to Ama | 0 | Read-only |
| Draft the customer message | 1 | Ama edits tone and facts before anything is sent |
| Send the delay update | 3 | Reaches a customer; Ama confirms in the chat |
| Re-route a shipment | 2 | Costs money and moves stock; a lead reviews a `RerouteProposal` |
| Plan re-routes for a warehouse closure | 4 | Many related changes; compare whole plans ([15-02](../15-advanced-patterns/02-scenarios.md#agents-in-scenarios)) |
| Tag a ticket with a delivery category | 5 | Cheap, reversible, high volume; spot-checked weekly |

## Proposals from automations

**[Docs]** AIP Logic can run from **Automate** so that edits are "automatically applied or staged for human review":

- the automation can **stage actions as proposals**. Reviewers open the **Proposals** tab, see why each was created, preview the action, and can read the **agent decision log** (the LLM's steps). Accepting runs the action;
- **open proposals are visible for only 24 hours, and only to the user who created the automation**.

**[Explanation]** That second rule makes Automate's built-in proposals a poor fit for a **team** queue. Kestrel's re-route proposals are **objects** (`RerouteProposal`), written by the agent's *Propose re-route* action: they're visible to every lead, last as long as needed, and show up in a normal Workshop queue. Use the built-in proposals for one owner's personal automations.

## Evaluate before you climb

**[Docs]** **AIP Evals** run a Logic function's test cases; for functions that edit, each test case runs in an **Ontology simulation**, so the real Ontology is untouched. Checking edits needs **custom evaluation functions** (or intermediate parameters) returning booleans or numbers. A created object exists only in the simulation, so find it by an identifying property; a deleted one should no longer be found.

**[Example]** Before moving *Tag ticket* to rung 5, Kestrel ran 300 historical tickets through an eval suite with a function checking the category the agent set against the one support staff had chosen. It moved up at 97% agreement; the 3% became new test cases.

## Staged writes: the execution model underneath

Several rungs need an agent's function to **edit, then read its own edits, then decide**: create a ticket, count the agent's open tickets, then assign. Ordinary edit functions can't: their edits are returned at the end and invisible during the run ([09-02](../09-functions/02-query-functions-and-ontology-edits.md#the-two-surprises)). Staged writes fix that.

**[Docs]** Staged-write functions (TSv2, Python, and AIP Logic; all **beta**):

- **Read-after-write:** later queries and aggregations in the same execution see the staged edits, including edits made by a calling staged-write function in the same action execution. Nobody outside the execution sees them.
- **Nested calls:** a staged-write function can call other staged-write functions, and apply actions backed by other edit functions. All edits join one staging area.
- **Atomic:** edits are committed when the function completes successfully. If it throws, "the Ontology remains unmodified and all staged edits are discarded".
- **No edits returned:** the function can return anything.
- **Logic only:** in legacy mode, after a Logic function edits, the *contains keywords*, *contains keywords (in order)* and *relative time range* filters stop working for the rest of the run. Staged writes support all filters.

**[Docs] The Automate consequence.** Because a staged-write Logic function no longer **returns** edits, it can't be used with Automate's **Logic effect**. Wrap it in an action type (Logic's *Create action* button) and use an **action effect**. Disabling staged writes restores the old behaviour. **[Docs]** The same applies in scenarios: Logic functions run in a scenario only with staged writes on ([15-02](../15-advanced-patterns/02-scenarios.md#step-1--try-it-without-consequences-temporary-scenarios)).

**[Explanation]** So the standard wiring for a writing agent is: **staged-write function → wrapped in an action → called by a tool, an automation or a scenario**. The action is where criteria, confirmation and proposals attach; the staged write is what makes the logic inside correct.

## Gaps to know about

- **[Docs]** The action tool can run automatically or after confirmation; the docs don't say which is the default. The [archived AIP reference](../../study-backups/2026-10-07/aip-from-scratch/AIP-old/applications/09-aip-chatbot-studio.md) also notes that nothing documents what a confirm-first action tool does when the chatbot runs **headless**, for example as a function inside Automate. **[Recommendation]** Never rely on confirm-first for an agent that might run unattended; put the control on a lower rung instead.
- **[Docs]** Read-time security doesn't follow the model's output ([01](01-ontology-as-ai-context.md#security-read-time-only)). A drafted message (rung 1) can contain anything the user could see. Rung 3 on *Send delay update* is what stops it leaving.

---
[Module index](README.md) · Previous: [03 — Ontology tools for agents](03-ontology-tools-for-agents.md) · Next: [05 — Designing the Ontology for agents](05-designing-the-ontology-for-agents.md)
