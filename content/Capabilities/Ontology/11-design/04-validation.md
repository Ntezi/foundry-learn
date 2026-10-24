# 04 — Ontology design: Validation

*Sources: [Ontology design: Validation](https://www.palantir.com/docs/foundry/ontology/ontology-design-validation/) · checked September 25, 2026; quotes re-verified October 4, 2026 · Ready for Review*

> Moved from `Ontology Design/` to this folder on October 2, 2026, with content unchanged apart from the header and small wording fixes in the October 4 quality review. See [MIGRATION](../MIGRATION.md).

Labels: **[Docs]** paraphrases the Palantir page · **[Explanation]** and **[Example]** are our own additions.

## The core idea

**[Docs]** A structural review (pages [01](01-best-practices.md)–[03](03-anti-patterns.md)) checks that the Ontology is **coherent and correct**. It **can't** check that anyone can **use** it. **Task-based validation** fills that gap: test the model against the decisions and investigations it has to support, with the people and agents who will rely on it.

**[Docs]** Palantir runs internal **analytical drills**. Teams get business questions they haven't seen before, from simple counts to multi-step investigations. They answer them using only **general-purpose analysis apps**, not dashboards or workflows built for the task, so the **Ontology itself** is being tested. The page recommends adapting these drills to your organization. The Ontology isn't a raw copy of the source systems; it's the interface through which people and agents understand the enterprise and make decisions.

**[Docs] Five lessons from the drills:**

| Lesson | Section |
|---|---|
| Structural correctness doesn't guarantee usability | Limits of structural review |
| Real business questions are the best acceptance tests | Sourcing questions |
| New users provide the most important evidence | Drill design |
| Time to answer is a design signal | Reading the results |
| People and agents expose different weaknesses | People vs agents |

---

## 1. Limits of structural review

**[Docs]** A structural review can say whether a type is a coherent entity, whether link cardinality makes sense, or whether types should share an interface. That's essential, because it catches expensive-to-reverse mistakes. What it can't do is recreate the experience of **arriving with only a business question**.

That experience starts from an **operational condition**, not a schema: output drops, a shipment is late, stock is missing, a delay threatens planned work. The user has to translate the condition into the Ontology's language, find a starting type, and follow links that match how they understand the organization. At each step the model **either carries the context or hands the burden back to the user**:
- an ambiguous type forces a guess;
- a missing **alias** means the familiar name finds nothing;
- a link that mirrors a source join, not a real relationship, breaks the investigation;
- a duplicated concept means the user must already know which one is authoritative.

**[Docs]** A **builder** can get past these weaknesses from memory, so **a builder alone can't validate the design**. The context that makes the path obvious comes from the builder, not from the Ontology.

**[Explanation]** It's like testing a program only with its author at the keyboard. The author knows which inputs to avoid. Real validation needs users who don't.

## 2. Sourcing real business questions

**[Docs]** If builders look at the Ontology and ask *what can it answer?*, they only confirm coverage they already know about. That approach **misses exactly the concepts that never made it into the design**. Take questions from the organization's **operating rhythm** instead:
- what leaders repeatedly ask their teams;
- what teams need from each other before deciding;
- which investigations depend on one experienced person who knows where everything is;
- which recurring reports exist only because the answer is otherwise hard to assemble;
- what users wish they could get without asking a technical team.

**[Docs]** The best questions are **common and consequential**: decisions made often, under real constraints, where delay or error is costly.

**[Docs] The shape of a good question sequence.** Start where a leader or operator notices a significant condition, then move down to the objects and relationships that explain it:
1. **Establish the situation:** which customer, facility, asset, portfolio or result needs attention?
2. **Trace the contributing factors:** follow links to the orders, events, materials, positions or observations behind it.
3. **Assess the impact:** what else is affected, what's at risk, and where can teams step in?

**[Docs]** If the Ontology **can't express an important question naturally, keep the question in the set**. The failure is a result: look for a missing concept, relationship or piece of business logic.

**[Docs] The example sets.** The page gives six-question sequences for **manufacturing, healthcare, logistics, financial services, sensor analysis, defense intelligence and defense operations**. Each goes from the top-level condition (the worst facility, customer, region, portfolio or unit) through the contributing factors (the specialties, work orders, shipments, positions, sensors or maintenance actions behind it) to the impact (what can absorb the problem, what's still at risk, what else looks similar). Several deliberately need **multi-level traversal**, for example components several levels down a bill of materials.

**[Example] Our own sequence for the Pipeline deep dive's retail data** (customers, products, transactions):
1. Which customer generated the most revenue this quarter? *(situation)*
2. Which product variations make up most of that revenue? *(factors: transactions → variations)*
3. Did that customer's spending come from a few large orders or many small ones? *(factors, needs transaction-level detail)*
4. Which other customers buy the same top variations? *(impact: variation → transactions → customers)*
5. If the top variation's price rose 10%, which customers' revenue would change most? *(impact; may reveal that pricing logic isn't modeled)*

Question 5 is the useful kind of failure. If nobody can answer it, the model probably lacks pricing as its own concept, with price history rather than a single `price` column.

## 3. Drill design decisions

**[Docs]** Three choices decide how much a drill reveals.

| Decision | Docs guidance | Why |
|---|---|---|
| **Tools** | **Exclude purpose-built apps.** | A good Workshop app builds in the starting point, path, filters and calculations. It can be an excellent workflow and still tell you nothing about whether the model is discoverable on its own |
| **Participants** | Prefer **domain experts who didn't build it**, and **newer users** | A builder shows what's possible with full knowledge. A non-builder expert shows whether names, descriptions and links explain themselves. A newcomer tests onboarding without relying on institutional memory |
| **Team vs individual** | Both, for different purposes. In teams, start with an **unassisted attempt** before coaching | Teams test shared fluency and how people explain the model to each other. Individuals isolate usability. Coaching too early hides where the confusion started |

**[Docs]** A drill measures **how much work the Ontology does for the participant**. What you observe matters as much as the answers.

## 4. Reading the results

**[Docs]** A correct answer is the **minimum**. Operational value also depends on how quickly someone finds the answer, can explain the path, and can act on it with confidence.

**[Docs] Record for each question:**
- correct or not;
- time taken;
- where people hesitated;
- which words they searched for;
- which types and links they tried;
- whether they needed help.

**Manual exports and hand-built joins are especially telling**: they usually mean a real business relationship exists that the Ontology doesn't model. The **path** can tell you more than the answer. When someone gets stuck, ask what they expected to find: their words point to a missing alias, an unclear description, or a missing relationship.

**[Docs] From symptom to likely cause:**

| You observe | Review | Related anti-pattern / guidance |
|---|---|---|
| No one can find a **starting type** | Names, aliases, too many visible types, missing descriptions | The Misnomer |
| People pick **different types for the same concept** | Duplicate or overlapping concepts | Department Silos |
| People can't **move between related concepts** | Missing, misnamed, wrongly directed or unavailable link | Link design |
| People **export or join by hand** | A relationship or reusable concept the Ontology lacks | Link design |
| **Reasonable paths give different answers** | Unclear level of detail (order vs order line vs shipment); ambiguous identities, units, dates or aggregation | Naming conventions |
| **Only builders succeed** | Source-system terms, hidden conventions, thin documentation | System Silos |
| A reasonable path is **consistently slow** | Query, indexing, volume or modeling performance | Normalization and derived properties |
| **No path works** | Missing data, coverage gap, or an unsupported analytical operation | — |

**[Docs] Before changing the model**, work out where the constraint really sits: the **model, the data, permissions, the analysis app, or user training**. One failure may be an edge case. **Repeated confusion around the same type or link is evidence of a systemic design problem.** To separate a model problem from a *knowledge* problem, rerun the questions **without human participants**.

**[Explanation]** "Reasonable paths give different answers" is often the most dangerous result, because each person is confident. It's the Ontology-level version of the Pipeline deep dive's bad join: two grains (order vs order line) look interchangeable until you add them up.

## 5. Comparing people and agents

**[Docs]** An Ontology has two kinds of consumer. **People** bring domain experience, organizational context and tacit knowledge. **Agents** can search and transform large volumes, try several paths, and don't depend on visual layout. After a human drill, run the same questions through **AIP Analyst or AI FDE** with the question and the necessary access, **but not the path the humans took**.

| Result | Investigate |
|---|---|
| Both succeed | Confirm the model gives a discoverable, expressive path |
| **AI succeeds, people struggle** | Human-facing names, aliases, descriptions, default views and visual hierarchy. Or the task really favours automated analysis at scale |
| **People succeed, AI struggles** | Business logic or domain knowledge the humans supplied from experience that **isn't explicit in the Ontology** |
| Both struggle | Missing data, links, semantics or reusable business logic |

**[Docs]** An AI-only run **doesn't replace** testing with people. It tests something else: whether the Ontology holds enough context for an agent to reason **without the team's unwritten knowledge**. That's the same gap a builder covers from memory, at the scale of the whole organization. If people succeed only because they already know the business, that knowledge is hard to automate and hard to pass on.

**[Explanation]** This connects the Ontology to the Intro course's progressive-automation story. You can only hand a decision to an agent if the knowledge it needs is *in the model*. "People succeed, AI struggles" is a list of exactly what's missing before that step is possible.

## 6. Exercise formats

**[Docs]** Two complementary formats.

**Quiz-style game (breadth: discoverability for people new to the model)**
- Questions stay **hidden until the start**. Teams may learn the Ontology in advance but can't rehearse an analysis.
- **Points by difficulty:** direct lookups and counts are worth little; multi-step, multi-type analysis is worth more.
- **The least familiar team member drives** the app while the others coach. This tests usability for newcomers *and* how well the team communicates its shared model.
- **General-purpose apps only:** the docs allow **Insight, Contour and Quiver**, and exclude purpose-built Workshop apps **and AI assistance (AIP Analyst, AI FDE)**.
- **Show your work:** points go to the first team to give an answer **and demonstrate the path** to a judge. An unsupported number doesn't count.

**Timed drill-down (depth: one connected investigation)**
- One **connected sequence**, where each question depends on the previous answer.
- Move from the **organization-level view to fine detail**, across several levels and domains.
- **Measure total time.** The fastest team wins, but every team's time and path are evidence about the design.

**[Docs]** Competition is optional. What it adds is urgency and focus, not the ranking.

## 7. Validation as an ongoing practice

**[Docs]** One design cycle won't produce a finished Ontology. Domains, conditions and decisions change. **Keep the process running.**
- **A first drill needs little:** a few consequential questions, representative participants who **didn't build** the model, a general-purpose app, and a facilitator recording **accuracy, time, confusion and help needed**.
- **After a drill:** prioritize changes that affect **several questions** or **block high-value workflows**.
- **Repeat some questions** to measure improvement, then **add unseen ones** to check the improvement generalizes.
- Over time the question set becomes an **evaluation suite for the Ontology**, used to judge new types, links, sources and logic against the decisions the model must support.

**[Docs] Closing test:** neither a complete list of object types nor an expert who can eventually assemble an answer validates an Ontology. People **and agents** must be able to go **repeatedly** from a consequential question to a trustworthy answer, by a path that reflects how the organization actually works.

**[Explanation]** Compare this with **AIP Evals** in the Agentic speedrun: a fixed test suite, rerun after each change, with results compared across versions. The drill question set plays the same role for the Ontology that an Evals suite plays for an AI function: it's a regression test for the model's usability.

---

## Key takeaways
- Structural review checks correctness. **Drills check usability.** You need both.
- Take questions from the organization's **operating rhythm**, and structure them as **situation → factors → impact**.
- **Exclude purpose-built apps**, use **non-builders**, and record **time, path, hesitation and exports**, not just answers.
- Run the same questions through **agents** without the human path, and read the four-way comparison.
- Keep the question set as an **evaluation suite**, and rerun it after every significant model change.

## Review checklist
- [ ] I can explain why a builder can't validate their own Ontology.
- [ ] I can write a six-question situation → factors → impact sequence for a domain I know.
- [ ] I can map five drill observations to likely causes.
- [ ] I can interpret each quadrant of the people-vs-agents comparison.
- [ ] I can describe both exercise formats and their rules.

---
[Design index](README.md) · Previous: [03 — Anti-patterns](03-anti-patterns.md) · Next module: [12 — Security and governance](../12-security-and-governance/README.md) · See also: [Case study 01 — Applied to our courses](../17-case-studies/01-course-ontologies-reviewed.md)
