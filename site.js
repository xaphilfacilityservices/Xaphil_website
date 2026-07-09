/* Xaphil Facility Services — interactie
 * Header, navigatie en footer staan nu als echte HTML in elke pagina
 * (beter crawlbaar voor Google). Dit script verzorgt alleen nog:
 * actieve menu-status, het mobiele menu, het netjes verbergen van ontbrekende
 * partnerlogo's, en cookie-toestemming + Google Tag Manager. */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  // Actieve menu-item markeren.
  if (page) {
    var active = document.querySelector('[data-p="' + page + '"]');
    if (active) active.classList.add('active');
  }

  // Mobiel menu openen/sluiten.
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }

  // Verberg ontbrekende partnerlogo's netjes (geen kapot-icoon).
  document.querySelectorAll('.clients .logo-img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  // Cookie-toestemming + Google Tag Manager (laadt pas na akkoord — AVG).
  (function () {
    var GTM = 'GTM-NWJ7VW7T';
    function loadGTM() {
      if (window.__gtmLoaded) return; window.__gtmLoaded = true;
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', GTM);
    }
    var consent = null; try { consent = localStorage.getItem('xaphil_consent'); } catch (e) {}
    if (consent === 'accepted') { loadGTM(); return; }
    if (consent === 'declined') { return; }
    var bar = document.createElement('div');
    bar.id = 'cookiebar';
    bar.innerHTML = '<div class="cc-inner"><span>We gebruiken cookies om onze website te analyseren en te verbeteren. Meer info in onze <a href="/privacyverklaring/">privacyverklaring</a>.</span>' +
      '<div class="cc-btns"><button class="cc-no" type="button">Weigeren</button><button class="cc-yes" type="button">Accepteren</button></div></div>';
    document.body.appendChild(bar);
    function done(v) { try { localStorage.setItem('xaphil_consent', v); } catch (e) {} bar.remove(); }
    bar.querySelector('.cc-yes').addEventListener('click', function () { done('accepted'); loadGTM(); });
    bar.querySelector('.cc-no').addEventListener('click', function () { done('declined'); });
  })();
})();
