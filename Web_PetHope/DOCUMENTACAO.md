# PetHope - Guia Completo

## 📋 Resumo Executivo

**PetHope** é uma plataforma web integrada para adoção de animais e doação de sangue veterinário. 
- Frontend: HTML5, CSS3, JavaScript vanilla
- Backend: Node.js/Express com MongoDB
- Autenticação: JWT + bcryptjs + localStorage
- Repositório principal: `/pethope-api/` para o backend

---

## 🚀 Início Rápido

### 1. Instalar Dependências do Backend

```powershell
cd pethope-api
npm install
```

### 2. Configurar Banco de Dados MongoDB

Certifique-se de que MongoDB está rodando localmente ou configure a conexão em `/pethope-api/src/config/database.js`:

```javascript
const MONGO_URI = 'mongodb://localhost:27017/pethope';
```

### 3. Iniciar o Servidor Backend

```powershell
cd pethope-api
npm start
```

O servidor estará disponível em `http://localhost:3000`

### 4. Popular Banco com Dados de Teste

```powershell
npm run seed
```

Isso criará:
- 3 usuários (tutor, clínica, ONG)
- 5 animais (cães e gatos)
- 3 campanhas de doação

### 5. Abrir o Frontend

Abra o arquivo `html/index.html` no navegador ou use um servidor local.

---

## 📁 Estrutura do Projeto

```
Web_PetHope/
├── html/                          # Páginas HTML
│   ├── index.html                # Página inicial
│   ├── animais.html              # Lista de animais
│   ├── adocao.html               # Info sobre adoção
│   ├── doacao-sangue.html        # Info sobre doação
│   ├── detalhes-*.html           # Detalhes individuais
│   └── pages/
│       ├── login.html            # Login/Registro
│       ├── historico.html        # Histórico do usuário
│       └── detalhes.html         # Dinâmico (sem uso)
├── styles/                        # Arquivos CSS
│   ├── style.css
│   ├── animais.css
│   ├── detalhes.css
│   ├── adocao.css
│   └── doa.css
├── js/                           # JavaScript
│   ├── api.js                    # Cliente HTTP para API
│   ├── auth.js                   # Gerenciamento de autenticação
│   ├── animais.js                # Lógica da página de animais
│   └── script.js
├── img/                          # Imagens dos animais
├── pethope-api/                  # Backend Node.js
│   ├── src/
│   │   ├── app.js               # Configuração Express
│   │   ├── server.js            # Inicializador
│   │   ├── config/
│   │   │   ├── database.js      # Conexão MongoDB
│   │   │   └── swagger.js       # Documentação API
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Pet.js
│   │   │   ├── Campaign.js
│   │   │   └── History.js
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── petController.js
│   │   │   ├── campaignController.js
│   │   │   └── historyController.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── petRoutes.js
│   │   │   ├── campaignRoutes.js
│   │   │   └── historyRoutes.js
│   │   └── middleware/
│   │       └── auth.js          # Validação de JWT
│   ├── tests/                   # Testes Jest
│   ├── seed.js                  # Script de população
│   ├── jest.config.js
│   └── package.json
└── DOCUMENTACAO.md              # Este arquivo
```

---

## 🔐 Autenticação

### Fluxo de Login

1. **Registro**: POST `/users/registrar`
   ```json
   {
     "nome": "João",
     "email": "joao@email.com",
     "telefone": "(11) 99999-9999",
     "tipo": "tutor",
     "senha": "senha123"
   }
   ```

2. **Login**: POST `/users/login`
   ```json
   {
     "email": "joao@email.com",
     "senha": "senha123"
   }
   ```

3. **Token JWT**: Salvo em `localStorage` como `token` e `user`

4. **Requisições Autenticadas**: Incluem header `Authorization: Bearer {token}`

### Tipos de Usuário

- **Tutor**: Pode adotar animais e participar de doações
- **Clínica**: Gerencia doações de sangue
- **ONG**: Gerencia campanhas e animais

---

## 🐾 Endpoints da API

### Usuários
- `POST /users/registrar` - Criar novo usuário
- `POST /users/login` - Fazer login
- `GET /users/{id}` - Obter dados do usuário (requer auth)

### Animais
- `GET /pets` - Listar todos
- `GET /pets/{id}` - Obter detalhes
- `POST /pets` - Criar (admin)
- `PUT /pets/{id}` - Atualizar (admin)
- `DELETE /pets/{id}` - Deletar (admin)

### Campanhas
- `GET /campaigns` - Listar campanhas
- `POST /campaigns` - Criar (admin)

### Histórico
- `GET /history` - Listar todo histórico (admin)
- `GET /history/usuario/{usuarioId}` - Histórico do usuário (requer auth)
- `POST /history` - Criar evento (requer auth)

