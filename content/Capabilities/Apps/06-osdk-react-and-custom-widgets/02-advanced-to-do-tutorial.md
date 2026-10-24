# 02 — Inside the advanced to-do tutorial

*Sources: [Build an advanced to-do application with OSDK](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/advanced-todo-application-overview/) · [Architecture and configuration](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/advanced-todo-application-architecture/) · [useProjects](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useprojects-hook/) ([code](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useprojects-tsx/)) · [useTasks](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usetasks-hook/) ([code](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usetasks-tsx/)) · [useCodingTask](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usecodingtask-hook/) ([code](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usecodingtask-tsx/)) · [useLearningTask](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/uselearningtask-hook/) ([code](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/uselearningtask-tsx/)) · [useAdmin](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useadmin-hook/) ([code](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useadmin-tsx/)) · checked October 18, 2026 · Ready for Review*

**[Concept]** The advanced to-do app is a reference project you install from Code Workspaces (*New Workspace* → VS Code → Applications) or the Examples application. Its docs are twelve pages, half of them source listings. This note reads it for its **patterns**: each hook shows one OSDK technique, and each page ends with an honest list of what the code doesn't handle.

## The architecture

**[Docs]** The app's structure:

- **Routing**: React Router with two routes, `/` and `/auth/callback` for the OAuth return.
- **`OsdkProvider`** (from `@osdk/react`) at the root supplies the authenticated client; components get it with **`useOsdkClient`**. The OAuth client handles redirects, token refresh and scopes.
- **Configuration** comes from `<meta>` tags in `index.html` (`osdk-clientId`, `osdk-redirectUrl`, `osdk-foundryUrl`, `osdk-ontologyRid`), filled from `.env`, `.env.development` and `.env.production`. Nothing sensitive is hard-coded in JavaScript.
- **Data hooks** wrap the OSDK calls (`useProjects`, `useTasks`…) and cache results with **SWR** (stale-while-revalidate). UI components stay presentational.

**[Explanation]** The tutorial uses SWR for caching. The `@osdk/react` hooks in [01](01-osdk-react-apps.md#the-two-libraries) now provide a shared cache themselves, so a new app might not need SWR. The tutorial pages don't compare the two.

## Six patterns and where Kestrel would use them

| Pattern | In the tutorial | OSDK technique | Kestrel parallel |
|---|---|---|---|
| **Interfaces and polymorphism** | Tasks are an `OsdkITask` interface with coding and learning implementations | Query the interface with `$includeAllBaseObjectProperties: true`, then **`$as`** to the concrete type | The `Case` interface over Support Ticket and Fraud Case ([Ontology 07-02](../../Ontology/07-interfaces/02-implementing-and-extending-interfaces.md)): one list of cases, then type-specific detail |
| **Runtime-derived properties** | Each project gets task counts by status | `pivotTo` + `where` + `aggregate` computed **on the server** in one request | Late-shipment counts per `Carrier`, without loading every shipment |
| **Media** | Learning tasks show a PDF, image or video | Fetch the media reference's content, make a **blob URL**, detect the MIME type | `CarrierInvoice.sourceDocument` ([AIP 06-01](../../AIP/06-document-intelligence/01-extraction-strategies.md#where-the-data-goes)) |
| **Metadata-driven UI** | Labels and descriptions come from the Ontology | Fetch object type metadata | Display names from the Ontology, so renaming a property doesn't need a code change |
| **Subscriptions** | The task list updates live | `subscribe` with added/updated, removed and out-of-date handling | Live shipment status, within the limits in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q5--can-the-portal-update-live) |
| **Batched user lookups** | Task creators and assignees | Collect unique user IDs, one **`getBatch`** call to the Admin API, a lookup map | The Foundry users who submitted actions, from action logs ([Ontology 08-07](../../Ontology/08-actions/07-consistency-reverts-and-logs.md)). Kestrel's `Agent` is an object type, not a Foundry user, so it isn't an Admin API lookup |

**[Docs]** The batching changes the number of user requests from **O(n) to O(1)** in the number of tasks. Profile pictures aren't batched: `getCurrentProfilePictureUrl` makes one request per user, and the caller must revoke each blob URL.

## The hooks, one line each

| Hook | Does | Notable choice |
|---|---|---|
| `useProjects` | Projects with task statistics | Statistics as runtime-derived properties; totals added client-side; `revalidateOnFocus` off |
| `useTasks` | A project's tasks with user details, kept live | Server-side ordering by due date and status; subscription updates the SWR cache with `mutate` (no refetch); cleaned up on unmount |
| `useCodingTask` | One coding task | `$as` to the coding implementation; reuses the parent task's user data |
| `useLearningTask` | One learning task with its media | `fetchOneWithErrors` returns a **Result** (success or error) instead of throwing |
| `useAdmin` | Current user, batches of users, profile pictures | Cache-first: only fetches users not already cached; an empty ID list makes no request |

## What the docs admit the code doesn't do

**[Docs]** Each hook page ends with edge cases and limitations. Read together, they make a checklist for your own app:

- **No pagination.** `useProjects` and `useTasks` load everything; the docs suggest `fetchPage` for large data.
- **Subscriptions are partial.** `onOutOfDate` takes no action, and **newly added** tasks are ignored until the next revalidation, because the handler only replaces tasks already in the cache.
- **Blob URLs leak.** Neither media nor profile-picture URLs are revoked; call `URL.revokeObjectURL()`.
- **`$as` can fail at runtime** if the object isn't actually that type, and the hook doesn't catch it.
- **Coupling.** Status strings and relationship names (`codingTasks`, `learningTasks`) are hard-coded; a new task type or status needs code changes. The docs suggest constants for the statuses.
- **Missing users** come back as `undefined`, and components must cope.
- **Errors.** Some hooks have no `try/catch` and rely on SWR's default retries; fetches in quick succession can race.

**[Recommendation]** Treat the tutorial as a pattern catalogue, not a starter template. Before copying a hook, fix the items on that list that your data volume will hit, starting with pagination and subscription handling.

---
[Module index](README.md) · Previous: [01 — OSDK React apps](01-osdk-react-apps.md) · Next: [03 — Custom widget sets](03-custom-widget-sets.md)
