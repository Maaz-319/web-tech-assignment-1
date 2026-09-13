/* Feature 3 - animated stat counters, started when the strip scrolls into
   view (IntersectionObserver), skipped for reduced-motion users. */
(function statCounters() {
  const nums = document.querySelectorAll("[data-count-to]");
  if (!nums.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function format(value, el) {
    const decimals = Number(el.dataset.decimals || 0);
    return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function run(el) {
    const target = Number(el.dataset.countTo);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";

    if (reduced) {
      el.textContent = prefix + format(target, el) + suffix;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = prefix + format(target * eased, el) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  nums.forEach((n) => observer.observe(n));
})();
