# 03 — Third-party application and API guidance

*Sources: [Foundry third-party application & API guidance](https://www.palantir.com/docs/foundry/platform-security-third-party/3pa-api-guidance/) · checked October 23, 2026 · Ready for Review*

The docs' **appropriate-use page**, turned into a **review checklist** for anyone signing off an integration. It's short, and it's the one page in this module that is about intent rather than mechanism: what an application *should* do with the access the mechanisms give it.

**[Docs]** By authorizing third-party applications and APIs, users "agree to follow the appropriate use terms as mutually agreed to in writing between Palantir and the customer". When unsure, ask your Palantir representative; when scoping a project that acts on behalf of a user, ask your system administrator.

## Four uses the page endorses

| **[Docs]** Use | Example given | What makes it appropriate |
|---|---|---|
| **Replacing service user accounts** | — | The authorization code flow acts "on behalf of an individual Foundry user", so permissions are correct and there is "a clear audit path", and the user has explicitly granted access. "We strongly recommend that existing applications that use a service account to perform actions in Foundry move to the OAuth2 Authorization flow where possible" |
| **Interfacing with external systems** | An app that watches an internal customer system and performs actions in the Ontology | |
| **Custom applications for specific workflows** | A mobile app over the Ontology and Actions APIs for one critical workflow | |
| **Monitoring or control of pipelines** | An app on the monitoring and data health APIs that assesses pipelines and lets users trigger builds | |

**[Explanation]** The first row is a policy statement with teeth: a service user is a shared identity, and shared identities blur the audit trail. The page prefers one authorization per human. That's also why [DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md)'s portal **is** a service user: its callers are Kestrel's customers, who have no Foundry identity to act as, which is the exception the "where possible" leaves room for.

## Three things the page forbids

| **[Docs]** Inappropriate use | The rule | Why it matters |
|---|---|---|
| **Circumventing data controls** | "You must not access data with one user's tokens and allow another user to read, discover, write, or in any way interact with that data." Sharing happens **in Foundry**, not in the app. The example: reading with one user's token, writing back with another | Every control in modules 02–03 is evaluated per user at the read ([03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md)). An app that pools what several users read has built its own, unaudited, permission system |
| **Acting without understanding and consent** | The app "must not deceive your users", must say what it does with the account, must request "the minimum set of roles and permissions it needs", and must make clear when and what it will do in Foundry. "Any unclear, unexpected, malicious or damaging application behavior is forbidden" | The consent screen in [01](01-third-party-applications-in-control-panel.md#stage-3--authorized) is only meaningful if the request is honest and minimal |
| **Storing data outside Foundry without regard to access control** | Retrieve the minimum; avoid storing or caching Foundry data, with offline caching as a possible exception that needs care and "clear user consent"; and accept that moved data "will no longer be access controlled or audited in accordance with your organization's configurations" | The last row of the propagation table: an export carries nothing with it |

## The checklist

**[Recommendation]** Before an application is enabled for Kestrel's organization, its owner answers these in writing:

1. **Whose identity does it use?** A human's (authorization code) unless there is a stated reason it can't be.
2. **What does it ask for?** The scope list, each entry tied to a feature. Anything without a feature comes out.
3. **Does any data move between users inside the app?** If yes, stop; the sharing belongs in Foundry.
4. **What does it store, and for how long?** Nothing from Foundry unless a feature needs it, and then with the user told.
5. **What does the consent screen say?** Read it as the user will; if it wouldn't be obvious why the app needs an operation, the app explains it before the user gets there.
6. **Who reviews the `dataExport` and API audit events** for this application ([10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md))?

## For Kestrel

**[Example]** Applied to the two existing applications, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Customer delivery-status portal:** item 1 is the documented exception (customers aren't Foundry users); the service user is permissioned to `Shipment` reads only, which satisfies item 2; the portal caches nothing beyond the current response (item 4); its export events are the nightly export application's, not the portal's ([DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md)).
- **Support portal:** item 1 passes (support staff authorize it as themselves); item 3 is the one to watch, because a support tool that shows one agent another agent's saved search results would be exactly the forbidden case. The design rule recorded for 17-02: every query the portal runs uses the **current** agent's token, and nothing retrieved is kept across sessions.

---
[Module index](README.md) · Previous: [02 — OAuth2 clients and user-generated tokens](02-oauth2-clients-and-user-generated-tokens.md) · Next module: [06 — Approvals and Checkpoints](../06-approvals-and-checkpoints/README.md)
