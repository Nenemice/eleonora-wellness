const ELEONORA_WHATSAPP = "https://wa.me/393519249781";
const ELEONORA_COMMUNITY = "https://chat.whatsapp.com/Jxel2DSOmuG6aWNSsxBeNo";

const wellnessEvents = [
  {
    id: "tramonto-wellness-luglio-2026",
    title: "Tramonto Wellness Experience",
    subtitle: "Movimento, relax e aperitivo al tramonto",
    date: "2026-07-19",
    startTime: "18:00",
    endTime: "21:00",
    location: "Relais Cascina al Campaccio",
    city: "Taino, Lago Maggiore",
    price: "45 €",
    shortDescription: "Un’esperienza di benessere sul Lago Maggiore tra allenamento, relax in piscina e aperitivo al tramonto.",
    image: "assets/images/eventi/tramonto-wellness-experience.webp",
    pageUrl: "evento-tramonto-wellness.html",
    bookingUrl: ELEONORA_WHATSAPP,
    status: "published"
  }
];

const eventDate = (event) => new Date(`${event.date}T${event.endTime || "23:59"}:00`);
const formatEventDate = (event) => new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${event.date}T12:00:00`));
const publishedEvents = () => wellnessEvents.filter((event) => event.status === "published");

function eventCard(event, past = false) {
  return `<article class="event-list-card">
    <a href="${event.pageUrl}" class="event-list-image"><img src="${event.image}" alt="${event.title}" width="1024" height="1536" loading="lazy"></a>
    <div class="event-list-copy">${past ? '<span class="event-status">Evento concluso</span>' : ""}<p class="quick-kicker">${formatEventDate(event)}</p><h3>${event.title}</h3><p><strong>${event.location}</strong><br>${event.city}</p><p>${event.shortDescription}</p><p class="event-price">${event.price}</p><a class="btn btn-card-outline" href="${event.pageUrl}">Scopri l’evento</a></div>
  </article>`;
}

function homeEventSlide(event, past = false) {
  return `<article class="home-event-slide${past ? " is-past" : ""}"><a class="event-poster-link" href="${event.pageUrl}"><img class="event-poster-thumb" src="${event.image}" alt="${event.title}" width="1024" height="1536" loading="lazy"></a><div class="event-card-copy">${past ? '<span class="event-status">Evento concluso</span>' : ""}<p class="quick-kicker">${event.subtitle}</p><h3>${formatEventDate(event)}</h3><p><strong>${event.location}</strong><br>${event.city}</p><a class="btn btn-card-outline" href="${event.pageUrl}">${past ? "Rivivi l’esperienza" : "Scopri l’evento"}</a></div></article>`;
}

function activateHomeCarousel(container) {
  const track = container.querySelector("[data-event-track]");
  const slides = [...container.querySelectorAll(".home-event-slide")];
  if (!track || slides.length < 2) return;
  let index = 0;
  const show = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    container.querySelector("[data-event-count]").textContent = `${index + 1} / ${slides.length}`;
  };
  container.querySelector("[data-event-prev]").addEventListener("click", () => show(index - 1));
  container.querySelector("[data-event-next]").addEventListener("click", () => show(index + 1));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-community-link]").forEach((link) => link.href = ELEONORA_COMMUNITY);
  const now = new Date();
  const future = publishedEvents().filter((event) => eventDate(event) >= now).sort((a, b) => eventDate(a) - eventDate(b));
  const past = publishedEvents().filter((event) => eventDate(event) < now).sort((a, b) => eventDate(b) - eventDate(a));

  const eventSchema = document.querySelector('script[type="application/ld+json"]');
  if (eventSchema && document.querySelector(".event-detail")) {
    try {
      const structuredEvent = JSON.parse(eventSchema.textContent);
      const currentPage = location.pathname.split("/").pop();
      const currentEvent = publishedEvents().find((event) => event.pageUrl === currentPage);
      if (currentEvent && eventDate(currentEvent) < now) {
        structuredEvent.eventStatus = "https://schema.org/EventCompleted";
        eventSchema.textContent = JSON.stringify(structuredEvent);
      }
    } catch (error) {
      console.warn("Impossibile aggiornare i dati strutturati dell’evento.", error);
    }
  }

  const homeEvent = document.querySelector("[data-next-event]");
  if (homeEvent) {
    const visibleEvents = future.length ? future : past;
    const heading = future.length ? "Prossimo evento" : "Nuove Wellness Experience in arrivo!";
    const intro = future.length ? "Scopri le prossime esperienze dedicate al movimento, al relax e al benessere." : "Sto preparando nuovi appuntamenti dedicati al benessere. Nel frattempo puoi rivivere le esperienze già realizzate.";
    const controls = visibleEvents.length > 1 ? `<div class="event-carousel-controls"><button type="button" data-event-prev aria-label="Evento precedente">←</button><span data-event-count>1 / ${visibleEvents.length}</span><button type="button" data-event-next aria-label="Evento successivo">→</button></div>` : "";
    homeEvent.innerHTML = `<div class="home-event-heading"><div class="quick-card-header"><h2>${heading}</h2><span aria-hidden="true">✿</span></div><p>${intro}</p></div>${visibleEvents.length ? `<div class="home-event-viewport"><div class="home-event-track" data-event-track>${visibleEvents.map((event) => homeEventSlide(event, !future.length)).join("")}</div></div>${controls}` : ""}<div class="home-event-community"><p>Entra nella Community WhatsApp per ricevere in anteprima nuove date e disponibilità.</p><a class="btn btn-community" data-community-link href="${ELEONORA_COMMUNITY}" target="_blank" rel="noopener noreferrer">Entra nella Community</a></div>`;
    activateHomeCarousel(homeEvent);
  }

  const upcomingGrid = document.querySelector("[data-upcoming-events]");
  if (upcomingGrid) upcomingGrid.innerHTML = future.length ? future.map((event) => eventCard(event)).join("") : '<div class="empty-events"><span class="eyebrow">Coming soon</span><h3>Nuove esperienze sono in arrivo.</h3><p>Entra nella Community WhatsApp per ricevere tutti gli aggiornamenti.</p></div>';
  const pastGrid = document.querySelector("[data-past-events]");
  if (pastGrid) pastGrid.innerHTML = past.length ? past.map((event) => eventCard(event, true)).join("") : '<p class="muted-copy">Qui troverai le Wellness Experience concluse.</p>';
});
