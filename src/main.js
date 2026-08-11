import "./style.css";
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------GSAP SETUP---------------- */

gsap.registerPlugin(ScrollTrigger);

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
  particleData.forEach((particle, index) => {
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

/* -----------------------REFRESH SCROLLTRIGGER----------------------- */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

const heroPerson = document.querySelector(".hero-person");

const heroPersonImage = document.querySelector(".hero-person img");

if (heroPerson) {
  gsap.from(heroPerson, {
    x: -120,
    opacity: 0,
    duration: 1.3,
    delay: 0.2,
    ease: "power4.out",
  });

  gsap.to(heroPersonImage, {
    y: -8,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}
