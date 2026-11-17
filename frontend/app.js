const SERVICE_FALLBACK = [
  "img/services-web/therapy.jpg",
  "img/services-web/implantology.jpg",
  "img/services-web/orthodontics.jpg",
  "img/services-web/cosmetic.jpg",
  "img/services-web/periodontology.jpg",
  "img/services-web/surgery.jpg",
  "img/services-web/scanning.jpg",
  "img/services-web/tomography.jpg"
];

const TEAM_FALLBACK = ["img/doctors/tiko.jpg", "img/doctors/soso.jpg", "img/doctors/phati.jpg", "img/doctors/irakli.jpg"];

const state = {
  teamActive: 0
};
const SWAP_ANIMATION_MS = 190;
const DEFAULT_SERVICE_ID = SERVICES[0] ? SERVICES[0].id : "";

function telHref(phone) {
  return "tel:" + phone.replace(/[^+\d]/g, "");
}

function serviceId(i) {
  return SERVICES[i] && SERVICES[i].id ? SERVICES[i].id : DEFAULT_SERVICE_ID;
}

function serviceImage(i) {
  return SERVICES[i] && SERVICES[i].img ? ("img/" + SERVICES[i].img) : SERVICE_FALLBACK[i % SERVICE_FALLBACK.length];
}
function doctorName(d, lang, t) {
  return typeof d.name === "string" ? d.name : (d.name && d.name[lang]) || t.doctor;
}

function doctorRole(d, lang) {
  return d._r || (d.role && d.role[lang]) || "";
}

function doctorDescription(d, lang) {
  return (d.description && d.description[lang]) || (d.bio && d.bio[lang]) || doctorRole(d, lang);
}

function ensureTeamData(clinic, t) {
  if (clinic.doctors && clinic.doctors.length) return clinic.doctors;
  return t.roles.map((r, i) => ({ name: "", role: {}, _r: r, photo: TEAM_FALLBACK[i % TEAM_FALLBACK.length] }));
}

function renderServices(t) {
  const list = $("services-list");
  if (!list) return;

  list.innerHTML = t.services.map(([, title, desc], i) => `
    <article class="svc-item reveal-up" data-service-index="${i}">
      <a class="svc-image-wrap" href="service.html?id=${serviceId(i)}">
        <img src="${esc(serviceImage(i))}" alt="${esc(title)}" class="svc-image" loading="lazy">
      </a>
      <div class="svc-copy">
      <p class="svc-num">0${i + 1}</p>
      <h3>${esc(title)}</h3>
      <p>${esc(desc)}</p>
      <a class="svc-link" href="service.html?id=${serviceId(i)}">Explore service</a>
      </div>
    </article>`).join("");
}

