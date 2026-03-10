(function () {
  'use strict';

  // ——— Countdown: 24 июля 2026, 16:00 (сбор гостей) ———
  var weddingDate = new Date('2026-07-24T16:00:00+07:00'); // Новосибирск

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate - now;

    if (diff <= 0) {
      document.querySelectorAll('[data-unit]').forEach(function (el) {
        el.textContent = '0';
      });
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var units = {
      days: String(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds)
    };

    document.querySelectorAll('[data-unit]').forEach(function (el) {
      var unit = el.getAttribute('data-unit');
      if (units[unit] !== undefined) {
        el.textContent = units[unit];
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ——— Scroll reveal (fade-in) ———
  var revealEls = document.querySelectorAll('.reveal');
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
