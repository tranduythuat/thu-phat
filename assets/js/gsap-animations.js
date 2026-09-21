// Không dùng export để hỗ trợ chạy bằng script thuần
const createScrollTrigger = (element, start = "top 85%", extra = {}) => ({
  trigger: element,
  start,
  once: true,
  toggleActions: "play none none none",
  ...extra,
});

function gsapFlipIn(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.to(el, {
      rotateY: 0,
      scale: 1,
      filter: "brightness(1)",
      opacity: 1,
      duration: 2,
      ease: "back.out(1.5)",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsapFlipInThenYoyo(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    let tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(el),
    });

    tl.to(el, {
      rotateY: 0,
      scale: 1,
      filter: "brightness(1)",
      opacity: 1,
      duration: 2,
      ease: "back.out(1.5)",
    });

    tl.to(el, {
      y: -8,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  })
}

function gsapFadeIn(element, options = {}) {
  const {
    delay = 0,
    duration = 1.5,
    scrollStart = "top 85%"
  } = options;

  gsap.fromTo(
    element,
    { opacity: 0, y: 50, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      delay,
      duration,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger(element, scrollStart),
      clearProps: "filter",
    }
  );
}

function gsapZoomIn(element, options = {}) {
  const {
    delay = 0,
    duration = 1,
    scrollStart = "top 85%"
  } = options;

  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.6 },
    {
      opacity: 1,
      scale: 1,
      delay,
      duration,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger(element, scrollStart),
      clearProps: "transform",
    }
  );
}

function gsapZoomOut(element, options = {}) {
  const {
    delay = 0,
    duration = 1,
    scrollStart = "top 85%"
  } = options;

  gsap.fromTo(
    element,
    { opacity: 0, scale: 1.6 },
    {
      opacity: 1,
      scale: 1,
      delay,
      duration,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger(element, scrollStart),
      clearProps: "transform",
    }
  );
}

function gsapZoomInOutLoop(element, options = {}) {
  const {
    delay = 0,
    duration = 1,
    scrollStart = "top 85%",
    minScale = 0.94,
    maxScale = 1.06,
    pulseDuration = 1.6
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: createScrollTrigger(element, scrollStart),
  });

  // Zoom-in xuất hiện
  tl.fromTo(
    element,
    { opacity: 0, scale: 0.6 },
    {
      opacity: 1,
      scale: 1,
      delay,
      duration,
      ease: "power2.out",
    }
  );

  // Sau đó phập phồng zoom-in / zoom-out liên tục (thở)
  tl.to(element, {
    scale: maxScale,
    duration: pulseDuration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
  });

  return tl;
}

function gsapFadeInForEnd(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter",
        scrollTrigger: createScrollTrigger(el, "top 100%")
      }
    );
  });

  ScrollTrigger.refresh();
}

function gsapFadeInThenYoyo(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(el),
    });

    tl.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    tl.call(() => {
      gsap.to(el, {
        rotation: () => gsap.utils.random(-6, 6),
        y: "+=3",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  })
}

function gsapFadeInThenPulse(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    el.classList.add("pulse");
    const tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(el),
    });

    // 1️⃣ Fade-in
    tl.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    // 2️⃣ Nhấp nhô sau khi hoàn thành
    tl.call(() => {
      gsap.to(el, {
        scale: 1.1,      // biên độ nhấp nhô
        duration: 1,    // tốc độ
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%"
      });
    });
  });
}

function gsapFadeRight(element, options = {}) {
  const {
    delay = 0,
    duration = 1,
    scrollStart = "top 85%"
  } = options;

  gsap.fromTo(
    element,
    { opacity: 0, x: -80 },
    {
      opacity: 1,
      x: 0,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger(element, scrollStart),
    }
  );
}

function gsapFadeLeft(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: createScrollTrigger(el),
      }
    );
  });
}


function gsapFadeUp(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: createScrollTrigger(el),
      }
    );
  });
}

function gsapFadeDown(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: -120 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: createScrollTrigger(el),
      }
    );
  });
}


function gsapFlipVerticalLeft(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotateY: -180,
      scale: 0.8,
      opacity: 0,
      duration: 2,
      ease: "back.out(1.2)",
      transformOrigin: "center center",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsapFlipVerticalBottom(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotateX: -120,
      scale: 0.8,
      opacity: 0,
      duration: 2,
      ease: "back.out(1.2)",
      transformOrigin: "center center",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsapRotateBottomLeft(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotation: -55,
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "left bottom",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsapRotateBottomRight(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotation: 55,
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "right bottom",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsapRotateBottomLeftThenYoyo(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(el),
    });

    tl.from(el, {
      rotation: -55,
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "left bottom",
    });

    tl.to(el, {
      rotation: () => gsap.utils.random(-1.2, 1.2),
      duration: () => gsap.utils.random(2.8, 4.2),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "right bottom"
    });
  })
}

function gsapRotateBottomRightThenYoyo(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(el),
    });

    tl.from(el, {
      rotation: 55,
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "right bottom",
    });

    tl.to(el, {
      rotation: () => gsap.utils.random(-1.2, 1.2),
      duration: () => gsap.utils.random(2.8, 4.2),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "right bottom"
    });
  })
}

function gsapRollInLeft(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotation: -360,
      scale: 0.8,
      x: -800,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "center center",
      scrollTrigger: createScrollTrigger(el),
    });
  });
}

function gsap_rotate_bl__float(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      rotation: -90,
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
      transformOrigin: "left bottom",
      scrollTrigger: createScrollTrigger(el),
      onComplete: () => {
        gsap.to(el, {
          y: -15,
          rotation: 3,
          duration: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: false,
        });
      }
    });
  });
}