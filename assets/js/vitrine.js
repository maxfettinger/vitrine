// Vitrine's script (a module, so it runs once the page is parsed): the light/dark switch, copy buttons on code,
// tabs, the chapter being read in "On this page", and the navigation button on small screens.
const root = document.documentElement;

// Light and dark: the switch remembers the choice (head.html applies it before the next page is drawn)
const toggle = document.querySelector(".theme-toggle");
if (toggle) {
  const sync = () => toggle.setAttribute("aria-pressed", root.dataset.theme === "dark");
  sync();
  toggle.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    if (theme === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try { localStorage.setItem("theme", theme); } catch {}
    sync();
  });
}

// Copy buttons: the code of their block
for (const button of document.querySelectorAll(".code-copy")) {
  const label = button.querySelector("span");
  const pre = button.closest(".code").querySelector("pre"); // now: examples move the button out of the block below
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(pre.textContent);
    label.textContent = "Copied";
    setTimeout(() => (label.textContent = "Copy"), 1500);
  });
}
// In an example the copy button sits on the panel, over the code
for (const panel of document.querySelectorAll(".example .tabs-panel")) {
  const button = panel.querySelector(".code-copy");
  if (button) panel.prepend(button);
}

// Tabs: click or arrow keys; tabs in a group switch together, and the group's choice is remembered
const groupKey = (group) => `vitrine-tabs-${group}`;
function select(tabs, index, remember = true) {
  const buttons = [...tabs.querySelectorAll(":scope > .tabs-list [role=tab]")];
  const panels = [...tabs.querySelectorAll(":scope > [role=tabpanel]")];
  buttons.forEach((b, i) => {
    b.setAttribute("aria-selected", i === index);
    b.tabIndex = i === index ? 0 : -1;
    panels[i].hidden = i !== index;
  });
  const group = tabs.dataset.group;
  if (group && remember) {
    const label = buttons[index].textContent;
    try { localStorage.setItem(groupKey(group), label); } catch {}
    for (const other of document.querySelectorAll(`.tabs[data-group="${group}"]`)) {
      if (other === tabs) continue;
      const i = [...other.querySelectorAll(":scope > .tabs-list [role=tab]")].findIndex((b) => b.textContent === label);
      if (i >= 0) select(other, i, false);
    }
  }
}
for (const tabs of document.querySelectorAll(".tabs")) {
  const buttons = [...tabs.querySelectorAll(":scope > .tabs-list [role=tab]")];
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => select(tabs, i));
    button.addEventListener("keydown", (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      const next = (i + step + buttons.length) % buttons.length;
      select(tabs, next);
      buttons[next].focus();
    });
  });
  if (tabs.dataset.group) {
    let saved = null;
    try { saved = localStorage.getItem(groupKey(tabs.dataset.group)); } catch {}
    const i = buttons.findIndex((b) => b.textContent === saved);
    if (i > 0) select(tabs, i, false);
  }
}

// On this page: the chapter being read is the last one whose heading has scrolled past the top fifth of the window,
// or the last one at the bottom of the page. A click on a link marks that chapter until the reader scrolls by hand
// (the page can't always scroll a heading near the end up to that line).
const links = [...document.querySelectorAll(".toc a")];
const headings = links.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
if (headings.length === links.length && links.length) {
  let held = links.findIndex((link) => link.hash === location.hash);
  let frame = 0;
  const mark = () => {
    frame = 0;
    let current = held;
    if (current < 0) {
      current = 0;
      headings.forEach((heading, i) => {
        if (heading.getBoundingClientRect().top < innerHeight / 5) current = i;
      });
      if (scrollY > 0 && scrollY + innerHeight >= root.scrollHeight - 1) current = links.length - 1;
    }
    links.forEach((link, i) => link.toggleAttribute("aria-current", i === current));
  };
  links.forEach((link, i) => link.addEventListener("click", () => { held = i; mark(); }));
  for (const type of ["wheel", "touchstart", "keydown", "mousedown"]) addEventListener(type, () => (held = -1), { passive: true });
  addEventListener("scroll", () => (frame ||= requestAnimationFrame(mark)), { passive: true });
  mark();
}

// Small screens: the menu button shows the section's navigation over the page; a link, Escape or the button hides it
const menu = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
if (menu && sidebar) {
  const open = (state) => {
    sidebar.toggleAttribute("data-open", state);
    menu.setAttribute("aria-expanded", state);
  };
  menu.addEventListener("click", () => open(!sidebar.hasAttribute("data-open")));
  sidebar.addEventListener("click", (event) => event.target.closest("a") && open(false));
  addEventListener("keydown", (event) => event.key === "Escape" && open(false));
}
