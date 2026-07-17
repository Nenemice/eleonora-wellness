document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const header = document.querySelector(".site-header");
  const compactHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  compactHeader();
  window.addEventListener("scroll", compactHeader, { passive: true });

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cta_click", cta_name: element.dataset.track, cta_text: element.textContent.trim() });
    });
  });

  document.querySelectorAll("#mainMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainMenu");
      if (menu?.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
