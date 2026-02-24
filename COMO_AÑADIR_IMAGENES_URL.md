# 📸 Cómo Añadir Imágenes con URL Externa

## 🎯 Guía Paso a Paso

### Paso 1: Subir tu imagen a Imgur

1. **Ve a** https://imgur.com
2. **Haz clic en** "New post" (o arrastra tu imagen directamente)
3. **Espera** a que se suba la imagen
4. **Haz clic derecho** en la imagen subida
5. **Selecciona** "Copiar dirección de imagen" (o "Copy image address")
6. **La URL** se verá así: `https://i.imgur.com/XXXXXX.jpg`

### Paso 2: Añadir la imagen en el Dashboard

1. **Abre** `admin.html` en tu navegador
2. **Inicia sesión** con:
   - Usuario: `admin`
   - Contraseña: `PCB2026`
3. **Haz clic** en el botón "🍽️ Comedor" en el menú lateral
4. **Haz clic** en "➕ Añadir Imagen"
5. **Selecciona la pestaña** "🔗 URL Externa" (NO uses "📁 Subir Archivo")
6. **Pega la URL** que copiaste de Imgur
7. **Verás una vista previa** de la imagen automáticamente
8. **Añade un título**, por ejemplo: "Comedor Escolar 2026"
9. **Añade una descripción** (opcional)
10. **Haz clic en** "Guardar"

### Paso 3: Exportar los Datos

1. **Haz clic** en el botón "📥 Exportar Datos" (arriba a la derecha)
2. **Se descargará** un archivo llamado `content-data.json`
3. **Guarda el archivo** en un lugar que recuerdes

### Paso 4: Reemplazar el archivo en tu proyecto

1. **Ve a la carpeta** `data/` de tu proyecto
2. **Reemplaza** el archivo `content-data.json` con el que descargaste
3. **Verifica** que el archivo se haya reemplazado correctamente

### Paso 5: Subir a GitHub

#### Opción A: Usando GitHub Desktop
1. **Abre GitHub Desktop**
2. **Verás** que `data/content-data.json` aparece como modificado
3. **Escribe un mensaje**: "Añadida imagen del comedor"
4. **Haz clic en** "Commit to main"
5. **Haz clic en** "Push origin"

#### Opción B: Usando la terminal
```bash
git add data/content-data.json
git commit -m "Añadida imagen del comedor"
git push
```

#### Opción C: Usando la web de GitHub
1. **Ve a tu repositorio** en GitHub
2. **Navega a** `data/content-data.json`
3. **Haz clic** en el ícono del lápiz (Edit)
4. **Borra todo** el contenido
5. **Abre** el archivo que descargaste en un editor de texto
6. **Copia todo** el contenido
7. **Pégalo** en GitHub
8. **Haz clic en** "Commit changes"

### Paso 6: Verificar en GitHub Pages

1. **Espera 1-2 minutos** (GitHub necesita tiempo para actualizar)
2. **Abre tu sitio**: `https://TU-USUARIO.github.io/NOMBRE-REPO/comedor.html`
3. **Recarga la página** (Ctrl + F5 o Cmd + Shift + R)
4. **¡Deberías ver tu imagen!** 🎉

---

## 🔍 Verificar que Todo Funciona

### En el Dashboard (admin.html):
- ✅ La imagen debe aparecer en la galería del comedor
- ✅ Debe decir "🌐 URL Externa: nombre-archivo.jpg"
- ✅ Al hacer clic debe abrirse el popup con la imagen

### En el archivo JSON:
```json
{
  "comedor": [
    {
      "id": "comedor_1738368000000",
      "filename": "imagen.jpg",
      "url": "https://i.imgur.com/XXXXXX.jpg",
      "title": "Comedor Escolar",
      "description": "Vista del comedor",
      "dateAdded": "2026-01-31T12:00:00.000Z",
      "isExternal": true
    }
  ]
}
```

### En GitHub Pages (comedor.html):
- ✅ La imagen debe aparecer en la galería
- ✅ Debe decir "🌐 Imagen externa" debajo del título
- ✅ La imagen debe cargar desde Imgur

---

## ❌ Problemas Comunes

### Problema 1: "No aparece la imagen en GitHub"
**Solución**:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca mensajes de error
4. Verifica que la URL de la imagen sea correcta
5. Asegúrate de haber subido el archivo `content-data.json` actualizado

### Problema 2: "La imagen no se ve en la vista previa"
**Solución**:
1. Verifica que la URL termine en `.jpg`, `.jpeg`, `.png`, `.gif` o `.webp`
2. Prueba abriendo la URL directamente en el navegador
3. Si no se abre, la URL no es válida

### Problema 3: "Dice que el comedor está vacío"
**Solución**:
1. Verifica que hayas exportado los datos después de añadir la imagen
2. Verifica que hayas reemplazado el archivo `content-data.json` en la carpeta `data/`
3. Verifica que hayas subido los cambios a GitHub

---

## 💡 Consejos

1. **Usa Imgur** - Es el servicio más confiable y rápido
2. **Copia la URL correcta** - Debe ser la URL de la imagen, no de la página
3. **Verifica la vista previa** - Si no ves la imagen en el dashboard, no funcionará en GitHub
4. **Exporta siempre** - Después de hacer cambios, siempre exporta los datos
5. **Espera 1-2 minutos** - GitHub Pages tarda un poco en actualizar

---

## 📝 Ejemplo Completo

He añadido una **imagen de ejemplo** en el archivo `data/content-data.json` para que veas cómo funciona:

```json
{
  "id": "comedor_ejemplo",
  "filename": "ejemplo-comedor.jpg",
  "url": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800",
  "title": "Ejemplo: Comedor Escolar",
  "description": "Esta es una imagen de ejemplo usando URL externa.",
  "isExternal": true
}
```

**Para verla**:
1. Abre `comedor.html` en tu navegador local
2. Deberías ver la imagen de ejemplo
3. Cuando subas a GitHub, también aparecerá allí

**Para reemplazarla**:
1. Sigue los pasos de arriba para añadir tu propia imagen
2. Exporta los datos
3. Sube a GitHub

---

¡Listo! Ahora ya sabes cómo añadir imágenes con URL externa. 🎉

