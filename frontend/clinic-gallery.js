(() => {
  const photos = [
    { file: "09", area: "reception" }, { file: "06", area: "reception" },
    ...["01", "02", "03", "04", "05", "07", "08"].map((file) => ({ file, area: "treatment" })),
    { file: "10", area: "hallway" }
  ];
  const labels = {
    en: { gallery: "Clinic photo gallery", previous: "Previous photo", next: "Next photo", reception: "Clinic reception", treatment: "Dental treatment room", hallway: "Clinic hallway", photo: "Photo" },
    ka: { gallery: "კლინიკის ფოტოგალერეა", previous: "წინა ფოტო", next: "შემდეგი ფოტო", reception: "კლინიკის მისაღები", treatment: "სტომატოლოგიური კაბინეტი", hallway: "კლინიკის დერეფანი", photo: "ფოტო" },
    ru: { gallery: "Фотогалерея клиники", previous: "Предыдущее фото", next: "Следующее фото", reception: "Ресепшен клиники", treatment: "Стоматологический кабинет", hallway: "Коридор клиники", photo: "Фото" }
  };

  document.querySelectorAll("[data-clinic-gallery]").forEach((gallery) => {
    gallery.innerHTML = `
      <div class="clinic-gallery-shell">
        <div class="clinic-gallery-track" tabindex="0">
          ${photos.map((photo, i) => `
            <div class="clinic-gallery-slide">
              <img class="clinic-gallery-backdrop" src="img/clinic-photos/${photo.file}.jpg" alt="" aria-hidden="true" ${i ? 'loading="lazy"' : ""} draggable="false">
              <img class="clinic-gallery-image" src="img/clinic-photos/${photo.file}.jpg" alt="" ${i ? 'loading="lazy"' : ""} draggable="false">
            </div>`).join("")}
        </div>
        <button type="button" class="clinic-gallery-arrow clinic-gallery-prev"><span aria-hidden="true">←</span></button>
        <button type="button" class="clinic-gallery-arrow clinic-gallery-next"><span aria-hidden="true">→</span></button>
        <div class="clinic-gallery-caption">
          <div class="clinic-gallery-caption-text"><span class="clinic-gallery-kicker">ZEPPELIN DENTAL CLINIC</span><strong class="clinic-gallery-label"></strong></div>
          <span class="clinic-gallery-count" aria-live="polite"></span>
        </div>
      </div>
      <div class="clinic-gallery-progress" aria-hidden="true"><span></span></div>`;

    const track = gallery.querySelector(".clinic-gallery-track");
    const slides = [...gallery.querySelectorAll(".clinic-gallery-slide")];
    const previous = gallery.querySelector(".clinic-gallery-prev");
    const next = gallery.querySelector(".clinic-gallery-next");
    const caption = gallery.querySelector(".clinic-gallery-label");
    const count = gallery.querySelector(".clinic-gallery-count");
    const progress = gallery.querySelector(".clinic-gallery-progress span");
    let index = 0;
    let drag = null;
    let scrollFrame = null;

    function render() {
      const text = labels[Z.lang];
      gallery.setAttribute("role", "region");
      gallery.setAttribute("aria-label", text.gallery);
      track.setAttribute("aria-label", text.gallery);
      previous.setAttribute("aria-label", text.previous);
      next.setAttribute("aria-label", text.next);
      slides.forEach((slide, i) => {
        slide.querySelector(".clinic-gallery-image").alt = text[photos[i].area];
        slide.setAttribute("aria-hidden", i !== index ? "true" : "false");
      });
      caption.textContent = text[photos[index].area];
      count.textContent = `${text.photo} ${String(index + 1).padStart(2, "0")} / ${photos.length}`;
      progress.style.width = `${(index + 1) / photos.length * 100}%`;
    }

    function goTo(nextIndex) {
      index = (nextIndex + photos.length) % photos.length;
      track.scrollTo({ left: slides[index].offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      render();
    }
    previous.addEventListener("click", () => goTo(index - 1));
    next.addEventListener("click", () => goTo(index + 1));
    track.addEventListener("scroll", () => {
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const current = Math.max(0, Math.min(photos.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
        if (current !== index) { index = current; render(); }
        scrollFrame = null;
      });
    });
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + (event.key === "ArrowLeft" ? -1 : 1));
      }
    });
    track.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      drag = { startX: event.clientX, startLeft: track.scrollLeft, moved: false };
      track.setPointerCapture(event.pointerId);
    });
    track.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const distance = event.clientX - drag.startX;
      if (Math.abs(distance) > 5) { drag.moved = true; track.classList.add("dragging"); }
      if (drag.moved) track.scrollLeft = drag.startLeft - distance;
    });
    function finishDrag() {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      track.classList.remove("dragging");
      if (moved) goTo(Math.round(track.scrollLeft / track.clientWidth));
    }
    track.addEventListener("pointerup", finishDrag);
    track.addEventListener("pointercancel", finishDrag);
    Z.onRender(render);
    render();
  });
})();
