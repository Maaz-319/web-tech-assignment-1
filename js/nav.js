/* Feature 2 - sticky header state on scroll.
   Page-agnostic behaviour, so it lives outside the <site-nav> component. */
(function stickyHeader() {
  function bind() {
    const header = document.getElementById("site-header");
    if (!header) return false;

    const update = () => {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return true;
  }

  // <site-nav> renders on upgrade, so retry once the DOM is ready.
  if (!bind()) {
    document.addEventListener("DOMContentLoaded", bind);
  }
})();
