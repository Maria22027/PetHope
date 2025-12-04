# 🐾 PetHope

<div align="center">

![PetHope Logo](https://img.shields.io/badge/PetHope-Adoção%20e%20Doação%20de%20Sangue-blue?style=for-the-badge)

**Plataforma multiplataforma para adoção de animais e doação de sangue veterinário**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![Electron](https://img.shields.io/badge/Electron-47848F?style=flat&logo=electron&logoColor=white)](https://www.electronjs.org/)

</div>

---

## 🚀 Acesso Rápido

### 🌐 Plataformas no Ar

- **Site Web**: [https://pethope.netlify.app/html/](https://pethope.netlify.app/html/)
- **API Backend**: [https://pethope-aw8q.onrender.com](https://pethope-aw8q.onrender.com)
- **Documentação API**: [https://pethope-aw8q.onrender.com/api-docs](https://pethope-aw8q.onrender.com/api-docs)

### 📱 Downloads

- **Mobile (Android APK)**: [Baixar via Expo](https://expo.dev/accounts/wolski/projects/pethope/builds/2af5b255-63a8-4615-b1a4-6efaaaf3d0d0)
  - Escaneie o QR Code no link acima ou baixe diretamente o APK
  - Também disponível em: `Web_PetHope/downloads/pethope.apk` (após clonar o repo)

- **Desktop (Windows)**: Disponível em `Web_PetHope/downloads/PetHope-Setup.exe` (após clonar o repo)
  - Instalador completo de ~71 MB
  - Suporte a Windows 10/11 (x64)

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Testes](#-testes)
- [Autores](#-autores)

---

## 🎯 Sobre o Projeto

**PetHope** é uma solução completa e integrada para conectar pessoas que desejam adotar animais de estimação com ONGs, clínicas veterinárias e tutores. A plataforma também facilita a organização de campanhas de doação de sangue veterinário, ajudando a salvar vidas animais.

O sistema é composto por três interfaces que consomem a mesma API RESTful:
- **Web** - Interface responsiva em HTML5, CSS3 e JavaScript
- **Mobile** - Aplicativo nativo usando React Native e Expo
- **Desktop** - Aplicação desktop com Electron

### 🎯 Objetivos

- Facilitar o processo de adoção de animais
- Conectar doadores e receptores de sangue veterinário
- Centralizar informações de ONGs e clínicas veterinárias
- Promover o bem-estar animal através da tecnologia

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura cliente-servidor com API centralizada:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Web App   │      │ Mobile App  │      │ Desktop App │
│  (HTML/JS)  │      │(React Native)│     │  (Electron) │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                     │
       └────────────────────┼─────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   PetHope API  │
                    │  (Node/Express)│
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │    MongoDB     │
                    │   (Database)   │
                    └────────────────┘
```

### Componentes Principais

1. **API Backend (`pethope-api/`)** - Servidor Node.js/Express com autenticação JWT
2. **Web Frontend (`Web_PetHope/`)** - Interface web responsiva
3. **Mobile App (`Mobile-PetHope/`)** - Aplicativo React Native com Expo
4. **Desktop App (`Desktop-PetHope/`)** - Aplicação desktop com Electron

---

## ✨ Funcionalidades

### 👤 Gestão de Usuários

- ✅ Cadastro e autenticação de três tipos de usuários:
  - **Tutores** - Pessoas físicas que adotam ou doam pets
  - **Clínicas** - Estabelecimentos veterinários com CNPJ e CRMV
  - **ONGs** - Organizações de proteção animal
- ✅ Login seguro com JWT (JSON Web Token)
- ✅ Perfis personalizados por tipo de usuário
- ✅ Edição de dados cadastrais

### 🐕 Gestão de Pets

- ✅ Cadastro de animais para adoção
- ✅ Registro de pets disponíveis para doação de sangue
- ✅ Informações detalhadas: nome, espécie, idade, tipo sanguíneo
- ✅ Imagens integradas de APIs públicas (The Cat API / Dog CEO)
- ✅ Status de disponibilidade (adoção, doação de sangue, ambos, indisponível)
- ✅ Busca e listagem de pets

### 🩸 Campanhas de Doação

- ✅ Criação de campanhas de doação de sangue
- ✅ Agendamento com data e descrição
- ✅ Vinculação com ONGs e clínicas organizadoras
- ✅ Visualização em carrossel na página inicial

### 📊 Histórico

- ✅ Registro de adoções realizadas
- ✅ Histórico de doações de sangue
- ✅ Rastreabilidade completa de transações

---

## 🛠️ Tecnologias Utilizadas

### Backend (API)

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Node.js** | 16+ | Runtime JavaScript |
| **Express** | 5.1.0 | Framework web |
| **MongoDB** | 8.20.0 | Banco de dados NoSQL |
| **Mongoose** | 8.20.0 | ODM para MongoDB |
| **JWT** | 9.0.2 | Autenticação |
| **bcryptjs** | 3.0.3 | Criptografia de senhas |
| **Swagger** | 6.2.8 | Documentação da API |
| **Jest** | 30.2.0 | Testes unitários |
| **Cloudinary** | 2.8.0 | Upload de imagens |

### Frontend Web

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura das páginas |
| **CSS3** | Estilização responsiva |
| **JavaScript ES6+** | Lógica de negócio |
| **Fetch API** | Requisições HTTP |
| **LocalStorage** | Armazenamento de token |

### Mobile (React Native)

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Native** | 0.81.5 | Framework mobile |
| **Expo** | ~54.0.25 | Plataforma de desenvolvimento |
| **Expo Router** | ~6.0.15 | Navegação |
| **AsyncStorage** | 1.23.1 | Persistência local |
| **SecureStore** | 15.0.7 | Armazenamento seguro |

### Desktop (Electron)

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Electron** | 27.1.3 | Framework desktop |
| **Axios** | 1.6.0 | Cliente HTTP |

---

## 📁 Estrutura do Projeto

```
PetHope/
│
├── pethope-api/                    # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── app.js                  # Configuração do Express
│   │   ├── config/
│   │   │   ├── database.js         # Conexão MongoDB
│   │   │   └── swagger.js          # Config Swagger
│   │   ├── controllers/            # Lógica de negócio
│   │   │   ├── userController.js
│   │   │   ├── petController.js
│   │   │   ├── campaignController.js
│   │   │   └── historyController.js
│   │   ├── models/                 # Modelos Mongoose
│   │   │   ├── User.js
│   │   │   ├── Pet.js
│   │   │   ├── Campaign.js
│   │   │   └── History.js
│   │   ├── routes/                 # Rotas da API
│   │   │   ├── userRoutes.js
│   │   │   ├── petRoutes.js
│   │   │   ├── campaignRoutes.js
│   │   │   └── historyRoutes.js
│   │   ├── middleware/             # Middlewares (auth, etc)
│   │   └── services/               # Serviços externos
│   ├── tests/                      # Testes automatizados
│   │   ├── tutor.test.js
│   │   ├── clinica.test.js
│   │   ├── ong.test.js
│   │   └── coverage.test.js
│   ├── coverage/                   # Relatórios de cobertura
│   ├── server.js                   # Ponto de entrada
│   ├── seed.js                     # Popular banco de dados
│   ├── package.json
│   └── jest.config.js
│
├── Web_PetHope/                    # Frontend Web
│   ├── html/
│   │   ├── index.html              # Página inicial
│   │   ├── adocao.html             # Listagem de pets
│   │   ├── doacao-sangue.html      # Campanhas
│   │   ├── animais.html            # Busca de animais
│   │   └── pages/
│   │       ├── login.html
│   │       ├── historico.html
│   │       └── detalhes.html
│   ├── css/
│   │   ├── style.css               # Estilos globais
│   │   ├── adocao.css
│   │   └── animais.css
│   ├── js/
│   │   ├── api.js                  # Cliente API
│   │   ├── auth.js                 # Autenticação
│   │   └── animais.js              # Lógica de pets
│   └── img/                        # Imagens estáticas
│
├── Mobile-PetHope/                 # App Mobile (React Native)
│   ├── app/
│   │   ├── index.jsx               # Ponto de entrada
│   │   ├── _layout.tsx             # Layout raiz
│   │   ├── (auth)/                 # Telas de autenticação
│   │   │   ├── signIn.jsx
│   │   │   ├── chooseScreen.jsx
│   │   │   ├── tutorSignUp.jsx
│   │   │   ├── clinicaSignUp.jsx
│   │   │   └── ongSignUp.jsx
│   │   ├── (tabs)/                 # Telas principais
│   │   │   ├── index.jsx           # Home
│   │   │   ├── adotar.jsx          # Adoção
│   │   │   ├── doar.jsx            # Doação de sangue
│   │   │   └── perfil.jsx          # Perfil do usuário
│   │   ├── Screens/
│   │   │   └── editPerfil.jsx
│   │   └── utils/
│   │       ├── api.js              # Cliente API
│   │       └── debug.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/                 # Estilos dos componentes
│   ├── constants/
│   │   ├── api.js                  # Configuração da API
│   │   └── colors.js
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
└── Desktop-PetHope/                # App Desktop (Electron)
    ├── src/
    │   ├── main.js                 # Processo principal
    │   ├── preload.js              # Script de preload
    │   └── config.js
    ├── public/
    │   ├── index.html              # Interface
    │   ├── script.js               # Lógica do renderer
    │   └── style.css
    └── package.json
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 16 ou superior
- **MongoDB** 6.0 ou superior (local ou Atlas)
- **npm** ou **yarn**
- **Git**

Para o app mobile:
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** app no smartphone (iOS/Android)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Maria22027/PetHope.git
cd PetHope/Código/petHopeAtt
```

### 2️⃣ Configurar o Backend (API)

```bash
# Navegar para a pasta da API
cd pethope-api

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz de pethope-api/
```

**Arquivo `.env`:**

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/pethope
JWT_SECRET=sua_chave_secreta_super_segura_aqui
NODE_ENV=development

# Cloudinary (opcional para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

```bash
# Popular o banco de dados com dados de teste
npm run seed

# Iniciar o servidor em modo desenvolvimento
npm run dev

# Ou em modo produção
npm start
```

A API estará disponível em: **http://localhost:3000**

Documentação Swagger: **http://localhost:3000/api-docs**

### 3️⃣ Configurar o Frontend Web

```bash
# Navegar para a pasta web
cd ../Web_PetHope

# Não há dependências para instalar (HTML/CSS/JS puro)
# Abra o arquivo html/index.html no navegador
# Ou use um servidor local como Live Server
```

**Recomendação:** Use a extensão **Live Server** do VS Code para desenvolvimento.

### 4️⃣ Configurar o App Mobile

```bash
# Navegar para a pasta mobile
cd ../Mobile-PetHope

# Instalar dependências
npm install

# Iniciar o servidor Expo
npm start

# Ou especificamente para Android/iOS
npm run android
npm run ios
```

**Configurar URL da API:**

Edite `Mobile-PetHope/constants/api.js`:

```javascript
export const API_URL = "http://SEU_IP_LOCAL:3000";
// Exemplo: export const API_URL = "http://192.168.0.10:3000";
```

> ⚠️ **Importante:** Use seu IP local, não `localhost`, para testar no dispositivo físico.

### 5️⃣ Configurar o App Desktop

```bash
# Navegar para a pasta desktop
cd ../Desktop-PetHope

# Instalar dependências
npm install

# Iniciar a aplicação
npm start

# Modo desenvolvimento com DevTools
npm run dev
```

---

## 💡 Uso

### 🔐 Credenciais de Teste (após rodar `npm run seed`)

| Tipo | Email | Senha |
|------|-------|-------|
| **Tutor** | joao@example.com | 123456 |
| **Clínica** | clinica@example.com | 123456 |
| **ONG** | ong@example.com | 123456 |

### Fluxo de Uso

#### Para Tutores:
1. Criar conta como tutor
2. Fazer login
3. Navegar pelos pets disponíveis para adoção
4. Visualizar campanhas de doação de sangue
5. Editar perfil pessoal

#### Para Clínicas:
1. Criar conta como clínica (requer CNPJ e CRMV)
2. Fazer login
3. Cadastrar pets para adoção
4. Criar campanhas de doação de sangue
5. Gerenciar histórico de adoções e doações

#### Para ONGs:
1. Criar conta como ONG (requer CNPJ)
2. Fazer login
3. Criar campanhas de doação de sangue
4. Visualizar histórico de atividades

---

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/users/registrar` | Cadastrar novo usuário | Não |
| POST | `/users/login` | Fazer login e obter token JWT | Não |

### Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/users` | Listar todos os usuários | Sim |
| GET | `/users/:id` | Buscar usuário por ID | Sim |
| PUT | `/users/:id` | Atualizar dados do usuário | Sim |
| DELETE | `/users/:id` | Deletar usuário | Sim |

### Pets

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/pets` | Listar todos os pets | Não |
| GET | `/pets/:id` | Buscar pet por ID | Não |
| POST | `/pets` | Cadastrar novo pet | Sim (Clínica) |
| PUT | `/pets/:id` | Atualizar dados do pet | Sim (Clínica) |
| DELETE | `/pets/:id` | Deletar pet | Sim (Clínica) |

### Campanhas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/campaigns` | Listar todas as campanhas | Não |
| GET | `/campaigns/:id` | Buscar campanha por ID | Não |
| POST | `/campaigns` | Criar nova campanha | Sim (ONG/Clínica) |
| PUT | `/campaigns/:id` | Atualizar campanha | Sim (ONG/Clínica) |
| DELETE | `/campaigns/:id` | Deletar campanha | Sim (ONG/Clínica) |

### Histórico

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/history` | Listar histórico | Sim |
| POST | `/history` | Registrar novo histórico | Sim |

### Formato de Requisição

**Exemplo - Cadastro de Usuário:**

```json
POST /users/registrar
Content-Type: application/json

{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "senha": "senha123",
  "telefone": "11987654321",
  "tipo": "tutor",
  "cpf": "123.456.789-00",
  "endereco": {
    "rua": "Rua das Flores, 456",
    "cidade": "São Paulo",
    "uf": "SP"
  }
}
```

**Exemplo - Login:**

```json
POST /users/login
Content-Type: application/json

{
  "email": "maria@example.com",
  "senha": "senha123"
}
```

**Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "nome": "Maria Silva",
    "email": "maria@example.com",
    "tipo": "tutor"
  }
}
```

**Exemplo - Cadastro de Pet (requer autenticação):**

```json
POST /pets
Authorization: Bearer <seu_token_jwt>
Content-Type: application/json

{
  "nome": "Rex",
  "especie": "Cachorro",
  "idade": 3,
  "tipoSanguineo": "DEA 1.1",
  "status": "adocao",
  "descricao": "Cachorro muito brincalhão e carinhoso",
  "imageUrl": "https://exemplo.com/imagem.jpg"
}
```

---

## 🧪 Testes

O projeto inclui testes automatizados usando **Jest** e **Supertest**.

### Executar Testes

```bash
cd pethope-api

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run coverage
```

### Cobertura de Testes

Após executar `npm run coverage`, abra o relatório:

```bash
# Windows
start coverage/lcov-report/index.html

# Linux/Mac
open coverage/lcov-report/index.html
```

### Arquivos de Teste

- `tests/tutor.test.js` - Testes de funcionalidades de tutores
- `tests/clinica.test.js` - Testes de funcionalidades de clínicas
- `tests/ong.test.js` - Testes de funcionalidades de ONGs
- `tests/coverage.test.js` - Testes de cobertura geral

---

## 📚 Documentação Adicional

### Swagger/OpenAPI

Acesse a documentação interativa da API em:

**http://localhost:3000/api-docs**

A documentação Swagger permite:
- Visualizar todos os endpoints
- Testar requisições diretamente no navegador
- Ver esquemas de dados
- Entender autenticação JWT

### Models (Schemas MongoDB)

#### User Schema

```javascript
{
  nome: String,
  email: String (unique),
  senhaHash: String,
  telefone: String,
  tipo: ["tutor", "ong", "clinica"],
  cpf: String,
  cnpj: String,
  crmvResponsavel: String,
  nomeOrganizacao: String,
  nomeClinica: String,
  endereco: {
    rua: String,
    cidade: String,
    uf: String
  }
}
```

#### Pet Schema

```javascript
{
  nome: String,
  especie: String,
  idade: Number,
  tipoSanguineo: String,
  status: ["adocao", "doacao-sangue", "adocao-doacao-sangue", "indisponivel"],
  descricao: String,
  imageUrl: String,
  tutorId: ObjectId (ref: Usuario)
}
```

#### Campaign Schema

```javascript
{
  titulo: String,
  descricao: String,
  data: Date,
  organizacaoId: ObjectId (ref: Usuario)
}
```

#### History Schema

```javascript
{
  tipo: ["adocao", "doacao-sangue"],
  petId: ObjectId (ref: Pet),
  userId: ObjectId (ref: Usuario),
  data: Date,
  observacoes: String
}
```

---

## 🔒 Segurança

### Boas Práticas Implementadas

✅ Senhas criptografadas com **bcryptjs** (salt rounds: 10)  
✅ Autenticação JWT com expiração configurável  
✅ Validação de dados de entrada  
✅ CORS configurado para permitir origens específicas  
✅ Proteção de rotas sensíveis com middleware de autenticação  
✅ Sanitização de queries MongoDB  
✅ Variáveis de ambiente para informações sensíveis

---

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/iampdrin">
        <img src="https://github.com/iampdrin.png" width="100px;" alt="Pedro Wolski"/><br>
        <sub><b>Pedro Wolski</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KingTayko">
        <img src="https://github.com/KingTayko.png" width="100px;" alt="Thiago Souza"/><br>
        <sub><b>Thiago Souza</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Maria22027">
        <img src="https://github.com/Maria22027.png" width="100px;" alt="Maria Eduarda"/><br>
        <sub><b>Maria Eduarda</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/duh2467">
        <img src="https://github.com/duh2467.png" width="100px;" alt="Eduardo Amorim"/><br>
        <sub><b>Eduardo Amorim</b></sub>
      </a>
    </td>
  </tr>
</table>

<div align="center">

**Feito com ❤️ e 🐾 pela equipe PetHope**

[⬆ Voltar ao topo](#-pethope)

</div>
