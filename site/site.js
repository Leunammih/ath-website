/* Annika Tara — Relational Life Coaching
   subtle motion, nothing distracting. Respects prefers-reduced-motion throughout. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

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
document.querySelectorAll(".reveal, .grow-reveal").forEach(el => io.observe(el));

/* ─── Mouse parallax (bg, plants), lerped for softness ──── */
const layers = [...document.querySelectorAll("[data-depth]")];
const glow = document.getElementById("glow");
let mx = 0, my = 0, tx = 0, ty = 0;   // lerped / target, -1 … 1

if (!reduceMotion && finePointer) {
  window.addEventListener("mousemove", e => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
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
    if (glow) {
      glow.style.transform =
        `translate3d(${(mx * innerWidth * 0.12).toFixed(1)}px, ${(my * innerHeight * 0.08).toFixed(1)}px, 0)`;
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

  const N = Math.min(42, Math.floor(innerWidth / 34));
  for (let i = 0; i < N; i++) {
    motes.push({
      x: Math.random(), y: Math.random(),
      r: 0.7 + Math.random() * 1.8,
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

      const twinkle = 0.32 + 0.28 * Math.sin(t * 0.001 * m.sp + m.tw);
      ctx.beginPath();
      ctx.arc(m.x * w, m.y * h, m.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 162, 39, ${twinkle.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })(0);
}

/* ─── Cards: soft tilt toward the cursor ────────────────── */
if (!reduceMotion && finePointer) {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${(px * 4).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-py * 3).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

/* ─── Floating book pill: appears once the hero is gone ─── */
const pill = document.getElementById("bookpill");
const hero = document.getElementById("hero");
const booking = document.getElementById("book");
if (pill && hero && booking) {
  let heroVisible = true, bookingVisible = false;
  const update = () =>
    pill.classList.toggle("show", !heroVisible && !bookingVisible);

  new IntersectionObserver(([e]) => {
    heroVisible = e.isIntersecting;
    update();
  }, { threshold: 0.12 }).observe(hero);

  new IntersectionObserver(([e]) => {
    bookingVisible = e.isIntersecting;
    update();
  }, { threshold: 0.15 }).observe(booking);
}

/* ─── Mock TidyCal booking widget (preview only) ─────────── */
(function mockBooking() {
  const grid = document.getElementById("tcm-grid");
  if (!grid) return;
  const monthEl  = document.getElementById("tcm-month");
  const slotDay  = document.getElementById("tcm-slotday");
  const slotList = document.getElementById("tcm-slotlist");
  const confirm  = document.getElementById("tcm-confirm");
  const [prevBtn, nextBtn] = document.querySelectorAll(".tcm__nav");
  const MONTHS = ["January","February","March","April","May","June","July",
                  "August","September","October","November","December"];
  const SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"];

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const monthStart = d => new Date(d.getFullYear(), d.getMonth(), 1);
  let view = monthStart(today);
  let selectedDay = null;

  const isOpen = d => { const wd = d.getDay(); return wd >= 1 && wd <= 5 && d >= today; };

  function render() {
    monthEl.textContent = MONTHS[view.getMonth()] + " " + view.getFullYear();
    prevBtn.disabled = view <= monthStart(today);
    prevBtn.style.opacity = prevBtn.disabled ? .35 : 1;
    grid.innerHTML = "";
    const startDow = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
    const daysIn = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let i = 0; i < startDow; i++) {
      const e = document.createElement("div");
      e.className = "tcm__day is-empty";
      grid.appendChild(e);
    }
    for (let day = 1; day <= daysIn; day++) {
      const d = new Date(view.getFullYear(), view.getMonth(), day);
      const b = document.createElement("button");
      b.type = "button"; b.className = "tcm__day"; b.textContent = day;
      if (isOpen(d)) {
        b.classList.add("is-open");
        b.addEventListener("click", () => selectDay(d, b));
      } else {
        b.classList.add("is-past"); b.disabled = true;
      }
      grid.appendChild(b);
    }
  }

  function selectDay(d, btn) {
    selectedDay = d;
    grid.querySelectorAll(".tcm__day").forEach(x => x.classList.remove("is-selected"));
    btn.classList.add("is-selected");
    slotDay.textContent = d.toLocaleDateString(undefined,
      { weekday: "long", month: "long", day: "numeric" });
    slotList.innerHTML = "";
    SLOTS.forEach(t => {
      const s = document.createElement("button");
      s.type = "button"; s.className = "tcm__slot"; s.textContent = t;
      s.addEventListener("click", () => {
        slotList.querySelectorAll(".tcm__slot").forEach(x => x.classList.remove("is-selected"));
        s.classList.add("is-selected");
        confirm.disabled = false;
      });
      slotList.appendChild(s);
    });
    confirm.disabled = true;
    confirm.textContent = "Confirm";
  }

  prevBtn.addEventListener("click", () => {
    if (view <= monthStart(today)) return;
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render();
  });
  nextBtn.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render();
  });
  confirm.addEventListener("click", () => {
    confirm.textContent = "✓ Held — preview only";
    confirm.disabled = true;
  });

  render();
  const firstOpen = grid.querySelector(".tcm__day.is-open");
  if (firstOpen) firstOpen.click();   // pre-select a day so slots show
})();
