$css = Get-Content styles.css -Raw -Encoding UTF8

# Reemplazar body.dark-mode con nueva paleta
$css = $css -replace 'body\.dark-mode \{[^}]*--primary: #4a90e2;[^}]*\}', @'
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

# Agregar fix para hero images
$heroFix = @'


/* === FIX HERO IMAGES DARK MODE === */
body.dark-mode .hero img {
  opacity: 0.9;
  filter: brightness(0.95) contrast(1.1);
  transition: all 0.3s ease;
}

body.dark-mode .hero img:hover {
  opacity: 1;
  filter: brightness(1) contrast(1.15);
}
'@

$css = $css + $heroFix

[System.IO.File]::WriteAllText("$PWD\styles.css", $css, [System.Text.Encoding]::UTF8)
Write-Host "✓ Dark mode aplicado!" -ForegroundColor Green
