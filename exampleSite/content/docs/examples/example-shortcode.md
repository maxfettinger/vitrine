---
title: The example shortcode
lead: A folder next to your page, one line in its Markdown, and the example runs.
weight: 1
---

## A first example

Make the page a page bundle (a folder with an `index.md`) and put the example's files in a folder next to it:

```text
content/examples/counter/
├── index.md
└── demo/
    ├── example.html    required: the markup
    ├── style.css       optional
    └── script.js       optional
```

Then, in `index.md`:

```md
{{</* example "demo" */>}}
```

This is the [counter example](/examples/counter/), running (its files live in `assets/examples/counter/`, so this
page and the Examples tab can share them; more below):

{{< example name="counter" title="A counter" >}}

The frame's label says "live" and the example's title. Under it, the files in tabs, with a copy button for the file
shown.

## Options

Pass the folder's name alone, as above, or as `name` with other options:

| Option | Default | What it does |
|---|---|---|
| `name` | none | the folder with the example's files |
| `title` | none | a title in the frame's label |
| `run` | `true` | `false` shows only the files |
| `code` | `true` | `false` runs the example without showing its files |
| `frame` | `true` | `false` runs it bare: no frame, no files, its markup straight in the page |

```md
{{</* example name="demo" title="Captions" */>}}
{{</* example name="demo" run="false" */>}}
{{</* example name="dialog" frame="false" */>}}
```

A shortcode call takes either one name or named options, not both: `{{</* example "demo" title="x" */>}}` is an
error.

## Where the files can live

The shortcode looks for `<name>/example.html` in two places, in this order:

1. next to the page, in its bundle: for examples that belong to one page;
2. in your site's `assets/examples/<name>/`: for examples several pages share, or examples on pages that aren't
   bundles (the start page's random walk lives in `assets/examples/walk/`).

## Shared parts

Some examples need markup that isn't part of what they demonstrate. The [photo viewer](/examples/photo-viewer/)
needs one `<dialog>` per page. Put it in an example of its own and run it bare, with `frame="false"`:

```md
{{</* example name="demo" title="Photo viewer" */>}}

{{</* example name="dialog" frame="false" */>}}
```

The bare example's markup, style and script go into the page without a frame or tabs. Write about it once, on a page
of its own, and show its files there.

## Paths in the markup

Write paths in `example.html` the way they'd look on your own site, from its root:

```html
<img src="/media/photo-1-480.jpg" alt="…">
```

If your docs live under a subpath, say `example.org/docs/`, Vitrine adds it to every `src`, `href` and `poster`
starting with `/` when the example runs. The files in the tabs keep the path as you wrote it.

## What else to know

- **Ids are page-wide.** Every example's markup is part of the page, so two examples on one page can't use the same
  `id`. Give elements ids that name the example (`counter`, `walk-again`).
- **Scripts run once,** as modules, after the page is parsed. They see the whole page, so select your elements by
  id, not by tag.
- **No `<html>` or `<body>` in `example.html`**: it's a fragment that goes into the page.
