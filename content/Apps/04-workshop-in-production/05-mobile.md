# 05 — Mobile

*Sources: [Workshop mobile](https://www.palantir.com/docs/foundry/workshop/mobile-overview/) · [Getting started](https://www.palantir.com/docs/foundry/workshop/mobile-getting-started/) · [Mobile application launcher](https://www.palantir.com/docs/foundry/workshop/mobile-app-launcher/) · [Design best practices](https://www.palantir.com/docs/foundry/workshop/mobile-design/) · [Network access and authentication](https://www.palantir.com/docs/foundry/workshop/mobile-access/) · [Mobile Navigation Bar](https://www.palantir.com/docs/foundry/workshop/widgets-mobile-navbar/) · [QR Code Reader](https://www.palantir.com/docs/foundry/workshop/widgets-qr-reader/) · [Current Location Manager](https://www.palantir.com/docs/foundry/workshop/widgets-current-location/) · checked October 18, 2026 · Ready for Review*

Written as a build for one user: **Kofi's warehouse-floor module**, a phone app for the Accra warehouse team to scan a parcel and act on it. It was adopted into the Kestrel model on October 21, 2026 and is assembled in [11-02](../11-kestrel-case/02-warehouse-floor-mobile.md); the doc rules it relies on are labelled as usual.

## Before building: can we?

**[Docs]** Workshop mobile is a **limited access** feature; ask Palantir Support if it isn't on your enrollment. A mobile module is an ordinary web app tuned for phones; there's nothing to install.

**[Docs]** Two things must work before anyone sees the app:

| Need | Options from the docs | Trade-off |
|---|---|---|
| **Network access** from phones | An MDM-managed enterprise browser; a mobile VPN; an allowlisted IP region (Control Panel network ingress) | MDM browsers can render differently and exclude unmanaged devices; VPNs add a step every time; region allowlisting widens who can reach the enrollment |
| **Authentication** | Every user needs an account and goes through SSO and MFA; session length is set by your identity provider | Shared devices (a tablet on the floor) need a decision: individual logins, or a dedicated account per workstation (through your Palantir representative) |

**[Explanation]** At Kestrel the workstation-account option has a cost: Shipment's regional policy compares the **user's** region with `Shipment.region` ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)). A shared *Accra floor tablet* account would need its own region attribute, and every action would be logged against the tablet, not the person. Personal logins on company phones keep both the policy and the audit trail as they are.

## What changes in a mobile module

**[Docs]** Set the device type to **Mobile** in **Settings**: the editor switches to phone dimensions and a single column. Many widgets adapt (touch-friendly inputs); **Object Table, Chart and Map are disabled**; mobile-only widgets appear. Action forms open in a **full-page drawer**. Users reach mobile apps through the **launcher** at `https://<your-foundry-url>/workspace/m/`, which loads fast and makes the browser's Back and Forward (and Android's back button or iOS swipes) move between pages.

**[Explanation]** *Map disabled* means the Map widget; Map [Legacy] supports mobile ([03-02](../03-workshop-widgets/02-charts-and-maps.md#map-and-when-to-use-the-legacy-one)). Embedded modules inside a mobile module must also be mobile modules ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md#limits-of-embedding)).

## The build

**[Example]** Kofi's module, with the doc rule behind each choice:

| Screen | What's on it | Doc rule |
|---|---|---|
| **Scan** (navigation item 1) | A **QR Code Reader** in barcode mode, single code, *prompt before scanning* on; the scanned string drives a Shipment set filtered on `trackingNumber`. A **Current Location Manager** in the toolbar | Scanned data goes to a string variable (single) or string array (multiple). Location is a `lat,long` string, updated **only while that page is open** |
| **Shipment** (subpage) | Object Set Title; Property List (stacked labels, one column) in a **Flow** layout; a large *Re-route* button | Flow for scrolling, not collapsible sections; large buttons, fill width; subpages for detail, with Back to return |
| **Re-route** (drawer) | The *Re-route shipment* action form | Data entry in drawers; mobile action forms already open full-page |
| **Today** (navigation item 2) | Object List of shipments due today at Accra | Object List, since Object Table is disabled |

**[Docs]** The **Mobile Navigation Bar** shows up to **four** items at the bottom (more through submenus), stays visible on every page (use a full-screen drawer to hide it), and keeps the item highlighted while users are in a subpage reached from it. If an app needs more than a few items, the docs suggest **splitting it** into several apps.

**[Docs]** The barcode scanner lets you choose formats (PDF417 and other common types). The location widget can hide its preview, which also skips the Mapbox reverse-geocoding request.

**[Explanation]** Kestrel tracking numbers are printed on carrier labels; `Shipment.shipmentId` is `DHL|77812` with `trackingNumber` as its title ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)). So the filter is on `trackingNumber`, not the primary key; if two carriers ever printed the same number, the Shipment screen would show both and Kofi picks one. That's acceptable on the floor, and better than parsing a carrier prefix out of a barcode.

## Testing it

**[Docs]** Save and publish, then **View**: the app opens in the launcher. Preview with the browser's device mode (Chrome, Safari, Edge), or on a phone with network access, for example by generating a QR code for the page in Chrome or Edge.

---
[Module index](README.md) · Previous: [04 — Cross-application interactivity](04-cross-application-interactivity.md) · Next: [06 — Edge cases and legacy scenarios](06-edge-cases-and-legacy-scenarios.md)
