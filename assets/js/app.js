const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const backToTop = document.querySelector("[data-back-to-top]");
const revealItems = document.querySelectorAll(".section-reveal");
const panoramaTrack = document.querySelector("[data-panorama-track]");
const panoramaPrev = document.querySelector("[data-panorama-prev]");
const panoramaNext = document.querySelector("[data-panorama-next]");
const panoramaCount = document.querySelector("[data-panorama-count]");
const panoramaProgress = document.querySelector("[data-panorama-progress]");
const qrTrack = document.querySelector("[data-qr-track]");
const qrPrev = document.querySelector("[data-qr-prev]");
const qrNext = document.querySelector("[data-qr-next]");
const qrCount = document.querySelector("[data-qr-count]");
const qrProgress = document.querySelector("[data-qr-progress]");

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

const setupCarousel = ({ track, slidesSelector, prev, next, count, progress }) => {
  if (!track) {
    return;
  }

  const slides = Array.from(track.querySelectorAll(slidesSelector));

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollProgress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    const activeIndex = slides.reduce(
      (closest, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    ).index;

    if (count) {
      count.textContent = `${activeIndex + 1} / ${slides.length}`;
    }

    if (progress) {
      progress.style.width = `${Math.max(5, scrollProgress * 100)}%`;
    }
  };

  const move = (direction) => {
    const firstSlide = slides[0];
    const step = firstSlide ? firstSlide.getBoundingClientRect().width + 18 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  if (prev) {
    prev.addEventListener("click", () => move(-1));
  }

  if (next) {
    next.addEventListener("click", () => move(1));
  }

  update();
};

setupCarousel({
  track: panoramaTrack,
  slidesSelector: ".film-slide",
  prev: panoramaPrev,
  next: panoramaNext,
  count: panoramaCount,
  progress: panoramaProgress,
});

setupCarousel({
  track: qrTrack,
  slidesSelector: ".qr-card",
  prev: qrPrev,
  next: qrNext,
  count: qrCount,
  progress: qrProgress,
});

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
