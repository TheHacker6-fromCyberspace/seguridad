# Script para aplicar mejoras de Dark Mode al archivo styles.css
# Ejecutar desde: PowerShell en la carpeta PCB_System2-main

Write-Host "=== Aplicando Mejoras de Dark Mode Futurista ===" -ForegroundColor Cyan

# 1. Crear backup
Write-Host "`n[1/3] Creando backup..." -ForegroundColor Yellow
Copy-Item styles.css styles.css.backup -Force
Write-Host "✓ Backup creado: styles.css.backup" -ForegroundColor Green

# 2. Leer contenido actual
Write-Host "`n[2/3] Leyendo styles.css..." -ForegroundColor Yellow
$content = Get-Content styles.css -Raw -Encoding UTF8

# 3. Aplicar cambios

# Paso 1: Actualizar variables :root
Write-Host "`n[3/3] Aplicando cambios..." -ForegroundColor Yellow
Write-Host "  - Actualizando variables :root..." -ForegroundColor Gray

$oldRoot = @'
:root {
  --primary: #1d3557;
  /* Azul institucional */
  --primary-light: #457b9d;
  /* Azul claro */
  --accent: #f2c94c;
  /* Dorado suave */
  --bg: #f5f7fb;
  /* Fondo general */
  --bg-alt: #ffffff;
  /* Fondo alterno */
  --text-main: #34495e;
  /* Texto principal */
  --text-soft: #7f8c8d;
  /* Texto secundario */
  --border-soft: #dde3ee;
  /* Bordes suaves */
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
'@

$newRoot = @'
:root {
  --primary: #1d3557;
  --primary-light: #457b9d;
  --accent: #f2c94c;
  --bg: #f5f7fb;
  --bg-alt: #ffffff;
  --text-main: #34495e;
  --text-soft: #7f8c8d;
  --border-soft: #dde3ee;
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --card: #ffffff;
  --border: #dde3ee;
  --accent-pink: #f093fb;
  --accent-cyan: #4facfe;
  --success: #22C55E;
  --warning: #FACC15;
  --danger: #EF4444;
}
'@

$content = $content -replace [regex]::Escape($oldRoot), $newRoot

# Paso 2: Reemplazar body.dark-mode
Write-Host "  - Actualizando paleta dark mode..." -ForegroundColor Gray

$oldDarkMode = @'
body.dark-mode {
  --primary: #4a90e2;
  /* Azul más claro para modo oscuro */
  --primary-light: #64a8f5;
  /* Azul aún más claro */
  --accent: #ffc107;
  /* Dorado/amarillo */
  --bg: #1e1e1e;
  /* Fondo oscuro principal (gris oscuro común) */
  --bg-alt: #2d2d2d;
  /* Fondo alterno oscuro (gris medio) */
  --text-main: #e0e0e0;
  /* Texto claro */
  --text-soft: #b0b0b0;
  /* Texto secundario claro */
  --border-soft: #404040;
  /* Bordes oscuros */
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
'@

$newDarkMode = @'
body.dark-mode {
  --primary: #38BDF8;
  --primary-light: #0EA5E9;
  --accent: #A855F7;
  --bg: #0B1220;
  --bg-alt: #0F172A;
  --card: #111827;
  --text-main: #E5E7EB;
  --text-soft: #9CA3AF;
  --border-soft: #1F2933;
  --border: #1F2933;
  --gradient-1: linear-gradient(135deg, #38BDF8 0%, #A855F7 100%);
  --gradient-2: linear-gradient(135deg, #A855F7 0%, #EF4444 100%);
  --gradient-3: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
  --accent-pink: #A855F7;
  --accent-cyan: #38BDF8;
  --success: #22C55E;
  --warning: #FACC15;
  --danger: #EF4444;
}
'@

$content = $content -replace [regex]::Escape($oldDarkMode), $newDarkMode

# Paso 3: Agregar estilos adicionales al final del archivo
Write-Host "  - Agregando estilos mejorados..." -ForegroundColor Gray

$additionalStyles = Get-Content dark-mode-improvements.css -Raw -Encoding UTF8
# Extraer solo la sección de estilos específicos (después de PASO 3)
$additionalStyles = $additionalStyles -replace '(?s)^.*?/\* PASO 3:.*?\*/', ''
$additionalStyles = $additionalStyles -replace '(?s)/\* =========================================\s+FIN DE MEJORAS DARK MODE.*', ''

# Agregar al final
$content = $content + "`n`n" + $additionalStyles

# 4. Guardar archivo
Write-Host "  - Guardando cambios..." -ForegroundColor Gray
[System.IO.File]::WriteAllText("$PWD\styles.css", $content, [System.Text.Encoding]::UTF8)

Write-Host "`n✓ Mejoras aplicadas exitosamente!" -ForegroundColor Green
Write-Host "`nCambios realizados:" -ForegroundColor Cyan
Write-Host "  1. Variables CSS unificadas (:root)" -ForegroundColor White
Write-Host "  2. Paleta Dark Tech Futurista (#0B1220, #38BDF8, #A855F7)" -ForegroundColor White
Write-Host "  3. Hero section - imágenes visibles en dark mode" -ForegroundColor White
Write-Host "  4. Contraste WCAG AAA (#E5E7EB sobre #0B1220)" -ForegroundColor White
Write-Host "  5. Botones, cards, inputs mejorados" -ForegroundColor White
Write-Host "  6. AI Assistant con glow futurista" -ForegroundColor White
Write-Host "`nBackup disponible en: styles.css.backup" -ForegroundColor Yellow
Write-Host "`n¡Recarga el navegador para ver los cambios!" -ForegroundColor Cyan
