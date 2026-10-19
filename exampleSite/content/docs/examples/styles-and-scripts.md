---
title: Styles, scripts and imports
lead: How an example's CSS stays inside it, how its script runs, and how it imports a library by its npm name.
weight: 2
---

## Styles stay inside the example

Vitrine wraps an example's `style.css` in [`@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) when
it runs:

```css
@scope ([data-example="demo"]) {
  /* your style.css */
}
```

So a plain `button { … }` styles that example's buttons and nothing else on the page, and two examples can use the
same class names. The tab shows your file without the wrapper.

An example's rules come after the theme's, so they win over it. The theme gives buttons inside a frame a look of
their own (filled, in the accent colour), which your style can replace. The theme's colours are custom properties you can use, like
`var(--accent)` and `var(--bg-soft)` (all are listed in [Customizing](/docs/guides/customizing/)): an example that
uses them follows light and dark mode.

`@scope` works in all current major browsers. An older browser ignores the whole style, and the example runs
unstyled.

## Scripts run as modules

`script.js` goes into the page as `<script type="module">`. That means:

- it runs once, after the page is parsed, so the example's markup is already there;
- it has its own scope: its top-level `const`s don't clash with another example's;
- it can use `import`.

## Importing a library by its npm name

Readers of your docs will write `import { thing } from "my-lib"` after `npm install my-lib`. Your examples should say
the same. An [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) tells the
browser where the name points:

```toml {file="hugo.toml"}
[params.importmap]
  my-lib = "https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.js"
```

Then this runs as written:

```js {file="script.js"}
import { thing } from "my-lib";
```

The map can point at:

- **a CDN** such as jsDelivr or unpkg, in a fixed version, as above;
- **a file in your site's `static/` folder**, written from the root: `my-lib = "/lib/my-lib.js"`. Vitrine adds your
  site's base path. Useful while the library isn't published yet, or to try a local build.

The import map is on every page, so your own scripts can use it too. If the library has a stylesheet, add it to
every page with `params.stylesheets`:

```toml {file="hugo.toml"}
[params]
  stylesheets = ["https://cdn.jsdelivr.net/npm/my-lib@1.2.0/dist/my-lib.css"]
```

The [photo viewer example](/examples/photo-viewer/) imports [dialog-lightbox](https://github.com/maxfettinger/dialog-lightbox)
this way.
