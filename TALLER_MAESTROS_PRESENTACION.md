# 🎓 TALLER PARA MAESTROS
## Sistema Web PCB - Escuela del Futuro

---

# 📋 ÍNDICE

1. [Introducción al Sistema](#introducción)
2. [Visión General del PCB System 2](#visión-general)
3. [Características Principales](#características-principales)
4. [Dashboard Administrativo](#dashboard-administrativo)
5. [Gestión de Contenido](#gestión-de-contenido)
6. [Bot de Notificaciones](#bot-de-notificaciones)
7. [Sistema Multiidioma](#sistema-multiidioma)
8. [Modo Claro/Oscuro](#modo-claro-oscuro)
9. [Integración con GitHub Pages](#integración-github)
10. [Potencial Futuro](#potencial-futuro)
11. [Casos de Uso Prácticos](#casos-de-uso)
12. [Preguntas Frecuentes](#preguntas-frecuentes)

---

# 🌟 INTRODUCCIÓN

## ¿Qué es el PCB System 2?

El **PCB System 2** es un sistema web moderno y completo diseñado específicamente para la **Escuela Superior Vocacional Pablo Colón Berdecia**. Es una plataforma digital que integra:

- ✅ **Sitio web institucional** profesional y responsive
- ✅ **Dashboard administrativo** para gestión de contenido
- ✅ **Sistema de notificaciones** inteligente
- ✅ **Multiidioma** (Español/Inglés)
- ✅ **Galerías multimedia** dinámicas
- ✅ **Integración con redes sociales**
- ✅ **Diseño moderno** con efectos visuales de última generación

## ¿Por qué es importante?

En la era digital, una escuela moderna necesita:

1. **Presencia digital profesional** - Primera impresión para estudiantes y padres
2. **Comunicación efectiva** - Avisos y noticias en tiempo real
3. **Accesibilidad** - Información disponible 24/7 desde cualquier dispositivo
4. **Imagen institucional** - Proyectar innovación y excelencia
5. **Eficiencia administrativa** - Gestión fácil de contenido sin conocimientos técnicos

---

# 🎯 VISIÓN GENERAL

## Estructura del Sistema

```
PCB System 2
│
├── 🏠 SITIO WEB PÚBLICO
│   ├── Página Principal (index.html)
│   ├── Quiénes Somos
│   ├── Programas Vocacionales (con slideshow)
│   ├── Servicios al Estudiante
│   ├── Biblioteca
│   ├── Comedor
│   ├── Promociones y Avisos
│   └── Normas y Reglamentos
│
├── ⚙️ DASHBOARD ADMINISTRATIVO
│   ├── Gestión de Biblioteca
│   ├── Gestión de Comedor
│   ├── Gestión de Promociones
│   ├── Gestión de Avisos
│   └── Configuración del Bot
│
├── 🔔 BOT DE NOTIFICACIONES
│   ├── Avisos flotantes
│   ├── Contador de notificaciones
│   └── Popup de imágenes
│
└── 🌐 CARACTERÍSTICAS GLOBALES
    ├── Multiidioma (ES/EN)
    ├── Modo Claro/Oscuro
    ├── Responsive Design
    └── Efectos Modernos
```

## Tecnologías Utilizadas

- **HTML5** - Estructura moderna y semántica
- **CSS3** - Diseño responsive con efectos avanzados
- **JavaScript** - Interactividad y funcionalidad dinámica
- **LocalStorage** - Almacenamiento local de datos
- **GitHub Pages** - Hosting gratuito y profesional
- **JSON** - Gestión de datos estructurados

---

# ✨ CARACTERÍSTICAS PRINCIPALES

## 1. 🎨 Diseño Moderno y Profesional

### Hero Section con Imagen de Fondo
- Imagen impactante con gradiente morado/azul
- Efecto parallax al hacer scroll
- Texto con sombras y efectos visuales
- Botones de acción llamativos

### Slideshow Automático de Programas
- 5 imágenes rotativas de programas vocacionales
- Transiciones suaves con fade effect
- Navegación manual (flechas y dots)
- Soporte táctil para móviles (swipe)
- Todas las imágenes clickeables → Casa Abierta
- Pausa automática al pasar el mouse

### Galerías Multimedia
- **Biblioteca**: Galería de fotos del centro de recursos
- **Comedor**: Imágenes del comedor y menú del día
- **Promociones**: Avisos y eventos escolares
- Popup de imágenes con zoom
- Navegación entre imágenes
- Descripciones y títulos

## 2. 📱 Responsive Design

El sitio se adapta perfectamente a:
- 💻 **Desktop** (1920px+)
- 💻 **Laptop** (1366px - 1920px)
- 📱 **Tablet** (768px - 1024px)
- 📱 **Móvil** (320px - 767px)

### Características Responsive:
- Menú hamburguesa en móvil
- Imágenes optimizadas por tamaño
- Texto adaptable
- Botones táctiles grandes
- Navegación simplificada

## 3. 🌐 Sistema Multiidioma

### Idiomas Disponibles:
- 🇵🇷 **Español** (predeterminado)
- 🇺🇸 **English**

### Cómo Funciona:
1. Click en menú hamburguesa (☰)
2. Seleccionar "🌐 Cambiar Idioma"
3. Elegir idioma deseado
4. Todo el sitio se traduce instantáneamente

### Elementos Traducidos:
- Navegación
- Títulos y subtítulos
- Botones
- Descripciones
- Mensajes del sistema
- Contenido de páginas

## 4. 🌓 Modo Claro/Oscuro

### Beneficios:
- **Modo Claro**: Mejor para ambientes iluminados
- **Modo Oscuro**: Reduce fatiga visual, ahorra batería

### Cómo Cambiar:
1. Click en menú hamburguesa (☰)
2. Seleccionar "🎨 Cambiar Tema"
3. Elegir modo deseado
4. El cambio es instantáneo y se guarda

### Adaptaciones:
- Colores invertidos
- Contraste optimizado
- Imágenes con overlay adaptado
- Botones con nuevos colores

---

# ⚙️ DASHBOARD ADMINISTRATIVO

## Acceso al Dashboard

### Credenciales:
- **Usuario**: `admin`
- **Contraseña**: `PCB2026`

### Formas de Acceder:
1. **Desde el menú hamburguesa**: Click en "⚙️ Dashboard Admin"
2. **URL directa**: `admin.html`
3. **Desde cualquier página**: Menú → Dashboard Admin

## Secciones del Dashboard

### 1. 📚 Gestión de Biblioteca
- Ver galería actual
- Añadir nuevas fotos
- Editar títulos y descripciones
- Eliminar imágenes
- Vista previa en tiempo real

### 2. 🍽️ Gestión de Comedor
- Galería de fotos del comedor
- Editar menú del día (desayuno/almuerzo)
- Añadir imágenes con URL externa
- Gestión de descripciones

### 3. 📢 Gestión de Promociones
- Crear promociones escolares
- Añadir imágenes y descripciones
- Publicar eventos
- Gestión de fechas

### 4. 📋 Gestión de Avisos
- Crear avisos importantes
- Añadir imágenes
- Configurar prioridad
- Programar publicación

### 5. 🔔 Configuración del Bot
- Seleccionar avisos a mostrar
- Configurar notificaciones
- Activar/desactivar bot
- Vista previa de notificaciones

## Funciones Principales

### ➕ Añadir Imagen

**Método 1: Subir Archivo (Local)**
1. Click en "➕ Añadir Imagen"
2. Seleccionar pestaña "📁 Subir Archivo"
3. Click en "Seleccionar archivo"
4. Elegir imagen de tu computadora
5. Añadir título y descripción
6. Click en "Guardar"
7. **Importante**: Copiar archivo a carpeta correspondiente

**Método 2: URL Externa (Recomendado para GitHub)**
1. Subir imagen a Imgur/PostImages
2. Copiar URL de la imagen
3. Click en "➕ Añadir Imagen"
4. Seleccionar pestaña "🔗 URL Externa"
5. Pegar URL
6. Ver vista previa automática
7. Añadir título y descripción
8. Click en "Guardar"

### 📥 Exportar Datos

Para publicar en GitHub Pages:
1. Click en "📥 Exportar Datos"
2. Se descarga `content-data.json`
3. Reemplazar archivo en carpeta `data/`
4. Subir cambios a GitHub

### 🗑️ Eliminar Imagen

1. Buscar imagen en galería
2. Click en icono de papelera (🗑️)
3. Confirmar eliminación
4. Exportar datos actualizados

---

# 🔔 BOT DE NOTIFICACIONES

## ¿Qué es el Bot de Notificaciones?

Es un sistema inteligente que muestra **avisos y promociones** en todas las páginas del sitio web de forma automática y elegante.

## Características del Bot

### 📍 Ubicación
- **Botón flotante** en la esquina inferior derecha
- **Icono de campana** (🔔) con contador de notificaciones
- **Siempre visible** mientras navegas el sitio

### 🎨 Diseño
- **Contador rojo** con número de avisos nuevos
- **Panel deslizable** que se abre al hacer click
- **Tarjetas visuales** con imágenes y descripciones
- **Animaciones suaves** al abrir/cerrar

### 🖼️ Contenido
- **Avisos importantes** de la escuela
- **Promociones** de eventos y actividades
- **Imágenes** de cada aviso
- **Descripciones** detalladas
- **Fechas** de publicación

## Cómo Funciona

### Para los Visitantes:
1. Entran a cualquier página del sitio
2. Ven el botón flotante con el número de avisos
3. Click en el botón → se abre el panel
4. Pueden ver todos los avisos con imágenes
5. Click en cualquier aviso → se abre popup con imagen grande

### Para los Administradores:
1. Acceder al Dashboard
2. Ir a sección "🔔 Bot de Avisos"
3. Ver lista de todos los avisos y promociones
4. **Seleccionar** cuáles mostrar en el bot
5. Click en "Guardar Configuración"
6. Los avisos seleccionados aparecen automáticamente

## Configuración del Bot

### Paso 1: Crear Avisos
1. Dashboard → "📋 Avisos"
2. Añadir imagen con título y descripción
3. Guardar

### Paso 2: Configurar Bot
1. Dashboard → "🔔 Bot de Avisos"
2. Ver lista de avisos disponibles
3. **Marcar checkbox** de avisos a mostrar
4. Click en "Guardar Configuración"

### Paso 3: Verificar
1. Ir a cualquier página del sitio
2. Ver botón flotante con contador actualizado
3. Abrir panel y verificar avisos

## Ventajas del Bot

✅ **Comunicación efectiva** - Todos ven los avisos importantes
✅ **No invasivo** - No interrumpe la navegación
✅ **Visual** - Imágenes llaman la atención
✅ **Actualizable** - Cambios en tiempo real
✅ **Multiplataforma** - Funciona en móvil y desktop
✅ **Inteligente** - Solo muestra avisos seleccionados

## Casos de Uso

### 📅 Eventos Escolares
- Casa Abierta
- Graduaciones
- Actividades especiales
- Competencias (SkillsUSA, HOSA, etc.)

### 📢 Avisos Importantes
- Cambios de horario
- Cierres de escuela
- Fechas importantes
- Requisitos de matrícula

### 🎉 Promociones
- Nuevos programas vocacionales
- Talleres disponibles
- Servicios al estudiante
- Logros de estudiantes

---

# 🌐 SISTEMA MULTIIDIOMA

## Visión General

El sistema soporta **dos idiomas completos**:
- 🇵🇷 **Español** (idioma predeterminado)
- 🇺🇸 **English** (traducción completa)

## Cómo Funciona Técnicamente

### Archivo de Traducciones: `translations.js`

Contiene todas las traducciones en formato JSON:

```javascript
const translations = {
  es: {
    "Inicio": "Inicio",
    "La escuela": "La escuela",
    "Programas": "Programas",
    // ... más traducciones
  },
  en: {
    "Inicio": "Home",
    "La escuela": "The School",
    "Programas": "Programs",
    // ... más traducciones
  }
};
```

### Sistema de Etiquetas

Cada elemento traducible tiene atributo `data-translate`:

```html
<h1 data-translate="Bienvenidos">Bienvenidos</h1>
```

Al cambiar idioma, JavaScript busca la traducción y actualiza el texto.

## Elementos Traducidos

### ✅ Navegación
- Menú principal
- Menú hamburguesa
- Enlaces de pie de página

### ✅ Contenido
- Títulos de secciones
- Descripciones
- Botones de acción
- Mensajes del sistema

### ✅ Dashboard
- Etiquetas de formularios
- Botones de acción
- Mensajes de confirmación
- Instrucciones

## Cómo Añadir Nuevas Traducciones

### Para Maestros/Administradores:

Si necesitan añadir nuevo contenido traducible:

1. **Identificar el texto** que necesita traducción
2. **Contactar al administrador técnico**
3. **Proporcionar**:
   - Texto en español
   - Traducción al inglés
   - Ubicación en el sitio

### Para Desarrolladores:

1. Abrir `translations.js`
2. Añadir entrada en ambos idiomas:
```javascript
es: {
  "Nuevo texto": "Nuevo texto"
},
en: {
  "Nuevo texto": "New text"
}
```
3. Añadir atributo en HTML:
```html
<p data-translate="Nuevo texto">Nuevo texto</p>
```

## Persistencia del Idioma

- El idioma seleccionado se **guarda en localStorage**
- Al volver al sitio, se mantiene el idioma elegido
- Funciona en todas las páginas del sitio

---

# 🌓 MODO CLARO/OSCURO

## ¿Por Qué es Importante?

### Beneficios del Modo Oscuro:
- 👁️ **Reduce fatiga visual** en ambientes oscuros
- 🔋 **Ahorra batería** en dispositivos móviles (pantallas OLED)
- 🌙 **Mejor para uso nocturno**
- 🎨 **Aspecto moderno** y profesional
- ♿ **Accesibilidad** para personas con sensibilidad a la luz

### Beneficios del Modo Claro:
- ☀️ **Mejor legibilidad** en ambientes iluminados
- 📄 **Familiar** para la mayoría de usuarios
- 🖨️ **Mejor para imprimir**
- 👴 **Preferido** por usuarios mayores

## Cómo Funciona

### Cambio de Tema:
1. Click en menú hamburguesa (☰)
2. Click en "🎨 Cambiar Tema"
3. Seleccionar modo deseado
4. Cambio instantáneo en toda la página

### Adaptaciones Automáticas:

**Modo Claro:**
- Fondo blanco/gris claro
- Texto negro/gris oscuro
- Gradientes morado/azul vibrantes
- Sombras suaves

**Modo Oscuro:**
- Fondo negro/gris oscuro (#1a1a1a)
- Texto blanco/gris claro
- Gradientes adaptados
- Sombras más pronunciadas
- Bordes con brillo sutil

## Elementos que se Adaptan

### 🎨 Colores
- Fondos de secciones
- Tarjetas y cards
- Botones
- Enlaces
- Bordes

### 📝 Texto
- Títulos
- Párrafos
- Enlaces
- Etiquetas

### 🖼️ Imágenes
- Overlays adaptados
- Filtros de brillo
- Sombras

### 🎯 Componentes
- Menú de navegación
- Slideshow
- Galerías
- Bot de notificaciones
- Dashboard administrativo

## Persistencia

- La preferencia se **guarda en localStorage**
- Se mantiene al navegar entre páginas
- Se recuerda en futuras visitas

---

# 🚀 INTEGRACIÓN CON GITHUB PAGES

## ¿Qué es GitHub Pages?

**GitHub Pages** es un servicio **gratuito** de hosting web que permite publicar sitios web directamente desde un repositorio de GitHub.

### Ventajas:
- ✅ **100% Gratuito** - Sin costos mensuales
- ✅ **Hosting profesional** - Servidores de GitHub
- ✅ **HTTPS incluido** - Seguridad automática
- ✅ **Dominio personalizable** - Puedes usar tu propio dominio
- ✅ **Actualizaciones fáciles** - Solo subir archivos
- ✅ **Sin límites** de visitantes
- ✅ **Rápido y confiable** - Infraestructura de GitHub

## Cómo Funciona el Sistema

### Arquitectura Dual:

**Entorno Local (file://):**
- Usa `localStorage` para datos
- Imágenes desde carpetas locales
- Desarrollo y pruebas

**Entorno GitHub Pages (https://):**
- Usa `data/content-data.json` para datos
- Imágenes desde URLs externas (Imgur, etc.)
- Producción pública

### Detección Automática:

El sistema detecta automáticamente dónde está ejecutándose:

```javascript
const isGitHubPages = window.location.hostname.includes('github.io');
```

Y carga los datos desde la fuente correcta.

## Proceso de Publicación

### Paso 1: Preparar Contenido
1. Usar Dashboard para añadir/editar contenido
2. Usar URLs externas para imágenes (Imgur/PostImages)
3. Exportar datos (💾 Exportar Datos)

### Paso 2: Actualizar Repositorio
1. Reemplazar `data/content-data.json` con archivo exportado
2. Subir cambios a GitHub:
   ```
   git add .
   git commit -m "Actualizar contenido"
   git push
   ```

### Paso 3: Verificar
1. Esperar 1-2 minutos
2. Visitar sitio en GitHub Pages
3. Verificar que cambios aparezcan

## URLs del Sistema

### Sitio Público:
```
https://[usuario].github.io/PCB_System2/
```

### Dashboard (requiere autenticación):
```
https://[usuario].github.io/PCB_System2/admin.html
```

## Gestión de Imágenes en GitHub Pages

### ❌ NO Recomendado:
- Subir imágenes grandes al repositorio
- Usar rutas locales
- Archivos base64 muy grandes

### ✅ Recomendado:
- **Imgur** - https://imgur.com
- **PostImages** - https://postimages.org
- **Google Drive** (enlaces públicos)
- **Cloudinary** (para proyectos grandes)

### Proceso:
1. Subir imagen a Imgur
2. Copiar URL directa de la imagen
3. Usar en Dashboard con "🔗 URL Externa"
4. Exportar datos
5. Publicar en GitHub

---

# 🌟 POTENCIAL FUTURO

## Mejoras a Corto Plazo (1-3 meses)

### 📱 Aplicación Móvil
- **PWA (Progressive Web App)**
- Instalable en teléfonos
- Funciona offline
- Notificaciones push
- Icono en pantalla de inicio

### 📧 Sistema de Correos
- Formulario de contacto
- Envío automático de emails
- Notificaciones a administradores
- Confirmaciones automáticas

### 📊 Estadísticas
- Google Analytics integrado
- Contador de visitas
- Páginas más visitadas
- Tiempo de permanencia
- Datos demográficos

### 🔐 Autenticación Mejorada
- Login con Google
- Login con Microsoft (Office 365)
- Recuperación de contraseña
- Múltiples usuarios admin

## Mejoras a Mediano Plazo (3-6 meses)

### 📚 Portal de Estudiantes
- Login individual para estudiantes
- Ver calificaciones
- Descargar documentos
- Calendario personal
- Mensajería interna

### 👨‍🏫 Portal de Maestros
- Subir calificaciones
- Gestionar asistencia
- Comunicación con padres
- Recursos educativos
- Planificación de clases

### 📅 Sistema de Eventos
- Calendario interactivo
- Registro a eventos
- Recordatorios automáticos
- Integración con Google Calendar
- Exportar eventos

### 💬 Chat en Vivo
- Soporte en tiempo real
- Chatbot automático
- Horarios de atención
- Historial de conversaciones

## Mejoras a Largo Plazo (6-12 meses)

### 🎓 Sistema de Matrícula Online
- Formularios digitales
- Subida de documentos
- Pago online
- Seguimiento de solicitud
- Confirmación automática

### 📖 Biblioteca Digital
- Catálogo online
- Reserva de libros
- Recursos digitales
- E-books
- Búsqueda avanzada

### 🍽️ Sistema de Comedor Mejorado
- Pre-orden de comidas
- Menú semanal
- Información nutricional
- Alergias y restricciones
- Pago digital

### 📊 Dashboard de Análisis
- Métricas en tiempo real
- Reportes automáticos
- Gráficos interactivos
- Exportar a Excel/PDF
- Comparativas históricas

### 🌐 Integración con Redes Sociales
- Publicación automática en Facebook
- Tweets automáticos
- Instagram feed
- YouTube videos
- Compartir contenido fácilmente

## Tecnologías Emergentes

### 🤖 Inteligencia Artificial
- Chatbot inteligente
- Recomendaciones personalizadas
- Traducción automática a más idiomas
- Análisis predictivo
- Asistente virtual

### 🔊 Accesibilidad Avanzada
- Lector de pantalla mejorado
- Texto a voz
- Voz a texto
- Alto contraste
- Tamaños de fuente ajustables
- Navegación por teclado completa

### 📱 Realidad Aumentada
- Tours virtuales de la escuela
- Visualización 3D de talleres
- Experiencias interactivas
- Demostraciones de programas

---

# 💼 CASOS DE USO PRÁCTICOS

## Caso 1: Anuncio de Casa Abierta

### Situación:
La escuela organizará Casa Abierta el próximo mes.

### Proceso:
1. **Crear diseño** del aviso en Canva/Photoshop
2. **Subir imagen** a Imgur
3. **Dashboard** → Avisos → Añadir Imagen
4. **Usar URL externa** de Imgur
5. **Título**: "Casa Abierta 2026"
6. **Descripción**: Fecha, hora, actividades
7. **Guardar** y exportar datos
8. **Configurar Bot** para mostrar el aviso
9. **Publicar** en GitHub Pages

### Resultado:
- ✅ Aviso visible en todas las páginas
- ✅ Contador en bot de notificaciones
- ✅ Imagen grande al hacer click
- ✅ Información completa disponible

## Caso 2: Actualizar Menú del Comedor

### Situación:
Nuevo menú semanal del comedor escolar.

### Proceso:
1. **Dashboard** → Comedor → Editar Menú
2. **Actualizar** desayuno y almuerzo
3. **Añadir foto** del menú (URL externa)
4. **Guardar** cambios
5. **Exportar** datos
6. **Publicar** en GitHub

### Resultado:
- ✅ Menú actualizado en página de comedor
- ✅ Estudiantes y padres informados
- ✅ Imagen del menú visible

## Caso 3: Promocionar Logro de Estudiantes

### Situación:
Estudiantes ganaron competencia de SkillsUSA.

### Proceso:
1. **Tomar fotos** del evento
2. **Subir a Imgur** (álbum si son varias)
3. **Dashboard** → Promociones → Añadir Imagen
4. **Título**: "¡Campeones de SkillsUSA 2026!"
5. **Descripción**: Detalles del logro
6. **Añadir múltiples imágenes** si es necesario
7. **Configurar bot** para destacar
8. **Publicar**

### Resultado:
- ✅ Reconocimiento público de estudiantes
- ✅ Promoción de programas vocacionales
- ✅ Motivación para otros estudiantes
- ✅ Imagen positiva de la escuela

## Caso 4: Cambio de Horario de Emergencia

### Situación:
Cierre de escuela por emergencia.

### Proceso:
1. **Crear aviso urgente** (imagen con texto grande)
2. **Subir a Imgur** (rápido)
3. **Dashboard** → Avisos → Añadir
4. **Título**: "⚠️ CIERRE DE ESCUELA"
5. **Descripción**: Razón y fecha de reapertura
6. **Guardar y exportar** inmediatamente
7. **Publicar en GitHub** (2 minutos)
8. **Configurar bot** para mostrar primero

### Resultado:
- ✅ Información disponible en minutos
- ✅ Accesible 24/7 desde cualquier dispositivo
- ✅ Padres y estudiantes informados
- ✅ Reducción de llamadas a la escuela

## Caso 5: Actualizar Galería de Biblioteca

### Situación:
Renovación del centro de recursos, nuevas fotos.

### Proceso:
1. **Tomar fotos profesionales** de la biblioteca
2. **Editar y optimizar** imágenes
3. **Subir a Imgur**
4. **Dashboard** → Biblioteca
5. **Eliminar fotos antiguas**
6. **Añadir nuevas fotos** con URLs
7. **Títulos descriptivos**: "Área de lectura", "Computadoras", etc.
8. **Exportar y publicar**

### Resultado:
- ✅ Galería actualizada y moderna
- ✅ Muestra mejoras de la escuela
- ✅ Atrae a futuros estudiantes
- ✅ Orgullo institucional

---

# ❓ PREGUNTAS FRECUENTES

## Sobre el Sistema

### ¿Necesito conocimientos de programación?
**No.** El dashboard está diseñado para ser usado por cualquier persona sin conocimientos técnicos. Solo necesitas:
- Saber usar un navegador web
- Poder subir imágenes a internet (Imgur)
- Copiar y pegar URLs

### ¿Funciona en mi teléfono?
**Sí.** El sitio es completamente responsive y funciona perfectamente en:
- 📱 iPhone y Android
- 💻 Laptops y computadoras
- 📱 Tablets
- 🖥️ Monitores grandes

### ¿Puedo usar el sistema offline?
**Parcialmente.**
- **Sitio público**: Necesita internet
- **Dashboard local**: Funciona sin internet
- **Datos**: Se guardan en localStorage (disponible offline)
- **Imágenes externas**: Necesitan internet

### ¿Cuánto cuesta mantener el sitio?
**$0 (Gratis).** GitHub Pages es completamente gratuito. Los únicos costos opcionales serían:
- Dominio personalizado (~$10-15/año)
- Servicios premium de hosting de imágenes (opcional)

## Sobre el Dashboard

### ¿Cómo accedo al dashboard?
1. Ir a `admin.html`
2. Usuario: `admin`
3. Contraseña: `PCB2026`

O desde cualquier página: Menú → Dashboard Admin

### ¿Puedo tener múltiples administradores?
**Actualmente no.** El sistema tiene un solo usuario admin. Para múltiples usuarios se necesitaría:
- Sistema de autenticación más robusto
- Base de datos de usuarios
- Permisos y roles

Esto está en el plan de mejoras futuras.

### ¿Qué pasa si olvido la contraseña?
Contactar al administrador técnico del sistema para resetearla. La contraseña está en el archivo `auth.js`.

### ¿Los cambios son inmediatos?
- **Localmente**: Sí, inmediatos
- **GitHub Pages**: 1-2 minutos después de publicar

## Sobre las Imágenes

### ¿Qué tamaño deben tener las imágenes?
**Recomendaciones:**
- **Ancho**: 1200-1920px
- **Alto**: 800-1080px
- **Peso**: Menos de 500KB (optimizar)
- **Formato**: JPG para fotos, PNG para gráficos

### ¿Dónde subo las imágenes?
**Opciones recomendadas:**
1. **Imgur** - https://imgur.com (más fácil)
2. **PostImages** - https://postimages.org
3. **Google Drive** (enlaces públicos)

### ¿Puedo usar imágenes con derechos de autor?
**No.** Solo usar:
- ✅ Fotos tomadas por la escuela
- ✅ Imágenes con licencia libre
- ✅ Diseños creados por ustedes
- ❌ Imágenes de Google sin permiso
- ❌ Fotos de otros sitios web

### ¿Cómo optimizo imágenes grandes?
Usar herramientas gratuitas:
- **TinyPNG** - https://tinypng.com
- **Compressor.io** - https://compressor.io
- **Photoshop** - Guardar para web

## Sobre el Bot de Notificaciones

### ¿Cuántos avisos puedo mostrar?
**Ilimitados**, pero se recomienda:
- 3-5 avisos activos simultáneamente
- Priorizar los más importantes
- Actualizar regularmente

### ¿Puedo programar avisos para el futuro?
**No actualmente.** Los avisos se publican inmediatamente. Esta función está en desarrollo futuro.

### ¿Los avisos se eliminan automáticamente?
**No.** Debes eliminarlos manualmente cuando ya no sean relevantes.

## Sobre Multiidioma

### ¿Puedo añadir más idiomas?
**Sí**, pero requiere:
- Editar archivo `translations.js`
- Añadir todas las traducciones
- Modificar selector de idioma
- Conocimientos técnicos básicos

### ¿Las imágenes se traducen?
**No.** Las imágenes son las mismas en ambos idiomas. Si necesitas imágenes diferentes por idioma, contacta al administrador técnico.

### ¿El contenido del dashboard se traduce?
**Parcialmente.** La interfaz del dashboard tiene algunas traducciones, pero el contenido que añades (títulos, descripciones) debes escribirlo en el idioma que prefieras.

## Sobre GitHub Pages

### ¿Cómo actualizo el sitio en GitHub?
1. Hacer cambios en dashboard
2. Exportar datos (💾)
3. Reemplazar `data/content-data.json`
4. Subir a GitHub:
   ```
   git add .
   git commit -m "Actualización"
   git push
   ```

### ¿Puedo usar mi propio dominio?
**Sí.** GitHub Pages permite dominios personalizados:
- Comprar dominio (ej: escuelapcb.com)
- Configurar DNS
- Añadir en configuración de GitHub
- Guía: https://docs.github.com/pages/custom-domains

### ¿Qué pasa si GitHub Pages deja de ser gratis?
Es muy improbable, pero si sucede:
- El código es tuyo (open source)
- Puedes migrar a otro hosting
- Netlify, Vercel son alternativas gratuitas
- Hosting tradicional (~$5/mes)

---

# 📚 RECURSOS ADICIONALES

## Documentación Incluida

El sistema incluye varios documentos de ayuda:

1. **README.md** - Introducción general
2. **ADMIN_INSTRUCCIONES.md** - Guía del dashboard
3. **COMO_AÑADIR_IMAGENES_URL.md** - Tutorial de URLs externas
4. **GUIA_GITHUB.md** - Publicación en GitHub Pages
5. **PASOS_RAPIDOS_GITHUB.txt** - Referencia rápida

## Tutoriales en Video (Sugeridos)

Para el taller, se recomienda crear:
- 🎥 Video: "Cómo usar el Dashboard" (5 min)
- 🎥 Video: "Subir imágenes a Imgur" (3 min)
- 🎥 Video: "Configurar el Bot" (4 min)
- 🎥 Video: "Publicar en GitHub" (6 min)

## Contacto y Soporte

Para ayuda técnica:
- 📧 Email del administrador técnico
- 💬 Grupo de WhatsApp de administradores
- 📞 Extensión de tecnología
- 🖥️ Visita al departamento de IT

---

# 🎯 PLAN DE IMPLEMENTACIÓN DEL TALLER

## Estructura Sugerida del Taller (2 horas)

### Parte 1: Introducción (20 min)
- Presentación del sistema
- Demostración del sitio web
- Importancia de la presencia digital
- Beneficios para la escuela

### Parte 2: Tour del Sitio (15 min)
- Navegación por todas las páginas
- Características especiales (slideshow, galerías)
- Multiidioma y modo oscuro
- Bot de notificaciones

### Parte 3: Dashboard Administrativo (30 min)
- Acceso y login
- Tour por las secciones
- Demostración en vivo: añadir imagen
- Demostración: configurar bot
- Exportar datos

### Parte 4: Práctica Guiada (40 min)
- Cada maestro accede al dashboard
- Ejercicio 1: Añadir imagen a biblioteca
- Ejercicio 2: Crear aviso
- Ejercicio 3: Configurar bot
- Ejercicio 4: Exportar datos

### Parte 5: Potencial Futuro y Q&A (15 min)
- Discusión de mejoras posibles
- Ideas de los maestros
- Preguntas y respuestas
- Próximos pasos

## Materiales Necesarios

### Para el Presentador:
- 💻 Laptop con proyector
- 🌐 Conexión a internet
- 📄 Presentación (este documento)
- 🎥 Videos demostrativos (opcional)
- 📋 Hoja de credenciales

### Para los Participantes:
- 💻 Laptop o tablet personal
- 🌐 Conexión a internet
- 📝 Libreta para notas
- 📄 Copia impresa de guía rápida

## Evaluación del Taller

Al final, pedir a los maestros:
- ✅ Completar encuesta de satisfacción
- ✅ Sugerencias de mejora
- ✅ Ideas para nuevas funcionalidades
- ✅ Compromiso de uso del sistema

---

# 🌟 CONCLUSIÓN

## El Futuro de la Educación es Digital

El **PCB System 2** representa un paso importante hacia la modernización de nuestra institución. No es solo un sitio web, es:

- 🚀 **Una plataforma de comunicación** efectiva
- 📱 **Una herramienta de gestión** eficiente
- 🎨 **Una imagen institucional** profesional
- 🌐 **Una ventana al mundo** para nuestra escuela
- 💡 **Una base para innovación** continua

## Llamado a la Acción

Como maestros, ustedes son **embajadores** de este sistema:

1. **Úsenlo** regularmente
2. **Promuevan** su uso entre estudiantes y padres
3. **Contribuyan** con contenido e ideas
4. **Sugieran** mejoras y nuevas funcionalidades
5. **Capaciten** a otros en su uso

## Visión a Futuro

Juntos podemos convertir a la **Escuela Superior Vocacional Pablo Colón Berdecia** en un referente de:

- ✨ **Innovación educativa**
- 🌐 **Transformación digital**
- 📱 **Comunicación efectiva**
- 🎓 **Excelencia académica**
- 🚀 **Educación del siglo XXI**

---

# 📞 INFORMACIÓN DE CONTACTO

## Soporte Técnico
- **Email**: [admin-tecnico@escuelapcb.edu]
- **Teléfono**: [Extensión IT]
- **Horario**: Lunes a Viernes, 8:00 AM - 3:00 PM

## Recursos Online
- **Sitio Web**: https://[usuario].github.io/PCB_System2/
- **Dashboard**: https://[usuario].github.io/PCB_System2/admin.html
- **Documentación**: Carpeta del proyecto

---

**¡Gracias por su participación y compromiso con la excelencia educativa!**

🎓 **Escuela Superior Vocacional Pablo Colón Berdecia**
🌟 **Educando para el futuro, hoy**

---

*Documento creado para el Taller de Maestros - PCB System 2*
*Versión 1.0 - Febrero 2026*

