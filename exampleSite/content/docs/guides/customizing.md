---
title: Customizing
lead: Your own CSS, hooks for analytics and scripts, and your own versions of the theme's templates.
weight: 1
---

Vitrine has one look on purpose: light and dark, no presets. Everything else can be changed from your site, without
editing the theme's files. Hugo looks in your site first and in the theme second, so a file in your site with the
same path as one of the theme's replaces it.

## Your own CSS

Create `assets/css/custom.css` in your site. Vitrine adds it after its own CSS, outside the theme's cascade layers,
so your rules win whatever their selectors.

The colours and sizes are custom properties. Change them for light mode on `:root` and for dark mode on
`:root[data-theme="dark"]`:

```css {file="assets/css/custom.css"}
:root {
  --accent: #0b6e4f;
  --accent-strong: #08543c;
  --accent-soft: #e7f4ee;
}

:root[data-theme="dark"] {
  --accent: #5fd3a8;
  --accent-strong: #9be6c6;
  --accent-soft: #12271f;
}
```

| Property | What it is |
|---|---|
| `--bg` | the page |
| `--bg-soft` | code blocks, the header's hover, callouts |
| `--text` | text |
| `--muted` | secondary text: labels, the sidebar, captions |
| `--line` | rules and borders |
| `--line-strong` | the examples' dashed frame |
| `--accent` | links, the current tab and page, focus rings, buttons |
| `--accent-strong` | hovered links, the current page in the sidebar |
| `--accent-soft` | the current page's background in the sidebar |
| `--note`, `--warn` | the callouts' colours |
| `--sans`, `--mono` | the fonts: system fonts by default |
| `--gutter` | the space at the window's edges |
| `--layout` | the width of the header and the three columns (88rem) |
| `--sidebar`, `--toc` | the side columns' widths |
| `--text-width` | the text column's largest width (46rem) |
| `--header` | the header's height |

If you change a colour, check its contrast: text needs 4.5:1 against `--bg` and `--bg-soft`
([WebAIM's checker](https://webaim.org/resources/contrastchecker/) does it).

### Another font

Load it in the head hook (below) and set `--sans` or `--mono`:

```html {file="layouts/_partials/hooks/head-end.html"}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
```

```css {file="assets/css/custom.css"}
:root {
  --sans: "Inter", system-ui, sans-serif;
}
```

## Hooks

Two empty partials in the theme, for HTML on every page. Create them in your site:

| File in your site | Where it goes |
|---|---|
| `layouts/_partials/hooks/head-end.html` | the end of `<head>`: analytics, fonts, a script that must run early |
| `layouts/_partials/hooks/body-end.html` | the end of `<body>`: a script, a banner |

```html {file="layouts/_partials/hooks/head-end.html"}
<script defer data-domain="docs.example.org" src="https://plausible.io/js/script.js"></script>
```

## Your own templates

Copy a template from the theme to the same path in your site and change it there. The ones you're most likely to
want:

| Template | What it draws |
|---|---|
| `layouts/_partials/footer.html` | the footer |
| `layouts/_partials/header.html` | the header: name, version, tabs, buttons |
| `layouts/_partials/page-head.html` | breadcrumbs, title and lead |
| `layouts/_partials/page-foot.html` | "Edit this page", previous and next |
| `layouts/_partials/sidebar.html` | the section's navigation |
| `layouts/home.html` | the start page's hero |
| `layouts/_markup/render-codeblock.html` | code blocks |
| `layouts/_markup/render-link.html` | links in Markdown |

For example, a footer with your own links:

```go-html-template {file="layouts/_partials/footer.html"}
<footer class="footer">
  <div class="footer-inner">
    <p>© {{ now.Year }} You · <a href="{{ "imprint/" | relURL }}">Imprint</a></p>
  </div>
</footer>
```

{{< callout "warning" >}}
A copied template no longer gets the theme's updates. Copy as few as you can, and compare yours with the theme's
when you update it.
{{< /callout >}}

## Your own shortcodes

Put them in `layouts/_shortcodes/` in your site. A shortcode with a theme shortcode's name replaces it. Hugo's
[shortcode docs](https://gohugo.io/content-management/shortcodes/) explain how to write one.

## Page templates and archetypes

A section can have its own page template: `layouts/<section>/page.html` for its pages, `list.html` for its own
page. Start from the theme's `layouts/page.html`.

[Archetypes](https://gohugo.io/content-management/archetypes/) are the templates `hugo new content` fills in. The
theme's gives a page a title, a weight and an empty lead. Yours, in `archetypes/default.md` or per section
(`archetypes/docs.md`), wins:

```md {file="archetypes/docs.md"}
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
weight: 10
lead: ""
draft: true
---

## Overview
```
