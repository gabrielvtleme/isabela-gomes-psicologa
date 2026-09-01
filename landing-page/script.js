const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const modal = document.getElementById("projectModal");

if (modal) {
  const modalImage = document.getElementById("modalImage");
  const modalTag = document.getElementById("modalTag");
  const modalMeta = document.getElementById("modalMeta");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  let lastFocused = null;

  const openModal = (card) => {
    const img = card.querySelector(".project-image img");
    const tag = card.querySelector(".project-tag");
    const meta = card.querySelector(".project-meta");
    const title = card.querySelector("h3");
    const description = card.querySelector(".project-body p");

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTag.textContent = tag ? tag.textContent : "";
    modalTag.hidden = !tag;
    modalMeta.textContent = meta ? meta.textContent : "";
    modalTitle.textContent = title ? title.textContent : "";
    modalDescription.textContent = description ? description.textContent : "";

    lastFocused = document.activeElement;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal-close").focus();
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modal.querySelectorAll("[data-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}
