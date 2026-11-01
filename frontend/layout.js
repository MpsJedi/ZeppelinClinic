// Shared header, topbar, footer, language and clinic data for every page.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const Z = { lang: new URLSearchParams(location.search).get("lang") || localStorage.getItem("lang") || "ka",
  clinic: { phone: "", phone2: "", email: "", about: {}, branches: [], doctors: [], social: {} }, hooks: [],
  onRender(fn) { this.hooks.push(fn); } };
if (!I18N[Z.lang]) Z.lang = "ka";

function setLink(node, text, href) {
  node.replaceChildren();
  if (!text) { node.textContent = "—"; return; }
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  node.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
<div class="topbar">
  <ul class="tb-info">
    <li class="tb-tel"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg><span id="tb-tel"></span></li>
    <li><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span data-i18n="hours"></span></li>
    <li><svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg><span id="tb-loc"></span></li>
    <li><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><a id="tb-mail" href="#"></a></li>
  </ul>
  <div class="tb-social">
    <a id="so-facebook" href="#" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.500c0-.7.300-1 1-1h2V2h-3c-3 0-4.500 1.800-4.500 4.500V8H7v3.500h2.500V22H14V11.500h2.800L17.500 8z"/></svg></a>
    <a id="so-instagram" href="#" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r=".8" fill="currentColor"/></svg></a>
    <a id="so-whatsapp" href="#" aria-label="WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M3 21l1.600-4.700A8.500 8.500 0 1 1 8 19.500z"/><path d="M9 8.500c0 3.500 3 6.500 6.500 6.500l1-1.500-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2z" fill="currentColor" stroke="none"/></svg></a>
  </div>
</div>
<header class="nav">
  <a class="brand" href="index.html"><img src="logo-sm.png" alt="" width="46" height="46"><span>Zeppelin<small>Dental Clinic</small></span></a>
  <nav id="menu" aria-label="Main">
    <a href="about.html" data-i18n="nav_about"></a>
    <div class="dd" id="dd">
      <a href="index.html#services" data-i18n="nav_services"></a>
      <button type="button" class="dd-btn" id="dd-btn" aria-label="Services" aria-expanded="false"></button>
      <ul class="dd-list" id="dd-list"></ul>
    </div>
    <a href="index.html#why" data-i18n="nav_why"></a><a href="index.html#team" data-i18n="nav_team"></a>
    <a href="index.html#contact" data-i18n="nav_contact"></a>
  </nav>
  <a class="hd-tel" id="hd-tel" href="#"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg><span><small data-i18n="call"></small><b id="hd-tel-n"></b></span></a>
  <div class="lang" id="lang">
    <button class="cur" id="lang-cur" aria-label="Language" aria-haspopup="true" aria-expanded="false" aria-controls="lang-list">GEO</button>
    <ul id="lang-list" hidden>
      <li><button data-l="ka">GEO</button></li><li><button data-l="en">ENG</button></li><li><button data-l="ru">RUS</button></li>
    </ul>
  </div>
  <a class="btn btn-sm" href="index.html#contact" data-i18n="book"></a>
  <button class="burger" id="burger" aria-label="Menu" aria-controls="menu" aria-expanded="false">☰</button>
</header>`);

document.body.insertAdjacentHTML("beforeend", `
<a class="btn fab" href="index.html#contact" data-i18n="book"></a>
<footer>
  <img src="logo-full-sm.png" alt="Zeppelin Dental Clinic" class="foot-logo" width="120" height="120" loading="lazy">
  <p>© <span id="year"></span> Zeppelin Dental Clinic. <span data-i18n="rights"></span></p>
</footer>`);

function renderAll() {
  const t = I18N[Z.lang], c = Z.clinic;
  document.documentElement.lang = Z.lang;
  document.querySelectorAll("[data-i18n]").forEach((n) => (n.textContent = t[n.dataset.i18n]));
  document.querySelectorAll("[data-ph]").forEach((n) => (n.placeholder = t[n.dataset.ph]));
  document.querySelectorAll("[data-aria]").forEach((n) => n.setAttribute("aria-label", t[n.dataset.aria]));
  document.querySelectorAll("#lang-list button").forEach((b) => {
    b.classList.toggle("on", b.dataset.l === Z.lang);
    if (b.dataset.l === Z.lang) $("lang-cur").textContent = b.textContent;
  });
  const mail = c.email || "info@zeppelin.ge";
  setLink($("tb-mail"), mail, "mailto:" + mail);
  const tels = [c.phone2, c.phone].filter(Boolean);
  const tl = (p) => "tel:" + p.replace(/[^+\d]/g, "");
  $("tb-tel").replaceChildren(...tels.flatMap((p, i) => { const a = document.createElement("a"); a.href = tl(p); a.textContent = p; return i ? [" · ", a] : [a]; }));
  if (tels[0]) { $("hd-tel").href = tl(tels[0]); $("hd-tel-n").textContent = tels[0]; }
  $("tb-loc").textContent = (c.branches[0] && c.branches[0].address) || t.loc;
  $("tb-loc").style.cursor = "pointer";
  $("tb-loc").onclick = () => window.open("https://www.google.com/maps/dir/?api=1&destination=41.7276333,44.7445099", "_blank", "noopener");
  ["facebook", "instagram", "whatsapp"].forEach((k) => ($("so-" + k).href = (c.social && c.social[k]) || "#", $("so-" + k).hidden = !(c.social && c.social[k])));
  $("dd-list").innerHTML = SERVICES.map((s, i) => `<li><a href="service.html?id=${s.id}">${esc(t.services[i][1])}</a></li>`).join("");
  $("dd-btn").setAttribute("aria-label", t.nav_services);
  $("year").textContent = new Date().getFullYear();
  Z.hooks.forEach((fn) => fn(t));
}

const langList = $("lang-list"), langCur = $("lang-cur"), menu = $("menu"), dd = $("dd");
const toggleLang = (open) => { langList.hidden = !open; langCur.setAttribute("aria-expanded", open); };
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  $("burger").setAttribute("aria-expanded", open);
  if (!open) dd.classList.remove("open");
};
langCur.addEventListener("click", (e) => { e.stopPropagation(); toggleLang(langList.hidden); });
document.addEventListener("click", () => toggleLang(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggleLang(false); setMenu(false); } });
$("burger").addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$("dd-btn").addEventListener("click", () => {
  const open = dd.classList.toggle("open");
  $("dd-btn").setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.querySelectorAll("#lang-list button").forEach((b) =>
  b.addEventListener("click", () => { Z.lang = b.dataset.l; localStorage.setItem("lang", Z.lang); toggleLang(false); renderAll(); }));

addEventListener("DOMContentLoaded", () => {
  renderAll();
  fetch("/api/clinic").then((r) => r.json()).then((c) => { Z.clinic = { ...Z.clinic, ...c }; renderAll(); }).catch(() => {});
});
