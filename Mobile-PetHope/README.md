# 🐾 PetHope Mobile

> Aplicação mobile multiplataforma para adoção e doação de sangue de pets

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 📋 Sobre o Projeto

PetHope Mobile é uma aplicação React Native desenvolvida com Expo para conectar tutores com pets disponíveis para adoção e doação de sangue. O app oferece uma experiência mobile otimizada para visualização de pets, solicitação de adoções e acesso a campanhas de conscientização.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura** - Login com JWT e validação de tipo de usuário
- 🐕 **Catálogo de Pets** - Navegação intuitiva com cards detalhados
- 🏷️ **Badges de Status** - Identificação visual por tipo de disponibilidade
- 📱 **Interface Mobile-First** - Design otimizado para dispositivos móveis
- 📢 **Campanhas** - Visualização de campanhas de adoção e doação
- 👤 **Perfil Editável** - Atualização de dados pessoais
- 🩸 **Doação de Sangue** - Contador e informações sobre pets doadores
- 🔄 **Sincronização em Tempo Real** - Comunicação eficiente com API REST
- 📞 **Integração WhatsApp** - Contato direto para solicitação de adoção

---

## 🛠️ Tecnologias Utilizadas

### Frontend Mobile
- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma de desenvolvimento e build
- **Expo Router** - Navegação baseada em arquivos
- **React Hooks** - Gerenciamento de estado moderno
- **AsyncStorage** - Persistência local de dados
- **Expo Vector Icons** - Biblioteca de ícones
- **React Native Web** - Suporte para web

### Backend (API)
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação segura
- **bcryptjs** - Hash de senhas
- **CORS** - Segurança de requisições

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Emulador Android/iOS ou Expo Go no smartphone

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Maria22027/PetHope.git
cd Mobile-PetHope
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `constants/api.js`:

```javascript
// Para desenvolvimento local
export const API_URL = 'http://localhost:3000';

// Para produção
export const API_URL = 'https://pethope.onrender.com';
```

### 4️⃣ Iniciar o Servidor de Desenvolvimento

```bash
npm start
```

Isso abrirá o Expo DevTools no navegador.

### 5️⃣ Executar no Dispositivo

**No Android:**
```bash
npm run android
```

**No iOS:**
```bash
npm run ios
```

**Na Web:**
```bash
npm run web
```

**No Expo Go (Smartphone):**
1. Instale o app **Expo Go** na Play Store/App Store
2. Escaneie o QR Code exibido no terminal

---

## 📁 Estrutura do Projeto

```
Mobile-PetHope/
├── app/
│   ├── (auth)/                    # Rotas de autenticação
│   │   ├── _layout.jsx           # Layout das telas de auth
│   │   ├── signIn.jsx            # Tela de login
│   │   ├── signUp.jsx            # Cadastro unificado
│   │   ├── chooseScreen.jsx      # Escolha de tipo de usuário
│   │   ├── tutorSignUp.jsx       # Cadastro de tutor
│   │   ├── ongSignUp.jsx         # Cadastro de ONG
│   │   └── clinicaSignUp.jsx     # Cadastro de clínica
│   ├── (tabs)/                    # Rotas principais (tabs)
│   │   ├── _layout.jsx           # Layout com bottom tabs
│   │   ├── index.jsx             # Home com pets e campanhas
│   │   ├── adotar.jsx            # Lista completa de pets
│   │   ├── doar.jsx              # Doação de sangue
│   │   └── perfil.jsx            # Perfil do usuário
│   ├── Screens/                   # Telas adicionais
│   │   ├── detalhesScreen.jsx    # Detalhes do pet
│   │   ├── detalhesCampanhaScreen.jsx  # Detalhes da campanha
│   │   ├── campanhasScreen.jsx   # Todas as campanhas
│   │   ├── editPerfil.jsx        # Edição de perfil
│   │   └── desktopRedirectScreen.jsx  # Restrição ONGs/Clínicas
│   ├── utils/
│   │   ├── api.js                # Funções de comunicação com API
│   │   └── debug.js              # Utilitários de debug
│   ├── _layout.tsx               # Layout raiz da aplicação
│   └── index.jsx                 # Ponto de entrada
├── assets/
│   ├── images/                   # Imagens e ícones
│   └── styles/                   # Estilos StyleSheet
│       ├── SignIn.styles.js
│       ├── SignUp.styles.js
│       ├── HomeScreen.styles.js
│       ├── AdotarScreen.styles.js
│       ├── DoarScreen.styles.js
│       ├── PerfilScreen.styles.js
│       ├── DetalhesScreen.styles.js
│       ├── CampanhasScreen.styles.js
│       └── DesktopRedirectScreen.styles.js
├── constants/
│   ├── api.js                    # Configuração de URL da API
│   └── colors.js                 # Paleta de cores
├── pethope-api/                  # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── app.js
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── tests/                    # Testes automatizados
│   ├── server.js
│   └── seed.js
├── app.json                      # Configurações do Expo
├── package.json
└── README.md
```

