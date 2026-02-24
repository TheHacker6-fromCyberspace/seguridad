# Script para subir el proyecto a GitHub
# Ejecuta este script en PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Subir Proyecto a GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    git --version | Out-Null
    Write-Host "✅ Git está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Git desde: https://git-scm.com/downloads" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Antes de continuar, asegúrate de haber:" -ForegroundColor Yellow
Write-Host "1. Creado un repositorio en GitHub" -ForegroundColor Yellow
Write-Host "2. Copiado la URL del repositorio" -ForegroundColor Yellow
Write-Host ""

# Pedir la URL del repositorio
$repoURL = Read-Host "Ingresa la URL de tu repositorio de GitHub (ej: https://github.com/usuario/repo.git)"

if ([string]::IsNullOrWhiteSpace($repoURL)) {
    Write-Host "❌ No ingresaste una URL válida" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Configurando Git..." -ForegroundColor Cyan

# Inicializar Git si no está inicializado
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Repositorio Git inicializado" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Repositorio Git ya existe" -ForegroundColor Blue
}

# Agregar todos los archivos
Write-Host ""
Write-Host "Agregando archivos..." -ForegroundColor Cyan
git add .
Write-Host "✅ Archivos agregados" -ForegroundColor Green

# Hacer commit
Write-Host ""
Write-Host "Creando commit..." -ForegroundColor Cyan
git commit -m "Subida inicial del sitio web PCB"
Write-Host "✅ Commit creado" -ForegroundColor Green

# Configurar rama principal
Write-Host ""
Write-Host "Configurando rama principal..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Rama configurada" -ForegroundColor Green

# Agregar remote
Write-Host ""
Write-Host "Conectando con GitHub..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $repoURL
Write-Host "✅ Conectado con GitHub" -ForegroundColor Green

# Subir archivos
Write-Host ""
Write-Host "Subiendo archivos a GitHub..." -ForegroundColor Cyan
Write-Host "(Esto puede tardar unos minutos dependiendo del tamaño)" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ ¡ÉXITO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu proyecto ha sido subido a GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Ve a tu repositorio en GitHub" -ForegroundColor White
    Write-Host "2. Haz clic en 'Settings' → 'Pages'" -ForegroundColor White
    Write-Host "3. En 'Source', selecciona 'main' y '/ (root)'" -ForegroundColor White
    Write-Host "4. Haz clic en 'Save'" -ForegroundColor White
    Write-Host "5. Espera 1-2 minutos y tu sitio estará en línea" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Hubo un error al subir los archivos" -ForegroundColor Red
    Write-Host "Verifica que:" -ForegroundColor Yellow
    Write-Host "- La URL del repositorio sea correcta" -ForegroundColor Yellow
    Write-Host "- Tengas permisos para subir al repositorio" -ForegroundColor Yellow
    Write-Host "- Hayas iniciado sesión en Git" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
pause

