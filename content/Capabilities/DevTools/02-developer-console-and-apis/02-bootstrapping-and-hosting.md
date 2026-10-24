# 02 — Bootstrapping and hosting

*Sources: [Bootstrap a TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-typescript/) · [Bootstrap a Python application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-python/) · [Bootstrap a Java application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-java/) · [Bootstrap a back-end TypeScript application](https://www.palantir.com/docs/foundry/developer-console/how-to-bootstrapping-server-side-typescript/) · [Add OSDK to an existing application](https://www.palantir.com/docs/foundry/developer-console/how-to-add-to-existing-typescript/) · [Hosting an application on Foundry](https://www.palantir.com/docs/foundry/developer-console/deploy-custom-application-on-foundry/) · [Create an offline-capable application with the embedded ontology](https://www.palantir.com/docs/foundry/developer-console/create-embedded-ontology-application/) · [Manage Node.js version in a Foundry code repository](https://www.palantir.com/docs/foundry/developer-console/manage-node-version-in-foundry-code-repository/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Once the application exists ([01](01-applications-scopes-and-restrictions.md)), you need a project that uses it and, for a browser app, somewhere to serve it. Developer Console has a quick start per language, a static web host, and a template for apps that keep working offline.

## Creating the application

**[Docs]** The wizard for a browser app:

1. **Basic information:** add an icon; users see it on the OAuth consent screen.
2. **Application type:** **Client-facing application** (or **Backend service** for a server; see below).
3. **Permissions > Authorization code grant:** redirect URL `http://localhost:8080/auth/callback`, and add `http://localhost:8080` to the CORS policy in Control Panel. If you can't change CORS, use `https://localhost:8080/auth/callback`.
4. **Resources:** **Yes, generate an Ontology SDK**, pick an Ontology (**it can't be changed later**), and pick object and action types. For platform API calls, add resources and operations on the **Platform SDK** tab.
5. **Create application**, then **Generate first version** of the package.

**[Docs]** The entities you choose decide both the generated bindings and documentation **and** the default restrictions on the token. The in-app documentation covers TypeScript, Python and cURL for your exact entities.

## Quick starts by language

**[Docs]** Every quick start exports a token first: `export FOUNDRY_TOKEN=...`. It's a personal access token for development only and must **never be committed**.

| | TypeScript front end | Python | Java | Back-end TypeScript |
|---|---|---|---|---|
| Runtime | Node **18+** | Python **≥3.10, <3.15** | Java **17 to 21** | Node, with server rendering (the page uses Next.js) |
| Start | `npm create @osdk/app@latest -- --application <rid> --foundryUrl ... --clientId ... --osdkPackage ... --osdkRegistryUrl ... --corsProxy false` | `pip install <package> --upgrade --extra-index-url "https://:$FOUNDRY_TOKEN@<index-url>"` | Two Maven repositories with the token as password in `build.gradle` | Create a **Backend service** app with **Application's permissions** |
| Client | `createClient` + `createPublicOauthClient` | `FoundryClient(auth=UserTokenAuth(...), hostname=...)` | `FoundryClient.builder()` with `UserTokenAuth` or `ConfidentialClientAuth` | `createClient` + `createConfidentialOauthClient(CLIENT_ID, CLIENT_SECRET, STACK_URL)` |
| Run | `npm install && npm run dev` | your framework (Flask, Streamlit, Jupyter) | your build | `npm run dev`, then `http://localhost:3000` |

**[Docs]** Details from the individual pages:

- **TypeScript:** `@osdk/create-app` generates client code matching the SDK's generator version. If `client.ts` imports `FoundryClient` and `PublicClientAuth`, the SDK came from the legacy 1.x generator: generate a 2.x version on **SDK versions** and rerun the command ([01-03](../01-ontology-sdk/03-migration-testing-and-setup.md)). For React, add `@osdk/react` and `@osdk/react-components` ([Apps 06-01](../../Apps/06-osdk-react-and-custom-widgets/01-osdk-react-apps.md)).
- **Python:** behind a corporate proxy, set `SSL_CERT_FILE` and `REQUESTS_CA_BUNDLE`. `--trusted-host` disables certificate checks; use it only once, to confirm that trust is the problem, "never in production". Then fix the CA chain.
- **Java:** when the package was generated in one environment and runs in another with a different ontology API name, set `.ontologyApiName(...)` on the client builder.
- **Back-end TypeScript:** grant the generated service user read access to the object types (and whatever the actions' submission criteria need). Keep `CLIENT_ID` and `CLIENT_SECRET` in a `.env` that is never checked in. A Marketplace-packaged confidential client arrives **without** its secret; rotate one in the destination environment.
- **Existing TypeScript app:** add the registry to `.npmrc` (`<package>:registry=...` and `_authToken=${FOUNDRY_TOKEN}`), install the package with `@osdk/client` and `@osdk/oauth`, and set `NODE_EXTRA_CA_CERTS` if you need a certificate. A 404 on install means another registry wins; `npm config delete registry` and check other `.npmrc` files.

**[Explanation]** The existing-app page's sample calls `auth.refresh()` when a token already exists and only fetches data when there is **no** token. That looks inverted; check the logic before copying it.

## Hosting on Foundry

**[Docs]** Developer Console can host **static** front ends, "similar to GitHub Pages": HTML, CSS, JavaScript, single-page apps, images and fonts. It can't run a server. Hosting is available only for **client-facing** applications; an app that is also a backend service has a confidential client and loses the option.

**[Docs]** The address is `<subdomain>.<enrollment>.palantirfoundry.com`, or a **custom domain** you own. Enrollments on other domains, and IL5 or FedRAMP environments, need extra setup through Palantir Support.

**[Docs]** To get there:

1. **Request a subdomain** on **Website hosting**. A request **can't be edited**; cancel it and submit a new one.
2. An **Information Security Officer** approves it, or you do if you have the permission. Refresh until **Domain ready**.
3. Set the redirect URL to `https://<host>/auth/callback` in the code **and** in Developer Console. Always `https://`: the platform doesn't upgrade `http` URLs, and `http` can cause CSP violations.
4. Zip the **contents** of the build directory (usually `dist/`), not the directory itself.
5. **Upload new asset**, **Preview**, then **Deploy to production**. Or use `@osdk/cli`.
6. Share the site under **Sharing & tokens > Share hosted website**. Only users with Foundry logins can open it.

**[Docs]** Limits: **1,000** files and **20 MB** per upload.

**[Docs]** Custom domains need a **certificate** for the domain in Control Panel first, then an ISO-approved request, then DNS pointing at Foundry. The custom domain inherits ingress and authentication settings from the domain you logged in through. To register subdomains under it, you must be logged in **through that custom domain**.

**[Docs]** Behaviour worth knowing:

- Without a `404.html`, every unknown path serves `index.html` (single-page app routing). Adding `404.html` turns that off.
- `/file`, `/file/` and `/file.html` all serve `file.html`; Foundry never redirects to a canonical form.
- The default **Content Security Policy** only allows your subdomain. Extra rules on the **Advanced** tab are merged in, without validation, and widen the XSS risk.
- Calls between two hosted apps (a parent loading a child's `remoteEntry.js`) need **CORS** set in Control Panel for the child's subdomain.
- Where asset scanning runs asynchronously, deploy may fail with `SiteAssetScanning:ScanningInProgress`. Set `"site": { "uploadOnly": true }` in `foundry.config.json` and deploy by hand after the scan.

## Offline apps with the embedded Ontology

**[Docs]** The **embedded Ontology** syncs Ontology data into the browser so a client-facing app works without a network and can be installed as a **progressive web app**. It uses `@palantir/lohi-ts` and the **Embedded Ontology React** template:

1. Create a client-facing app, generate the SDK and set up hosting.
2. Add `'wasm-unsafe-eval'` (with the quotes) to **scriptSrc** in the CSP. Without it the deployed app **won't start**.
3. **Start developing > Bootstrap in Foundry**, template **Embedded Ontology React**.
4. Fix `VITE_FOUNDRY_REDIRECT_URL` in `.env.production`; the other variables are filled in.
5. List what to sync in `src/syncConfig.ts` (`syncedObjectTypes`): object types, API names, or filtered `ObjectSetQuery` subsets.
6. Release with a git tag (`git tag 1.0.0 && git push origin tag 1.0.0`); Code Repositories builds and deploys.

**[Docs]** How it behaves:

- The **Lohi client is the default**. Reads and writes through `@osdk/react` go through the local cache, and writes apply **optimistically**.
- For an action that must reach live Foundry, wrap the subtree in `<StandardClientScope>` and use `useOnlineAction`.
- `SyncProvider` syncs on mount and every `10_000` ms in the template; `<SyncGate>` holds the UI until the first sync.
- Each sync loads **all** objects of each configured type. **Peering** syncs only differences: enable **Offline App Sync** on the object type in Ontology Manager, wait for the **Peering** index, then enable peering per type in `syncConfig.ts`.
- Sync only what users need offline; more objects mean slower first loads and more storage.

## Node.js versions in Foundry repositories

**[Docs]** Put an `.nvmrc` (for example `v24.13.0`) at the repository root and run `nvm install`. Without nvm, CI uses the version in `.jemma/settings.sh` and the Foundry development environment uses `18.20.8`. To make CI follow `.nvmrc`, set `NODE_INSTALLATION_VERSION` in `.jemma/settings.sh` to read it.

## For Kestrel

**[Example]** Two Kestrel apps, two paths:

- **The customer portal** is a backend service ([01](01-applications-scopes-and-restrictions.md#for-kestrel)), so Foundry **can't host it**: hosting is for client-facing apps only, and the portal serves non-Foundry customers through Kestrel's own login anyway. Kestrel runs it on its own infrastructure, bootstrapped from the back-end TypeScript quick start.
- **An offline dock checklist** for Kofi's warehouse staff at Accra, where the loading dock has poor signal, would fit the embedded Ontology: a client-facing app on a Foundry subdomain, syncing only today's `Shipment`s for that warehouse with a filtered `ObjectSetQuery`, with peering on. *Re-route shipment* would use `useOnlineAction`, because a re-route must not be applied optimistically from a stale copy. *Considered, not adopted*; the warehouse floor already has a mobile Workshop module ([Apps 11-02](../../Apps/11-kestrel-case/02-warehouse-floor-mobile.md)).

---
[Module index](README.md) · Previous: [01 — Applications, scopes and restrictions](01-applications-scopes-and-restrictions.md) · Next: [03 — Operating an application](03-operating-an-application.md)
