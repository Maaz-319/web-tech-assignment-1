/* Features 6 + 7 - one reusable filter implementation, shared by the
   Integrations grid and the Changelog list.

   Markup contract:
     <div class="filters" data-filter-group="grid-id"> <button data-filter="all"> </div>
     <div id="grid-id"> <article data-category="infra"> </div>

   A single delegated listener per filter bar handles every button. */
function initFilterGroup(bar) {
  const target = document.getElementById(bar.dataset.filterGroup);
  if (!target) return;

  const items = Array.from(target.children);
  const emptyMsg = document.getElementById(bar.dataset.emptyMessage || "");

  bar.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    bar.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });

    const wanted = btn.dataset.filter;
    let shown = 0;

    items.forEach((item) => {
      // an item can belong to several categories: data-category="infra languages"
      const cats = (item.dataset.category || "").split(/\s+/);
      const match = wanted === "all" || cats.includes(wanted);
      item.classList.toggle("is-hidden", !match);
      if (match) shown += 1;
    });

    if (emptyMsg) emptyMsg.classList.toggle("is-hidden", shown !== 0);
  });
}

document.querySelectorAll("[data-filter-group]").forEach(initFilterGroup);
