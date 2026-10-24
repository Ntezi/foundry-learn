# 02 — Subscriptions

*Sources: [Subscribe to Ontology changes with the TypeScript OSDK](https://www.palantir.com/docs/foundry/ontology-sdk/typescript-subscriptions/) · [Subscribe to Ontology changes via WebSocket](https://www.palantir.com/docs/foundry/ontology-sdk/websocket-subscriptions/) · checked October 22, 2026 · Ready for Review*

**[Concept]** A subscription keeps an object set **live**: instead of polling, the client is told when objects are added, change or leave the set. The TypeScript OSDK wraps it in `.subscribe()`; underneath is a WebSocket endpoint any language can use.

## In the TypeScript OSDK

**[Docs]** Subscriptions are **GA**, released in OSDK **v2.1**. Generate a `2.1.x` or later SDK and install a matching `@osdk/client` (`npm install @osdk/client@^2.1.0`).

```ts
const subscription = client(Country)
  .where({ population: { $gte: "1000000" } })
  .subscribe(
    {
      onChange: (update) => {},             // ADDED_OR_UPDATED or DELETED, with the object
      onSuccessfulSubscription: () => {},   // updates are flowing from now on
      onOutOfDate: () => {},                // reload the set with fetchPage
      onError: () => {},                    // the subscription is closed
    },
    { properties: ["population"] },         // only these properties in updates
  );

subscription.unsubscribe();
```

**[Docs]** Rules to design around:

- Object sets built with **`.pivotTo` can't be subscribed to**.
- **Only one subscription per query** can be active at a time; two React components can't each hold a separate subscription to the same object set.
- Updates that arrive before `onSuccessfulSubscription` may not be reflected.
- Any property on the update's `Osdk.Instance` may be **undefined**, meaning "not returned", not *changed to undefined*. The primary key and `$primaryKey` are always set.
- If the object type gained properties after your SDK was generated, you can get updates where nothing you know about changed.
- For a **geotemporal series reference** property, a new series value triggers an update, readable on `lastFetchedValue`.

**[Explanation]** Two consequences for app design:

- Put the subscription in **one** place (a store, a context, a shared hook) and fan updates out, because of the one-per-query rule.
- Treat `onOutOfDate` as normal, not as an error. It's the signal to reload; build the reload path first.

## Over the WebSocket

**[Docs]** The endpoint is the Object Set Watcher:

```text
wss://{foundryUrl}/api/v2/ontologySubscriptions/ontologies/{ontology}/streamSubscriptions
```

**[Docs]** Authentication is unusual: pass `"Bearer-{token}"` as a **WebSocket sub-protocol**, with a hyphen where the REST APIs use a space.

**[Docs]** The client sends one JSON message listing **all** the subscriptions it wants. Each request has an `objectSet` in the standard object set syntax (`base`, `filter`, …), an optional `propertySet`, an optional `referenceSet` for things like geotemporal series, and an optional `objectLoadingResponseOptions.shouldLoadObjectRids` (default false; RIDs add latency).

**[Docs]** The message is a desired state, not a delta: sending a new list keeps matching subscriptions, closes missing ones and opens new ones. An empty `requests` array unsubscribes from everything.

**[Docs]** Server messages:

| Message | Meaning | What the client does |
|---|---|---|
| `subscribeResponses` | One `success` (with a subscription ID) or `error` per request. A `qos` response means the server is under heavy load. | Track IDs; on `qos`, retry with exponential backoff and jitter |
| `objectSetChanged` | `object` updates with state `ADDED_OR_UPDATED` or `REMOVED`, or `reference` updates | Apply them. `REMOVED` means deleted **or no longer matching the filter** |
| `refreshObjectSet` | No incremental updates possible | Reload the set over HTTP |
| `subscriptionClosed` | Closed, with a cause: an error such as `SUBSCRIPTION_MEMORY_LIMIT_EXCEEDED`, or `USER_CLOSED` | Resubscribe or stop |

**[Docs]** Limitations:

- Joins aren't fully supported: the server watches part of the set and can't guarantee completeness.
- Subscriptions **don't survive server restarts**; write reconnection logic.
- Memory limits apply per subscription, so very large sets may be closed.
- Some advanced full-text filters aren't supported.
- **Interface** object sets return updates as the **underlying object types**. Remap properties using the beta *Load Object Type Full Metadata* endpoint (`implementsInterfaces2`), and cache the mapping for the subscription's lifetime.

## Where the two pages differ

**[Explanation]** Three things to know before you rely on the examples:

- **Deleted vs removed.** The TypeScript page names the second state `DELETED`; the WebSocket page names it `REMOVED` and says it also covers objects that stop matching the filter. Because `.subscribe()` runs on the WebSocket, a TypeScript `DELETED` update may also mean *left the filter*. Handle it as *drop from my view*, not *gone from Foundry*. Logged as [RQ-02](../SOURCES.md#open-research-questions).
- **API name or RID.** The endpoint text says `{ontology}` is the ontology's **API name**; the Python example builds the URL with `ONTOLOGY_RID`. The REST examples in [02-04](../02-developer-console-and-apis/04-platform-apis.md#authentication) accept both, so either probably works, but this is untested.
- **The Python example's properties.** It subscribes to `Country` but asks for `timeUntilNextFlight` and `aircraftRegistration`, which belong to an aircraft example. Copy its structure, not its values.

## For Kestrel

**[Example]** The live part of Daniel's customer portal ([Ontology 10-04 Q5](../../Ontology/10-applications/04-osdk-and-apis.md#q5--can-the-portal-update-live)): the portal backend holds **one** subscription per open order, a filter on `Shipment` for that order, with `propertySet` limited to `eta`, `isLate` and `trackingUrl`. It forwards changes to the customer's browser over its own connection; the browser never talks to Foundry.

**[Explanation]** Why it's built that way:

- The filter form is required, because a pivot from `Order` to its shipments can't be subscribed to.
- `REMOVED` is handled as *stop showing*, which is right whether the shipment was deleted or re-assigned to another order.
- On `refreshObjectSet`, `onOutOfDate`, or a dropped connection after a server restart, the backend reloads the order's shipments with `fetchPage` before resuming.
- The backend calls as a **service user** ([02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#for-kestrel)), so it must still filter by the logged-in customer on every call, including what it forwards from the subscription.

---
[Module index](README.md) · Previous: [01 — Languages and generation](01-languages-and-generation.md) · Next: [03 — Migration, testing and setup](03-migration-testing-and-setup.md)
