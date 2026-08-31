# PYONG RECORDZ

Official website for **Pyong Recordz** — an independent Ugandan hip-hop record label rooted in **Ntinda, Kampala**, founded by **Pryce Teeba**.

Built as a static, multi-page site referencing the Roc Nation workflow (full-bleed hero carousel, modular card grids, bold uppercase typography, editorial feed).

## Pages

- `index.html` — home (hero carousel, explore grid, featured release, roster, news, CTA)
- `music.html` — discography
- `artists.html` — roster & collaborators
- `news.html` — label news
- `about.html` — the story
- `contact.html` — contact form & info

## Stack

- Plain HTML + CSS + vanilla JS (no build step)
- Google Fonts: **Anton** (display) + **Inter** (body)

## Structure

```
pyongrecordz/
├── index.html
├── music.html
├── artists.html
├── news.html
├── about.html
├── contact.html
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/            # hero + artist imagery
```

## Theming

All colors live in the `:root` CSS variables at the top of `assets/css/style.css`. Update the hex values there to re-skin the entire site.

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The site is deployed to GitHub Pages automatically on every push to `main` via
[`.github/workflows/static.yml`](.github/workflows/static.yml) (static content,
no build step).

- **Live site:** https://mikeo-ne.github.io/pyongrecordz/
- **Pages source:** branch `main`, root `/`, GitHub Actions (workflow) build

SEO extras: `sitemap.xml` + `robots.txt` for crawlers, and Open Graph /
Twitter Card meta tags plus canonical URLs on every page.

## Notes

- Imagery is AI-generated placeholder art; swap in real photos in `assets/img/`.
- Contact / newsletter forms are front-end only (demo). Wire them to a real backend before production.
