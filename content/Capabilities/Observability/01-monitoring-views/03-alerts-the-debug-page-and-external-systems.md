# 03 — Alerts: the debug page and external systems

*Sources: [Alert debug page](https://www.palantir.com/docs/foundry/monitoring-views/alert-debug-page/) · [Sending alerts to external systems](https://www.palantir.com/docs/foundry/monitoring-views/external-systems/) · checked October 23, 2026 · Ready for Review*

What happens after a rule fires: the page that explains *why*, and the three ways the news leaves Foundry. The second page is the one with a security consequence, so it gets the longer treatment: a Slack message can carry a dataset's **name** only if every marking on it has been declared exportable.

## The alert debug page

**[Docs]** "a detailed diagnostic view for a monitor rule firing on a specific resource", opened from *Troubleshoot alerts > View details*. Scope today: **function and action type** resources with **single-condition** rules; composite rules are not supported, and opening the page for one, or for another resource type, redirects to the Troubleshoot alerts tab. "Support for additional rule and resource types is planned."

| Section | What it shows |
|---|---|
| **Header** | Monitor name with the template it was created from; a status line "on <resource> since <time>"; *Snooze* (with an indicator while active); *Edit monitor*; a back arrow |
| **Metrics** | *Current value / Threshold* with the timestamp of the latest evaluation; *Window duration* for windowed conditions; a status badge, *Passing* or *Failing* with the severity; the monitor description; hover the condition tag for every severity's threshold |
| **Standard operating procedure** | Up to **two** SOPs, each a link to a **Notepad** resource: the *monitor rule SOP* you attach from *Manage monitors*, and a read-only *default template SOP* "provided by the service" if the template has one |
| **Chart** | The metric over time, description varying by resource type, with a date range picker |
| **Alert history** | A timeline of status transitions "over the past 30 days", scrolling to load more |
| **Dive deeper** | **Workflow Lineage** (run history, pre-filtered by the firing condition's metric as in [01](01-monitoring-views-and-core-concepts.md#5-from-an-alert-to-the-lineage)); **Ontology Manager** (the resource overview); **Code Repositories** for function alerts, "only when the function's source repository is known" |

**[Explanation]** The SOP card is the small feature with the large effect. A rule that fires at three in the morning is only as useful as the sentence that says what to do, and the page gives that sentence a fixed home: a Notepad document attached to the rule, shown next to the metric that woke someone up. Module 04 writes one per Kestrel rule.

## Sending alerts out

**[Docs]** When monitors "fire or resolve", alerts go to subscribers in Foundry and, optionally, to **PagerDuty**, **Slack** and **webhooks**. The rule that governs all three: "All integrations are configured against a given severity level. Only alerts matching that severity will trigger the integration." The page's example: a PagerDuty integration on MEDIUM is not triggered by LOW or HIGH alerts. So one integration per severity you want to route, each configured on the view's *Manage subscriptions* tab.

### PagerDuty

**[Docs]** Uses the PagerDuty **Events API V2** and "usually does not require a service user, emails, or custom allowlisting or egress configuration". One integration maps all alerts of one severity in one view to an Events V2 integration on a PagerDuty **service**; several integrations may share one integration key. Setup: configure the PagerDuty service (escalation policy, urgency, support hours), add an *Events API V2* integration on its Integrations tab, copy the **Integration Key**; then in Foundry, *Manage subscriptions > PagerDuty Notifications > +*, with a name, the key and the severity; repeat per severity.

**[Docs]** *Enable PagerDuty for health checks*: by default the view pages for monitoring-rule alerts and for legacy health checks in the check group linked to it, but "monitoring views created before the v1.860.0 release (February 2024) will not produce PagerDuty alerts by default and must be manually enabled" with that checkbox. Health check severities map Info/low → LOW, Moderate/medium → MEDIUM, Critical/high → HIGH integrations.

### Slack

**[Docs]** Needs a **Slack source in Data Connection** with a bearer token holding `channels:join` (the app joins requested channels itself), `channels:read` (list channels), `chat:write` (send) and optionally `groups:read` for private channels. The page's recipe: create a Slack app, add those as *Bot Token Scopes* under *OAuth & Permissions*, install it, copy the *Bot User OAuth Token*. In Foundry, *Manage subscriptions > Slack > +*, pick the source, pick channels, set the severity; for a private channel, invite the app and grant `groups:read`.

**[Docs]** **Resource names in messages.** A Slack alert shows the human-readable name ("Production Sales Dataset") instead of the RID only "when all Markings on a resource are included in the Slack source's exportable markings configuration"; otherwise the RID. The example: a dataset "Customer Revenue Data" with the *Confidential* marking in the *Sales* organization shows its name only if **both** Confidential and Sales are exportable. Configuring exportable markings: in Data Connection, the source's *Connection settings > Export configuration*, toggle *Enable exports to this source*, add markings **and** organization markings, save. Permissions: enabling exports needs "the Owner role on the Slack source and the Information Security Officer enrollment role"; after that a source Owner can add markings alone; adding a security marking needs *Apply marking* and *Remove marking* on it, adding an organization needs *Expand access* "unless it is your own organization". The page's advice: start with less restrictive markings; "if any marking on a resource is not in the exportable list, the RID will be shown instead of the name". And a format warning: bots parsing these messages "may need to update them to handle the new message format".

**[Explanation]** This is the Security area's export rule applied to a chat message ([Security 03-01](../../Security/03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md#choosing): nothing travels with an export). A resource's *name* is treated as data: it leaves Foundry only if the people in the Slack channel could, by the markings, have seen the resource. The permissions are the same pair as applying markings in the first place ([Security 02-01](../../Security/02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things)), plus *Expand access* for an organization ([Security 01-01](../../Security/01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#the-two-organization-permissions)), which is right: declaring a marking exportable to Slack widens who can learn that the resource exists.

### Webhooks

**[Docs]** Triggers a webhook configured in Data Connection. The webhook "must have a string input parameter known as the Message parameter", filled with the notification's contents, which "are not currently customizable". Setup: *Manage subscriptions > Webhooks > +*, pick the webhook, then its Message parameter, then the severity; repeat per severity.

## Putting it together

**[Recommendation]** A routing table is the artefact to write before touching the *Manage subscriptions* tab:

| Severity | Means | Route |
|---|---|---|
| HIGH | Someone acts now | PagerDuty service with the on-call escalation policy |
| MEDIUM | Someone acts today | A Slack channel the team reads, plus Foundry notifications |
| LOW | Worth knowing | Foundry notifications and the email digest only |

Then every rule's severity is chosen against that table, not in isolation: *is this HIGH?* becomes *should this page someone at night?*.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)), for the two views in [01](01-monitoring-views-and-core-concepts.md#for-kestrel):

- **Routing.** `Commerce operations`: HIGH to a PagerDuty service whose escalation policy is the ontology team's on-call row from [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md); MEDIUM to a Slack channel `#delivery-desk-ops`; LOW to Foundry notifications. `Kestrel Pay operations`: MEDIUM and LOW to Slack `#kestrel-pay-ops` read by Lena's team and the Kestrel Pay engineers, because most of the payments side is reconciliation and review ([Security 11-02](../../Security/11-kestrel-case/02-kestrel-pays-sensitive-data.md)); HIGH to the same PagerDuty service as commerce, because the one fixed-high rule that matters there, the payment-hold automation *disabled by the system*, protects the operational flow, and integrations are per view and per severity, so the pager has to be configured on this view too.
- **The Slack source** is a Data Connection source owned by the platform administrators, its token in Kestrel's PAM like every other service credential ([Security 10-03](../../Security/10-privacy-governance-and-enterprise-security/03-protecting-identity-tokens-phishing-and-files.md#for-kestrel)). **Exportable markings: the Kestrel organization only.** `Customer PII` and `Kestrel Pay – Financial` are *not* declared exportable, so alerts on marked datasets show RIDs in Slack; the team reads them in Foundry. The cost (an RID in a chat message) is small; the alternative needs the Information Security Officer enrollment role to enable exports and the marking's own *Apply* and *Remove* permissions to list it, which 17-02 gives no reason to do.
- **SOPs.** One Notepad per rule family (schedule failures, Funnel job failures, function failure rate, automation disabled), each ending with the triage path in [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md); attached from *Manage monitors*.
- **Webhooks: not adopted.** 17-02 records no incident or ticketing system to call; PagerDuty and Slack are chosen because they are the built-in integrations, and a webhook can be added when there is a receiver.

---
[Module index](README.md) · Previous: [02 — Monitoring rules reference](02-monitoring-rules-reference.md) · Next: [04 — Monitoring FAQ and the check-groups sunset](04-monitoring-faq-and-the-check-groups-sunset.md)
