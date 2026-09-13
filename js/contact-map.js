/* Feature 11 - "distributed team" map pin tooltips.
   Each pin carries data-city; hover/focus positions a single tooltip element. */
(function mapTooltips() {
  const wrap = document.getElementById("map-wrap");
  if (!wrap) return;

  const tooltip = document.getElementById("map-tooltip");
  const pins = wrap.querySelectorAll(".map-pin");

  function show(pin) {
    const wrapBox = wrap.getBoundingClientRect();
    const pinBox = pin.getBoundingClientRect();
    tooltip.textContent = pin.dataset.city;
    tooltip.style.left = pinBox.left - wrapBox.left + pinBox.width / 2 + "px";
    tooltip.style.top = pinBox.top - wrapBox.top + "px";
    tooltip.classList.add("is-visible");
  }

  function hide() {
    tooltip.classList.remove("is-visible");
  }

  pins.forEach((pin) => {
    pin.addEventListener("mouseenter", () => show(pin));
    pin.addEventListener("focus", () => show(pin));
    pin.addEventListener("mouseleave", hide);
    pin.addEventListener("blur", hide);
  });
})();
