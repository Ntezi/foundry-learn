# 03 — Marketplace installs, upgrades and releases

*Sources: [Marketplace: Overview](https://www.palantir.com/docs/foundry/marketplace/overview/) · [Marketplace: Getting started](https://www.palantir.com/docs/foundry/marketplace/getting-started/) · [Browse products](https://www.palantir.com/docs/foundry/marketplace/browse-products/) · [Install a product](https://www.palantir.com/docs/foundry/marketplace/install-product/) · [Foundry products](https://www.palantir.com/docs/foundry/marketplace/foundry-products/) · [Marketplace: Installations](https://www.palantir.com/docs/foundry/marketplace/installations/) · [Marketplace: Upgrades](https://www.palantir.com/docs/foundry/marketplace/upgrades/) · [Release management: Overview](https://www.palantir.com/docs/foundry/devops-release-management/overview/) · [Use DevOps for release management](https://www.palantir.com/docs/foundry/devops-release-management/use-devops-for-release-management/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Marketplace** is the storefront where products are installed. An **installation job** maps inputs and creates outputs; afterwards the installation can be upgraded, downgraded, locked, detached from or deleted. Installed once per **environment**, products become a release process: dev, test and prod as separate installations of the same product.

## Installing

**[Docs]** Select **Create new installations**, tick one or more products, and **Create**; or **Install again** from a product page (if you already have an installation, **Open** takes you to it to upgrade). Recalled versions can't be installed. The **Create installation job** dialog sets:

- the **project** (Marketplace creates one in the space or uses an existing one), with **Lock project** recommended for Production-mode installs;
- the **space** and **ontology**, derived from the project (if your ontology is missing, you lack edit permission on it);
- an optional **installation suffix** such as `DEV`, `TEST` or `PROD`, and per-product locations if wanted;
- each product's **version**.

**[Docs]** The draft has three pages:

- **General:** the dependency graph and **Add available linked products**: reference an existing installation to fulfil inputs (also across stores), upgrade it, or include a new installation (same store and space) in the job; then **Apply changes**.
- **Inputs:** mandatory and optional counts, filters by status, type and product, **Bulk-set inputs**, and:
  - **Ontology install prefix**, applied to display names only, or to display names **and API names**;
  - **Placeholder inputs**: stub **datasets** (the only type supported) so you can install before the real data exists, then remap with **Edit**;
  - **Auto-select from folder**;
  - **Overrides**, shown with **Show overrides**: a plain *Override* (gray) replaces a default; a *Linked product override* or *Unnecessary override* (orange) can be removed with **Clean up**.
- **Outputs:** everything the job will create, by type, with each output's upstream dependencies.

**[Docs]** **Install** once mandatory inputs are mapped. Warnings don't block; validation errors do. The getting-started tutorial (an alert inbox installed with its data source product in one job) shows inputs fulfilled by a linked product being hidden by default, and objects taking a few minutes to index before the app works.

## After installing

**[Docs]** An installation's **Settings** hold its release channel, automatic upgrades, maintenance windows and lock.

- **Project locking** stops users editing installed resources; Marketplace can still upgrade them. Unlocking (from the installation or from Compass project settings) allows edits, but **upgrades overwrite them**. Some resources stay uneditable even unlocked: a code repository is editable only if packaged with its source.
- **Detach outputs** cuts resources loose from Marketplace for good: upgrades create new outputs instead, and deleting the installation leaves them. Confirm by typing `detach output`.
- **Delete installation permanently** removes the installation and, if **Outputs** is ticked, every resource across all its versions, plus the project if nothing else is in it. It's irreversible (type `delete installation`); if some resources fail, **Force delete** leaves them behind.

## Upgrading

**[Docs]**

- **Manual:** stage the upgrade from the installation page; several installations can go in one job. **Upgrade or downgrade to version** picks a specific version; **Edit** re-runs the job at the current version, to change inputs.
- **Automatic** (beta): off by default in Production and Bootstrap mode. You choose **maintenance windows** (*Always open* takes upgrades at once; upgrades cause downtime, so the docs recommend a window) and the **release channel** to follow. An upgrade still stops for manual action if it brings new inputs or validation errors.

**[Docs]** **Foundry products** (beta) are Marketplace products published across enrollments and managed through **Apollo** by Palantir: a **managed installation** is maintained by Palantir; an **artifact installation** only delivers the product for you to install. The **Foundry products** Control Panel extension shows their status and helps debug installs, upgrades and uninstalls.

## Release management

**[Docs]** **Release management** keeps versions of resources in separate environments (development, test, production) so changes are validated before they reach users. In Foundry each environment is a **space**, and each can differ in:

- **data** (notional, a real subset, everything);
- **behaviour** (notifications or approvers that differ outside production);
- **integrations** (development databases and APIs versus production ones).

**[Docs]** Against Global Branching ([06-01](../06-branching-and-cross-app/01-global-branching.md)):

| DevOps and Marketplace give you | Global Branching gives you |
|---|---|
| Different source systems per environment | Rapid iteration and release |
| Different security policies per environment | Easy hotfixes into an environment |
| Rollback to a previous release | Lower infrastructure cost: unused branches are deleted |
| Release channels; long-lived environments | |

**[Docs] Setting it up.**

1. **One space per environment.** Your current space can be development. Configure environments in DevOps (**Settings > Configure environments**); you can only add spaces you **own**, each tied to one enrollment.
2. **Package** from development, ideally **one project per product**. A typical split is a datasource product, an Ontology product and use-case products.
3. **Install** upstream products first, in test, then production, mapping each environment's own resources as inputs. The **Environments** tab shows every product's installations per environment, with actions to install, upgrade, change channels and lock.

**[Docs] Where Ontology entities go**, since they aren't in any project:

| Entity | Package it with |
|---|---|
| Object type | The product holding its **backing dataset** |
| Link type | The product of the **more downstream** of its two object types (both in one product: there) |
| Action type | Its use case; if function-backed, the **function's** product; if shared by several use cases, a common or core Ontology product |
| Function | The product holding its **source** (the functions repository or Logic resource) |

## For Kestrel

**[Example]** Kestrel's flow is already in [Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#release-flow): `kestrel-dev`, `kestrel-test` and `kestrel` are the spaces; test upgrades automatically, prod manually in a maintenance window. Automatic upgrades are **beta** and "may not be available on your enrollment", so check before relying on test's. This page adds:

- **Installation suffixes** `TEST` and `PROD` keep the installed projects apart by name, and **Lock project** on the prod installation enforces 14-04's rule never to edit installed resources by hand.
- Configuring the three spaces under **Configure environments** gives the platform team one **Environments** view of every Delivery Desk installation; it needs owner access on each space.

**[Explanation]** The table above raised an open point for the Delivery Desk release: `deliveryRisk` and `draftDelayMessage` should be packaged with their **source repository**, and each Kestrel functions repository holds more than Delivery Desk's functions (`kestrel-ml` holds every Python function used in Workshop, [Ontology 09-05](../../Ontology/09-functions/05-writing-functions-in-practice.md)). Resolved in [09-03](../09-kestrel-case/03-delivery-desk-product-release.md#outputs): functions can be packaged **without** their source code, so the product carries only its two functions.

---
[Module index](README.md) · Previous: [02 — Stores, product groups and export](02-stores-groups-and-export.md) · Next module: [09 — Kestrel case](../09-kestrel-case/README.md)
