import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------GSAP SETUP---------------- */

gsap.registerPlugin(ScrollTrigger);

/* -----------------------PAGE INITIALIZATION----------------------- */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
const resetPagePosition = () => {
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  const isReload = navigationEntry?.type === "reload";
  if (!isReload) return;
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  });
};
window.addEventListener("load", resetPagePosition);
window.addEventListener("pageshow", resetPagePosition);

/* -----------------------DOM ELEMENTS----------------------- */

const heroSection = document.querySelector(".hero-section");
const heroEyebrow = document.querySelector(".hero-eyebrow");
const heroLines = document.querySelectorAll(".hero-line");
const heroDescription = document.querySelector(".hero-description");
const heroRole = document.querySelector(".hero-role");
const heroButtons = document.querySelector(".hero-buttons");
const heroVisual = document.querySelector(".hero-visual");
const heroSun = document.querySelector(".hero-sun");
const codeBubbles = document.querySelectorAll(".code-bubble");
const particles = document.querySelectorAll(".particle");
const socialLinks = document.querySelectorAll(".social-links a");
const techItems = document.querySelectorAll(".tech-list span");
const navLinks = document.querySelectorAll(".nav-link");

/* -----------------------HERO ENTRANCE ANIMATION----------------------- */

const heroTimeline = gsap.timeline({
  defaults: {
    ease: "power4.out",
  },
});

heroTimeline
  .from(".navbar", {
    y: -40,
    opacity: 0,
    duration: 1,
  })
  .from(
    heroEyebrow,
    {
      y: 30,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.5",
  )
  .from(
    heroLines,
    {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
    },
    "-=0.3",
  )
  .from(
    heroDescription,
    {
      y: 25,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.6",
  )
  .from(
    heroRole,
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.4",
  )
  .from(
    heroButtons,
    {
      y: 25,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.3",
  )
  .from(
    heroVisual,
    {
      x: -120,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    },
    "0",
  )
  .from(
    socialLinks,
    {
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
    },
    "-=0.8",
  );

/* -----------------------HERO FLOATING ANIMATION----------------------- */

gsap.to(heroSun, {
  scale: 1.08,
  opacity: 0.85,
  duration: 3,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
});

/* Code bubbles */

codeBubbles.forEach((bubble, index) => {
  gsap.to(bubble, {
    y: index % 2 === 0 ? -12 : 12,
    rotation: index % 2 === 0 ? 3 : -3,
    duration: 2.5 + index,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
});

/* -----------------------PARTICLE MOTION----------------------- */

const particleData = [];

particles.forEach((particle, index) => {
  const randomX = gsap.utils.random(-25, 25);
  const randomY = gsap.utils.random(-25, 25);
  const duration = gsap.utils.random(2, 5);

  particleData.push({
    element: particle,
    depth: gsap.utils.random(0.3, 1.5),
    rotation: gsap.utils.random(-180, 180),
    baseX: randomX,
    baseY: randomY,
  });

  /* Continuous floating */

  gsap.to(particle, {
    x: randomX,
    y: randomY,
    rotation: gsap.utils.random(-180, 180),
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: gsap.utils.random(0, 2),
  });
});

/* -----------------------MOUSE PARTICLE FIELD----------------------- */

let mouseX = 0;
let mouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

heroSection.addEventListener("mousemove", (event) => {
  const rect = heroSection.getBoundingClientRect();

  mouseX = (event.clientX - rect.left) / rect.width - 0.5;

  mouseY = (event.clientY - rect.top) / rect.height - 0.5;
});

gsap.ticker.add(() => {
  currentMouseX += (mouseX - currentMouseX) * 0.06;

  currentMouseY += (mouseY - currentMouseY) * 0.06;

  particleData.forEach((particle) => {
    const depth = particle.depth;

    const moveX = currentMouseX * 45 * depth;

    const moveY = currentMouseY * 35 * depth;

    gsap.set(particle.element, {
      x: particle.baseX + moveX,
      y: particle.baseY + moveY,
    });
  });
});

/* -----------------------TECH ITEMS HOVER----------------------- */

techItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      color: "#FF5F00",
      y: -3,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      color: "rgba(255,255,255,0.75)",
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  });
});

/* -----------------------NAVIGATION HOVER----------------------- */

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  });
});

/* -----------------------HERO PARALLAX----------------------- */

