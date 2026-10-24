# Sources, corrections and open questions

The register for every source used in the Apps notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about product behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's own wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated** and collected in [99 — Limits and thresholds](99-reference/README.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.

## Register

### Sidebar inventory (October 18, 2026)

The *Use case development* sidebar was read in the built-in browser on October 18, 2026 from the DOM of the overview page: **316 links**, of which 315 are documentation pages and one is the release-notes filter (out of scope). A separate fetch of the same page gave the same list, and the saved copy (`~/work/ucd/raw.tsv`) matches the live sidebar by checksum of paths and titles.

| Section | Pages |
|---|---|
| Use case development (top level) | 5 |
| Workshop | 123 |
| Slate | 46 |
| Automate | 38 |
| Carbon | 24 |
| OSDK React applications | 17 |
| Custom widgets | 16 |
| Pilot | 14 |
| Autopilot | 8 |
| Use Cases [Sunset] | 8 |
| Solution Designer | 7 |
| Workflow Lineage | 7 |
| Workflow Builder | 2 |
| **Total** | **315** |

All 315 are assigned to a note (`~/work/ucd/ucd_modules.py`). 21 of them are also cited by Ontology [10-03](../Ontology/10-applications/03-workshop-and-slate.md) and [10-06](../Ontology/10-applications/06-automate-and-ontology-events.md). Those notes are single worked examples, so the pages get full treatment here and the modules link back to them.
### Phase 3, batch 1: modules 01–02 (read in full, October 18, 2026)

Read in the built-in browser by extracting each page's article body (headings, paragraphs, lists, table rows, code). All 27 pages were read in full. 31 phrases in quote marks were matched by script against the page text: 30 as written, 1 corrected (a quote ended with a full stop where the docs' sentence continues). 25 numbers and names (padding sizes, limits, row caps) were matched the same way.

