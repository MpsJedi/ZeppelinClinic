const sid = new URLSearchParams(location.search).get("id");
const idx = Math.max(0, SERVICES.findIndex((s) => s.id === sid));
const svc = SERVICES[idx];
$("s-img").src = "img/" + svc.img;

Z.onRender((t) => {
  const u = UI[Z.lang], d = svc[Z.lang], title = t.services[idx][1];
  document.title = title + " — Zeppelin Dental Clinic";
  $("s-title").textContent = title;
  $("crumbs").innerHTML = `<a href="index.html">${esc(u.home)}</a> / <a href="index.html#services">${esc(t.nav_services)}</a> / ${esc(title)}`;
  $("s-body").innerHTML = `<p class="lead-p">${esc(t.services[idx][2])}</p>` + d.p.map((p) => `<p>${esc(p)}</p>`).join("")
    + `<h3>${esc(u.includes)}</h3><ul class="checks">${d.l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  $("o-title").textContent = u.other;
  $("o-list").innerHTML = SERVICES.map((s, i) => i === idx ? "" :
    `<li><a href="service.html?id=${s.id}"><img src="img/${s.img}" alt="" width="64" height="64" loading="lazy"><span>${esc(t.services[i][1])}</span></a></li>`).join("");
});
