# 05 — Code scanning

*Sources: [Code scanning](https://www.palantir.com/docs/foundry/security/code-scanning-overview/) · [Enable code scanning](https://www.palantir.com/docs/foundry/security/enable-code-scanning/) · [Manage code scanning rules](https://www.palantir.com/docs/foundry/security/manage-code-scanning-rules/) · checked October 23, 2026 · Ready for Review*

A short **setup note**: what the scanner is, the three-level switch that decides which repositories it covers, and the rule file format. It closes module 10 because it's the one enterprise-security control an application developer meets every day, in Checks.

## What it is

**[Docs]** Code scanning is "a static analysis tool integrated into our continuous-integration system, Jemma", run **on every commit, before checks**, for vulnerabilities, code smells and coding standards, across multiple languages. Findings appear in **Checks** with severity levels, and a JSON report can be downloaded (*Checks > the build > Code scan > Download scan report*). A default set of **SAST** rules applies; administrators can turn rules off and add their own.

**[Docs]** Two **scan modes** decide what findings do: **Error** (checks fail; "The user is required to fix the issues and re-run checks") or **Warn** (checks proceed; "detected vulnerabilities will be ignored").

**[Explanation]** Warn mode is a reporting tool, not a control: the docs' own wording is that findings are *ignored*. If the intent is that no vulnerable commit reaches a protected branch, the mode must be Error, and then the rule set has to be good enough that developers don't learn to route around it.

## Which repositories

**[Docs]** Enabled by an **enrollment administrator** in Control Panel (*All Settings > Security & Governance > Code scanning*), with an enrollment-wide toggle and overrides resolved most-specific first:

| Precedence | Setting | Effect |
|---|---|---|
| 1 | **Repository** overrides: *Always scan* / *Never scan* repositories | Wins over everything |
| 2 | **Project** overrides: *Always scan* / *Never scan* projects | Every repository in the project, unless a repository override says otherwise |
| 3 | **Enrollment-wide** toggle | Everything no override covers |

**[Docs]** The page's example: a project in *Never scan* with one repository in *Always scan* means only that repository is scanned. An *Always scan* entry is honoured even when the enrollment toggle is off.

## Rules

**[Docs]** Every scan applies rules; a rule is "one pattern to look for, the message to show when that pattern is found, and how severe the finding is". Managed **per enrollment**, so a change reaches every covered repository.

| Type | Can you… |
|---|---|
| **Built-in** (Palantir maintains and updates) | Enable, disable, duplicate, download. Not edit or delete: to change one, duplicate it, edit the copy, disable the original |
| **Custom** | Enable, disable, duplicate, download, edit, delete |

**[Docs]** Rules use **Semgrep** syntax: exactly one rule per definition, an `id` of letters, numbers, periods, underscores and hyphens that is unique among custom rules (it may reuse a built-in name), validated on save. A new custom rule is **enabled as soon as it is saved**; disabling asks for confirmation and takes effect from the next scan, without removing earlier findings; deletion is permanent. Rules can be downloaded as `.yml` and uploaded from `.yml` or `.yaml`. The example:

```yaml
rules:
  - id: custom_python_no-eval
    languages:
      - python
    message: |
      Avoid eval() on untrusted input. Use ast.literal_eval() to evaluate literal values.
    severity: WARNING
    metadata:
      category: security
    pattern: eval(...)
```

**[Docs]** Rules decide what is reported; the enablement settings decide what is scanned. "If every rule is disabled, scans still run and complete with no findings."

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Enrollment-wide on, Error mode**, with `Delivery Desk [Workflow]`'s repositories in *Always scan* as belt and braces, and no *Never scan* entries: the only argument for one would be a vendor repository Kestrel can't change, and there isn't one.
- **Two custom rules** beyond the built-in set: one flagging the shape of a Foundry user-generated token in any file (the spill rule promised in [05-02](../05-third-party-applications-and-tokens/02-oauth2-clients-and-user-generated-tokens.md#for-kestrel) and [03](03-protecting-identity-tokens-phishing-and-files.md#tokens)), and one flagging `stop_propagating` or `stop_requiring` in a transform so that the pull request review knows a mandatory control is being lifted ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking), [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md#the-step-that-moves-data-stop-requiring-the-organization)); severity `WARNING` for the second, because the call is sometimes right and the review is the control.
- Rule changes are made by the platform administrators and announced to Priya's and Daniel's groups, since a rule enabled on save fails the next commit everywhere.

---
[Module index](README.md) · Previous: [04 — Infrastructure security and disaster recovery](04-infrastructure-security-and-disaster-recovery.md) · Next module: [11 — Kestrel case](../11-kestrel-case/README.md)
