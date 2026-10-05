# 04 — OSDK and APIs

*Sources: [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview/) · [Unsupported types](https://www.palantir.com/docs/foundry/ontology-sdk/unsupported-types/) · [TypeScript subscriptions](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-subscriptions/) · [OSDK for other languages](https://www.palantir.com/docs/foundry/ontology-sdk/generate-osdk-for-other-languages/) · [Developer Console](https://www.palantir.com/docs/foundry/developer-console/overview/) · [Application restrictions](https://www.palantir.com/docs/foundry/developer-console/application-restrictions/) · [Developer Console permissions](https://www.palantir.com/docs/foundry/developer-console/permissions/) · [Standalone OAuth clients (legacy)](https://www.palantir.com/docs/foundry/developer-console/oauth-clients/) · checked October 2, 2026 · Ready for Review*

Written as a **design review**: Daniel proposes a *delivery-status portal* for Kestrel customers, built on the OSDK. Each section is a question the review asked, and the answer, with the doc rule behind it.

## Q1 — What is the OSDK, in one paragraph?

**[Docs]** Generated, type-safe code for "just the subset of the Ontology relevant to you":

- **TypeScript** (npm), **Python** (pip or Conda), **Java** (Maven), and an **OpenAPI** spec for any other language;
- reads, aggregations, actions and functions, with "Foundry as your backend";
- managed in **Developer Console**, where a *custom application* bundles:
  - an OAuth authorization client;
  - one or more SDKs;
  - generated documentation;
  - permissions and metrics;
  - optionally web hosting, a linked code repository, Marketplace distribution, and an **MCP server** that exposes object types, actions and query functions as tools for external AI agents.

Applications are limited to **1,000** data resources and restrictions by default.

**[Docs]** An alternative is the **SuperRepo**: Ontology-as-code, functions and frontend in one repository. It generates the OSDK locally and ships as a Marketplace product. It suits an Ontology and an app "that evolve together".

## Q2 — Who is the user, and what token do they get?

This was the review's real question. Kestrel's customers **aren't Foundry users**.

**[Docs]** Every application has an OAuth client. A token's scope is the **intersection** of three things:

1. **The user's own permissions.** That is a real user for *authorization code* grants, or a **service user** for *client credentials* grants.
2. **The application's restrictions.** These are the maximum it can ever have. **Restricted is the default**, and the setting is changed later on the *OAuth & restrictions* page, not in the creation wizard.
3. **The scope requested in code** at authorization time.

"Attempting to request a token with no scope restrictions will generate a token with no permissions."

**[Docs]** Two kinds of application:

- **client-facing** (web, desktop, mobile), which "must not be used to store client credentials";
- **backend service**, which may store them.

**[Docs]** Restrictions have two parts:

- **resource restrictions**: Ontology resources in the *Ontology SDK* tab, plus projects in the *Platform SDK* tab;
- **operation restrictions**: API namespaces in the *Platform SDK* tab. Restricted apps must list every endpoint they call.

The docs' example of why this matters: a control-room app "will never show sensitive content, regardless of the user logged into the application".

**The design that passed review:**

```text
Customer's browser ──► Kestrel portal backend (outside Foundry, Kestrel's own customer login)
                         │  backend-service app · client credentials · service user
                         │  restricted to: Order, Shipment, ShipmentEvent (read)
                         ▼
                       Foundry OSDK ──► only orders where customerId = the logged-in customer
```

**[Explanation]** Watch the service user's data access as well as its token. Shipment is secured by a **regional object security policy** that compares the user's `region` attribute with `Shipment.region` ([12-03](../12-security-and-governance/03-object-and-property-security.md#three-kestrel-requirements) R1). A service user has no region, so under that policy it would see **no shipments at all**. The policy needs an explicit, positive branch for the portal's service user, and that branch is itself a security decision to review.

Once it has that access, the service user can see *every* customer's orders and shipments. So the backend must filter by the authenticated customer on **every** call. The Ontology can't do that per external customer, because those people don't exist in Foundry. That is the biggest risk in the design, and the review made it a test case. The alternative, giving each customer a Foundry account, moves the check into Foundry's permissions, but it's rarely practical for retail customers.

**[Docs]** Standalone OAuth clients are **legacy** and can no longer be created. Use an *unrestricted* application where an old client would have been used, or migrate existing clients.

## Q3 — Which security still applies?

**[Docs]** "Users can never read data they are not authorized to see." But row and column controls "do not extend to the OSDK response payload or to anything your application does with the data". The same read-time-only rule appears for actions, functions and Workshop ([08-06](../08-actions/06-action-permissions.md#q3--does-a-restricted-view-protect-the-data-the-action-writes), [03](03-workshop-and-slate.md)).

**[Explanation]** Once the portal backend has the data, Kestrel's own code is responsible for it: caching, logging, what it sends to the browser. Restrict the application to the three types it needs, so a bug can't expose payments.

## Q4 — Will our types generate?

**[Docs]** Some types are skipped or block generation:

| | TypeScript | Python | Java |
|---|---|---|---|
| **Properties skipped** | Cipher, marking, vector | Cipher, marking, **media**, **struct** (except beta struct support in Python functions), vector | Time series, cipher, vector |
| **Action parameters that block generation** | `InterfaceObjectSet`, `MarkingList` | `ObjectSet` | — |
| **Function outputs that block generation** | Principal, User, Notification, **OntologyEdit**, ClassificationMarking | A long list, including ObjectSet, custom types, GeoShape, TimeSeries and aggregations | Similar to Python |

Also: action types whose webhooks use **OAuth 2.0** are unsupported. In the OpenAPI export, structs and vectors become `any`.

**[Explanation]** For Kestrel:

- **TypeScript** is fine for the portal.
- A **Python** version would drop `Order.deliveryAddress`, because it's a struct ([05-03](../05-properties/03-structs.md)). The generator logs an error rather than failing, which makes it easy to miss.
- An action that takes an **interface object set**, such as a bulk *Escalate cases* on `Case`, would block TypeScript generation.

Check this table before you choose a language for an integration.

## Q5 — Can the portal update live?

**[Docs]** **Subscriptions** (TypeScript OSDK **2.1+**, GA): `client(Shipment).where({...}).subscribe({ onChange, onSuccessfulSubscription, onOutOfDate, onError }, { properties: [...] })`. The details:

- `onChange` delivers `ADDED_OR_UPDATED` or `DELETED`, with the object.
- Any property may be `undefined` in an update, meaning "not returned", not "set to null".
- `onOutOfDate` means you must reload with `fetchPage`.
- Sets built with **`pivotTo` can't be subscribed to**.
- Only **one subscription per query** can be active at a time.
- For other languages there is a WebSocket API.

**[Explanation]** "Shipments of *this* order" is a filter on `orderId`, not a pivot, so it can be subscribed to. "Shipments of this customer's orders" would need a pivot. Model the query as a filter, for example with a `customerId` copied onto Shipment, or poll instead.

## Q6 — Who can work on the app itself?

**[Docs]** Developer Console applications inherit permissions from their project or folder:

- **Viewer**: see the app and the hosted site, and use the SDK;
- **Editor**: change the app and generate SDK versions;
- **Owner**: Editor plus sharing.

Creating an app needs *Create application* on the folder **and** *Create third-party applications* in the organization, usually through the *Third-party application administrator* role. Hosting on a Foundry subdomain needs an **Information Security Officer** to approve the domain.

**[Docs]** One more detail: OSDK front-ends that invoke LMS-backed logic through actions need the user to be at least **Viewer** on the Developer Console application. Otherwise they get `PERMISSION_DENIED`, even though the same action works in Workshop.

## Review outcome

Approved, with three conditions:

1. A per-customer filter test in CI.
2. The app restricted to three object types.
3. TypeScript only, until Python struct support is GA.

---
[Module index](README.md) · Previous: [03 — Workshop and Slate](03-workshop-and-slate.md) · Next: [05 — Specialized apps](05-specialized-apps.md)
