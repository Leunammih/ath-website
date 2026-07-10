/* Annika Tara — subtle motion, nothing distracting.
   Respects prefers-reduced-motion throughout. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── Nav: solid on scroll ──────────────────────────────── */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ─── Mobile menu ───────────────────────────────────────── */
const burger = document.getElementById("burger");
const links = document.querySelector(".nav__links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ─── Reveal on scroll ──────────────────────────────────── */
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal, .hero__plant").forEach(el => io.observe(el));

/* ─── Hero parallax (mouse + scroll), lerped for softness ─ */
const layers = [...document.querySelectorAll("[data-depth]")];
let mx = 0, my = 0, tx = 0, ty = 0;

if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", e => {
    tx = (e.clientX / innerWidth - 0.5) * 2;   // -1 … 1
    ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  (function drift() {
    mx += (tx - mx) * 0.045;
    my += (ty - my) * 0.045;
    for (const el of layers) {
      const d = parseFloat(el.dataset.depth);
      el.style.transform =
        `translate3d(${(-mx * 40 * d).toFixed(2)}px, ${(-my * 26 * d).toFixed(2)}px, 0)`;
    }
    requestAnimationFrame(drift);
  })();
}

/* ─── Hero dust: drifting gold motes on canvas ──────────── */
const canvas = document.getElementById("dust");
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let w, h, motes = [];

  const resize = () => {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  };
  resize();
  window.addEventListener("resize", resize);

  const N = Math.min(46, Math.floor(innerWidth / 30));
  for (let i = 0; i < N; i++) {
    motes.push({
      x: Math.random(), y: Math.random(),
      r: 0.7 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: -0.00004 - Math.random() * 0.00008,
      tw: Math.random() * Math.PI * 2,          // twinkle phase
      sp: 0.4 + Math.random() * 0.9
    });
  }

  (function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const m of motes) {
      m.x += m.vx * m.sp * 16 + mx * 0.00003;   // barely nudged by the cursor
      m.y += m.vy * m.sp * 16;
      if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
      if (m.x < -0.02) m.x = 1.02;
      if (m.x > 1.02) m.x = -0.02;

      const twinkle = 0.35 + 0.3 * Math.sin(t * 0.001 * m.sp + m.tw);
      ctx.beginPath();
      ctx.arc(m.x * w, m.y * h, m.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 162, 39, ${twinkle.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })(0);
}

/* ─── The moth: click for a little flutter ──────────────── */
const moth = document.getElementById("moth");
if (moth) {
  moth.addEventListener("click", () => {
    moth.classList.remove("flutter");
    void moth.offsetWidth;               // restart animation
    moth.classList.add("flutter");
  });
}
