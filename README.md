# usuite.github.io

The landing page of the uSuite organization, served by GitHub Pages at https://usuite.github.io/. It is one static page: `index.html`, `assets/site.css`, `assets/site.js`, the icons and screenshots in `assets/`, and `data/voices.json`. No build step, no framework, no analytics, no cookies.

## Preview

Run `python3 -m http.server 8000` in this folder and open http://localhost:8000. Opening `index.html` as a file works too, except the voices, which need `fetch`.

## Voices

`data/voices.json` holds the posts shown under "What people say", newest first by `date`. Add one entry per post, only with the author's words as posted and a link to the original:

```json
{ "quote": "Finally a viewer that walks folders with ]", "name": "Jane Doe", "handle": "@jane", "network": "x", "url": "https://x.com/jane/status/1", "date": "2026-11-02" }
```

`network` is one of `x`, `bluesky`, `mastodon`, `reddit`, `hn`, `facebook`, `linkedin`, `github`, `youtube`, `blog`. The page renders the fields as text, never as HTML.

## Comments

Comments use giscus, which stores them in GitHub Discussions of this repository. To turn them on: enable Discussions here, add a category named Comments (type Announcement, so only giscus creates threads), install the giscus app on this repository, then copy the repository id and category id from https://giscus.app into the `data-repo-id` and `data-category-id` attributes of `#giscus` in `index.html`. Until both are set the page shows a link to the organization's discussions instead.

The Facebook Comments plugin is not an option: Meta discontinued it on 2026-02-10.

## Donations

GitHub Sponsors for the organization (`github.com/sponsors/uSuite`) and Ko-fi (`ko-fi.com/usuite`). Both links are marked `data-todo` in `index.html` until the accounts exist; the organization-wide Sponsor button comes from `FUNDING.yml` in the `.github` repository.

## Sharing on Facebook

Facebook refuses or flags some links by whole domain, and `github.io` is shared by every Pages site. The page carries Open Graph tags and a 1200 x 630 card (`assets/img/og-card.png`), so previews work wherever the domain is accepted. If Facebook keeps refusing the link, move to a domain of our own: add a `CNAME` file with the domain, point DNS at GitHub Pages, and replace `https://usuite.github.io/` in the canonical, `og:url`, `og:image` and share links of `index.html`. Check a link with Facebook's Sharing Debugger at https://developers.facebook.com/tools/debug/.

## Publishing

GitHub Pages serves this repository from `master`, so the page changes on a release like the tools do: work on `feature/*`, merge into `develop`, then into `master`. Run the scrub check before every push.
