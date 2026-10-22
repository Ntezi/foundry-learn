# 01 — DevOps products

*Sources: [Product delivery: Overview](https://www.palantir.com/docs/foundry/devops/overview/) · [Product delivery: Core concepts](https://www.palantir.com/docs/foundry/devops/core-concepts/) · [Foundry DevOps: Overview](https://www.palantir.com/docs/foundry/foundry-devops/overview/) · [Create a product](https://www.palantir.com/docs/foundry/foundry-devops/create-products/) · [Linked products](https://www.palantir.com/docs/foundry/foundry-devops/linked-products/) · [Package multiple products](https://www.palantir.com/docs/foundry/foundry-devops/package-multiple-products/) · [Manage products](https://www.palantir.com/docs/foundry/foundry-devops/manage-products/) · [Track a source folder](https://www.palantir.com/docs/foundry/foundry-devops/folder-tracking/) · [Input presets](https://www.palantir.com/docs/foundry/foundry-devops/input-presets/) · [Supported resources](https://www.palantir.com/docs/foundry/foundry-devops/supported-resources/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Foundry DevOps** packages Foundry resources as a **product**; **Marketplace** installs it. [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md) is Kestrel's spec for one product, *Kestrel Delivery Desk* v1.0, with the core packaging rules (inputs and outputs, installation modes, size). This note covers the rest of building products: linked products, folder tracking, presets, versions and release channels. Stores and permissions are in [02](02-stores-groups-and-export.md), installing and upgrading in [03](03-marketplace-installs-and-releases.md).

## The vocabulary

**[Docs]**

| Term | Meaning |
|---|---|
| **Product** | A collection of resources a builder makes installable; "the atomic unit" users browse and install. Types the docs name: Ontology, Use Case, Pipeline, Modeling |
| **Product version** | A new version for every change to the content |
| **Store** | A collection of products with a shared purpose; **local** (built on your enrollment) or **remote** (for example the Foundry Store maintained by Palantir) |
| **Installation** | Created when an installer fulfils the inputs; one product can have many, per user group or per environment |
| **Inputs / outputs** | What the installer must map / what the installation creates |

## Building a product

**[Docs]** Choose (or create) a **store**: it lives in a project and inherits its permissions. Then start a draft by **adding resources** by hand or **tracking a folder**, and switch to folder tracking at any time.

- **Outputs:** add the furthest-downstream resources first, because DevOps finds dependencies. Bulk options: **Add all files from folder**, **Add from Data Lineage**, **Add from Workflow Lineage**.
- **Inputs:** DevOps surfaces dependencies as inputs. **Move to output** (one at a time or in bulk) makes the product supply them instead. Parameters and groups can't be moved.
- **Datasets** offer three packaging options: **Include with static data** (copies the rows; needs **Download** on the dataset), **Include dataset definition only**, or **Include with** its producer (transform, pipeline, sync, restricted view…). Only the first needs Download.
- **Size:** at most **15,000** inputs and outputs combined, counting nested items such as columns and properties. A warning at **75%**, a blocking error at 100%. The docs advise acting at the warning, because ordinary growth (new columns) can push a later version over; split the product and package the parts together.
- **Documentation:** description, thumbnail, images and a Markdown product description for the storefront.
- **Settings:** folder structure, **installation mode** (Production, Singleton, Bootstrap: see 14-04), and build settings (build datasets and models during install).
- **Publish** with a changelog. It can take a few minutes for a large product.

**[Docs] Unsupported resources** show as errors and must be dropped (**Drop all failed to package**). The non-exhaustive list: Data Connection **sources**, **Code Workbook** workbooks and **Fusion** sheets. Each resource type's own Marketplace page has its packaging rules.

## Tracking a source folder

**[Docs]** A product can **track a Compass project or folder**: every **Create new version** re-syncs it, picking up added and removed resources (or **Refresh all** inside a draft).

- **Discovery settings** pull in related resources that aren't files, such as health checks on the project's datasets.
- **Ignore** a sub-folder (for experimental work) and everything in it is left out.
- **Manual overrides:** you can still add outputs by hand, or change a tracked resource's configuration or version; it then carries an **Override** tag and persists across versions. A *Stale overrides* warning offers to clean up overrides that now match the defaults, or resources that have since moved into the folder.
- **Strict folder tracking** forbids manual outputs: everything must be in the folder, and anything outside it fails validation at publish.
- **Migrate to folder** (one-time, from the lowest common ancestor) and **Disable folder tracking** convert either way, with a preview. Ontology entities not yet on project permissions stay manually tracked, because they aren't in the filesystem.

## Linked products

**[Docs]** Split a workflow into **linked products** so each part can be upgraded on its own, with automatic input mapping, semantically versioned dependencies and less duplicated content. A typical split is a data-cleaning pipeline product feeding an Ontology product.

| Link source | How it's made |
|---|---|
| **Same store** | Automatically, when one product's outputs are **exactly** the resources another needs as inputs |
| **Cross-store** | Through one-way **store links** in the downstream store's settings (needs `marketplace:link-to-local-marketplace`, which store viewers have by default) |
| **Installation-based** | Automatically, when the downstream product was built on resources **installed** from the upstream product |
| **Manual** | **Add manual link**: map each input to a compatible output by hand. It overrides any automatic link and **doesn't update itself** as products change |

**[Docs]** Links are created when the **downstream** product is packaged. Rules that follow:

- Package **upstream first**, then downstream.
- A **breaking change** (content removed, a column type changed) deserves a **major** version. A major version makes the published product incompatible with existing downstream products until **all** of them are repackaged; a minor version with breaking changes lets installers pick the link and then fail at install.
- After publishing an upstream product, the safest move is to repackage everything downstream.
- **Splitting** an installed product creates **new** resources when the new part is installed, rather than reusing the old installation's.

**[Docs] Several products in one draft.** **Create new group** puts several products in one draft. DevOps resolves the dependencies between them, shows a linked-products graph (with warnings for broken links), lets you move one draft's inputs to another's outputs (**Add {N} to other draft**), and publishes in dependency order.

## Input presets

**[Docs]** A **preset** limits an input to allowed values; a **default** pre-selects one. Inputs with defaults are mapped automatically at install.

- **Source** presets use whatever the source entities depend on, and follow it if it changes; **Overrides** are a list you provide. **Set presets** applies Source presets in bulk.
- Some presets (Ontology entities) are resolved by **API name** in the target space and ontology, so they work across environments.
- If nothing in the target matches, the preset isn't offered. With **Allow custom values**, the installer can map their own resource; without it, the product **can't be installed** there.
- Installers can choose **Track default**, so the input follows the default when an upgrade changes it.

## Versions, channels and retirement

**[Docs]**

- **Start new version** from the product page. Each version page shows content, inputs, local installations and changelog.
- **Release channels:** tag a version **Release**, **Pre-stable** or **Stable**. Installations track a channel (by default **Release**), and channels nest: *Release* receives all three, *Pre-stable* receives Pre-stable and Stable, *Stable* only Stable. The upgrades page names the middle channel **Test** ([RQ-10](../SOURCES.md#open-research-questions)).
- **Maven coordinate:** reverse enrollment URL + namespace + store identifier form the group; the product identifier is the artifact, as in `com.palantirfoundry.acme.my-namespace.my-store:my-product`. Used for publishing to connected Apollo hubs; keep sensitive data out of it.
- **Deprecate** hides a product from the storefront. Products **can't be hard-deleted**.
- **Recall** a version in a local store to block new installs and upgrades to it; existing installations keep it. Recalls aren't supported for remote stores and don't propagate to enrollments using the store remotely.

## For Kestrel

**[Example]** The Delivery Desk spec in 14-04 keeps `Order`, `Shipment` and `Customer` as **inputs**, mapped in each environment. **Source presets** on those inputs would resolve by API name in `kestrel-test` and `kestrel`, so installers don't map them by hand, and the portal's rule that those API names are identical everywhere ([02-03](../02-developer-console-and-apis/03-operating-an-application.md#for-kestrel)) makes that safe. Turning **Allow custom values** off stops anyone mapping a different type by mistake. **Adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22, with the release in [09-03](../09-kestrel-case/03-delivery-desk-product-release.md#inputs).

**[Example]** Kestrel's `Delivery Desk [Workflow]` project ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)) is a candidate for **folder tracking**, matching the docs' advice to keep one project per product ([03](03-marketplace-installs-and-releases.md#release-management)). Ontology entities not yet migrated to project permissions would stay manual outputs. *Considered, not adopted*: the Ontology outputs aren't in that project ([09-03](../09-kestrel-case/03-delivery-desk-product-release.md#considered-not-adopted)).

**[Explanation]** The release-channel naming conflict matters to Kestrel: 14-04 has test on a *test* channel, which matches the upgrades page but not the product page's *Pre-stable*. Use the names the store's channel selector actually shows.

---
[Module index](README.md) · Next: [02 — Stores, product groups and export](02-stores-groups-and-export.md)