---

## 🎯 Funcionalidades Detalhadas

### 🔐 Sistema de Autenticação

- **Login** seguro com email e senha
- **Validação de tipo de usuário**:
  - ✅ **Tutores** - Acesso completo ao mobile
  - ❌ **Clínicas/ONGs** - Redirecionados para tela de aviso (uso desktop)
- **Cadastro em etapas**:
  1. Seleção do tipo de usuário (Tutor/ONG/Clínica)
  2. Formulário com validações específicas
  3. Redirecionamento automático para login
- **Validações**:
  - ✅ Email válido (regex)
  - ✅ Senha mínima de 6 caracteres
  - ✅ Telefone com 10+ dígitos
  - ✅ Estado (2 letras)
  - ✅ CNPJ (14 dígitos para ONGs)
- **Persistência** de token JWT com AsyncStorage

### 🏠 Tela Home

- 🎉 **Mensagem de boas-vindas** personalizada com nome do usuário
- 🐾 **Lista horizontal de pets** - Últimos pets cadastrados
- 📢 **Lista horizontal de campanhas** - Campanhas ativas
- 🏷️ **Badges coloridos** por status:
  - 🟢 **Verde** - Disponível para adoção
  - 🔴 **Vermelho** - Doação de sangue
  - 🟠 **Laranja** - Adoção + Doação de sangue
  - ⚫ **Cinza** - Indisponível
- 🔄 **Atualização automática** ao voltar para a tela (useFocusEffect)

### 🐕 Tela de Adoção

- 📋 **Lista vertical** com todos os pets disponíveis
- 🎴 **Cards detalhados** com:
  - Foto do pet
  - Nome e espécie
  - Idade
  - Tipo sanguíneo
  - Badge de status com ícone
- 👆 **Clique** para ver detalhes completos
- 🔍 **Carregamento otimizado** com FlatList

### 📄 Tela de Detalhes do Pet

- 🖼️ **Foto em destaque** do pet
- 📝 **Informações completas**:
  - Nome, espécie, idade
  - Tipo sanguíneo
  - Status de disponibilidade
- 💚 **Botão "Solicitar Adoção"**:
  - Abre WhatsApp com mensagem pré-formatada
  - Remove pet do sistema (adoção concluída)
- 🔙 Navegação de volta para lista

### 🩸 Tela de Doação de Sangue

- 🔢 **Contador** de pets disponíveis para doação
- 📱 **Botão WhatsApp** para contato direto
- ℹ️ **Informações** sobre a importância da doação

### 📢 Tela de Campanhas

- 📋 **Lista completa** de todas as campanhas
- 🎴 **Cards** com:
  - Título da campanha
  - Descrição
  - Data formatada (pt-BR)
  - Organização responsável
- 👆 **Clique** para ver detalhes
- 📅 **Ordenação** por data

### 👤 Tela de Perfil

- 👀 **Visualização** de dados do usuário:
  - Nome, email, telefone
  - Cidade e estado
- ✏️ **Botão editar** para alterar informações
- 🔄 **Atualização automática** ao voltar da edição

### ✏️ Tela de Edição de Perfil

- 📝 **Formulário completo** com dados pré-carregados
- 💾 **Salvamento** via API PUT /users/me
- ✅ **Validações** de campos obrigatórios
- 🔙 **Navegação** de volta após salvar

### 🚫 Tela de Restrição (ONGs/Clínicas)

- ℹ️ **Aviso** sobre acesso desktop
- 📋 **Lista de funcionalidades** disponíveis no desktop:
  - Gerenciar pets
  - Criar campanhas
  - Relatórios e estatísticas
- 🚪 **Botão logout** com modal de confirmação
- 🎨 **Design informativo** e amigável

---

## 🎨 Interface e Design

### Paleta de Cores

```javascript
// Cores principais
PRIMARY: '#E53935'      // Vermelho principal
SECONDARY: '#4CAF50'    // Verde para ações positivas
ACCENT: '#2196F3'       // Azul para informações

// Status dos pets
STATUS_ADOCAO: '#4CAF50'           // Verde
STATUS_DOACAO: '#E53935'           // Vermelho
STATUS_ADOCAO_DOACAO: '#FF6F00'    // Laranja
STATUS_INDISPONIVEL: '#757575'     // Cinza

// Interface
BACKGROUND: '#FFFFFF'
TEXT_PRIMARY: '#000000'
TEXT_SECONDARY: '#666666'
BORDER: '#E0E0E0'
```

### Características da UI

