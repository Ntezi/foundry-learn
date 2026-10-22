# 01 — Applications, scopes and restrictions

*Sources: [Developer Console](https://www.palantir.com/docs/foundry/developer-console/overview/) · [Create a new application](https://www.palantir.com/docs/foundry/developer-console/create-application/) · [Permissions](https://www.palantir.com/docs/foundry/developer-console/permissions/) · [Application restrictions](https://www.palantir.com/docs/foundry/developer-console/application-restrictions/) · [Standalone OAuth clients (legacy)](https://www.palantir.com/docs/foundry/developer-console/oauth-clients/) · [Create an application in a different organization](https://www.palantir.com/docs/foundry/developer-console/how-to-create-backend-service-app-different-org/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Anything outside Foundry that calls Foundry needs an identity and a token. In Developer Console that identity is a **custom application**: an OAuth client plus, optionally, generated SDKs, documentation, permissions, metrics, web hosting, a code repository, Marketplace packaging and an MCP server. This note is the decision chain from *what kind of app is this?* to *what can its token do?*. The portal design review in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md) is the worked example.

## Step 1: application type and permission type

**[Docs]** Two application types:

- **Client-facing:** web, desktop or mobile front ends. They "must not be used to store client credentials".
- **Backend service:** a service or daemon that may store client credentials securely.

One application can be both.

**[Docs]** Two permission types, each tied to an OAuth grant:

| Permission type | Acts as | Grant |
|---|---|---|
| **User permissions** | the signed-in user | Authorization code |
| **Application permissions** | a **service user** generated for the application | Client credentials |

**[Docs]** Client-facing applications **must** use user permissions and the authorization code grant. An app can combine both permission types: the docs' example lets users see the `Cars` they're allowed to see **and** all `Bikes` through the service user.

**[Docs]** Choosing **Backend service** creates a confidential client and shows the **client secret once**. If you lose it, rotate it on **OAuth & restrictions**, which breaks anything using the old secret.

## Step 2: what the token can reach

**[Docs]** A token's scope is decided at runtime as the **intersection** of three things:

1. the **permissions** of the user (authorization code) or the service user (client credentials);
2. the application's **restrictions**, its maximum possible scope;
3. the **operation scope requested in code** when the token is requested ("authorization time").

```text
  user or service user's permissions
∩ application restrictions (resources + operations)      ← set in Developer Console
∩ operations requested at authorization time             ← set in code
= what this token can do
```

**[Docs]** Resources and operations are handled differently. An app can request **operations** at authorization time; **resource** access comes only from the restrictions and the user's permissions.

**[Docs]** Requested scope in code, TypeScript:

```ts
const scopes = ["api:use-ontologies-read", "api:use-datasets-read"];
export const auth = createPublicOauthClient(clientId, foundryUrl, redirectUrl, { scopes });
export const client = createClient(foundryUrl, ontologyRid, auth);
```

## Restricted or unrestricted

**[Docs]** Every application is **created restricted**. The setting isn't in the creation wizard; change it afterwards on **OAuth & restrictions > Application restrictions**.

| | Restricted (default) | Unrestricted |
|---|---|---|
| Maximum scope | The resources and operations listed in Developer Console | None: only the user's permissions and the requested scope |
| Resource restrictions | **Ontology SDK** tab (object types, interfaces, actions, functions) and **Platform SDK** tab (projects) | — |
| Operation restrictions | **Platform SDK** tab, by API namespace; every endpoint called must be listed | — |
| Use when | You know the resources at build time | Resources don't exist yet; you need spaces, organizations or enrollments outside projects; you need endpoints not yet in the public API |

**[Docs]** The docs' case for restrictions: defining everything an app may do at build time "minimizes cases of privilege escalation", and restrictions guarantee a limit on what can reach a device. A control-room app "will never show sensitive content, regardless of the user logged into the application". Unrestricted apps should run "trusted code" only and generally only for programmatic, platform-wide workflows.

**[Docs]** Switching to unrestricted **deletes** the current project and operation restriction configuration. Switching back means configuring them again, and the app may break if it uses resources you didn't re-add.

**[Docs]** A restricted app reading a dataset needs both the dataset's **project** in its resource restrictions **and** `api:use-datasets-read` in its operation restrictions. The user still needs read access too.

## What happens when no scope is requested

**[Docs]** The rules, as the restrictions page states them:

- A token request with **no requested scope** gets everything the user can do that the **application's restrictions** allow.
- An empty `[]` requested scope defaults to the application's operation restrictions.
- **Unrestricted + client credentials:** no scope request needed; the token gets every operation the service user has.
- **Unrestricted + authorization code:** the app **must** request a scope, because a human consents to a set of operations.
- "Attempting to request a token with no scope restrictions will generate a token with no permissions."

**[Explanation]** The last rule seems to contradict the unrestricted client-credentials case: such an app has no restrictions and requests no scope, yet the page says it gets everything the service user has. The likely reading is that the "no permissions" rule targets the authorization-code case. Logged as [RQ-03](../SOURCES.md#open-research-questions). **[Recommendation]** Always request an explicit scope; it costs nothing and removes the ambiguity.

## Resource restrictions keep moving

**[Docs]** Adding a resource to the SDK also adds the resources it **depends on**, such as backing datasets, to the restrictions. When dependencies change later (a new backing dataset on an object type), Developer Console shows an **outdated restrictions** warning and a guided fix.

**[Docs]** Removing a resource is a two-step job. Remove it from the **SDK** first, but keep it in the **restrictions** until every client has upgraded to the new SDK version; then clean it up on **OAuth & restrictions**. Removing it from both at once breaks clients on the old version.

**[Docs]** By default an application is limited to **1,000** data resources and resource access restrictions in total.

## API-level security and the two scope prefixes

**[Docs]** Applications created after **June 1, 2025** enforce API-level security; older ones migrate with **Platform SDK resources > Migrate**. After migration:

- restricted apps can call **only documented platform APIs**, not underlying service endpoints;
- each API namespace is isolated: there are **no implicit grants** into other namespaces;
- new and migrated apps start with `api:use-ontologies-read` and `api:use-ontologies-write`.

| Scope pattern | Example | For |
|---|---|---|
| `api:use-*-read/write` | `api:use-ontologies-read` | Restricted apps; unrestricted apps unless they call internal service endpoints. Public APIs only |
| `api:*-read/write` | `api:ontologies-read` | Standalone OAuth clients and some unrestricted apps. Public APIs **and** internal service endpoints |

**[Docs]** The docs' example of the namespace isolation: a migrated app with only the ontology scopes can no longer call `/api/v2/admin/users/getCurrent` and gets `ApiUsageDenied`. Add the admin scope if it needs the current user. Some identity endpoints stay callable regardless: OAuth2, user information (`/multipass/api/me/...`), resource access information, token TTL and organizations.

**[Docs]** To migrate without an outage, **add** the new `use-` scopes in code alongside the old ones, migrate, then remove the old ones.

**[Explanation]** The API Reference's own [authentication page](https://www.palantir.com/docs/foundry/api/v2/general/overview/authentication/) still gives `api:ontologies-read` as the example scope and says a granted scope may reach undocumented service endpoints, "We are likely to change this behavior in the future". For Developer Console applications, the restrictions page describes that change as made. Use the `use-` scopes ([04](04-platform-apis.md)).

## Who can do what in Developer Console

**[Docs]** With **Compass-managed user permissions** (beta, on CBAC enrollments and possibly others), an application inherits permissions from its project or folder, like any resource:

| Role | Can |
|---|---|
| **Viewer** | See the app and its hosted site, use the SDK. Needed for the app to appear on the home page (`third-party-application:view-application-config`) |
| **Editor** | Change the app and OAuth settings, add entities, generate SDK versions, deploy the website |
| **Owner** | Editor, plus sharing |

**[Docs]** Creating an application needs **Create application** on the folder **and** the **Create third-party applications** workflow in the organization, usually through the **Third-party application administrator** role in Control Panel. That role also manages the **linked OAuth client** that every application has.

**[Docs]** To let developers manage their own apps without making them OAuth administrators: create **custom role sets** with only the Developer Console operations, or create apps for them and share each one. A custom role can be as narrow as **Rotate third-party application client secret** for one application.

**[Docs]** OSDK front ends that call **LMS-backed** logic through actions need the user to be at least **Viewer** on the application, or they get `PERMISSION_DENIED`, even though the same action works in Workshop.

**[Docs]** Under the **legacy** model, the creator becomes **Owner** and shares from **Sharing & tokens**, and a deleted app can't be restored. Migrating to Compass (**Migrate application to project**) **replaces** the permission structure with the destination project's. Website viewers then follow the project too, so create a custom project role that only grants **View application website** before migrating if some users should see the site but not the configuration.

## A service user in another organization

**[Docs]** A confidential client's service user joins, as a **guest**, the organization selected in Developer Console. The dropdown only lists organizations marked on the chosen location. If that isn't your default organization, you can't see or grant permissions to the service user until you:

1. **share** the application with your organization (**Sharing & tokens**), then
2. **enable** it there (Control Panel > **Third party applications** > **Enablement settings**).

**[Docs]** On CBAC enrollments, service users don't inherit the application's maximum classification; add them to the right groups and classifications yourself. Developer Console warns when the client's and the service user's markings or organizations don't match.

## Standalone OAuth clients

**[Docs]** Standalone OAuth clients are **legacy** and can't be created any more. Use an **unrestricted application** instead. Migrate an existing one with **Migrate to Developer Console application**; existing workflows keep working, and the app gains SDKs, hosting, restrictions, DevOps support and metrics. Managing an old client needs **Manage OAuth 2.0 clients** in its organization.

**[Docs]** The page's steps for an unrestricted application: create a normal app (backend service or client-facing; application or user permissions), choose **No, I will not use an Ontology SDK** if it only calls platform APIs, copy the secret, then switch it to **Unrestricted**, then request scopes in code.

## For Kestrel

**[Example]** The customer portal's application, as reviewed in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get), checked against the rules above:

| Decision | Choice | Rule it follows |
|---|---|---|
| Application type | Backend service | Kestrel's customers aren't Foundry users, so the backend holds the identity |
| Permission type | Application permissions (service user, client credentials) | The only option without a Foundry user |
| Restrictions | **Restricted** to `Order`, `Shipment`, `ShipmentEvent`, plus the backing datasets Developer Console adds with them | Least privilege; guarantees `Payment` can't leak. If a backing dataset changes, fix the *outdated restrictions* warning before the portal breaks |
| Requested scope | `api:use-ontologies-read` only | Explicit scope ([RQ-03](../SOURCES.md#open-research-questions)); the portal never writes |
| Service user's data access | An explicit branch in `Shipment`'s regional policy | Without it, a user with no `region` sees no shipments |
| Organization | Kestrel's default organization | Avoids the share-and-enable steps above |

**[Example]** The secret lives in the backend's secret store and is rotated on a schedule by someone given only the rotate-secret role, not full OAuth administration.

---
[Module index](README.md) · Next: [02 — Bootstrapping and hosting](02-bootstrapping-and-hosting.md)
