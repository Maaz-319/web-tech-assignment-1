/* Feature 5 - code-snippet language tabs (Product + Docs pages).
   Plus a "copy to clipboard" button on every snippet.

   Markup contract:
     <div class="snippet" data-snippet>
       <div class="snippet__bar" role="tablist">
         <button class="tab" role="tab" data-lang="node" aria-selected="true">Node</button>
         ...
         <button class="btn btn--secondary btn--sm copy-btn" data-copy>Copy</button>
       </div>
       <div class="snippet__body"><pre class="code-block" data-pane="node">…</pre></div>
     </div> */
document.querySelectorAll("[data-snippet]").forEach((snippet) => {
  const tabs = Array.from(snippet.querySelectorAll(".tab"));
  const panes = Array.from(snippet.querySelectorAll("[data-pane]"));

  function select(lang) {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.lang === lang)));
    panes.forEach((p) => p.classList.toggle("is-hidden", p.dataset.pane !== lang));
  }

  snippet.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (tab) select(tab.dataset.lang);
  });

  // keyboard support: left/right arrows move between tabs
  tabs.forEach((tab, i) => {
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      select(next.dataset.lang);
    });
  });

  const copyBtn = snippet.querySelector("[data-copy]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const visible = panes.find((p) => !p.classList.contains("is-hidden")) || panes[0];
      try {
        await navigator.clipboard.writeText(visible.innerText.trim());
        copyBtn.textContent = "Copied";
      } catch (err) {
        copyBtn.textContent = "Press Ctrl+C";
      }
      setTimeout(() => (copyBtn.textContent = "Copy"), 1600);
    });
  }

  if (tabs.length) select(tabs[0].dataset.lang);
});
