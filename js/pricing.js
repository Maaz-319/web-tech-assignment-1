/* Feature 4 - monthly / yearly pricing toggle.
   Prices are read from this data object, never hardcoded in the markup, so
   adding a tier means adding one entry here plus one card. */
const PLANS = {
  free: { monthly: 0, yearly: 0, label: "Free" },
  pro: { monthly: 29, yearly: 23, label: "Pro" },
  enterprise: { monthly: null, yearly: null, label: "Enterprise" },
};

(function pricingToggle() {
  const toggle = document.getElementById("billing-toggle");
  if (!toggle) return;

  const priceEls = document.querySelectorAll("[data-plan]");
  const perEls = document.querySelectorAll("[data-per]");
  const saveNote = document.getElementById("save-note");

  function render(cycle) {
    priceEls.forEach((el) => {
      const plan = PLANS[el.dataset.plan];
      const value = plan[cycle];
      el.textContent = value === null ? "Custom" : "$" + value;
    });
    perEls.forEach((el) => {
      el.textContent =
        el.dataset.per === "enterprise"
          ? "talk to us"
          : cycle === "monthly"
          ? "per month, billed monthly"
          : "per month, billed yearly";
    });
    if (saveNote) saveNote.classList.toggle("is-hidden", cycle !== "yearly");
  }

  toggle.addEventListener("click", () => {
    const yearly = toggle.getAttribute("aria-checked") !== "true";
    toggle.setAttribute("aria-checked", String(yearly));
    render(yearly ? "yearly" : "monthly");
  });

  render("monthly");
})();
