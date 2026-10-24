# 05 — Security, ownership and history

*Sources: [Security](https://www.palantir.com/docs/foundry/automate/security/) · [Permissions](https://www.palantir.com/docs/foundry/automate/permissions/) · [Third-party application ownership](https://www.palantir.com/docs/foundry/automate/third-party-app-ownership/) · [Automation history](https://www.palantir.com/docs/foundry/automate/history/) · [History visibility and scope](https://www.palantir.com/docs/foundry/automate/history-visibility-and-scope/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Every automation answers two questions: **whose identity does it act with**, and **who can see what it did**. The first is fixed by the owner; the second by the automation's **scope mode**. They're set in different places, and a good choice for one can rule out the other.

## Whose identity

| Step | Runs with |
|---|---|
| Condition evaluation | The **owner**'s permissions |
| Action, Logic and function effects | The **owner**: criteria checked against them, function tokens issued to them, edits and audit logs attributed to them |
| Notification effects | **Each recipient**'s permissions |
| Manual execution | The **user who runs it**, for evaluating the input set; trigger-object checks are skipped |

**[Docs]** Editing an automation's condition or effects requires **taking ownership**; from then on its actions run as you. The docs' row-security example: notifications on a restricted-view `Sales Opportunity` type reach European users for a European opportunity, and US-only users see no event at all.

**[Docs]** Scenarios add one rule: the owner must be able to access the scenario object type and the scenario itself ([06](06-operating-automations.md#branches-scenarios-and-marketplace)).

## Third-party application ownership

**[Docs]** A **third-party application's service user** can own the automation, so it keeps running when people leave. Setup:

1. Register the application (needs the *third-party application administrator* role and *Manage OAuth 2.0 clients*): **confidential client**, **client credentials** grant. Save the secret; it's shown once.
2. Set the application to **Unrestricted** on its *OAuth & restrictions* page.
3. Give the service user **Editor** on the automation, or on the folder for a new one, and the permissions its actions need.
4. Enter the client ID and secret when creating the automation (*Provide client credentials → Third-party app*), or later under *Actions → Manage ownership*.

**[Docs]** Every later save needs the credentials again. Rotating the secret doesn't break the automation. Transferring ownership back to a person works only if that person has everything the service user had.

**[Explanation]** Step 2 is a real trade-off. Ontology 10-04 restricts applications so a bug can't reach data they don't need ([Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get)). An automation-owning application must be **unrestricted**, so its reach is the service user's own permissions. Scope those permissions tightly instead: Kestrel's *Kestrel Pay automation* group holds only that service user ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md#why-each-choice)).

## Who can see what happened

**[Docs]** History records triggers, recoveries, edits, subscriptions, failures, pauses and mutes. Select an event for its timeline, then an effect for **trace logs**. History is kept for **six months**; to keep more, write it to objects with an action, and use a **fallback** to record failures the same way.

| Scope mode | Run history (including effect details) visible to | Limits |
|---|---|---|
| **Project-scoped** (recommended) | Everyone who satisfies the **markings** on a run | All transitive resources must be imported into the project and re-imported when dependencies change. **Not supported:** stateful functions (deployed Python, AIP Chatbot functions), functions using a platform SDK, **notification effects**, cross-organization workflows. Restricted views need the owner and viewers to see all rows; object security policies must be re-imported after changes; TypeScript v1 dependency detection is best-effort |
| **User-scoped** | The **owner** only. With **shared history events** on, others see that runs happened, not effect status, errors or logs | — |

**[Docs]** Condition history (*triggered*, *recovered*) is also per user: you see whether the automation triggered **for you**, even if you created it.

**[Example]** Look at *High-risk payment hold* with this table:

- It has a **notification effect**, so it **can't be project-scoped**.
- It's owned by the Kestrel Pay **service user**, so in user-scoped mode the effect details (did the hold succeed, what was the error) are visible only to the service user, which nobody logs in as.

**[Recommendation]** Split it in two:

1. A **project-scoped** automation with the action effect and its fallback, owned by the application. The fraud team sees every run and every error.
2. The fraud-team **notification** as its own user-scoped automation on the same condition, or as a notification side effect of *Hold order for payment* itself ([Ontology 08-05](../../Ontology/08-actions/05-side-effects.md)).

**[Explanation]** Project scope needs every transitive resource imported into the project: here `Order` and *Hold order for payment* from `Commerce [Ontology]` go into `Payments [Ontology]`. And the fallback alert is an action whose side effect sends a notification; whether that's allowed in project scope (which rules out notification *effects*) isn't documented, logged as [RQ-12](../SOURCES.md#open-research-questions).

Adopted October 21, 2026: the Kestrel model now lists the two automations ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)).

---
[Module index](README.md) · Previous: [04 — Execution settings](04-execution-settings.md) · Next: [06 — Operating automations](06-operating-automations.md)
