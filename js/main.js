/* =====================================================
   PORTFOLIO - MAIN JAVASCRIPT
   Author: Naufal Fadhila Falih
   ===================================================== */

(function () {
  'use strict';

  /* ================= DOM REFERENCES ================= */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const navbar = $('.navbar');
  const mobileMenu = $('.mobile-menu');
  const mobileMenuBtn = $('.nav-mobile-btn');
  const scrollProgressBar = $('.scroll-progress');
  const scrollTopBtn = $('.scroll-top');
  const typingEl = $('.typing-text');
  const counters = $$('.stat-number[data-target]');
  const skillBars = $$('.skill-bar-fill');
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('.project-card');
  const detailBtns = $$('.project-detail-btn');
  const modalOverlay = $('.modal-overlay');
  const contactForm = $('.contact-form');
  const navLinks = $$('.nav-links a');
  const bottomNavLinks = $$('.mobile-bottom-nav a');
  const sections = $$('section[id]');

  /* ================= LOADER ================= */
  window.addEventListener('load', function () {
    const loader = $('#loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.style.display = 'none';
      }, 400);
    }
  });

  /* ================= NAVBAR SCROLL STATE ================= */
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* ================= MOBILE MENU ================= */
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  if (mobileMenu) {
    $$('.mobile-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  /* ================= SCROLL PROGRESS BAR ================= */
  function handleScrollProgress() {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (window.scrollY / total) * 100;
    scrollProgressBar.style.width = progress + '%';
  }

  /* ================= SCROLL TO TOP ================= */
  function handleScrollTopVisibility() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================= ACTIVE NAV LINK TRACKING ================= */
  function handleActiveNavLinks() {
    var current = '';
    sections.forEach(function (section) {
      var top = window.scrollY;
      var offset = section.offsetTop - 120;
      if (top >= offset) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    bottomNavLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ================= SMOOTH SCROLL ================= */
  $$('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ================= SCROLL EVENT HANDLER (THROTTLED) ================= */
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        handleScrollProgress();
        handleScrollTopVisibility();
        handleActiveNavLinks();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  /* ================= FADE-UP ANIMATION ================= */
  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.fade-up, .stagger').forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ================= COUNTER ANIMATION ================= */
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var current = 0;
    var increment = Math.ceil(target / 60);
    var duration = 1200;
    var stepTime = duration / (target / increment);

    function update() {
      current += increment;
      if (current >= target) {
        el.textContent = target + '+';
        return;
      }
      el.textContent = current;
      requestAnimationFrame(update);
    }
    update();
  }

  /* ================= SKILL BAR ANIMATION ================= */
  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          bar.style.width = bar.getAttribute('data-width');
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
  });

  /* ================= PROJECT FILTER ================= */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          if (card.classList.contains(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  /* ================= PROJECT MODAL ================= */
  detailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var title = btn.getAttribute('data-title');
      var image = btn.getAttribute('data-image');
      var desc = btn.getAttribute('data-description');
      var tags = btn.getAttribute('data-tags');

      var modalTitle = $('.modal-title');
      var modalImage = $('.modal-image');
      var modalDesc = $('.modal-desc');
      var modalTags = $('.modal-tags');

      if (modalTitle) modalTitle.textContent = title;
      if (modalImage) modalImage.src = image;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalTags && tags) {
        modalTags.innerHTML = tags
          .split(',')
          .map(function (t) {
            return '<span class="modal-tag">' + t.trim() + '</span>';
          })
          .join('');
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalOverlay) {
    $('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* ================= CONTACT FORM ================= */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var subject = contactForm.querySelector('[name="subject"]');
      var message = contactForm.querySelector('[name="message"]');
      var status = contactForm.querySelector('.form-status');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        if (status) {
          status.textContent = 'Please fill in all required fields.';
          status.className = 'form-status error';
        }
        return;
      }

      var submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        if (status) {
          status.textContent = 'Message sent successfully!';
          status.className = 'form-status success';
        }
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        contactForm.reset();

        setTimeout(function () {
          if (status) {
            status.textContent = '';
            status.className = 'form-status';
          }
        }, 5000);
      }, 1000);
    });
  }

  /* ================= BUTTON RIPPLE EFFECT ================= */
  $$('.btn-primary').forEach(function (button) {
    button.addEventListener('click', function (e) {
      var circle = document.createElement('span');
      var d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = d + 'px';
      circle.style.left = e.offsetX - d / 2 + 'px';
      circle.style.top = e.offsetY - d / 2 + 'px';
      circle.classList.add('ripple');
      this.appendChild(circle);
      setTimeout(function () {
        circle.remove();
      }, 600);
    });
  });

  /* ================= TYPING EFFECT ================= */
  var words = [
    'Embedded System Engineer',
    'Robot Developer',
    'IoT Developer',
    'ESP32 Programmer',
    'Electronics Engineer',
  ];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function typeEffect() {
    if (!typingEl) return;

    var currentWord = words[wordIndex];

    if (!isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex++);
      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 90);
  }

  typeEffect();

  /* ================= RESIZE HANDLER (DEBOUNCED) ================= */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (mobileMenu && window.innerWidth > 767) {
        mobileMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      }
    }, 150);
  });

  /* ================= SERVICE WORKER ================= */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* Service worker registration failed silently */
      });
    });
  }
})();
