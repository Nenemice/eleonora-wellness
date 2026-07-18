document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector(".site-header");
  const compactHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  compactHeader();
  window.addEventListener("scroll", compactHeader, { passive: true });

  const slugify = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
  const clickCategory = (element, url) => {
    if (url.includes("wa.me")) return "whatsapp_click";
    if (url.includes("chat.whatsapp.com")) return "community_click";
    if (url.includes("maps.app.goo.gl") || url.includes("g.page")) return "google_reviews_click";
    if (url.includes("instagram.com")) return "instagram_click";
    if (url.includes("evento-") || element.textContent.toLowerCase().includes("evento")) return "event_click";
    if (url.includes("contatti.html") || url.includes("#modulo-contatti")) return "contact_click";
    return "cta_click";
  };

  document.addEventListener("click", (event) => {
    const element = event.target.closest("[data-track], .btn, .community-link, .review-write-link, .instagram-link");
    if (!element) return;
    const url = element.href || "";
    const label = element.textContent.trim() || element.getAttribute("aria-label") || "azione";
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: clickCategory(element, url),
      click_id: element.dataset.track || slugify(label),
      click_text: label,
      click_url: url,
      click_page: document.body.dataset.page || "unknown"
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_submit",
        form_name: form.getAttribute("name") || form.id || "contact_form",
        form_page: document.body.dataset.page || "unknown"
      });
    });
  });

  document.querySelectorAll("#mainMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainMenu");
      if (menu?.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
