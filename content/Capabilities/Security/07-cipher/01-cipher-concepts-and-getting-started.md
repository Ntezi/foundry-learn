# 01 — Cipher concepts and getting started

*Sources: [Cipher](https://www.palantir.com/docs/foundry/cipher/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/cipher/core-concepts/) · [Getting started](https://www.palantir.com/docs/foundry/cipher/getting-started/) · checked October 23, 2026 · Ready for Review*

A **decision sheet** in three parts: what Cipher is, which algorithm to pick, which licence to issue. Cipher text has appeared in the Ontology area as a property type ([05-01](../../Ontology/05-properties/01-properties-and-base-types.md)) and in [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) as a download control; this is the service behind both.

## What it is

**[Docs]** Cipher is "a service that allows users to obfuscate data using cryptographic operations (encryption, decryption, or hashing)". It sits **on top of** Foundry's own encryption in transit and at rest, as a tool for "privacy and governance protections in operational workflows". It's built so that people who don't code can use it. The privacy rule: "obfuscate identifiers when a workflow does not need the original values".

**[Concept]** Two resources, both visible in the file system:

| Resource | What it holds | Rule |
|---|---|---|
| **Channel** | The protocol: an encryption algorithm with its key parameters, or a hashing algorithm with its secret | The starting point; one algorithm per channel |
| **Licence** | Permission to use some of the channel's operations | Exactly **one parent channel** per licence. Anyone who can **view** the licence can use what it allows. Moving or sharing a licence changes who can use the channel |

**[Docs]** An encrypted value looks like `CIPHER::<channel-rid>::<encrypted-value>::CIPHER`, which is how the service knows which channel can decrypt it.

**[Explanation]** The licence is a Foundry resource, so **project roles** govern who can decrypt: give a group Viewer on a licence and they hold the capability wherever the licence's project grants it. That is both the convenience and the hazard. A licence that drifts into the wrong project, or a project whose default role is Viewer, has just handed out decryption.

## Choosing an algorithm

**[Docs]** Create a channel from *+ New > Cipher Channel* in a project, or from the Cipher application (*Platform Apps > Data Governance*). The algorithms:

| Algorithm | Kind | Same input → | Reversible? | Use when |
|---|---|---|---|---|
| **AES_GCM_SIV** | Probabilistic encryption | Different output each time | Yes | The data has **low cardinality or a well-known distribution**, to resist dictionary and statistical attacks |
| **AES_SIV** (AES-256-SIV) | Deterministic encryption | Same output | Yes | You need **joins or aggregations** on the encrypted values; the docs' recommendation for that |
| **SHA-256** / **SHA-512** with a pepper | Hashing | Same output (always deterministic) | **No** | Re-identification is never needed |
| **Visual Obfuscation** | Image scrambling | Same output | Yes | Portions of PNG images ([02](02-cipher-workflows.md#visual-obfuscation)) |

**[Docs]** "If your use case requires re-identification, we recommend using encryption."

**[Explanation]** Deterministic vs probabilistic is a trade between **usefulness and leakage**. Deterministic lets two datasets join on an encrypted customer ID without anyone decrypting; the price is that equal values look equal, so a column with twenty possible values (a country, a status) can be read off by frequency. Probabilistic hides frequencies and gives up joins. For an identifier with millions of distinct values, deterministic is safe and useful; for a category column, encrypt probabilistically or don't encrypt at all.

### Keys

**[Docs]** Per algorithm:

- **Encryption:** *Stretching key derivation* (recommended; the service derives a strengthened key from your secret, which the key button can generate), or *Single key* (no derivation; for an existing well-designed AES_SIV key, a 64-character base64 string).
- **Hashing:** a secret you generate yourself in a terminal, "minimum 14 characters and randomly generated", or the key button.
- **Visual obfuscation:** a long random number as the image-scrambling seed.

## Choosing a licence

**[Docs]** From a channel, *Create New Cipher License*; grant use by giving **View** on the licence. Three types, with their former names:

| | **Operational User** (formerly *Frontend*) | **Data Manager** (formerly *High Trust*) | **Admin** (formerly *Transforms*) |
|---|---|---|---|
| Scope | Individual values | Whole columns | Whole columns in code |
| Auditable at the **cell** level | Yes | No | No |
| Rate limit | Yes | No | No |
| Works in | Object layer (Workshop, Object Explorer), Functions | Pipeline Builder, Contour | Code Repositories |
| Grants access to the keys | No | No | **Effectively yes** |

**[Docs]** Each type has two permissions, encrypt/hash and decrypt, granted separately. Operational User licences can set a **rate limit** (operations per period; exceed it and you're blocked until the period resets) and can be allowed to **bypass checkpoints**, which is needed "in places where checkpoints cannot be shown, such as Functions or a direct API call"; use stays auditable and rate-limited. The Admin licence warning: "Allowing operations in Transforms effectively grants users access to the cryptographic keys. Ensure that access to this License is only granted to users with elevated permissions."

**[Explanation]** Read the three types as three audiences. The **Operational User** licence is for the person who needs one value, once, with a reason: it's the only one that records *which* value was revealed. The **Data Manager** licence is for the pipeline builder who encrypts a column without ever seeing a key. The **Admin** licence is for code, and code can print the key, which is why the docs treat it as key access. Nobody should hold an Admin licence for a workflow a Data Manager licence can do.

## The walkthrough, in one line each

**[Docs]** Upload the notional employee dataset; create a channel; issue a Data Manager licence with encrypt; in Pipeline Builder apply *Cipher encrypt* to `Employee_name`; add an object output keyed on `Employee_number` and see the names rendered inaccessible; issue an Operational User licence with decrypt and decrypt a value on the object. [02](02-cipher-workflows.md) has each step in full.

## For Kestrel

**[Example]** The plan asked whether `Payment` should carry a CipherText property for Tomás's fraud work. *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)), checked against Kestrel Pay's model policy ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md)) and the property table in [Ontology 05-01](../../Ontology/05-properties/01-properties-and-base-types.md):

- **One channel, `kestrel-pay-cards`, AES_SIV**, in `Kestrel Pay [Datasource]`. Deterministic, because fraud analysis needs to **count** payments per card without seeing card numbers; card numbers have high cardinality, so frequency leakage is not a concern.
- **One hashing channel, `kestrel-customer-hash`, SHA-256 with a pepper**, for the customer email in the Northwind shared projection ([Ontology 12-05](../../Ontology/12-security-and-governance/05-shared-ontologies-and-cross-org.md)): Northwind needs to match exceptions to Kestrel's records, never to read an address, so irreversibility is the point.
- **Licences:** a Data Manager encrypt licence in `Kestrel Pay [Datasource]` for the ledger pipeline; an Operational User **decrypt** licence in a new `Kestrel Pay [Licences]` folder inside `Payments [Ontology]`, viewable by Tomás's group only, rate-limited to **20 decryptions an hour**, not allowed to bypass checkpoints; **no Admin licence** issued at all: the ledger pipeline's tool isn't recorded in 17-02, and the proposal is that it encrypts in Pipeline Builder with the Data Manager licence so that nothing needs the keys. If a Python transform ever needs Cipher, that's a decision for `ontology-governance`, not a default.

---
[Module index](README.md) · Next: [02 — Cipher workflows](02-cipher-workflows.md)
