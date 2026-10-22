# 06 — Operating automations

*Sources: [Performance best practices](https://www.palantir.com/docs/foundry/automate/performance-best-practices/) · [Troubleshooting performance](https://www.palantir.com/docs/foundry/automate/troubleshooting-performance/) · [Limits](https://www.palantir.com/docs/foundry/automate/limits/) · [Errors](https://www.palantir.com/docs/foundry/automate/errors/) · [Branching automations](https://www.palantir.com/docs/foundry/automate/branching-automations/) · [Automations on Ontology scenarios](https://www.palantir.com/docs/foundry/automate/automations-on-ontology-scenarios/) · [Automate in Marketplace](https://www.palantir.com/docs/foundry/automate/marketplace-automate/) · Examples: [weekly report](https://www.palantir.com/docs/foundry/automate/example-weekly-report/), [auto-close tickets](https://www.palantir.com/docs/foundry/automate/example-relative-time-condition/), [contract owners](https://www.palantir.com/docs/foundry/automate/example-dynamic-contract-owner/) · checked October 21, 2026 · Ready for Review*

**[Concept]** An automation that works on day one can still go wrong later: when objects start updating more often, when another automation starts reacting to its edits, or when a dependency changes. This note covers the habits and limits that keep automations cheap and predictable.

**[Docs]** The first question the docs ask is whether you need an automation at all. If people change properties by hand, an action run from Workshop or Object Explorer is cheaper and gives them control over when it runs.

## Performance: three levers

**[Docs]** Each lever depends on the one before: effects can only work in bulk if the condition delivers objects in bulk.

| Lever | Prefer | Why |
|---|---|---|
| **1. Condition** | For objects updated often (100+ times a day), combine the object condition with a **time** condition | Caps evaluations at the schedule's frequency |
| **2. Execution mode** | **Single execution** (once for all objects) | One run for everything instead of one per object |
| **3. Effect design** | Actions that take an **object set**, then an object array, and a single object only when the logic needs it | Large inputs pass efficiently; functions should aggregate on the backend, not loop |

**[Docs]** The docs' arithmetic: 1,000 objects updating 100 times a day can trigger up to **100,000** evaluations a day. A 5-minute time condition caps that at **288** (1,440 ÷ 5), up to **340×** fewer. And one action that calls a function generating many notifications beats running a notification action per object.

**[Example]** *High-risk payment hold* runs **once per object** ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#the-spec-high-risk-payment-hold)). **[Explanation]** That's acceptable: HIGH payments are rare, and each hold is its own decision. It becomes the wrong choice in the burst the spec sheet already plans for (a model bug scoring thousands HIGH). That's one more reason to treat an auto-pause as an incident rather than resume blindly.

### When costs spike

| Pattern | Cause | Fix |
|---|---|---|
| **Frequently updated objects** | An *on update* condition with no time cap, often just **unpaused** | Pause; add a time condition; single execution; resume and watch for a day |
| **Snowballing chain** | A edits objects that trigger B per object, which triggers C | Pause downstream; consolidate; bulk inputs; re-enable one at a time |
| **Inefficient functions** | An Ontology query inside a loop | Load in bulk, aggregate on the backend, take object sets |
| **Self-calling loop** | A function's edits re-trigger its own automation | A status flag or timestamp guard; check before editing |

**[Docs]** Mitigation order: **pause** first, assess impact in **Resource Management** and find downstream automations, apply the quick fix, then resume and monitor. Autopilot and Workflow Lineage trace chains ([10](../10-workflow-tools/README.md)).

## Limits

| Limit | Value | When reached |
|---|---|---|
| Objects per live evaluation | **10,000** | First 10,000 processed (if dropping is on) or an error |
| Objects per scheduled evaluation with per-object execution | **10,000** | Error before any effect runs |
| Scheduled *added*/*removed* input | **100,000** | Error on save or at evaluation |
| *Run on all objects* input | **1,000,000** | Error on save or at evaluation |
| Manual execution set | **5,000,000** | Error |
| Batch size | **1,000** | Runtime error |
| Recipients | **10,000** | Error |
| Scenarios tracked | **100** | Error on save, or evaluation fails |
| Wait in the execution queue | **45 min** | Event terminated; no effects run |
| Event runtime | **4 hours** | Event terminated; completed effects kept |

**[Docs]** Events queue when *Queue effect executions* is on, or because of an internal limit on parallel events: they start in trigger order but may finish out of order. The system can **auto-pause** an automation for excessive activity; manual runs and retries still work while it's paused.

## Errors

**[Docs]** Evaluation errors include:

- **Out of sync**: an automation built on a saved exploration keeps the exploration **as it was when saved**, and shows a warning when the exploration has changed since.
- **Snapshot expiration** on large manual runs ([01](01-automate-concepts.md#running-one-by-hand)).
- **Permissions**: evaluation uses the owner's or recipients' access. The docs strongly recommend keeping automations and their resources in **shared projects**.

**[Docs]** Action effects fail when the action changed incompatibly, criteria aren't met, or the backing function fails. With per-object execution, the error shows the **first** failing object; others may be hidden. **Cycle detection** disables live automations that keep triggering each other, such as red cars turned blue and blue cars turned red; *Allow cycles* permits up to 50.

## Branches, scenarios and Marketplace

**[Docs]** **Global Branching**: add an automation to a branch and it evaluates and executes **on that branch**, against branched object types, action types and function versions. Renaming it on a branch renames it on main too. Supported conditions on branches: time, added, removed, modified, run on all. Not supported: threshold, automation dependency, time series, dataset, stream, metric changed. All effects work. Merging needs approvals, a **rebase** onto main (whole-automation choice, no finer merge) and a valid automation. *Branch protection → Protect with project policy* forces all edits through branches.

**[Docs]** **Ontology scenarios**: an automation can also run on every active scenario represented by objects of chosen **scenario object types**, evaluating each independently. Actions apply to the scenario; Logic, functions and function-generated notifications run in its context, and dynamic recipients come from scenario values. Same supported conditions as branches; no temporary scenarios; up to **100** scenarios.

**[Example]** Kestrel's `Planning Scenario` implements the Ontology Scenario interface ([Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md)). **[Explanation]** With scenario support on, *High-risk payment hold* would also hold orders **inside** each planning scenario, which is wrong for a fraud control: a planner's what-if isn't a real payment. Leave scenario support off for automations whose job is to protect real operations.

**[Docs]** **Marketplace**: automations using saved object sets, or with recipients that aren't **groups**, can't be packaged. Automations with action or Logic effects can't be installed in **Production mode**, because they don't upgrade automatically.

## The docs' three examples

| Example | Condition | Effect | Lesson |
|---|---|---|---|
| Weekly report of new tickets | *Added* on all tickets, **scheduled** Mondays 8:00 | One notification for all, with a **Notepad template** PDF | A schedule turns *added* into a digest, sent only if there's something new |
| Auto-close inactive tickets | *Added* with *not closed* and *last update ≥ 365 days ago* | Action *Close Support Tickets*, once for all | A **relative time** filter forces scheduled (daily) monitoring |
| Notify contract owners | *Added* with status *Requires review* | One notification **per contract**, to owners from a user-ID array property, content from a function taking the **recipient** | Dynamic recipients still need Viewer on the automation; set administrators so owners don't get status noise |

---
[Module index](README.md) · Previous: [05 — Security, ownership and history](05-security-ownership-and-history.md) · Next module: [09 — Carbon workspaces](../09-carbon-workspaces/README.md)
