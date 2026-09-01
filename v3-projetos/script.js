// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU
// ============================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target && this.getAttribute('href') !== '#') {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.section-header, .sobre-card, .formacao-content, .formacao-image, ' +
        '.projeto-card, .galeria-item, .atendimento-card, .contato-content, .contato-decor, .highlight, .contato-item'
    );
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ============================================
    // LIGHTBOX GALLERY — Enhanced with Photo + Text Frame
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    let currentIndex = 0;
    const items = Array.from(galeriaItems);

    // Loading state handling
    function setLoadingState(isLoading) {
        if (isLoading) {
            lightbox.classList.add('loading');
        } else {
            lightbox.classList.remove('loading');
        }
    }

    function openLightbox(index) {
        currentIndex = index;
        const item = items[index];
        const img = item.querySelector('img');

        // Get data from data attributes
        const title = item.dataset.title || '';
        const description = item.dataset.description || '';

        // Set loading state
        setLoadingState(true);

        // Preload image for smooth transition
        const newImage = new Image();
        newImage.onload = () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            setLoadingState(false);
        };
        newImage.onerror = () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            setLoadingState(false);
        };
        newImage.src = img.src;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % items.length;
        openLightbox(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        openLightbox(currentIndex);
    }

    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });

        // Keyboard support for gallery items
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    // Fechar ao clicar no fundo do lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();

        // Trap focus within lightbox
        if (e.key === 'Tab') {
            const focusableElements = lightbox.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Touch swipe support para mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }, { passive: true });
});

// ============================================
// HERO PARALLAX
// ============================================
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    shapes.forEach((shape, index) => {
        const speed = 0.15 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// CONSOLE BRAND
// ============================================
console.log(
    '%c Isabela Gomes de Oliveira - Psicóloga ',
    'background: #6b4e7c; color: #faf6f2; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px;'
);
console.log(
    '%c CRP 06/234786 · Projetos & Iniciativas ',
    'color: #6b4e7c; font-size: 12px; padding: 4px 0;'
);