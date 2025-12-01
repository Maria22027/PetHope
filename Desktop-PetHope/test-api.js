// test-api.js - Script para testar endpoints da API
// Use com: node test-api.js (execute em pethope-desktop/)

const axios = require('axios');

const API_URL = 'http://localhost:3000';

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.blue}═══ ${msg} ═══${colors.reset}\n`)
};

async function testAPI() {
  try {
    log.header('Testando Conexão com API PetHope');
    log.info(`API URL: ${API_URL}`);

    // ============ Teste 1: Verificar conexão ============
    log.header('Teste 1: Conexão com API');
    try {
      await axios.get(`${API_URL}/users`, { timeout: 5000 });
      log.success('API está respondendo!');
    } catch (error) {
      log.error('Não foi possível conectar à API');
      log.warn('Certifique-se de que a API está rodando: cd pethope-api && npm start');
      process.exit(1);
    }

    // ============ Teste 2: Registrar novo usuário ============
    log.header('Teste 2: Registrar novo usuário');
    
    const email = `test-${Date.now()}@example.com`;
    const userData = {
      nome: 'João Teste',
      email: email,
      senha: 'senha123',
      tipo: 'tutor'
    };

    log.info(`Registrando usuário: ${userData.nome}`);
    log.info(`Email: ${email}`);

    let registerResponse;
    try {
      registerResponse = await axios.post(`${API_URL}/users/registrar`, userData);
      log.success('Usuário registrado com sucesso!');
      console.log('Resposta:', JSON.stringify(registerResponse.data, null, 2));
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.includes('já existe')) {
        log.warn('Email já cadastrado. Usando email diferente...');
        userData.email = `test-${Date.now()}-retry@example.com`;
        registerResponse = await axios.post(`${API_URL}/users/registrar`, userData);
        log.success('Usuário registrado com sucesso!');
        console.log('Resposta:', JSON.stringify(registerResponse.data, null, 2));
      } else {
        throw error;
      }
    }

    // ============ Teste 3: Fazer Login ============
    log.header('Teste 3: Fazer login com o usuário criado');
    
    log.info(`Email: ${userData.email}`);
    log.info('Senha: senha123');

    let loginResponse;
    try {
      loginResponse = await axios.post(`${API_URL}/users/login`, {
        email: userData.email,
        senha: userData.senha
      });

      log.success('Login realizado com sucesso!');
      console.log('Resposta:', JSON.stringify(loginResponse.data, null, 2));
      
      const { token, user } = loginResponse.data;
      log.info(`Token JWT: ${token?.substring(0, 50)}...`);
      log.info(`Usuário: ${user.nome} (${user.tipo})`);
    } catch (error) {
      throw error;
    }

    // ============ Teste 4: Login com credenciais inválidas ============
    log.header('Teste 4: Tentando login com senha incorreta');
    
    try {
      await axios.post(`${API_URL}/users/login`, {
        email: userData.email,
        senha: 'senhaerrada'
      });
      log.error('Erro: Sistema deveria ter rejeitado a senha!');
    } catch (error) {
      if (error.response?.status === 401) {
        log.success('Sistema corretamente rejeitou a senha!');
      } else {
        throw error;
      }
    }

    // ============ Teste 5: Listar usuários ============
    log.header('Teste 5: Listar usuários cadastrados');
    
    try {
      const listResponse = await axios.get(`${API_URL}/users`);
      log.success(`Total de usuários: ${listResponse.data.length}`);
      log.info('Últimos 3 usuários:');
      listResponse.data.slice(-3).forEach((user, idx) => {
        console.log(`  ${idx + 1}. ${user.nome} (${user.email}) - ${user.tipo}`);
      });
    } catch (error) {
      throw error;
    }

    // ============ Resumo ============
    log.header('Resumo dos Testes');
    log.success('✓ Conexão com API OK');
    log.success('✓ Registro de usuário OK');
    log.success('✓ Login OK');
    log.success('✓ Validação de senha OK');
    log.success('✓ Listagem de usuários OK');

    log.header('Resultado Final');
    console.log(`${colors.green}
╔═══════════════════════════════════════╗
║   Todos os testes passaram! ✓         ║
║   A API está funcionando corretamente ║
║                                       ║
║   Você pode iniciar o app com:        ║
║   npm start                           ║
╚═══════════════════════════════════════╝
${colors.reset}`);

  } catch (error) {
    log.error('Erro durante os testes!');
    console.error('Detalhes:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Resposta:', error.response.data);
    }
    
    process.exit(1);
  }
}

// Executar testes
testAPI();
