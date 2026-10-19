---
title: Configuration
lead: Every setting Vitrine reads from your hugo.toml, with its default.
weight: 1
---

## Required site settings

A theme can't set these for your site, so they go in your `hugo.toml` ([why](/docs/getting-started/installation/#the-settings-vitrine-needs)):

```toml {file="hugo.toml"}
[contentTypes]
  [contentTypes.'text/markdown']

[markup.highlight]
  noClasses = false

[markup.tableOfContents]
  startLevel = 2
  endLevel = 3
```

## Site settings Vitrine uses

| Setting | What Vitrine does with it |
|---|---|
| `baseURL` | links, canonical addresses, llms.txt |
| `title` | the name in the header and in the browser tab |
| `locale` | the page's `lang` attribute |
| `menus.main` | the tabs in the header ([how](/docs/getting-started/first-pages/#tabs-in-the-header)) |
| `enableRobotsTXT` | Hugo's `robots.txt`, if you want one |

For [maths](/docs/writing/maths/), also Hugo's passthrough extension, so Markdown leaves formulas alone:

```toml {file="hugo.toml"}
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)']]
```

Docs sites rarely need tags or feeds: `disableKinds = ["taxonomy", "term", "rss"]` leaves them out.

## Params

| Param | Default | What it does |
|---|---|---|
| `description` | `""` | the site's description for search engines and link previews, and the summary in llms.txt |
| `version` | `""` | shown small next to the name in the header, like `v1.2.0` |
| `repo` | `""` | the repository's address: an icon in the header |
| `editPath` | `""` | the address that, followed by a page's file path, edits it: "Edit this page" under every page |
| `footer` | `""` | a line in the footer before "Built with Hugo and Vitrine", in Markdown |
| `stylesheets` | `[]` | stylesheets added to every page: a library's CSS for your examples |
| `llms` | `true` | [llms.txt](/docs/reference/llms-txt/), llms-full.txt and a Markdown copy of every page |
| `math` | `false` | [MathJax](/docs/writing/maths/) on every page; a page's `math` wins |
| `mode.default` | `"auto"` | `"light"`, `"dark"` or `"auto"` (the reader's system) until the reader uses the switch |
| `favicon.svg` | `"favicon.svg"` | the favicon, a file in `static/` |
| `favicon.ico` | `"favicon.ico"` | the favicon for older browsers |
| `favicon.appleTouch` | `"apple-touch-icon.png"` | the 180×180 icon for iPhone home screens |
| `importmap` | none | bare module names to addresses, for [imports in examples](/docs/examples/styles-and-scripts/#importing-a-library-by-its-npm-name) |

The theme has its own favicon in all three formats. Put files with the same names in your site's `static/` folder to
replace them, or point the params at other files.

## All of it at once

```toml {file="hugo.toml"}
baseURL = "https://docs.example.org/"
title = "my-lib"
locale = "en"
disableKinds = ["taxonomy", "term", "rss"]

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

[[menus.main]]
  name = "Docs"
  pageRef = "/docs"
  weight = 10

[params]
  description = "my-lib does one thing well."
  version = "1.2.0"
  repo = "https://github.com/you/my-lib"
  editPath = "https://github.com/you/my-lib/edit/main/docs/content/"
  footer = "MIT licence"
  stylesheets = ["https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.css"]

  [params.mode]
    default = "auto"

  [params.importmap]
    my-lib = "https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.js"
```

{{< callout "warning" >}}
In TOML, a key after a `[table]` header belongs to that table. Put plain `[params]` keys before
`[params.mode]` and `[params.importmap]`, or they end up inside them.
{{< /callout >}}
