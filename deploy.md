# Deploy PetHope

Guia único para build e publicação do PetHope: API, Desktop (Electron), Mobile (Expo) e Web (Netlify). Comandos e exemplos estão em PowerShell para Windows.

---

## Visão Geral
- API (Node/Express): `pethope-api` — produção atual: `https://pethope-aw8q.onrender.com`.
- Desktop (Electron): `Desktop-PetHope` — gera instalador `.exe` (NSIS) em `dist/`.
- Mobile (Expo/Android): `Mobile-PetHope` — builds via EAS (APK).
- Web (Estático/Netlify): `Web_PetHope` — HTML/JS/CSS estático.

---

## Pré‑requisitos
- Node.js 18+ e Git instalados.
- Conta Expo (gratuita) para EAS Build.
- Opcional: Conta Netlify para o site estático e Render (ou similar) para a API.

---

## API (pethope-api)
Pasta: `pethope-api`

### Rodar local
```powershell
Push-Location .\pethope-api
npm install
$env:PORT="3000"; $env:JWT_SECRET="dev-secret"; $env:MONGODB_URI="mongodb://localhost:27017/pethope"; node server.js
Pop-Location
```

### Produção (Render.com – sugestão rápida)
1) Crie um Web Service e conecte este repositório (subpasta `pethope-api`).
2) Build Command: `npm install`  | Start Command: `node server.js`
3) Defina env vars: `PORT` (ex: 10000), `JWT_SECRET`, `MONGODB_URI`.
4) Deploy e teste `/users`.

Observação: a URL de produção usada pelos apps é `https://pethope-aw8q.onrender.com` (ajuste nos apps se mudar).

---

## Desktop (Electron)
Pasta: `Desktop-PetHope`

### Build Windows (.exe)
```powershell
Push-Location .\Desktop-PetHope
npm install
# Opcional: definir API manualmente; caso omita, usa produção
$env:API_URL="https://pethope-aw8q.onrender.com"
npm run build-win
Pop-Location
```

Saída: `Desktop-PetHope\dist\PetHope Setup 1.0.0.exe` (nome pode variar por versão).

### Publicar o instalador no site (opcional)
```powershell
Copy-Item .\Desktop-PetHope\dist\*.exe .\Web_PetHope\downloads\PetHope-Setup.exe -Force
```

### Dicas e problemas comuns
- Execute o PowerShell “Como Administrador” se tiver erro de permissão.
- Antivirus pode atrapalhar a criação do instalador; desative temporariamente.
- Ícone: coloque `assets/icon.ico` (256x256) e gere novamente.

---

## Mobile (Expo EAS – Android)
Pasta: `Mobile-PetHope`

### Build APK (preview/produção)
```powershell
Push-Location .\Mobile-PetHope
npm install
npm install -g eas-cli
eas login
eas build:configure
# Preview (para testes internos – gera APK)
eas build -p android --profile preview
# Produção (também APK neste projeto)
# eas build -p android --profile production
Pop-Location
```

Após iniciar, acompanhe o link exibido no terminal e baixe o `.apk` ao finalizar. Renomeie se quiser e publique, por exemplo, no site:

```powershell
Copy-Item "C:\caminho\para\download\pethope.apk" .\Web_PetHope\downloads\pethope.apk -Force
```

### Configurações importantes
- `Mobile-PetHope/constants/api.js` alterna automaticamente para produção fora do ambiente web dev.
- Versões: ajuste `app.json` (`version` e `android.versionCode`) quando lançar releases.

---

## Web (Netlify – estático)
Pasta: `Web_PetHope`

### Publicar rapidamente (Dashboard)
1) Crie um site no Netlify e conecte este repositório (subpasta `Web_PetHope`).
2) Build não é necessário (site estático). Deploy direto da pasta.
3) Arquivos úteis já presentes: `netlify.toml` e `_redirects`.

### Publicar via CLI (opcional)
```powershell
npm install -g netlify-cli
Push-Location .\Web_PetHope
netlify init
netlify deploy --prod --dir .
Pop-Location
```

---

## URLs da API nos apps
- Desktop: `Desktop-PetHope/src/main.js` usa `process.env.API_URL` e, se ausente, `https://pethope-aw8q.onrender.com`.
- Mobile: `Mobile-PetHope/constants/api.js` usa produção automaticamente fora do web dev.

Se mudar a API de produção, atualize estas referências.

---

## Checklists
### Desktop
- [ ] Node 18+, dependências instaladas
- [ ] Build gerado (`npm run build-win`)
- [ ] Instalador testado
- [ ] Instalador publicado (opcional)

### Mobile
- [ ] EAS CLI logado e configurado
- [ ] Build iniciado (preview/production)
- [ ] APK baixado e testado
- [ ] APK publicado (opcional)

### API
- [ ] Variáveis de ambiente configuradas (PORT, JWT_SECRET, MONGODB_URI)
- [ ] Instância em produção respondendo
- [ ] URL conferida nos apps

### Web
- [ ] Site conectado ao repo (ou deploy via CLI)
- [ ] Downloads atualizados (instalador/APK, se usados)

---

## Troubleshooting rápido
- Electron builder ausente: `npm install --save-dev electron-builder`
- EAS sem autenticação: `eas logout; eas login`
- Erro de conexão à API: confirme disponibilidade da URL e variáveis de ambiente

---

## Automação (opcional)
Podemos adicionar pipelines (GitHub Actions) para:
- Build do Electron em releases.
- EAS Build automatizado (Preview/Production) em tags.
- Deploy do Web para Netlify.

Peça que eu configure e comite os workflows quando desejar.