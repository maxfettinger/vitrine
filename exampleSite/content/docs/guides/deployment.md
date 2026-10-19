---
title: Deployment
lead: Building the site and putting it online, with GitHub Pages as the example.
weight: 2
---

## Building

```sh
hugo --minify
```

writes the site to `public/`: plain HTML, CSS and JavaScript that any web server can serve. Set `baseURL` in
`hugo.toml` to the address the site will have, including a subpath if it has one
(`https://you.github.io/my-lib/`).

## GitHub Pages

In your repository's settings, under **Pages**, set the source to **GitHub Actions**. Then add this workflow. It
installs Hugo and Go (for the theme as a Hugo module), builds the site and publishes it on every push to `main`:

```yaml {file=".github/workflows/pages.yml"}
name: Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive   # if you added the theme as a Git submodule
      - uses: actions/setup-go@v5
        with:
          go-version: stable
      - name: Install Hugo
        run: |
          curl -sSL -o hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.167.0/hugo_0.167.0_linux-amd64.deb
          sudo dpkg -i hugo.deb
      - uses: actions/configure-pages@v5
        id: pages
      - run: hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`--baseURL` takes the address GitHub gives the site, so `baseURL` in `hugo.toml` doesn't matter for this build.
With a custom domain, set it in the same settings page; GitHub then passes it to the build.

## Other hosts

Netlify, Cloudflare Pages and Vercel build Hugo sites too: point them at your repository, with `hugo --minify` as the
build command and `public` as the output folder. Set the Hugo version in their settings (an environment variable
`HUGO_VERSION`), and Go if you use Hugo modules.
