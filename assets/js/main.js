(() => {
  "use strict";

  /* ======================================================
       HELPERS
    ====================================================== */
  const qs = (selector, parent = document) => parent.querySelector(selector);

  const qsa = (selector, parent = document) =>
    parent.querySelectorAll(selector);

  /* ======================================================
       SWIPER
    ====================================================== */

  function initSwiper() {
    new Swiper(".main-swiper", {
      spaceBetween: 10,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1000,
    });
  }

  /* ======================================================
       MUSIC
    ====================================================== */

  function initMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.querySelector('.menu-items');
    const icon = document.querySelector('.hamburger-lines');
    const container = document.querySelector(".navbar-container");

    if (toggle && menu && icon && container) {
      document.addEventListener('click', (e) => {
        const isInside = container.contains(e.target) || icon.contains(e.target);
        if (!isInside) {
          toggle.checked = false;
        }
      });

    }

    menu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          // Cuộn mượt
          window.scrollTo({
            top: targetEl.offsetTop + 10,
            behavior: "smooth"
          });
        }

        // Đóng menu
        toggle.checked = false;

      });
    });
  }

  function initMusic() {
    const audio = qs("#audio");
    const icon = qs("#iconSvg");
    const btn = qs("#player-btn");
    const label = qs("#musicLabel");

    let isOpen = true

    if (!audio || !icon || !btn) return;
    // if (!audio || !icon || !btn || !label) return;

    // 👉 GSAP timeline cho label
    const tl = gsap.timeline({ paused: true });

    tl.to(label, {
      x: 200,
      // opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      pointerEvents: "none"
    });

    btn.addEventListener("click", () => {
      if (!audio.src) return;
      audio.paused ? audio.play() : audio.pause();
      // toggle label
      if (isOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
      isOpen = !isOpen;
    });

    audio.addEventListener("play", () => icon.classList.add("spin"));
    audio.addEventListener("pause", () => icon.classList.remove("spin"));
  }

  /* ======================================================
       DRESSCODE ANIMATION
    ====================================================== */

  function initDresscodeAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".color-block",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.from(".color1", { x: -100, opacity: 0, duration: 0.8 })
      .from(".color2", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".color3", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".color4", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4");
  }

  function initPage() {
    const tl = gsap.timeline({ paused: true });
    const audio = document.querySelector("#audio");
    const openCard = document.getElementById("open-card");
    const params = new URLSearchParams(window.location.search);
    const isCardOpened = params.get("opened") === "1";

    function markCardOpened() {
      const url = new URL(window.location.href);
      url.searchParams.set("opened", 1);
      window.history.replaceState({}, "", url);
    }

    if (isCardOpened) {
      gsap.set(".letter-section", { display: "none", opacity: 0 });
      gsap.set(".container", { display: "block", opacity: 1 });
      ScrollTrigger.refresh();
      return;
    }

    tl.to(".letter-section", {
      opacity: 0,
      duration: 0.8
    })
      .set(".letter-section", { display: "none" })
      .set(".container .content", { opacity: 0 })
      .set(".container", { display: "block" })
      .to(".container", {
        opacity: 1,
        onComplete: () => {

          // 💥 Reset ScrollTrigger
          // ScrollTrigger.refresh();

          // 💥 Nếu cần reset toàn bộ animation
          // gsap.globalTimeline.clear();

          // 💥 Re-init animation cho container
          initAnimations();
          // initMusic();

          // initDresscodeAnimation();
          // initTimeline();
          ScrollTrigger.refresh();
        }
      });

    if (!openCard) return;

    openCard.addEventListener("click", () => {
      markCardOpened();

      if (audio && audio.paused) {
        audio.play().catch(err => {
          console.log("Autoplay blocked:", err);
        });
      }
      tl.play();
    });
  }

  async function loadGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("invite");
    if (!inviteCode)
      return;

    const response = await fetch(
      'https://opensheet.elk.sh/1VaBtR3cIjMdvEpyp3X90EMPRbZGGItmk1D2g_VYeg20/T%C3%AAn%20kh%C3%A1ch%20m%E1%BB%9Di'
    );

    const data = await response.json();
    console.log('--- DATA ---', data);
    // Tìm khách mời
    const guest = data.find(
      row =>
        row.slug &&
        row.slug.trim() === inviteCode
    );

    // Đổ tên vào giao diện
    if (guest) {
      document.querySelector('.guest-name').textContent =
        guest.name;
    } else {
      document.querySelector('.guest-name').textContent =
        'Quý Khách';
    }
  }

  function initLetterAnimation() {
    const section = qs(".letter-section");
    if (!section) return;

    const content = section.querySelector(".content");
    // const logo = section.querySelector(".logo-img");
    // const husband = section.querySelector(".husband");
    // const ampersand = section.querySelector(".ampersand");
    // const wife = section.querySelector(".wife");
    // const divider = section.querySelector(".divider-img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        toggleActions: "play none none none",
      }
    });

    // =========================
    // Section intro
    // =========================


    tl.fromTo(
      content,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    // tl.from(
    //   logo,
    //   {
    //     rotateY: -180,
    //     scale: 0.8,
    //     opacity: 0,
    //     duration: 1.5,
    //     ease: "back.out(1.2)",
    //     transformOrigin: "center center"
    //   },
    //   "-=0.5"
    // );

    // tl.fromTo(
    //   husband,
    //   { opacity: 0, x: -30 },
    //   {
    //     opacity: 1,
    //     x: 0,
    //     duration: 1,
    //     ease: "power2.out",
    //   },
    //   "-=1"
    // );

    // tl.fromTo(
    //   ampersand,
    //   { opacity: 0, y: 50, filter: "blur(10px)" },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 1,
    //     ease: "power2.out",
    //     clearProps: "filter"
    //   },
    //   "-=1"
    // );

    // tl.fromTo(
    //   wife,
    //   { opacity: 0, x: 30 },
    //   {
    //     opacity: 1,
    //     x: 0,
    //     duration: 1,
    //     ease: "power2.out",
    //   },
    //   "-=1"
    // );

    // tl.fromTo(
    //   divider,
    //   {
    //     rotation: -120,
    //     scale: 0,
    //     opacity: 0
    //   },
    //   {
    //     rotation: 0,
    //     scale: 1,
    //     opacity: 1,
    //     duration: 1.2,
    //     ease: "back.out(1.6)",
    //     transformOrigin: "50% 50%"
    //   },
    //   "-=0.4"
    // );

    // tl.fromTo(
    //   ".welcome",
    //   { opacity: 0, y: 50, filter: "blur(10px)" },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 1,
    //     ease: "power2.out",
    //     clearProps: "filter"
    //   },
    //   "-=0.8"
    // );


    // tl.fromTo(
    //   ".subtext",
    //   { opacity: 0, y: 50, filter: "blur(10px)" },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 1,
    //     ease: "power2.out",
    //     clearProps: "filter"
    //   },
    //   "-=0.8"
    // );

    tl.fromTo(
      ".subtext",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );
    // tl.from(date, { y: 100, opacity: 0 }, "-=0.4");
  }

  /* ======================================================
       TIMELINE ANIMATION
    ====================================================== */

  function initTimeline() {
    const section = document.querySelector(".timeline");
    if (!section) return;

    const content = section.querySelector(".event-block");
    const bg = section.querySelector(".cover-bg");
    const items = section.querySelectorAll(".timeline-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // =========================
    // Section intro
    // =========================
    tl.fromTo(
      content,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    // tl.from(
    //   bg,
    //   {
    //     rotateY: -180,
    //     scale: 0.8,
    //     opacity: 0,
    //     duration: 1.8,
    //     ease: "back.out(1.2)",
    //     transformOrigin: "center center"
    //   },
    //   "-=0.5"
    // );

    // tl.from([divider, title], {
    //   opacity: 0,
    //   y: 40,
    //   duration: 0.8,
    //   stagger: 0.15,
    //   ease: "power2.out"
    // }, "-=1.5");

    // =========================
    // Animate từng item theo thứ tự
    // =========================
    items.forEach((item, index) => {
      const icon = item.querySelector(".icon-animate");
      const time = item.querySelector(".time");
      const label = item.querySelector(".label");
      const overlap = index === 0 ? 0 : 0.2 + index * 0.1;

      // Item fade
      tl.from(
        item,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power2.out"
        },
        `-=1`
      );

      // Icon pop
      if (icon) {
        tl.from(
          icon,
          {
            scale: 0,
            rotation: -120,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.6)"
          },
          "<0.2"
        );
      }

      // Time fade
      if (time) {
        tl.from(
          time,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
          },
          "<0.2"
        );
      }

      // Time fade
      if (label) {
        tl.from(
          label,
          {
            opacity: 0,
            x: -40,
            duration: 1,
            ease: "power2.out"
          },
          "<0.2"
        );
      }
    });
  }

  /* ======================================================
       FAQ
    ====================================================== */

  function initFAQ() {
    const items = qsa(".faq-item");

    function openItem(el) {
      const content = qs(".faq-content", el);
      const icon = qs(".icon", el);
      if (!content || !icon) return;

      el.classList.add("active");

      gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.out" });
      gsap.to(icon, {
        rotate: 180,
        duration: 0.3,
        onComplete: () => (icon.textContent = "−"),
      });
    }

    function closeItem(el) {
      const content = qs(".faq-content", el);
      const icon = qs(".icon", el);
      if (!content || !icon) return;

      el.classList.remove("active");

      gsap.to(content, { height: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(icon, {
        rotate: 0,
        duration: 0.3,
        onComplete: () => (icon.textContent = "+"),
      });
    }

    items.forEach((item) => {
      const header = qs(".faq-header", item);
      const content = qs(".faq-content", item);
      if (!header) return;

      if (item.classList.contains("active")) {
        gsap.set(content, { height: "auto" });
      }

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        items.forEach((el) => {
          if (el !== item) closeItem(el);
        });

        isOpen ? closeItem(item) : openItem(item);
      });
    });
  }

  /* ======================================================
       COUNTDOWN
    ====================================================== */

  function startCountdown(targetDate) {
    const daysEl = qs("#days");
    const hoursEl = qs("#hours");
    const minsEl = qs("#mins");
    const secsEl = qs("#secs");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const timer = setInterval(update, 1000);
    update();

    function update() {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        clearInterval(timer);
        daysEl.textContent =
          hoursEl.textContent =
          minsEl.textContent =
          secsEl.textContent =
          "00";
        return;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const mins = Math.floor((distance % 3600000) / 60000);
      const secs = Math.floor((distance % 60000) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(mins).padStart(2, "0");
      secsEl.textContent = String(secs).padStart(2, "0");
    }
  }

  /* ======================================================
       RSVP
    ====================================================== */
  async function handleFormSubmit(e, lang = "vi") {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const {
      name,
      confirm,
      guest_number,
      wish,
    } = data;

    // if (confirm === "Yes") {
    //   const selectedLocations = document.querySelectorAll('input[name="location"]:checked');
    //   if (selectedLocations.length === 0) {
    //     let errorMsg = document.getElementById("location-error");
    //     if (!errorMsg) {
    //       errorMsg = document.createElement("p");
    //       errorMsg.id = "location-error";
    //       errorMsg.style.cssText = "color: red; font-size: 13px; margin-top: 8px; text-align: center;";
    //       document.getElementById("location-group").appendChild(errorMsg);
    //     }
    //     errorMsg.textContent = "Quý khách vui lòng chọn ít nhất 1 địa điểm tham dự";
    //     setTimeout(() => (errorMsg.textContent = ""), 3000);
    //     return;
    //   }
    // }

    // Lấy danh sách địa điểm đã chọn
    // const locations = confirm === "Yes"
    //   ? [...document.querySelectorAll('input[name="location"]:checked')]
    //     .map((cb) => cb.value)
    //     .join(", ")
    //   : "";

    // =========================
    // i18n Messages
    // =========================
    const messages = {
      vi: {
        sendingTitle: "Đang gửi...",
        sendingText: "Vui lòng chờ trong giây lát",
        successTitle: "Thành công!",
        successText:
          "Cảm ơn bạn đã xác nhận. Thông tin đã được chuyển đến cô dâu và chú rể rồi nha.",
        errorTitle: "Lỗi!",
        errorServer: "OPPS! Không tìm thấy server",
        errorRetry: "Thử lại",
      },
      en: {
        sendingTitle: "Sending...",
        sendingText: "Please wait a moment",
        successTitle: "Success!",
        successText:
          "Thank you for your confirmation. Your information has been forwarded to the bride and groom.",
        errorTitle: "Error!",
        errorServer: "OPPS! Server not found",
        errorRetry: "Try again",
      },
    };

    const t = messages[lang] || messages.vi;

    // =========================
    // Loading popup
    // =========================
    Swal.fire({
      title: t.sendingTitle,
      text: t.sendingText,
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const sheetURL = "?sheet=nhatrai_confirm";

    try {
      const res = await fetch(sheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name,
          confirm,
          guest_number,
          wish,
        }),
      });

      // Nếu server lỗi HTTP
      if (!res.ok) {
        throw new Error("Server response not OK");
      }

      const result = await res.json().catch(() => null);

      if (!result) {
        Swal.fire({
          title: t.errorTitle,
          text: t.errorServer,
          icon: "error",
          confirmButtonText: t.errorRetry,
          confirmButtonColor: "#3c7fc2",
        });
        return;
      }

      form.reset();

      Swal.fire({
        title: t.successTitle,
        text: t.successText,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3c7fc2",
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: t.errorTitle,
        text: error.message || t.errorServer,
        icon: "error",
        confirmButtonText: t.errorRetry,
        confirmButtonColor: "#3c7fc2",
      });
    }
  }

  function initRSVP() {
    // const confirm = document.querySelectorAll('input[name="confirm"]')
    // confirm.forEach((radio) => {
    //   radio.addEventListener("change", function () {
    //     const locationGroup = document.getElementById("location-group");
    //     if (this.value === "Yes") {
    //       locationGroup.classList.remove("hidden");
    //     } else {
    //       locationGroup.classList.add("hidden");
    //     }
    //   });
    // })
    // const defaultConfirm = document.querySelector('input[name="confirm"]:checked');
    // if (defaultConfirm && defaultConfirm.value !== "Yes") {
    //   document.getElementById("location-group").classList.add("hidden");
    // }

    const form = document.forms["rsvpForm"];
    if (form) {
      form.addEventListener("submit", (e) => handleFormSubmit(e, "vi"));
    }
  }

  function initAnimations() {
    const animationMap = {
      "flip": gsapFlipIn,
      "flip-yoyo": gsapFlipInThenYoyo,

      "fade-in": gsapFadeIn,
      "fade-in-end": gsapFadeInForEnd,
      "fade-in-yoyo": gsapFadeInThenYoyo,
      "fade-in-pulse": gsapFadeInThenPulse,

      "zoom-in": gsapZoomIn,
      "zoom-out": gsapZoomOut,
      "zoom-in-out": gsapZoomInOutLoop,

      "fade-right": gsapFadeRight,
      "fade-left": gsapFadeLeft,
      "fade-up": gsapFadeUp,
      "fade-down": gsapFadeDown,

      "rotate-bl": gsapRotateBottomLeft,
      "rotate-br": gsapRotateBottomRight,
      "rotate-bl-yoyo": gsapRotateBottomLeftThenYoyo,
      "rotate-br-yoyo": gsapRotateBottomRightThenYoyo,

      "flip-vertical-left": gsapFlipVerticalLeft,
      "flip-vertical-bottom": gsapFlipVerticalBottom,

      "roll-in-left": gsapRollInLeft,
      "rotate-bl--float": gsap_rotate_bl__float,
    };

    document.querySelectorAll("[data-animate]").forEach((el) => {
      const type = el.dataset.animate;
      const fn = animationMap[type];

      if (!fn) {
        console.warn(`Animation "${type}" not found.`);
        return;
      }

      const options = {
        delay: parseFloat(el.dataset.animateDelay) || 0,
        duration: parseFloat(el.dataset.animateDuration) || 1.5,
        scrollStart: el.dataset.animateScrollStart || "top 85%",
      };

      fn(el, options);
    });
  }

  /* ======================================================
       BOOTSTRAP
    ====================================================== */

  let musicInitialized = false;

  function ensureMusicInitialized() {
    if (musicInitialized) return;

    initMusic();
    musicInitialized = true;
  }

  function playMusicAfterLanguageSelection(event) {
    ensureMusicInitialized();

    if (event?.detail?.source !== "popup") return;

    const audio = qs("#audio");
    if (!audio || !audio.paused) return;

    audio.play().catch((err) => {
      console.log("Autoplay blocked:", err);
    });
  }

  function init() {
    gsap.registerPlugin(ScrollTrigger);
    // initPage();
    // initMenu();
    // loadGuest();
    // initLetterAnimation();
    initAnimations();
    // initSwiper();
    window.addEventListener("lang:changed", playMusicAfterLanguageSelection);
    initDresscodeAnimation();
    initTimeline();
    // initFAQ();
    initRSVP();
    // startCountdown(new Date("2026-03-06T16:00:00"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
