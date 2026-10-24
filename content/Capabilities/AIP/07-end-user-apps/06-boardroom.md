# 06 — Boardroom

*Sources: [Boardroom](https://www.palantir.com/docs/foundry/boardroom/overview/) · [Create a boardroom](https://www.palantir.com/docs/foundry/boardroom/create-a-boardroom/) · [Boardroom modes](https://www.palantir.com/docs/foundry/boardroom/modes/) · [Configure a boardroom](https://www.palantir.com/docs/foundry/boardroom/configure-a-boardroom/) · [Use skills and templates](https://www.palantir.com/docs/foundry/boardroom/skills-and-templates/) · checked October 8, 2026 · Ready for Review*

Most AIP apps give you **one** agent. Boardroom gives you a **team**: a director and several specialists, each with its own instructions, model, context and tools. This note sets up a Kestrel boardroom and walks through the five modes with it.

## What it is

**[Docs]** Boardroom "coordinates teams of AI agents". Each boardroom has a **director** agent and configurable **subject matter expert** agents that can query the Ontology, execute code, analyse data, make visualisations and produce documents and presentations. Sessions and artifacts are **stored in the Ontology**, "to create a compounding data asset". Agent memories and reusable skills carry knowledge between workflows.

**[Docs] Requirements:** the **MindKit** Marketplace product installed in your primary Ontology; AIP enabled; access to Boardroom.

## Creating one

**[Docs]**

1. *Create Boardroom* → title and a high-level **boardroom prompt** describing the work and the experts needed.
2. **Prompt-driven** (team generated from the prompt) or **Ontology-informed** (your Ontology helps define the team).
3. Set **mandatory markings** and sharing. **CBAC and mandatory markings can't be changed after creation.**
4. *Generate boardroom* → a director and participants, which you then customise.

**[Example]** Kestrel's "Peak season readiness" boardroom, Ontology-informed. Two separate decisions: the **agents' context** (below) is limited to `Commerce [Ontology]` types, with no Kestrel Pay data; the boardroom's **mandatory marking** is `Customer PII`, because its sessions and documents may quote customer details. The marking decides who can see the boardroom and everything it produces, and can't be changed later:

| Agent | Delegation description | Context and tools |
|---|---|---|
| **Director** | Plans, delegates, synthesises | Shared context |
| Warehouse operations | Capacity, staffing, stock positions | `Warehouse`, `Shipment`; Kofi's regional dashboards as an app tool |
| Carriers | Carrier performance and costs | `Carrier`, `Shipment`, `CarrierInvoiceLine` |
| Customer service | Delay patterns and customer impact | `Order`, `Support Ticket`. Not the Delivery Desk session logs, which contain customers' words ([05-04](../05-chatbot-studio/04-session-logging.md)) |
| Risk | Delay model and scenarios | `Shipment.delayRisk`, `Planning Scenario` |

## The five modes

**[Docs]**

| Mode | What happens | Output |
|---|---|---|
| **Chat** | The whole team in a conversation; the director delegates, runs code, queries data, can start other modes; works with uploaded files (for example filling a spreadsheet from Ontology data) | Answers and downloadable artifacts |
| **Panel** | Live meetings by **voice or text**: transcribes microphone or computer audio, extracts questions, ideas, problems and action items, routes each to agents, keeps a synthesised summary. Extra Ontology actions can extract custom objects, shown under *Due Outs* | A live summary and objects |
| **Documents** | The director plans; agents research, draft sections and review each other; you can edit while they work and they won't overwrite your changes | DOCX or PDF, with **citations** to objects and research findings |
| **Slide decks** | Research grounds the deck in Ontology data; style from a saved template or an uploaded PPTX | PPTX |
| **Plans** | A primary team proposes; a planning lead synthesises plans; an **adversary team** critiques; repeat for more rounds | Courses of action |

**[Docs]** Panel mode: check notice and consent rules for recording and transcription in every relevant jurisdiction first (as for [Realtime audio](07-threads-evolve-and-realtime-audio.md#realtime-audio-voice-as-an-interface)).

**[Example]** Kestrel uses **Plans** for peak season: the primary team proposes three staffing-and-carrier plans; an adversary team (a "carrier strike" agent and a "demand +40%" agent) critiques them; after two rounds the director recommends one. The decision itself is then modelled as a persisted scenario for Kofi's approval ([Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md)).

## Configuring the team

**[Docs]**

- **Global context** (every agent): object types, saved object sets, actions, functions, and Workshop or other Foundry apps as tools. Agents can search the whole Ontology by default; turn off **Enable ontology search** to limit them to what you add.
- **Each agent**: system prompt, default model, memory, skills, Ontology context, actions, functions; a **delegation description** for the director; which other agents it can call directly as subagents. Mark **key skills**.

**[Explanation]** Put only what **every** agent needs in global context, as the docs advise; the rest goes on the specialist. A shared context full of everything is the team version of the context pollution AI FDE warns about ([05](05-ai-fde.md#what-it-is)).

## Skills and templates

**[Docs]** **Skills** say *how to do* work (name, description with search terms, content loaded when relevant). **Templates** say *what the output looks like* (sections and format for documents or slides; *Extract with AI* derives one from an existing artifact; upload a PPTX to keep images). The docs' own example is a delayed-shipment investigation skill plus a weekly operations report template.

**[Example]** Kestrel adapts that pair directly: skill `investigate-delayed-shipments` points at `Shipment.isLate`, `ShipmentEvent` and `CarrierInvoiceLine`; template "Weekly operations report" adds a section on re-route proposals accepted and rejected.

## Data and security

**[Docs]**

- Everything Boardroom creates is an Ontology object (a generated PPTX lives in a media set, with a slide-deck object holding its metadata), usable in your own apps.
- Each object has an **object security policy**: mandatory markings, CBAC, discretionary permissions and a default role (Owner, Editor, Viewer or **Restricted**, which allows only direct grants).
- Nested objects inherit the boardroom's markings and permissions; discretionary permissions can change later, markings can't.
- Boardroom-scoped skills inherit the boardroom's security; global skills have their own.
- Don't modify resources installed by MindKit directly; it can block upgrades.

---
[Module index](README.md) · Previous: [05 — AI FDE](05-ai-fde.md) · Next: [07 — Threads, Evolve and Realtime audio](07-threads-evolve-and-realtime-audio.md)
