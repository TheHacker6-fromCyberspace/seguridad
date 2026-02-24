# 🚀 Guía Completa: Configuración de GitHub Pages

Esta guía te explica paso a paso cómo subir tu sitio web a GitHub y configurar GitHub Pages para que se actualice automáticamente.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#1-requisitos-previos)
2. [Crear Repositorio en GitHub](#2-crear-repositorio-en-github)
3. [Subir el Proyecto a GitHub](#3-subir-el-proyecto-a-github)
4. [Configurar GitHub Pages](#4-configurar-github-pages)
5. [Actualizar el Contenido](#5-actualizar-el-contenido)
6. [Solución de Problemas](#6-solución-de-problemas)

---

## 1. Requisitos Previos

Antes de comenzar, necesitas:

- ✅ Una cuenta en [GitHub](https://github.com) (es gratis)
- ✅ [Git](https://git-scm.com/downloads) instalado en tu computadora
- ✅ [GitHub Desktop](https://desktop.github.com/) (opcional, pero recomendado para principiantes)

---

## 2. Crear Repositorio en GitHub

### Opción A: Usando GitHub Desktop (Recomendado)

1. **Abre GitHub Desktop**
2. **Haz clic en** `File` → `New Repository`
3. **Completa los datos**:
   - **Name**: `PCB-Website` (o el nombre que prefieras)
   - **Description**: `Sitio web de la Escuela Superior Vocacional Pablo Colón Berdecia`
   - **Local Path**: Selecciona la carpeta donde está tu proyecto
   - **Initialize with README**: ✅ Marca esta opción
4. **Haz clic en** `Create Repository`
5. **Haz clic en** `Publish repository`
6. **Desmarca** "Keep this code private" si quieres que sea público
7. **Haz clic en** `Publish Repository`

### Opción B: Usando la Web de GitHub

1. **Ve a** [github.com](https://github.com)
2. **Haz clic en** el botón `+` (arriba a la derecha) → `New repository`
3. **Completa los datos**:
   - **Repository name**: `PCB-Website`
   - **Description**: `Sitio web de la Escuela Superior Vocacional Pablo Colón Berdecia`
   - **Public** o **Private**: Selecciona según prefieras
   - **Add a README file**: ✅ Marca esta opción
4. **Haz clic en** `Create repository`

---

## 3. Subir el Proyecto a GitHub

### Opción A: Usando GitHub Desktop

1. **Abre GitHub Desktop**
2. **Selecciona tu repositorio** en la lista de la izquierda
3. **Arrastra todos los archivos** de tu proyecto a la ventana de GitHub Desktop
4. **Escribe un mensaje** en "Summary": `Subida inicial del sitio web`
5. **Haz clic en** `Commit to main`
6. **Haz clic en** `Push origin` (arriba)

### Opción B: Usando Git en la Terminal

```bash
# 1. Abre PowerShell en la carpeta de tu proyecto
cd "C:\Users\rober\Pictures\PCB_System2-main\PCB_System2-main"

# 2. Inicializa Git (si no lo has hecho)
git init

# 3. Agrega todos los archivos
git add .

# 4. Haz el primer commit
git commit -m "Subida inicial del sitio web"

# 5. Conecta con tu repositorio de GitHub
# Reemplaza TU-USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/PCB-Website.git

# 6. Sube los archivos
git branch -M main
git push -u origin main
```

---

## 4. Configurar GitHub Pages

1. **Ve a tu repositorio** en GitHub (github.com/TU-USUARIO/PCB-Website)
2. **Haz clic en** `Settings` (Configuración)
3. **En el menú lateral**, haz clic en `Pages`
4. **En "Source"**, selecciona:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. **Haz clic en** `Save`
6. **Espera 1-2 minutos** y recarga la página
7. **Verás un mensaje** que dice: "Your site is published at https://TU-USUARIO.github.io/PCB-Website/"

🎉 **¡Listo!** Tu sitio web ya está en línea.

---

## 5. Actualizar el Contenido

### 🌟 Método Recomendado: Usar URLs Externas para Imágenes

**¡NUEVO!** Ahora puedes usar URLs externas para las imágenes, lo que hace mucho más fácil la gestión del contenido:

#### Ventajas de usar URLs externas:
- ✅ No necesitas copiar archivos manualmente
- ✅ Funciona perfectamente en GitHub Pages
- ✅ Más rápido y fácil de actualizar
- ✅ Las imágenes se cargan desde servicios especializados

#### Servicios recomendados para hospedar imágenes:

1. **[Imgur](https://imgur.com)** (Recomendado)
   - Gratis y sin registro (aunque es mejor con cuenta)
   - Sube la imagen → Clic derecho → "Copiar dirección de imagen"
   - Pega la URL en el dashboard

2. **[PostImages](https://postimages.org)**
   - Gratis y sin registro
   - Sube la imagen → Copia el "Direct link"

3. **Google Drive**
   - Sube la imagen → Clic derecho → "Obtener enlace"
   - Cambia "Restringido" a "Cualquier persona con el enlace"
   - Usa el enlace de vista previa

#### Cómo usar URLs externas en el dashboard:

1. **Abre el dashboard**: `https://TU-USUARIO.github.io/PCB-Website/admin.html`
2. **Inicia sesión** con las credenciales
3. **Selecciona la sección** (Comedor, Promociones, Avisos, etc.)
4. **Haz clic en** "➕ Añadir Imagen"
5. **Selecciona la pestaña** "🔗 URL Externa"
6. **Pega la URL** de tu imagen (desde Imgur, PostImages, etc.)
7. **Verás una vista previa** de la imagen
8. **Añade título y descripción**
9. **Haz clic en** "Guardar"
10. **Exporta los datos** y súbelos a GitHub (ver abajo)

### Método 1: Desde el Panel Administrativo

1. **Abre tu sitio web**: `https://TU-USUARIO.github.io/PCB-Website/admin.html`
2. **Inicia sesión** con:
   - Usuario: `admin`
   - Contraseña: `PCB2026`
3. **Añade o edita** promociones, avisos, imágenes, etc.
   - **Opción A**: Usa "🔗 URL Externa" para imágenes (recomendado)
   - **Opción B**: Sube archivos (requiere copiar manualmente)
4. **Haz clic en** `📥 Exportar Datos` (botón en la parte superior)
5. **Se descargará** el archivo `content-data.json`
6. **Sube el archivo** a GitHub:

#### Usando GitHub Desktop:
   - Reemplaza el archivo `data/content-data.json` con el nuevo
   - Abre GitHub Desktop
   - Escribe un mensaje: `Actualización de contenido`
   - Haz clic en `Commit to main`
   - Haz clic en `Push origin`

#### Usando la Web de GitHub:
   - Ve a tu repositorio en GitHub
   - Navega a la carpeta `data`
   - Haz clic en `content-data.json`
   - Haz clic en el ícono del lápiz (Edit)
   - Borra todo el contenido
   - Copia y pega el contenido del nuevo archivo
   - Haz clic en `Commit changes`

7. **Espera 1-2 minutos** y el sitio se actualizará automáticamente

### Método 2: Subir Imágenes Directamente

Si quieres subir imágenes directamente a las carpetas:

1. **Sube las imágenes** a las carpetas correspondientes:
   - `Avisos/` - Para avisos
   - `galeriadepromociones/` - Para promociones
   - `galeriabiblioteca/` - Para biblioteca
   - `galeriacomedor/` - Para comedor

2. **Actualiza el archivo** `data/content-data.json` con las rutas de las nuevas imágenes

3. **Sube los cambios** a GitHub usando GitHub Desktop o Git

---

## 6. Solución de Problemas

### ❓ El sitio no se actualiza

- **Espera 2-5 minutos** después de hacer push
- **Verifica** que los cambios estén en GitHub
- **Limpia la caché** del navegador (Ctrl + F5)
- **Revisa** la pestaña "Actions" en GitHub para ver si hay errores

### ❓ Las imágenes no se ven

- **Verifica** que las rutas en `content-data.json` sean correctas
- **Asegúrate** de que las imágenes estén en las carpetas correctas
- **Revisa** la consola del navegador (F12) para ver errores

### ❓ El bot no muestra avisos

- **Verifica** que hayas seleccionado avisos en el dashboard
- **Haz clic en** "💾 Guardar Configuración" en la sección "🔔 Bot de Avisos"
- **Recarga** la página principal (F5)
- **Abre la consola** (F12) y busca mensajes de error

### ❓ No puedo acceder al dashboard

- **Verifica** las credenciales:
  - Usuario: `admin`
  - Contraseña: `PCB2026`
- **Limpia** las cookies y localStorage del navegador
- **Intenta** en modo incógnito

### ❓ Los datos no se guardan

- **Verifica** que estés usando un navegador moderno (Chrome, Firefox, Edge)
- **Asegúrate** de que localStorage esté habilitado
- **Exporta** los datos regularmente usando el botón "📥 Exportar Datos"

---

## 📞 Contacto y Soporte

Si tienes problemas o preguntas:

1. **Revisa** esta guía completa
2. **Abre la consola** del navegador (F12) y busca mensajes de error
3. **Toma capturas** de pantalla de los errores
4. **Contacta** al administrador del sistema

---

## 🔐 Seguridad

### Cambiar la Contraseña del Dashboard

Para cambiar la contraseña del dashboard:

1. **Abre** el archivo `auth.js`
2. **Busca** la línea que dice:
   ```javascript
   const ADMIN_PASSWORD = 'PCB2026';
   ```
3. **Cambia** `'PCB2026'` por tu nueva contraseña
4. **Guarda** el archivo
5. **Sube** los cambios a GitHub

**⚠️ IMPORTANTE**: No compartas la contraseña con personas no autorizadas.

---

## 📚 Recursos Adicionales

- [Documentación de GitHub Pages](https://docs.github.com/es/pages)
- [Guía de Git](https://git-scm.com/book/es/v2)
- [GitHub Desktop](https://desktop.github.com/)

---

## ✅ Checklist de Configuración

Usa esta lista para verificar que todo esté configurado correctamente:

- [ ] Cuenta de GitHub creada
- [ ] Git o GitHub Desktop instalado
- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos al repositorio
- [ ] GitHub Pages configurado
- [ ] Sitio web accesible en línea
- [ ] Dashboard funcional
- [ ] Sistema de avisos funcionando
- [ ] Imágenes cargando correctamente
- [ ] Contraseña cambiada (opcional pero recomendado)

---

**¡Felicidades! 🎉** Tu sitio web está configurado y listo para usar.

