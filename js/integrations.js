/* Integrations page - fills the shared modal with the clicked integration's
   details. Data lives in one object so the grid and the modal can never drift
   apart. The modal open/close mechanics come from modal.js. */
const INTEGRATIONS = {
  nimbus: {
    name: "Nimbus",
    category: "Infrastructure",
    status: "operational",
    blurb: "Serverless edge platform. Wrap any Nimbus function with a policy.",
    code:
      'import { throttlebox } from "@throttlebox/nimbus";\n\nexport default throttlebox(handler, {\n  policy: "public-api",\n  key: req => req.headers.get("x-api-key")\n});',
  },
  orbitly: {
    name: "Orbitly",
    category: "Frameworks",
    status: "operational",
    blurb: "Full-stack JS framework. Middleware plugin, zero config beyond the policy name.",
    code:
      '// orbitly.config.js\nexport default {\n  plugins: [\n    throttlebox({ policy: "public-api" })\n  ]\n};',
  },
  ledgerly: {
    name: "Ledgerly",
    category: "Infrastructure",
    status: "degraded",
    blurb: "Billing platform. Sync plan tiers so limits follow the customer's subscription.",
    code:
      'tb.sync({\n  source: "ledgerly",\n  map: { starter: "tier-free", growth: "tier-pro" }\n});',
  },
  wavepoint: {
    name: "Wavepoint",
    category: "Infrastructure",
    status: "operational",
    blurb: "API gateway. Install ThrottleBox as a pre-routing filter.",
    code:
      "# wavepoint.yaml\nfilters:\n  - name: throttlebox\n    policy: public-api\n    mode: enforce",
  },
  cronly: {
    name: "Cronly",
    category: "Infrastructure",
    status: "operational",
    blurb: "Scheduled jobs. Give batch workloads their own burst allowance.",
    code:
      'tb.policy("batch", {\n  strategy: "token-bucket",\n  burst: 5000,\n  refillPerMinute: 600\n});',
  },
  fluxbase: {
    name: "Fluxbase",
    category: "Infrastructure",
    status: "operational",
    blurb: "Hosted database and auth. Key limits by authenticated user id.",
    code: 'tb.key(ctx => ctx.fluxbase.user.id);',
  },
  ionpath: {
    name: "Ionpath",
    category: "Languages",
    status: "operational",
    blurb: "Typed RPC for Go services. Native interceptor, no HTTP assumptions.",
    code:
      "srv := ionpath.New(\n    ionpath.WithInterceptor(throttlebox.Interceptor(\"public-api\")),\n)",
  },
  stackwell: {
    name: "Stackwell",
    category: "Languages",
    status: "down",
    blurb: "Python service toolkit. ASGI middleware with async policy evaluation.",
    code:
      "from throttlebox.asgi import ThrottleBoxMiddleware\n\napp = ThrottleBoxMiddleware(app, policy=\"public-api\")",
  },
};

const STATUS_LABEL = {
  operational: "Operational",
  degraded: "Degraded",
  down: "Maintenance",
};

document.getElementById("integration-grid")?.addEventListener("click", (event) => {
  const card = event.target.closest(".integration-card");
  if (!card) return;

  const data = INTEGRATIONS[card.dataset.key];
  if (!data) return;

  document.getElementById("modal-title").textContent = data.name + " integration";
  document.getElementById("modal-meta").innerHTML =
    '<span class="pill">' +
    data.category +
    '</span> <span class="pill"><span class="status-dot' +
    (data.status === "operational" ? "" : data.status === "down" ? " status-dot--down" : " status-dot--degraded") +
    '"></span>' +
    STATUS_LABEL[data.status] +
    "</span>";
  document.getElementById("modal-blurb").textContent = data.blurb;
  document.getElementById("modal-code").textContent = data.code;

  window.TB_openModal("integration-modal", card);
});
