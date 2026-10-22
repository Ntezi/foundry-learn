# 01 — Review questions by module

*Sources: the notes each question links to · written October 22, 2026 · not yet attempted*

Scenario questions in the style of the Application Developer Associate exam: a situation, a question, and the answer folded away. Each is tagged with its exam domain from the [official guide](../../Application%20Developer/07_Exam_Guide.md):

- **D3** Ontology functions
- **D5** OSDK, APIs and external applications
- **D7** AIP Logic and AI-powered applications
- **D8** Application security, governance and operations
- **—** not in the Associate guide (useful for work, not the exam)

Answer before opening each one. Every answer links to the note that explains it.

## 00 — Orientation

**Q1 · D5** An external partner system needs to call a Kestrel function at a fixed URL with a request body of its own design. A colleague suggests a compute module. What's the better fit, and what does it change?

<details><summary>Answer</summary>

A **custom endpoint**: it only changes the **shape** of the call (path, method, body); the logic behind it is still the function. A compute module is for code that can't be a function. Custom endpoints are beta. [00-01](../00-orientation/01-the-toolchain-map.md#three-distinctions-that-trip-people-up), [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md)
</details>

**Q2 · D7** Which MCP server do you give (a) a developer's coding assistant that should create object types, and (b) a customer-support agent outside Foundry that should look up orders?

<details><summary>Answer</summary>

