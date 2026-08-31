/* ==========================================================================
   PYONG RECORDZ — main script
   ========================================================================== */
(function () {
  "use strict";

  /* --- Sticky nav ------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu ------------------------------------------------------ */
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        burger.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  /* --- Hero carousel ---------------------------------------------------- */
  const hero = document.querySelector(".hero");
  if (hero) {
    const slides = Array.from(hero.querySelectorAll(".hero__slide"));
    const dotsWrap = hero.querySelector(".hero__dots");
    let index = 0;
    let timer = null;
    const DURATION = 7000;

    // build dots
    if (dotsWrap && slides.length > 1) {
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "hero__dot" + (i === 0 ? " is-active" : "");
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.addEventListener("click", () => go(i, true));
        dotsWrap.appendChild(b);
      });
    }
    const dots = Array.from(hero.querySelectorAll(".hero__dot"));

    function go(i, manual) {
      if (i === index) return;
      slides[index].classList.remove("is-active");
      if (dots[index]) dots[index].classList.remove("is-active");
      index = (i + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      if (dots[index]) dots[index].classList.add("is-active");
      if (manual) restart();
    }
    function next() { go(index + 1, false); }
    function prev() { go(index - 1, false); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, DURATION);
    }

    const btnNext = hero.querySelector(".hero__arrow--next");
    const btnPrev = hero.querySelector(".hero__arrow--prev");
    if (btnNext) btnNext.addEventListener("click", () => { next(); restart(); });
    if (btnPrev) btnPrev.addEventListener("click", () => { prev(); restart(); });

    // pause on hover
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", restart);

    // touch swipe
    let startX = 0;
    hero.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); restart(); }
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });

    if (slides.length > 1) restart();
  }

  /* --- Reveal on scroll ------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* --- Footer year ------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* --- Forms (demo) ----------------------------------------------------- */
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector(".form__success");
      if (success) success.classList.add("is-visible");
      form.reset();
    });
  });
})();
