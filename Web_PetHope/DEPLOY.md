# 🚀 Deploy Web PetHope - Netlify

## Método 1: Deploy via GitHub (Recomendado)

1. Acesse: https://app.netlify.com/
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte com GitHub e selecione o repositório **PetHope**
4. Configure:
   - **Branch to deploy**: `main`
   - **Base directory**: `Web_PetHope`
   - **Build command**: (deixe vazio)
   - **Publish directory**: `.` (ou deixe vazio)
5. Clique em **"Deploy site"**

## Método 2: Deploy Manual (Arraste e Solte)

1. Acesse: https://app.netlify.com/drop
2. Arraste a pasta `Web_PetHope` inteira
3. Pronto! Site no ar em segundos.

## ✅ O que já está configurado:

- ✅ URLs da API atualizadas para produção
- ✅ Arquivo `netlify.toml` com redirects
- ✅ Pasta `downloads/` criada (para APK e EXE)
- ✅ Funções de download prontas

## 📦 Próximos Passos:

Após o deploy do Web, você precisará:

1. **Gerar APK do Mobile**:
   ```bash
   cd Mobile-PetHope
   eas build -p android --profile preview
   ```
   
2. **Gerar EXE do Desktop**:
   ```bash
   cd Desktop-PetHope
   npm run build-win
   ```

3. **Upload dos instaladores**:
   - Fazer upload do APK e EXE na pasta `downloads/` do site
   - Ou usar Netlify Large Media / CDN externo

## 🌐 Sua URL ficará assim:

`https://seu-site-nome.netlify.app`

Você pode personalizar o domínio depois em **Site settings** → **Domain management**

## 🔧 Verificar depois do deploy:

- [ ] Site carregando corretamente
- [ ] Animais sendo listados (verificar console se houver erro)
- [ ] Campanhas funcionando
- [ ] Links de navegação funcionando
- [ ] Página de download acessível
