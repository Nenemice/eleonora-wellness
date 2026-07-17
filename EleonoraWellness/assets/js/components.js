(() => {
  const page = document.body.dataset.page || "";
  const active = (name) => page === name ? ' active" aria-current="page' : '"';
  const logo = "assets/images/logo-eleonora-wellness-v2.webp";
  const instagram = "https://www.instagram.com/eleonoramemole/";
  const header = `
    <header class="site-header">
      <nav class="navbar navbar-expand-xxl navbar-dark" aria-label="Navigazione principale">
        <div class="container-fluid page-shell">
          <a class="navbar-brand brand-logo" href="index.html" aria-label="Eleonora Wellness - Home">
            <img src="${logo}" alt="Eleonora Wellness" width="1200" height="400">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Apri il menu"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse justify-content-end" id="mainMenu">
            <ul class="navbar-nav align-items-xxl-center">
              <li class="nav-item"><a class="nav-link${active("home")} href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link${active("eventi")} href="eventi.html">Eventi</a></li>
              <li class="nav-item"><a class="nav-link${active("chi-sono")} href="chi-sono.html">Chi sono</a></li>
              <li class="nav-item"><a class="nav-link${active("benessere")} href="esercizi-benessere.html">Esercizi &amp; Benessere</a></li>
              <li class="nav-item"><a class="nav-link${active("piani")} href="piani-personalizzati.html">Piani personalizzati <span class="coming-soon-badge">Coming soon</span></a></li>
              <li class="nav-item"><a class="nav-link${active("area")} href="area-wellness.html">Area Wellness <span class="coming-soon-badge">Coming soon</span></a></li>
              <li class="nav-item"><a class="nav-link${active("gift")} href="gift-card.html">Gift Card <span class="coming-soon-badge">Coming soon</span></a></li>
              <li class="nav-item"><a class="nav-link${active("contatti")} href="contatti.html">Contatti</a></li>
            </ul>
            <a class="instagram-link" href="${instagram}" target="_blank" rel="noopener noreferrer" aria-label="Apri Instagram di Eleonora Wellness"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></a>
            <a href="contatti.html" class="btn btn-book-navbar" data-track="navbar-book-now">Prenota ora</a>
          </div>
        </div>
      </nav>
    </header>`;
  const footer = `
    <footer class="site-footer">
      <div class="container-fluid section-container footer-inner">
        <a class="footer-logo-image" href="index.html" aria-label="Eleonora Wellness - Home"><img src="${logo}" alt="Eleonora Wellness" width="1200" height="400" loading="lazy"></a>
        <nav class="footer-links" aria-label="Link nel footer"><a href="faq.html">FAQ</a><a href="contatti.html">Contatti</a></nav>
        <p class="medical-note">Consulta sempre il tuo medico prima di iniziare un nuovo programma di allenamento.</p>
        <p class="footer-small">© <span id="currentYear"></span> Eleonora Wellness. Tutti i diritti riservati.</p>
      </div>
    </footer>`;
  document.querySelector("[data-site-header]")?.replaceWith(document.createRange().createContextualFragment(header));
  document.querySelector("[data-site-footer]")?.replaceWith(document.createRange().createContextualFragment(footer));
})();
