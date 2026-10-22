# 03 — Migration, testing and setup

*Sources: [TypeScript OSDK migration guide](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk-migration/) · [Python OSDK migration guide](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk-migration/) · [Unit testing TypeScript OSDK code](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk-testing/) · [Add an OSDK to a bootstrapped repository](https://www.palantir.com/docs/foundry/ontology-sdk/add-osdk-to-bootstrapped-repository/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Three jobs around the SDK rather than inside it: moving code from version 1 to version 2, testing code that takes an OSDK client without calling Foundry, and wiring an OSDK into a repository that started without one.

## TypeScript 1.x to 2.0

**[Docs]** Why 2.0 exists:

- 1.x generates **full implementations** for every Ontology item, so it grows with the whole Ontology; 2.0 scales with the Ontology's **shape and metadata** and lazy-loads what the app uses.
- 2.0 **separates the client from the generated code**, so client fixes ship as dependency updates without regenerating the SDK.
- New features such as **interfaces and media sets require 2.0**. Palantir keeps supporting 1.x "for at least one year after the release" of 2.0.

**[Docs]** To upgrade, generate a new version with the 2.0 generator on the application's **SDK versions** tab; new applications use 2.0 by default. Then install `@osdk/client` and `@osdk/oauth` and work through the code.

| Area | 1.x | 2.0 |
|---|---|---|
| Client | `new FoundryClient({ url, auth })` with `PublicClientAuth` | `createClient(url, ontologyRid, auth)`, with `createPublicOauthClient` or `createConfidentialOauthClient` from `@osdk/oauth` |
| Ontology RID | not needed | required: pass a string, an environment variable, or the generated `$ontologyRid` |
| Calls | `client.ontology.objects.X.fetchPage(...)` | `client(X).fetchPage(...)`; the client is invocable |
| Object type | `X` | `Osdk.Instance<X>`; pages are `PageResult<Osdk.Instance<X>>` |
| Dates and times | `LocalDate`, `Timestamp` types | ISO 8601 **strings** |
| Geo | `GeoShape`, `GeoPoint` | `GeoJSON` |
| Filters | `.where(q => q.prop.startsWith("foo"))` | `.where({ prop: { $startsWith: "foo" } })` |
| Order | `.orderBy(...)` | `$orderBy` inside `fetchPage` options |
| Aggregations | `.count().compute()` | `.aggregate({ $select: { $count: "unordered" } })` |
| Actions | `ontology.actions.x(params, { mode, returnEdits })` | `client(x).applyAction(params, { $returnEdits: true })` or `{ $validateOnly: true }`, never both |
| Functions | `queries.x(params)` | `client(x).executeFunction(params)` |
| RIDs | on the object | opt in with `$includeRid: true` |

**[Docs]** The hard part is **object types**. Helpers typed against the 1.x object won't accept `Osdk.Instance` values, and importing the 2.0 type without the `Osdk.Instance` wrapper loses the top-level properties. Two paths:

- **direct replacement** of every legacy type, fine for small code bases;
- **custom front-end types** with a translator function written before the migration, so only the translator changes.

**[Recommendation]** For anything bigger than a demo, take the translator path. It also keeps your UI code independent of the next SDK change.

## Python 1.x to 2.x

**[Docs]** Four reasons to move: one client for both the Platform SDK and the OSDK; better return types; an editable `Config` (headers, proxies, timeout, SSL verification, default params, scheme); and beta features behind `AllowBetaFeatures` (derived properties, nearest-neighbour filtering, markings and vector properties, structs).

**[Docs]** Code changes to look for:

- Filters must go through `.object_type`: `Object.object_type.id.in_([...])`. `is_member_of` is now `in_`.
- `starts_with` was **removed in Python OSDK 2.75.0**; use `contains_all_terms_in_order(..., prefix_last_term=True)`.
- A one-to-one or many-to-one link returns `Optional[Object]` (no more `.get()`); a one-to-many or many-to-many link is a full **object set**.
- Function results become **instances**, not identifiers: an object instead of its primary key, an `ObjectSet` instead of its RID, an `Attachment` instead of its RID.
- Aggregations return `AggregateObjectsResponse`; `.to_dict()` gives the old shape. Range groups take a set of tuples, `{(1, 2), (3, 4)}`.
- `Point` is now `GeoPoint`; exceptions such as `PalantirRPCException` import from `foundry_sdk`.
- `ActionResponse` → `SyncApplyActionResponse`, `BatchActionResponse` → `BatchApplyActionResponse`; `ValidationResult` is a `Literal`, so compare to `"VALID"`.
- Attachment upload returns an `Attachment`, not `AttachmentMetadata`.

**[Docs]** Python functions in Foundry opt into beta properties with `@function(beta=True)`.

## Unit testing TypeScript

**[Docs]** `@osdk/unit-testing` is **experimental** and exports only from `@osdk/unit-testing/experimental`. It needs `@osdk/api`, `@osdk/client` and `@osdk/functions` as peers, and works with any test runner.

| Helper | Use |
|---|---|
| `createMockClient()` | A `Client` you stub with `.when(stub => stub(X)...)`, `.whenObjectSet(set, ...)` and `.whenQuery(fn, params)`; `.clearStubs()` resets it |
| `createMockOsdkObject(X, props, options)` | A fully shaped `Osdk.Instance`. Props **must include the primary key**. Options: `links`, `titlePropertyApiName`, `$rid` |
| `createMockObjectSet(X)` | A standalone `ObjectSet` with no data until you stub calls on it |
| `createMockAttachment(rid, blob)` | A placeholder for attachment inputs |

**[Docs]** How stubbing behaves:

- Rebuild the **same call chain** your code makes inside `.when(...)`. Registration order doesn't matter.
- `.thenReturnObjects([...])` serves both `fetchPage` and `asyncIter`.
- A many-link given as an **array** supports `fetchPage`, `fetchOne(pk)` and `asyncIter`, but **not `aggregate()`**; back it with a mock object set for that.
- A single link given an `Error` makes `fetchOne()` reject and `fetchOneWithErrors()` return `{ error }`. An unconfigured link does the same.
- `$title` is undefined unless you name the title property. `$clone` works, but changing the primary key throws.
- `$as` and `$__EXPERIMENTAL__NOT_SUPPORTED_YET__*` throw.

**[Docs]** The mock client does **not** intercept Platform API calls (`@osdk/foundry.*`). Those go to `https://mock.invalid/`; stub them with **MSW**, set `onUnhandledRequest: "error"`, and type fixtures with `satisfies Awaited<ReturnType<typeof platformFn>>` so they can't drift from the real response.

**[Example]** The per-customer filter test that the portal review required ([Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#review-outcome)) fits this package. Stub `client(Shipment).where(...)` to return shipments for two customers, then assert that the portal's handler returns only the logged-in customer's. The test checks Kestrel's own code, which is where that rule lives; the mock can't test Foundry's permissions.

## Adding an OSDK to an existing repository

**[Docs]** For a repository bootstrapped from Developer Console or `@osdk/create-app` without an SDK:

1. Add `<meta name="osdk-ontologyRid" content="%VITE_FOUNDRY_ONTOLOGY_RID%" />` to `index.html`.
2. Add `VITE_FOUNDRY_ONTOLOGY_RID` to **every** `.env` file (`.env.development`, `.env.production`, `.env.code-workspaces`).
3. In `client.ts`, swap `createPlatformClient` for `createClient(foundryUrl, ontologyRid, auth)`, reading the RID from the meta tag.
4. Add `<package>/sdk` to `package.json`; the name is under **Developer Console > Overview > Generated SDKs**.
5. For a **locally** bootstrapped repository only, add the package registry to `.npmrc` (without `/sdk` in the name) and export `FOUNDRY_TOKEN` before `npm install`.

**[Docs]** Two failures the page calls out:

- `${FOUNDRY TOKEN}` with a space instead of `${FOUNDRY_TOKEN}` gives **401 or 403** errors.
- A **404** from `npm install` usually means another registry is overriding yours: check `npm config get registry` and any parent `.npmrc`.

**[Explanation]** The meta tag matters beyond this page. Marketplace remaps the Foundry URL, client ID, redirect URL and Ontology RID only for apps that read them from `index.html` meta tags ([02-03](../02-developer-console-and-apis/03-operating-an-application.md#shipping-with-marketplace)).

---
[Module index](README.md) · Previous: [02 — Subscriptions](02-subscriptions.md) · Next module: [02 — Developer Console and platform APIs](../02-developer-console-and-apis/README.md)
