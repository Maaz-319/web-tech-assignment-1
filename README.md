# ThrottleBox - static marketing site

Deployed: [https://web-tech.maaz.codes](https://web-tech.maaz.codes)

A fictional dev-tool SaaS (API rate limiting & abuse protection), built as a fully
static website with **HTML, CSS and JavaScript only** - no framework, no backend,
no build step.

## Local development

Open `index.html` directly in a browser, or serve the folder:

- VS Code → Live Server extension → "Go Live" (http://127.0.0.1:5500)
- or `npx serve .`

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home - hero, stats, bento features, how it works, testimonials |
| `about.html` | Mission, founding story, milestone timeline, team, values |
| `product.html` | Feature deep-dive, pricing toggle, comparison table, FAQ |
| `integrations.html` | Filterable integration grid with detail modal |
| `docs.html` | Quickstart, auth, language tabs, endpoint reference |
| `changelog.html` | Keep-a-Changelog releases with tag filters |
| `contact.html` | Validated contact form, team map, support FAQ |
| `404.html` | Not-found page |

## Folder structure

```
site/
├── *.html            7 pages + 404
├── css/style.css     design tokens, components, layout, media queries
├── js/               one file per behaviour (see below)
└── images/stock/     photography, all sharing the .photo-overlay treatment
```

## JavaScript features

| # | Feature | File |
|---|---|---|
| 1 | Hamburger nav toggle | `components.js` (inside `<site-nav>`) |
| 2 | Sticky header on scroll | `nav.js` |
| 3 | Animated stat counters (IntersectionObserver) | `home.js` |
| 4 | Monthly / yearly pricing toggle | `pricing.js` |
| 5 | Code-snippet language tabs + copy button | `snippet-tabs.js` |
| 6 | Integrations filter | `filter-buttons.js` |
| 7 | Changelog filter (same reusable code) | `filter-buttons.js` |
| 8 | Modal popups (Escape + backdrop close) | `modal.js`, `integrations.js` |
| 9 | Contact form validation | `form-validation.js` |
| 10 | FAQ accordion with `aria-expanded` | `faq-accordion.js` |
| 11 | Map pin tooltips | `contact-map.js` |
| + | Light/dark theme toggle, remembered | `components.js` |

`<site-nav>` and `<site-footer>` are Web Components defined once in
`components.js` and reused on every page, so navigation and footer markup
exist in exactly one place.

## Assets & licensing

- Photography: generated for this project, treated with one shared
  `.photo-overlay` accent gradient so every image reads as one brand.
- Avatars: [DiceBear](https://dicebear.com) "notionists", seeded by name
  (open source, free).
- Icons: inline Feather/Lucide-style SVG paths.
- Integration brands (Nimbus, Orbitly, Ledgerly, …) are invented, with
  two-letter monogram badges - no real company logos are used.
