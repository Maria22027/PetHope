# Script de Build Automatizado - PetHope Desktop
# Executar: .\build-desktop.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PetHope Desktop - Build Script      " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na pasta Desktop-PetHope" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Passo 1: Instalando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
Write-Host ""

Write-Host "🔨 Passo 2: Gerando instalador Windows..." -ForegroundColor Yellow
npm run build-win

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar instalador" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Instalador gerado!" -ForegroundColor Green
Write-Host ""

# Verificar se instalador foi criado
$installer = Get-ChildItem -Path "dist" -Filter "*.exe" | Select-Object -First 1

if ($installer) {
    Write-Host "📍 Instalador criado em:" -ForegroundColor Cyan
    Write-Host "   $($installer.FullName)" -ForegroundColor White
    Write-Host "   Tamanho: $([math]::Round($installer.Length / 1MB, 2)) MB" -ForegroundColor White
    Write-Host ""
    
    # Perguntar se quer copiar para pasta de downloads
    $copy = Read-Host "Copiar para Web_PetHope/downloads? (S/N)"
    
    if ($copy -eq "S" -or $copy -eq "s") {
        $destPath = "..\Web_PetHope\downloads"
        
        if (-not (Test-Path $destPath)) {
            New-Item -ItemType Directory -Path $destPath -Force | Out-Null
        }
        
        Copy-Item $installer.FullName -Destination "$destPath\PetHope-Setup.exe" -Force
        Write-Host "✅ Instalador copiado para Web_PetHope/downloads/PetHope-Setup.exe" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Instalador não encontrado em dist/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "         Build concluído! ✨            " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
