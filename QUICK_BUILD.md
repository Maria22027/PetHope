# 🚀 Comandos Rápidos - PetHope Build

## 📱 MOBILE (Android APK)

### Preparar ambiente:
```bash
cd Mobile-PetHope
npm install
npm install -g eas-cli
```

### Login Expo:
```bash
eas login
```

### Gerar APK:
```bash
# Build de teste/preview
eas build -p android --profile preview

# OU Build de produção
eas build -p android --profile production
```

### Após o build:
1. Aguardar conclusão (10-20 min)
2. Baixar APK pelo link fornecido
3. Renomear para `pethope.apk`
4. Copiar para `Web_PetHope/downloads/`

---

## 💻 DESKTOP (Windows EXE)

### Preparar ambiente:
```powershell
cd Desktop-PetHope
npm install
```

### Gerar instalador:
```powershell
npm run build-win
```

### OU usar script automatizado:
```powershell
.\build-desktop.ps1
```

### Após o build:
1. Localizar em `dist/PetHope Setup 1.0.0.exe`
2. Copiar para `Web_PetHope/downloads/PetHope-Setup.exe`

---

## 📤 Finalizar Deploy

### 1. Commit dos arquivos de build
```bash
git add Mobile-PetHope/eas.json Mobile-PetHope/app.json Desktop-PetHope/package.json
git commit -m "Configure build settings for mobile and desktop"
git push
```

### 2. Upload dos instaladores no Web
```bash
# Copiar APK
copy Mobile-PetHope\pethope.apk Web_PetHope\downloads\

# Copiar EXE
copy Desktop-PetHope\dist\*.exe Web_PetHope\downloads\PetHope-Setup.exe
```

### 3. Commit e deploy do Web
```bash
cd Web_PetHope
git add downloads/
git commit -m "Add mobile and desktop installers"
git push
```

Se usar Netlify via GitHub, o deploy será automático!

---

## ✅ Checklist Final

- [ ] API no ar (https://pethope-aw8q.onrender.com)
- [ ] Web no ar (Netlify)
- [ ] APK gerado e testado
- [ ] EXE gerado e testado
- [ ] Downloads disponíveis no site
- [ ] Tudo commitado no GitHub

---

## 🎯 Resumo de URLs

- **API**: https://pethope-aw8q.onrender.com
- **Web**: [Sua URL do Netlify]
- **GitHub**: https://github.com/Maria22027/PetHope

---

## 📞 Próximos Passos

1. **Testar tudo end-to-end**
2. **Divulgar o site**
3. **Coletar feedback**
4. **Melhorias futuras**:
   - Publicar na Google Play Store
   - Versão iOS
   - Notificações push
   - Chat em tempo real
