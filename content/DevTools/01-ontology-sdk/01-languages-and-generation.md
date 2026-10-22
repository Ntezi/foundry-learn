# 01 — Languages and generation

*Sources: [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview/) · [TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-osdk/) · [Python OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/python-osdk/) · [Java OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/java-osdk/) · [Generate OSDK for other languages](https://www.palantir.com/docs/foundry/ontology-sdk/generate-osdk-for-other-languages/) · [Unsupported types for OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/unsupported-types/) · checked October 22, 2026 · Ready for Review*

**[Concept]** The Ontology SDK (OSDK) is code that Developer Console **generates** from the object types, action types and functions you add to an application. You install it like any package and call the Ontology with typed methods. [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md) covers who the caller is and what the token can reach; this note covers what the generated code looks like in each language and what it can't represent.

## What you get

**[Docs]** The overview lists four benefits:

- **accelerated development**;
- **strong type-safety**, because types are generated for "just the subset of the Ontology relevant to you";
- **centralized maintenance**;
- **secure by design**, because the token is scoped to the entities the app chose, on top of the user's own permissions.

**[Docs]** Distribution is per language: **npm** for TypeScript, **pip or Conda** for Python, **Maven** for Java, and an **OpenAPI** spec for anything else. The generated code carries Ontology metadata, so property names and descriptions show up in your editor.

**[Docs]** The overview's warning, which the TypeScript and Python pages repeat in their own words: row and column controls filter what a user can read, but they "do not extend to the OSDK response payload or to anything your application does with the data". To keep data protected downstream, pair them with a marking or Classification-based Access Control.

**[Docs]** If you define the Ontology in code, the overview points to a **SuperRepo** instead: object types, links and actions declared as Ontology-as-code next to functions and the front end, with the OSDK regenerated locally on every change ([05-04](../05-development-environments/04-superrepo-and-foundry-cli.md)).

## The same operations, three spellings

**[Docs]** All three reference pages use a `Restaurant` example. The operations line up; the syntax doesn't.

| Operation | TypeScript 2.x | Python 2.x | Java |
|---|---|---|---|
| One object | `client(Restaurant).fetchOne("pk")` | `client.ontology.objects.ExampleRestaurant.get("pk")` | `client.ontology().objects().Restaurant().fetch("pk")` (an `Optional`) |
| One page | `fetchPage({ $pageSize: 30 })` | `page(page_size=30, page_token=None)` | `fetchPage()` with a `FetchPageRequest` (default page size **1,000**) |
| Everything | `asyncIter()` | `iterate()`, or `take(n)` | `fetchStream()` |
| Filter | `.where({ restaurantName: { $startsWith: "foo" } })` | `.where(ExampleRestaurant.object_type.restaurant_name ...)` with `~`, `&`, `\|` | `.where(RestaurantFilter.restaurantName()...)` with `$not`, `$and`, `$or` |
| Sort | `$orderBy` in the fetch options | chained `.order_by(...asc())` | `.orderBy(RestaurantOrdering.RESTAURANT_NAME_ASC)` |
| Link from an object | `obj.$link.city.fetchOne()` | `obj.city()` | — |
| Link from a set | `.pivotTo("reviews")` | `.search_around_reviews()` | — |
| Action | `client(addReview).applyAction({...}, { $returnEdits: true })` | `client.ontology.actions.action_example(...)` | `.actions().addReview().apply(...)` |
| Batch action | `batchApplyAction([...])` | `client.ontology.batch_actions...` | `applyBatch(...)` |
| Function | `client(fn).executeFunction({...})` | `client.ontology.queries.fn(...)`, keyword arguments only | `.queries().fn().execute(...)` |

Three details to remember:

- **[Docs]** **Batch actions are all-or-nothing** in every language: if one fails, none of the edits apply. The batch response holds edits only, not validation.
- **[Docs]** In TypeScript, a single-multiplicity link exposes `fetchOne()` and `fetchOneWithErrors()`; a many link is an ordinary object set.
- **[Docs]** In Python, a many-to-one link returns the object or `None`; `search_around()` with a string name raises `RuntimeError` if the link doesn't exist.

## Limits that show up in code

**[Docs]** Every loading section says the same thing about storage:

- on **Object Storage v2** there is no request limit for loading pages and iterating;
- on **Object Storage v1 (Phonograph)**, more than **10,000** results throws `ObjectsExceededLimit`.

**[Docs]** Aggregations are capped at **10,000** results on both storage versions (TypeScript page).

**[Docs]** Python's `page_size` goes up to **10,000**; later pages use the first page's size.

**[Docs]** TypeScript's `$snapshot: true` on `fetchPage()` "freeze[s] the view at query time" so paging doesn't skip or duplicate objects. The default is `false`, which loads the latest results. The REST equivalent is in [02-04](../02-developer-console-and-apis/04-platform-apis.md#paging).

## Fetch options worth knowing

**[Docs]** TypeScript fetch options:

| Option | Does |
|---|---|
| `$select` | Returns only the listed properties. Without it you get all native properties. **Ontology-defined derived properties are not returned by default**; runtime ones added with `withProperties()` are. |
| `$applyModifiers` | Returns a reduced representation: `applyReducers` (one element of an array with a reducer), `applyMainValue` (a struct's main value), or both together |
| `$includeRid` | Adds `$rid`; type the result as `Osdk.Instance<T, "$rid">` |
| `$loadPropertySecurityMetadata` | Adds `$propertySecurities` |
| `$orderBy`, `$pageSize`, `$nextPageToken`, `$snapshot` | Sorting and paging |

**[Docs]** Selecting an array property without a modifier returns the **full** array, even if a reducer is configured in Ontology Manager. In Python the modifier is called `extractMainValue` rather than `applyMainValue`, it's beta, and the reduced value arrives on `modified_properties` while the ordinary attribute is `None`.

**[Docs]** The Java OSDK's `FetchRequest` has a `selectedProperties` field, but "current generated Java OSDK read methods do not apply it". Property selection isn't supported in Java.

## Aggregations in TypeScript

**[Docs]** The TypeScript page spends a lot of words on one point: `$select` keys are **flat strings**. A key is either `$count` or `"property:metric"`, for example `"numberOfReviews:avg"`, and the value is a sort direction (`"unordered"`, `"asc"`, `"desc"`). Ordering works only with at most one `$groupBy` key.

**[Docs]** Result types are worth reading carefully:

- an ungrouped aggregation returns **one object**; a grouped one returns an **array of rows**, empty when nothing matches;
- `approximateDistinct` and `exactDistinct` are always `number`;
- `sum`, `avg`, `min` and `max` follow the property's own type, so an optional integer's `avg` is `number | undefined`, and a `LocalDate` or `Long` metric is a **string**;
- metrics can't be aliased in TypeScript; Python and Java take a `name`.

**[Docs]** Group-by options in TypeScript are `"exact"`, `$fixedWidth`, `$ranges` (inclusive start, exclusive end, both required) and `$duration`. Weeks, months, quarters and years accept a value of **1** only; seconds, minutes and hours work only on timestamps. Only range groups come back as `{ startValue, endValue }`.

**[Docs]** The Python reference documents only exact grouping on its page, plus grouping by a linked object's property through a beta derived property (`with_properties`). Java documents exact, fixed-width, range and date grouping.

## Python and Java specifics

**[Docs]** Python:

- Supports Python **3.10 through 3.14**.
- Inside Foundry (a Python function, a Code Workspaces notebook, a model adapter), `FoundryClient()` takes no arguments; outside, pass `UserTokenAuth` and a hostname.
- Uploaded **attachments are deleted after one hour** unless an action writes them to an object; until then only the uploader can read them.
- Markings and vector properties are beta and must be read inside `AllowBetaFeatures`; media properties are read directly.
- Function results come back as instances: an object, an object set, an attachment, two- and three-dimensional aggregations, or a map.

**[Docs]** Java: media reference properties can be read (`fetchMetadata()`, `openStream()`) and uploaded with a generated `upload<Property>()` method, then attached with an action. A media reference must stay in the **same media set** wherever it's used.

**[Docs]** TypeScript and Python both document an **experimental scenario-scoped client** for what-if analysis against an Ontology scenario. **[Explanation]** The TypeScript snippet creates `scenario` but then calls `scenarioClient(...)`, which it never defines; the Python snippet is consistent. Kestrel's scenario work is in [Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md).

## Other languages

**[Docs]** In Developer Console, open **Application API**, then the **SDK generation** tab, choose **Other languages** and **Export as OpenAPI**. Generate a client with any open-source OpenAPI generator. The export includes resource names and descriptions, so check they contain nothing sensitive. Structs and vectors become `any` and need a manual format.

## What won't generate

**[Docs]** Generation behaves in two different ways, and the difference matters:

| Problem | What happens |
|---|---|
| An **object property** of an unsupported type | The property is **skipped** and an error is logged. The package still builds. |
| An **action parameter** or **function input/output** of an unsupported type | The package **fails to generate**. Remove the action or function from the app until support arrives. |
| An action whose **webhook uses OAuth 2.0** | Unsupported, because SDK users can't authorize the outbound application first |

**[Docs]** Skipped property types: TypeScript skips Cipher, Marking and Vector; Python skips Cipher, Marking, Media, Struct (except beta support in Python functions) and Vector; Java skips TimeSeries, Cipher and Vector. The blocking parameter and function types are tabled in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q4--will-our-types-generate).

**[Explanation]** The pages don't agree with each other here. *Unsupported types* lists Marking and Vector as unsupported in Python, while the Python reference reads both inside `AllowBetaFeatures`. The most likely reading is that beta support exists but generation without the beta path still skips them. Logged as [RQ-01](../SOURCES.md#open-research-questions).

**[Example]** Kestrel's customer portal is TypeScript, which keeps `Order.deliveryAddress` (a struct) that Python would drop ([Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q4--will-our-types-generate)). The portal pages through `Shipment`. The Kestrel model doesn't state each type's storage version; Kestrel uses Object Storage v2 (its `Customer` is a multi-datasource object type, which exists only there, [Ontology 04-02](../../Ontology/04-object-types/02-backing-datasources-and-mapping.md)), so assume `Shipment` is too: paging then has no 10,000 cap, but aggregations still do.

---
[Module index](README.md) · Next: [02 — Subscriptions](02-subscriptions.md)
