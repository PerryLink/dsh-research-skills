---
name: manuscript-preflight
description: Run the pre-submission checks a journal or committee will run: structure/declarations, statistics, meta-analysis arithmetic, citations and retractions.
whenToUse: The user is about to submit a manuscript, thesis or grant and asks "what will be flagged".
---

# Manuscript preflight

## Rules

- Report what was checked, what was not, and with which rule set.
- A checklist pass is not a quality verdict; say so.
- Keep the manuscript unchanged unless the user asks for edits.

## Steps

1. `manuscript_check` for structure, declarations, and the applicable reporting guideline starter items.
2. `statcheck` for reported t/F/chi-square/r/z values, df and p values.
3. `meta_analysis` when pooled effects are reported (effect sizes, Q, I², τ²).
4. `cite_verify` + `retraction_watch` for the reference list.
5. `image_integrity` for PNG panels where reuse/duplication is a concern; report only matched regions.
6. `research_report` the findings; hand the sealed record to the user.

## Output

- Findings grouped by check, each with a locator (section/page/claim).
- Explicit "not checked" list (e.g., JPEG images, figures not supplied).
- A short fix order: blocking → warning → optional.

## Never

- Do not claim a journal's acceptance criteria were met.
- Do not state that an image is manipulated; report repeated pixels only.
