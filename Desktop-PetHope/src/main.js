const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

// Configuração
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const API_TIMEOUT = 10000;

let mainWindow;

// Criar instância axios com timeout
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  
  // Descomente para debug:
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  console.log('🚀 PetHope Desktop App iniciando...');
  console.log(`📡 API URL: ${API_BASE_URL}`);
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers para Login
ipcMain.handle('login', async (event, { email, senha }) => {
  try {
    // Validação básica do lado do servidor
    if (!email || !senha) {
      return {
        success: false,
        error: 'Email e senha são obrigatórios'
      };
    }

    console.log('Tentando login com email:', email);
    const response = await apiClient.post('/users/login', {
      email,
      senha
    });

    console.log('Response data:', response.data);
    console.log('Token:', response.data.token);
    console.log('User from API:', response.data.user);

    // A API agora retorna 'user' em vez de 'usuario'
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    console.error('Login error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response?.status, error.response?.data);
    
    // Tratamento específico de erros
    if (error.code === 'ECONNREFUSED') {
      return {
        success: false,
        error: 'Não foi possível conectar à API. Verifique se o servidor está rodando.'
      };
    }

    // Se houver resposta da API, usar a mensagem dela
    if (error.response?.data?.error) {
      return {
        success: false,
        error: error.response.data.error
      };
    }

    // Se houver status code, significa que conectou mas teve um erro
    if (error.response?.status) {
      return {
        success: false,
        error: error.response.data?.message || 'Email ou senha incorretos. Tente novamente.'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Erro ao fazer login. Tente novamente.'
    };
  }
});

// IPC Handlers para Registro
ipcMain.handle('register', async (event, { nome, email, senha, tipo, dadosAdicionais }) => {
  try {
    // Validação básica
    if (!nome || !email || !senha || !tipo) {
      return {
        success: false,
        error: 'Todos os campos são obrigatórios'
      };
    }

    // Preparar dados para enviar à API
    const dadosRegistro = {
      nome,
      email,
      senha,
      tipo,
      ...dadosAdicionais // Incluir dados adicionais de ONG/Clínica
    };

    console.log('Registrando usuário com dados:', dadosRegistro);

    const response = await apiClient.post('/users/registrar', dadosRegistro);

    return {
      success: true,
      user: response.data
    };
  } catch (error) {
    console.error('Register error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return {
        success: false,
        error: 'Não foi possível conectar à API. Verifique se o servidor está rodando.'
      };
    }

    // Erro de duplicação (email já existe)
    if (error.response?.status === 400) {
      return {
        success: false,
        error: 'Este email já está cadastrado. Tente com outro ou faça login.'
      };
    }
    
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao registrar. Tente novamente.'
    };
  }
});

// IPC Handler para verificar conexão com API
ipcMain.handle('check-api-connection', async (event) => {
  try {
    const response = await apiClient.get('/users');
    return { connected: true };
  } catch (error) {
    return { connected: false };
  }
});

// IPC Handler para navegar entre telas
ipcMain.handle('navigate-to', (event, page) => {
  if (mainWindow) {
    mainWindow.webContents.send('navigate', page);
  }
});

// ============ IPC Handlers para PETS ============

// Listar todos os pets
ipcMain.handle('list-pets', async (event, { token }) => {
  try {
    const response = await apiClient.get('/pets', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true,
      pets: response.data
    };
  } catch (error) {
    console.error('List pets error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao listar pets.'
    };
  }
});

// Criar novo pet
ipcMain.handle('create-pet', async (event, { token, nome, especie, idade, tipoSanguineo, status, descricao, imageUrl }) => {
  try {
    const petData = { nome, especie, idade, tipoSanguineo, status, descricao };
    
    // Adicionar imageUrl se existir
    if (imageUrl) {
      petData.imageUrl = imageUrl;
    }
    
    const response = await apiClient.post(
      '/pets',
      petData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return {
      success: true,
      pet: response.data
    };
  } catch (error) {
    console.error('Create pet error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao criar pet.'
    };
  }
});

// Atualizar pet
ipcMain.handle('update-pet', async (event, { token, petId, nome, especie, idade, tipoSanguineo, status, descricao, imageUrl }) => {
  try {
    const petData = { nome, especie, idade, tipoSanguineo, status, descricao };
    
    // Adicionar imageUrl se existir
    if (imageUrl) {
      petData.imageUrl = imageUrl;
    }
    
    const response = await apiClient.put(
      `/pets/${petId}`,
      petData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return {
      success: true,
      pet: response.data
    };
  } catch (error) {
    console.error('Update pet error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao atualizar pet.'
    };
  }
});

// Deletar pet
ipcMain.handle('delete-pet', async (event, { token, petId }) => {
  try {
    await apiClient.delete(`/pets/${petId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true
    };
  } catch (error) {
    console.error('Delete pet error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao deletar pet.'
    };
  }
});

// ============ IPC Handlers para CAMPANHAS ============

// Listar todas as campanhas
ipcMain.handle('list-campaigns', async (event, { token }) => {
  try {
    const response = await apiClient.get('/campaigns', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true,
      campaigns: response.data
    };
  } catch (error) {
    console.error('List campaigns error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao listar campanhas.'
    };
  }
});

// Criar nova campanha
ipcMain.handle('create-campaign', async (event, { token, titulo, descricao }) => {
  try {
    const response = await apiClient.post(
      '/campaigns',
      { titulo, descricao },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return {
      success: true,
      campaign: response.data
    };
  } catch (error) {
    console.error('Create campaign error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao criar campanha.'
    };
  }
});

// Atualizar campanha
ipcMain.handle('update-campaign', async (event, { token, campaignId, titulo, descricao }) => {
  try {
    const response = await apiClient.put(
      `/campaigns/${campaignId}`,
      { titulo, descricao },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return {
      success: true,
      campaign: response.data
    };
  } catch (error) {
    console.error('Update campaign error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao atualizar campanha.'
    };
  }
});

// Deletar/Finalizar campanha
ipcMain.handle('delete-campaign', async (event, { token, campaignId }) => {
  try {
    await apiClient.delete(`/campaigns/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true
    };
  } catch (error) {
    console.error('Delete campaign error:', error.message);
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao deletar campanha.'
    };
  }
});

// ============ IPC Handler para GET USER PROFILE ============

ipcMain.handle('get-user-profile', async (event, { token, userId }) => {
  try {
    // Tenta buscar os dados completos do usuário pela API
    const response = await apiClient.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true,
      user: response.data
    };
  } catch (error) {
    console.error('Get user profile error:', error.message);
    // Se falhar, retorna sucesso vazio para não quebrar a experiência
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao buscar dados do usuário.'
    };
  }
});

// ============ IPC Handler para UPDATE USER ============

ipcMain.handle('update-user', async (event, { token, userId, ...dadosAtualizacao }) => {
  try {
    console.log('Atualizando usuário:', userId, dadosAtualizacao);
    
    const response = await apiClient.put(`/users/${userId}`, dadosAtualizacao, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      success: true,
      user: response.data
    };
  } catch (error) {
    console.error('Update user error:', error.message);
    console.error('Error response:', error.response?.data);
    
    return {
      success: false,
      error: error.response?.data?.error || 'Erro ao atualizar usuário.'
    };
  }
});

