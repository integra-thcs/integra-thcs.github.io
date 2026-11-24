// INTEGRA – piccoli miglioramenti progressivi: il sito funziona anche senza JavaScript.
(function () {
  // Menu su mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // Indirizzi email ricomposti qui, per non lasciarli leggibili ai programmi di spam
  document.querySelectorAll('a.email[data-u][data-d]').forEach(function (a) {
    var addr = a.dataset.u + '@' + a.dataset.d;
    a.href = 'mailto:' + addr;
    a.textContent = addr;
  });

  // Linea del tempo: mese corrente del progetto
  var tl = document.querySelector('.timeline[data-start]');
  if (tl) {
    var parts = tl.dataset.start.split('-');
    var total = Number(tl.dataset.months);
    var now = new Date();
    var startY = Number(parts[0]), startM = Number(parts[1]) - 1;
    var daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    var elapsed = (now.getFullYear() - startY) * 12 + (now.getMonth() - startM) + (now.getDate() - 1) / daysInMonth;
    if (elapsed >= 0) {
      var clamped = Math.min(elapsed, total);
      tl.style.setProperty('--today', clamped.toFixed(3));
      if (elapsed < total) tl.classList.add('has-today');
      var text = document.querySelector('.today-text');
      if (text && elapsed < total) {
        text.querySelector('[data-month]').textContent = Math.floor(elapsed) + 1;
        text.hidden = false;
      }
    }
  }
})();
