# 13 — Process PDFs

## Convert document layout into rows you can process

Select Articles, choose **Transform**, and name the new node **Process PDFs**. Inside it, the course chains four operations: extract PDF text, explode the resulting array with position, extract struct fields, and drop an unnecessary timestamp.

This is a representation change. The input identifies a document; the output makes page text and position available as ordinary columns. LLM processing becomes simpler once the content is text rather than an opaque file.

## Follow the actual transformations

1. Add **Extract text from PDF**. Use `mediaReference` as the media reference and name the output `content`.
2. Add **Explode Array with Position** on `content`, also naming its output `content`. Each array element becomes a separate row, with its position and element contained in a struct.
3. Add **Extract Many Struct Fields** on that struct. Extract `position` into `pageNumber`, and `element` into `content`, replacing the temporary struct with the text value.
4. Drop `timestamp`, which the course says is added during conversion and is not needed for this example. Close the node and inspect the selection preview.

Notice that `content` changes type: array, then struct, then text. Reusing a name does not mean its schema stays the same. The New/Replace indicator helps reveal when a transformation overwrites a column.

## An invented two-page example

Imagine one input document with extracted content `["Page A text", "Page B text"]`. Explosion yields two rows. Both retain the document context; one contains the first position and Page A text, the other the next position and Page B text. Extracting the struct fields makes these separately addressable columns.

The course maps the array position directly to `pageNumber`. It does not show an increment. Verify the actual index origin during practice before displaying a human-facing page citation. An array index and a printed page number are not automatically interchangeable; a PDF may also contain cover pages or printed numbering that differs from file order.

## Extraction quality affects every later model result

For scanned documents, the lesson says to switch the extraction method to **Full-page Scan**. A PDF can look readable to you while containing no useful embedded text for the default extraction. Conversely, extracted text can be nonempty but have broken reading order, repeated headers or mangled table content.

Inspect representative pages against the original PDF. Check a normal paragraph, a page with columns or a table, and any scanned content. A downstream summary cannot reliably reconstruct information that extraction omitted or reordered incorrectly.

Dropping timestamp is a simplification for the exercise, not proof that processing timestamps are useless. A production workflow may need source-version and processing provenance. Preserve that deliberately when the use case requires it; do not assume this tutorial records it all.

**Understanding check:** after this node, what does a row represent, and which columns let you find its source? It represents extracted page content associated with the original media item and its position. It is not yet a chunk, entity or verified scientific claim.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961888) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
