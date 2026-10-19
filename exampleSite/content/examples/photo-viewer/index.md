---
title: Photo viewer
lead: A library from npm, imported by its name through the import map.
weight: 3
---

The photos open in [dialog-lightbox](https://github.com/maxfettinger/dialog-lightbox), a small photo viewer on the
native `<dialog>` element. The script imports it as `"dialog-lightbox"`, the way it reads after `npm install`; the
site's [import map](/docs/examples/styles-and-scripts/#importing-a-library-by-its-npm-name) sends that name to
jsDelivr, and `params.stylesheets` adds the library's CSS.

{{< example name="demo" title="Photo viewer" >}}

Click a photo, then swipe or use the arrow keys; Escape or the back button closes it. The viewer is one `<dialog>`
for the whole page: [The dialog](/examples/dialog/) shows its markup and style. It runs bare here, without a frame:

{{< example name="dialog" frame="false" >}}

The photos are gradients made with ffmpeg, so they carry no copyright.