heroSection.addEventListener("mousemove", (event) => {
  const rect = heroSection.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width - 0.5;

  const y = (event.clientY - rect.top) / rect.height - 0.5;

  gsap.to(".hero-orbit", {
    x: x * 15,
    y: y * 15,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".code-bubble", {
    x: x * 20,
    y: y * 20,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".particle", {
    x: x * 30,
    y: y * 30,
    duration: 1.2,
    ease: "power2.out",
  });
});

/* -----------------------BUTTON HOVER----------------------- */

const buttons = document.querySelectorAll(".primary-button, .talk-button");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });
});

/* -----------------------HERO IMAGE FLOAT----------------------- */

const heroPerson = document.querySelector(".hero-person");

const heroPersonImage = document.querySelector(".hero-person img");

if (heroPerson) {
  gsap.to(heroPersonImage, {
    y: -8,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/* =====================================================
   SECTION 02
   SELECTED WORK
===================================================== */

/* =====================================================
   SECTION 02 — SELECTED WORK
===================================================== */
const initSelectedWork = () => {
  const section = document.querySelector("#work");
  if (!section) return;
  const ctx = gsap.context(() => {
    const contents = gsap.utils.toArray(
      section.querySelectorAll(".work-content"),
    );
    const images = gsap.utils.toArray(section.querySelectorAll(".work-image"));
    const currentNumber = section.querySelector(".current-work");
    const progress = section.querySelector(".work-progress-fill");
    const orbs = gsap.utils.toArray(section.querySelectorAll(".work-orb"));
    if (contents.length === 0 || images.length === 0) return;
    /* ---------------------------------------------
       INITIAL STATES
    --------------------------------------------- */
    gsap.set(contents, {
      autoAlpha: 0,
      y: 70,
    });
    gsap.set(images, {
      autoAlpha: 0,
      y: 70,
      scale: 0.94,
    });
    /* ---------------------------------------------
       FIRST PROJECT INITIAL REVEAL
    --------------------------------------------- */
    const firstReveal = gsap.timeline({
      paused: true,
    });
    firstReveal
      .to(contents[0], {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      })
      .to(
        images[0],
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "<0.12",
      );
    /* ---------------------------------------------
       SECTION 02 PIN + FIRST REVEAL
    --------------------------------------------- */
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        firstReveal.play();
      },
    });
    /* ---------------------------------------------
       MASTER SCROLL TIMELINE
    --------------------------------------------- */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${(contents.length - 1) * 1000}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    /* ---------------------------------------------
       FIRST PROJECT HOLD
    --------------------------------------------- */
    timeline.to(
      {},
      {
        duration: 1,
      },
    );
    /* ---------------------------------------------
   PROJECT TRANSITIONS
--------------------------------------------- */
    const projectPositions = [timeline.duration()];
    for (let index = 0; index < contents.length - 1; index++) {
      const currentContent = contents[index];
      const nextContent = contents[index + 1];
      const currentImage = images[index];
      const nextImage = images[index + 1];
      /* ---------------------------------------------
     CURRENT PROJECT OUT
  --------------------------------------------- */
      timeline
        .to(currentContent, {
          autoAlpha: 0,
          y: -80,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          currentImage,
          {
            autoAlpha: 0,
            y: -80,
            scale: 0.94,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<",
        );
      /* ---------------------------------------------
     NEXT PROJECT POSITION
  --------------------------------------------- */
      const nextProjectPosition = timeline.duration() - 0.12;
      projectPositions.push(nextProjectPosition);
      /* ---------------------------------------------
     NEXT PROJECT IN
  --------------------------------------------- */
      timeline
        .fromTo(
          nextContent,
          {
            autoAlpha: 0,
            y: 80,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.12",
        )
        .fromTo(
          nextImage,
          {
            autoAlpha: 0,
            y: 80,
            scale: 0.94,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "<0.12",
        );
      /* ---------------------------------------------
     PROJECT BREATHING SPACE
  --------------------------------------------- */
      timeline.to(
        {},
        {
          duration: 0.5,
        },
      );
    }

    /* ---------------------------------------------
   PROJECT COUNTER SYNC
--------------------------------------------- */
    const updateProjectCounter = () => {
      if (!currentNumber) return;
      const currentTime = timeline.time();
      let activeProject = 0;
      for (let index = 0; index < projectPositions.length; index++) {
        if (currentTime >= projectPositions[index]) {
          activeProject = index;
        }
      }
      currentNumber.textContent = String(activeProject + 1).padStart(2, "0");
      if (progress) {
        const totalProjects = contents.length;
        const progressValue = activeProject / (totalProjects - 1);
        gsap.set(progress, {
          scaleX: Math.max(0.2, progressValue),
        });
      }
    };
    timeline.eventCallback("onUpdate", updateProjectCounter);
    updateProjectCounter();
    timeline.eventCallback("onUpdate", updateProjectCounter);
    updateProjectCounter();
    /* ---------------------------------------------
       GLASS ORBS
    --------------------------------------------- */
    orbs.forEach((orb, index) => {
      const movement = [
        {
          x: 18,
          y: -22,
          rotation: 5,
          duration: 4.5,
        },
        {
          x: -18,
          y: 20,
          rotation: -7,
          duration: 5,
        },
        {
          x: 10,
          y: -14,
          rotation: 8,
          duration: 3.8,
        },
      ][index];
      if (!movement) return;
      gsap.to(orb, {
        x: movement.x,
        y: movement.y,
        rotation: movement.rotation,
        duration: movement.duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
    /* ---------------------------------------------
       ORB MOUSE MOVEMENT
    --------------------------------------------- */
    section.addEventListener("mousemove", (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          x: x * (20 + index * 15),
          y: y * (20 + index * 15),
          duration: 1,
          ease: "elastic.out(1, 0.45)",
        });
      });
    });
    /* ---------------------------------------------
       PROJECT IMAGE HOVER
    --------------------------------------------- */
    images.forEach((image) => {
      const imageElement = image.querySelector("img");
      if (!imageElement) return;
      image.addEventListener("mouseenter", () => {
        gsap.to(imageElement, {
          scale: 1.04,
          duration: 0.7,
          ease: "power3.out",
        });
      });
      image.addEventListener("mouseleave", () => {
        gsap.to(imageElement, {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    });
  }, section);
  return ctx;
};

/* =====================================================
   SECTION 03 — ABOUT ME
===================================================== */
const initAboutSection = () => {
  const section = document.querySelector("#about");
  if (!section) return;
  const ctx = gsap.context(() => {
    const number = section.querySelector(".about-section-number");
    const label = section.querySelector(".about-section-label");
    const copy = section.querySelector(".about-copy");
    const visual = section.querySelector(".about-visual");
    const frame = section.querySelector(".about-image-frame");
    const rings = gsap.utils.toArray(section.querySelectorAll(".about-ring"));
    const floatingCards = gsap.utils.toArray(
      section.querySelectorAll(".about-floating-card"),
    );
    const features = gsap.utils.toArray(
      section.querySelectorAll(".about-feature"),
    );
    const orbs = gsap.utils.toArray(section.querySelectorAll(".about-orb"));
    /* ---------------------------------------------
       INITIAL ENTRANCE STATE
    --------------------------------------------- */
    gsap.set(number, {
      autoAlpha: 0,
      x: -120,
    });
    gsap.set(label, {
      autoAlpha: 0,
      x: -100,
    });
    gsap.set(copy, {
      autoAlpha: 0,
      x: -300,
    });
    gsap.set(visual, {
      autoAlpha: 0,
      x: 300,
      scale: 0.82,
    });
    gsap.set(frame, {
      autoAlpha: 0,
      scale: 0.7,
      rotation: 8,
    });
    gsap.set(features, {
      autoAlpha: 0,
      x: 260,
    });
    gsap.set(floatingCards, {
      autoAlpha: 0,
      scale: 0.5,
      y: 80,
    });
    /* ---------------------------------------------
       SECTION 03 ENTRANCE TIMELINE
    --------------------------------------------- */
    const entrance = gsap.timeline({
      paused: true,
    });
    entrance
      .to(
        number,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power4.out",
        },
        0,
      )
      .to(
        label,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power4.out",
        },
        0.05,
      )
      .to(
        copy,
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
        },
        0,
      )
      .to(
        visual,
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        0,
      )
      .to(
        frame,
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.15,
      )
      .to(
        features,
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.1,
      )
      .to(
        floatingCards,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.4)",
        },
        0.3,
      );
    /* ---------------------------------------------
   SECTION 03 ENTER
--------------------------------------------- */
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entrance.play();
            aboutObserver.unobserve(section);
          }
        });
      },
      {
        threshold: 0.05,
      },
    );
    aboutObserver.observe(section);
    /* ---------------------------------------------
       ROTATING RINGS
    --------------------------------------------- */
    gsap.to(rings, {
      rotation: 360,
      duration: 28,
      ease: "none",
      repeat: -1,
      stagger: 1,
    });
    /* ---------------------------------------------
       FLOATING GLASS CARDS
    --------------------------------------------- */
    floatingCards.forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -12 : 12,
        duration: 2.8 + index * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
    /* ---------------------------------------------
       GLASS ORBS
    --------------------------------------------- */
    if (orbs[0]) {
      gsap.to(orbs[0], {
        x: 18,
        y: -20,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    if (orbs[1]) {
      gsap.to(orbs[1], {
        x: -15,
        y: 18,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    /* ---------------------------------------------
       IMAGE HOVER
    --------------------------------------------- */
    if (frame) {
      frame.addEventListener("mouseenter", () => {
        gsap.to(frame, {
          scale: 1.04,
          duration: 0.5,
          ease: "power3.out",
        });
      });
      frame.addEventListener("mouseleave", () => {
        gsap.to(frame, {
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    }
    /* ---------------------------------------------
       FEATURE HOVER
    --------------------------------------------- */
    features.forEach((feature) => {
      const icon = feature.querySelector(".about-feature-icon");
      if (!icon) return;
      feature.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 8,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      feature.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
    /* ---------------------------------------------
       MOUSE PARALLAX
    --------------------------------------------- */
    section.addEventListener("mousemove", (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(rings, {
        x: x * 12,
        y: y * 12,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(floatingCards, {
        x: x * 15,
        y: y * 15,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(frame, {
        x: x * 8,
        y: y * 5,
        duration: 1,
        ease: "power3.out",
      });
    });
    section.addEventListener("mouseleave", () => {
      gsap.to(rings, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(floatingCards, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(frame, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
  }, section);
  return ctx;
};

/* =====================================================
   SECTION 04 — TECH STACK
===================================================== */
const initTechStack = () => {
  const section = document.querySelector("#tech-stack");
  if (!section) return;
  const ctx = gsap.context(() => {
    const heading = section.querySelector(".stack-heading");
    const number = section.querySelector(".stack-section-number");
    const label = section.querySelector(".stack-section-label");
    const title = section.querySelector(".stack-title");
    const description = section.querySelector(".stack-description");
    const marquee = section.querySelector(".stack-marquee-wrapper");
    const bottom = section.querySelector(".stack-bottom");
    const orbs = section.querySelectorAll(".stack-orb");
    /* ---------------------------------------------
       INITIAL ENTRANCE STATE
    --------------------------------------------- */
    gsap.set(number, {
      autoAlpha: 0,
      x: -100,
    });
    gsap.set(label, {
      autoAlpha: 0,
      x: -80,
    });
    gsap.set(title, {
      autoAlpha: 0,
      y: 100,
    });
    gsap.set(description, {
      autoAlpha: 0,
      y: 50,
    });
    gsap.set(marquee, {
      autoAlpha: 0,
      y: 120,
      scale: 0.94,
    });
    gsap.set(bottom, {
      autoAlpha: 0,
      y: 35,
    });
    /* ---------------------------------------------
       SECTION 04 ENTRANCE TIMELINE
    --------------------------------------------- */
    const entrance = gsap.timeline({
      paused: true,
    });
    entrance
      .to(
        number,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        0,
      )
      .to(
        label,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        0.05,
      )
      .to(
        title,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        0,
      )
      .to(
        description,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.25,
      )
      .to(
        marquee,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
        },
        0.2,
      )
      .to(
        bottom,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        0.65,
      );
    /* ---------------------------------------------
       SECTION 04 ENTER
    --------------------------------------------- */
    const stackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entrance.play();
            stackObserver.unobserve(section);
          }
        });
      },
      {
        threshold: 0.05,
      },
    );
    stackObserver.observe(section);
    /* ---------------------------------------------
   INFINITE TECH MARQUEE
--------------------------------------------- */

    const trackOne = section.querySelector(".stack-marquee-one .stack-track");
    const trackTwo = section.querySelector(".stack-marquee-two .stack-track");

    let marqueeOneX = 0;
    let marqueeTwoX = 0;

    let marqueeOneWidth = 0;
    let marqueeTwoWidth = 0;

    const marqueeOneSpeed = 200;
    const marqueeTwoSpeed = 200;

    const getLoopWidth = (track) => {
      if (!track || !track.children.length) return 0;

      const items = Array.from(track.children);
      const half = Math.floor(items.length / 2);

      if (!items[half]) return 0;

      return items[half].offsetLeft - items[0].offsetLeft;
    };

    const updateMarqueeSizes = () => {
      marqueeOneWidth = getLoopWidth(trackOne);
      marqueeTwoWidth = getLoopWidth(trackTwo);

      if (trackOne && marqueeOneWidth > 0) {
        marqueeOneX =
          ((marqueeOneX % marqueeOneWidth) + marqueeOneWidth) % marqueeOneWidth;

        gsap.set(trackOne, {
          x:0,
        });
      }

      if (trackTwo && marqueeTwoWidth > 0) {
        marqueeTwoX =
          ((marqueeTwoX % marqueeTwoWidth) + marqueeTwoWidth) % marqueeTwoWidth;

        gsap.set(trackTwo, {
          x: -marqueeTwoWidth,
        });
      }
    };

    /* Wait for all technology logos before measuring */

    const stackImages = section.querySelectorAll(".stack-item img");

    let imagesLoaded = 0;

    const refreshMarqueeAfterImageLoad = () => {
      imagesLoaded++;

      if (imagesLoaded >= stackImages.length) {
        updateMarqueeSizes();
      }
    };

    stackImages.forEach((image) => {
      if (image.complete) {
        refreshMarqueeAfterImageLoad();
      } else {
        image.addEventListener("load", refreshMarqueeAfterImageLoad, {
          once: true,
        });

        image.addEventListener("error", refreshMarqueeAfterImageLoad, {
          once: true,
        });
      }
    });

    /* Initial measurement */

    updateMarqueeSizes();

    /* Continuous movement */

    const marqueeTicker = (time, deltaTime) => {
      const delta = Math.min(deltaTime / 1000, 0.05);
      if (trackOne && marqueeOneWidth > 0) {
        marqueeOneX += marqueeOneSpeed * delta;
        if (marqueeOneX >= marqueeOneWidth) {
          marqueeOneX -= marqueeOneWidth;
        }
        gsap.set(trackOne, {
          x: -marqueeOneX,
        });
      }
      if (trackTwo && marqueeTwoWidth > 0) {
        marqueeTwoX += marqueeTwoSpeed * delta;
        if (marqueeTwoX >= 0) {
          marqueeTwoX = -marqueeTwoWidth;
        }
        gsap.set(trackTwo, {
          x: marqueeTwoX,
        });
      }
    };

    gsap.ticker.add(marqueeTicker);

    /* Recalculate when viewport changes */

    window.addEventListener("resize", updateMarqueeSizes);

    /* ---------------------------------------------
   MARQUEE HOVER
--------------------------------------------- */

    section.querySelectorAll(".stack-marquee").forEach((marquee) => {
      marquee.addEventListener("mouseenter", () => {
        gsap.to(marquee, {
          opacity: 0.92,
          duration: 0.25,
          ease: "power2.out",
        });
      });

      marquee.addEventListener("mouseleave", () => {
        gsap.to(marquee, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      });
    });
    /* ---------------------------------------------
       ORB MOTION
    --------------------------------------------- */
    if (orbs[0]) {
      gsap.to(orbs[0], {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }
    if (orbs[1]) {
      gsap.to(orbs[1], {
        x: 25,
        y: -20,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    /* ---------------------------------------------
       MOUSE PARALLAX
    --------------------------------------------- */
    section.addEventListener("mousemove", (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(orbs, {
        x: x * 18,
        y: y * 15,
        duration: 1,
        ease: "power3.out",
      });
    });
    section.addEventListener("mouseleave", () => {
      gsap.to(orbs, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
  }, section);
  return ctx;
};


initTechStack();
initAboutSection();
heroTimeline.eventCallback("onComplete", () => {
  initSelectedWork();
  ScrollTrigger.refresh();
});
/* =====================================================
   SECTION 05 — CONTACT ENTRANCE
===================================================== */
const initContactSection = () => {
  const section = document.querySelector("#contact");
  if (!section) return;
  const availability = section.querySelector(".contact-availability");
  const dot = section.querySelector(".contact-status-dot");
  const title = section.querySelector(".contact-title");
  const actions = section.querySelector(".contact-actions");
  const visual = section.querySelector(".contact-visual");
  const quote = section.querySelector(".contact-quote");
  const signature = section.querySelector(".contact-signature");
  const background = section.querySelector(".contact-bg");
  const footer = document.querySelector(".site-footer");
  if (!availability || !title || !actions || !visual) return;
  /* ---------------------------------------------
     INITIAL STATES
  --------------------------------------------- */
  gsap.set(availability, {
    autoAlpha: 0,
    x: -180,
  });
  gsap.set(title, {
    autoAlpha: 0,
    x: -280,
  });
  gsap.set(actions, {
    autoAlpha: 0,
    x: -160,
  });
  gsap.set(visual, {
    autoAlpha: 0,
    x: 280,
    scale: 0.85,
  });
  if (quote) {
    gsap.set(quote, {
      autoAlpha: 0,
      x: 140,
    });
  }
  if (signature) {
    gsap.set(signature, {
      autoAlpha: 0,
      x: 120,
      y: 40,
      rotation: -12,
    });
  }
  if (background) {
    gsap.set(background, {
      scale: 1.12,
      x: 80,
    });
  }
  if (footer) {
    gsap.set(footer, {
      autoAlpha: 0,
      y: 30,
    });
  }
  if (dot) {
    gsap.set(dot, {
      autoAlpha: 0,
      scale: 0,
    });
  }
  /* ---------------------------------------------
     ENTRANCE TIMELINE
  --------------------------------------------- */
  const entrance = gsap.timeline({
    paused: true,
  });
  entrance
    .to(
      background,
      {
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power4.out",
      },
      0,
    )
    .to(
      availability,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        ease: "power4.out",
      },
      0,
    )
    .to(
      dot,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.45,
        ease: "back.out(2)",
      },
      0.15,
    )
    .to(
      title,
      {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
      },
      0.1,
    )
    .to(
      actions,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      0.35,
    )
    .to(
      visual,
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
      },
      0.05,
    )
    .to(
      quote,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0.4,
    )
    .to(
      signature,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: -7,
        duration: 0.75,
        ease: "back.out(1.4)",
      },
      0.5,
    )
    .to(
      footer,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      0.6,
    );
  /* ---------------------------------------------
     NATIVE SCROLL DETECTION
  --------------------------------------------- */
  let hasEntered = false;
  let lastScrollY = window.scrollY;
  const checkContactPosition = () => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const enterPoint = viewportHeight * 0.82;
    const leavePoint = viewportHeight * 0.98;
    if (!hasEntered && rect.top <= enterPoint && rect.bottom > leavePoint) {
      hasEntered = true;
      entrance.play();
    }
    if (hasEntered && rect.top > viewportHeight * 0.95) {
      hasEntered = false;
      entrance.reverse();
    }
    lastScrollY = window.scrollY;
  };
  window.addEventListener("scroll", checkContactPosition, {
    passive: true,
  });
  window.addEventListener("resize", checkContactPosition);
  requestAnimationFrame(() => {
    requestAnimationFrame(checkContactPosition);
  });
  /* ---------------------------------------------
     AVAILABILITY DOT
  --------------------------------------------- */
  if (dot) {
    gsap.to(dot, {
      boxShadow: "0 0 20px rgba(53,199,89,0.9)",
      duration: 1.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }
  /* ---------------------------------------------
     CONNECT BUTTON HOVER
  --------------------------------------------- */
  const connectButton = section.querySelector(".contact-linkedin");
  if (connectButton) {
    connectButton.addEventListener("mouseenter", () => {
      gsap.to(connectButton, {
        y: -4,
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    connectButton.addEventListener("mouseleave", () => {
      gsap.to(connectButton, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
  /* ---------------------------------------------
     RESUME HOVER
  --------------------------------------------- */
  const resumeButton = section.querySelector(".contact-resume");
  const downloadIcon = section.querySelector(".contact-download-icon");
  if (resumeButton && downloadIcon) {
    resumeButton.addEventListener("mouseenter", () => {
      gsap.to(downloadIcon, {
        y: 5,
        duration: 0.25,
        ease: "power2.out",
      });
    });
    resumeButton.addEventListener("mouseleave", () => {
      gsap.to(downloadIcon, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  }
};
/* =====================================================
   INITIALIZE SECTION 05
===================================================== */
initContactSection();