| Page | Used in |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/workshop/overview/) (Workshop) | [01-01](01-workshop-foundations/01-workshop-at-a-glance.md) |
| [Getting started](https://www.palantir.com/docs/foundry/workshop/getting-started/) (Workshop) | [01-01](01-workshop-foundations/01-workshop-at-a-glance.md) |
| [Example applications](https://www.palantir.com/docs/foundry/workshop/example-applications/) (Workshop) | [01-01](01-workshop-foundations/01-workshop-at-a-glance.md) |
| [Layouts](https://www.palantir.com/docs/foundry/workshop/concepts-layouts/) (Workshop › Core concepts) | [01-02](01-workshop-foundations/02-layouts-widgets-and-events.md) |
| [Widgets](https://www.palantir.com/docs/foundry/workshop/concepts-widgets/) (Workshop › Core concepts) | [01-02](01-workshop-foundations/02-layouts-widgets-and-events.md) |
| [Events](https://www.palantir.com/docs/foundry/workshop/concepts-events/) (Workshop › Core concepts) | [01-02](01-workshop-foundations/02-layouts-widgets-and-events.md) |
| [Variables](https://www.palantir.com/docs/foundry/workshop/concepts-variables/) (Workshop › Core concepts) | [01-03](01-workshop-foundations/03-variables-and-interfaces.md) |
| [Ontology interfaces](https://www.palantir.com/docs/foundry/workshop/ontology-interfaces/) (Workshop › Core concepts) | [01-03](01-workshop-foundations/03-variables-and-interfaces.md) |
| [Permissions](https://www.palantir.com/docs/foundry/workshop/concepts-permissions/) (Workshop › Core concepts) | [01-04](01-workshop-foundations/04-permissions.md) |
| [Application design best practices](https://www.palantir.com/docs/foundry/workshop/application-design-best-practices/) (Workshop › Application design best practices) | [01-05](01-workshop-foundations/05-design-best-practices.md) |
| [Component-specific best practices](https://www.palantir.com/docs/foundry/workshop/application-design-components/) (Workshop › Application design best practices) | [01-05](01-workshop-foundations/05-design-best-practices.md) |
| [FAQs](https://www.palantir.com/docs/foundry/workshop/application-design-faqs/) (Workshop › Application design best practices) | [01-05](01-workshop-foundations/05-design-best-practices.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/actions-overview/) (Workshop › Actions) | [02-01](02-workshop-data-and-logic/01-actions-in-workshop.md) |
| [Use Actions in Workshop](https://www.palantir.com/docs/foundry/workshop/actions-use/) (Workshop › Actions) | [02-01](02-workshop-data-and-logic/01-actions-in-workshop.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/functions-overview/) (Workshop › Functions on objects (FOO)) | [02-02](02-workshop-data-and-logic/02-functions-and-derived-properties.md) |
| [Use functions in Workshop](https://www.palantir.com/docs/foundry/workshop/functions-use/) (Workshop › Functions on objects (FOO)) | [02-02](02-workshop-data-and-logic/02-functions-and-derived-properties.md) |
| [Derived properties](https://www.palantir.com/docs/foundry/workshop/derived-properties/) (Workshop) | [02-02](02-workshop-data-and-logic/02-functions-and-derived-properties.md) |
| [Variable recompute behavior](https://www.palantir.com/docs/foundry/workshop/variable-recompute/) (Workshop › Variable types and usage) | [02-03](02-workshop-data-and-logic/03-variable-types.md) |
| [Variable transformations](https://www.palantir.com/docs/foundry/workshop/variable-transformations/) (Workshop › Variable types and usage) | [02-03](02-workshop-data-and-logic/03-variable-types.md) |
| [Object set filter variables](https://www.palantir.com/docs/foundry/workshop/object-set-filter-variables/) (Workshop › Variable types and usage) | [02-03](02-workshop-data-and-logic/03-variable-types.md) |
| [Struct variables](https://www.palantir.com/docs/foundry/workshop/struct-variables/) (Workshop › Variable types and usage) | [02-03](02-workshop-data-and-logic/03-variable-types.md) |
| [SQL query variables](https://www.palantir.com/docs/foundry/workshop/sql-query-variables/) (Workshop › Variable types and usage) | [02-03](02-workshop-data-and-logic/03-variable-types.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/embedding-workshop-modules-overview/) (Workshop › Embed Workshop modules) | [02-04](02-workshop-data-and-logic/04-embedding-modules.md) |
| [Widget: Embedded modules](https://www.palantir.com/docs/foundry/workshop/embedded-modules/) (Workshop › Embed Workshop modules) | [02-04](02-workshop-data-and-logic/04-embedding-modules.md) |
| [Loop layouts](https://www.palantir.com/docs/foundry/workshop/loop-layouts/) (Workshop › Embed Workshop modules) | [02-04](02-workshop-data-and-logic/04-embedding-modules.md) |
| [Variable-backed layouts](https://www.palantir.com/docs/foundry/workshop/variable-backed-layouts/) (Workshop › Variable types and usage) | [02-04](02-workshop-data-and-logic/04-embedding-modules.md) |
| [Module interface](https://www.palantir.com/docs/foundry/workshop/module-interface/) (Workshop › Variable types and usage) | [02-04](02-workshop-data-and-logic/04-embedding-modules.md) |
### Phase 3, batch 2: modules 03–04 (read in full, October 18, 2026)

All 96 pages read in full in the built-in browser (same extraction; loaded in parallel batches of 12). Quote check: every doc phrase in quote marks in the 12 notes matched the page text, and 36 numbers and names (row caps, limits, sizes, versions, file formats) were matched the same way. The rest of the quoted strings are Kestrel examples.

| Page | Used in |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/workshop/widgets-core-display/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Object Table](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Object List](https://www.palantir.com/docs/foundry/workshop/widgets-object-list/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Object View](https://www.palantir.com/docs/foundry/workshop/widgets-object-view/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Property List](https://www.palantir.com/docs/foundry/workshop/widgets-property-list/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Links](https://www.palantir.com/docs/foundry/workshop/widgets-links/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Object Set Title](https://www.palantir.com/docs/foundry/workshop/widgets-object-set-title/) (Workshop › Core display widgets) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Formatting](https://www.palantir.com/docs/foundry/workshop/formatting/) (Workshop) | [03-01](03-workshop-widgets/01-core-display-widgets.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/widgets-visualization/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Chart XY](https://www.palantir.com/docs/foundry/workshop/widgets-chart/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Vega Chart](https://www.palantir.com/docs/foundry/workshop/widgets-vega-chart/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Pie Chart](https://www.palantir.com/docs/foundry/workshop/widgets-pie-chart/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Pivot Table](https://www.palantir.com/docs/foundry/workshop/widgets-pivot-table/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Metric Card](https://www.palantir.com/docs/foundry/workshop/widgets-metric-card/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Gantt Chart](https://www.palantir.com/docs/foundry/workshop/widgets-gantt-chart/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Timeline](https://www.palantir.com/docs/foundry/workshop/widgets-timeline/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Map](https://www.palantir.com/docs/foundry/workshop/widgets-map/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Map [Legacy]](https://www.palantir.com/docs/foundry/workshop/widgets-map-legacy/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Time Series Analysis](https://www.palantir.com/docs/foundry/workshop/widget-time-series-analysis/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Free-form Analysis](https://www.palantir.com/docs/foundry/workshop/widget-free-form-analysis/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Stepper](https://www.palantir.com/docs/foundry/workshop/widgets-stepper/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Markdown](https://www.palantir.com/docs/foundry/workshop/widgets-markdown/) (Workshop › Visualization widgets) | [03-02](03-workshop-widgets/02-charts-and-maps.md) |
| [Resource List](https://www.palantir.com/docs/foundry/workshop/widgets-resource-list/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Media Preview](https://www.palantir.com/docs/foundry/workshop/widgets-media-preview/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Spreadsheet Display](https://www.palantir.com/docs/foundry/workshop/widgets-spreadsheet-display/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Video Display](https://www.palantir.com/docs/foundry/workshop/widgets-video-preview/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Audio and Transcription Display](https://www.palantir.com/docs/foundry/workshop/widgets-audio-preview/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [PDF Viewer](https://www.palantir.com/docs/foundry/workshop/widgets-pdf-viewer/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Image Annotation](https://www.palantir.com/docs/foundry/workshop/widgets-image-annotation/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Data Freshness](https://www.palantir.com/docs/foundry/workshop/widgets-data-freshness/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Edit History](https://www.palantir.com/docs/foundry/workshop/widgets-edits-history/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Linked Compass Resources](https://www.palantir.com/docs/foundry/workshop/widgets-linked-compass-resources/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Action Log Timeline](https://www.palantir.com/docs/foundry/workshop/widgets-action-log-timeline/) (Workshop › Visualization widgets) | [03-03](03-workshop-widgets/03-media-documents-and-history.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/widgets-filtering/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Filter List](https://www.palantir.com/docs/foundry/workshop/widgets-filter-list/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Object Dropdown](https://www.palantir.com/docs/foundry/workshop/widgets-object-dropdown/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [String Selector](https://www.palantir.com/docs/foundry/workshop/widgets-string-selector/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Date and Time Picker](https://www.palantir.com/docs/foundry/workshop/widgets-date-time-picker/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Text Input](https://www.palantir.com/docs/foundry/workshop/widgets-text-input/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Numeric Input](https://www.palantir.com/docs/foundry/workshop/widgets-numeric-input/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Exploration Filter Pills](https://www.palantir.com/docs/foundry/workshop/widgets-exploration-filter-pills/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Exploration Search Bar](https://www.palantir.com/docs/foundry/workshop/widgets-exploration-search-bar/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Prominent Term](https://www.palantir.com/docs/foundry/workshop/widgets-prominent-terms/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [User Select](https://www.palantir.com/docs/foundry/workshop/widgets-user-select/) (Workshop › Filtering widgets) | [03-04](03-workshop-widgets/04-filtering-widgets.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/widgets-event-navigational/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Button Group](https://www.palantir.com/docs/foundry/workshop/widgets-button-group/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Inline Action](https://www.palantir.com/docs/foundry/workshop/widgets-inline-action-form/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Tabs](https://www.palantir.com/docs/foundry/workshop/widgets-tabs/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Comments](https://www.palantir.com/docs/foundry/workshop/widgets-comments/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Media Uploader](https://www.palantir.com/docs/foundry/workshop/widgets-media-uploader/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [Audio Recorder](https://www.palantir.com/docs/foundry/workshop/widgets-audio-recorder/) (Workshop › Event-trigger & navigational widgets) | [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| [AIP Analyst](https://www.palantir.com/docs/foundry/workshop/widgets-aip-analyst/) (Workshop › AIP widgets) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [AIP Chatbot](https://www.palantir.com/docs/foundry/workshop/widgets-aip-chatbot/) (Workshop › AIP widgets) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [AIP Generated Content](https://www.palantir.com/docs/foundry/workshop/widgets-aip-generated-content/) (Workshop › AIP widgets) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [Observability Chart](https://www.palantir.com/docs/foundry/workshop/widgets-observability-chart/) (Workshop › Observability widgets) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/widgets-embed-foundry-apps/) (Workshop › Embed Foundry applications) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [Iframe](https://www.palantir.com/docs/foundry/workshop/widgets-iframe/) (Workshop › Embed Foundry applications) | [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md) |
| [Publishing and versioning](https://www.palantir.com/docs/foundry/workshop/versions/) (Workshop) | [04-01](04-workshop-in-production/01-publishing-versions-and-branching.md) |
| [Branching Workshop modules](https://www.palantir.com/docs/foundry/workshop/branching-integration/) (Workshop) | [04-01](04-workshop-in-production/01-publishing-versions-and-branching.md) |
| [Changelog panel](https://www.palantir.com/docs/foundry/workshop/changelog/) (Workshop) | [04-01](04-workshop-in-production/01-publishing-versions-and-branching.md) |
| [Add Workshop application to a Marketplace product](https://www.palantir.com/docs/foundry/workshop/marketplace-workshop/) (Workshop) | [04-01](04-workshop-in-production/01-publishing-versions-and-branching.md) |
| [Performance Profiler](https://www.palantir.com/docs/foundry/workshop/performance-profiler/) (Workshop) | [04-02](04-workshop-in-production/02-performance.md) |
| [Widget display optimization](https://www.palantir.com/docs/foundry/workshop/widget-display-optimization/) (Workshop) | [04-02](04-workshop-in-production/02-performance.md) |
| [Usage metrics](https://www.palantir.com/docs/foundry/workshop/usage-metrics/) (Workshop) | [04-02](04-workshop-in-production/02-performance.md) |
| [Auto-refresh](https://www.palantir.com/docs/foundry/workshop/auto-refresh/) (Workshop) | [04-02](04-workshop-in-production/02-performance.md) |
| [Routing](https://www.palantir.com/docs/foundry/workshop/routing/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [State saving](https://www.palantir.com/docs/foundry/workshop/state-saving/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Translations](https://www.palantir.com/docs/foundry/workshop/translations/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Used colors](https://www.palantir.com/docs/foundry/workshop/used-colors/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Set up a read-only dashboard](https://www.palantir.com/docs/foundry/workshop/read-only-dashboard/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Kiosk mode](https://www.palantir.com/docs/foundry/workshop/kiosk-mode/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Redact mode](https://www.palantir.com/docs/foundry/workshop/redact-mode/) (Workshop) | [04-03](04-workshop-in-production/03-routing-state-and-presentation.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/workshop-cross-app-interactivity/) (Workshop › Cross-application interactivity) | [04-04](04-workshop-in-production/04-cross-application-interactivity.md) |
| [Drag and drop](https://www.palantir.com/docs/foundry/workshop/drag-and-drop/) (Workshop › Cross-application interactivity) | [04-04](04-workshop-in-production/04-cross-application-interactivity.md) |
| [App Pairing](https://www.palantir.com/docs/foundry/workshop/widgets-app-pairing/) (Workshop › Cross-application interactivity) | [04-04](04-workshop-in-production/04-cross-application-interactivity.md) |
| [Commands](https://www.palantir.com/docs/foundry/workshop/commands/) (Workshop › Cross-application interactivity) | [04-04](04-workshop-in-production/04-cross-application-interactivity.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/mobile-overview/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Getting started](https://www.palantir.com/docs/foundry/workshop/mobile-getting-started/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Application launcher](https://www.palantir.com/docs/foundry/workshop/mobile-app-launcher/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Design best practices](https://www.palantir.com/docs/foundry/workshop/mobile-design/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Network access and auth](https://www.palantir.com/docs/foundry/workshop/mobile-access/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Widget: Mobile Navigation Bar](https://www.palantir.com/docs/foundry/workshop/widgets-mobile-navbar/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Widget: QR Code Reader](https://www.palantir.com/docs/foundry/workshop/widgets-qr-reader/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Widget: Current Location Manager](https://www.palantir.com/docs/foundry/workshop/widgets-current-location/) (Workshop › Mobile) | [04-05](04-workshop-in-production/05-mobile.md) |
| [Time series properties](https://www.palantir.com/docs/foundry/workshop/time-series-properties/) (Workshop) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Unsupported object properties](https://www.palantir.com/docs/foundry/workshop/unsupported-object-properties/) (Workshop) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Overview](https://www.palantir.com/docs/foundry/workshop/scenarios-overview/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Getting started](https://www.palantir.com/docs/foundry/workshop/scenarios-getting-started/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/workshop/scenarios-concepts/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Configure a domain](https://www.palantir.com/docs/foundry/workshop/scenarios-configure-domain/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Save scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-save/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Load scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-load/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Apply scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-apply/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Widget: Scenario Manager](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-manager/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Widget: Scenario Selector](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-selector/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| [Widget: Scenario Summary](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-summary/) (Workshop › Scenarios [Legacy]) | [04-06](04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |

### Phase 4: modules 05–07 (read October 18, 2026)

93 pages, read in the built-in browser. Prose pages were read in full. On the eight Slate widget pages, every paragraph was read but the property tables were *read in part*: only properties a note names were checked. The five source-listing pages (`*-tsx`) were *surveyed*, not read line by line; their hook pages were read in full.

| Page | Note |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/slate/overview/) (Slate) | [05-01](05-slate/01-slate-apps.md) |
| [Navigation](https://www.palantir.com/docs/foundry/slate/navigation/) (Slate) | [05-01](05-slate/01-slate-apps.md) |
| [FAQ](https://www.palantir.com/docs/foundry/slate/faq/) (Slate) | [05-01](05-slate/01-slate-apps.md) |
| [Application types](https://www.palantir.com/docs/foundry/slate/applications-types/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Create applications](https://www.palantir.com/docs/foundry/slate/applications-create/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Pages](https://www.palantir.com/docs/foundry/slate/applications-pages/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Manage application versions](https://www.palantir.com/docs/foundry/slate/applications-versioning/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Merge application changes](https://www.palantir.com/docs/foundry/slate/applications-merging/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Import, export, and duplicate applications](https://www.palantir.com/docs/foundry/slate/applications-import-export/) (Slate › Manage Slate applications) | [05-01](05-slate/01-slate-apps.md) |
| [Add Slate application to a Marketplace product](https://www.palantir.com/docs/foundry/slate/marketplace-slate/) (Slate) | [05-01](05-slate/01-slate-apps.md) |
| [Overview](https://www.palantir.com/docs/foundry/slate/read-write-overview/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Write back data with Actions](https://www.palantir.com/docs/foundry/slate/applications-writeback/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Read and write to data systems](https://www.palantir.com/docs/foundry/slate/concepts-queries/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Create or retrieve object sets](https://www.palantir.com/docs/foundry/slate/concepts-object-sets/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Retrieve individual objects](https://www.palantir.com/docs/foundry/slate/concepts-object-context/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Use the Ontology SDK (OSDK) in Slate](https://www.palantir.com/docs/foundry/slate/concepts-osdk/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Use Foundry Functions in Slate](https://www.palantir.com/docs/foundry/slate/concepts-foundry-functions/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Upload data for public applications](https://www.palantir.com/docs/foundry/slate/public-applications-data-upload/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Write back data to Phonograph](https://www.palantir.com/docs/foundry/slate/references-writeback/) (Slate › Read and write data) | [05-02](05-slate/02-reading-and-writing-data.md) |
| [Overview](https://www.palantir.com/docs/foundry/slate/logic-overview/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [View application dependencies](https://www.palantir.com/docs/foundry/slate/applications-dependencies/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Understand dependencies](https://www.palantir.com/docs/foundry/slate/best-practices-app-functionality/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Define and run Slate functions](https://www.palantir.com/docs/foundry/slate/concepts-functions/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Convert between row and column schemas](https://www.palantir.com/docs/foundry/slate/references-convert-rows-columns/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Store values in variables](https://www.palantir.com/docs/foundry/slate/concepts-variables/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Access values with Handlebars](https://www.palantir.com/docs/foundry/slate/concepts-handlebars/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Handlebar helpers](https://www.palantir.com/docs/foundry/slate/references-helpers/) (Slate › Logic) | [05-03](05-slate/03-functions-variables-and-handlebars.md) |
| [Configure Events and Actions](https://www.palantir.com/docs/foundry/slate/concepts-events/) (Slate › Logic) | [05-04](05-slate/04-events-and-interaction.md) |
| [Events and actions index](https://www.palantir.com/docs/foundry/slate/concepts-events-and-actions-index/) (Slate › Logic) | [05-04](05-slate/04-events-and-interaction.md) |
| [Enable user interaction](https://www.palantir.com/docs/foundry/slate/best-practices-user-interaction/) (Slate › Manage Slate applications) | [05-04](05-slate/04-events-and-interaction.md) |
| [Overview](https://www.palantir.com/docs/foundry/slate/style-overview/) (Slate › Styles) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Custom styles on widgets](https://www.palantir.com/docs/foundry/slate/applications-style-text/) (Slate › Styles) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Configure and apply styles](https://www.palantir.com/docs/foundry/slate/concepts-styles/) (Slate › Styles) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Global stylesheets](https://www.palantir.com/docs/foundry/slate/styles-global-stylesheet/) (Slate › Styles) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Build complex layouts](https://www.palantir.com/docs/foundry/slate/best-practices-complex-layouts/) (Slate › Styles) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Chart](https://www.palantir.com/docs/foundry/slate/widgets-chart/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Container](https://www.palantir.com/docs/foundry/slate/widgets-container/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Control](https://www.palantir.com/docs/foundry/slate/widgets-control/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Platform](https://www.palantir.com/docs/foundry/slate/widgets-platform/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Text](https://www.palantir.com/docs/foundry/slate/widgets-text/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Time](https://www.palantir.com/docs/foundry/slate/widgets-time/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Visualization](https://www.palantir.com/docs/foundry/slate/widgets-visualization/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Advanced](https://www.palantir.com/docs/foundry/slate/widgets-advanced/) (Slate › Widgets) | [05-05](05-slate/05-styles-and-widgets.md) |
| [Debug applications](https://www.palantir.com/docs/foundry/slate/applications-debug-problems/) (Slate › Troubleshooting) | [05-06](05-slate/06-troubleshooting-and-query-performance.md) |
| [Optimize indexes and schema design](https://www.palantir.com/docs/foundry/slate/references-indexes/) (Slate › Troubleshooting) | [05-06](05-slate/06-troubleshooting-and-query-performance.md) |
| [Optimize queries in Postgres](https://www.palantir.com/docs/foundry/slate/references-query-perf/) (Slate › Troubleshooting) | [05-06](05-slate/06-troubleshooting-and-query-performance.md) |
| [Overview](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/overview/) (OSDK React applications) | [06-01](06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| [OSDK React](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/osdk-react/) (OSDK React applications › OSDK React libraries) | [06-01](06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| [OSDK React components](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/osdk-react-components/) (OSDK React applications › OSDK React libraries) | [06-01](06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| [Development environment](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/development/) (OSDK React applications) | [06-01](06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| [Troubleshooting](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/troubleshooting/) (OSDK React applications) | [06-01](06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| [Build an advanced to-do application with OSDK](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/advanced-todo-application-overview/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [Architecture and configuration](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/advanced-todo-application-architecture/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseProjects hook](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useprojects-hook/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseProjects reference](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useprojects-tsx/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseTasks hook](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usetasks-hook/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseTasks reference](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usetasks-tsx/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseCodingTask hook](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usecodingtask-hook/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseCodingTask reference](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/usecodingtask-tsx/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseLearningTask hook](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/uselearningtask-hook/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseLearningTask reference](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/uselearningtask-tsx/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseAdmin hook](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useadmin-hook/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [UseAdmin reference](https://www.palantir.com/docs/foundry/ontology-sdk-react-applications/useadmin-tsx/) (OSDK React applications › Tutorial: Advanced to-do application) | [06-02](06-osdk-react-and-custom-widgets/02-advanced-to-do-tutorial.md) |
| [Overview](https://www.palantir.com/docs/foundry/custom-widgets/overview/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/custom-widgets/core-concepts/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Create a widget set](https://www.palantir.com/docs/foundry/custom-widgets/create/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Develop a widget set](https://www.palantir.com/docs/foundry/custom-widgets/development/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Publish a widget set](https://www.palantir.com/docs/foundry/custom-widgets/publish/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Add an additional widget to a widget set](https://www.palantir.com/docs/foundry/custom-widgets/additional-widget/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Manage Node.js version in a Foundry code repository](https://www.palantir.com/docs/foundry/custom-widgets/manage-node-version-in-foundry-code-repository/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Add widget set to a Marketplace product](https://www.palantir.com/docs/foundry/custom-widgets/marketplace/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Troubleshooting](https://www.palantir.com/docs/foundry/custom-widgets/troubleshooting/) (Custom widgets) | [06-03](06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| [Embedding a widget in Workshop](https://www.palantir.com/docs/foundry/custom-widgets/embedding-in-workshop/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Parameters and events](https://www.palantir.com/docs/foundry/custom-widgets/parameters-and-events/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Use Ontology SDK (OSDK) in a widget set](https://www.palantir.com/docs/foundry/custom-widgets/use-osdk/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Dark theme support](https://www.palantir.com/docs/foundry/custom-widgets/dark-theme/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Auto sizing](https://www.palantir.com/docs/foundry/custom-widgets/auto-sizing/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Open a URL in Workshop](https://www.palantir.com/docs/foundry/custom-widgets/open-url-in-workshop/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Enable additional iframe attributes](https://www.palantir.com/docs/foundry/custom-widgets/iframe-attributes/) (Custom widgets) | [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| [Overview](https://www.palantir.com/docs/foundry/pilot/overview/) (Pilot) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Getting started](https://www.palantir.com/docs/foundry/pilot/getting-started/) (Pilot) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Build a to-do application](https://www.palantir.com/docs/foundry/pilot/tutorial-todo-application/) (Pilot) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Overview](https://www.palantir.com/docs/foundry/pilot/workspace-overview/) (Pilot › The Pilot workspace) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Ontology tab](https://www.palantir.com/docs/foundry/pilot/ontology-tab/) (Pilot › The Pilot workspace) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Models and agent modes](https://www.palantir.com/docs/foundry/pilot/models-and-modes/) (Pilot › The Pilot workspace) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Work with data](https://www.palantir.com/docs/foundry/pilot/work-with-data/) (Pilot › The Pilot workspace) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Provide context and attachments](https://www.palantir.com/docs/foundry/pilot/provide-context/) (Pilot › How-to guides) | [07-01](07-pilot/01-what-pilot-is.md) |
| [Branches, changes, and proposals](https://www.palantir.com/docs/foundry/pilot/branches-and-proposals/) (Pilot › The Pilot workspace) | [07-02](07-pilot/02-building-and-shipping.md) |
| [Build an application](https://www.palantir.com/docs/foundry/pilot/build-an-application/) (Pilot › How-to guides) | [07-02](07-pilot/02-building-and-shipping.md) |
| [Build a custom widget](https://www.palantir.com/docs/foundry/pilot/build-a-widget/) (Pilot › How-to guides) | [07-02](07-pilot/02-building-and-shipping.md) |
| [Deploy an application](https://www.palantir.com/docs/foundry/pilot/deploy-an-application/) (Pilot › How-to guides) | [07-02](07-pilot/02-building-and-shipping.md) |
| [Deploy a custom widget](https://www.palantir.com/docs/foundry/pilot/deploy-a-widget/) (Pilot › How-to guides) | [07-02](07-pilot/02-building-and-shipping.md) |
| [Troubleshooting](https://www.palantir.com/docs/foundry/pilot/troubleshooting/) (Pilot) | [07-02](07-pilot/02-building-and-shipping.md) |

### Phase 5: modules 08–10 (read in full, October 21, 2026)

95 pages, read in full in the built-in browser. The two Carbon YAML pages were read for structure and their prose; the YAML listings themselves were *surveyed*.

| Page | Note |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/automate/overview/) (Automate) | [08-01](08-automate/01-automate-concepts.md) |
| [Getting started](https://www.palantir.com/docs/foundry/automate/getting-started/) (Automate) | [08-01](08-automate/01-automate-concepts.md) |
| [Manual executions](https://www.palantir.com/docs/foundry/automate/manual-execution/) (Automate) | [08-01](08-automate/01-automate-concepts.md) |
| [Integrations](https://www.palantir.com/docs/foundry/automate/integrations/) (Automate) | [08-01](08-automate/01-automate-concepts.md) |
| [Time condition](https://www.palantir.com/docs/foundry/automate/condition-time/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Object set conditions](https://www.palantir.com/docs/foundry/automate/condition-objects/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Dataset condition](https://www.palantir.com/docs/foundry/automate/condition-dataset/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Condition settings](https://www.palantir.com/docs/foundry/automate/condition-settings/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Automation dependencies](https://www.palantir.com/docs/foundry/automate/automation-dependencies/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Streaming](https://www.palantir.com/docs/foundry/automate/streaming/) (Automate › Condition) | [08-02](08-automate/02-conditions.md) |
| [Overview](https://www.palantir.com/docs/foundry/automate/effects/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Action effects](https://www.palantir.com/docs/foundry/automate/effect-actions/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Logic effects](https://www.palantir.com/docs/foundry/automate/effect-logic/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Function effects](https://www.palantir.com/docs/foundry/automate/effect-function/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Notification effects](https://www.palantir.com/docs/foundry/automate/effect-notification/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Fallback effects](https://www.palantir.com/docs/foundry/automate/effect-fallback/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Effect settings](https://www.palantir.com/docs/foundry/automate/effect-settings/) (Automate › Effects) | [08-03](08-automate/03-effects.md) |
| [Automation administrators](https://www.palantir.com/docs/foundry/automate/automation-administrators/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Execution settings](https://www.palantir.com/docs/foundry/automate/execution-settings/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Evaluation frequency](https://www.palantir.com/docs/foundry/automate/evaluation-frequency/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Manual and automatic retries](https://www.palantir.com/docs/foundry/automate/retries/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Muting, pausing, and expiration](https://www.palantir.com/docs/foundry/automate/muting-pausing-expiration/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Notification settings](https://www.palantir.com/docs/foundry/automate/notification-settings/) (Automate › Settings) | [08-04](08-automate/04-execution-settings.md) |
| [Security](https://www.palantir.com/docs/foundry/automate/security/) (Automate › Security and permissions) | [08-05](08-automate/05-security-ownership-and-history.md) |
| [Permissions](https://www.palantir.com/docs/foundry/automate/permissions/) (Automate › Security and permissions) | [08-05](08-automate/05-security-ownership-and-history.md) |
| [Third-party application ownership](https://www.palantir.com/docs/foundry/automate/third-party-app-ownership/) (Automate › Security and permissions) | [08-05](08-automate/05-security-ownership-and-history.md) |
| [Automation history](https://www.palantir.com/docs/foundry/automate/history/) (Automate › Security and permissions) | [08-05](08-automate/05-security-ownership-and-history.md) |
| [History visibility and scope](https://www.palantir.com/docs/foundry/automate/history-visibility-and-scope/) (Automate › Security and permissions) | [08-05](08-automate/05-security-ownership-and-history.md) |
| [Performance best practices](https://www.palantir.com/docs/foundry/automate/performance-best-practices/) (Automate › Performance and troubleshooting) | [08-06](08-automate/06-operating-automations.md) |
| [Troubleshooting performance](https://www.palantir.com/docs/foundry/automate/troubleshooting-performance/) (Automate › Performance and troubleshooting) | [08-06](08-automate/06-operating-automations.md) |
| [Limits](https://www.palantir.com/docs/foundry/automate/limits/) (Automate) | [08-06](08-automate/06-operating-automations.md) |
| [Error reference](https://www.palantir.com/docs/foundry/automate/errors/) (Automate) | [08-06](08-automate/06-operating-automations.md) |
| [Branching automations](https://www.palantir.com/docs/foundry/automate/branching-automations/) (Automate) | [08-06](08-automate/06-operating-automations.md) |
| [Automations on Ontology scenarios](https://www.palantir.com/docs/foundry/automate/automations-on-ontology-scenarios/) (Automate) | [08-06](08-automate/06-operating-automations.md) |
| [Add an automation to a Marketplace product](https://www.palantir.com/docs/foundry/automate/marketplace-automate/) (Automate) | [08-06](08-automate/06-operating-automations.md) |
| [Send a weekly report](https://www.palantir.com/docs/foundry/automate/example-weekly-report/) (Automate › Examples) | [08-06](08-automate/06-operating-automations.md) |
| [Close tickets after a specified time](https://www.palantir.com/docs/foundry/automate/example-relative-time-condition/) (Automate › Examples) | [08-06](08-automate/06-operating-automations.md) |
| [Notify contract owner when status changes](https://www.palantir.com/docs/foundry/automate/example-dynamic-contract-owner/) (Automate › Examples) | [08-06](08-automate/06-operating-automations.md) |
| [Overview](https://www.palantir.com/docs/foundry/carbon/overview/) (Carbon) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Getting started](https://www.palantir.com/docs/foundry/carbon/getting-started/) (Carbon) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Example workspaces](https://www.palantir.com/docs/foundry/carbon/example-workspaces/) (Carbon) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Overview](https://www.palantir.com/docs/foundry/carbon/workspaces-overview/) (Carbon › Workspaces) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Create a workspace](https://www.palantir.com/docs/foundry/carbon/workspaces-create/) (Carbon › Workspaces) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Edit a workspace](https://www.palantir.com/docs/foundry/carbon/workspaces-edit/) (Carbon › Workspaces) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Configure workspace updates](https://www.palantir.com/docs/foundry/carbon/workspaces-updates/) (Carbon › Workspaces) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [View version history](https://www.palantir.com/docs/foundry/carbon/workspaces-history/) (Carbon › Workspaces) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Add Carbon workspace to a Marketplace product](https://www.palantir.com/docs/foundry/carbon/marketplace-carbon-workspace/) (Carbon) | [09-01](09-carbon-workspaces/01-carbon-workspaces.md) |
| [Overview](https://www.palantir.com/docs/foundry/carbon/modules-overview/) (Carbon › Modules) | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Configure module discovery](https://www.palantir.com/docs/foundry/carbon/modules-discovery/) (Carbon › Modules) | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Configure navigation between modules](https://www.palantir.com/docs/foundry/carbon/modules-navigation/) (Carbon › Modules) | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Configure navigation between workspaces](https://www.palantir.com/docs/foundry/carbon/workspaces-navigation/) (Carbon › Workspaces) | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Restrict navigation out of a workspace](https://www.palantir.com/docs/foundry/carbon/restrict-workspace-nav/) (Carbon › Workspaces) | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Curating apps in Applications Portal](https://www.palantir.com/docs/foundry/app-building/curating-apps/) () | [09-02](09-carbon-workspaces/02-modules-and-navigation.md) |
| [Configure permissions](https://www.palantir.com/docs/foundry/carbon/permissions-configure/) (Carbon › Permissions and access) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Set a default workspace](https://www.palantir.com/docs/foundry/carbon/permissions-default-workspace/) (Carbon › Permissions and access) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Set Carbon as the Foundry landing page](https://www.palantir.com/docs/foundry/carbon/permissions-landing-page/) (Carbon › Permissions and access) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [General configuration](https://www.palantir.com/docs/foundry/carbon/configuration-general/) (Carbon › Configuration reference) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Home configuration](https://www.palantir.com/docs/foundry/carbon/configuration-home/) (Carbon › Configuration reference) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Menu bar configuration](https://www.palantir.com/docs/foundry/carbon/configuration-menu-bar/) (Carbon › Configuration reference) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Access configuration](https://www.palantir.com/docs/foundry/carbon/configuration-access/) (Carbon › Configuration reference) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [YAML configuration example](https://www.palantir.com/docs/foundry/carbon/code-example/) (Carbon › Editing with code) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [YAML configuration reference](https://www.palantir.com/docs/foundry/carbon/code-reference/) (Carbon › Editing with code) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Enable dark mode for an organization](https://www.palantir.com/docs/foundry/carbon/dark-mode/) (Carbon) | [09-03](09-carbon-workspaces/03-configuration-and-permissions.md) |
| [Overview](https://www.palantir.com/docs/foundry/workflow-lineage/overview/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Getting started](https://www.palantir.com/docs/foundry/workflow-lineage/getting-started/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Perform refactors and understand your workflows](https://www.palantir.com/docs/foundry/workflow-lineage/refactor-and-understand-workflows/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [AIP usage metrics and observability](https://www.palantir.com/docs/foundry/workflow-lineage/aip-usage-observability/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Manage security](https://www.palantir.com/docs/foundry/workflow-lineage/manage-security/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Branching support](https://www.palantir.com/docs/foundry/workflow-lineage/branching-workflow-lineage/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Keyboard shortcuts](https://www.palantir.com/docs/foundry/workflow-lineage/keyboard-shortcuts/) (Workflow Lineage) | [10-01](10-workflow-tools/01-workflow-lineage.md) |
| [Overview](https://www.palantir.com/docs/foundry/autopilot/overview/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Getting started](https://www.palantir.com/docs/foundry/autopilot/getting-started/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Workbench](https://www.palantir.com/docs/foundry/autopilot/workbench/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Kanban board view](https://www.palantir.com/docs/foundry/autopilot/workbench-kanban/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Dependency graph view](https://www.palantir.com/docs/foundry/autopilot/workbench-graph/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Object timeline](https://www.palantir.com/docs/foundry/autopilot/object-timeline/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Automation events](https://www.palantir.com/docs/foundry/autopilot/automation-events/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Integrations](https://www.palantir.com/docs/foundry/autopilot/integrations/) (Autopilot) | [10-02](10-workflow-tools/02-autopilot.md) |
| [Overview](https://www.palantir.com/docs/foundry/solution-designer/overview/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Navigation](https://www.palantir.com/docs/foundry/solution-designer/navigation/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Diagrams](https://www.palantir.com/docs/foundry/solution-designer/diagrams/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [AIP Architect](https://www.palantir.com/docs/foundry/solution-designer/aip-architect/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [AIP Critic](https://www.palantir.com/docs/foundry/solution-designer/aip-critic/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Tutorial: Create your first diagram](https://www.palantir.com/docs/foundry/solution-designer/tutorial-create-your-first-diagram/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Troubleshooting](https://www.palantir.com/docs/foundry/solution-designer/troubleshooting/) (Solution Designer) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Overview](https://www.palantir.com/docs/foundry/workflow-builder/overview/) (Workflow Builder) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/workflow-builder/core-concepts/) (Workflow Builder) | [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md) |
| [Overview](https://www.palantir.com/docs/foundry/use-cases/use-case-overview/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Navigation](https://www.palantir.com/docs/foundry/use-cases/navigation/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Getting started](https://www.palantir.com/docs/foundry/use-cases/getting-started/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Migrate an existing Project](https://www.palantir.com/docs/foundry/use-cases/migrate-existing-project/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [View resources](https://www.palantir.com/docs/foundry/use-cases/view-resources/) (Use Cases [Sunset] › Resources) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Add application resources](https://www.palantir.com/docs/foundry/use-cases/add-application-resources/) (Use Cases [Sunset] › Resources) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Edit metadata](https://www.palantir.com/docs/foundry/use-cases/edit-metadata/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |
| [Permission a use case](https://www.palantir.com/docs/foundry/use-cases/permission-use-case/) (Use Cases [Sunset]) | [10-04](10-workflow-tools/04-use-cases-sunset.md) |

### Phase 6: module 00 (read in full, October 21, 2026)

The four top-level pages, read in full in the built-in browser. Modules 11, 12 and 99 cite no new pages: they assemble the earlier notes.

| Page | Note |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/app-building/overview/) (Use case development) | [00-01](00-orientation/01-operational-applications.md) |
| [What is an operational application?](https://www.palantir.com/docs/foundry/app-building/operational-apps/) (Use case development) | [00-01](00-orientation/01-operational-applications.md) |
| [Connecting analytics to operations](https://www.palantir.com/docs/foundry/app-building/analytics-operations/) (Use case development) | [00-01](00-orientation/01-operational-applications.md) |
| [Conduct sentiment analysis with AIP](https://www.palantir.com/docs/foundry/app-building/sentiment-analysis/) (Use case development) | [00-01](00-orientation/01-operational-applications.md) |

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 18, 2026 | Plan | Applications Portal moved from module 00 to 09 (it is about finding apps, like Carbon); note count 48 → 56 once every page was assigned |
| Oct 18, 2026 | Structure review | Related-note labels now read from each note's title (3 were wrong: Ontology 12-04, 14-04, AIP 09-02); home-page status counts the docs index (1 of 56); scope sentence says "assigned", not "covered"; Kestrel case notes 02–03 marked candidates; `raw.tsv` given a header row (checksums unchanged); Ontology 10 README Apps link moved out of "Seen in our courses" |
| Oct 18, 2026 | Batch 1 self-review | 02-01 *Hold order* parameters aligned with Ontology 08-01 (`order`, `reason`; criteria shown); 02-02 metric renamed `openOrdersForCustomer`; 02-03 visibility example inverted correctly; 01-03 queue variables use 10-03's names; 02-01 no longer assumes the action form is a modal; 02-04 re-route page maps the proposal's order |
| Oct 18, 2026 | Batch 2 self-review | 04-03 shared-link example: auto-selection caveat added (untested); 03-05 action table: per-row failure no longer asserted (RQ-05); 03-01 column layout kept only when a state is saved; 03-03 Data Freshness example no longer overclaims; 01-03 link retargeted to 04-03. Pending: 03-06 "06-03" link goes to module 06 README until that note exists |
| Oct 18, 2026 | Phase 4 writing | 03-06 iframe link now points to 06-04 (was the module 06 README). Two phrases in 05-04 and 07-02 were in quote marks without being doc wording; quotes removed |
| Oct 18, 2026 | Phase 4 self-review | 07-01/07-02 Lena example aligned with AIP 10-02 (*Match line to shipment* for unmatched lines, not *Mark line disputed*); RQ-08 opened (markings and Pilot). 05-04 Hold click opens the dialog directly (a `.changed` chain fails on a repeat click). 05-02 object-set refresh after the action marked untested; `ff_atRiskOrders` marked sketch-only. 06-02 user-lookup parallel uses action logs (`Agent` is an object type). 06-04 refresh example uses *Re-route shipment*; auto-refresh claim marked untested. 06-01 PR-preview permissions reworded. 05-04 notes both `slate.`/`Slate.getMessage` spellings |
| Oct 21, 2026 | Phase 5 writing | Phrases in quote marks that weren't doc wording (15 in modules 08–10) changed to italics before review |
| Oct 21, 2026 | Phase 5 self-review | 10-02 Autopilot example now the fraud on-call team's (Payment is marked `Kestrel Pay – Financial`), with an Order-only board for operations leads; 10-01 bulk-change advice says which changes offer a branch; 08-03 auto-mute risk toned down; 09-02 notification-link caveat added; 10-04 names Portfolios and the Phase 6 check |
| Oct 21, 2026 | Phase 6 | Adopted into Ontology 17-02 §8 (new Applications section; Known gaps renumbered §9): Delivery Desk workspace, `delivery-widgets`, Warehouse floor module, invoice review module, and *High-risk payment hold* split into hold + *High-risk payment alert* (Ontology 10-06 notes the revision). Notes 04-05, 05-01, 06-03/04, 07-01, 08-02, 08-05, 09-01–03, 10-02/03/04 relabelled *adopted* or *considered, not adopted*. Module 11 note 03 retitled *The Delivery Desk workspace* (was a candidate operations-leads workspace) |
| Oct 21, 2026 | Phase 6 self-review | 00-03 Tomás row matches the split automations; 17-02 and 08-05 note the cross-project imports project scope needs, and RQ-12 opened; three practice questions added (Q30–Q32); limits row on function-backed column sorting split out; decision guide adds a Pilot branch |
| Oct 21, 2026 | Phase 7 quality review | All doc quotes in 56 notes rechecked against the 315 pages; non-doc phrases in 01–04 moved from quotes to italics ("Delivery Desk queue (TEST)" to code); 05-04 "Comments follow the parent object" corrected to the doc wording "Comments follow the permissions of the parent object"; a code span in 03-02 restored after the bulk edit. Bold and unit numbers checked against each note's cited pages: 05-03 now cites the Slate FAQ for 2,000,000 bytes; 02-04's 10,000 is "ten thousand" on Loop layouts; 05-02's 50 rows is a Kestrel choice. 01-03 and 02-02 now say *Ontology* RQ-25 and RQ-19. Kestrel variables, *Hold order*/*Re-route shipment*, statuses and people match Ontology 17-02. Links 632 files, 0 problems; Mermaid 12/12. |

## Open research questions

| ID | Question | Status |
|---|---|---|
| RQ-01 | **Doc conflict.** Do changes made inside an embedded child module flow back to the parent? The *Embedded Module widget* page says any change in either module is reflected everywhere the variable is mapped; the *Embed Workshop modules* overview says changes in the child don't propagate back without an explicit *Set variable* event. | Open. [02-04](02-workshop-data-and-logic/04-embedding-modules.md#how-mapped-variables-behave) |
| RQ-02 | The *Stream LLM response into variable* event lists only GPT-3, GPT-4 and GPT-4 32K, and the AIP Generated Content widget's *Direct to LLM* mode only those plus GPT-4-Turbo. Are the lists current, given the models AIP now offers? | Open. [01-02](01-workshop-foundations/02-layouts-widgets-and-events.md#the-llm-streaming-event) · [03-06](03-workshop-widgets/06-ai-observability-and-embedding.md#aip-generated-content) |
| RQ-03 | Do SQL query variables respect object and property security policies on the bound object sets? The page doesn't say. | Open. [02-03](02-workshop-data-and-logic/03-variable-types.md#sql-query-variables) |
| RQ-04 | Whose identity does a kiosk mode session use: the launching user's, scoped down, or a separate one? It decides what row-level policies such as Kestrel's regional Shipment policy show. | Open. [04-03](04-workshop-in-production/03-routing-state-and-presentation.md#read-only-dashboards-kiosk-mode-redact-mode) |
| RQ-05 | In an Inline Action **table**, does one row that fails submission criteria block the whole batch, or only that row? | Open. [03-05](03-workshop-widgets/05-buttons-forms-and-navigation.md#inline-action) |
| RQ-06 | **Doc conflict.** *Use OSDK in a widget set* says widgets don't support object set subscriptions; *Parameters and events* says the `@osdk/react` hooks used with `OsdkProvider2` offer real-time updates. Does a widget's `useObjectSet` update live, or only when the host refreshes the parameter? | Open. [06-04](06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md#kestrel-the-shipment-timeline) |
| RQ-07 | When Pilot creates new Ontology entities, which project do they land in (the save location?), and so which approval policy governs the Global Branching proposal? The tutorial shows automatic approvals; Kestrel's protected `Commerce [Ontology]` needs two. | Open. [07-02](07-pilot/02-building-and-shipping.md#shipping-an-application) |
| RQ-08 | Do the marking-based LLM data access rules (AIP 08-03) apply to Pilot's agents, including the production-data viewer? The Pilot pages don't mention markings. It matters for users whose sessions carry `Kestrel Pay – Financial`. | Open. [07-01](07-pilot/01-what-pilot-is.md#steering-it) |
| RQ-09 | **Doc conflict.** *Muting, pausing, and expiration* says the longest permitted expiration date is six months from now, yet the wizard offers *Indefinitely* and the worked examples set automations to never expire. Can an automation run with no expiry? | Open. [08-04](08-automate/04-execution-settings.md#muting-pausing-and-expiration) |
| RQ-10 | **Doc conflict.** *Function effects* describes retry strategies for failed functions; *Manual and automatic retries* says per-effect retries can only be configured on action and Logic effects. Do function effects support per-effect retries? | Open. [08-03](08-automate/03-effects.md) |
| RQ-11 | **Doc conflict.** The sidebar's *Workflow Builder → Overview* page is the Workflow Lineage overview ("previously known as Workflow Builder"), while *Workflow Builder → Core concepts* describes a different, node-based workflow builder. Is Workflow Builder a separate product, and is it generally available? | Open. [10-03](10-workflow-tools/03-solution-designer-and-workflow-builder.md#workflow-builder) |
| RQ-12 | Project-scoped automations don't support notification **effects**. Is a fallback **action** whose side effect sends a notification allowed in project scope? Kestrel's revised *High-risk payment hold* relies on it. | Open. [08-05](08-automate/05-security-ownership-and-history.md#who-can-see-what-happened) |
---
[Apps home](README.md) · [Topic map](MAP.md) · [Glossary](GLOSSARY.md)
