# 02 — Conditions

*Sources: [Time condition](https://www.palantir.com/docs/foundry/automate/condition-time/) · [Object set conditions](https://www.palantir.com/docs/foundry/automate/condition-objects/) · [Dataset condition](https://www.palantir.com/docs/foundry/automate/condition-dataset/) · [Condition settings](https://www.palantir.com/docs/foundry/automate/condition-settings/) · [Automation dependencies](https://www.palantir.com/docs/foundry/automate/automation-dependencies/) · [Streaming](https://www.palantir.com/docs/foundry/automate/streaming/) · checked October 21, 2026 · Ready for Review*

**[Concept]** The condition decides **when** an automation runs and **which objects** its effects receive. Choosing it well matters more than any effect setting: an effect can only process objects in bulk if the condition hands them over in bulk ([06](06-operating-automations.md#performance-three-levers)).

## Time

**[Docs]** Hourly, daily, weekly or monthly in the UI, or **cron**:

- exactly **five fields** (minute, hour, day of month, month, day of week); no seconds or years;
- at most once per **minute**, or once every **5 minutes** if the condition calls a function;
- special characters `* - / , L #`; `W` isn't supported;
- several non-overlapping cron expressions can share one condition.

**[Docs]** The next evaluation is scheduled only after the previous one finishes and its effects are queued, so **evaluations never overlap**; a slow evaluation pushes the next one later. Effects from one run can still be running when the next evaluation starts.

## Object set conditions

**[Docs]** Watch a set defined by type and filters, a **saved** set, or a **function** returning `ObjectSet<T>`. A function-generated set runs **once for the system plus once per subscriber** at each evaluation. Changes can come from datasets, actions or external apps, and are usually seen within minutes.

| Condition | Fires when | Effect input | Evaluation |
|---|---|---|---|
| **Objects added to set** | An object enters the set: a new object, or an edit that makes it match the filter | Single object, object set, or a property | Live or scheduled; automation-dependent |
| **Objects removed from set** | An object leaves the set. **Deleted** objects don't count | Single object or object set | Live or scheduled; automation-dependent |
| **Objects modified in set** | Any (or chosen) property changes on an object in the set; optionally include objects entering or leaving | Single object or object set | **Live only** |
| **Run on all objects** | On a schedule, for every object in the set; respects batch size and parallelism | Objects | Scheduled; automation-dependent |
| **Threshold crossed** | All checks are true: a metric compared with a value, or a function returning a Boolean. Records an event each time it crosses, **in either direction** (triggered / recovered) | — | Scheduled |
| **Metric changed** *[Sunset]* | A count or aggregate goes up or down | — | Scheduled; use *Objects modified* instead |

**[Docs]** With **no filter**, *Objects added to set* fires only for **brand-new objects** of the type. To use *modified* for one specific value, the docs suggest *added* with that value as a filter instead.

**[Explanation]** Kestrel's *High-risk payment hold* depends on exactly this: the filter `riskAssessment.band = HIGH` turns an edit into an "add" ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#why-each-choice)).

## Dataset conditions

**[Docs]** Fire when a transaction is **committed** to a chosen branch of a dataset: on every update, or when it has at least or at most N rows (N from **0 to 300**). The count is the whole dataset after the commit, not the rows added, and the threshold doesn't need to be **crossed**: every qualifying update fires. *At most 0* means *updated and empty*. Dataset conditions aren't supported on Global Branching branches of the automation.

**[Example]** Kestrel's invoice extraction transform appends parsed lines each month ([AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md)). A dataset condition on its output (*any update*) could tell Lena's team that the month's lines are ready. *Considered, not adopted* ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)). **[Explanation]** A row-count condition can't answer *did this run add anything?* on an append-only dataset: it counts every row, so *at least 1* fires on every build. Watch the objects instead, for example *Objects added to set* on unmatched `CarrierInvoiceLine`s.

## Streams

**[Docs]** Two routes for near real-time work, with effects within **seconds**:

- **Stream-backed object types**: no throughput limit, but live monitoring supports only *Objects modified in set*, and you can't pick properties; every change is processed.
- **Streaming datasets**: up to **200 records per second**. Binary columns are decoded before reaching the effect.

## Condition settings

**[Docs]** Under *Advanced settings* on the Condition page:

| Setting | What it does | Limits |
|---|---|---|
| **Allow cycles** | Lets automations that trigger each other run up to **50** cycles instead of being stopped by cycle detection | Live monitoring only |
| **Drop objects over the live scale limit** | Processes the first **10,000** objects of a large event and drops the rest, instead of failing | Live monitoring only |
| **Queue effect executions** | Processes this automation's events **one at a time**, in trigger order | Lower throughput; within one event, effect concurrency still applies |
| **Skip events from peering patches** | Ignores edits that arrived through Ontology **peering** | Live object set conditions only; bulk peered base versions still trigger; may need enabling by Palantir |

**[Docs]** The docs give two reasons to queue: guaranteed **order** (a *started* notification before *finished*), and fewer **conflicts**. Two actions can't edit the same object at once: the second fails with a conflict and has to retry.

**[Explanation]** Kestrel shares narrow types with Northwind Freight ([Ontology 12-05](../../Ontology/12-security-and-governance/05-shared-ontologies-and-cross-org.md)). That's a shared ontology, not peering, so *skip peering events* doesn't apply. It would matter only if Kestrel ran the same automation on two peered enrollments.

## Automation dependencies

**[Docs]** A **dependent** automation runs when its **parent** completes, whether the parent **succeeded or failed**; you can't restrict it to one outcome. Optionally:

- add an object set condition (*added*, *removed* or *run on all*), evaluated at each parent completion instead of on a schedule;
- add a **wait time** after the parent finishes;
- *Always trigger effects when automation completes*: run effects even if no objects matched. A static notification runs once, per-object effects run nothing, and a whole-set effect runs once with an **empty** set.

**[Docs]** Limits: **one level only** (no grandchild), the watched object type must support **Project scoping**, and dependencies can't be used on branches.

**[Recommendation]** Because the child runs after both success and failure, never use a dependency to mean *continue if it worked*. Put that logic in the child's condition (for example, objects whose status the parent set), or in the parent's own sequential effects ([03](03-effects.md#effect-settings)).

---
[Module index](README.md) · Previous: [01 — Automate concepts](01-automate-concepts.md) · Next: [03 — Effects](03-effects.md)
