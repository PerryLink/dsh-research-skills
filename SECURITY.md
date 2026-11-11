# Security

## Scope

`dsh-research-skills` carries no tools, no storage and no network access. It
registers seven SOP skill bodies (text) with the host's skill registry.

- **Text only.** The skill bodies are Markdown files under `skills/`, read from
  the package and handed to the host skill service. The package executes
  nothing from them.
- **No network, no credentials.** The plugin opens no sockets and reads no
  secrets.
- **No filesystem writes.** It reads its own `skills/` directory and nothing
  else.

The tools a skill body *names* (`lit_search`, `cite_verify`, `claim_check`,
`research_trail`, `repro_audit`, `dmp`, …) live in their own packages and carry
their own security documentation. The skill text cannot grant a permission the
host has not already granted.

## Supported versions

The latest published `0.1.x` release receives security fixes.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting (Security → Advisories) on
<https://github.com/PerryLink/dsh-research-skills>, or open a minimal issue
asking for a private channel if advisories are unavailable. Do not include
credentials, personal data or unpublished manuscripts in a public issue.