### Documentação Interativa
- Acesse: `http://localhost:3000/api-docs` (Swagger)

---

## 🛠️ Cliente API (js/api.js)

Classe centralizada para comunicação com o backend:

```javascript
const api = new ApiClient('http://localhost:3000');

// Registro
api.registrarUsuario({nome, email, telefone, tipo, senha});

// Login
api.loginUsuario(email, senha);

// Listar animais
api.listarPets();

// Obter animal específico
api.getPetPorId(petId);

// Criar histórico
api.criarHistorico({usuarioId, petId, tipoEvento, descricao});

// Listar histórico do usuário
api.listarHistoricoPorUsuario(usuarioId);

// Campanhas
api.listarCampanhas();
```

---

## 🔑 Gerenciamento de Autenticação (js/auth.js)

```javascript
const auth = new Auth();

// Verificar se está autenticado
if (auth.isAuthenticated()) { }

// Obter dados do usuário
const user = auth.getUser();

// Salvar token e usuário
auth.setToken(token);
auth.setUser(usuario);

// Fazer logout
auth.logout();

// Proteger rota
auth.requireAuth(); // Redireciona se não autenticado
```

---

## 🧪 Testes

```powershell
cd pethope-api

# Executar todos os testes
npm test

# Com cobertura
npm test -- --coverage

# Teste específico
npm test tutor.test.js
```

### Testes Disponíveis
- `tutor.test.js` - Fluxo de tutores (registro, login, adoção)
- `clinica.test.js` - Fluxo de clínicas (doações)
- `ong.test.js` - Fluxo de ONGs (campanhas)
- `coverage.test.js` - Validações gerais

---

## 📊 Dados de Teste (Seed)

### Usuários Pré-cadastrados

| Email | Tipo | Senha |
|-------|------|-------|
| tutor@pethope.com | Tutor | 123456 |
| clinica@pethope.com | Clínica | 123456 |
| ong@pethope.com | ONG | 123456 |

### Animais Disponíveis

| Nome | Status | Imagem |
|------|--------|--------|
| Nina | adocao | cao3.jpg |
| Rodolfo | adocao | gato1.jpg |
| Luna | doacao | gato2.jpg |
| Snow | doacao | gato3.jpg |
| Bidu | doacao | gato4.jpg |

### Campanhas

- "Doação de Sangue - Março 2025"
- "Adoção de Emergência"
- "Castração Gratuita"

---

## 🌐 URLs Importantes

- **Frontend**: `http://localhost:3000` ou `file:///.../html/index.html`
- **API**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api-docs`
- **Login**: `html/pages/login.html`
- **Animais**: `html/animais.html`
- **Histórico**: `html/pages/historico.html` (requer login)

---

## ⚙️ Variáveis de Configuração

### Backend (`pethope-api/`)

**`.env` (criar se necessário)**:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/pethope
JWT_SECRET=seu_secreto_aqui
JWT_EXPIRY=7d
NODE_ENV=development
```

### Frontend (`js/api.js`)

```javascript
const API_BASE_URL = 'http://localhost:3000'; // Editar se necessário
```

---

## 🐛 Troubleshooting

### MongoDB não conecta
- Verifique se MongoDB está rodando: `mongod`
- Altere `MONGO_URI` em `pethope-api/src/config/database.js`

### Token expirado
- Faça logout e login novamente
- Ou edite a expiração em `.env`: `JWT_EXPIRY=30d`

### CORS erro
- Verifique se backend está rodando em `http://localhost:3000`
- Altere `API_BASE_URL` em `js/api.js` se necessário

### Imagens não carregam
- Coloque as imagens em pasta `/img`
- Use caminhos corretos: `../img/foto.jpg`

---

## 📝 Padrões de Código

### Requisição HTTP (api.js)
```javascript
async metodo(parametros) {
  const response = await fetch(`${this.baseURL}/endpoint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    },
    body: JSON.stringify(parametros)
  });
  
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
```

### Proteção de Rota (auth.js)
```javascript
requireAuth() {
  if (!this.isAuthenticated()) {
    window.location.href = '/html/pages/login.html';
  }
}
```

---

## 🎯 Próximos Passos / Melhorias Futuras

- [ ] Adicionar imagens de perfil para usuários
- [ ] Sistema de avaliações de adotantes
- [ ] Notificações por email
- [ ] Agendamento de consultas
- [ ] Painel administrativo
- [ ] Relatórios de campanhas

---

## 📞 Suporte

Para erros ou dúvidas:
1. Verifique a documentação Swagger: `http://localhost:3000/api-docs`
2. Confira os testes em `/pethope-api/tests/`
3. Revise os logs do console (F12 > Console)

---

**Última atualização**: 2025
**Versão**: 1.0.0
