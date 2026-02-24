# 🌙 Instrucciones para Aplicar las Mejoras de Dark Mode

## ✅ Estado Actual

El archivo **`dark-mode-fix.css`** ya está creado y contiene todas las mejoras del modo oscuro con:
- ✨ Paleta futurista (azul cyan #38BDF8 + púrpura #A855F7)
- 🎨 Mejoras visuales para header, cards, botones, inputs
- 🖼️ Fix para imágenes hero en dark mode
- 🔧 Estilos para sidebar, AI assistant, y más

## 📋 Pasos para Aplicar las Mejoras

### Opción 1: Importar en TODOS los archivos HTML (Recomendado)

Agrega esta línea en el `<head>` de cada archivo HTML, **DESPUÉS** de `styles.css`:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="dark-mode-fix.css">  <!-- ⬅️ AGREGAR ESTA LÍNEA -->
```

### Archivos HTML que necesitan la importación:

- ✅ `index.html`
- ✅ `admin.html`
- ✅ `asistente.html`
- ✅ `biblioteca.html`
- ✅ `bibliotecaCentroRecursos.html`
- ✅ `certificaciones-padres.html`
- ✅ `comedor.html`
- ✅ `correos-maestros-tabla.html`
- ✅ `educacion-comunitaria.html`
- ✅ `enfermeria.html`
- ✅ `evidencia.html`
- ✅ `laboratorio.html`
- ✅ `login.html`
- ✅ `matricula.html`
- ✅ `normas-reglamentos.html`
- ✅ `orientacion.html`
- ✅ `otros-apoyos.html`
- ✅ `padres.html`
- ✅ `participacion-comunitaria.html`
- ✅ `promociones.html`
- ✅ `quienes-somos.html`
- ✅ `seguimiento-estudiante.html`
- ✅ `seguridad.html`
- ✅ `servicios-tecnicos.html`
- ✅ `solicitudes.html`
- ✅ `talleres-padres.html`
- ✅ `transportacion.html`

### Opción 2: Copiar estilos directamente a styles.css

Si prefieres tener todo en un solo archivo:

1. Abre `dark-mode-fix.css`
2. Copia TODO el contenido
3. Pégalo al **FINAL** de `styles.css`

## 🧪 Verificar que Funciona

1. Abre cualquier página HTML en el navegador
2. Activa el modo oscuro usando el botón 🌙
3. Verifica que:
   - ✅ Los colores sean azul cyan y púrpura (no azul antiguo)
   - ✅ Las imágenes hero se vean bien (no muy oscuras)
   - ✅ Los botones tengan efecto glow
   - ✅ El header tenga backdrop blur
   - ✅ Los inputs tengan borde cyan al hacer focus

## 🎨 Paleta de Colores Dark Mode

- **Primary**: #38BDF8 (Cyan brillante)
- **Accent**: #A855F7 (Púrpura IA)
- **Background**: #0B1220 (Dark tech)
- **Cards**: #111827 (Gris oscuro)
- **Text**: #E5E7EB (Gris claro - WCAG AAA)

## 🔧 Solución de Problemas

**Problema**: Los estilos no se aplican
- ✅ Verifica que `dark-mode-fix.css` esté en la misma carpeta que `styles.css`
- ✅ Verifica que la línea de importación esté DESPUÉS de `styles.css`
- ✅ Limpia la caché del navegador (Ctrl + Shift + R)

**Problema**: Algunos elementos no se ven bien
- ✅ Verifica que el elemento tenga la clase `dark-mode` en el body
- ✅ Revisa la consola del navegador por errores

## 📝 Notas

- El archivo `fix-darkmode.ps1` fue un intento de automatización que falló por problemas de encoding
- El archivo `dark-mode-fix.css` es la solución standalone que funciona perfectamente
- NO es necesario ejecutar ningún script PowerShell

