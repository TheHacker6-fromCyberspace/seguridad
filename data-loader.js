// Data Loader - Sistema unificado para cargar datos desde GitHub o localStorage
(function() {
  'use strict';

  // Detectar el entorno
  const isGitHubPages = window.location.hostname.includes('github.io');
  const isLocalServer = window.location.protocol === 'http:' || window.location.protocol === 'https:';
  const isFileProtocol = window.location.protocol === 'file:';

  console.log('🌍 Entorno detectado:', {
    isGitHubPages,
    isLocalServer,
    isFileProtocol,
    hostname: window.location.hostname,
    protocol: window.location.protocol
  });

  /**
   * Carga los datos de contenido desde GitHub o localStorage
   * @returns {Promise<Object>} Promesa que resuelve con los datos de contenido
   */
  function loadContentData() {
    return new Promise((resolve, reject) => {
      // Si estamos en un servidor (GitHub Pages o local server), intentar cargar desde JSON
      if (isGitHubPages || (isLocalServer && !isFileProtocol)) {
        console.log('🌐 Cargando datos desde servidor (JSON)...');
        
        fetch('data/content-data.json')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('✅ Datos cargados desde JSON:', data);
            
            // Guardar en localStorage para uso offline y como backup
            try {
              localStorage.setItem('pcb_content_data', JSON.stringify(data));
              console.log('💾 Datos guardados en localStorage como backup');
            } catch (e) {
              console.warn('⚠️ No se pudo guardar en localStorage:', e);
            }
            
            resolve(data);
          })
          .catch(error => {
            console.warn('⚠️ Error al cargar desde JSON:', error);
            console.log('🔄 Intentando cargar desde localStorage...');
            loadFromLocalStorage().then(resolve).catch(reject);
          });
      } else {
        // Si estamos en file://, usar localStorage directamente
        console.log('📁 Modo local (file://), usando localStorage');
        loadFromLocalStorage().then(resolve).catch(reject);
      }
    });
  }

  /**
   * Carga los datos desde localStorage
   * @returns {Promise<Object>} Promesa que resuelve con los datos de contenido
   */
  function loadFromLocalStorage() {
    return new Promise((resolve, reject) => {
      try {
        const savedData = localStorage.getItem('pcb_content_data');
        
        if (!savedData) {
          console.warn('⚠️ No hay datos en localStorage');
          resolve(getEmptyData());
          return;
        }

        const data = JSON.parse(savedData);
        console.log('📦 Datos cargados desde localStorage:', data);
        resolve(data);
      } catch (error) {
        console.error('❌ Error al cargar desde localStorage:', error);
        reject(error);
      }
    });
  }

  /**
   * Retorna una estructura de datos vacía
   * @returns {Object} Estructura de datos vacía
   */
  function getEmptyData() {
    return {
      biblioteca: [],
      comedor: [],
      promociones: [],
      avisos: [],
      menu_comedor: {
        desayuno: [],
        almuerzo: []
      }
    };
  }

  /**
   * Carga una sección específica de datos
   * @param {string} section - Nombre de la sección (biblioteca, comedor, promociones, avisos)
   * @returns {Promise<Array>} Promesa que resuelve con los datos de la sección
   */
  function loadSection(section) {
    return loadContentData().then(data => {
      return data[section] || [];
    });
  }

  /**
   * Carga los avisos y promociones seleccionados para el bot
   * @returns {Promise<Array>} Promesa que resuelve con los avisos/promociones seleccionados
   */
  function loadBotNotifications() {
    return loadContentData().then(data => {
      const botConfig = JSON.parse(localStorage.getItem('pcb_bot_config') || '{}');
      const selectedIds = botConfig.selectedIds || [];

      const avisos = data.avisos || [];
      const promociones = data.promociones || [];

      // Si hay IDs seleccionados, filtrar por ellos
      if (selectedIds.length > 0) {
        const filteredAvisos = avisos.filter(item => selectedIds.includes(item.id));
        const filteredPromociones = promociones.filter(item => selectedIds.includes(item.id));
        return [...filteredAvisos, ...filteredPromociones];
      }

      // Si no hay IDs seleccionados, retornar todos
      return [...avisos, ...promociones];
    });
  }

  // Exportar funciones para uso global
  window.DataLoader = {
    loadContentData,
    loadFromLocalStorage,
    loadSection,
    loadBotNotifications,
    getEmptyData,
    isGitHubPages,
    isLocalServer,
    isFileProtocol
  };

  console.log('✅ DataLoader inicializado');
})();

