/* Feature 9 - contact form validation.
   Fully client-side: preventDefault, validate each field, show inline errors,
   and on success replace the form with a confirmation message. */
(function contactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (v) => (EMAIL_RE.test(v.trim()) ? "" : "Enter a valid email, e.g. you@company.com."),
    company: () => "",
    topic: (v) => (v ? "" : "Pick what your message is about."),
    message: (v) =>
      v.trim().length >= 20 ? "" : "Tell us a bit more - at least 20 characters.",
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const error = rule(input.value);
    const field = input.closest(".field");
    field.classList.toggle("is-invalid", Boolean(error));
    field.querySelector(".error-msg").textContent = error;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  // validate on blur, and clear the error live once the user fixes it
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("is-invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = Array.from(form.querySelectorAll("input, select, textarea"));
    const allValid = inputs.map(validateField).every(Boolean);

    if (!allValid) {
      const firstBad = form.querySelector(".field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea");
      if (firstBad) firstBad.focus();
      return;
    }

    const name = form.elements.name.value.trim().split(" ")[0];
    const success = document.createElement("div");
    success.className = "form-success";
    success.setAttribute("role", "status");
    success.innerHTML =
      '<h3>Thanks, ' + name + ' - message received.</h3>' +
      "<p>Our team replies to every message within one business day. " +
      "Nothing was actually sent: this is a static demo site with no backend.</p>" +
      '<button class="btn btn--secondary btn--sm" type="button" id="send-another">Send another message</button>';

    form.replaceWith(success);
    document.getElementById("send-another").addEventListener("click", () => {
      window.location.reload();
    });
  });
})();
