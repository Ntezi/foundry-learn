# 03 — Protecting identity, tokens, phishing and files

*Sources: [Protecting identity](https://www.palantir.com/docs/foundry/security/single-sign-on-security/) · [Protecting tokens and API keys](https://www.palantir.com/docs/foundry/security/protect-tokens-api-keys/) · [Protecting against phishing](https://www.palantir.com/docs/foundry/security/protect-phishing/) · [Protecting against malicious files](https://www.palantir.com/docs/foundry/security/protect-malicious-files/) · checked October 23, 2026 · Ready for Review*

Four pages on the **customer's half of the shared responsibility model** ([00-01](../00-orientation/01-the-security-map.md)): identity, credentials, the humans who hold them, and the files they upload. Written as **a hardening checklist**, because that's what the pages are, with the one Foundry-specific fact on each page pulled out so it isn't lost among the generic advice.

## Identity

**[Docs]** Foundry makes MFA **mandatory**; if your identity provider does it, it must be strong. The page's preference order: connected hardware tokens (FIDO2 keys, CAC smartcards), disconnected OTP generators, software authenticator apps (OTP preferred to push), biometrics. **Not** strong: SMS and email OTPs, click-a-link two-step, security questions; "should be disused". Foundry "intentionally mandates a relatively short maximum session lifetime" so sessions re-authenticate; keep the identity provider's session tokens short too. Zero-trust practices: no trust from weak signals (machine certificates, single factor, network location), no exemptions, recent strong MFA for sensitive resources, device health attestation, re-authentication on unusual activity.

**[Docs]** **Service accounts** get their own section, because they "often have broadly-permissive access to sensitive data, and tend to be poorly secured": shared among people, no MFA, credentials never rotated when people leave, tokens hardcoded. The practices: each one documented with a named owner and periodic review; IP-restricted at the identity provider; MFA where possible; credentials in a PAM solution with multi-party access; rotation on team changes; strict monitoring.

**[Docs]** **Central Auth** is a Palantir-managed Microsoft Entra ID identity provider for customers without their own; integrated as a SAML realm; provisioning managed by Palantir, groups and markings still by you; strong passwords and MFA required; re-authentication on suspicious behaviour; accounts unused for **30 days** "may be disabled without notice".

**[Explanation]** Two of these land directly on earlier notes. The service-account practices are the operating procedure for every service user in [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md) and [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#for-kestrel); and the 30-day Central Auth disablement is a second, harsher cousin of the 30-day inactivity rule ([01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#situation-my-token-stopped-working-after-a-holiday)): inactivity invalidates tokens and a login fixes it; Central Auth can disable the account.

## Tokens

**[Docs]** Three kinds:

| Token | What it is | Lifetime | Fact to remember |
|---|---|---|---|
| **User-generated** (personal access token) | An API key with user-level access to every application | The TTL set at creation; revoked when it expires | "unable to generate other user-generated tokens"; only a session token can create one |
| **Session** | The browser cookie `PALANTIR_TOKEN` | Default **16 hours** | Revoke it by logging out |
| **Data connector coordinator** | Authenticates a data connector agent | Time-bound, inserted into the deployment tarball at creation | The tarball "should be treated as sensitive"; stored in `{BOOTVISOR_DIRECTORY}/var/data/coordinator-token.json`; an agent configured with source credentials may cache them locally |

**[Docs]** Practices: never share or post tokens; environment variables locally; dotfiles out of version control; never in command-line arguments or hardcoded; revoke the unused; reasonable TTLs; no browser cookie-sync across devices; few browser extensions. A **spill** (a token on an unauthorized system, such as a public repository) "should be treated as an information security incident": disable the token, then tell Information Security. Palantir's **GitHub token revocation service** watches public GitHub for spilled Foundry tokens and tries to revoke them, but "is unable to notify you", and can't reach installations that aren't network-accessible to it.

**[Explanation]** The "no command-line arguments" rule exists because process lists and shell history are readable; the "no cookie sync" rule because a synced `PALANTIR_TOKEN` is a session on every device the browser account touches. And the revocation service is a safety net, not a control: a developer whose token was revoked silently sees a 401 and may simply mint a new one, having learned nothing, which is why the code-scanning rule in [05](05-code-scanning.md) matters.

## Phishing

**[Docs]** "the most common attack vector". Controls, all on the customer side: **MFA** for everyone; **ingress controls** ("strict IP allowlisting as a defense-in-depth control"), mirrored in the SSO's own controls; **conditional access** policies where the identity provider supports them, such as requiring device management when IP restriction isn't feasible; an **SSO** solution (Palantir may provide one); and **operational security** training: password hygiene, recognising `palantirfoundry.com` against fraudulent domains, recognising real platform emails.

## Malicious files

**[Docs]** Foundry "does not place blanket restrictions on uploading of certain potentially risky files or filetypes, such as executables"; instead the upload path is hardened: binary execution restrictions on upload endpoints, process isolation for the upload service, file size limits on front-end imports. The customer side: reputable, up-to-date antimalware with periodic and real-time scanning across the whole IT footprint, Foundry included, and the browsers' native malware protection enforced.

**[Explanation]** So the upload controls in [08-02](../08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md#rule-3--uploads-are-ingestion-with-the-same-questions) are about **data** (what's in the file, where it lands, who's told); this page is about the **file as an object** (can it run, can it spread). Foundry answers the second inside the platform; the customer answers it on the workstation the file came from.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), recorded as operating rules in 17-02 §7 rather than as platform configuration:

- **Service-account register:** one row per service user (the portal's, the nightly export's, `kestrel-audit-reader`), with owner, purpose, rotation date and the IP range it may authenticate from; reviewed quarterly with the marking memberships ([06-01](../06-approvals-and-checkpoints/01-approvals.md#for-kestrel)). Credentials live in Kestrel's PAM, which DevTools 09-01 called *the backend's secret store*.
- **MFA:** hardware keys for the platform administrators, the Data Governance Officers and anyone with *Manage permissions* on a marking; authenticator apps for everyone else; no SMS. The proposals in [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#for-kestrel) assume Kestrel's own identity provider (17-02 doesn't name one), so Central Auth is *not adopted*; if that assumption is wrong, Central Auth is the fallback the page offers.
- **Ingress:** Kestrel's office and VPN ranges allow-listed, plus Northwind's for the shared space ([04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md#for-kestrel)), with the same list mirrored in the identity provider's conditional access.
- **Token spill procedure:** revoke, then tell Information Security, then rotate anything the token could have reached; a spilled *application* secret is a danger-zone rotation ([05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md#stage-4--danger-zone)) and an incident, never a quiet fix.
- **Uploads:** only from managed workstations with endpoint protection, which is the identity provider's device-posture check doing double duty.

---
[Module index](README.md) · Previous: [02 — Audit logs](02-audit-logs.md) · Next: [04 — Infrastructure security and disaster recovery](04-infrastructure-security-and-disaster-recovery.md)
