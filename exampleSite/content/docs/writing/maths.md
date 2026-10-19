---
title: Maths
lead: Formulas with MathJax, on the pages that ask for it.
weight: 4
math: true
---

## Turning it on

Markdown would read the backslashes in `\(` and `\[` as escapes and drop them before MathJax sees the formula. Hugo's
passthrough extension leaves formulas untouched; add it to your `hugo.toml` once:

```toml {file="hugo.toml"}
[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)']]
```

Then add `math: true` to a page's front matter, or turn it on for every page:

```toml {file="hugo.toml"}
[params]
  math = true
```

A page can then turn it off with `math: false`. MathJax 4 loads only on pages with maths turned on.

## Writing formulas

In-line maths goes between `\(` and `\)`, display maths between `$$` lines (or `\[` and `\]`):

```md
The identity \(e^{i\pi} + 1 = 0\) and the integral

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
```

The identity \(e^{i\pi} + 1 = 0\) and the integral

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

## Long formulas

On a narrow screen, in-line maths breaks across lines like words. A display formula too wide for the column scrolls
sideways in its own box, and so does an in-line formula that can't break, so the page itself never scrolls sideways:

$$
\left\lVert u - u_h \right\rVert_{L^2(\Omega)} \le C h^{p+1} \left\lvert u \right\rvert_{H^{p+1}(\Omega)} \quad\text{for all}\quad u \in H^{p+1}(\Omega) \cap H^1_0(\Omega)
$$
