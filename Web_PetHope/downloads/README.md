# Downloads PetHope

Esta pasta contém os instaladores dos aplicativos PetHope.

## Arquivos Disponíveis

### ✅ PetHope-Setup.exe (Desktop)
- **Tamanho**: ~71 MB
- **Plataforma**: Windows 10/11 (x64)
- **Descrição**: Instalador completo do aplicativo desktop para ONGs e clínicas veterinárias
- **Status**: ✅ Disponível

### 📱 pethope.apk (Mobile)
- **Plataforma**: Android
- **Descrição**: Aplicativo mobile para tutores e adotantes
- **Status**: ⏳ Baixe manualmente do Expo

## Como Adicionar o APK do Mobile

1. Acesse o link do build: https://expo.dev/accounts/wolski/projects/pethope/builds/2af5b255-63a8-4615-b1a4-6efaaaf3d0d0
2. Clique em "Download" para baixar o APK
3. Salve o arquivo como `pethope.apk` nesta pasta
4. O botão de download no site funcionará automaticamente

## Fallback Automático

A página de download está configurada para:
- **Mobile**: Se o APK não estiver disponível localmente, redireciona para o build do Expo
- **Desktop**: Se o EXE não estiver disponível, exibe mensagem de erro

## Comandos Úteis

### PowerShell - Copiar APK após download
```powershell
Copy-Item "C:\caminho\para\download\app.apk" ".\Web_PetHope\downloads\pethope.apk" -Force
```

### Verificar arquivos
```powershell
Get-ChildItem .\Web_PetHope\downloads\ | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```
