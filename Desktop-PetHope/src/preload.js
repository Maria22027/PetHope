const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Métodos de autenticação
  login: (email, senha) => ipcRenderer.invoke('login', { email, senha }),
  register: (nome, email, senha, tipo, dadosAdicionais) => ipcRenderer.invoke('register', { nome, email, senha, tipo, dadosAdicionais }),
  checkApiConnection: () => ipcRenderer.invoke('check-api-connection'),
  
  // Navegação
  navigateTo: (page) => ipcRenderer.invoke('navigate-to', page),
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, page) => callback(page)),
  
  // Métodos para PETS
  listPets: (token) => ipcRenderer.invoke('list-pets', { token }),
  createPet: (token, data) => ipcRenderer.invoke('create-pet', { token, ...data }),
  updatePet: (token, petId, data) => ipcRenderer.invoke('update-pet', { token, petId, ...data }),
  deletePet: (token, petId) => ipcRenderer.invoke('delete-pet', { token, petId }),
  
  // Métodos para CAMPANHAS
  listCampaigns: (token) => ipcRenderer.invoke('list-campaigns', { token }),
  createCampaign: (token, data) => ipcRenderer.invoke('create-campaign', { token, ...data }),
  updateCampaign: (token, campaignId, data) => ipcRenderer.invoke('update-campaign', { token, campaignId, ...data }),
  deleteCampaign: (token, campaignId) => ipcRenderer.invoke('delete-campaign', { token, campaignId }),
  
  // Métodos para USUÁRIO
  getUserProfile: (token, userId) => ipcRenderer.invoke('get-user-profile', { token, userId }),
  updateUser: (token, userId, data) => ipcRenderer.invoke('update-user', { token, userId, ...data }),
  
  // LocalStorage helpers
  setToken: (token) => localStorage.setItem('pethope_token', token),
  getToken: () => localStorage.getItem('pethope_token'),
  clearToken: () => localStorage.removeItem('pethope_token'),
  
  setUser: (user) => localStorage.setItem('pethope_user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('pethope_user');
    return user ? JSON.parse(user) : null;
  },
  clearUser: () => localStorage.removeItem('pethope_user'),
  
  // Logout
  logout: () => {
    localStorage.removeItem('pethope_token');
    localStorage.removeItem('pethope_user');
  }
});

