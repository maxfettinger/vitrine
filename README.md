# Vitrine

A Hugo theme for the documentation of a small library. Its one unusual feature: examples run on the page, and below
each one are the files that run, exactly as written. A vitrine is a glass case; here the code is on show and works.

Everything else is what docs need and nothing to configure: tabs across the top for the site's sections, a
two-level sidebar for the section's pages, "On this page" on the right, light and dark mode, copy buttons, a
previous/next pager and an "Edit this page" link. On phones the sidebar opens from a menu button.

The example site is the documentation of [dialog-lightbox](https://github.com/maxfettinger/dialog-lightbox):

```sh
cd vitrine
hugo server -s exampleSite
```

## Setup

```toml
theme = "vitrine"

# Three settings the theme needs but can't set itself (a theme's config only sets params and menus):
[contentTypes]
  [contentTypes.'text/markdown']   # .html files in page bundles are files, so examples can sit next to their page
[markup.highlight]
  noClasses = false                # code colours as classes, coloured by the theme in light and dark mode
[markup.tableOfContents]
  startLevel = 2                   # "On this page": h2 and h3
  endLevel = 3

[[menus.main]]                     # the tabs in the header; a URL starting with http opens in a new tab
  name = "Docs"
  pageRef = "/docs"
  weight = 10

[params]
  description = "…"                # search engines and link previews
  version = "1.2.0"                # next to the name in the header
  repo = "https://github.com/me/my-lib"
  editPath = "https://github.com/me/my-lib/edit/main/docs/content/"
  footer = "MIT"                   # Markdown, before "Built with"
  favicon = "favicon.svg"          # in static/; the theme has a default
  stylesheets = ["https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.css"]

  [params.mode]
    default = "auto"               # light, dark or auto (the system's) until the visitor uses the switch

  [params.importmap]
    my-lib = "https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.js"
```

Hugo 0.146 or newer.

## Pages

Every section of the site (`content/docs/`, `content/examples/`) is a tab and gets the sidebar and "On this
page". Its subsections are the sidebar's second level, opened when you're in them. Pages are sorted by `weight`
(Hugo's default order), and the pager follows the same order across subsections. The home page and pages outside a section
are plain: no sidebars, and the header doesn't move, because the page always keeps room for the scrollbar.

Front matter: `title`, `weight`, and `lead`, the line under the title (also the page's description unless it has
one).

The home page is a hero, from front matter:

```yaml
title: my-lib
lead: What it does, in one or two sentences. Markdown works.
facts: ["4 kB gzip", "0 dependencies", "MIT"]
install: npm install my-lib
actions:
  - { label: Get started, url: docs/getting-started/ }
  - { label: GitHub, url: https://github.com/me/my-lib }
```

Its Markdown follows below the hero.

## Examples

An example is a folder next to the page's `index.md` (a page bundle) with up to three files:

```text
content/examples/captions/
├── index.md
└── demo/
    ├── example.html   the markup, put into the page as it is
    ├── style.css      optional
    └── script.js      optional
```

```md
{{< example "demo" >}}
{{< example name="demo" title="Captions" >}}
```

The example runs in a frame, and below it are tabs with its files. Three things make the code shown the code that
runs:

- **The import map.** `script.js` imports `my-lib` exactly as a reader would after `npm install`; the
  `params.importmap` sends that name to a CDN (or to a file in `static/`, written with a leading `/`). No
  rewriting of the shown code.
- **`@scope`.** `style.css` is wrapped in `@scope ([data-example="demo"])`, so it styles this example only, and
  two examples on one page can use the same class names.
- **Paths from the site's root.** In `example.html`, `src`, `href` and `poster` starting with `/` get the site's
  base path, so an example can write `/media/photo.jpg` and still work under `example.org/my-lib/`.

Options: `run="false"` shows only the code, `code="false"` only runs it, and `frame="false"` runs it bare, with no
frame and no code. The last one is for parts several examples share, like the one dialog every dialog-lightbox
example uses. Shared examples can live in the site's `assets/examples/<name>/`; a folder next to the page wins.

## Shortcodes and Markdown

Tabs, with an optional `group`: groups with the same name switch together and remember the choice (the package
manager, for example).

```md
{{< tabs group="install" >}}
{{< tab "npm" >}}
    ```sh
    npm install my-lib
    ```
{{< /tab >}}
{{< tab "pnpm" >}}
    ```sh
    pnpm add my-lib
    ```
{{< /tab >}}
{{< /tabs >}}
```

A note or a warning: `{{< callout >}}Markdown{{< /callout >}}`, `{{< callout "warning" >}}…{{< /callout >}}`.

Code blocks get a copy button and a label, the language or a file name: ` ```js {file="script.js"} `. Headings
get an anchor link. External links open in a new tab.

## Customizing

There's nothing to customize on purpose: one look, light and dark. Your site's files override the theme's, so a
`layouts/_partials/footer.html` of your own replaces the footer, and `assets/css/vitrine.css` the whole stylesheet.

## Why it's built like this

Vitrine started as the demo site of dialog-lightbox. Turning it into a theme fixed a few things that work on one
site but not as a pattern:

| The demo site | Vitrine |
|---|---|
| The code shown was the running code with its import path replaced (`/lib/dialog-lightbox.js` to `dialog-lightbox`). | An import map: the file runs as shown. |
| Every example's CSS went unscoped into the site's stylesheet, so one example's rules could reach another. | `@scope` per example. |
| Paths like `/lib/` and `/media/` in the examples broke as soon as the site moved under a subpath. | Root paths get the base path; menus and links use `relURL`. |
| All examples lived in one page's front matter, their text as Markdown strings in YAML, the chapter list built by hand. | One page per example, Markdown in the body, `.TableOfContents`. |
| The header's links, the library's name and the facts on the home page were written into the templates; the current link was found by comparing a hard-coded URL. | The main menu, `site.Title` and front matter; `IsMenuCurrent`. |
| Scripts inline in the templates (copy, "On this page"), repeated on every page. | One bundled, fingerprinted module. |
| No canonical URL or link previews; `lang="en"` written into the template. | Canonical, Open Graph and Twitter cards from Hugo's templates; the language from the config. |

## Licence

MIT. The icons are [Feather](https://feathericons.com) (MIT). The example site's photos and clips are generated
gradients.
