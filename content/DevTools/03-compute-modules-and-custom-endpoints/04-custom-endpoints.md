# 04 — Custom endpoints

*Sources: [Custom Endpoints](https://www.palantir.com/docs/foundry/custom-endpoints/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/custom-endpoints/core-concepts/) · [Create an endpoint set](https://www.palantir.com/docs/foundry/custom-endpoints/create-endpoint-set/) · [Define custom endpoints](https://www.palantir.com/docs/foundry/custom-endpoints/define-endpoints/) · [Publish and deploy an endpoint set](https://www.palantir.com/docs/foundry/custom-endpoints/publish/) · [Use custom endpoints in your applications](https://www.palantir.com/docs/foundry/custom-endpoints/use-custom-endpoints/) · checked October 22, 2026 · Ready for Review*

**[Concept]** The Foundry API has its own URL shapes and JSON envelopes. Custom endpoints let you publish **your** API instead: your paths, methods, parameters and response shapes, served from your own subdomain, and backed by Ontology **functions and actions**. Foundry becomes the back end with no middleware service in between.

**[Docs]** The application is **beta**; ask Palantir Support for access.

## Before and after

**[Docs]** The overview's example. A standard query call:

```text
POST https://{enrollment}.palantirfoundry.com/api/v2/ontologies/{ontology}/queries/{queryApiName}/execute
Body: {"parameters": {"form_id": 62536, "section_id": 5}}
```

The same call as a custom endpoint:

```text
GET https://subdomain.domain.com/myApi/form/{form_id}/section/{section_id}
```

**[Docs]** Suggested uses: a unified API that combines Foundry data with third-party services, or a **legacy-compatible** endpoint that matches existing enterprise URL patterns and formats.

## The parts

| Part | What it is |
|---|---|
| **Endpoint definition** | Maps header, query, path and body parameters onto one function or action. Belongs to one endpoint set |
| **Endpoint set** | A Compass resource that groups endpoints and carries the permissions to view, edit, publish and deploy them; it inherits its folder's permissions |
| **Subdomain** | Registered and **approved** in Control Panel before anything is served; one per endpoint set, requested from the set itself (manually created standalone subdomains aren't supported) |
| **Release** | An **immutable**, semantically versioned snapshot of the set, like `git commit` plus `git tag`. Releases can be deleted but not changed |
| **Deployment** | A release made live on the subdomain. Several releases can be live at once |

## Building one

**[Docs]** The steps:

1. **Files > New > Endpoint set**, and name it.
2. **Overview > Endpoint domain**: request a subdomain and wait for an administrator to approve it (**Domain ready**). You can keep configuring meanwhile.
3. **Configuration > + New endpoint**: name it, choose the backing **action or function**, and map **every** parameter, optional ones included. Supported:
   - methods `GET`, `POST`, `PUT`, `DELETE`, `PATCH`;
   - routes with path parameters, such as `/form/{formId}/section/{sectionId}`;
   - query and header parameters;
   - a custom request body for `POST`, `PUT`, `PATCH` and `DELETE`. Some JSON parameters can only map to the body.
4. **Versions > Tag and deploy new version** (or **Tag without deploying**).
5. Test with the example cURL from **Deployed Version > Custom Endpoint**, using a token in `FOUNDRY_TOKEN`.

**[Docs]** New definitions aren't reachable until a release that contains them is deployed.

## Versions side by side

**[Docs]** Multi-version deployment lets beta, stable and legacy releases share one subdomain. Clients choose with the `endpoint-api-version` header; without it they get the **latest deployed** version.

**[Recommendation]** Make clients send the header. Relying on "latest" means a new deployment changes behaviour for every caller that didn't pin, which defeats the point of keeping old versions live.

## Calling from an application

**[Docs]** Custom endpoints currently work only with **unrestricted** Developer Console applications; restricted ones aren't supported. The page then says to add the endpoints' backing functions and actions to the application's **resource access restrictions**.

**[Explanation]** Those two instructions don't fit together: an unrestricted application has no resource restrictions ([02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#restricted-or-unrestricted)). Logged as [RQ-04](../SOURCES.md#open-research-questions). Until it's settled, the caller's access rests on the **user's or service user's permissions** and the requested scope, so keep that identity's permissions narrow.

**[Docs]** Each deployed endpoint's documentation is on the endpoint set's **Overview** tab.

## When to use it

| Need | Use |
|---|---|
| A client you control, happy with Foundry's API shapes | The OSDK or platform SDK ([02-04](../02-developer-console-and-apis/04-platform-apis.md)) |
| A fixed contract an external or legacy system already expects | **Custom endpoint** |
| Logic that functions and actions can't express | A **compute module** function, then expose it ([01](01-compute-module-concepts.md)) |

## For Kestrel

**[Example]** The support portal calls `lateOrdersForRegion` through the API gateway, and a breaking change means a `V2` query and a migration window ([Ontology 09-02](../../Ontology/09-functions/02-query-functions-and-ontology-edits.md#queries-and-the-api-gateway)). A custom endpoint such as `GET /support/regions/{region}/late-orders` would give the portal a stable path, with `endpoint-api-version` taking the place of `V2` names.

**[Explanation]** *Considered, not adopted.* Three reasons: the feature is beta; it needs an **unrestricted** application, which would undo the least-privilege design Kestrel uses for its portals ([02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#for-kestrel)); and the restriction question in RQ-04 is open. Revisit if restricted applications gain support.

---
[Module index](README.md) · Previous: [03 — Debugging, history and cost](03-debugging-history-and-cost.md) · Next module: [04 — MCP and pro-code agents](../04-mcp-and-pro-code-agents/README.md)
