# FAITHFUL — AI for the Church

A free, plain-language **learning resource** on artificial intelligence for
pastors, lay leaders, and church teams.

It is deliberately **not** a product site. There is nothing to buy, install,
log into, or subscribe to — no forms, no database, no funnel. The purpose is
purely educational: help church leaders understand AI, see how congregations
use it, think through policy, and keep current.

Static HTML / CSS / JS. No build step. Every page works without JavaScript;
JS is progressive enhancement only.

> Separate from the **product** site at `faithful/landing-page/` (the Faithful AI
> agent platform). See `.claude/rules/faithful-source-of-truth.md`.

## Pages

| File | Purpose |
|---|---|
| `index.html` | The overview — an editorial scroll: the landscape, how churches use AI, discernment, what's changing, the guides, references |
| `articles.html` | The Guides — editorial index of the in-depth guides |
| `article-ai-policy.html` | Guide — Your church needs an AI policy |
| `article-bulletin.html` | Guide — Write your Sunday bulletin in 10 minutes |
| `article-sermon-research.html` | Guide — AI for sermon research |
| `article-first-time-guests.html` | Guide — The Monday after: guest follow-up |
| `resources.html` | The Reference Desk — practical tools, the AI tools' own policies, outside research |
| `about.html` | Why this resource exists + editorial independence |
| `404.html` | Not-found page |

Shared: `styles.css` (editorial design system), `main.js`, `.nojekyll`.

## Design

Editorial / field-guide aesthetic — typography, hairline rules, color zones,
and whitespace carry the structure. **No card grids, no SaaS framing.** Brand:
navy + cobalt (mirrors `faithful-ai/globals.css`), gold used sparingly. Fonts:
Newsreader (editorial headlines + reading), Montserrat (labels/nav), Inter
(UI/body). Motion: hero line-reveal, scroll reveals, a slow marquee — calm,
not flashy.

## Re-orientation note (2026-05-17)

This site was first built SaaS-style (subscribe funnels, "platform" CTAs, card
grids) and re-oriented into a pure educational resource: removed all newsletter
/ email capture, the "platform" CTAs, and card layouts; rebuilt as an editorial
reading experience; added a "Keeping Current" section and a real References desk
(the AI companies' own policies + outside research).

## Pre-launch checklist

- [ ] Resource downloads in `resources.html` are `#` placeholders — attach real
      template / checklist files (look for `data-resource` attributes)
- [ ] Add real OG share images (`og:image`) per page
- [ ] Confirm domain + add a `CNAME` file (canonical/OG URLs assume
      `learn.faithful.ai`), or update those tags to the live host
- [ ] The "Keeping Current" entries are evergreen explainers — refresh as the
      tools genuinely change
- [ ] Add a real photo of Ricky West (currently a monogram avatar)
- [ ] Verify the external reference links still resolve before launch
