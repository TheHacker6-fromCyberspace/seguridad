# 📋 Dashboard Administrativo - Instrucciones de Uso

## 🚀 Acceso al Dashboard

Para acceder al panel administrativo, abre el archivo:
```
admin.html
```

O visita: `http://tu-sitio.com/admin.html`

## 📚 Funcionalidades

El dashboard te permite gestionar el contenido de las siguientes secciones:

1. **📚 Biblioteca** - Galería de fotos de la biblioteca
2. **🍽️ Comedor** - Imágenes del comedor escolar
3. **📢 Promociones** - Avisos y promociones escolares
4. **📋 Avisos** - Avisos importantes

## ✨ Cómo Usar

### Añadir una Nueva Imagen

1. Selecciona la sección en el menú lateral (Biblioteca, Comedor, Promociones, o Avisos)
2. Haz clic en el botón **"➕ Añadir Imagen"**
3. Selecciona la imagen desde tu computadora
4. (Opcional) Añade un título y descripción
5. Haz clic en **"Guardar Imagen"**
6. **IMPORTANTE**: Copia manualmente el archivo de imagen a la carpeta correspondiente:
   - Biblioteca: `galeriabiblioteca/`
   - Comedor: `galeriacomedor/`
   - Promociones: `galeriadepromociones/`
   - Avisos: `Avisos/`

### Eliminar una Imagen

1. Busca la imagen que deseas eliminar en la galería
2. Haz clic en el icono de papelera 🗑️
3. Confirma la eliminación
4. **IMPORTANTE**: Elimina manualmente el archivo de la carpeta correspondiente

## 📁 Estructura de Carpetas

```
PCB_System2-main/
├── admin.html              # Panel administrativo
├── admin.css               # Estilos del dashboard
├── admin.js                # Lógica del dashboard
├── galeriabiblioteca/      # Imágenes de biblioteca
├── galeriacomedor/         # Imágenes de comedor
├── galeriadepromociones/   # Imágenes de promociones
└── Avisos/                 # Avisos importantes
```

## 💾 Almacenamiento de Datos

El dashboard utiliza **localStorage** del navegador para guardar la información de las imágenes (títulos, descripciones, etc.). Los datos se mantienen incluso después de cerrar el navegador.

**Nota**: Los archivos de imagen deben copiarse manualmente a las carpetas correspondientes.

## 🔒 Seguridad

Este es un dashboard básico para uso local. Para un entorno de producción, se recomienda:

1. Añadir autenticación (usuario y contraseña)
2. Implementar un backend para gestión de archivos
3. Usar una base de datos para almacenar la información

## 🆘 Solución de Problemas

### Las imágenes no aparecen en el sitio web
- Verifica que hayas copiado el archivo a la carpeta correcta
- Asegúrate de que el nombre del archivo coincida exactamente

### Se perdieron los datos
- Los datos se guardan en localStorage del navegador
- Si limpias el caché del navegador, se perderán los datos
- Considera hacer respaldos periódicos

## 📞 Soporte

Para más ayuda, contacta al administrador del sistema.

