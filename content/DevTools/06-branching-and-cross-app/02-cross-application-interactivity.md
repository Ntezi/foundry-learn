# 02 — Cross-application interactivity

*Sources: [Cross-application interactivity: Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/overview/) · [App Pairing widget](https://www.palantir.com/docs/foundry/cross-app-interactivity/app-pairing/) · [Drag and drop: Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/drag-and-drop-overview/) · [Drag and drop between Ontology SDK applications](https://www.palantir.com/docs/foundry/cross-app-interactivity/osdk-drag-and-drop/) · [Create a drag-and-drop integration point](https://www.palantir.com/docs/foundry/cross-app-interactivity/tutorial/) · [Drag and drop between Foundry and Gotham](https://www.palantir.com/docs/foundry/cross-app-interactivity/enrichment-reference/) · [Implement drag and drop between Foundry and Gotham](https://www.palantir.com/docs/foundry/cross-app-interactivity/enrichment-tutorial/) · [Design guidelines](https://www.palantir.com/docs/foundry/cross-app-interactivity/design-guidelines/) · [Commands: Overview](https://www.palantir.com/docs/foundry/cross-app-interactivity/commands-overview/) · [Media types reference: Objects](https://www.palantir.com/docs/foundry/cross-app-interactivity/objects/) · [Media types reference: Object sets](https://www.palantir.com/docs/foundry/cross-app-interactivity/object-sets/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Cross-application interactivity** is how separate Palantir applications share data: by **drag and drop**, by **App Pairing** (two apps kept in sync), and through **commands** (operations one app declares and others, or AIP chatbots, run). All Gotham applications and many Foundry ones support it, and so can apps built in Workshop, Slate or with the OSDK. [Apps 04-04](../../Apps/04-workshop-in-production/04-cross-application-interactivity.md) covers the Workshop side; this note covers the platform mechanics and building them into your own app.

## Drag and drop

**[Docs]** Drag and drop here is the standard web mechanism. Four concepts:

- The **DataTransfer** (the *drag payload*) carries the data.
- **Media types** say what kind of data it is.
- A **drag zone** listens for `dragstart` and writes to the DataTransfer.
- A **drop zone** listens for `drop` and reads it; it can accept only some media types.

**[Docs] Palantir media types.** The payload is a JSON-serialized `string[]`:

| Media type | Carries | Example source and target |
|---|---|---|
| `application/x-vnd.palantir.rid.phonograph2-objects.object` | Foundry object RIDs | Object Explorer's object icon → a Vertex graph |
| `application/x-vnd.palantir.rid.object-set.temporary-object-set` | Foundry object set RIDs | A draggable Workshop section title → a Vertex graph |
| `application/x-vnd.palantir.rid.gotham.object` | Gotham object IDs (GIDs) | Gotham browser cards → a Gaia map |

**[Docs]** Add Palantir media types to your payloads even where standard types would work, for interoperability. And "Keep security concerns in mind when adding data to your DataTransfer. Any drop zone will be able to access this data."

### Building zones by hand

**[Docs]** The tutorial's steps, for one media type:

1. **Drag zone:** set `draggable="true"` and, in `ondragstart`, call `event.dataTransfer.setData(<media type>, JSON.stringify(rids))`.
2. **Drop zone:** in `ondragover` and `ondragenter`, call `preventDefault()` **only if** `event.dataTransfer.types` includes a type you accept; otherwise the drop never fires.
3. **Handle the drop:** `preventDefault()`, then `getData(<media type>)`, which returns an empty string when that type is absent; parse it inside `try`/`catch`, and validate it with a runtime type guard.
4. **Style it:** track `dragenter`/`dragleave` counts in the **capture** phase (child elements fire them too), add a global `dragstart` listener so drags from your own page light the zone up, add hover styles, and clear styles and counters on drop.

**[Docs]** Dragging only works between zones with the **same media type**. A Foundry RID payload doesn't light up a Gotham-only drop zone unless it's enriched (below).

### The OSDK React library

**[Docs]** `@palantir/dnd-osdk-react` does this for OSDK apps, against Workshop, Object Explorer, Gaia and other platform apps. Add it from the **Libraries** panel of a **React** VS Code workspace. It needs a generated OSDK client.

- `OsdkObjectDragZone` (props `client`, `objectSets`) makes its children draggable with the object data in the payload.
- `OsdkObjectDropZone` (props `client`, `acceptedObjectTypes`, `onObjectSetsDrop`, `className`, `acceptedClassName`) deserializes drops and hands you object sets keyed by API name.
- Dropped objects are **always converted to object sets**. The zone can also accept custom data types, and memoizes to avoid repeat backend calls.

### Design guidelines

**[Docs]** Give every drop zone three states, each with a hover variant: **valid drop**, **invalid drop**, and **loading** (while the zone checks the payload asynchronously, for example during enrichment). The page has CSS for small (tab bar, form field), medium (object card) and large (whole map) zones, using Blueprint colours. Toasts: **loading** while enriching, **success** that disappears after **750 milliseconds**, **invalid after enrichment** and **too many IDs** (the zone used only the first) that stay until closed. Use a **dialog** when a drop needs a decision.

### Between Foundry and Gotham: enrichment

**[Docs]** When the same real-world object exists in both Foundry and Gotham, the two are **synonyms**, linked by **type mapping**. **Data enrichment** asks the **Data Bank Service** (`PUT /data-bank-service/api/data-transfer/batchEnrichDataTransfer`) for the synonym, so a Gotham payload also carries the Foundry media type and vice versa. It needs an enrollment with **both** Gotham and Foundry and type mapping enabled. Only those two object media types are supported today.

**[Docs]** Enrich at **one** end. A drop zone that accepts both worlds should enrich after the drop; a drag zone meant for both should enrich before writing the payload, **when the component mounts**, because `dragstart` can't make blocking calls. Each call has a small performance cost.

## App Pairing

**[Docs]** **App Pairing** keeps a Workshop module and another application in sync: change data or selection in one and the other updates. Put the **App Pairing widget** in the module **header** (it only works while visible) and give it a name, which is how other apps discover it.

- **Shared state:** **Selection** (selected objects synced both ways) or **Open data** (everything visible in the other app, **Graph only**). A selected-objects variable is created by default; add more, or **Custom** variables described by a media type string.
- **Pairing:** open the other application; it appears under **Discovered**; select **Pair**. An app embedded with the **Iframe widget** is discovered and paired automatically.
- **Appearance:** auto-open mode (`Disabled` by default; or `Enabled`, `Only initially`, `Only on pairing change`), pairing toasts (error toasts always show), and an optional pause toggle that resyncs when resumed.
- **Advanced:** **Disable data enrichment** only if both sides pass compatible payloads (Graph needs it for `Object Synonym RIDs set` variables). A **Scope Id** variable controls which apps pair; add a non-Workshop app to the scope with `&appPairingScopeId=[scope-id]` in its URL.
- **Trigger commands on variable update** runs commands in the paired app when a variable changes.

## Commands

**[Docs]** **Commands** are "a pro-code language" in which an application declares client-side operations that it, other applications, workspace components or **AIP chatbots** can run. In Workshop, three widgets trigger them: **Button Group** (*On click*), **Metric Card** (an interactive metric) and **App Pairing** (a listener on a variable, with an optional Boolean condition). Chatbots use them as tools ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md)), and Notepad documents can run them inline.

