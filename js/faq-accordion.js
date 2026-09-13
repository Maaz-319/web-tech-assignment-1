/* Feature 10 - FAQ accordion (used on Product and Contact).
   Event delegation on each [data-accordion] container, aria-expanded toggled
   for screen readers. */
document.querySelectorAll("[data-accordion]").forEach((root) => {
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest(".accordion__trigger");
    if (!trigger || !root.contains(trigger)) return;

    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    // single-open behaviour: close siblings first
    root.querySelectorAll(".accordion__trigger").forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      document
        .getElementById(other.getAttribute("aria-controls"))
        .classList.remove("is-open");
    });

    if (!isOpen) {
      trigger.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
    }
  });
});
