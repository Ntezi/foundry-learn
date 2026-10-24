# 02 — Kofi's warehouse-floor module

*Sources: no new doc pages; every row links to the note that holds the docs' wording · written October 21, 2026 · Ready for Review. Everything here is **[Example]** unless a line says otherwise.*

**The decision it serves:** a parcel in someone's hand at the Accra warehouse is late or blocked. Does it get re-routed, and to where? The desk version of that decision is the re-route review page; this is the version for people standing next to the shelves.

## What it is

| Screen | Contents | Note |
|---|---|---|
| **Scan** | QR Code Reader in barcode mode, single code, prompt before scanning; the scanned string filters `Shipment` on `trackingNumber`. Current Location Manager in the toolbar | [04-05](../04-workshop-in-production/05-mobile.md#the-build) |
| **Shipment** (subpage) | Object Set Title; Property List in a Flow layout; a large *Re-route* button | [04-05](../04-workshop-in-production/05-mobile.md#the-build) |
| **Re-route** (drawer) | The *Re-route shipment* form, full page on a phone | [04-05](../04-workshop-in-production/05-mobile.md#the-build) |
| **Today** | Object List of shipments due today at Accra | [04-05](../04-workshop-in-production/05-mobile.md#the-build) |

**[Explanation]** Two Mobile Navigation Bar items, well under the docs' four. Users open it from the mobile launcher at `/workspace/m/`, not from the Delivery Desk workspace, which is built for desks.

## What a phone changes

| Desk queue | Warehouse floor | Why |
|---|---|---|
| Object Table with a risk column | Object List | Object Table, Chart and Map are disabled in mobile modules ([04-05](../04-workshop-in-production/05-mobile.md#what-changes-in-a-mobile-module)) |
| Order panel child module | Property List on the Shipment subpage | Embedded modules inside a mobile module must also be mobile ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md#limits-of-embedding)); the panel isn't |
| Map of the region | None, or Map [Legacy] | The Map widget is disabled on mobile ([03-02](../03-workshop-widgets/02-charts-and-maps.md)) |
| Lookup by order | Lookup by printed `trackingNumber` | Labels carry tracking numbers, not Kestrel's `shipmentId` (`DHL|77812`); two carriers printing the same number would show both |

## Security and identity

- **Individual logins.** Shipment's regional policy compares the user's `region` with `Shipment.region` ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)). Warehouse staff need the Accra region attribute; a shared tablet account would need one too, and would log every re-route against the tablet ([04-05](../04-workshop-in-production/05-mobile.md#before-building-can-we)).
- ***Re-route shipment*** keeps its own rules: a filtered warehouse dropdown, a `ShipmentEvent` created, own-region only on main ([Ontology 08-02](../../Ontology/08-actions/02-rules-and-parameters.md), [17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#5-actions)).
- **Network access** from phones is a separate decision (MDM browser, VPN or allowlisted region) that Kestrel's IT makes once for all mobile modules ([04-05](../04-workshop-in-production/05-mobile.md#before-building-can-we)).

## Shipping it

- In `Delivery Desk [Workflow]`, shipped in the same Marketplace product as the queue ([11-01](01-delivery-desk-queue-built-out.md#shipping-and-operating-it)).
- **[Docs]** Mobile is a **limited-access** feature; confirm it's enabled on each enrollment before installing there ([04-05](../04-workshop-in-production/05-mobile.md)).
- Test in the browser's device mode, then on a phone with network access ([04-05](../04-workshop-in-production/05-mobile.md#testing-it)).

## Related: the wall screen

Kofi's Accra late-shipments board runs in **kiosk mode** on a wall screen ([04-03](../04-workshop-in-production/03-routing-state-and-presentation.md)). It's read-only and long-lived, the opposite of this module. Whose identity a kiosk session uses is still [RQ-04](../SOURCES.md#open-research-questions).

---
[Module index](README.md) · Previous: [01 — The Delivery Desk queue, built out](01-delivery-desk-queue-built-out.md) · Next: [03 — The Delivery Desk workspace](03-delivery-desk-workspace.md)
