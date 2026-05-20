const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const backToTop = document.querySelector("[data-back-to-top]");
const revealItems = document.querySelectorAll(".section-reveal");
const panoramaTrack = document.querySelector("[data-panorama-track]");
const panoramaPrev = document.querySelector("[data-panorama-prev]");
const panoramaNext = document.querySelector("[data-panorama-next]");
const panoramaCount = document.querySelector("[data-panorama-count]");
const panoramaProgress = document.querySelector("[data-panorama-progress]");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 640);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

for (const item of revealItems) {
  observer.observe(item);
}

if (panoramaTrack) {
  const slides = Array.from(panoramaTrack.querySelectorAll(".film-slide"));

  const updatePanorama = () => {
    const maxScroll = panoramaTrack.scrollWidth - panoramaTrack.clientWidth;
    const progress = maxScroll > 0 ? panoramaTrack.scrollLeft / maxScroll : 0;
    const activeIndex = slides.reduce(
      (closest, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - panoramaTrack.scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    ).index;

    if (panoramaCount) {
      panoramaCount.textContent = `${activeIndex + 1} / ${slides.length}`;
    }

    if (panoramaProgress) {
      panoramaProgress.style.width = `${Math.max(5, progress * 100)}%`;
    }
  };

  const movePanorama = (direction) => {
    const firstSlide = slides[0];
    const step = firstSlide ? firstSlide.getBoundingClientRect().width + 18 : panoramaTrack.clientWidth * 0.8;
    panoramaTrack.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  panoramaTrack.addEventListener("scroll", updatePanorama, { passive: true });
  window.addEventListener("resize", updatePanorama);

  if (panoramaPrev) {
    panoramaPrev.addEventListener("click", () => movePanorama(-1));
  }

  if (panoramaNext) {
    panoramaNext.addEventListener("click", () => movePanorama(1));
  }

  updatePanorama();
}

for (const card of document.querySelectorAll(".qr-card")) {
  const img = card.querySelector("img");
  const frame = card.querySelector(".qr-frame");
  const link = card.querySelector("a");

  if (img && frame) {
    img.addEventListener("error", () => {
      frame.innerHTML = '<span class="qr-placeholder">QR à ajouter</span>';
    });
  }

  if (link) {
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "btn btn-small btn-secondary";
    copyButton.textContent = "Copier le lien";
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link.href);
        copyButton.textContent = "Lien copié";
        setTimeout(() => {
          copyButton.textContent = "Copier le lien";
        }, 1600);
      } catch {
        copyButton.textContent = "Copie indisponible";
        setTimeout(() => {
          copyButton.textContent = "Copier le lien";
        }, 1600);
      }
    });
    card.appendChild(copyButton);
  }
}