- 🎨 **Design Material** - Seguindo guidelines do Material Design
- 📱 **Mobile-First** - Otimizado para telas mobile
- 🌈 **Cores Vibrantes** - Paleta vermelha e verde para destacar ações
- ✨ **Animações Suaves** - Transições e feedbacks visuais
- 🔔 **Alerts Nativos** - Mensagens de erro e sucesso
- 🖼️ **Cards Elevados** - Sombras e bordas arredondadas
- 🏷️ **Badges Informativos** - Status visual com ícones
- 🎯 **Bottom Tabs** - Navegação principal acessível

### Componentes de Interface

- **Header Curvo** - Cabeçalho vermelho com bordas arredondadas
- **Cards Horizontais** - Para pets e campanhas na home
- **Cards Verticais** - Para listas completas
- **Botões de Ação** - Destaque para ações principais
- **Inputs Estilizados** - Campos de formulário com cores temáticas
- **Modal de Confirmação** - Diálogos nativos e customizados

---

## 🔒 Segurança

- 🔐 **JWT** - Tokens de autenticação armazenados com AsyncStorage
- 🛡️ **Validação de Usuário** - Verificação de tipo após login
- 🔑 **Hash de Senhas** - bcryptjs no backend
- 🚫 **Restrição de Acesso** - ONGs/Clínicas bloqueadas no mobile
- 🌐 **HTTPS** - Comunicação segura com API em produção
- ✅ **Validações** - Input validation em todos os formulários

---

## 📊 API Endpoints Utilizados

### Autenticação
- `POST /users/registrar` - Criar nova conta
- `POST /users/login` - Fazer login
- `GET /users/me` - Obter dados do usuário autenticado
- `PUT /users/me` - Atualizar dados do usuário

### Pets
- `GET /pets` - Listar todos os pets
- `GET /pets/:id` - Obter detalhes de um pet
- `DELETE /pets/:id` - Remover pet (após adoção)

### Campanhas
- `GET /campaigns` - Listar campanhas ativas

### Histórico
- `POST /history` - Registrar adoção/doação

---

## 🧪 Testes

### Executar Testes da API

```bash
cd pethope-api
npm test
```

### Cobertura de Testes

```bash
npm run coverage
```

Os testes incluem:
- ✅ Autenticação de usuários
- ✅ CRUD de pets
- ✅ CRUD de campanhas
- ✅ Validações de entrada
- ✅ Autenticação JWT

---

## 🧪 Seeds de Teste

Para popular o banco com dados de teste:

```bash
cd pethope-api
node seed.js
```

**Credenciais de teste:**
- **Clínica:** `clinica@example.com` / `123456`
- **ONG:** `ong@example.com` / `123456`
- **Tutor:** `joao@example.com` / `123456`

**Dados gerados:**
- 15 pets variados
- 5 campanhas de teste
- 3 usuários de exemplo

---

## 🐛 Troubleshooting

### Erro de conexão com a API
```bash
# Verifique se a API está rodando
curl http://localhost:3000/pets

# Reinicie a API se necessário
cd pethope-api
npm start
```

### Erro ao fazer login
- Verifique se o email e senha estão corretos
- Confirme que o usuário foi cadastrado
- Verifique os logs da API no terminal

### Pets não aparecem
- Limpe o cache do Expo: `expo start -c`
- Verifique a URL da API em `constants/api.js`
- Confirme que há pets cadastrados no banco

### Erro ao instalar dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas com Expo Go
- Certifique-se de estar na mesma rede Wi-Fi
- Verifique o firewall do computador
- Use o modo tunnel: `expo start --tunnel`

---

## 📦 Build para Produção

### Android (APK)

```bash
expo build:android
```

### iOS (IPA)

```bash
expo build:ios
```

### Web

```bash
npm run build
```

---

## 🚀 Deploy

### API (Backend)

A API pode ser hospedada em:
- **Render** - `https://pethope.onrender.com`
- **Heroku**
- **Railway**
- **AWS**

### Mobile App

- **Google Play Store** - Para Android
- **Apple App Store** - Para iOS
- **Expo Go** - Para distribuição interna

---

## 📝 Roadmap Futuro

- [ ] Sistema de notificações push
- [ ] Chat em tempo real entre tutores e organizações
- [ ] Filtros de busca avançados (espécie, idade, localização)
- [ ] Favoritos e lista de desejos
- [ ] Compartilhamento de pets nas redes sociais
- [ ] Modo offline com sincronização
- [ ] Geolocalização para pets próximos
- [ ] Sistema de avaliação de organizações
- [ ] Histórico de adoções do usuário
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Agendamento de visitas

---

## 👨‍💻 Autor

**Thiago Pereira de Jesus Souza**

- GitHub: [@Maria22027](https://github.com/Maria22027)
- Projeto: [PetHope](https://github.com/Maria22027/PetHope)

---

<div align="center">
  <p>Feito com ❤️ e ☕ por Thiago Pereira de Jesus Souza</p>
  <p>🐾 Ajudando pets a encontrarem um lar 🏠</p>
</div>
