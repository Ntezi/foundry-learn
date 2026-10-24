# 01 — Third-party applications in Control Panel

*Sources: [Third-party applications](https://www.palantir.com/docs/foundry/platform-security-third-party/third-party-apps-overview/) · [Manage third-party application configuration](https://www.palantir.com/docs/foundry/platform-security-third-party/manage-3pa/) · [Registering third-party applications](https://www.palantir.com/docs/foundry/platform-security-third-party/register-3pa/) · [Enabling third-party applications](https://www.palantir.com/docs/foundry/platform-security-third-party/enabling-3pa-access/) · [Authorizing third-party application access](https://www.palantir.com/docs/foundry/platform-security-third-party/authorizing-3pa-access/) · [Danger zone actions](https://www.palantir.com/docs/foundry/platform-security-third-party/danger-zone-actions/) · checked October 23, 2026 · Ready for Review*

An application's **lifecycle as the administrator sees it**: registered → enabled → authorized → (rotated, deleted). [DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md) covers the same lifecycle from the developer's chair in Developer Console; this note is the Control Panel view, and the distinction between the two is the first thing to get right.

## Which interface

**[Docs]** Every one of these pages opens with the same sentence: "Users should use Developer Console to manage their application configuration. The Control Panel view only applies if Developer Console has not been enabled for the user." Third-party authorization is OAuth 2.0. Permissions "should be managed by Foundry administrators"; the Control Panel interface lists registered applications and enabled ones, and lets administrators register, manage, enable and disable. Reaching it: *Open other workspaces > Control Panel*, pick the enrollment and organization, then *Third-party applications* under *Organization Settings*; it needs the **Third-party application administrator** role for that organization.

**[Explanation]** So two things are true at once. The **concepts** on these pages (client types, grants, enablement, project and marking restrictions, danger-zone actions) are the platform model, and Developer Console implements them. The **screens** described are the older ones, shown to users without Developer Console. Read for the model; expect the clicks in DevTools 02-01.

## Stage 1 — Registered

**[Docs]** Registration "creates a name, a client ID, and a client secret", plus a redirect URL, description and icon. The wizard has four steps: *Details*, *Client type*, *Authorization grant types*, *Summary*. The **managing organization** is the one the application was created in; anyone there with *Manage OAuth 2.0 clients* can manage it, and decides through **application discovery settings** which other organizations can see and use it.

| Client type | Can hold a secret? | Grants | Why |
|---|---|---|---|
| **Confidential** | Yes: "a client implemented on a secure server with restricted access to the client credentials" | Authorization code; client credentials | |
| **Public** | No: "a browser-based application where the authorization client runs on the web browser itself" | Authorization code **with PKCE** only (`code_verifier` and `code_challenge` required); no client credentials | "Secrets in distributed binaries can be extracted to impersonate users": a native or single-page app's binary can be disassembled |

**[Docs]** Enabling the **authorization code grant** requires at least one **redirect URL** (editable later): OAuth2 returns the user by browser redirect, so a fixed list of destinations "helps provide additional security". Enabling the **client credentials grant** (confidential only) **creates a service user** for the application, which can then be permissioned. The client secret is shown **once**; lose it and the only option is rotation (below).

**[Docs]** "Registration alone does not make the application usable."

## Stage 2 — Enabled

**[Docs]** Enablement is **per organization**, and never automatic: the registering organization must enable its own application too, and other organizations may enable applications managed elsewhere. Needs *Manage OAuth 2.0 clients* and the application discoverable to your organization. Settings are under *Actions > Enablement settings*.

**[Docs]** Disabling is "not a simple on and off toggle": re-enabling repeats the enablement workflow and **every user must reauthorize**.

Three scoping settings, all for the **authorization code** grant (that is, when the app acts as a user):

| Setting | **[Docs]** rule | **[Docs]** recommendation |
|---|---|---|
| **Project access** | The app reaches "the intersection between the Projects that the authorizing user can access and the Projects that are specified" | Leave **Unrestricted** |
| **Marking restrictions** | The intersection of what the user can access and the markings listed; "unmarked resources may still be utilized unless the user is denied access to them" | Leave **Unrestricted** |
| **Organization level consent** (advanced) | Authorizes the app for **all** the organization's users; they skip the OAuth2 flow and "will not be notified" | **Don't enable** "unless your use case explicitly requires it", so each user reviews what they grant |

**[Explanation]** Why the docs recommend *Unrestricted* twice: the user's own permissions are already the ceiling, and the Developer Console model has a sharper tool, **application restrictions and scopes** ([DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#restricted-or-unrestricted)), which bound what the token can do regardless of the user. Enablement-level project and marking lists are a blunter, older mechanism. Organization-level consent is the one setting here that **removes** a safeguard; it belongs to applications the organization itself operates for everyone, not to anything a vendor supplies.

## Stage 3 — Authorized

**[Docs]** With the app registered and enabled, the user clicks the app's *Connect*, lands on a Foundry confirmation screen listing "the set of operations for which the third-party application is requesting permissions" (chosen by the app's author), and picks *Allow* or *Don't allow*. Authorized apps appear under *Settings > Authorized Applications*; *Details* shows what the app can access, *Revoke* removes it (the app can be authorized again later).

**[Explanation]** This screen is the user-facing half of least privilege. The app author decides what to ask for; the user decides whether that's reasonable for what the app claims to do. [03 — API guidance](03-third-party-application-and-api-guidance.md) is the contract that makes the author ask for the minimum.

## Stage 4 — Danger zone

**[Docs]** Two irreversible actions at the bottom of *Manage application*, each behind a warning dialog:

| Action | Effect | When |
|---|---|---|
| **Rotate secret** (confidential clients only) | The old secret stops working everywhere; "every user to set up the application again" | "only be done if the secret has become compromised or lost" |
| **Delete registration** | The app is unusable for everyone; re-registering counts as a **new** registration, so every user reauthorizes | To permanently stop authorizations |

**[Explanation]** Rotation's blast radius is the reason DevTools 09-01 keeps the portal's secret in the backend's secret store with a scheduled rotation owned by one person: a rotation nobody planned for is an outage.

## For Kestrel

**[Example]** Kestrel's two external applications are the **customer delivery-status portal** (backend service, client credentials, a service user) and the **support portal** ([17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications), [DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md)). What this module adds, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- Both are **managed by the Kestrel organization** and **not discoverable** to Northwind; neither is enabled for Northwind's organization. If Northwind ever needs the delivery-status feed, it gets its own application under Northwind's management.
- **Organization-level consent off** for both. The support portal acts as its staff users through the authorization code grant; each support agent authorizes it once and can revoke it.
- Enablement **project and marking restrictions unrestricted**, as the docs recommend, because the portal application is already a **restricted** Developer Console application ([DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#for-kestrel)) with its own resource list; the sharper control is already in place.
- The **Third-party application administrator** role is held by the platform administrators group only. Daniel manages the portal's registration through a custom Developer Console role limited to that application ([DevTools 02-01](../../DevTools/02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#who-can-do-what-in-developer-console)), not through Control Panel.

---
[Module index](README.md) · Next: [02 — OAuth2 clients and user-generated tokens](02-oauth2-clients-and-user-generated-tokens.md)
