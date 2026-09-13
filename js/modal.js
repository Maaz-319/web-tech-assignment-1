/* Feature 8 - modal popups.
   Any element with data-modal-open="modal-id" opens that modal; the backdrop,
   the × button and the Escape key all close it. Focus returns to the trigger. */
(function modals() {
  let lastTrigger = null;

  function open(id, trigger) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastTrigger = trigger || null;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeAll() {
    document.querySelectorAll(".modal.is-open").forEach((m) => {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    });
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal-open]");
    if (opener) {
      open(opener.dataset.modalOpen, opener);
      return;
    }
    if (event.target.closest("[data-modal-close]") || event.target.classList.contains("modal")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });

  // exposed so integrations.js can open the shared detail modal with data
  window.TB_openModal = open;
  window.TB_closeModals = closeAll;
})();
