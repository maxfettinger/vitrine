---
title: Pages and navigation
lead: The header's tabs, the sidebar, "On this page", and the links under every page.
weight: 1
---

## The page frame

Every page has the same header: the site's name and version, the tabs, the repository's icon, the light and dark
switch, and on phones a menu button. Below it, a page in a section has three columns:

- the **sidebar** on the left: the pages of the section you're in;
- the **text** in the middle, at most 46rem wide (about 80 characters a line);
- **On this page** on the right: the page's `##` and `###` headings, the one you're reading marked as you scroll.

Pages outside a section (the start page, a top-level page like `content/about.md`, and the 404 page) use the same
frame without the side columns, so the header and the text don't move between kinds of pages. The page also always
keeps room for the scrollbar, which would otherwise shift everything by its width between short and long pages.

On medium screens "On this page" is left out. On phones the sidebar opens over the page from the menu button and
closes with a link, Escape or the button.

## The sidebar

The sidebar shows the **current tab's** pages, two levels deep:

1. the section's own page (`_index.md`), as "Overview";
2. its pages and subsections, sorted by `weight`;
3. in each subsection, its "Overview" and its pages. The subsection with the current page is open.

Pages without a `weight` come after those with one, sorted by date and then title, Hugo's default order. Use
`linkTitle` for a shorter name in the sidebar and the tabs than the page's `title`.

## Breadcrumbs, previous and next

Above the title, breadcrumbs name the sections the page is in. Under the text:

- **Edit this page**, if you set `params.editPath` to your repository's edit address for the content folder:

  ```toml {file="hugo.toml"}
  [params]
    editPath = "https://github.com/you/my-lib/edit/main/docs/content/"
  ```

- **Previous** and **Next**: the pages before and after this one in the sidebar's order, across subsections.

## A section's own page

A section's or subsection's `_index.md` shows its text, then a list of its pages with their leads. Keep the text
short: an overview of what's in the chapter.

## Tabs in the header

The header's tabs are your main menu ([Your first pages](/docs/getting-started/first-pages/#tabs-in-the-header)
shows how). A tab is marked when you're on its page or any page below it. On phones the tabs scroll sideways between
the name and the buttons.

## Light and dark

The switch in the header toggles light and dark mode and remembers the choice. Until a reader uses it, the site
follows `params.mode.default`:

```toml {file="hugo.toml"}
[params.mode]
  default = "auto"   # "light", "dark", or "auto" (the reader's system setting)
```

The choice is applied before the page is drawn, so it never flashes the other mode.
