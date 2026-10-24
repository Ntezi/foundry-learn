# 04 — Platform APIs

*Sources: [Introduction](https://www.palantir.com/docs/foundry/api/v2/general/overview/introduction/) · [Getting started](https://www.palantir.com/docs/foundry/api/v2/general/overview/getting-started/) · [Authentication](https://www.palantir.com/docs/foundry/api/v2/general/overview/authentication/) · [Software development kit (SDK)](https://www.palantir.com/docs/foundry/api/v2/general/overview/sdks/) · [Paging](https://www.palantir.com/docs/foundry/api/v2/general/overview/paging/) · [Versioning](https://www.palantir.com/docs/foundry/api/v2/general/overview/versioning/) · [Limits](https://www.palantir.com/docs/foundry/api/v2/general/overview/limits/) · [Errors](https://www.palantir.com/docs/foundry/api/v2/general/overview/errors/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Under every SDK is the Foundry REST API: HTTPS endpoints under `https://<hostname>/api/v2/...`, OAuth 2.0 tokens and mostly JSON. Knowing its conventions is what lets you read an error, page correctly and survive a throttle, whichever SDK you use.

## Which client to use

**[Docs]** The platform SDKs (Python, TypeScript, Java) are generic libraries for **all** Foundry APIs on any enrollment. The OSDK is generated per enrollment and sits on top of them.

| Use the platform SDK if… | Use the OSDK if… |
|---|---|
| you don't read or write the Ontology; you automate admin or governance work; the app must be portable across unrelated enrollments | the app reads and writes **only** your Ontology |

**[Docs]** The API families listed on the toolchain overview: **Datasets, Filesystem, Administration, Orchestration, Connectivity, SQL queries, Media sets**, plus models, audit logs, data health checks, streams, checkpoints and notepads in the full reference. Python 2.x uses one client for both SDKs ([01-03](../01-ontology-sdk/03-migration-testing-and-setup.md#python-1x-to-2x)).

## Authentication

**[Docs]** Every call carries `Authorization: Bearer <token>`.

- **During development**, generate a personal token under **Account > Settings > Tokens**. It has your full permissions, so it "should never be used in production applications or committed to shared or public code repositories". Keep it in an environment variable and revoke it when done.
- **In production**, use OAuth2: the **authorization code** grant to act for a user, or the **client credentials** grant to act as a service user. Both give short-lived access tokens; grants are configured in Developer Console ([01](01-applications-scopes-and-restrictions.md)).

**[Docs]** Access is the intersection of the requested scope and the user's or service user's permissions. Each endpoint's documentation names its scopes.

**[Explanation]** The authentication page still uses the older `api:ontologies-read` style and warns that a scope may reach undocumented service endpoints. Developer Console applications now use `api:use-ontologies-read`, which can't ([01](01-applications-scopes-and-restrictions.md#api-level-security-and-the-two-scope-prefixes)).

**[Docs]** A first request:

```bash
curl -H "Authorization: Bearer $FOUNDRY_TOKEN" \
  "https://<hostname>/api/v2/ontologies/company/objects/employee"

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer $FOUNDRY_TOKEN" \
  "https://<hostname>/api/v2/ontologies/company/actions/rename-employee/apply" \
  -d '{"parameters": {"id": 80060, "newName": "Anna Smith-Doe"}}'
```

**[Docs]** The examples address the ontology by API name (`company`) or by RID. The Node.js examples must run in Node, not a browser: never send a service user's token to the browser.

## Paging

**[Docs]** Every list endpoint pages. A response with a `nextPageToken` has more pages: repeat the request with `pageToken=<token>`. No `nextPageToken` (or `null`) means the last page.

**[Docs]** Rules that catch people out:

- Page tokens are **short-lived**, for immediate sequential use.
- `pageSize` is a **suggestion**; a page can hold more or fewer results. There's always at least one result while more remain.
- The default page size is usually also the **maximum**; larger requests are reduced.
- Some endpoints cap results **across** pages. *List objects* stops at **10,000** objects in total, then errors.

**[Docs]** By default, paging returns the latest data, so changes between requests can cause **duplicates or gaps**. **Snapshot** paging freezes the data before the first page, at the cost of freshness; only the three *Load Object Set* endpoints support it, through a boolean `snapshot` parameter. The TypeScript OSDK exposes it as `$snapshot` ([01-01](../01-ontology-sdk/01-languages-and-generation.md#limits-that-show-up-in-code)).

**[Recommendation]** Use snapshot paging when a job must see every object exactly once, such as an export; keep the default for screens that show what's current.

## Versioning

**[Docs]** Endpoints carry a **major version** in the path (`/api/v2/`). Breaking changes (removing endpoints or fields, adding required parameters, changing field types) mean a new major version. Adding optional parameters, response fields, **enum values** or endpoints doesn't.

**[Docs]** So clients should **ignore unknown fields**, handle **unknown enum values** with a default case, and not rely on undocumented behaviour.

**[Docs]** Removing or replacing a stable endpoint is announced at least **twelve months** ahead, through public announcements, the Upgrade Assistant and banners in the API docs, except for emergency security or stability fixes.

**[Docs]** **Public preview** endpoints are for non-production use, may change or disappear without notice, and need `preview=true` on the request; without it you get `ApiFeaturePreviewUsageOnly`.

## Limits

**[Docs]** Global, per-user limits across all endpoints:

| Rate | Concurrency |
|---|---|
| **10,000** requests per minute | **800** simultaneous requests |

**[Docs]** Exceeding them returns **429** or **503**; retry with **exponential backoff**. Individual endpoints can be stricter, and internal services (the Ontology, function execution, AIP agents) can throttle independently. Concurrency counts only server processing time, so 3,000 requests in flight on a slow network might be only 750 being processed. Test performance for high-scale or spiky use.

## Errors

**[Docs]** Errors are JSON with an `errorCode`, an `errorName`, an `errorInstanceId` (quote it to Palantir Support) and `parameters`, on a 4xx or 5xx status:

```json
{ "errorCode": "NOT_FOUND", "errorName": "ObjectNotFound",
  "errorInstanceId": "00813215-0844-4716-be7b-a3fe0fce9e42",
  "parameters": { "objectType": "employee", "primaryKey": { "id": 10000 } } }
```

**[Docs]** The ones to recognise on sight:

| Error | Status | Usually means |
|---|---|---|
| `MissingCredentials` | 401 | No token sent |
| `Default:Unauthorized` | 401 | The token header is invalid |
| `ApiUsageDenied` | 403 | The token isn't allowed to call **this endpoint**: a missing operation scope or restriction |
| `Default:PermissionDenied` | 403 | Missing permission on information the request needs |
| `ObjectNotFound`, `ObjectTypeNotFound`, `ActionTypeNotFound`, `OntologyNotFound` | 404 | Doesn't exist **or the token can't see it** |
| `ViewObjectPermissionDenied` | 403 | No permission on any datasource behind the object type |
| `ObjectsExceededLimit` | 400 | More than **10,000** objects for one request |
| `ActionValidationFailed` | 400 | Parameters failed validation; call the validate endpoint for detail |
| `ObjectTypeNotSynced`, `OntologySyncing` | 409 | Re-index, or wait a few seconds while Ontology Manager changes apply |
| `PropertiesNotSearchable`, `PropertiesNotSortable` | 400 | Mark the property Searchable or Sortable in Ontology Manager |
| `AggregationGroupCountExceededLimit` | 400 | Too many groups; use `maxGroupCount`, larger intervals or a filter |
| `AttachmentSizeExceededLimit` | 400 | Over **200 MB** |
| `InvalidPageToken` | 400 | The page token can't be used, for example after it expired |
| `ApiFeaturePreviewUsageOnly` | 400 | A preview endpoint called without `preview=true` |
| `QueryTimeExceededLimit`, `QueryMemoryExceededLimit`, `FunctionExecutionTimedOut` | 400 | A function ran out of time or memory |
| (no body) 429 / 503 | — | Throttled or unavailable; back off and retry |
| (no body) 414 / 431 | — | URL or headers too long |

**[Explanation]** Two habits follow from this table:

- **A 404 is often a permission problem.** Most `NotFound` errors say "could not be found, **or the client token does not have access to it**". Check the token's user, restrictions and scope before assuming data is missing.
- **Separate 401 from 403.** A 401 is about the token itself (missing or invalid). A 403 `ApiUsageDenied` is about what the application may call, which is a Developer Console fix: add the operation or the scope, not more user permissions.

## For Kestrel

**[Example]** The portal backend's API habits:

- One `Shipment` page per customer request, with no snapshot: customers want current status.
- A nightly delivery-performance export is a **separate** backend-service application with its own secret and scope, not the portal's: the customer-facing identity shouldn't also run internal batch jobs. It uses **snapshot** paging, so no shipment is counted twice while the night's scans arrive.
- A shared retry helper handles 429 and 503 with exponential backoff and jitter, and logs every `errorInstanceId`.
- `ApiUsageDenied` pages the portal team, because it means a deploy needs a scope or restriction change, not a retry.
- Its JSON parsing ignores unknown response fields and has a default branch for unknown API enum values, because both can appear without a version change.

---
[Module index](README.md) · Previous: [03 — Operating an application](03-operating-an-application.md) · Next module: [03 — Compute modules and custom endpoints](../03-compute-modules-and-custom-endpoints/README.md)
