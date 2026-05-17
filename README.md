# The Ministry OS — FAITHFUL educational site

The educational web property for **FAITHFUL** — an article, resource, and
newsletter site that helps church leaders use AI without losing doctrine,
privacy, or pastoral trust.

Static HTML / CSS / JS. No build step. Every page works without JavaScript;
JS is progressive enhancement only.

> This is the **educational publisher** surface (`FAITHFUL` / "The Ministry OS"),
> deliberately separate from the **product** marketing site at `faithful/landing-page/`
> (the Faithful AI agent platform). See `.claude/rules/faithful-source-of-truth.md`.

## Pages

| File | Purpose |
|---|---|
| `index.html` | The hub — hero, topics, featured articles, stats, resources, newsletter |
| `articles.html` | Article index with topic filtering |
| `article-ai-policy.html` | Article — Your church needs an AI policy |
| `article-bulletin.html` | Article — Write your Sunday bulletin in 10 minutes |
| `article-sermon-research.html` | Article — AI for sermon research |
| `article-first-time-guests.html` | Article — The Monday after: guest follow-up |
| `resources.html` | Resource library — templates, checklists, prompt packs |
| `newsletter.html` | The Ministry OS — subscribe, what's inside, issue archive, privacy |
| `about.html` | About the publication + Ricky West |
| `404.html` | Not-found page |

## Shared assets

| File | Purpose |
|---|---|
| `styles.css` | Full design system — brand tokens, layout, components, motion |
| `main.js` | Nav, scroll reveal, count-up, reading progress, filtering, share, forms |
| `.nojekyll` | Serve files as-is on GitHub Pages |

## Brand

Mirrors `faithful-ai/src/app/globals.css` — navy (`--ink-*`) + cobalt
(`--accent-*`), with gold (`--gold-*`) reserved for premium / resource accents.
No Turnkey emerald. Typography: **Montserrat** (display), **Inter** (UI/body),
**Newsreader** (long-form article reading + editorial italics). Aesthetic:
light editorial / journal — distinct from the dark-hero product landing page.

## Newsletter forms

The subscribe forms (`#newsletterForm`, `#footerForm`, `#newsletterPageForm`)
are front-end only — they show a success state but are **not wired to a live
provider**. Connect to Beehiiv (the FAITHFUL content engine's newsletter
platform) or another ESP before launch: replace the `bindForm` handler in
`main.js` with a real POST, or swap the `.subscribe-card` form for the
provider's embed.

## Resource downloads

Resource-card links in `resources.html` use `href="#"` with `data-resource`
hooks. Point them at real files (PDF / DOCX) or a gated download flow before
launch.

## Deploy

Static — host anywhere. For GitHub Pages, create the repo under the
`turnkeycfo` org (per `.claude/rules/github-org.md`), push these files to the
Pages branch root. Canonical URLs assume `learn.faithful.ai`; add a `CNAME`
file with that domain once DNS is pointed, or update the `<link rel="canonical">`
and OG `og:url` tags to the actual host.

## Status — pre-launch checklist

- [ ] Wire newsletter forms to a live ESP (Beehiiv)
- [ ] Replace resource `#` links with real downloadable files
- [ ] Add real OG share images (`og:image`) per page
- [ ] Confirm domain + add `CNAME` (or update canonical/OG URLs)
- [ ] Replace the "200+ congregations" / issue-archive figures with real numbers
- [ ] Add a real headshot for Ricky West (currently a monogram avatar)
