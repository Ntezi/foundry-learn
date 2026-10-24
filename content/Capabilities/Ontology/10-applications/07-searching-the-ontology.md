# 07 — Searching the Ontology

*Sources: [Understanding text search](https://www.palantir.com/docs/foundry/object-explorer/understanding-text-search/) · [Object Explorer search syntax](https://www.palantir.com/docs/foundry/object-explorer/search-syntax/) · [Ontology search syntax (regex)](https://www.palantir.com/docs/foundry/ontology/search-syntax/) · [Search for objects](https://www.palantir.com/docs/foundry/object-explorer/search-objects/) · [Filter results](https://www.palantir.com/docs/foundry/object-explorer/filter-results/) · [Render hints](https://www.palantir.com/docs/foundry/object-link-types/metadata-render-hints/) · checked October 3, 2026 · Ready for Review*

Keyword search in Foundry isn't `LIKE '%term%'`. It matches **tokens**, and the tokens are decided when the property is **indexed**, not when you search. Most "search is broken" tickets come from that one fact. This note is a **search lab**: six Kestrel values, the queries people actually typed, and why each one matched or didn't. The rules come after the lab. Semantic (meaning-based) search is a different mechanism, covered in [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md).

## The one idea: analyzers

**[Docs]** When a string property is indexed for search, its value goes through an **analyzer**. The default, the **standard analyzer**, splits text into tokens at whitespace and punctuation and lowercases them. `The Quick Brown Fox` is stored as `the`, `quick`, `brown`, `fox`. A search then matches **query tokens against stored tokens**.

| Analyzer [Docs] | Splits on | Case | `Trail-Runner 2 Shoe` becomes |
|---|---|---|---|
| **Standard** (default) | Whitespace and punctuation | Lowercased | `trail`, `runner`, `2`, `shoe` |
| **Simple** | Any non-letter; digits and punctuation dropped | Lowercased | `trail`, `runner`, `shoe` |
| **Not analyzed** | Nothing: the whole value is one token | Kept | `Trail-Runner 2 Shoe` |
| **Whitespace** | Whitespace only | Kept | `Trail-Runner`, `2`, `Shoe` |
| **Language** | Language rules, with stemming and stop words | Lowercased | *(English)* `trail`, `runner`, `2`, `shoe`; and `Running quickly` → `run`, `quick` |

- **[Docs]** Language analyzers exist for English, French, German, Japanese, Korean, Arabic, and combined Arabic–English.
- **[Docs]** The analyzer is set per property, in Ontology Manager under the property's **search configuration**. The property needs the **Searchable** render hint to be searchable at all.
- **[Docs]** The standard analyzer keeps **underscores and periods inside a token**. `banana_pudding` and `user.name` are one token each.
- **[Explanation]** The Simple, Whitespace and Language results for `Trail-Runner 2 Shoe` are worked out from the docs' definitions, not shown in the docs; the docs' own examples are `The Quick-Brown Fox` and `Running quickly`. In particular, whether the English stemmer leaves `runner` unchanged is untested.

## The lab

Six values from Kestrel's Ontology, all on the **standard** analyzer unless noted.

| # | Value | Property |
|---|---|---|
| V1 | `Ama Mensah` | `Customer.fullName` |
| V2 | `Trail-Runner 2 Shoe` | `Product.name` |
| V3 | `WH_ACC_01` | `Warehouse.code` |
| V4 | `DHL Express` | `Carrier.carrierName` |
| V5 | `JD0146000062` | `Shipment.trackingNumber` (**not analyzed**) |
| V6 | `Parcel left with neighbour at no. 14` | `ShipmentEvent.note` (**English language** analyzer) |

| Who | Where | Query | Matches? | Why |
|---|---|---|---|---|
| Ama | Object Explorer global search | `ama mensah` | V1 **and** every object with "ama" or "mensah" anywhere | **[Docs]** Words are searched independently with **OR** in the global bar |
| Ama | same | `"ama mensah"` | V1 | **[Docs]** Quotation marks make a phrase search |
| Kofi | same | `runner` | V2 | The hyphen split `Trail-Runner` into `trail`, `runner` |
| Kofi | same | `run` | ✗ | **[Docs]** A partial word isn't a token. `rown` doesn't match `brown`. Use `run*` |
| Kofi | same | `ACC` | ✗ | **[Docs]** The underscore keeps `wh_acc_01` as **one** token |
| Kofi | property filter on `Warehouse.code` | `*acc*` | ✗ | **[Docs]** Leading-and-trailing wildcards together (`*term*`) are not supported anywhere |
| Kofi | property filter on `Warehouse.code`, *Starts with* | `wh_acc` | V3 | Prefix search equals `wh_acc*` |
| Daniel | Workshop Filter List, *All* mode | `DHL*` | ✗ | **[Docs]** Wildcard queries are **not analyzed**, so case must match the lowercase tokens. `dhl*` works |
| Daniel | same | `dhl exp*` | ✗ | **[Docs]** A wildcard query containing a space can't match, because each token is one word |
| Ama | property filter on `Shipment.trackingNumber`, *Exact* | `JD0146000062` | V5 | Not analyzed: the whole value is one token, matched as-is |
| Ama | Workshop object set filter variable, CONTAIN | `JD0146` | V5 | **[Docs]** CONTAIN on a filter variable is **prefix-only** matching |
| Ama | same | `0146000062` | ✗ | Doesn't start at the beginning of the value |
| Tomás | property filter on `ShipmentEvent.note` | `neighbours` | V6 | **[Explanation]** The English analyzer stems both the value and the query, so plurals meet. The docs show stemming (`Running` → `run`) but not this exact pair |
| Lena | global search | `quikc~` | anything with `quick` | **[Docs]** `~` is a fuzzy match |

**[Explanation] What Kestrel changed after the lab:**

- `Warehouse.code` moved to **Not analyzed**. Codes are looked up whole, never by word. People who need a part of a code use a Workshop Filter List in **Regex** mode (below).
  - **The cost:** not analyzed keeps the original case, and prefix and wildcard queries are compared letter for letter. Kofi's *Starts with* `wh_acc` from the lab stops matching; he now types `WH_ACC`. Kestrel added that to the warehouse team's search tips.
- `Shipment.trackingNumber` stays **Not analyzed**. Agents paste whole numbers.
- `ShipmentEvent.note` uses the **English** analyzer, because notes are prose.
- Names stay on **Standard**.

## The rules, by surface

**[Docs]** Which search features each surface supports:

| Capability | Object Explorer global bar | Object Explorer property filter | Workshop Filter List | Functions API (TSv1) |
|---|---|---|---|---|
| Token search | Yes | Yes | Yes | Yes |
| Phrase | `"…"` | No | *Exact* mode | `.phrase()` |
| Prefix | `term*` | *Starts with* | *All* mode | `.phrasePrefix()`, `.prefixOnLastToken()` |
| Leading wildcard `*term` | No (but see RQ-29) | Yes, with a render hint | No | No |
| Wildcards `*`, `?` | Yes | No | *All* mode | No |
| Fuzzy | `~` | No | No | `.fuzzyMatchAnyToken()`, `.fuzzyMatchAllTokens()` |
| Boolean | `AND`, `OR`, `NOT` | No | *Advanced* mode | `Filters.and/or/not()` |
| Regex | No | No | *Regex* mode | No |

### Object Explorer

- **[Docs]** The global bar searches **objects, object types, and artifacts** (saved explorations, lists, comparisons and modules) across the platform. **Hidden** object types and properties never appear.
- **[Docs]** Object results put **prominent** object types first. Within each group, the type with the **fewest** results comes first.
- **[Docs]** Syntax: phrases in quotes; `AND`, `OR`, `NOT` with parentheses, e.g. `("yellow cab" OR "green cab") AND (NOT Manhattan)`; `?` for one character; `*` for zero or more; `~` for fuzzy.
- **[Docs]** Inside an exploration, a **keyword** filter can apply to all properties ("Has keywords") or to one. By default it matches exact words, not prefixes or suffixes. The modifiers are *Is not*, *Starts with* (`term*`) and *Exact* (the whole phrase, spaces included).
- **[Docs]** Filters also work across **links**: *Has link* (or doesn't), a linked object's property, or links to specific objects.

### Workshop

- **[Docs]** The **Filter List** keyword search has five modes:
  - *All* (token, wildcard and prefix matching);
  - *Any*;
  - *Exact* (all tokens as an ordered phrase);
  - *Advanced* (Boolean syntax);
  - *Regex*.
- **[Docs]** The **Exploration Search Bar** widget uses the same engine and syntax as the Object Explorer global bar.
- **[Docs]** **Object set filter variables** support CONTAIN, which is prefix-only.

### Functions

- **[Docs]** TSv1 string filters give the finest control: `.exactMatch()`, `.phrase()`, `.phrasePrefix()`, `.prefixOnLastToken()`, `.matchAnyToken()`, `.matchAllTokens()`, and the two fuzzy variants. `.phrase()` doesn't cross underscore or period boundaries.
- **[Explanation]** The page documents only the TSv1 API. The equivalent filters for TSv2, Python and the OSDK live in the OSDK documentation, which **no note covers yet**. It's on the list for the OSDK sidebar coverage check ([docs index](../99-reference/docs-index.md)).

### Regex

- **[Docs]** Regex search needs the **Enable regex queries** render hint (with *Searchable*). The regex page's introduction names both Workshop's Filter List and Object Explorer's search bar as places to search; the comparison table lists regex only for the Filter List. **[Recommendation]** Plan on the Filter List.
- **[Docs]** Patterns match the **whole value**, not a substring: `cat` doesn't match `concatenate`; use `.*cat.*`. `^` and `$` aren't supported because they're implied.
- **[Docs]** Supported: `.`, `?`, `+`, `*`, `{n,m}`, `|`, `()`, `[]` with ranges and `[^…]`, `"…"` for literal strings, and `\d \D \s \S \w \W`. Escape a literal dot as `\.`.

## Configuration checklist

Render hints that affect search, from the docs' render hint table. Each **adds a raw index** and **needs a reindex** to take effect.

| Hint | Effect | Needs |
|---|---|---|
| **Searchable** | The property can be searched at all. Turning it off speeds indexing, "especially" for large strings | — |
| **Selectable** | Aggregation (histograms, charts) and the **Exact Match** filter | Searchable |
| **Sortable** | Sorting on strings | Searchable |
| **Low cardinality** | Tells apps there are few values | Searchable |
| **Enable leading wildcards** | `*term` in property filters | Searchable |
| **Enable regex queries** | Regex search | Searchable |

- **[Recommendation]** Every hint costs index work. Kestrel turns **Searchable off** for long technical fields nobody searches (raw payloads, JSON blobs) and turns leading wildcards and regex **on** only where a real workflow asked for them.
- **[Docs]** [Derived properties](../05-properties/05-derived-properties.md) can't be used in text search or keyword filters.
- **[Docs]** The render hint and text-search pages still describe reindexing "into Object Storage v1 (Phonograph)". **[Explanation]** On OSv2, a hint change still triggers reindexing; the wording is another OSv1-era page (RQ-23).

## Sources disagree

- **RQ-29.** *Object Explorer search syntax* lists leading wildcards (`*smith`) among the global search bar's syntax, given the render hint. *Understanding text search* says leading wildcards are **not** supported in the global bar, only in property filters. The table above follows the more detailed page.

---
[Module index](README.md) · Previous: [06 — Automate and Ontology events](06-automate-and-ontology-events.md) · Next module: [11 — Design](../11-design/README.md)
