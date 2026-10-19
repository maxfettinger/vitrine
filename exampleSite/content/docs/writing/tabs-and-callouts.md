---
title: Tabs and callouts
lead: "Two shortcodes for writing: the same thing in several variants, and a note or warning beside the text."
weight: 3
---

## Tabs

Use tabs for the same content in variants: package managers, operating systems, languages.

```md
{{</* tabs group="install" */>}}
{{</* tab "npm" */>}}
    ```sh
    npm install my-lib
    ```
{{</* /tab */>}}
{{</* tab "pnpm" */>}}
    ```sh
    pnpm add my-lib
    ```
{{</* /tab */>}}
{{</* /tabs */>}}
```

(Without the indentation: it's only there to show the code fences inside.)

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
{{< tab "yarn" >}}
```sh
yarn add my-lib
```
{{< /tab >}}
{{< /tabs >}}

A tab holds any Markdown. Arrow keys move between the tabs.

### Tab groups

With `group`, every tab set of the same group switches together: pick "pnpm" once, and every install command on
every page shows pnpm. The choice is kept in the reader's browser. This tab set is in the group `install`, like the
one on [Installation](/docs/getting-started/installation/), whose tabs are named differently and so keep their own
choice.

{{< tabs group="install" >}}
{{< tab "npm" >}}
```sh
npm update my-lib
```
{{< /tab >}}
{{< tab "pnpm" >}}
```sh
pnpm update my-lib
```
{{< /tab >}}
{{< tab "yarn" >}}
```sh
yarn upgrade my-lib
```
{{< /tab >}}
{{< /tabs >}}

## Callouts

A note or a warning beside the text, in Markdown:

```md
{{</* callout */>}}
The default. A note with **Markdown** in it.
{{</* /callout */>}}

{{</* callout "warning" */>}}
Something that can go wrong.
{{</* /callout */>}}
```

{{< callout >}}
The default. A note with **Markdown** in it.
{{< /callout >}}

{{< callout "warning" >}}
Something that can go wrong.
{{< /callout >}}

Use them sparingly: a page full of callouts has none that stand out.
