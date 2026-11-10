---
name: reviewer-response
description: Turn reviewer comments into a numbered, evidence-backed response letter with no unanswered or overclaimed point.
whenToUse: The user received reviewer comments and needs a point-by-point response or rebuttal.
---

# Reviewer response

## Rules

- Every reviewer comment gets a number and an answer; "we disagree" is an answer, silence is not.
- A response that cites a change must say where the change is (section/page/line).
- Do not promise a revision that was not made.

## Steps

1. Parse the comments with `response_letter` (Reviewer/Referee/审稿人 headers, numbered or paragraph mode).
2. For each point, decide: accept (change), clarify (text), or rebut (evidence).
3. For factual rebuttals, run `cite_verify` / `claim_check` and cite evidence ids.
4. Re-run `manuscript_check` and `statcheck` after edits.
5. Export the letter with `response_letter`; attach the sealed evidence record.

## Output

- Coverage table: comment number, decision, change location, evidence id.
- Missing/too-short/extra responses listed explicitly.
- A cover note that does not overstate the revision.

## Never

- Do not answer two comments with one vague paragraph.
- Do not cite a paper you did not verify.
