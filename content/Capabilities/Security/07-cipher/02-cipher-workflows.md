# 02 — Cipher workflows

*Sources: [Apply Cipher operations to columns of datasets](https://www.palantir.com/docs/foundry/cipher/apply-operations/) · [Decrypt individual values in Foundry applications](https://www.palantir.com/docs/foundry/cipher/decrypt-individual-values/) · [Use CipherText properties in Functions and Actions](https://www.palantir.com/docs/foundry/cipher/ciphertext-in-functions-and-actions/) · [Example Cipher use case](https://www.palantir.com/docs/foundry/cipher/example-use-case/) · [Add Cipher resources to a Marketplace product](https://www.palantir.com/docs/foundry/cipher/cipher-marketplace/) · [Use Cipher for visual obfuscation](https://www.palantir.com/docs/foundry/cipher/visual-obfuscation/) · checked October 23, 2026 · Ready for Review*

A **cookbook**: one recipe per place Cipher runs, each naming the licence it needs. Then the docs' reference pattern, which ties the recipes together, and the two edge cases (images, Marketplace).

**[Docs]** One rule for every recipe below: in **Preview** (Code Repositories or Pipeline Builder) you never see real Cipher output, only a placeholder; "Data will be encrypted at build time". Run a build to see the result.

## Recipe 1 — Columns in Pipeline Builder (Data Manager or Admin licence)

**[Docs]** Three transforms: **Cipher encrypt** (pick the column, a licence with encrypt, name the output column); **Cipher decrypt** (a column already encrypted by Cipher, a licence with decrypt **from the same channel** that encrypted it); **Cipher hash** (a licence with encrypt from a **hash** channel). There's also a shortcut: open a licence with encrypt, *Create Pipeline*, pick the dataset, folder and column, and Cipher generates the pipeline. **Only String columns** can be encrypted; cast first.

## Recipe 2 — Columns in Contour (Data Manager or Admin licence)

**[Docs]** Add a **Cipher board**; select columns (order doesn't matter), a licence, and *Encrypt*, *Decrypt* or *Hash*; values change, column names don't. The limit: "A Contour analysis path that uses a Cipher board cannot be saved as a dataset."

**[Explanation]** So Contour decryption is for **looking**, not for producing data. That's deliberate: a saved dataset of decrypted values would be plaintext under ordinary dataset permissions, outside Cipher's audit.

## Recipe 3 — Columns in Python transforms (Admin licence)

**[Docs]** Add `bellaso-python-lib` to `requirements.run` (or through the Libraries panel). Declare the licence as a transform input and call the column method:

| Operation | Input class | Method |
|---|---|---|
| Encrypt | `EncrypterInput(rid or path)` | `encrypter.dataframe().encrypt_column(col(...))` |
| Decrypt | `DecrypterInput(...)` | `decrypter.dataframe().decrypt_column(col(...))` |
| Hash | `HasherInput(...)` | `hasher.dataframe().hash_column(col(...))` |

**[Docs]** Since library version **0.75.0** the old `encrypt()`, `decrypt()`, `hash()`, `encrypt_all_matches()`, `hash_all_matches()`, `encrypt_image()` and `decrypt_image()` are deprecated in favour of the `_column` methods and `obfuscate_image()` / `deobfuscate_image()`; they still work, with warnings. In an **incremental** transform every encrypter, decrypter and hasher must be listed in `snapshot_inputs`. For contexts PySpark UDFs can't reach (nested functions, `F.transform()` over arrays) there are **string-level** methods: `encrypt_string`, `encrypt_all_matches_string(plaintext, regex)`, `decrypt_string`, `hash_string`, `hash_all_matches_string`. Encrypting on ingestion is done with the library in **external transforms**.

**[Explanation]** The `_all_matches` methods are the interesting ones: they encrypt every regex match inside free text, which is how you obfuscate card numbers or emails buried in a notes column without encrypting the whole note.

## Recipe 4 — One value in an object (Operational User licence)

**[Docs]** In Ontology Manager's *Properties* view, set the property's **type to Cipher text**, optionally its *Plaintext Type* (the pre-encryption type) and a *Default Encryption Cipher Channel* for edits to empty or unencrypted fields. CipherText properties use the **Encrypted Value renderer** in Workshop and Object Explorer; a user with a licence decrypts a value "after filling out a justification prompt" ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md): the *Cipher decrypt* checkpoint type).

**[Docs]** To let users correct an encrypted value, hook `updateAsync` to an **action** (Recipe 5). The alternative, the `cipher: editable` type class for in-line edits, "is not typically recommended": it needs Object Storage v1 and edits through API calls. The older *RID Renderer* trick for string properties is superseded by the CipherText type.

