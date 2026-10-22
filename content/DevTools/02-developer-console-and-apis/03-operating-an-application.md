# 03 — Operating an application

*Sources: [Application metrics](https://www.palantir.com/docs/foundry/developer-console/application-metrics/) · [Branching Developer Console applications](https://www.palantir.com/docs/foundry/developer-console/branching-integration/) · [Install an application with Marketplace](https://www.palantir.com/docs/foundry/developer-console/marketplace-installation/) · checked October 22, 2026 · Ready for Review*

**[Concept]** After the first release, three questions come up: is the app healthy, how do we change it safely alongside the Ontology, and how do we ship it to another environment? Developer Console answers them with metrics, Global Branching and Marketplace packaging.

## Metrics

**[Docs]** Application metrics are **beta**. Charts show requests over time, the success rate, and API latency at the **50th, 75th, 95th and 99th** percentiles, per endpoint.

**[Docs]** Data arrives with about **24 hours** of latency and covers the last **30 days**. Periods of five days or less show hourly points; longer periods show daily points.

**[Docs]** Only calls made through the application's **OAuth flow** are counted. A client built on `UserTokenAuth` (a personal token) doesn't appear; `PublicClientAuth` and `ConfidentialClientAuth` do.

**[Explanation]** So metrics are for trends and capacity, not incidents: a failure this morning shows up tomorrow. Log errors in the app itself for anything urgent ([04](04-platform-apis.md#errors)).

## Branching the application

**[Docs]** Developer Console works with **Global Branching**, so an OSDK React app can be developed together with the Ontology changes it needs. On a global branch you can change the SDK's resources, generate an SDK from branched definitions, read branch data, and read and write it from a development server or a pull request preview.

| Change you want to test | SDK generation |
|---|---|
| Read branch data with resources already in the SDK | Use the existing SDK after setting up the repository |
| A changed definition or a newly added resource | Generate an SDK on the branch, then `npm install` |

**[Docs]** Limits and prerequisites:

- Only **TypeScript SDKs installed with npm**, in apps on **Vite 6, 7 or 8**.
- The application must be **in a project** (migrate legacy apps first) and must already have an SDK on `main`; you can't add one on a branch. The branch must use the same Ontology.
- Before testing actions, **index** every object type they edit on the branch (bulk indexing is in Workflow Lineage). Action edits on a branch are for testing and are **not merged** into `main`.
- **Restrictions are shared** across branches. On a branch you can only **add** Ontology resources; project, operation and marking restrictions and OAuth settings are read-only there.
- You **can't tag a release or publish the production site** from a global branch; use the proposal's pull request preview.
- OSDK apps embedded in other OSDK apps don't inherit the branch.

**[Docs]** Repository setup, for template **`osdk-react-app-v2` 0.291.0** or later (other templates: their latest version):

| File | Change |
|---|---|
| `package.json` | `@osdk/client` and `@osdk/vite-plugin-branch` **2.77.0+**, `@osdk/cli` **0.104.0+** (it adds `osdk branch sync`), and `"postinstall": "osdk branch sync"` |
| `vite.config.ts` | `branchPlugin()` called **inline** in the `plugins: [...]` array, in a root `vite.config.ts`. `vite.config.js`, `.mts`, or a plugins array built elsewhere isn't recognised |
| `ci.yml`, `.jemma/sync-sdk-dependencies.sh` | From the **template upgrade**, which doesn't touch the files above |

**[Docs]** Foundry checks `package-lock.json` and `vite.config.ts` on the repository's **`master`** branch, so merge the migration there before adding the repository to a global branch.

**[Docs]** The working loop: check out the **same** global branch in the repository (a plain Git branch doesn't set the context), and run `npm install`, which syncs the SDK dependency to the latest one generated on that branch. A Foundry VS Code workspace runs `npm install` every time it starts the dev server. Locally, check out the Git branch Foundry created for the global branch, under the same name.

**[Docs]** Opening a **proposal** creates a pull request whose CI deploys a **preview** that reads and writes the branch. Verify it: the app's Ontology requests should carry a `branch` query parameter with the branch's RID. Merging the proposal doesn't deploy production; cut a release on the default branch.

**[Docs]** An app embedded in a **Workshop Iframe widget** follows the module's branch only with the **Bidirectional** option, `@osdk/client` **2.77.0+**, `useHistory: false` on `createPublicOauthClient`, and no explicit branch override. Otherwise it silently reads from and writes to `main`. The iframe still loads the deployed site and its bundled SDK, so the schema must stay compatible across the branches you preview.

**[Docs]** When `main` moves, **Start rebase** on the Ontology SDK page compares resource sets; **Keep this version** keeps one side's whole set. Then regenerate the SDK on the branch, `npm install`, commit and retest. The proposal check needs an SDK generated from the latest resources.

**[Explanation]** The common failure is silent: a dev server or embedded app that isn't set up correctly talks to `main` with no warning. Make the `branch` query parameter check part of every branch test. The general Global Branching model is in [06-01](../06-branching-and-cross-app/01-global-branching.md) and [Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md).

## Shipping with Marketplace

**[Docs]** Two ways to package:

| | Application packaging | Source code packaging |
|---|---|---|
| Contains | Website assets and CSP, metadata, OAuth client (type, grants, redirect URLs), resource restrictions | The website's code repository, without an application |
| Recommended for | Deployed websites in production and singleton products; also shipping just an OAuth client | Templates, and when the destination needs its own new application |

**[Docs]** Packaging both is possible but uncommon: the installed app always serves the latest packaged website assets, so the source code is effectively ignored.

**[Docs]** In DevOps the application is a product **output**. Its dependencies are the Ontology entities and Compass projects in its restrictions, plus installation parameters such as the hosting **subdomain** and **markings**. A new subdomain needs approval again after install, usually by an Information Security Officer; the site stays offline until then.

**[Docs]** Marketplace remaps these parameters for apps with built website assets: **Foundry URL, OAuth client ID, redirect URL, Ontology RID and Ontology API name**. That works only if the app reads them from **meta tags in `index.html`**, the default for `@osdk/create-app` **2.1.3+** and Foundry VS Code workspaces. Older apps need the meta tags and a `getMetaTagContent` helper.

**[Docs]** Object type and action type **API names are not remapped**. The OSDK refers to entities by API name, unlike Workshop, which uses RIDs that Marketplace rewrites. Options:

- package the Ontology resources **with** the app and choose **Always install source Ontology API names**, because bootstrap installs may otherwise rename `Truck` to `Truck_1`;
- use **fully qualified API names** (namespace prefixes) for singleton products;
- use **separate spaces**, since API names are unique per space;
- build on **interfaces** when the destination's types differ (the docs' `medicine` interface implemented by `vaccine`);
- rename by hand, carefully.

**[Docs]** Limitations: confidential clients arrive **without a secret** (rotate one after install); standalone OAuth clients can't be packaged; every function in the SDK must use its **latest** version, because version-pinned functions aren't Marketplace compatible yet.

**[Docs]** Source-code **templating** (beta) treats every `{{...}}` as a variable, including JSX like `style={{color: 'red'}}`. Reserved variables such as `{{FOUNDRY_HOSTNAME}}`, `{{APPLICATION_CLIENT_ID}}` and `{{ONTOLOGY_RID}}` resolve on install. Templated code fails CI type checks, so it can't ship with website assets; the package name must have no `@` or trailing `/sdk`, and the OSDK version must be `latest` or `0.1.0`.

**[Docs]** Upgrading: change the app in the source environment, **deploy** new website assets in Developer Console first (DevOps packages the latest deployed version), then create a new product version. With Compass-managed permissions, existing installations must each be migrated separately.

## For Kestrel

**[Example]** The customer portal runs outside Foundry, so it isn't packaged as a website; only its application and OAuth client move between `kestrel-dev`, `kestrel-test` and `kestrel`. Each environment rotates its own client secret after install. Because the portal's code calls `Order`, `Shipment` and `ShipmentEvent` by API name, those names must be identical in all three environments; Kestrel's core types change per environment ([Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#which-environment-changes-what)), so any rename there is a breaking change for the portal. The release flow is in [09-03](../09-kestrel-case/README.md).

---
[Module index](README.md) · Previous: [02 — Bootstrapping and hosting](02-bootstrapping-and-hosting.md) · Next: [04 — Platform APIs](04-platform-apis.md)
