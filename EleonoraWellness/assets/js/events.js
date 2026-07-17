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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-community-link]").forEach((link) => link.href = ELEONORA_COMMUNITY);
  const now = new Date();
  const future = publishedEvents().filter((event) => eventDate(event) >= now).sort((a, b) => eventDate(a) - eventDate(b));
  const past = publishedEvents().filter((event) => eventDate(event) < now).sort((a, b) => eventDate(b) - eventDate(a));

  const homeEvent = document.querySelector("[data-next-event]");
  if (homeEvent) {
    const event = future[0];
    homeEvent.innerHTML = event ? `<a class="event-poster-link" href="${event.pageUrl}"><img class="event-poster-thumb" src="${event.image}" alt="${event.title}" width="1024" height="1536"></a><div class="event-card-copy"><div class="quick-card-header"><h2>Prossimo evento</h2><span aria-hidden="true">✿</span></div><p class="quick-kicker">${event.subtitle}</p><h3>${formatEventDate(event)}</h3><p>${event.city} · ${event.shortDescription}</p><a class="btn btn-card-outline" href="${event.pageUrl}">Scopri l’evento</a><p class="community-mini">Iscriviti alla community WhatsApp per essere aggiornata sui prossimi eventi.</p><a class="community-link" data-community-link href="${ELEONORA_COMMUNITY}">Entra nella community →</a></div>` : `<div class="event-card-copy event-coming"><div class="quick-card-header"><h2>Prossimo evento</h2><span aria-hidden="true">✿</span></div><p class="quick-kicker">Coming soon</p><h3>Nuove esperienze di benessere sono in arrivo.</h3><p>Iscriviti alla community WhatsApp per essere aggiornata sui prossimi eventi.</p><a class="btn btn-card-outline" data-community-link href="${ELEONORA_COMMUNITY}">Entra nella community</a></div>`;
  }

  const upcomingGrid = document.querySelector("[data-upcoming-events]");
  if (upcomingGrid) upcomingGrid.innerHTML = future.length ? future.map((event) => eventCard(event)).join("") : '<div class="empty-events"><span class="eyebrow">Coming soon</span><h3>Nuove esperienze sono in arrivo.</h3><p>Entra nella Community WhatsApp per ricevere tutti gli aggiornamenti.</p></div>';
  const pastGrid = document.querySelector("[data-past-events]");
  if (pastGrid) pastGrid.innerHTML = past.length ? past.map((event) => eventCard(event, true)).join("") : '<p class="muted-copy">Qui troverai le Wellness Experience concluse.</p>';
});