## Recipe 5 — Functions and actions (Operational User licence, bypass checkpoints)

**[Docs]** Functions need an Operational User licence, and if a checkpoint is configured for the operation the licence **must be allowed to bypass checkpoints**, because a function can't show a prompt. The page's `EncryptedCustomer` object (an encrypted `name`, a plain integer `id`) and two TypeScript functions:

```typescript
@Function()
public async decryptEncryptedCustomer(customer: EncryptedCustomers): Promise<string | undefined> {
  return await customer.name?.decryptAsync();
}

@OntologyEditFunction()
@Edits(EncryptedCustomers)
public async updateEncryptedName(customer: EncryptedCustomers, newName: string): Promise<void> {
  await customer.name?.updateAsync(newName);
}
```

**[Docs]** `decryptAsync()` returns the plaintext; `updateAsync()` re-encrypts and edits, so the function carries `@OntologyEditFunction()` and `@Edits(...)` like any editing function, and does nothing in preview.

**[Explanation]** This is the [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md) rule in miniature. The function's return value is plaintext with no Cipher wrapper; whoever can call the function gets the name. Cipher audits the decryption (cell-level, with the licence), but the audit stops at the function boundary, and the bypassed checkpoint means no justification was recorded. A decrypting function is therefore a resource to permission as tightly as the licence itself ([Ontology 09-02](../../Ontology/09-functions/02-query-functions-and-ontology-edits.md)).

## The reference pattern

**[Docs]** "Encrypt sensitive data by default, but allow operational users with legitimate purposes to selectively decrypt specific fields when they need it with an audit trail of actions." Six steps:

1. Channel in the landing project (where the marked data arrives).
2. **Admin** licence to an administrator.
3. Obfuscate the sensitive columns in Transforms and **unmark the minimized dataset**.
4. Reference the minimized dataset into the operational users' project.
5. A **decrypt Operational User** licence, moved into that project.
6. Ontology set up with encrypted-value rendering.

**[Explanation]** Step 3 is where this module meets module 02. The marking stopped at the minimized dataset is justified **only because** the sensitive columns are now ciphertext: the marking protected the plaintext, the channel protects the ciphertext, and the Operational User licence is the new, narrower, audited door. It's the `stop_propagating` procedure of [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#removing-a-marking) with encryption as the reason the column may stay.

## Visual obfuscation

**[Docs]** Scrambles the RGB values of pixels inside a polygon using the channel's seed; "This is not just an overlay; the pixels themselves are manipulated", and the operation is commutative and reversible. **PNG only** (lossless, so no artefacts), **Code Repositories only** (so the Admin licence needs *Grant cryptographic key access*), a Python transform with a media set input and output calling `obfuscate_image(image, polygons, ctx)`. For viewing [Beta]: back the images into an object with Pipeline Builder, back the polygons into another object (`polygonId`, `imagePath`, `cipherChannelRid` as `ri.bellaso.main.cipher-channel.<uuid>`, `polygon` as JSON coordinates, optional `label`), link them many-to-one, and Workshop's **Image Display** widget offers *Decrypt selected areas* to holders of a decrypt Operational User licence.

## Marketplace

**[Docs]** Channels and licences can be packaged as DevOps outputs (*Add files*). An installed channel "will maintain the same cryptographic algorithm, but will auto-generate a new cryptographic key"; an installed licence keeps its expiration date. Consider a schedule so the datasets built on the resources don't go stale.

**[Explanation]** The new key is the right behaviour and the trap at once: values encrypted in the source environment **cannot** be decrypted in the destination, because the destination's channel has a different key. A product that ships encrypted data alongside its channel ships data nobody can read.

## For Kestrel

**[Example]** The reference pattern applied to `kestrel-pay-cards` from [01](01-cipher-concepts-and-getting-started.md#for-kestrel), *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)): the ledger pipeline encrypts `cardNumber` with the Data Manager licence in Pipeline Builder (Recipe 1); `Payment.cardNumber` is a **CipherText** property with plaintext type string (Recipe 4); no decrypting function exists (Recipe 5 is *considered, not adopted*: Tomás decrypts single values in Object Explorer with the justification prompt, which is the audit trail the fraud team wants); any Workshop view of `Payment` for Lena's team ([17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications)) shows the ciphertext and offers no decryption; only Tomás's group holds the licence. Visual obfuscation is *considered, not adopted*: Kestrel's media sets are carrier invoice PDFs, not PNGs. If the Delivery Desk product ever ships to a second enrollment, the channel is **excluded** from the product and created by hand there, so no one expects shipped ciphertext to open.

---
[Module index](README.md) · Previous: [01 — Cipher concepts and getting started](01-cipher-concepts-and-getting-started.md) · Next module: [08 — Compass](../08-compass/README.md)
