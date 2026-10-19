---
title: Markdown
lead: Headings, links, code blocks, tables and images, and what Vitrine adds to each.
weight: 2
---

Vitrine uses Hugo's Markdown (CommonMark with GitHub's extensions: tables, task lists, strikethrough). A few elements
get extra behaviour through Hugo's render hooks.

## Headings

Start a page's chapters at `##`; the page's title is its `#`. Every `##` starts at a thin rule. Headings get a `#`
link to themselves, shown on hover, so readers can link to a chapter. `##` and `###` headings are listed in "On this
page".

## Links

```md
[Installation](/docs/getting-started/installation/)
[a chapter on this page](#code-blocks)
[the config file](hugo.toml)
[Hugo](https://gohugo.io/)
```

- A link to a page, written as its path in `content/`, becomes that page's address. It works with or without the
  trailing slash, and keeps working if your site lives under a subpath like `example.org/docs/`.
- A link to a file next to the page (in its page bundle) becomes the file's address.
- A path from the site's root to a file in `static/` gets the site's base path.
- A link to another site opens in a new tab, and screen readers hear "opens in a new tab".

## Code blocks

Fenced code gets a head with its language and a copy button:

```js
const answer = 42;
```

Name the file instead of the language with `file`:

````md
```js {file="script.js"}
const answer = 42;
```
````

```js {file="script.js"}
const answer = 42;
```

Hugo's highlighting options work as usual, for example highlighted lines and line numbers:

````md
```go {hl_lines=[2] linenos=true}
func main() {
	fmt.Println("hello")
}
```
````

```go {hl_lines=[2] linenos=true}
func main() {
	fmt.Println("hello")
}
```

Inline code like `npm install` gets a light box.

## Tables

| Key | Type | Default |
|---|---|---|
| `title` | string | none |
| `weight` | integer | 0 |
| `lead` | string, Markdown | none |

A table wider than the column (on a phone, say) scrolls sideways in its own box, so the page doesn't. Long code in a
cell may break on narrow screens. Align a column with colons in the separator row (`|---:|` for right).

## Quotes, lists and images

> A quote is set off by a rule on its left.

Lists and task lists work as on GitHub:

- [x] write the docs
- [ ] publish them

Images in Markdown are shown at most as wide as the column. Put them next to the page in its folder and link them
by name: `![The settings dialog](settings.png)`. Always write the alt text.
