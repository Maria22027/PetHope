# 📱 Guia de Build - Mobile PetHope (Android)

## 🎯 Objetivo
Gerar um arquivo APK para distribuição do aplicativo PetHope Mobile.

---

## 📋 Pré-requisitos

### 1. Node.js instalado
Verificar versão:
```bash
node --version
```
Deve ser v18 ou superior.

### 2. Conta Expo
- Criar conta em: https://expo.dev/signup
- Grátis e necessário para usar EAS Build

---

## 🚀 Passo a Passo

### **Passo 1: Instalar dependências**
```bash
cd Mobile-PetHope
npm install
```

### **Passo 2: Instalar EAS CLI**
```bash
npm install -g eas-cli
```

### **Passo 3: Login no Expo**
```bash
eas login
```
Digite suas credenciais da conta Expo.

### **Passo 4: Configurar projeto (primeira vez)**
```bash
eas build:configure
```
Isso criará/atualizará o arquivo `eas.json`.

### **Passo 5: Gerar APK**

#### Opção A - Build de Preview (Recomendado para teste)
```bash
eas build -p android --profile preview
```

#### Opção B - Build de Produção
```bash
eas build -p android --profile production
```

### **Passo 6: Aguardar build**
O build acontece na nuvem da Expo. Pode levar 10-20 minutos.

Você verá algo assim:
```
✔ Build started, it may take a few minutes to complete.
  You can monitor the build at: https://expo.dev/accounts/...
```

### **Passo 7: Download do APK**
Após o build, você receberá um link. Clique para baixar o APK.

Ou use:
```bash
eas build:list
```
Para ver os builds anteriores e baixar.

---

## 📦 Alternativa: Build Local (Mais Complexo)

Se você tiver **Android Studio** instalado:

### 1. Gerar arquivos nativos:
```bash
npx expo prebuild --clean
```

### 2. Build local:
```bash
cd android
gradlew.bat assembleRelease
```

### 3. APK estará em:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📤 Depois do Build

### 1. Renomear APK
```bash
mv app-release.apk pethope.apk
```

### 2. Copiar para pasta de downloads do Web
```bash
copy pethope.apk ..\Web_PetHope\downloads\
```

### 3. Testar no Android
- Transferir APK para celular
- Habilitar "Instalar apps desconhecidos"
- Instalar e testar

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] Conta Expo criada
- [ ] EAS CLI instalado
- [ ] Login realizado
- [ ] Build iniciado
- [ ] APK baixado
- [ ] APK testado no celular
- [ ] APK copiado para Web_PetHope/downloads/

---

## 🐛 Troubleshooting

### Erro: "Expo account not configured"
```bash
eas logout
eas login
```

### Erro: "Build failed"
- Verificar logs no link do build
- Verificar se todas as dependências estão corretas
- Tentar limpar cache: `npm clean-install`

### APK muito grande
- Usar build profile "preview" em vez de "production"
- Verificar se não há assets desnecessários

---

## 📊 Informações do Build

- **Nome do App**: PetHope
- **Package**: com.pethope.app
- **Versão**: 1.0.0
- **API URL**: https://pethope-aw8q.onrender.com

---

## 🔗 Links Úteis

- **Expo Dashboard**: https://expo.dev
- **Documentação EAS Build**: https://docs.expo.dev/build/introduction/
- **Troubleshooting**: https://docs.expo.dev/build-reference/troubleshooting/
