# 05 — Buttons, forms and navigation

*Sources: [Event-triggering and navigational widgets](https://www.palantir.com/docs/foundry/workshop/widgets-event-navigational/) · [Button Group](https://www.palantir.com/docs/foundry/workshop/widgets-button-group/) · [Inline Action](https://www.palantir.com/docs/foundry/workshop/widgets-inline-action-form/) · [Tabs](https://www.palantir.com/docs/foundry/workshop/widgets-tabs/) · [Comments](https://www.palantir.com/docs/foundry/workshop/widgets-comments/) · [Media Uploader](https://www.palantir.com/docs/foundry/workshop/widgets-media-uploader/) · [Audio Recorder](https://www.palantir.com/docs/foundry/workshop/widgets-audio-recorder/) · checked October 18, 2026 · Ready for Review*

The widgets users click to make something happen. Wiring actions to buttons is in [02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md); this note covers what else each widget can do and where each one fits.

## Button Group

**[Docs]** Three button types: **inline** (one option), **menu** (several), **two-part** (a primary button plus a menu). Each button has text, colour (intent: none, primary blue, success green, warning amber, danger red; or custom/hex), icons, a description tooltip, style (minimal, tag, large, fill width), and an optional Boolean that makes it **disabled or hidden** when false.

**[Docs]** What **On click** can do:

| Option | Does | Know this |
|---|---|---|
| **Action** | Opens the action form | Can apply to a **scenario** instead of the Ontology; lifecycle triggers run events on start or success |
| **Events** | Runs a list of Workshop events | Variable updates may not finish before later events run ([01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md#order-of-execution-the-trap)) |
| **URL** | Opens a Foundry or external link | External links need `https://` |
| **Export** | Exports an object set to Excel or the clipboard | **Doesn't keep sort order** (the Object Table's right-click export does). Function-backed or linked columns switch the file to CSV |
| **Function-backed export** | Downloads a function's string output as CSV, TXT, JSON, XML, PDF, DOCX or XLSX | Text formats: plain string. Binary formats: base64 **without** a `data:` prefix (Python may return bytes). A `UserFacingError` message is shown to the user |
| **Export media** | Downloads media for chosen objects | Custom file names can include the timestamp, original name and properties |

**[Example]** Lena's team wants "the disputed lines as a spreadsheet, sorted by amount". A Button Group export won't keep the sort, so either use the Object Table's right-click CSV export on a table sorted by `amount`, or a function-backed export that builds the XLSX itself.

## Inline Action

**[Docs]** Shows one or more actions **inside the page** instead of in a pop-up form, in two layouts:

| Layout | Use for | Notes |
|---|---|---|
| **Action form** | One submission at a time; small numbers of objects; guided entry | Can run a function that computes many edits from a few inputs |
| **Action table** (formerly *action grid*) | Many rows at once; CSV upload; keyboard navigation | Rows can be **pre-filled** from an object set variable mapped to an object reference parameter; batch limits apply and edits mustn't conflict; some action features are form-only |

**[Docs]** Local parameter defaults override the action type's own. When submission criteria fail, the form can be **disabled or hidden**. An event can run after a successful submit, and an output object set can capture what was created or changed.

**[Example]** A carrier strike delays a batch of orders. Ama selects them in the queue (multi-select on), and an Inline Action **table** pre-filled from the selection gives one *Hold order* row per order with the same `reason`. *Hold order*'s submission criteria still apply to every row ([Ontology 08-01](../../Ontology/08-actions/01-action-types.md)). The page mentions batch limits and the rule that edits mustn't conflict, but not whether one row that fails (an order that shipped a minute ago) blocks the whole batch or only itself ([RQ-05](../SOURCES.md#open-research-questions)). Until that's known, clear shipped orders from the selection first.

## Tabs

**[Docs]** The Tabs widget has **no selection state of its own**. It shows as selected the tab whose *Switch to tab* or *Switch to page* event would cause **no layout change**, so its look is derived from the layout. Adding the widget doesn't create those events; you add them. Tabs can show badges (text or number from a variable) and be disabled or hidden by a Boolean. Styles: outline, block, prominent, grouped.

**[Explanation]** This is why a Tabs widget driving pages can look "stuck": if its events switch pages and something else (a *Set variable value* on the page variable) also does, the widget follows the layout, not your intent. Keep one way of switching. The page-variable caveat is in [01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md#which-events-keep-a-backing-variable-in-sync).

## Comments

**[Docs]** Comments attach to a **parent object** and follow its permissions: anyone who can see the object can read and post, and restricted views apply. They aren't objects, don't appear in Object Explorer, and only show in this widget. Users can delete their own.

**[Docs]** Other behaviour:

- **References** to objects inside comments, with hover or click events.
- **Notifications** are on by default (email and Foundry inbox) for commenters and mentioned users; the default link goes to the object's **Object View**, so back that view with a module containing the Comments widget. Custom notifications use an action with a notification side effect, fed *Users to notify* and *Comment text*.
- **Attachments** under a comment: keep them small; the limit is **200 MB**. Larger files belong on the parent object or in a media set.
- To make comments **searchable**, an action can write each comment to an **action log** (append-only, so no edit or delete later) or create a mirror object (editable, but the comment service stays the source of truth).
- With auto-refresh on, a refresh can wipe a half-typed comment; turn auto-refresh off on tabs with comments ([04-02](../04-workshop-in-production/02-performance.md#auto-refresh)).

**[Explanation]** "Comments follow the parent object" cuts both ways at Kestrel. Comments on **Order** are visible to every CS agent, because Order isn't regional. Comments on **Shipment** are visible only within the region, because of Shipment's regional policy. **[Docs]** Comments follow the object, not its **columns**: the docs' medical example needs a separate proxy object so that comments about sensitive fields stay hidden from users who can't see those fields. **[Explanation]** So an agent who pastes a customer's delivery address into an Order comment shows it to every agent who can see the order, including those that `Order.deliveryAddress`'s own PII policy hides it from ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)). Kestrel's rule: no addresses or contact details in comments.

## Media Uploader and Audio Recorder

**[Docs]** **Media Uploader** puts files into a folder, dataset or media set (static, or a RID from a variable; optional branch), limits extensions, and can run an action per file ([02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md#actions-from-uploads)). On mobile it can use the camera or gallery. File names are generated; custom names aren't supported. It is labelled *(Legacy)* in the widget picker.

**[Docs]** **Audio Recorder** records in the browser and saves to a **media set**; add **WEBM** (web) and **M4A** (mobile) as allowed input formats. An action can run on upload, taking the special *Media reference* value (keep that parameter hidden) and optionally the recording name.

---
[Module index](README.md) · Previous: [04 — Filtering widgets](04-filtering-widgets.md) · Next: [06 — AI, observability and embedded apps](06-ai-observability-and-embedding.md)
