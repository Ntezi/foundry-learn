# 03 — Media, documents and history

*Sources: [Resource List](https://www.palantir.com/docs/foundry/workshop/widgets-resource-list/) · [Media Preview](https://www.palantir.com/docs/foundry/workshop/widgets-media-preview/) · [Spreadsheet Display](https://www.palantir.com/docs/foundry/workshop/widgets-spreadsheet-display/) · [Video Display](https://www.palantir.com/docs/foundry/workshop/widgets-video-preview/) · [Audio and Transcription Display](https://www.palantir.com/docs/foundry/workshop/widgets-audio-preview/) · [PDF Viewer](https://www.palantir.com/docs/foundry/workshop/widgets-pdf-viewer/) · [Image Annotation](https://www.palantir.com/docs/foundry/workshop/widgets-image-annotation/) · [Data Freshness](https://www.palantir.com/docs/foundry/workshop/widgets-data-freshness/) · [Edit History](https://www.palantir.com/docs/foundry/workshop/widgets-edits-history/) · [Linked Compass Resources](https://www.palantir.com/docs/foundry/workshop/widgets-linked-compass-resources/) · [Action Log Timeline](https://www.palantir.com/docs/foundry/workshop/widgets-action-log-timeline/) · checked October 18, 2026 · Ready for Review*

Two groups: widgets that **show files** (documents, images, audio, video), and widgets that show **where data came from and what happened to it**.

## Showing files

### Where the file comes from

**[Docs]** The media widgets accept some of these sources:

| Source | Media Preview | PDF Viewer | Image Annotation | Video, Audio, Spreadsheet |
|---|---|---|---|---|
| Media reference property on one object | ✓ | ✓ | ✓ | ✓ (only source) |
| Attachment property on one object | ✓ | ✓ | | |
| Blobster RID | ✓ | ✓ | | |
| Media URL (media set or dataset proxy URL) | ✓ | | ✓ | |
| Dataset RID + file path (+ branch) | | ✓ | | |
| External URL | ✓ (allowed in the enrollment's Content Security Policy) | | ✓ (same) | |
| Base64 data URL | ✓ | | | |

**[Docs]** **Media Preview** shows any supported type; the specialised widgets show one type with more features. Media Preview can't open files embedded inside a PDF.

### The specialised viewers

**[Docs]**

- **PDF Viewer**: keyword search (from a string variable too), match highlighting and counts, a page-number variable, downloads (optional). **Annotation layers** show annotation objects by page and bounding boxes (a string array of `{"x1","y1","x2","y2"}` JSON strings), with tooltips, colours (static, a hex colour property, or rules; default `#FBD065`) and actions. New text or area selections can run an action, passing the page number, coordinates and highlighted text. A PDF with annotations can only be exported with the widget's own download button.
- **Spreadsheet Display**: views, searches and annotates a spreadsheet from a media reference. Annotation ranges are zero-indexed (`A1` is `(0,0)`); actions get the sheet name and selected range as JSON.
- **Video Display**: seek to a timestamp from a variable; key frames every 1, 5, 10 or 60 seconds, at chosen times, or by scene detection.
- **Audio and Transcription Display**: playback plus a transcript from **segment objects** (text, start and end in milliseconds, speaker), shown as a player or a Gantt, with segment actions such as editing a transcript. Recordings come from the **Audio Recorder** ([05](05-buttons-forms-and-navigation.md#media-uploader-and-audio-recorder)).
- **Image Annotation**: draws rectangles. Annotations aren't stored in the widget: a drawn box goes into a string variable (`"x1, y1, x2, y2"` in pixels), and an **action** creates the annotation object and links it to the image's object. Up to **1,000** annotations per image. A scenario isn't needed unless the boxes should be provisional.

**[Example]** Lena's team checks a disputed carrier invoice. A PDF Viewer shows `CarrierInvoice.sourceDocument` (a media reference, [AIP 06-01](../../AIP/06-document-intelligence/01-extraction-strategies.md#where-the-data-goes)), with *Customize initial search* bound to the selected line's `trackingNumber`, so the viewer jumps to the printed line. **[Explanation]** Kestrel has no annotation object type, so annotation layers stay off; adding one would mean a new type in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) first.

### Resource List

**[Docs]** Lists Foundry resources: **Files and Projects** resources (static, recent, favourites, folder contents or by tag), **object types** (static, all, prominent, favourites) or **object sets** (each backed by a variable), shown as a list or image cards. Selecting an item opens it (datasets always in Dataset Preview; others in a new tab or a Carbon tab), or runs events you configure. For Marketplace, the Resource List's Compass resources aren't detected as dependencies automatically ([04-01](../04-workshop-in-production/01-publishing-versions-and-branching.md#packaging-with-marketplace)).

## Where data came from, and what happened to it

| Widget | Shows | Needs | Watch out |
|---|---|---|---|
| **Data Freshness** | Last index time of chosen object types and datasources | — | Relative time within **24 hours** ("2 hours ago"), absolute after |
| **Edit History** | User edits to one object's properties | *Track user edit history* on the object type | Edits made before tracking was enabled, and pipeline edits, don't appear. Records can't be deleted or changed by users, even if the edit is reverted |
| **Action Log Timeline** | An object type's **action log** entries over time | An action log object type | One object type per widget |
| **Linked Compass Resources** | Compass resources linked to objects; upload and link | — | Upload and link buttons can be hidden |

**[Example]** The Delivery Desk queue's header carries a Data Freshness widget for Order and Shipment. When Ama's team asks "is this ETA current?", the answer starts on screen: the shipment data was indexed 2 hours ago. A carrier update that reached Kestrel's source data before that is in; one that arrived since isn't yet.

**[Explanation]** Edit History and the Action Log Timeline answer different questions. Edit History is "which properties changed, from what to what, by whom". The action log is "which **actions** ran", with whatever the action logged. For *Hold order*, the action log shows the hold and its reason; Edit History shows `status` going from PAID to ON_HOLD.

---
[Module index](README.md) · Previous: [02 — Charts and maps](02-charts-and-maps.md) · Next: [04 — Filtering widgets](04-filtering-widgets.md)
