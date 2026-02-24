# 🌐 Sistema de URLs Externas para Imágenes

## ✅ Problema Resuelto

**Problema anterior**: Cuando añadías imágenes desde el dashboard, se guardaban en base64 en localStorage, pero no aparecían en GitHub Pages porque:
- Las imágenes base64 son muy grandes y no se exportan al JSON
- Tenías que copiar manualmente las imágenes a las carpetas
- El sitio en GitHub mostraba vacío

**Solución implementada**: Ahora puedes usar **URLs externas** de servicios de hosting de imágenes (Imgur, PostImages, Google Drive, etc.)

---

## 🎯 Características Nuevas

### 1. **Interfaz de Pestañas en el Dashboard**
   - **📁 Subir Archivo**: Método tradicional (requiere copiar archivos manualmente)
   - **🔗 URL Externa**: Nuevo método (recomendado para GitHub Pages)

### 2. **Validación de URLs**
   - Verifica que la URL sea válida
   - Comprueba que sea una imagen (.jpg, .jpeg, .png, .gif, .webp)
   - Muestra vista previa en tiempo real

### 3. **Compatibilidad Total**
   - Funciona en modo local (file://)
   - Funciona en GitHub Pages (https://)
   - Compatible con todas las secciones (Comedor, Biblioteca, Promociones, Avisos)

---

## 📝 Cómo Usar URLs Externas

### Paso 1: Subir tu imagen a un servicio de hosting

#### Opción A: Imgur (Recomendado)
1. Ve a https://imgur.com
2. Haz clic en "New post" o arrastra tu imagen
3. Una vez subida, haz clic derecho en la imagen
4. Selecciona "Copiar dirección de imagen"
5. La URL se verá así: `https://i.imgur.com/XXXXXX.jpg`

#### Opción B: PostImages
1. Ve a https://postimages.org
2. Sube tu imagen
3. Copia el "Direct link"
4. La URL se verá así: `https://i.postimg.cc/XXXXXX/imagen.jpg`

#### Opción C: Google Drive
1. Sube la imagen a Google Drive
2. Clic derecho → "Obtener enlace"
3. Cambia a "Cualquier persona con el enlace"
4. Copia el enlace

### Paso 2: Añadir la imagen en el dashboard

1. Abre `admin.html`
2. Inicia sesión
3. Selecciona la sección (ej: Comedor)
4. Haz clic en "➕ Añadir Imagen"
5. **Selecciona la pestaña "🔗 URL Externa"**
6. Pega la URL de tu imagen
7. Verás una vista previa automática
8. Añade título y descripción
9. Haz clic en "Guardar"

### Paso 3: Exportar y subir a GitHub

1. Haz clic en "📥 Exportar Datos"
2. Descarga el archivo `content-data.json`
3. Reemplaza el archivo en `data/content-data.json`
4. Sube los cambios a GitHub:
   ```bash
   git add data/content-data.json
   git commit -m "Actualización de imágenes"
   git push
   ```
5. Espera 1-2 minutos y recarga tu sitio

---

## 🔧 Archivos Modificados

### 1. **admin.html**
   - Añadido sistema de pestañas (Archivo / URL)
   - Nuevo campo de entrada para URLs
   - Vista previa de URLs
   - Mensajes de ayuda con enlaces a servicios

### 2. **admin.css**
   - Estilos para las pestañas
   - Estilos para vista previa de URLs
   - Estilos para mensajes de ayuda

### 3. **admin.js**
   - Nueva variable `uploadMethod` ('file' o 'url')
   - Función `switchUploadTab()` para cambiar entre pestañas
   - Función `handleUrlInput()` para validación en tiempo real
   - Función `isValidImageUrl()` para validar URLs
   - Función `showUrlPreview()` para mostrar vista previa
   - Modificado `handleUploadSubmit()` para manejar URLs
   - Modificado `renderGallery()` para mostrar imágenes desde URLs

### 4. **comedor.html**
   - Actualizado para cargar imágenes desde URLs externas
   - Prioridad: URL > base64 > path

### 5. **promociones.html**
   - Actualizado para cargar imágenes desde URLs externas
   - Prioridad: URL > base64 > path > image

### 6. **notification-bot.js**
   - Actualizado para mostrar imágenes desde URLs externas
   - Mejor logging para debugging

### 7. **GUIA_GITHUB.md**
   - Añadida sección sobre URLs externas
   - Guía paso a paso para usar servicios de hosting
   - Recomendaciones de servicios (Imgur, PostImages, Google Drive)

---

## 📊 Estructura de Datos

### Imagen con URL Externa:
```json
{
  "id": "comedor_1738368000000",
  "filename": "imagen.jpg",
  "url": "https://i.imgur.com/XXXXXX.jpg",
  "title": "Comedor Escolar",
  "description": "Vista del comedor",
  "dateAdded": "2026-01-31T12:00:00.000Z",
  "isExternal": true
}
```

### Imagen con Archivo Local:
```json
{
  "id": "comedor_1738368000000",
  "filename": "imagen.jpg",
  "path": "galeriacomedor/imagen.jpg",
  "title": "Comedor Escolar",
  "description": "Vista del comedor",
  "dateAdded": "2026-01-31T12:00:00.000Z",
  "base64": "data:image/jpeg;base64,...",
  "isExternal": false
}
```

---

## ✨ Ventajas del Nuevo Sistema

1. ✅ **Sin copiar archivos manualmente** - Las imágenes se cargan directamente desde internet
2. ✅ **Funciona perfectamente en GitHub Pages** - No hay problemas de rutas o archivos faltantes
3. ✅ **Archivos JSON más pequeños** - No se guardan imágenes base64 grandes
4. ✅ **Más rápido de actualizar** - Solo exportas el JSON y lo subes
5. ✅ **Vista previa instantánea** - Ves la imagen antes de guardar
6. ✅ **Compatible con ambos métodos** - Puedes usar URLs o archivos según prefieras

---

## 🎉 ¡Listo para Usar!

Ahora puedes añadir imágenes al comedor (y cualquier otra sección) usando URLs externas, y aparecerán perfectamente en GitHub Pages sin necesidad de copiar archivos manualmente.

**Próximos pasos**:
1. Prueba añadiendo una imagen con URL externa en el dashboard local
2. Exporta los datos
3. Sube a GitHub
4. ¡Verifica que aparezca en tu sitio publicado!

