# Vitrine

**A Hugo theme for documentation, with examples that run on the page next to their code.**

A vitrine is a glass case with the real thing inside. Put an `example.html`, a `style.css` and a `script.js` in a
folder next to a page: Vitrine runs them on the page and shows the same files, unchanged, in tabs below. What your
readers copy is what ran.

[**Docs and live demo**](https://vitrine.maxfettinger.com/) ·
[Getting started](https://vitrine.maxfettinger.com/docs/getting-started/) ·
[Examples](https://vitrine.maxfettinger.com/examples/)

![Vitrine: a photo viewer example and a random walk, each running above its code](https://raw.githubusercontent.com/maxfettinger/vitrine/main/images/screenshot.png)

## What's in it

- **Live examples** with scoped CSS (`@scope`), module scripts and an import map, so example code imports
  `"your-lib"` exactly as it reads after `npm install`.
- **Navigation**: tabs across the top, a two-level sidebar, "On this page", previous and next.
- **llms.txt**, `llms-full.txt` and a Markdown copy of every page, for AI assistants, with no setup.
- Tabs with remembered groups, callouts, copy buttons, MathJax, an edit link.
- Plain CSS and one small script. No framework, no Node build.

## Quick start

```sh
hugo new project my-docs && cd my-docs
hugo mod init github.com/you/my-docs
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/maxfettinger/vitrine"

[contentTypes]
  [contentTypes.'text/markdown']
[markup.highlight]
  noClasses = false
[markup.tableOfContents]
  startLevel = 2
  endLevel = 3
```

```sh
hugo mod get github.com/maxfettinger/vitrine@latest
hugo server
```

No Go? Use a Git submodule instead; [Installation](https://vitrine.maxfettinger.com/docs/getting-started/installation/)
explains both. Requires Hugo 0.146 or newer.

## Made with Vitrine

- [Vitrine's own docs](https://vitrine.maxfettinger.com/)
- [Fieldnotes' docs](https://fieldnotes.maxfettinger.com/docs/), a Hugo theme for personal sites

## The example site

`exampleSite/` is the documentation above. To run it from a clone:

```sh
hugo server --source exampleSite
```

## Licence

MIT. Icons from [Feather](https://feathericons.com/) (MIT).
