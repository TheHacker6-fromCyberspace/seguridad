const fs = require('fs');
const path = require('path');

const targetFiles = [
    'index2.html',
    'solicitudes.html',
    'matricula.html',
    'enfermeria.html',
    'orientacion.html',
    'biblioteca.html',
    'bibliotecaCentroRecursos.html',
    'comedor.html',
    'transportacion.html',
    'servicios-tecnicos.html',
    'seguridad.html',
    'asistente.html',
    'promociones.html',
    'quienes-somos.html',
    'normas-reglamentos.html',
    'otros-apoyos.html',
    'padres.html',
    'laboratorio.html'
];

const newHeaderContent = `
  <!-- Popup de selección de tema -->
  <div id="themePopup" class="theme-popup">
    <div class="theme-popup-content">
      <h2 data-translate="🎨 Selecciona tu tema preferido">🎨 Selecciona tu tema preferido</h2>
      <p data-translate="Elige cómo quieres ver el sitio web">Elige cómo quieres ver el sitio web</p>
      <div class="theme-buttons">
        <button class="theme-btn theme-btn-light" id="btnLightMode" data-translate="☀️ Modo Claro">
          ☀️ Modo Claro
        </button>
        <button class="theme-btn theme-btn-dark" id="btnDarkMode" data-translate="🌙 Modo Oscuro">
          🌙 Modo Oscuro
        </button>
      </div>
    </div>
  </div>

  <script>
    // Script inline para modo claro/oscuro
    (function() {
      function hidePopup() {
        document.getElementById('themePopup').classList.add('hidden');
      }

      function setLightMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        hidePopup();
      }

      function setDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        hidePopup();
      }

      function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          document.body.classList.add('dark-mode');
          hidePopup();
        } else if (savedTheme === 'light') {
          hidePopup();
        }
      }

      // Ejecutar inmediatamente
      checkTheme();

      document.addEventListener('DOMContentLoaded', function() {
        const btnLight = document.getElementById('btnLightMode');
        const btnDark = document.getElementById('btnDarkMode');

        if (btnLight) {
          btnLight.addEventListener('click', setLightMode);
        }
        if (btnDark) {
          btnDark.addEventListener('click', setDarkMode);
        }
      });
    })();
  </script>

  <header class="site-header">
    <div class="container header-inner">
      <div class="logo-area">
        <img src="LOGO6.png" alt="Logo Escuela" class="logo-image">
        <div class="logo-text">
          <span class="logo-title" data-translate="Escuela Superior Vocacional">Escuela Superior Vocacional</span>
          <span class="logo-subtitle">Pablo Colón Berdecia</span>
        </div>
      </div>

      <!-- Hamburger Menu Button -->
      <button class="hamburger-menu" id="hamburgerBtn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <button class="menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="main-nav">
        <ul>
          <li><a href="index.html#inicio" data-translate="Inicio">Inicio</a></li>
          <li><a href="index.html#servicios" data-translate="Servicios">Servicios</a></li>
          <li><a href="index.html#contacto" data-translate="Contacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Sidebar Menu -->
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="sidebar-menu" id="sidebarMenu">
    <div class="sidebar-header">
      <h3 data-translate="⚙️ Configuración">⚙️ Configuración</h3>
    </div>
    <div class="sidebar-content">
      <!-- Theme Toggle -->
      <div class="sidebar-option" id="themeToggle">
        <span data-translate="🎨 Cambiar Tema">🎨 Cambiar Tema</span>
      </div>
      <div class="theme-options" id="themeOptions">
        <div class="theme-option" id="selectLightTheme">
          <span data-translate="☀️ Modo Claro">☀️ Modo Claro</span>
        </div>
        <div class="theme-option" id="selectDarkTheme">
          <span data-translate="🌙 Modo Oscuro">🌙 Modo Oscuro</span>
        </div>
      </div>

      <!-- Language Toggle -->
      <div class="sidebar-option" id="languageToggle">
        <span data-translate="🌐 Cambiar Idioma">🌐 Cambiar Idioma</span>
      </div>
      <div class="language-options" id="languageOptions">
        <div class="language-option" id="selectSpanish">
          <span>🇵🇷 Español</span>
        </div>
        <div class="language-option" id="selectEnglish">
          <span>🇺🇸 English</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Hamburger menu functionality
    (function() {
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const sidebarMenu = document.getElementById('sidebarMenu');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      const themeToggle = document.getElementById('themeToggle');
      const themeOptions = document.getElementById('themeOptions');
      const languageToggle = document.getElementById('languageToggle');
      const languageOptions = document.getElementById('languageOptions');
      const selectLightTheme = document.getElementById('selectLightTheme');
      const selectDarkTheme = document.getElementById('selectDarkTheme');
      const selectSpanish = document.getElementById('selectSpanish');
      const selectEnglish = document.getElementById('selectEnglish');

      function openSidebarMenu() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
      }

      function closeSidebarMenu() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        themeOptions.classList.remove('active');
        languageOptions.classList.remove('active');
      }

      if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openSidebarMenu);
      }

      if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebarMenu);
      }

      // Theme toggle
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          themeOptions.classList.toggle('active');
          languageOptions.classList.remove('active');
        });
      }

      // Language toggle
      if (languageToggle) {
        languageToggle.addEventListener('click', function() {
          languageOptions.classList.toggle('active');
          themeOptions.classList.remove('active');
        });
      }

      // Select Light Theme
      if (selectLightTheme) {
        selectLightTheme.addEventListener('click', function() {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
          closeSidebarMenu();
        });
      }

      // Select Dark Theme
      if (selectDarkTheme) {
        selectDarkTheme.addEventListener('click', function() {
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
          closeSidebarMenu();
        });
      }

      // Seleccionar idioma español
      if (selectSpanish) {
        selectSpanish.addEventListener('click', function() {
          localStorage.setItem('language', 'es');
          const htmlRoot = document.getElementById('htmlRoot');
          if (htmlRoot) htmlRoot.setAttribute('lang', 'es');
          if (typeof translatePage === 'function') {
            translatePage('es');
          }
          closeSidebarMenu();
        });
      }

      // Seleccionar idioma inglés
      if (selectEnglish) {
        selectEnglish.addEventListener('click', function() {
          localStorage.setItem('language', 'en');
            const htmlRoot = document.getElementById('htmlRoot');
          if (htmlRoot) htmlRoot.setAttribute('lang', 'en');
          if (typeof translatePage === 'function') {
            translatePage('en');
          }
          closeSidebarMenu();
        });
      }
    })();
  </script>
`;

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file}: File not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove existing navbar
    // Matches <nav ...> ... </nav> across multiple lines
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');

    // 2. Remove existing header if any (some files might have one instead of nav)
    content = content.replace(/<header[\s\S]*?<\/header>/gi, '');

    // 3. Insert new header after <body>
    if (content.includes('<body')) {
        content = content.replace(/<body[^>]*>/i, (match) => {
            return match + '\n' + newHeaderContent;
        });
        console.log(`Updated ${file}`);
        fs.writeFileSync(filePath, content, 'utf8');
    } else {
        console.log(`Skipping ${file}: No body tag found`);
    }
});

console.log('Header update complete!');
