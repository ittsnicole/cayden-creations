/* ========================================
   CAYDEN CREATIONS — INTERACTIONS (v2)
   ======================================== */

(function () {
  'use strict';

  /* --- Page Load Entrance --- */
  window.addEventListener('load', function () {
    document.body.classList.remove('is-loading');
  });

  /* --- Sticky Header --- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile Menu --- */
  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileLinks = mobileMenu.querySelectorAll('a');

  function toggleMenu() {
    var open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', toggleMenu);
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) toggleMenu();
    });
  });

  /* --- Service Card Selection --- */
  var cards = document.querySelectorAll('.service-card');
  var selectedText = document.getElementById('selectedServiceText');
  var selectedBtn = document.getElementById('selectedServiceBtn');
  var formService = document.getElementById('formService');
  var currentService = null;

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var service = card.getAttribute('data-service');

      if (currentService === service) {
        card.classList.remove('selected');
        currentService = null;
        selectedText.textContent = 'Select a service above to learn more';
        selectedBtn.style.display = 'none';
        if (formService) formService.value = '';
        return;
      }

      cards.forEach(function (c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      currentService = service;
      selectedText.textContent = 'Selected: ' + service;
      selectedBtn.style.display = 'inline-flex';
      selectedBtn.href = 'https://wa.me/254702682174?text=' + encodeURIComponent('Hello Cayden Creations, I would like a quote for ' + service + '.');
      if (formService) formService.value = service;
    });
  });

  /* --- Contact Form with Inline Validation --- */
  var contactForm = document.getElementById('contactForm');
  var formName = document.getElementById('formName');
  var formNameError = document.getElementById('formNameError');
  var submitBtn = document.getElementById('formSubmitBtn');

  function clearError(input) {
    var group = input.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      input.classList.remove('is-error');
    }
  }

  function showError(input, msg) {
    var group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      input.classList.add('is-error');
      var errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = msg;
    }
  }

  if (formName) {
    formName.addEventListener('input', function () {
      clearError(formName);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var name = formName.value.trim();
      var business = document.getElementById('formBusiness').value.trim();
      var service = document.getElementById('formService').value;
      var message = document.getElementById('formMessage').value.trim();

      /* Validate name */
      if (!name) {
        showError(formName, 'Please enter your name.');
        valid = false;
      } else if (name.length < 2) {
        showError(formName, 'Name must be at least 2 characters.');
        valid = false;
      } else {
        clearError(formName);
      }

      if (!valid) {
        formName.focus();
        return;
      }

      var parts = ['Hello Cayden Creations,'];
      parts.push('My name is ' + name + '.');
      if (business) parts.push('I represent ' + business + '.');
      if (service) {
        parts.push('I would like a quote for ' + service + '.');
      } else {
        parts.push('I would like to request a quote for my printing project.');
      }
      if (message) parts.push('Details: ' + message);
      parts.push('Thank you.');

      var text = parts.join(' ');
      window.open('https://wa.me/254702682174?text=' + encodeURIComponent(text), '_blank');
    });
  }

  /* --- Scroll Reveal (Intersection Observer) --- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });

    /* Process connector animation */
    var connectors = document.querySelectorAll('.process__connector');
    var connectorObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          connectorObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    connectors.forEach(function (el) { connectorObserver.observe(el); });

  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    document.querySelectorAll('.process__connector').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --- Smooth scroll polyfill for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

})();
