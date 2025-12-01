# 🐾 PetHope Desktop

> Aplicação desktop para gerenciamento de pets, campanhas de adoção e doação de sangue animal

[![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 📋 Sobre o Projeto

PetHope Desktop é uma aplicação Electron completa para gerenciamento de pets disponíveis para adoção e doação de sangue. O sistema permite que clínicas veterinárias e ONGs cadastrem e gerenciem pets, criem campanhas de conscientização e facilitem o processo de adoção responsável.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação JWT** - Login seguro para clínicas, ONGs e tutores
- 🐕 **Gerenciamento de Pets** - CRUD completo com fotos (Cloudinary/Base64)
- 📢 **Campanhas** - Criação e gestão de campanhas de adoção
- 👤 **Perfil de Usuário** - Visualização e edição de informações
- 📸 **Upload de Imagens** - Suporte a fotos dos pets com preview
- 🎨 **Interface Moderna** - Design responsivo e intuitivo
- 🔄 **Sincronização em Tempo Real** - Comunicação eficiente com API REST

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Electron** - Framework para aplicações desktop
- **HTML5/CSS3** - Interface moderna e responsiva
- **JavaScript (Vanilla)** - Lógica da aplicação
- **IPC (Inter-Process Communication)** - Comunicação segura entre processos

### Backend (API)
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação segura
- **Cloudinary** - Armazenamento de imagens na nuvem
- **bcryptjs** - Hash de senhas

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (local ou Atlas)
- Conta Cloudinary (opcional, para upload de imagens)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Maria22027/PetHope.git
cd Desktop-PetHope
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar API

A API deve estar rodando em um repositório separado. Configure o arquivo `.env` na API com:

```env
MONGO_URI=sua_string_de_conexao_mongodb
PORT=3000
JWT_SECRET=seu_secret_jwt
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### 4️⃣ Iniciar a Aplicação

```bash
npm start
```

---

## 📁 Estrutura do Projeto

```
Desktop-PetHope/
├── public/
│   ├── index.html          # Interface principal
│   ├── script.js           # Lógica da aplicação
│   └── style.css           # Estilos
├── src/
│   ├── main.js             # Processo principal do Electron
│   ├── preload.js          # Bridge IPC seguro
│   └── config.js           # Configurações da aplicação
├── assets/                 # Recursos estáticos
├── package.json
└── README.md
```

---

## 🎯 Funcionalidades Detalhadas

### 🔐 Sistema de Autenticação

- **Login** com email e senha
- **Registro** para três tipos de usuário:
  - 🏥 **Clínica Veterinária** - Gerencia pets e campanhas
  - 🏢 **ONG** - Gerencia campanhas de adoção
  - 👤 **Tutor** - Visualiza pets disponíveis (acesso limitado)
- **Validação** de credenciais com JWT
- **Persistência** de sessão com localStorage
- **Tela de restrição** para tutores (acesso somente mobile)

### 🐾 Gerenciamento de Pets

- ✅ **Cadastrar** pets com foto, espécie, idade, tipo sanguíneo
- 📝 **Editar** informações dos pets
- 🗑️ **Excluir** pets do sistema
- 📋 **Listar** todos os pets cadastrados
- 🏷️ **Status** personalizados:
  - 🏠 Adoção
  - 🩸 Doação de Sangue
  - 🏠🩸 Adoção + Doação

### 📢 Gerenciamento de Campanhas

- ✅ **Criar** campanhas de adoção/conscientização
- 📝 **Editar** detalhes das campanhas
- 🗑️ **Excluir** campanhas
- 📋 **Listar** todas as campanhas ativas

### 👤 Perfil de Usuário

- 👀 **Visualizar** informações do usuário logado
- ✏️ **Editar** dados pessoais
- 🔑 **Alterar** senha
- 📍 **Endereço** completo (para ONGs e Clínicas)
- 📄 **CNPJ/CRMV** para organizações

### 📸 Upload de Imagens

- 📤 **Upload** de fotos dos pets
- 👁️ **Preview** antes de salvar
- ☁️ **Cloudinary** - Upload para nuvem (produção)
- 💾 **Base64** - Fallback para armazenamento local
- 🖼️ **Modal** para visualização ampliada das fotos

---

## 🎨 Interface

### Telas Disponíveis

1. **Login** - Autenticação de usuários
2. **Registro** - Cadastro de novos usuários
3. **Home** - Dashboard principal
4. **Gerenciar Pets** - CRUD de pets
5. **Gerenciar Campanhas** - CRUD de campanhas
6. **Meu Perfil** - Visualização e edição de dados
7. **Restrição de Acesso** - Tela para tutores (mobile only)

### Características da UI

- 🎨 **Design Moderno** - Interface clean e profissional
- 📱 **Responsivo** - Adaptável a diferentes resoluções
- 🌈 **Cores** - Paleta vermelha (#f35848) e azul (#a3d9e0)
- ✨ **Animações** - Transições suaves entre telas
- 🔔 **Feedback Visual** - Mensagens de erro e sucesso
- 🖼️ **Cards Interativos** - Hover effects e ações rápidas

---

## 🔒 Segurança

- 🔐 **JWT** - Tokens de autenticação seguros
- 🛡️ **Context Isolation** - Separação segura de processos no Electron
- 🔑 **Hash de Senhas** - bcryptjs para proteção de senhas
- 🚫 **Validação** - Verificação de permissões por tipo de usuário
- 🌐 **CORS** - Configurado na API para requisições seguras

---

## 📊 API Endpoints Utilizados

### Autenticação
- `POST /auth/registrar` - Criar nova conta
- `POST /auth/login` - Fazer login

### Pets
- `GET /pets` - Listar todos os pets
- `POST /pets` - Criar novo pet
- `PUT /pets/:id` - Atualizar pet
- `DELETE /pets/:id` - Deletar pet

### Campanhas
- `GET /campaigns` - Listar campanhas
- `POST /campaigns` - Criar campanha
- `PUT /campaigns/:id` - Atualizar campanha
- `DELETE /campaigns/:id` - Deletar campanha

### Usuários
- `GET /users/:id` - Obter perfil do usuário
- `PUT /users/:id` - Atualizar perfil
- `DELETE /users/:id` - Deletar conta

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

---

## 🐛 Troubleshooting

### Erro de conexão com a API
```bash
# Verifique se a API está rodando
curl http://localhost:3000

# Reinicie a API se necessário
cd pethope-api
npm start
```

### Erro ao fazer upload de imagens
- Verifique as credenciais do Cloudinary no `.env`
- O sistema usa Base64 como fallback automático

### Pets não aparecem
- Limpe o cache: `Ctrl+Shift+R` no app
- Verifique o console do DevTools: `Ctrl+Shift+I`

---

## 📝 Roadmap Futuro

- [ ] Notificações push para novas adoções
- [ ] Chat entre tutores e clínicas
- [ ] Sistema de agendamento de visitas
- [ ] Relatórios de adoções por período
- [ ] Filtros avançados de busca
- [ ] Exportação de dados em PDF
- [ ] Modo offline com sincronização

---

## 👨‍💻 Dev autor do Desktop

**Pedro Henrique Bomfim Wolski**

- GitHub: [@Maria22027](https://github.com/Maria22027)
- Projeto: [PetHope](https://github.com/Maria22027/PetHope)

---
