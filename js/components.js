/* ==========================================================================
   Shared Web Components: <site-nav> and <site-footer>
   Defined once, used on all 7 pages. The hamburger toggle + theme toggle
   live inside <site-nav> so nav markup and nav behaviour stay together.
   ========================================================================== */

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "product.html", label: "Product" },
  { href: "integrations.html", label: "Integrations" },
  { href: "docs.html", label: "Docs" },
  { href: "about.html", label: "About" },
];

/** Current file name, e.g. "product.html" (defaults to index.html at "/"). */
function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

class SiteNav extends HTMLElement {
  connectedCallback() {
    const here = currentPage();

    const links = NAV_LINKS.map(
      (l) =>
        `<li><a href="${l.href}"${
          l.href === here ? ' aria-current="page"' : ""
        }>${l.label}</a></li>`
    ).join("");

    this.innerHTML = `
      <header class="site-header" id="site-header">
        <div class="container">
          <nav class="nav" aria-label="Main">
            <a class="wordmark" href="index.html">throttle<span>box</span>_</a>
            <ul class="nav__links" id="nav-links">${links}</ul>
            <div class="nav__actions">
              <button class="theme-toggle" type="button" id="theme-toggle"
                      aria-label="Switch colour theme" title="Switch colour theme">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
                </svg>
              </button>
              <a class="btn btn--primary btn--sm" href="contact.html">Get started</a>
              <button class="hamburger" type="button" id="hamburger"
                      aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>`;

    // Feature 1 - hamburger toggle
    const burger = this.querySelector("#hamburger");
    const list = this.querySelector("#nav-links");
    burger.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });

    // Bonus - light/dark theme toggle, remembered in localStorage
    const themeBtn = this.querySelector("#theme-toggle");
    if (localStorage.getItem("tb-theme") === "light") {
      document.body.classList.add("light");
    }
    themeBtn.addEventListener("click", () => {
      const light = document.body.classList.toggle("light");
      localStorage.setItem("tb-theme", light ? "light" : "dark");
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <a class="wordmark" href="index.html">throttle<span>box</span>_</a>
              <p style="margin-top:var(--s-3);max-width:34ch;font-size:var(--fs-small)">
                API rate limiting and abuse protection you drop in front of your API in an afternoon.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="product.html">Features &amp; pricing</a></li>
                <li><a href="integrations.html">Integrations</a></li>
                <li><a href="changelog.html">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4>Developers</h4>
              <ul>
                <li><a href="docs.html">Docs</a></li>
                <li><a href="docs.html#quickstart">Quickstart</a></li>
                <li><a href="docs.html#endpoints">API reference</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="contact.html#support-faq">Support</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <p style="margin:0">© ${year} Maaz Bin Asif. ThrottleBox is a fictional product built for a web technologies assignment.</p>
            <div class="socials" aria-label="Social links">
              <a href="https://github.com/maaz-319" aria-label="Maaz Bin Asif on GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
              </a>
              <a href="contact.html" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L5.9 22H2.8l7.5-8.6L2.4 2h6.6l4.5 6.7L18.9 2Z"/></svg>
              </a>
              <a href="mailto:maaz.asif@maaz.codes" aria-label="Email Maaz Bin Asif">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>`;
  }
}

customElements.define("site-nav", SiteNav);
customElements.define("site-footer", SiteFooter);
