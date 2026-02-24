# 📢 Instrucciones: Popup de Novedades

## ✅ Problema Solucionado

El popup de novedades no aparecía porque faltaba importar el archivo `services-manager.js` en `index.html`.

### 🔧 Cambio Aplicado:

**Archivo modificado:** `index.html`

Se agregó la importación del script:
```html
<script src="js/services-manager.js"></script>
```

## 📋 Cómo Usar el Sistema de Novedades

### Paso 1: Crear una Novedad

1. **Abre** `evidencia.html` en tu navegador
2. **Desplázate** hasta la sección "📢 Gestión de Novedades (Popup)"
3. **Completa el formulario**:
   - **Título**: Ej. "¡Matrícula Abierta!"
   - **Mensaje**: Ej. "Ya comenzó la matrícula para el nuevo curso escolar"
   - **URL de Imagen** (opcional): Ej. "https://example.com/imagen.jpg"
4. **Haz clic** en "Publicar Noticia"
5. Verás un mensaje: "Noticia publicada. Esta será la que se muestre en el popup de inicio."

### Paso 2: Verificar el Popup

1. **Abre** `index.html` en tu navegador
2. **Espera 3 segundos** después de cargar la página
3. El popup aparecerá en la **esquina inferior derecha** con:
   - El título de tu novedad
   - El mensaje
   - La imagen (si agregaste una)
   - Un botón para ver promociones

### Paso 3: Gestionar Novedades

En `evidencia.html` puedes:
- ✅ Ver todas las noticias creadas
- ✅ Eliminar noticias antiguas
- ✅ La noticia más reciente siempre será la que aparezca en el popup

## 🎨 Características del Popup

### Ubicación:
- **Posición**: Esquina inferior derecha
- **Aparece**: 3 segundos después de cargar la página
- **Z-index**: 9998 (por encima de la mayoría de elementos)

### Diseño:
- Fondo blanco con sombra
- Borde izquierdo naranja (#e67e22)
- Animación de entrada desde la derecha
- Botón de cerrar (X) en la esquina superior derecha

### Contenido Dinámico:
- **Título**: Se actualiza con el título de la novedad
- **Mensaje**: Se actualiza con el mensaje de la novedad
- **Imagen**: Se muestra si agregaste una URL de imagen
- **Botón**: Enlace a la página de promociones

## 🔍 Solución de Problemas

### Problema: El popup no aparece

**Solución 1: Verifica que hay una novedad creada**
1. Abre `evidencia.html`
2. Verifica que hay al menos una noticia en la lista
3. Si no hay, crea una nueva

**Solución 2: Limpia la caché del navegador**
1. Presiona `Ctrl + Shift + R` para recargar sin caché
2. O abre en modo incógnito: `Ctrl + Shift + N`

**Solución 3: Verifica la consola del navegador**
1. Presiona `F12` para abrir las herramientas de desarrollo
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si ves "serviceManager is not defined", recarga la página

### Problema: El popup muestra contenido antiguo

**Solución:**
1. Abre `evidencia.html`
2. Elimina las noticias antiguas
3. Crea una nueva noticia
4. Recarga `index.html`

### Problema: La imagen no se muestra

**Solución:**
1. Verifica que la URL de la imagen sea válida
2. Prueba con una URL de imagen pública (Imgur, Unsplash, etc.)
3. Ejemplo de URL válida: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1`

## 📝 Estructura de Datos

Las noticias se guardan en `localStorage` con esta estructura:

```json
{
  "news": [
    {
      "id": "NEWS-001",
      "title": "¡Matrícula Abierta!",
      "message": "Ya comenzó la matrícula para el nuevo curso escolar",
      "imageUrl": "https://example.com/imagen.jpg",
      "date": "2026-02-08T12:00:00.000Z",
      "active": true
    }
  ]
}
```

## 🚀 Próximos Pasos

1. **Crea tu primera novedad** en `evidencia.html`
2. **Verifica** que aparezca en `index.html`
3. **Personaliza** el mensaje y la imagen según tus necesidades

## 💡 Consejos

- Mantén el título corto (máximo 50 caracteres)
- El mensaje debe ser claro y conciso (máximo 150 caracteres)
- Usa imágenes de alta calidad pero no muy pesadas
- Actualiza las noticias regularmente para mantener el interés

---

**Fecha de Actualización**: 2026-02-08  
**Estado**: ✅ FUNCIONANDO

