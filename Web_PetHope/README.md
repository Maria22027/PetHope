# 🐾 PetHope Web

> **Plataforma web de visualização para adoção responsável de pets e campanhas de doação de sangue animal**

<div align="center">

![PetHope](https://img.shields.io/badge/PetHope-v1.0-ff493c?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-33aec4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

</div>

---

## 📖 Sobre o Projeto

O **PetHope** é uma plataforma completa que conecta animais que precisam de um lar com pessoas dispostas a adotar. Além de facilitar adoções responsáveis, o sistema promove campanhas de doação de sangue animal, salvando vidas e educando a comunidade sobre a importância desse ato.

### 🎯 Objetivo

Criar um ecossistema digital que:
- Facilite o processo de adoção de pets abandonados
- Promova a conscientização sobre doação de sangue animal
- Conecte ONGs, clínicas veterinárias e tutores em uma única plataforma
- Ofereça uma experiência fluida entre web (visualização) e aplicativos (interação completa)

### 🌟 Diferenciais

- **Interface Responsiva**: Design moderno e intuitivo
- **Arquitetura Híbrida**: Web para visualização + Apps para ações completas
- **Impacto Social**: Promove adoção responsável e doação de sangue
- **Open Source**: Código aberto para contribuições da comunidade

---

## 🚀 Inicialização Rápida

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **MongoDB** (v4.4 ou superior)
- **Python** ou **Node.js** para servidor local (opcional)

### 1. Clone o Repositório

```bash
git clone https://github.com/Maria22027/PetHope.git
cd Web_PetHope
```

### 2. Backend (API)
```bash
cd pethope-api
npm install
npm start
```
**API rodando em:** `http://localhost:3000`

**Scripts Disponíveis:**
- `npm start` - Inicia o servidor
- `npm test` - Executa testes com Jest
- `npm run seed` - Popula o banco com dados de exemplo

### 3. Frontend
Abra no navegador:
```
file:///C:/Users/User/Desktop/PetHope/Código/petHopeAtt/Web_PetHope/html/index.html
```

**Ou use um servidor local (recomendado):**
```bash
# Python
python -m http.server 8080

# Node.js
npx http-server -p 8080
```
Acesse: `http://localhost:8080/html/index.html`

---

## 📁 Estrutura do Projeto

```
Web_PetHope/
│
├── html/                      # Páginas HTML
│   ├── index.html             # 🏠 Home com carrossel de campanhas
│   ├── animais.html           # 🐕 Lista de pets (máx 6)
│   ├── campanhas.html         # 📢 Todas as campanhas ativas
│   ├── doacao-sangue.html     # 🩸 Informações educativas
│   ├── adocao.html            # ❤️ Como funciona a adoção
│   └── download.html          # 📱 Download dos apps
│
├── js/                        # Scripts JavaScript
│   ├── animais.js             # API: Busca e renderiza pets
│   └── campanhas.js           # API: Busca e renderiza campanhas
│
├── styles/                    # Folhas de estilo CSS
│   ├── download.css           # Master stylesheet (header/footer)
│   ├── style.css              # Estilos da home
│   ├── animais.css            # Estilos da página de animais
│   ├── campanhas.css          # Estilos da página de campanhas
│   ├── doa.css                # Estilos de doação de sangue
│   └── adocao.css             # Estilos da página de adoção
│
├── pethope-api/               # Backend Node.js/Express
│   ├── src/
│   │   ├── models/            # Modelos Mongoose (Pet, Campaign, User, History)
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── routes/            # Rotas da API REST
│   │   ├── middleware/        # Autenticação e validações
│   │   ├── config/            # Configurações (DB, Swagger)
│   │   └── services/          # Serviços auxiliares (upload, etc)
│   ├── tests/                 # Testes automatizados com Jest
│   ├── coverage/              # Relatórios de cobertura de testes
│   ├── server.js              # Entry point da API
│   └── package.json           # Dependências do backend
│
└── README.md                  # Este arquivo
```

---

## 🔗 API Endpoints

### Campanhas
- **GET** `/campaigns` - Lista todas as campanhas ativas
- **GET** `/campaigns/:id` - Detalhes de uma campanha específica
- **POST** `/campaigns` - Cria nova campanha (requer autenticação)
- **PUT** `/campaigns/:id` - Atualiza campanha (requer autenticação)
- **DELETE** `/campaigns/:id` - Remove campanha (requer autenticação)

### Pets
- **GET** `/pets` - Lista todos os pets disponíveis
- **GET** `/pets/:id` - Detalhes de um pet específico
- **POST** `/pets` - Cadastra novo pet (requer autenticação)
- **PUT** `/pets/:id` - Atualiza informações do pet (requer autenticação)
- **DELETE** `/pets/:id` - Remove pet (requer autenticação)

### Usuários
- **POST** `/users/register` - Cadastro de novo usuário
- **POST** `/users/login` - Autenticação de usuário
- **GET** `/users/profile` - Perfil do usuário logado

### Histórico
- **GET** `/history` - Histórico de adoções e doações
- **POST** `/history` - Registra nova entrada no histórico

**Base URL:** `http://localhost:3000`

**Documentação Completa:** Acesse `http://localhost:3000/api-docs` (Swagger UI)

---

## 💡 Funcionalidades

### 🌐 Plataforma Web (Somente Visualização)

#### Páginas Disponíveis

1. **Home** (`index.html`)
   - Carrossel de campanhas em destaque
   - Seções de call-to-action
   - Navegação rápida

2. **Animais** (`animais.html`)
   - Lista até 6 pets disponíveis para adoção
   - Cards com foto, nome, idade e espécie
   - Botão "Ver Mais" redireciona para download do app

3. **Campanhas** (`campanhas.html`)
   - Listagem completa de todas as campanhas ativas
   - Detalhes de cada campanha (título, descrição, organização)
   - Design em grid responsivo

4. **Doação de Sangue** (`doacao-sangue.html`)
   - Informações educativas sobre doação de sangue animal
   - Requisitos para doadores
   - Benefícios e importância da doação
   - Passo a passo do processo

5. **Como Funciona a Adoção** (`adocao.html`)
   - Processo de adoção responsável
   - Requisitos para adotantes
   - Documentação necessária

6. **Download** (`download.html`)
   - Links para download do app Android
   - Links para download do app Desktop (Windows)
   - Benefícios de usar os aplicativos

#### Recursos da Web
- ✅ Ver campanhas disponíveis
- ✅ Ver pets para adoção (limitado a 6)
- ✅ Informações sobre doação de sangue
- ✅ Entender o processo de adoção
- ❌ Solicitar adoção → Redireciona para download
- ❌ Cadastrar doador → Redireciona para download
- ❌ Criar campanhas → Redireciona para download

### 📱 Aplicativos (Funcionalidades Completas)

Os aplicativos mobile (Android) e desktop (Windows) oferecem:
- Cadastro e autenticação de usuários
- Solicitação de adoção de pets
- Cadastro como doador de sangue
- Criação e gerenciamento de campanhas (ONGs/Clínicas)
- Histórico de ações do usuário
- Notificações em tempo real

### 🔄 Fluxo de Uso

```
┌─────────────┐
│   Web       │  Visualização pública
│   Platform  │  Conhecer pets e campanhas
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Quer      │  
│  Interagir? │  Adotar, doar sangue, criar campanha
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Download   │  Baixar app Android ou Desktop
│     App     │  
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Mobile/   │  Funcionalidades completas
│   Desktop   │  Autenticação e ações
└─────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Interatividade e consumo de API
- **Font Awesome 6.0** - Ícones vetoriais

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **Bcrypt** - Criptografia de senhas
- **Multer** - Upload de arquivos
- **Swagger** - Documentação interativa da API

### Testes
- **Jest** - Framework de testes unitários
- **Supertest** - Testes de integração para APIs

### DevOps
- **Git/GitHub** - Controle de versão
- **npm** - Gerenciador de pacotes

---

## 🎨 Design System

### Paleta de Cores

| Cor       | Hex       | Uso                          |
|-----------|-----------|------------------------------|
| Vermelho  | `#ff493c` | Primária, CTAs, Logo         |
| Azul      | `#33aec4` | Secundária, Links, Destaques |
| Cinza     | `#555555` | Texto principal              |
| Branco    | `#ffffff` | Background, Header           |

### Tipografia
- **Font Family**: System fonts (sans-serif)
- **Headings**: Bold, tamanhos variáveis
- **Body**: Regular, 16px base

### Componentes Reutilizáveis
- **Header**: Branco com logo vermelho, links cinza → vermelho no hover
- **Footer**: Vermelho com 3 blocos (Download, Contato, Redes Sociais)
- **Cards**: Brancos com sombra sutil, hover com elevação
- **Botões**: Primário (vermelho), Secundário (outline branco)

---

## 📊 Banco de Dados

### Modelos (Schemas)

#### Pet
```javascript
{
  nome: String,
  especie: String,
  idade: String,
  imageUrl: String,
  status: String,
  tutorId: ObjectId,
  createdAt: Date
}
```

#### Campaign
```javascript
{
  titulo: String,
  descricao: String,
  organizacaoId: ObjectId,
  ativo: Boolean,
  createdAt: Date
}
```

#### User
```javascript
{
  nome: String,
  email: String,
  senha: String (hashed),
  tipo: String (tutor/ong/clinica),
  telefone: String,
  createdAt: Date
}
```

#### History
```javascript
{
  userId: ObjectId,
  acao: String,
  detalhes: Object,
  timestamp: Date
}
```

---

## 🧪 Testes

Execute a suíte de testes:

```bash
cd pethope-api
npm test
```

**Cobertura de Testes:**
- Controllers: 80%+
- Models: 90%+
- Routes: 85%+

Visualize o relatório de cobertura:
```bash
npm test -- --coverage
```

Relatório HTML disponível em: `pethope-api/coverage/lcov-report/index.html`

---

## 📝 Observações Importantes

### 🔒 Segurança
- **Autenticação JWT**: Apenas nos apps mobile/desktop
- **Sem autenticação na web**: Acesso público e somente leitura
- **Senhas criptografadas**: Bcrypt com salt rounds
- **Validação de dados**: Middleware de validação em todas as rotas

### 🖼️ Imagens
1. **Imagens vêm do banco de dados** - Campo `imageUrl` nos pets
2. **Suporte a URLs externas** ou Base64
3. **Fallback gracioso**: Ícone de pata com gradiente se imagem não carregar

### ⚡ Performance
- **Limitação de resultados**: Máximo 6 pets na página de animais
- **Carregamento assíncrono**: Fetch API com async/await
- **CSS otimizado**: Imports centralizados via `download.css`

### 🌍 Compatibilidade
- **Browsers modernos**: Chrome, Firefox, Safari, Edge
- **Responsivo**: Mobile-first design
- **Sem dependências de frameworks**: JavaScript puro

---

## 🚀 Roadmap

### ✅ Versão 1.0 (Atual)
- [x] Plataforma web de visualização
- [x] API REST completa
- [x] 6 páginas funcionais
- [x] Integração com MongoDB
- [x] Testes automatizados
- [x] Documentação Swagger

### 🔜 Próximas Features
- [ ] Busca e filtros avançados de pets
- [ ] Sistema de favoritos (local storage)
- [ ] Mapa de ONGs e clínicas parceiras
- [ ] Newsletter de novos pets
- [ ] Galeria de casos de sucesso
- [ ] Integração com redes sociais
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro

### 🎯 Futuro
- [ ] Chat em tempo real
- [ ] Agendamento de visitas
- [ ] Pagamentos integrados para doações
- [ ] Analytics e dashboards
- [ ] Multi-idiomas (i18n)

---

## 👩‍💻 Autora

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Maria22027">
        <img src="https://github.com/Maria22027.png" width="100px;" alt="Maria Eduarda"/><br>
        <sub>
          <b>Maria Eduarda</b>
        </sub>
      </a>
      <br>
      <sub>Desenvolvedora Full Stack</sub>
    </td>
  </tr>
</table>

### 📫 Contato

- **GitHub**: [@Maria22027](https://github.com/Maria22027)
- **Email**: [Contato via GitHub](https://github.com/Maria22027)

---

## 🌟 Agradecimentos

Obrigada a todos que contribuem para tornar o mundo um lugar melhor para os animais! 🐕🐈

- Comunidade open source
- ONGs parceiras
- Clínicas veterinárias
- Tutores responsáveis
- Todos os adotantes e doadores

---

## 📌 Status do Projeto

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=flat-square)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue?style=flat-square)
![Última Atualização](https://img.shields.io/badge/Última%20Atualização-Dezembro%202025-green?style=flat-square)

---

<div align="center">
  <h3>🐾 PetHope - Conectando corações e salvando vidas 🐶🐱</h3>
  <p><i>"Adotar é um ato de amor. Salvar uma vida não tem preço."</i></p>
  
  ⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
</div>

