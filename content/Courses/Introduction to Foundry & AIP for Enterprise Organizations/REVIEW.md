# Review guide — Introduction to Foundry & AIP for Enterprise Organizations

Explain each answer in your own words before you check the lesson it points to.

## The story in five sentences

1. Linear, assembly-line data flows leave three gaps: learnings aren't captured back into the system, decisions aren't carried out as actions ("swivel-chair"), and operators and analysts have no feedback loop between them ([03](03-linear-to-decision-centric-systems.md)).
2. Foundry and AIP are a decision-centric operating system built around the **Ontology**, the nouns and verbs of the business. It is the shared world for humans and AI ([06](06-what-is-the-ontology.md), [07](07-ontology-shared-world.md)).
3. The Ontology brings together **data** (what is), **logic** (how to think about it) and **action** (what you can do), under one security and governance framework ([08](08-three-pillars.md)).
4. **South** of the Ontology are data sources, logic sources and systems of action. **North** of it are analytics and workflows, automations, and products and SDKs ([05](05-high-level-architecture.md)).
5. Autonomy grows step by step: start with humans in the lead, add AI where it earns trust, and expand as evidence from Evals builds up. Branching, markings, audit and Apollo make that safe at enterprise scale ([16](16-evals-in-progressive-automation.md), [21](21-course-wrap-up.md)).

## Check yourself

| Question | Where |
|---|---|
| What are the three kinds of effort a workflow mixes? | [04](04-ai-labor.md) |
| Why isn't a frontier model enough on its own? Explain the brain/body metaphor. | [05](05-high-level-architecture.md), [17](17-frontier-models-to-enterprise-outcomes.md) |
| Name four audiences the Ontology serves at the same time. | [07](07-ontology-shared-world.md) |
| What do Virtual Tables, zero-copy federation and pushdown compute have in common? | [09](09-data-sources.md) |
| How does existing model code in Docker reach Foundry? | [10](10-logic-sources.md) |
| Why do actions have to be governed and auditable for "who *or what*"? | [11](11-systems-of-action.md) |
| How do analytics in Foundry differ from traditional BI? | [12](12-analytics-and-workflows.md) |
| Why would an LLM call a deterministic model? | [13](13-automations-and-progressive-automation.md) |
| What does the OSDK let an existing application do? | [14](14-products-and-sdks.md) |
| What is the evidence needed before AI takes on more of a workflow? | [16](16-evals-in-progressive-automation.md) |
| What goes beyond RBAC: purpose-based controls, markings or active controls? Define each. | [18](18-security-and-governance.md) |
| How do runtime controls differ from branching? | [19](19-branching.md) |
| Which deployment environments does Apollo support? | [20](20-apollo.md) |

## Traps to watch for in exam options

- **"Replace your warehouse, data lake or ERP."** The course says the opposite: connect what you have, with no rip-and-replace and no lock-in.
- **"AI instead of humans."** The course's framing is human *and* AI, in the right mix, which changes over time.
- **"Analytics are the end product."** In Foundry, analytics come out of workflows and lead to action in the same place.
- **"RBAC is enough."** The course adds purpose-based controls, markings that travel with the data, active controls and audit of both humans and AI.
- **"Branching is just version control."** It is a governance mechanism for what reaches production.
