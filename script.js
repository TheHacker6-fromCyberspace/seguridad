// ===== Sistema de Modo Claro/Oscuro =====

// Función para mostrar el popup de selección de tema
window.showThemePopup = function () {
  const popup = document.getElementById('themePopup');
  if (popup) {
    popup.classList.remove('hidden');
  }
}

// Función para ocultar el popup
window.hideThemePopup = function () {
  const popup = document.getElementById('themePopup');
  if (popup) {
    popup.classList.add('hidden');
  }
}

// Función para aplicar modo claro
window.setLightMode = function () {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
  hideThemePopup();
}

// Función para aplicar modo oscuro
window.setDarkMode = function () {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  hideThemePopup();
}

// Verificar si el usuario ya seleccionó un tema anteriormente
function checkThemePreference() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    hideThemePopup();
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    hideThemePopup();
  } else {
    // Si no hay preferencia guardada, mostrar el popup
    showThemePopup();
  }
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
  checkThemePreference();

  // Toggle para Servicios Digitales en el menú hamburguesa
  const servicesToggle = document.getElementById('servicesToggle');
  const servicesOptions = document.getElementById('servicesOptions');

  if (servicesToggle && servicesOptions) {
    servicesToggle.addEventListener('click', function () {
      if (servicesOptions.style.display === 'none' || servicesOptions.style.display === '') {
        servicesOptions.style.display = 'block';
        const arrow = this.querySelector('.sidebar-arrow');
        if (arrow) arrow.style.transform = 'rotate(90deg)';
      } else {
        servicesOptions.style.display = 'none';
        const arrow = this.querySelector('.sidebar-arrow');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      }
    });
  }
});

// ===== Menú móvil =====
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// ===== Animaciones al hacer scroll =====
// DESACTIVADO: Las tarjetas ya no se animan al hacer scroll
/*
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

// Observar elementos con animación
document.querySelectorAll('.card, .service-card, .program-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
*/

// ===== Smooth scroll para enlaces internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== Efecto parallax en hero =====
//window.addEventListener('scroll', () => {
//const hero = document.querySelector('.hero');
// if (hero) {
//  const scrolled = window.pageYOffset;
//  hero.style.transform = `translateY(${scrolled * 0.5}px)`;
// }
//}); 

