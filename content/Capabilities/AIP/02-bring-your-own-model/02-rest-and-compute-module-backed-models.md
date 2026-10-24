# 02 — REST- and compute-module-backed models

*Sources: [Models backed by REST API sources](https://www.palantir.com/docs/foundry/aip/rest-api-backed-models/) · [Models backed by compute modules](https://www.palantir.com/docs/foundry/aip/compute-module-backed-models/) · [Bring your own model to AIP](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) · checked October 8, 2026 · Ready for Review*

Both sources end in the same place: a model in the **Registered models** tab of every supported model selector. They differ only in what you build before registration. This note puts the two procedures side by side, so the shared part is visible once.

## Before registration

| | REST API source | Compute module |
|---|---|---|
| **Use when** | **[Docs]** The model already exposes a standard provider API (the recommended path) | **[Docs]** You host the server yourself, or you need a proxy layer ([03](03-self-hosting-and-proxy-layers.md)) |
| **Build** | **[Docs]** In Data Connection: *New source → REST API* for your provider's endpoint | **[Docs]** A container whose API conforms to a supported provider format; vLLM and Ollama do so by default |
| **Connection** | **[Docs]** Domain base URL, authentication method and port | **[Docs]** A `LABEL application.port='8000'` (your port) in the Dockerfile |
| **Must switch on** | **[Docs]** *Enable exports to this source* **and** *Enable exports to this source without markings validations* | **[Docs]** Minimum replicas **at least one** |
| **Where it lives** | **[Docs]** A source location where you keep Owner or Editor | The compute module's project |

**[Explanation]** Two settings in that table are easy to miss and both fail quietly:

- **The export toggles.** A model call sends data *out* to the source. Without the exports toggles, there is no permitted path for that data.
- **Minimum replicas ≥ 1.** **[Concept]** A service that scales to zero has to start before it can answer; an LLM server with large weights can take minutes. The docs require at least one replica.

## Registration: the shared part

**[Docs]** In Control Panel → **AIP settings** → **Registered models** → **Register a model**, as an Enrollment administrator:

| Step | REST API source | Compute module |
|---|---|---|
| 1. Source | Pick the REST source RID | Pick the compute module |
| 2. Model details | Provider name, model name, API endpoint path (*Configure source API*, *Model API configuration*) | **Model ID**: the name your inference server expects |
| 3. Capabilities | Declared **per endpoint** | Declared for the model |
| 4. Data access policy | Optional; unset means the enrollment policy applies; set means it **replaces** it | Same |
| 5. Rate limits | Enrollment limit (requests or tokens per minute) and user limits; required | Same |
| 6. Enable access | For the whole enrollment or specific groups | Same |

**[Docs]** "The capabilities you declare determine which AIP features the model can power." Enabling **Reasoning**, **Structured outputs** and **Tool calling** is what lets **AI FDE** and **AIP Analyst** use the model.

**[Explanation]** The docs present capabilities as something you **declare**; they don't describe any check that the model really supports them. A model declared as tool-calling that handles tools badly would likely show up as poor agent behaviour rather than as a configuration error. Test each declared capability with an Evals suite ([04](../04-aip-evals/README.md)) before enabling the model for everyone.

## Rate limits, in numbers

**[Docs]** Registered models use the same rate-limit system as Palantir-provided models:

```text
Enrollment limit          e.g. 600 requests/min      ← set by the administrator at registration
  └─ each project         70% of that by default     ← changeable in Resource Management
                          = 420 requests/min           (AIP usage and limits tab)
User limit                per person, in AI FDE, AIP Analyst and other user-attributed apps
```

The 600 is our **[Example]**; the 70 percent default is from the docs.

**[Explanation]** Because every project defaults to 70 percent, two busy projects can't both run at their full default share at the same moment. The default is a ceiling per project, not a reservation.

## After registration

- **[Docs]** The model appears under **Registered models** in the model selector of every supported application.
- **[Docs]** Usage and rate limits show in Resource Management, but costs don't: your provider bills you, or for a compute module you pay for the compute ([01](01-choosing-a-byom-path.md#three-facts-that-change-the-design)).
- **[Docs]** The model can be disabled at any time in Control Panel.

## Checklist for the request to your administrator

**[Recommendation]** What Daniel sends when asking for Kestrel Pay's model to be registered:

- [ ] Source: compute module `kestrel-pay-llm` (or REST source RID), and who owns it
- [ ] Model ID or model name and endpoint path
- [ ] Capabilities to declare, with the Evals run that shows each one works
- [ ] Data access policy: which markings this model may see, and confirmation it should replace the enrollment policy for this model only
- [ ] Enrollment and user rate limits, with the expected peak (drafts per minute × requests per draft)
- [ ] Groups to enable: Kestrel Pay builders first, then Lena's team

---
[Module index](README.md) · Previous: [01 — Choosing a bring-your-own-model path](01-choosing-a-byom-path.md) · Next: [03 — Self-hosting and proxy layers](03-self-hosting-and-proxy-layers.md)
