# 💻 Guia de Build - Desktop PetHope (Windows)

## 🎯 Objetivo
Gerar um instalador executável (.exe) para Windows do PetHope Desktop.

---

## 📋 Pré-requisitos

### 1. Node.js instalado
Verificar versão:
```powershell
node --version
```
Deve ser v18 ou superior.

### 2. Git instalado (opcional, mas recomendado)
```powershell
git --version
```

---

## 🚀 Passo a Passo

### **Passo 1: Navegar para pasta**
```powershell
cd Desktop-PetHope
```

### **Passo 2: Instalar dependências**
```powershell
npm install
```

Isso instalará o Electron e o electron-builder automaticamente.

### **Passo 3: Verificar configuração**
O arquivo `package.json` já está configurado com:
- Scripts de build
- Configuração do electron-builder
- Informações do app

### **Passo 4: Gerar instalador Windows**
```powershell
npm run build-win
```

### **Passo 5: Aguardar build**
O processo pode levar 3-5 minutos. Você verá mensagens assim:
```
• electron-builder  version=24.13.3
• loaded configuration  file=package.json
• packaging       platform=win32 arch=x64
• building        target=nsis file=dist\PetHope Setup 1.0.0.exe
```

### **Passo 6: Localizar instalador**
O instalador estará em:
```
Desktop-PetHope/dist/PetHope Setup 1.0.0.exe
```

---

## 📦 Outros Builds (Opcional)

### Build Linux (AppImage)
```powershell
npm run build-linux
```

### Build macOS (DMG)
```powershell
npm run build-mac
```
⚠️ Só funciona em macOS!

---

## 📤 Depois do Build

### 1. Renomear instalador (opcional)
```powershell
cd dist
ren "PetHope Setup 1.0.0.exe" "PetHope-Setup.exe"
```

### 2. Copiar para pasta de downloads do Web
```powershell
copy "PetHope Setup 1.0.0.exe" ..\Web_PetHope\downloads\PetHope-Setup.exe
```

### 3. Testar instalador
- Execute o instalador
- Escolha pasta de instalação
- Complete a instalação
- Execute o PetHope
- Teste login e funcionalidades

---

## 🎨 Personalização (Opcional)

### Adicionar ícone customizado
1. Criar arquivo `icon.ico` (256x256 pixels)
2. Salvar em `Desktop-PetHope/assets/icon.ico`
3. Build já está configurado para usar

### Alterar nome do instalador
No `package.json`, alterar:
```json
"build": {
  "productName": "Seu Nome Aqui"
}
```

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Build executado (`npm run build-win`)
- [ ] Instalador gerado em `dist/`
- [ ] Instalador testado
- [ ] Instalador copiado para Web_PetHope/downloads/

---

## 🐛 Troubleshooting

### Erro: "electron-builder não encontrado"
```powershell
npm install --save-dev electron-builder
npm run build-win
```

### Erro: "Cannot create file"
- Execute PowerShell como Administrador
- Desative antivírus temporariamente

### Build muito lento
- Normal na primeira vez (baixa dependências)
- Próximos builds serão mais rápidos

### Erro: "ENOENT: no such file or directory"
- Verificar se está na pasta correta (`Desktop-PetHope`)
- Verificar se `package.json` existe

---

## 📊 Informações do Build

- **Nome do App**: PetHope
- **App ID**: com.pethope.desktop
- **Versão**: 1.0.0
- **Plataforma**: Windows (x64)
- **Instalador**: NSIS (permite escolher pasta)
- **API URL**: https://pethope-aw8q.onrender.com

---

## 📁 Estrutura após Build

```
Desktop-PetHope/
├── dist/
│   ├── PetHope Setup 1.0.0.exe    ← Instalador principal
│   ├── win-unpacked/               ← Versão descompactada
│   └── builder-*.yml               ← Metadados
├── src/
├── public/
└── package.json
```

---

## 🔧 Tamanho do Instalador

Tamanho esperado: **80-150 MB**

O tamanho é normal porque inclui:
- Runtime do Electron (Chromium + Node.js)
- Aplicação
- Dependências

---

## 🔗 Links Úteis

- **Electron Builder**: https://www.electron.build/
- **Documentação**: https://www.electron.build/configuration/configuration
- **Ícones**: https://www.electron.build/icons
