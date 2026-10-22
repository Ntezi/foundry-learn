# 01 — Automate concepts

*Sources: [Automate overview](https://www.palantir.com/docs/foundry/automate/overview/) · [Getting started](https://www.palantir.com/docs/foundry/automate/getting-started/) · [Manual execution](https://www.palantir.com/docs/foundry/automate/manual-execution/) · [Integrations](https://www.palantir.com/docs/foundry/automate/integrations/) · checked October 21, 2026 · Ready for Review*

**[Concept]** An automation is a **condition** that Foundry checks for you, continuously or on a schedule, plus one or more **effects** that run when it's met. It's how a workflow keeps moving when nobody is looking at a screen. [Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md) designed one Kestrel automation as a spec sheet; this module covers the whole product.

**[Docs]** Automate replaces **Object Monitoring** as the single entry point for business automation and is backwards-compatible with it. It's for **business** automation; pipeline and connection health belongs to health checks.

| Part | Options | Note |
|---|---|---|
| **Condition** | Time (schedule or cron), object set changes on the Ontology, a combination of both, dataset updates, streams | [02](02-conditions.md) |
| **Effect** | Submit actions, run AIP Logic, run functions, send platform and email notifications with attachments | [03](03-effects.md) |
| **Settings** | Evaluation frequency, retries, muting, pausing, expiration, administrators | [04](04-execution-settings.md) |
| **Identity** | Runs as its **owner**, a user or a third-party application's service user; notifications use each recipient's permissions | [05](05-security-ownership-and-history.md) |

**[Docs]** The docs' use cases:

- scheduled reports and digests, with PDFs from Notepad, Notepad templates or Contour attached;
- data alerting, such as open issues crossing a threshold;
- workflow automation: remediating anomalies through an action, or applying suggestions automatically, including webhook calls to external systems;
- watched searches on saved explorations.

**[Docs]** The overview also asks you to plan before building: document each effect's purpose, data scope, execution identity and potential impact; decide whether consequential changes should be **staged for human review**; and keep a recovery path when automatic execution could affect people or operations.

**[Explanation]** That planning step is the same control ladder Kestrel uses for its agent ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#where-kestrel-puts-each-operation)). An automation is an agent with no judgement: whatever it's allowed to change, it changes every time the condition fires.

## A first automation

**[Docs]** Open Automate (or **+ New → Automation** in a folder). The wizard goes **Condition → Effect → Summary**, then asks for a file name, location, **expiration** (indefinitely, immediately, or until a date) and permissions. The Overview page counts automations you can see, own, receive, and that are paused, and lists failures from the last four weeks.

## Running one by hand

**[Docs]** **Manual execution** runs an automation's effects now, on an object set you choose: useful for **backfills** and for testing before release.

- It runs **as the user who selects Execute**, who needs edit permission on the automation. The input set is evaluated with that user's token.
- Trigger conditions are **bypassed**, so trigger-object permission checks for recipients don't happen.
- Paused automations can be run manually; expired, trashed or disabled ones can't.
- Input: a defined set (static or filtered), a **saved** set, or a **function-generated** set returning the condition's object type.
- **Batch size** splits the set; batches are scheduled **1 minute apart**, in random order. **Parallelism** runs several at once.
- Results appear in event history with a **flame chart** and service logs.

**[Docs]** Large backlogs can hit **snapshot expiration** errors. The fix the docs give: a function that returns the oldest N unprocessed objects, run repeatedly until the backlog is under about **100,000**, then let the normal condition take over.

**[Example]** When Kestrel first switched on *High-risk payment hold*, payments already scored HIGH weren't *added* to the set, so the live condition would never see them. A one-off manual execution on `Payment where riskAssessment.band = HIGH`, with a small batch size, holds the existing ones. Orders already on hold fail the action's `status is not ON_HOLD` criterion and are left alone ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#what-can-go-wrong)). **[Explanation]** Run it as a member of the fraud team who satisfies the action's criteria: a manual run uses **your** identity, not the automation owner's.

## Where automations start from

**[Docs]** Besides Automate itself:

| From | What it adds |
|---|---|
| **AIP Logic** | Automate a Logic function. With **staged writes** on, call it through an action effect (the action type wraps the function); without, use a Logic effect |
| **Autopilot** | *Open in Autopilot* builds a workbench with the automation and related ones ([10-02](../10-workflow-tools/02-autopilot.md)) |
| **Contour**, **Notepad** | Attach dashboards or (templated) documents to notification emails; Notepad's *Add automation* prefills the attachment |
| **Object Explorer** | Save an exploration, then *Monitor* to automate on it |
| **Ontology Manager** | An *Automations* tab on object types (which automations watch it) and action types (which automations call it) |
| **Quiver** | Save periods of interest from a time-series search as events in the Ontology |

---
[Module index](README.md) · Next: [02 — Conditions](02-conditions.md)
