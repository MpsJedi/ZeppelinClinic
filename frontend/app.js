Z.onRender((t) => {
  const lang = Z.lang, clinic = Z.clinic;
  document.title = "Zeppelin Dental Clinic — " + t.eyebrow;
  $("about-more").textContent = UI[lang].more;

  $("about-text").textContent = clinic.about[lang] || UI[lang].about_p;
  $("c-phone").replaceChildren(...[clinic.phone2, clinic.phone].filter(Boolean).flatMap((p, i) => { const a = document.createElement("a"); a.href = "tel:" + p.replace(/[^+\d]/g, ""); a.textContent = p; return i ? [document.createElement("br"), a] : [a]; }));
  setLink($("c-email"), clinic.email, "mailto:" + clinic.email);

  $("services-grid").innerHTML = t.services
    .map(([, h], i) => `<a class="scard" href="service.html?id=${SERVICES[i].id}"><img src="img/${SERVICES[i].img}" alt="" width="360" height="270" loading="lazy" draggable="false"><span class="sc-t">${esc(h)}</span><span class="sc-go" aria-hidden="true">→</span></a>`).join("");
  const sel = $("service-select");
  sel.length = 1;
  t.services.forEach(([, h]) => sel.add(new Option(h, h)));

  const ico = [
    '<path d="M3 12l18-8-5 17-4-7-9-2z"/>',
    '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    '<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
    '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>'];
  $("why-grid").innerHTML = t.why
    .map(([, h, p], i) => `<div class="card wcard"><div class="wic"><svg viewBox="0 0 24 24">${ico[i % 4]}</svg></div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("");
  $("steps").innerHTML = t.steps
    .map(([n, h, p]) => `<div class="step"><b>${n}</b><h4>${esc(h)}</h4><p>${esc(p)}</p></div>`).join("");

  const docs = clinic.doctors.length ? clinic.doctors : t.roles.map((r) => ({ name: "", role: {}, _r: r, photo: "" }));
  $("team-grid").innerHTML = docs
    .map((d, i) => {
      const name = typeof d.name === "string" ? d.name : (d.name && d.name[lang]) || "";
      const photo = d.photo ? `<img class="ph-backdrop" src="${esc(d.photo)}" alt="" aria-hidden="true" loading="lazy"><img class="ph-portrait" src="${esc(d.photo)}" alt="${esc(name || t.doctor)}" loading="lazy">` : "Z";
      const role = d._r || (d.role && d.role[lang]) || "";
      return `<div class="card"><div class="ph">${photo}</div><h3>${esc(name || t.doctor)}</h3><p>${esc(role)}</p></div>`;
    }).join("");

});

const track = $("services-grid");
function updateTrack() {
  const max = track.scrollWidth - track.clientWidth;
  $("svc-prev").disabled = track.scrollLeft <= 2;
  $("svc-next").disabled = track.scrollLeft >= max - 2;
}
let startX = 0, startLeft = 0, dragging = false, moved = false;
track.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse") return;
  dragging = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
});
addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add("drag"); }
  if (moved) track.scrollLeft = startLeft - dx;
});
addEventListener("pointerup", () => {
  if (!dragging) return;
  dragging = false;
  if (!moved) return;
  const s = step();
  const target = Math.round(track.scrollLeft / s) * s;
  track.classList.remove("drag");
  track.scrollTo({ left: target });
});
track.addEventListener("dragstart", (e) => e.preventDefault());
track.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
track.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
const step = () => track.querySelector(".scard").offsetWidth + 20;
$("svc-prev").addEventListener("click", () => track.scrollBy({ left: -step() }));
$("svc-next").addEventListener("click", () => track.scrollBy({ left: step() }));
track.addEventListener("scroll", updateTrack, { passive: true });
addEventListener("resize", updateTrack);
new MutationObserver(updateTrack).observe(track, { childList: true });

$("form").addEventListener("submit", async (e) => {
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
      method: "POST", headers: { "Content-Type": "application/json" },
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
