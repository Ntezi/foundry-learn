# 03 — Kestrel's applications

*Sources: no new doc pages · written October 21, 2026 · Ready for Review*

The examples in this area all use **Kestrel Commerce**, the running example from the [Ontology area](../../Ontology/00-orientation/04-running-example.md): a fictional online retailer of home and outdoor goods that ships from five warehouses (Accra among them) through four carriers, with an in-house payments arm, Kestrel Pay. Its data model is in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md). This area adds the **applications** built on it, now listed in [17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications).

## Who uses what

| Person | Role | Apps in this area |
|---|---|---|
| **Ama** | Customer service lead | The Delivery Desk queue, its chatbot drawer and saved queues; the Delivery Desk workspace |
| **Kofi** | Warehouse operations lead, Accra; sees only his region | The queue (region-filtered), the re-route review page, the **warehouse floor** mobile module |
| **Lena** | Finance analyst, Kestrel Pay | The invoice review module (PDF viewer on `CarrierInvoice`, unmatched lines) |
| **Tomás** | Fraud analyst, Kestrel Pay | Notifications from *High-risk payment alert*; the fraud on-call team also gets *High-risk payment hold*'s failure alerts |
| **Daniel** | Application developer | Builds and ships all of it: branches, Marketplace, the `delivery-widgets` widget set |

## Where each app is built

| App | Built in | Main notes |
|---|---|---|
| **Delivery Desk queue** | Workshop | [01-01](../01-workshop-foundations/01-workshop-at-a-glance.md), [01-03](../01-workshop-foundations/03-variables-and-interfaces.md), [02-01](../02-workshop-data-and-logic/01-actions-in-workshop.md), [03-01](../03-workshop-widgets/01-core-display-widgets.md), [04-01](../04-workshop-in-production/01-publishing-versions-and-branching.md), [04-02](../04-workshop-in-production/02-performance.md); assembled in [11-01](../11-kestrel-case/01-delivery-desk-queue-built-out.md) |
| **Order panel** child module | Workshop | [02-04](../02-workshop-data-and-logic/04-embedding-modules.md) |
| **Invoice review** | Workshop | [03-03](../03-workshop-widgets/03-media-documents-and-history.md), [03-05](../03-workshop-widgets/05-buttons-forms-and-navigation.md); flow in [AIP 10-02](../../AIP/10-kestrel-case/02-carrier-invoices.md) |
| **Shipment timeline** (`delivery-widgets`) | Custom widget set | [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md), [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| **Warehouse floor** | Workshop, mobile | [04-05](../04-workshop-in-production/05-mobile.md); [11-02](../11-kestrel-case/02-warehouse-floor-mobile.md) |
| **High-risk payment hold** and **alert** | Automate | [Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md), [08-05](../08-automate/05-security-ownership-and-history.md) |
| **Delivery Desk workspace** | Carbon | [09-01](../09-carbon-workspaces/01-carbon-workspaces.md)–[09-03](../09-carbon-workspaces/03-configuration-and-permissions.md); [11-03](../11-kestrel-case/03-delivery-desk-workspace.md) |

**[Explanation]** Three apps came from earlier areas and aren't rebuilt here: the **customer delivery-status portal** ([Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md)), the **support portal** ([Ontology 09-02](../../Ontology/09-functions/02-query-functions-and-ontology-edits.md)) and the **re-route review page** ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md)).

## Ideas tried and left out

Some notes test a tool against Kestrel and decide against it: a public Slate feedback form ([05-01](../05-slate/01-slate-apps.md#integrated-and-public-apps)), an internal React app ([06-01](../06-osdk-react-and-custom-widgets/01-osdk-react-apps.md)), a Pilot-built invoice line matcher ([07-01](../07-pilot/01-what-pilot-is.md#steering-it)), Autopilot boards ([10-02](../10-workflow-tools/02-autopilot.md#kestrel-the-order-lifecycle)). They stay in the notes as worked reasoning, labelled *considered, not adopted*, and 17-02 lists them so the record is complete.

---
[Module index](README.md) · Previous: [02 — Choosing a builder](02-choosing-a-builder.md) · Next module: [01 — Workshop foundations](../01-workshop-foundations/README.md)
