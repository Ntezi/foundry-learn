# 04 — Execution settings

*Sources: [Automation administrators](https://www.palantir.com/docs/foundry/automate/automation-administrators/) · [Automation settings](https://www.palantir.com/docs/foundry/automate/execution-settings/) · [Evaluation frequency](https://www.palantir.com/docs/foundry/automate/evaluation-frequency/) · [Manual and automatic retries](https://www.palantir.com/docs/foundry/automate/retries/) · [Muting, pausing, and expiration](https://www.palantir.com/docs/foundry/automate/muting-pausing-expiration/) · [Notification settings](https://www.palantir.com/docs/foundry/automate/notification-settings/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Settings decide how often an automation looks, how it recovers when an effect fails, how it's stopped, and who hears about problems. The *Automation settings* page itself is only an index: condition settings are in [02](02-conditions.md#condition-settings) and effect settings in [03](03-effects.md#effect-settings).

## Evaluation frequency

| Condition | Live | Scheduled | After another automation |
|---|---|---|---|
| Time | — | ✓ | — |
| Objects added / removed | ✓ (batch pipelines only) | ✓ | ✓ |
| Objects modified | ✓ | — | — |
| Run on all objects | — | ✓ | ✓ |
| Threshold crossed, Metric changed | — | ✓ | — |

**[Docs]** **Live** monitoring evaluates within minutes of a change, **after indexing**: user edits (patches) arrive faster than dataset rebuilds (base versions). It needs **Object Storage v2**, and an automation must be re-saved after its type migrates from v1. Live monitoring isn't available for:

- relative time filters;
- more than one object type, or joined sets;
- some filter types (prefix, terms, phrase);
- filters on **derived properties**;
- function-generated sets;
- **interfaces**.

**[Docs]** **Scheduled** monitoring is the fallback, and the UI says which feature forced it. It supports filters on derived properties, and adding a schedule to an *added* condition turns it into a **digest**: on Monday at 8:00, everything added since last time. The docs warn that frequent scheduled monitoring of complex queries can use a lot of compute.

**[Explanation]** Kestrel's hourly sweep for open `Case`s older than 48 hours is scheduled for two reasons: it's on an **interface** and uses a **relative time** filter ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#why-each-choice)).

## Retries

**[Docs]** Three layers:

| Layer | Handles | Configure |
|---|---|---|
| **Per-effect automatic retries** | Short transient errors: AIP rate limits, webhook errors | On action and Logic effects: constant or exponential backoff, with **jitter** (a factor such as 0.25 turns a 100 ms delay into 75–125 ms, or a fixed duration) |
| **Event retries** | Outages and degraded services | Interval under **24 hours**; **1 to 5** retries. Only objects that failed with a retryable error (rate limits, outages, `Actions:ObjectVersionChanged`) are retried, as a **new event** linked from history |
| **Manual retry** | Misconfiguration you've now fixed | *Retry failed events*, choose events and effects; reruns on the **latest** configuration. Failed batches of a manual execution can be retried too |

**[Docs]** Manual retries work on paused automations, not on expired, trashed or disabled ones. Fallbacks run only after the last retry ([03](03-effects.md#fallbacks)).

**[Recommendation]** Use event retries for anything that calls an LLM or an external system, and keep the fallback for errors a retry won't fix. That's the design [Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#what-can-go-wrong) chose: three retries, then the on-call analyst.

## Muting, pausing and expiration

| State | Conditions evaluated? | Effects? | Manual runs and retries? | Who changes it |
|---|---|---|---|---|
| **Muted** | Yes, and history is recorded | No | — | Any Editor; or automatically |
| **Paused** | No scheduled or live triggers; active executions are interrupted | No | **Yes**, with a warning | Any Editor; or automatically |
| **Expired**, trashed or disabled | No | No | **No** | — |

**[Docs]** Automatic versions:

- **Auto-mute**, if enabled: mutes when all effects failed for at least **80%** of the past **30** events.
- **Auto-pause** on excessive activity or cycles ([06](06-operating-automations.md#limits)).

**[Docs]** **Expiration**: an automation can run indefinitely or until a date, changed by any Editor in the Summary tab. The same page also says the longest permitted expiration date is **six months** from now. The docs' own examples set automations to "never expire". The two statements conflict; logged as [RQ-09](../SOURCES.md#open-research-questions).

**[Explanation]** Whichever is true, treat expiry as a failure mode. If an automation has to keep running, someone must get the *expiration date approaching* notice, which is what automation administrators are for.

## Who gets warnings

**[Docs]** By default the **owner and every notification recipient** receive automation warnings and errors. **Automation administrators** (users or groups) take over two classes:

- **information notifications**: expiry approaching or reached, auto-pause for cycles or limits, evaluation errors;
- **effect failure notifications**: an action failed, a notification or attachment failed.

A user only ever receives effect failures **for themselves**, so setting effect failures to *Only administrators* means only administrators hear about them.

**[Example]** *High-risk payment hold* notifies the whole `kestrel-pay-fraud` group. Without administrators, every fraud analyst would also get the expiry and evaluation-error notices. Set the administrators to the fraud on-call group, the same people who get the fallback alert. The docs' contract-owner example does the same thing for the same reason.

**[Docs]** Each user also chooses, in their own settings, which Automate notifications they receive: triggered, recovered, errors, and other events (edited, subscribed, muted, paused…).

---
[Module index](README.md) · Previous: [03 — Effects](03-effects.md) · Next: [05 — Security, ownership and history](05-security-ownership-and-history.md)
