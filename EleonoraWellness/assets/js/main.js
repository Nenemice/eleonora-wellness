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

  const memoryGallery = document.querySelector("[data-memory-gallery]");
  if (memoryGallery) {
    const track = memoryGallery.querySelector("[data-memory-track]");
    const slides = [...memoryGallery.querySelectorAll(".memory-slide")];
    const counter = memoryGallery.querySelector("[data-memory-count]");
    let index = 0;
    const visibleSlides = () => window.matchMedia("(max-width: 575.98px)").matches ? 1 : 2;
    const showMemorySlide = (nextIndex) => {
      const visible = visibleSlides();
      const maxIndex = Math.max(0, slides.length - visible);
      index = Math.min(Math.max(nextIndex, 0), maxIndex);
      track.style.transform = `translateX(-${index * (100 / visible)}%)`;
      const end = Math.min(index + visible, slides.length);
      counter.textContent = visible === 1 ? `${index + 1} / ${slides.length}` : `${index + 1}–${end} / ${slides.length}`;
    };
    memoryGallery.querySelector("[data-memory-prev]").addEventListener("click", () => showMemorySlide(index - 1));
    memoryGallery.querySelector("[data-memory-next]").addEventListener("click", () => showMemorySlide(index + 1));
    window.addEventListener("resize", () => showMemorySlide(index), { passive: true });
    showMemorySlide(0);

    const lightbox = document.querySelector("[data-memory-lightbox]");
    const largeImage = lightbox?.querySelector("[data-memory-large]");
    slides.forEach((slide) => slide.addEventListener("click", () => {
      if (!lightbox || !largeImage) return;
      largeImage.src = slide.dataset.memorySrc;
      largeImage.alt = slide.dataset.memoryAlt || "";
      lightbox.showModal();
    }));
    lightbox?.querySelector("[data-memory-close]")?.addEventListener("click", () => lightbox.close());
    lightbox?.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }
});
