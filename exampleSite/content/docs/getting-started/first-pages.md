---
title: Your first pages
lead: Sections become tabs, folders become the sidebar, and every page needs a title and a weight.
weight: 2
---

## The content folder

A Vitrine site is a few folders of Markdown files. This one has a start page, a Docs tab with two chapters and an
Examples tab:

```text
content/
├── _index.md                 the start page
├── docs/
│   ├── _index.md             the Docs tab's own page ("Overview" in the sidebar)
│   ├── installation.md
│   └── guide/
│       ├── _index.md         a chapter: a group in the sidebar
│       ├── basics.md
│       └── advanced.md
└── examples/
    ├── _index.md
    └── counter/
        ├── index.md          a page with files next to it (a page bundle)
        └── demo/             an example's files
```

Each folder at the top of `content/` is a **section**. A folder inside a section with an `_index.md` is a
**subsection**: in the sidebar it's a group that opens. The sidebar shows two levels; put deeper folders' pages one
level up.

## A page

Every page starts with front matter between `---` lines:

```md {file="content/docs/installation.md"}
---
title: Installation
lead: Everything you need before the first build.
weight: 1
---

## Requirements

Text in Markdown.
```

`title` is the heading and the name in the sidebar. `lead` is the line under the title, also used as the page's
description for search engines unless you set `description`. `weight` sorts pages: lower comes first. All keys are
in [Front matter](/docs/reference/front-matter/).

Create pages by hand or with Hugo:

```sh
hugo new content docs/installation.md
```

## Tabs in the header

The tabs are your site's main menu. Add one entry per section, with `pageRef` pointing at it:

```toml {file="hugo.toml"}
[[menus.main]]
  name = "Docs"
  pageRef = "/docs"
  weight = 10

[[menus.main]]
  name = "Examples"
  pageRef = "/examples"
  weight = 20

[[menus.main]]
  name = "npm"
  url = "https://www.npmjs.com/package/my-lib"
  weight = 30
```

An entry with a `url` to another site opens in a new tab and gets a small arrow.

## The start page

`content/_index.md` is a hero: the title large, the lead, a row of facts, an install command and buttons. The
page's Markdown follows below.

```md {file="content/_index.md"}
---
title: my-lib
lead: What it does, in one or two sentences.
facts: ["4 kB gzip", "0 dependencies", "MIT"]
install: npm install my-lib
actions:
  - { label: Get started, url: docs/installation/ }
  - { label: GitHub, url: "https://github.com/you/my-lib" }
---

## Why my-lib

Text in Markdown.
```

The first button is filled, the others outlined. Next: [Writing](/docs/writing/).
