Z.onRender((t) => {
  const u = UI[Z.lang];
  document.title = t.about_t + " — Zeppelin Dental Clinic";
  $("crumbs").innerHTML = `<a href="index.html">${esc(u.home)}</a> / ${esc(t.about_t)}`;
  $("a-head").textContent = u.about_h;
  $("a-text").textContent = Z.clinic.about[Z.lang] || u.about_p;
});
