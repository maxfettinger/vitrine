---
title: Installation
lead: Hugo, the theme, and the three settings Vitrine needs from your site.
weight: 1
---

## Requirements

- [Hugo](https://gohugo.io/installation/) 0.146 or newer. The standard edition is enough; Vitrine doesn't use Sass.
- [Git](https://git-scm.com/).
- [Go](https://go.dev/doc/install), only if you add the theme as a Hugo module (recommended, see below).

Check what you have:

```sh
hugo version
git --version
go version
```

## Create a site

Skip this if you have one already.

```sh
hugo new project my-docs
cd my-docs
git init
```

## Add the theme

There are two ways. A **Hugo module** is the modern one: Hugo downloads the theme itself, in the version you name,
and updating is one command. A **Git submodule** puts a copy of the theme's repository into your site's `themes/`
folder and needs no Go.

{{< tabs group="install" >}}
{{< tab "Hugo module" >}}
Turn your site into a module, then import the theme in `hugo.toml`:

```sh
hugo mod init github.com/you/my-docs
```

```toml {file="hugo.toml"}
[module]
  [[module.imports]]
    path = "github.com/maxfettinger/vitrine"
```

```sh
hugo mod get github.com/maxfettinger/vitrine@latest
```

The module path after `init` is a name for your site, usually its repository's address; it doesn't have to exist.
Update the theme later with `hugo mod get -u`.
{{< /tab >}}
{{< tab "Git submodule" >}}
Add the theme's repository under `themes/` and name it in `hugo.toml`:

```sh
git submodule add https://github.com/maxfettinger/vitrine.git themes/vitrine
```

```toml {file="hugo.toml"}
theme = "vitrine"
```

Someone cloning your site later needs `git clone --recurse-submodules`. Update the theme with
`git submodule update --remote`.
{{< /tab >}}
{{< /tabs >}}

## The settings Vitrine needs

Hugo lets a theme set only a few kinds of settings for a site (its params, menus, output formats and media types).
Vitrine needs three more, so they go in your `hugo.toml`:

```toml {file="hugo.toml"}
# Only Markdown files are pages: an example's example.html can sit in a folder next to its page
[contentTypes]
  [contentTypes.'text/markdown']

# Code colours as CSS classes, so light and dark mode can colour them
[markup.highlight]
  noClasses = false

# "On this page" lists the h2 and h3 headings
[markup.tableOfContents]
  startLevel = 2
  endLevel = 3
```

{{< callout >}}
Without `contentTypes`, Hugo treats `example.html` in a page's folder as a page of its own and the
[example shortcode](/docs/examples/example-shortcode/) can't find it. Examples in `assets/examples/` work either way.
{{< /callout >}}

And a title, a description for search engines and link previews, and the main menu, which becomes the tabs in the
header:

```toml {file="hugo.toml"}
baseURL = "https://docs.example.org/"
title = "my-lib"

[params]
  description = "my-lib does one thing well."

[[menus.main]]
  name = "Docs"
  pageRef = "/docs"
  weight = 10
```

## Run it

```sh
hugo server
```

Open the address it prints, usually `http://localhost:1313/`. The page reloads while you edit. Next:
[your first pages](/docs/getting-started/first-pages/).
