const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const backToTop = document.querySelector("[data-back-to-top]");
const revealItems = document.querySelectorAll(".section-reveal");

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
