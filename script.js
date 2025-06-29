
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Play video function
function playVideo() {
    // Aquí puedes implementar la funcionalidad del video
    // Por ejemplo, abrir un modal con el video o reemplazar el placeholder
    alert('Video functionality - Implementa aquí tu reproductor de video');
    
    // Ejemplo de cómo podrías implementar un video real:
    /*
    const videoContainer = document.querySelector('.video-placeholder');
    videoContainer.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; object-fit: cover;">
            <source src="tu-video.mp4" type="video/mp4">
            Tu navegador no soporta el elemento video.
        </video>
    `;
    */
}

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    const opacity = Math.min(scrolled / 100, 1);
    header.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
});

// Animate elements on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for animation
    document.querySelectorAll('.hero-text, .video-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.hero-background');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu toggle (opcional para futuras mejoras)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Función para manejar el redimensionamiento de ventana
window.addEventListener('resize', () => {
    // Aquí puedes agregar lógica adicional para el responsive
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

// Función para cambiar los iconos sociales por los reales
function updateSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const socialLinks = [
        { emoji: '📷', url: 'https://instagram.com/tu-perfil', platform: 'Instagram' },
        { emoji: '📘', url: 'https://facebook.com/tu-perfil', platform: 'Facebook' },
        { emoji: '🐦', url: 'https://twitter.com/tu-perfil', platform: 'Twitter' },
        { emoji: '💼', url: 'https://linkedin.com/company/tu-empresa', platform: 'LinkedIn' }
    ];
    
    socialIcons.forEach((icon, index) => {
        if (socialLinks[index]) {
            icon.href = socialLinks[index].url;
            icon.title = socialLinks[index].platform;
            icon.target = '_blank';
            icon.rel = 'noopener noreferrer';
        }
    });
}

// Inicializar iconos sociales cuando la página carga
document.addEventListener('DOMContentLoaded', updateSocialIcons);

// Función para añadir efectos de hover adicionales
document.addEventListener('DOMContentLoaded', () => {
    const ctaBubble = document.querySelector('.cta-bubble');
    
    if (ctaBubble) {
        ctaBubble.addEventListener('mouseenter', () => {
            ctaBubble.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        ctaBubble.addEventListener('mouseleave', () => {
            ctaBubble.style.transform = 'translateY(0) scale(1)';
        });
        
        // Hacer que el CTA bubble sea clickeable
        ctaBubble.addEventListener('click', () => {
            // Aquí puedes redirigir a la página de prestadores o abrir un modal
            alert('Redirigiendo a la sección de prestadores...');
            // window.location.href = '/prestadores';
        });
        
        ctaBubble.style.cursor = 'pointer';
    }
});