(a) **Palantir MCP**, for builders: structure, on a branch, through proposals. (b) **Ontology MCP**, for consumers: the object types, actions and query functions one Developer Console application exposes. [00-01](../00-orientation/01-the-toolchain-map.md#three-distinctions-that-trip-people-up)
</details>

## 01 — Ontology SDK

**Q3 · D5** A Python integration needs `Order.deliveryAddress`, a struct. The generated Python OSDK has no such property, and generation didn't fail. Why, and what do you do?

<details><summary>Answer</summary>

Struct properties are among the types the Python OSDK skips; the generator logs an error rather than failing. Use the TypeScript OSDK, which keeps structs. [01-01](../01-ontology-sdk/01-languages-and-generation.md#what-wont-generate)
</details>

**Q4 · D5** The portal wants live updates for *all shipments of this customer's orders*, built with `pivotTo`. The subscription won't start. Why, and what's the workaround?

<details><summary>Answer</summary>

Object sets built with a **pivot can't be subscribed to**. Subscribe with a **filter** on `Shipment` instead (one per open order, or on a `customerId` copied onto Shipment). [01-02](../01-ontology-sdk/02-subscriptions.md#for-kestrel)
</details>

**Q5 · D5** A subscription calls `onOutOfDate`. What must the client do?

<details><summary>Answer</summary>

Reload the set with a normal fetch (`fetchPage`) before trusting further updates. [01-02](../01-ontology-sdk/02-subscriptions.md)
</details>

## 02 — Developer Console and platform APIs

**Q6 · D5** Kestrel's customers aren't Foundry users. Which application type and grant does the portal backend need?

<details><summary>Answer</summary>

A **backend service** with **application permissions**: the client credentials grant, acting as a service user. Client-facing apps must not store client credentials. [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#for-kestrel)
</details>

**Q7 · D8** What three things does an application's token intersect?

<details><summary>Answer</summary>

The user's (or service user's) own permissions, the application's **restrictions**, and the **scope** requested in code. [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md), [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get)
</details>

**Q8 · D8** The portal's service user has a valid token and restrictions covering `Shipment`, yet every shipment query returns nothing. What's the likely cause?

<details><summary>Answer</summary>

`Shipment`'s **regional object security policy**: the service user has no `region`, so it matches no rows. The policy needs an explicit branch for it, and then the backend must filter by customer on every call. [Ontology 10-04 Q2](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get), [09-01](../09-kestrel-case/01-customer-portal-built-out.md)
</details>

**Q9 · D5** A deploy starts failing with 403 `ApiUsageDenied`. Do you grant the service user more permissions?

<details><summary>Answer</summary>

No. `ApiUsageDenied` means the token isn't allowed to call **this endpoint**: add the operation scope or restriction in Developer Console. A 403 `PermissionDenied` would be about data permissions. [02-04](../02-developer-console-and-apis/04-platform-apis.md#errors)
</details>

**Q10 · D5** A call returns 404 `ObjectNotFound` for an order you can see in Workshop. First suspicion?

<details><summary>Answer</summary>

The **token** can't see it: most `NotFound` errors say the object "could not be found, or the client token does not have access to it". Check the token's user, restrictions and scope. [02-04](../02-developer-console-and-apis/04-platform-apis.md#errors)
</details>

**Q11 · D5** A nightly export pages through all shipments while scans keep arriving, and sometimes counts a shipment twice. Fix?

<details><summary>Answer</summary>

**Snapshot** paging, which freezes the data before the first page. Keep default paging for screens that show current status. [02-04](../02-developer-console-and-apis/04-platform-apis.md#paging)
</details>

**Q12 · D5** You request `pageSize=5000` and get 1000 results with a `nextPageToken`. Bug?

<details><summary>Answer</summary>

No: `pageSize` is a suggestion and the default is usually also the maximum. Keep following `nextPageToken` until it's absent. [02-04](../02-developer-console-and-apis/04-platform-apis.md#paging)
</details>

**Q13 · D5** Your app gets intermittent 429s at peak. What's the documented response?

<details><summary>Answer</summary>

Retry with **exponential backoff** (Kestrel adds jitter). The global limits are 10,000 requests a minute and 800 concurrent requests per user, and individual services can throttle on their own. [02-04](../02-developer-console-and-apis/04-platform-apis.md#limits)
</details>

**Q14 · D8** An outage happened at 10:00. Can Developer Console metrics show it by noon?

<details><summary>Answer</summary>

No: metrics arrive with about **24 hours** of latency, and count only calls made through the app's OAuth flow. Log errors in the app for anything urgent. [02-03](../02-developer-console-and-apis/03-operating-an-application.md#metrics)
</details>

**Q15 · D5** An OSDK React app on a global branch seems to work, but its edits show up on `main`. What do you check?

<details><summary>Answer</summary>

That its Ontology requests carry the branch's `branch` query parameter. A dev server or embedded app that isn't set up for branching silently reads and writes `main`. [02-03](../02-developer-console-and-apis/03-operating-an-application.md#branching-the-application)
</details>

**Q16 · D8** You install a product containing a backend app with a confidential client in `kestrel-test`. Calls fail with authentication errors. Why?

<details><summary>Answer</summary>

Packaged confidential clients arrive **without a secret**. Rotate one in the destination environment. [02-03](../02-developer-console-and-apis/03-operating-an-application.md#shipping-with-marketplace)
</details>

## 03 — Compute modules and custom endpoints

**Q17 · —** When is a compute module the right choice for Kestrel?

<details><summary>Answer</summary>

Only for code that can't be a function: another language, a long-running service, a model host such as `kestrel-pay-llm`, or a binary library. Ordinary logic stays in functions, actions and Logic. [03-01](../03-compute-modules-and-custom-endpoints/01-compute-module-concepts.md#for-kestrel)
</details>

**Q18 · —** Why did Kestrel not adopt a custom endpoint for its support portal?

<details><summary>Answer</summary>

Beta, and it needs an **unrestricted** application, which would undo the portal's least-privilege design ([RQ-04](../SOURCES.md#open-research-questions) covers a doc conflict here). [03-04](../03-compute-modules-and-custom-endpoints/04-custom-endpoints.md)
</details>

## 04 — MCP and pro-code agents

**Q19 · D7** A pro-code agent should answer a user in a chat window. Will it work?

<details><summary>Answer</summary>

No: a published pro-code agent is an **asynchronous function returning `Void`**. Use an AIP Chatbot Studio agent for conversation; use a pro-code agent for background work, triggered by Automate. [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md#calling-an-agent)
</details>

**Q20 · D8** A developer runs Palantir MCP from a local IDE whose model is hosted by a third party. Who governs the data the tools return?

<details><summary>Answer</summary>

The external provider: once data leaves through Palantir MCP, governance shifts to that system. In a VS Code workspace with Palantir-provided models, it stays in Foundry. [04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md#security-and-data-flow)
</details>

**Q21 · D7** A pro-code agent on a global branch calls Palantir MCP to inspect branched resources. What's wrong?

<details><summary>Answer</summary>

Palantir MCP doesn't support branch context, and platform APIs aren't branch-aware; the OSDK and Ontology MCP read and write the branch but use the `main` schema. [04-03](../04-mcp-and-pro-code-agents/03-pro-code-agents.md#branches-and-external-systems)
</details>

## 05 — Development environments

**Q22 · —** A data scientist commits a 200 MB CSV and **Sync changes** fails. Fix, and prevention?

<details><summary>Answer</summary>

Remove the file from git history and add the pattern to `.gitignore`; keep data in `data-checkpoint` or `data-tmp`, or write it to a dataset. [05-01](../05-development-environments/01-code-workspaces.md#saving-work-syncs-and-checkpoints)
</details>

**Q23 · D8** A workspace loads a dataset marked `Kestrel Pay – Financial` and has a source whose exportable markings don't include it. What happens at startup?

<details><summary>Answer</summary>

The workspace refuses the combination: a dataset whose marking isn't on the source's exportable list can't be used with that source in the same workspace. Remove one, then restart without a checkpoint. [05-01](../05-development-environments/01-code-workspaces.md#security)
</details>

**Q24 · —** A preview of a transform with a narrow filter and a join returns almost nothing under the default strategy. What do you switch to?

<details><summary>Answer</summary>

**Full dataset** (filters pushed down, no sampling) or a **code-defined filter**. The 1000-row sample rarely contains the matching rows. [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md#preview)
</details>

**Q25 · D8** What two conditions must hold for local transforms preview?

<details><summary>Answer</summary>

An administrator enables local preview in Control Panel, **and** the user has **Download** (`s3-proxy:datasets-read`, `api:datasets-read`) on every input. [05-03](../05-development-environments/03-palantir-extension-for-vs-code.md#security-of-local-preview)
</details>

**Q26 · —** Your team edits a SuperRepo-installed object type in Ontology Manager after unlocking the project. What happens at the next deploy?

<details><summary>Answer</summary>

The edits are **overwritten**: Ontology-as-code is the source of truth. [05-04](../05-development-environments/04-superrepo-and-foundry-cli.md#limits-today)
</details>

## 06 — Branching and cross-app interactivity

**Q27 · D8** A branch went inactive and was reactivated. A transform build started from Data Lineage still fails. Why?

<details><summary>Answer</summary>

Job specs may have been deleted. Make a no-op commit and build **from the repository**; a first build from Data Lineage won't re-create them. [06-01](../06-branching-and-cross-app/01-global-branching.md#code-and-builds-on-a-branch)
</details>

**Q28 · D8** Who can merge a proposal once checks and approvals pass?

<details><summary>Answer</summary>

Anyone who can **view** it, unless an owner set **Do not merge**. The merging user may apply changes they couldn't make themselves, by design. [06-01](../06-branching-and-cross-app/01-global-branching.md#who-can-do-what)
</details>

**Q29 · —** Your custom drop zone never receives drops. What did you probably forget?

<details><summary>Answer</summary>

`preventDefault()` in `dragover` (and `dragenter`) when the payload's types include one you accept; without it the drop event never fires. [06-02](../06-branching-and-cross-app/02-cross-application-interactivity.md#building-zones-by-hand)
</details>

## 07 — FoundryTS

**Q30 · —** `F.scale(10)(collection)` errors. Why, and the fix?

<details><summary>Answer</summary>

`scale` takes one series; map it over the collection with `collection.map(F.scale(10))`. [07-01](../07-foundryts/01-foundryts.md#collections)
</details>

**Q31 · —** How do you find periods where a probe stayed above 8 °C for at least 10 minutes?

<details><summary>Answer</summary>

`time_series_search(predicate="a > 8", min_duration="10min")`, which returns the intervals with statistics. [07-01](../07-foundryts/01-foundryts.md#for-kestrel)
</details>

## 08 — Product delivery

**Q32 · D8** An installer can't install the Delivery Desk in a new space: the `Order` input has no option to pick. Why?

<details><summary>Answer</summary>

The input's preset resolves by API name, and that space has no matching type, while **Allow custom values** is off. Either the type must exist there under that API name, or allow custom values. [08-01](../08-product-delivery/01-devops-products.md#input-presets)
</details>

**Q33 · D8** You publish a new upstream product version with a removed output as a **minor** version. What happens downstream?

<details><summary>Answer</summary>

Installers can still pick the link but will likely hit errors at install. Breaking changes deserve a **major** version, after which every downstream product must be repackaged. [08-01](../08-product-delivery/01-devops-products.md#linked-products)
</details>

**Q34 · D8** On an enrollment that restricts downloads, a project Owner can't package a dataset **with static data**. Why?

<details><summary>Answer</summary>

It needs `foundry-data-proxy:get-files` (Download), which such enrollments move to a separate role such as *Exporter*. Package the definition only, or with its transform, if the rows aren't needed. [08-02](../08-product-delivery/02-stores-groups-and-export.md#store-permissions)
</details>

**Q35 · D8** A user edited a resource in a locked production installation after unlocking it. What happens at the next upgrade?

<details><summary>Answer</summary>

Marketplace **overwrites** the edit. Keep production locked and change resources in dev. [08-03](../08-product-delivery/03-marketplace-installs-and-releases.md#after-installing)
</details>

## 09 — Kestrel case

**Q36 · D8** Why does Kestrel's Delivery Desk product package `deliveryRisk` without the `kestrel-functions` repository?

<details><summary>Answer</summary>

Functions don't need their source code packaged, so the product can carry just its two functions; the repository also holds functions unrelated to the Delivery Desk. [09-03](../09-kestrel-case/03-delivery-desk-product-release.md#outputs)
</details>

**Q37 · D8** Why are `PolicyDocument` and `PolicyChunk` inputs to the Delivery Desk product, not outputs?

<details><summary>Answer</summary>

`PolicyChunk` has a **vector** property, which Marketplace packaging doesn't support. [09-03](../09-kestrel-case/03-delivery-desk-product-release.md#inputs)
</details>

---
[Module index](README.md) · Next module: [99 — Reference](../99-reference/README.md)