**[Docs]** Configuring one: pick it under **Add command > Browse all commands...**, set parameter defaults, choose the **target app** (the **Paired app** by default; if several are paired, the user is asked), and optionally map its output to a variable.

**[Docs] Chains.** Commands added one after another run in order and can pass outputs on. All must come from the **same source application** (for example Gaia or Graph). If one fails, the chain **continues**. The input dialog can always prompt, never prompt (skip a command with missing inputs; the App Pairing default), prompt when any input is missing, or prompt only when required inputs are missing (the Button Group default). Commands fire right after the triggering variable changes; to avoid sending stale data, listen to the **derived** variable itself.

## For Kestrel

**[Example]** Kofi's re-route review page already embeds a map in an Iframe widget, and his reviewer chatbot moves it and draws on it with commands ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md#kestrel-a-map-command-for-kofi)). Because the map is embedded, an App Pairing widget in the page header would pair with it automatically. A **Selection** variable would then hold whatever objects Kofi selects on the map, which the page could use to filter the proposal list to that shipment, and commands would target the paired map by default. *Considered, not adopted*: the page works today, and a second sync path is worth adding only if Kofi asks to work from the map.

**[Explanation]** Kestrel has no Gotham, so enrichment and the Gotham media type don't apply. Any custom app Daniel builds would use the Foundry object and object-set media types, most simply through `@palantir/dnd-osdk-react`, so that orders dragged from it land in Ama's *Follow up today* drop zone ([Apps 04-04](../../Apps/04-workshop-in-production/04-cross-application-interactivity.md#drag-and-drop-in-practice)).

---
[Module index](README.md) · Previous: [01 — Global Branching](01-global-branching.md) · Next module: [07 — FoundryTS](../07-foundryts/README.md)
