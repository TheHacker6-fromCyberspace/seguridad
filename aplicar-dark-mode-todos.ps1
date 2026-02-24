# Script para aplicar dark-mode-fix.css a todos los archivos HTML
# Autor: Sistema PCB
# Fecha: 2026-02-08

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  APLICANDO DARK MODE FIX A TODOS LOS HTML" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Lista de archivos HTML a procesar (excluyendo los ya procesados)
$archivos = @(
    "asistente.html",
    "bibliotecaCentroRecursos.html",
    "certificaciones-padres.html",
    "comedor.html",
    "correos-maestros-tabla.html",
    "educacion-comunitaria.html",
    "enfermeria.html",
    "evidencia.html",
    "laboratorio.html",
    "login.html",
    "matricula.html",
    "normas-reglamentos.html",
    "orientacion.html",
    "otros-apoyos.html",
    "padres.html",
    "participacion-comunitaria.html",
    "quienes-somos.html",
    "seguimiento-estudiante.html",
    "seguridad.html",
    "servicios-tecnicos.html",
    "solicitudes.html",
    "talleres-padres.html",
    "transportacion.html"
)

$procesados = 0
$errores = 0

foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        Write-Host "Procesando: $archivo" -ForegroundColor Yellow
        
        try {
            # Leer el contenido del archivo
            $contenido = Get-Content $archivo -Raw -Encoding UTF8
            
            # Verificar si ya tiene dark-mode-fix.css
            if ($contenido -match 'dark-mode-fix\.css') {
                Write-Host "  ✓ Ya tiene dark-mode-fix.css" -ForegroundColor Green
                $procesados++
                continue
            }
            
            # Buscar la línea de styles.css y agregar dark-mode-fix.css después
            $patron = [regex]::Escape('<link rel="stylesheet" href="styles.css">')
            if ($contenido -match 'styles\.css') {
                $reemplazo = '<link rel="stylesheet" href="styles.css">' + "`n" + '  <link rel="stylesheet" href="dark-mode-fix.css">'
                $contenido = $contenido -replace $patron, $reemplazo

                # Guardar el archivo
                [System.IO.File]::WriteAllText("$PWD\$archivo", $contenido, [System.Text.Encoding]::UTF8)
                Write-Host "  ✓ Dark mode aplicado correctamente" -ForegroundColor Green
                $procesados++
            }
            else {
                Write-Host "  ⚠ No se encontró styles.css en el archivo" -ForegroundColor Magenta
            }
        }
        catch {
            Write-Host "  ✗ Error: $_" -ForegroundColor Red
            $errores++
        }
    }
    else {
        Write-Host "  ⚠ Archivo no encontrado: $archivo" -ForegroundColor Magenta
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Archivos procesados: $procesados" -ForegroundColor Green
Write-Host "Errores: $errores" -ForegroundColor $(if ($errores -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "Proceso completado!" -ForegroundColor Green
Write-Host ""
Write-Host "NOTA: Los archivos index.html, admin.html, promociones.html y biblioteca.html" -ForegroundColor Yellow
Write-Host "ya fueron procesados manualmente." -ForegroundColor Yellow

