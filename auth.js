// Authentication System
(function() {
  'use strict';

  // CONFIGURACIÓN DE CREDENCIALES
  // IMPORTANTE: Cambia estas credenciales por las tuyas
  const CREDENTIALS = {
    username: 'admin',
    password: 'PCB2026'  // Cambia esta contraseña
  };

  // Tiempo de sesión (en milisegundos) - 2 horas
  const SESSION_DURATION = 2 * 60 * 60 * 1000;

  // Check if we're on the login page
  const isLoginPage = window.location.pathname.includes('login.html');

  // Check if we're on the admin page
  const isAdminPage = window.location.pathname.includes('admin.html');

  // Function to hash password (simple hash for demo - use bcrypt in production)
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  // Function to check if user is authenticated
  function isAuthenticated() {
    const session = localStorage.getItem('pcb_admin_session');
    if (!session) return false;

    try {
      const sessionData = JSON.parse(session);
      const now = new Date().getTime();
      
      // Check if session is expired
      if (now > sessionData.expires) {
        localStorage.removeItem('pcb_admin_session');
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  // Function to create session
  function createSession() {
    const now = new Date().getTime();
    const sessionData = {
      authenticated: true,
      expires: now + SESSION_DURATION,
      timestamp: now
    };
    localStorage.setItem('pcb_admin_session', JSON.stringify(sessionData));
  }

  // Function to logout
  function logout() {
    localStorage.removeItem('pcb_admin_session');
    window.location.href = 'login.html';
  }

  // Handle login form submission
  if (isLoginPage) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // If already authenticated, redirect to admin
    if (isAuthenticated()) {
      window.location.href = 'admin.html';
      return;
    }

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Validate credentials
      if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        // Create session
        createSession();
        
        // Redirect to admin
        window.location.href = 'admin.html';
      } else {
        // Show error
        errorMessage.classList.add('show');
        
        // Clear password field
        document.getElementById('password').value = '';
        
        // Hide error after 3 seconds
        setTimeout(() => {
          errorMessage.classList.remove('show');
        }, 3000);
      }
    });
  }

  // Protect admin page
  if (isAdminPage) {
    if (!isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }

    // Add logout button to admin page
    window.addEventListener('DOMContentLoaded', function() {
      const adminFooter = document.querySelector('.admin-footer');
      if (adminFooter) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = '🚪 Cerrar Sesión';
        logoutBtn.className = 'btn-back';
        logoutBtn.style.marginTop = '1rem';
        logoutBtn.style.background = 'rgba(231, 76, 60, 0.2)';
        logoutBtn.style.cursor = 'pointer';
        logoutBtn.style.border = 'none';
        logoutBtn.addEventListener('click', logout);
        adminFooter.appendChild(logoutBtn);
      }
    });

    // Auto-logout on session expiration
    setInterval(() => {
      if (!isAuthenticated()) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        logout();
      }
    }, 60000); // Check every minute
  }

  // Export logout function for global access
  window.adminLogout = logout;
})();

