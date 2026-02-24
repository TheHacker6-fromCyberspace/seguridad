// JWT-Based Authentication System
// Secure authentication with encrypted passwords and JWT tokens

(function() {
  'use strict';

  // CONFIGURACIÓN DE SEGURIDAD
  // IMPORTANTE: Cambia estos valores en producción
  const JWT_SECRET = 'PCB_2026_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION';
  const SESSION_DURATION = 2 * 60 * 60; // 2 horas en segundos

  // Credenciales almacenadas (en producción, esto debería estar en un servidor)
  // La contraseña está hasheada con PBKDF2
  // Contraseña por defecto: "PCB2026"
  // Para generar un nuevo hash, usa: await CryptoUtils.hashPassword('tu_contraseña')
  const STORED_CREDENTIALS = {
    username: 'admin',
    // Este hash corresponde a la contraseña "PCB2026"
    // Puedes generar uno nuevo abriendo la consola y ejecutando:
    // CryptoUtils.hashPassword('tu_nueva_contraseña').then(console.log)
    passwordHash: null // Se inicializará dinámicamente
  };

  // Inicializar hash de contraseña
  const initializePasswordHash = async () => {
    if (!STORED_CREDENTIALS.passwordHash) {
      // Hash de "PCB2026" - cambiar en producción
      STORED_CREDENTIALS.passwordHash = await CryptoUtils.hashPassword('PCB2026');
    }
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = async () => {
    const token = localStorage.getItem('pcb_auth_token');
    if (!token) return false;

    try {
      const payload = await JWT.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      localStorage.removeItem('pcb_auth_token');
      return false;
    }
  };

  // Obtener datos del usuario desde el token
  const getUserData = async () => {
    const token = localStorage.getItem('pcb_auth_token');
    if (!token) return null;

    try {
      const payload = await JWT.verify(token, JWT_SECRET);
      return {
        username: payload.username,
        role: payload.role,
        loginTime: new Date(payload.iat * 1000),
        expiresAt: new Date(payload.exp * 1000)
      };
    } catch (error) {
      return null;
    }
  };

  // Función de login
  const login = async (username, password) => {
    await initializePasswordHash();

    // Verificar usuario
    if (username !== STORED_CREDENTIALS.username) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Verificar contraseña
    const isValid = await CryptoUtils.verifyPassword(password, STORED_CREDENTIALS.passwordHash);
    if (!isValid) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Crear token JWT
    const payload = {
      username: username,
      role: 'admin',
      loginTime: new Date().toISOString()
    };

    const token = await JWT.create(payload, JWT_SECRET, SESSION_DURATION);
    
    // Guardar token
    localStorage.setItem('pcb_auth_token', token);

    return {
      success: true,
      token: token,
      user: payload
    };
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('pcb_auth_token');
    window.location.href = 'login.html';
  };

  // Renovar token (refresh)
  const refreshToken = async () => {
    const userData = await getUserData();
    if (!userData) {
      throw new Error('No hay sesión activa');
    }

    const payload = {
      username: userData.username,
      role: userData.role,
      loginTime: new Date().toISOString()
    };

    const newToken = await JWT.create(payload, JWT_SECRET, SESSION_DURATION);
    localStorage.setItem('pcb_auth_token', newToken);

    return newToken;
  };

  // Cambiar contraseña
  const changePassword = async (currentPassword, newPassword) => {
    await initializePasswordHash();

    // Verificar contraseña actual
    const isValid = await CryptoUtils.verifyPassword(currentPassword, STORED_CREDENTIALS.passwordHash);
    if (!isValid) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Generar nuevo hash
    const newHash = await CryptoUtils.hashPassword(newPassword);
    
    // En producción, esto debería guardarse en un servidor
    // Por ahora, lo mostramos en consola para que el admin lo copie
    console.log('Nuevo hash de contraseña (cópialo en auth-jwt.js):');
    console.log(newHash);
    
    alert('Contraseña cambiada. Revisa la consola para obtener el nuevo hash.');
    
    return newHash;
  };

  // Exportar funciones
  window.AuthJWT = {
    isAuthenticated,
    getUserData,
    login,
    logout,
    refreshToken,
    changePassword
  };

})();