function renderTeam(t, clinic, lang) {
  const team = $("team-exp");
  if (!team) return;
  const doctors = ensureTeamData(clinic, t);
  if (state.teamActive >= doctors.length) state.teamActive = 0;

  const active = doctors[state.teamActive];
  const name = doctorName(active, lang, t);
  const role = doctorRole(active, lang);
  const description = doctorDescription(active, lang);
  const photo = active.photo || TEAM_FALLBACK[state.teamActive % TEAM_FALLBACK.length];

  team.innerHTML = `
    <div class="team-stage reveal-up">
      <div class="team-left">
        <p class="team-main-kicker">Dr.</p>
        <h3 id="team-main-name">${esc(name)}</h3>
        <p id="team-main-role">${esc(role)}</p>
      </div>
      <div class="team-portrait-wrap">
        <img src="${esc(photo)}" alt="${esc(name)}" class="team-main-photo" id="team-main-photo" loading="lazy">
      </div>
      <div class="team-main-copy" id="team-main-desc">${esc(description)}</div>
      <div class="team-controls" role="group" aria-label="Doctor navigation">
        <button class="team-nav" id="team-prev" type="button" aria-label="Previous doctor">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.500 6.500 9 12l5.500 5.500"/></svg>
        </button>
        <button class="team-nav" id="team-next" type="button" aria-label="Next doctor">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.500 6.500 15 12l-5.500 5.500"/></svg>
        </button>
      </div>
    </div>
    `;

  const stage = team.querySelector(".team-stage");
  const portraitWrap = team.querySelector(".team-portrait-wrap");
  const mainPhoto = $("team-main-photo");
  const mainName = $("team-main-name");
  const mainRole = $("team-main-role");
  const mainDesc = $("team-main-desc");
  const prev = $("team-prev");
  const next = $("team-next");
  let swapTimer = null;
  let startX = null;
  let startY = null;

  const applyDoctor = (idx, animate) => {
    const d = doctors[idx];
    const dName = doctorName(d, lang, t);
    const dRole = doctorRole(d, lang);
    const dDescription = doctorDescription(d, lang);
    const dPhoto = d.photo || TEAM_FALLBACK[idx % TEAM_FALLBACK.length];
    state.teamActive = idx;

    const commit = () => {
      mainPhoto.src = dPhoto;
      mainPhoto.alt = dName;
      mainName.textContent = dName;
      mainRole.textContent = dRole;
      mainDesc.textContent = dDescription;
      stage.classList.remove("is-swapping");
    };

    if (!animate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit();
      return;
    }
    stage.classList.add("is-swapping");
    if (swapTimer) clearTimeout(swapTimer);
    swapTimer = setTimeout(commit, SWAP_ANIMATION_MS);
  };

  if (prev) {
    prev.addEventListener("click", () => applyDoctor((state.teamActive - 1 + doctors.length) % doctors.length, true));
  }
  if (next) {
    next.addEventListener("click", () => applyDoctor((state.teamActive + 1) % doctors.length, true));
  }
  if (portraitWrap) {
    portraitWrap.addEventListener("touchstart", (event) => {
      if (!event.touches || !event.touches[0]) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    portraitWrap.addEventListener("touchend", (event) => {
      if (startX === null || startY === null || !event.changedTouches || !event.changedTouches[0]) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) {
        applyDoctor((state.teamActive + 1) % doctors.length, true);
      } else {
        applyDoctor((state.teamActive - 1 + doctors.length) % doctors.length, true);
      }
    }, { passive: true });
  }

  applyDoctor(state.teamActive, false);
}

function renderWhy(t) {
  const ico = [
    '<path d="M3 12l18-8-5 17-4-7-9-2z"/>',
    '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    '<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
    '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>'
  ];
  $("why-grid").innerHTML = t.why
    .map(([, h, p], i) => `<div class="card wcard reveal-up"><div class="wic"><svg viewBox="0 0 24 24">${ico[i % 4]}</svg></div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("");
}

function renderSteps(t) {
  $("steps").innerHTML = t.steps
    .map(([n, h, p]) => `<div class="step reveal-up"><b>${n}</b><h4>${esc(h)}</h4><p>${esc(p)}</p></div>`).join("");
}

function renderFaq(t) {
  $("faq-list").innerHTML = t.faq
    .map(([q, a], i) => `<details ${i === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
    .join("");
}

function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  const items = document.querySelectorAll(".reveal-up");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  items.forEach((node) => io.observe(node));
}

Z.onRender((t) => {
  const lang = Z.lang;
  const clinic = Z.clinic;

  document.title = "Zeppelin Dental Clinic — " + t.eyebrow;
  $("about-more").textContent = UI[lang].more;
  $("about-text").textContent = clinic.about[lang] || UI[lang].about_p;
  $("c-phone").replaceChildren(...[clinic.phone2, clinic.phone].filter(Boolean).flatMap((p, i) => {
    const a = document.createElement("a");
    a.href = telHref(p);
    a.textContent = p;
    return i ? [document.createElement("br"), a] : [a];
  }));
  setLink($("c-email"), clinic.email, "mailto:" + clinic.email);

  const sel = $("service-select");
  sel.length = 1;
  t.services.forEach(([, h]) => sel.add(new Option(h, h)));

  renderServices(t);
  renderWhy(t);
  renderSteps(t);
  renderTeam(t, clinic, lang);
  renderFaq(t);
  initReveal();
});

const bookingForm = $("form");
if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = $("status");
    status.className = "";
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name.trim() || !/^[+0-9 ()\-]{6,20}$/.test(data.phone.trim())) {
      status.textContent = I18N[Z.lang].invalid;
      status.className = "err";
      return;
    }
    const btn = e.target.querySelector("button[type=submit]");
    btn.disabled = true;
    try {
      const r = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!r.ok) throw new Error();
      status.textContent = I18N[Z.lang].ok;
      status.className = "ok";
      e.target.reset();
    } catch {
      status.textContent = I18N[Z.lang].err;
      status.className = "err";
    } finally {
      btn.disabled = false;
    }
  });
}
