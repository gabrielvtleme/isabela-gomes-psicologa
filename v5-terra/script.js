const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const modal = document.getElementById('contentModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTag = document.getElementById('modalTag');
const modalMeta = document.getElementById('modalMeta');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', String(expanded));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const openModal = (title, description, image, tag = 'Projeto', meta = '') => {
  if (!modal || !modalTitle || !modalDescription || !modalImage || !modalTag || !modalMeta) return;

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalImage.src = image;
  modalImage.alt = title;
  modalTag.textContent = tag;
  modalMeta.textContent = meta;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openModal(
      card.dataset.title || 'Projeto',
      card.dataset.description || '',
      card.dataset.image || '',
      card.dataset.tag || 'Projeto',
      card.dataset.meta || ''
    );
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      const showItem = selectedFilter === 'all' || category === selectedFilter;
      item.classList.toggle('hidden', !showItem);
    });
  });
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      openModal(
        item.dataset.title || 'Galeria',
        item.dataset.description || '',
        img.src,
        'Galeria',
        'Imagem da galeria'
      );
    }
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
    closeModal();
  }
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('active')) {
    closeModal();
  }
});
