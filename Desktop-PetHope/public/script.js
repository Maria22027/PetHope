// script.js

let currentUser = null;
let currentToken = null;

// ============ Função para toggle de visibilidade de senha ============
function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const showPasswordSpan = event.target;
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showPasswordSpan.textContent = 'Esconder senha';
    } else {
        passwordField.type = 'password';
        showPasswordSpan.textContent = 'Mostrar senha';
    }
}

// ============ Função para mostrar/ocultar campos de registro ============
function updateRegisterFields() {
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    const ongFields = document.getElementById('ong-fields');
    const clinicaFields = document.getElementById('clinica-fields');
    
    // Ocultar todos
    ongFields.style.display = 'none';
    clinicaFields.style.display = 'none';
    
    // Mostrar baseado no tipo
    if (tipo === 'ong') {
        ongFields.style.display = 'block';
    } else if (tipo === 'clinica') {
        clinicaFields.style.display = 'block';
    }
}

// ============ Funções de Navegação entre Telas ============
function showLoginScreen() {
    hideAllScreens();
    document.getElementById('login-screen').classList.add('active');
    clearForm('login-form');
    clearMessages();
}

function showRegisterScreen() {
    hideAllScreens();
    document.getElementById('register-screen').classList.add('active');
    clearForm('register-form');
    clearMessages();
}

function showHomeScreen() {
    hideAllScreens();
    document.getElementById('home-screen').classList.add('active');
    updateUserInfo();
}

function showTutorRestrictedScreen() {
    hideAllScreens();
    document.getElementById('tutor-restricted-screen').classList.add('active');
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

function clearMessages() {
    document.querySelectorAll('.error-message, .loading-message').forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
}

// ============ Funções de Utilitário ============
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.remove('show');
}

function showLoading(elementId, message = 'Carregando...') {
    const loadingElement = document.getElementById(elementId);
    loadingElement.textContent = message;
    loadingElement.classList.add('show');
}

function hideLoading(elementId) {
    const loadingElement = document.getElementById(elementId);
    loadingElement.classList.remove('show');
}

function updateUserInfo() {
    if (currentUser) {
        console.log('Atualizando info do usuário:', currentUser);
        const userInfo = document.getElementById('user-info');
        const nomeExibicao = currentUser.nome || 'Usuário';
        userInfo.textContent = `Bem-vindo, ${nomeExibicao}! (${currentUser.tipo})`;
        
        // Atualizar status
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = `Conectado como ${currentUser.tipo}`;
        }
    }
}

// ============ Validação de Email ============
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============ Decodificar JWT ============
function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar JWT:', error);
        return null;
    }
}

// ============ Recuperar dados salvos ============
function loadStoredSession() {
    const storedToken = window.api.getToken();
    const storedUser = window.api.getUser();
    
    if (storedToken && storedUser) {
        currentToken = storedToken;
        currentUser = storedUser;
        return true;
    }
    return false;
}

// ============ Handler de Login ============
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-password').value;

    // Validação básica
    if (!email || !senha) {
        showError('login-error', 'Por favor, preencha todos os campos');
        return;
    }

    if (!isValidEmail(email)) {
        showError('login-error', 'Email inválido');
        return;
    }

    hideError('login-error');
    showLoading('login-loading', 'Fazendo login...');

    try {
        const result = await window.api.login(email, senha);
        console.log('Login result:', result);
        console.log('User object:', result.user);

        if (result.success) {
            hideLoading('login-loading');
            currentToken = result.token;
            currentUser = result.user;
            
            console.log('Login bem-sucedido!');
            console.log('Token:', currentToken);
            console.log('Usuário completo:', currentUser);
            console.log('Nome do usuário:', currentUser?.nome);
            console.log('Tipo do usuário:', currentUser?.tipo);
            
            // Armazenar dados localmente
            window.api.setToken(currentToken);
            window.api.setUser(currentUser);
            
            // Verificar se é tutor - tutores não têm acesso ao desktop
            if (currentUser && currentUser.tipo === 'tutor') {
                setTimeout(() => {
                    showTutorRestrictedScreen();
                }, 500);
            } else if (currentUser) {
                // Pequeno delay para melhor UX
                setTimeout(() => {
                    showHomeScreen();
                }, 500);
            } else {
                hideLoading('login-loading');
                showError('login-error', 'Erro ao processar dados do usuário. Tente novamente.');
            }
        } else {
            hideLoading('login-loading');
            showError('login-error', result.error);
            console.error('Login failed:', result.error);
        }
    } catch (error) {
        hideLoading('login-loading');
        showError('login-error', 'Erro ao conectar com o servidor. Verifique se a API está rodando.');
        console.error('Login exception:', error);
    }
});

// ============ Handler de Registro ============
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const senha = document.getElementById('register-password').value;
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;

    // Validação
    if (!nome || !email || !senha || !tipo) {
        showError('register-error', 'Por favor, preencha todos os campos');
        return;
    }

    if (nome.length < 3) {
        showError('register-error', 'Nome deve ter pelo menos 3 caracteres');
        return;
    }

    if (!isValidEmail(email)) {
        showError('register-error', 'Email inválido');
        return;
    }

    if (senha.length < 6) {
        showError('register-error', 'Senha deve ter pelo menos 6 caracteres');
        return;
    }

    // Validação de campos adicionais
    if (tipo === 'ong') {
        const nomeOrganizacao = document.getElementById('register-nomeOrganizacao').value.trim();
        const cnpj = document.getElementById('register-cnpj').value.trim();
        const endereco = document.getElementById('register-endereco-ong').value.trim();
        
        if (!nomeOrganizacao || !cnpj || !endereco) {
            showError('register-error', 'Por favor, preencha todos os campos da ONG');
            return;
        }
    } else if (tipo === 'clinica') {
        const nomeClinica = document.getElementById('register-nomeClinica').value.trim();
        const cnpj = document.getElementById('register-cnpj-clinica').value.trim();
        const crmv = document.getElementById('register-crmv').value.trim();
        const endereco = document.getElementById('register-endereco-clinica').value.trim();
        
        if (!nomeClinica || !cnpj || !crmv || !endereco) {
            showError('register-error', 'Por favor, preencha todos os campos da Clínica');
            return;
        }
    }

    hideError('register-error');
    showLoading('register-loading', 'Criando conta...');

    try {
        // Preparar dados adicionais
        let dadosAdicionais = {};
        
        if (tipo === 'ong') {
            dadosAdicionais = {
                nomeOrganizacao: document.getElementById('register-nomeOrganizacao').value.trim(),
                cnpj: document.getElementById('register-cnpj').value.trim(),
                telefone: document.getElementById('register-telefone-ong').value.trim(),
                endereco: document.getElementById('register-endereco-ong').value.trim()
            };
        } else if (tipo === 'clinica') {
            dadosAdicionais = {
                nomeClinica: document.getElementById('register-nomeClinica').value.trim(),
                cnpj: document.getElementById('register-cnpj-clinica').value.trim(),
                crmv: document.getElementById('register-crmv').value.trim(),
                telefone: document.getElementById('register-telefone-clinica').value.trim(),
                endereco: document.getElementById('register-endereco-clinica').value.trim()
            };
        }

        const result = await window.api.register(nome, email, senha, tipo, dadosAdicionais);

        if (result.success) {
            hideLoading('register-loading');
            
            // Sucesso! Voltar para login com mensagem
            setTimeout(() => {
                showLoginScreen();
                // Preencher email automaticamente
                document.getElementById('login-email').value = email;
                showError('login-error', 'Cadastro realizado com sucesso! Faça login agora.');
                document.getElementById('login-error').style.backgroundColor = '#c8e6c9';
                document.getElementById('login-error').style.color = '#2e7d32';
                document.getElementById('login-error').style.borderColor = '#4caf50';
            }, 500);
        } else {
            hideLoading('register-loading');
            showError('register-error', result.error);
        }
    } catch (error) {
        hideLoading('register-loading');
        showError('register-error', 'Erro ao conectar com o servidor. Verifique se a API está rodando.');
        console.error(error);
    }
});

// ============ Handler de Logout ============
function logout() {
    currentUser = null;
    currentToken = null;
    window.api.logout();
    showLoginScreen();
}

// ============ Inicialização ============
document.addEventListener('DOMContentLoaded', () => {
    // Tentar carregar sessão armazenada
    if (loadStoredSession()) {
        // Verificar se é tutor
        if (currentUser && currentUser.tipo === 'tutor') {
            showTutorRestrictedScreen();
        } else {
            showHomeScreen();
        }
    } else {
        showLoginScreen();
    }
});

// ============ Funções para PETS ============

function showPetsScreen() {
    hideAllScreens();
    document.getElementById('pets-screen').classList.add('active');
    loadPets();
}

async function loadPets() {
    const petsList = document.getElementById('pets-list');
    petsList.innerHTML = '<div class="loading">Carregando pets...</div>';

    try {
        const result = await window.api.listPets(currentToken);
        console.log('Load pets result:', result);

        if (result.success) {
            const pets = result.pets || [];
            console.log('Pets encontrados:', pets.length);
            console.log('Pets data:', pets);
            
            if (pets.length === 0) {
                petsList.innerHTML = '<div class="empty-state">Nenhum pet cadastrado ainda</div>';
                return;
            }

            petsList.innerHTML = pets.map(pet => {
                const statusBadge = getStatusBadge(pet.status);
                
                return `
                    <div class="item-card pet-card-simple">
                        <div class="item-header">
                            <div class="pet-header-left">
                                ${pet.imageUrl ? `<img src="${pet.imageUrl}" alt="${pet.nome}" class="pet-thumbnail" onclick="openImageModal('${pet.imageUrl}', '${pet.nome}')">` : '<div class="pet-thumbnail-empty">🐾</div>'}
                                <h3>${pet.nome || 'Sem nome'}</h3>
                            </div>
                            <div class="status-badges">
                                ${statusBadge}
                            </div>
                        </div>
                        <div class="item-info">
                            <p><strong>Espécie:</strong> ${pet.especie || 'N/A'}</p>
                            <p><strong>Idade:</strong> ${pet.idade || 0} ano(s)</p>
                            ${pet.tipoSanguineo ? `<p><strong>Tipo Sanguíneo:</strong> ${pet.tipoSanguineo}</p>` : ''}
                            ${pet.descricao ? `<p><strong>Descrição:</strong> ${pet.descricao}</p>` : ''}
                        </div>
                        <div class="item-actions">
                            <button class="btn-edit" onclick="editPet('${pet._id}')">Editar</button>
                            <button class="btn-delete" onclick="deletePet('${pet._id}')">Excluir</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            petsList.innerHTML = `<div class="error-state">Erro ao carregar pets: ${result.error}</div>`;
        }
    } catch (error) {
        petsList.innerHTML = `<div class="error-state">Erro ao carregar pets</div>`;
        console.error(error);
    }
}

function getStatusBadge(status) {
    const statusMap = {
        'adocao': '🏠 Adoção',
        'doacao-sangue': '🩸 Doação de Sangue',
        'adocao-doacao-sangue': '🏠🩸 Adoção + Doação'
    };
    return `<span class="status-badge status-${status}">${statusMap[status] || status}</span>`;
}

// Função para abrir modal com imagem ampliada
function openImageModal(imageUrl, petName) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <img src="${imageUrl}" alt="${petName}">
            <p>${petName}</p>
        </div>
    `;
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);
}

function showNewPetModal() {
    document.getElementById('pet-modal-title').textContent = 'Novo Pet';
    document.getElementById('pet-id').value = '';
    document.getElementById('pet-form').reset();
    document.getElementById('pet-modal-error').textContent = '';
    currentPetFoto = null;
    document.getElementById('pet-foto-preview').innerHTML = '';
    document.getElementById('pet-modal').style.display = 'block';
}

function closePetModal() {
    document.getElementById('pet-modal').style.display = 'none';
}

async function editPet(petId) {
    const pets = await window.api.listPets(currentToken);
    if (pets.success) {
        const pet = pets.pets.find(p => p._id === petId);
        if (pet) {
            document.getElementById('pet-modal-title').textContent = 'Editar Pet';
            document.getElementById('pet-id').value = pet._id;
            document.getElementById('pet-nome').value = pet.nome;
            document.getElementById('pet-especie').value = pet.especie;
            document.getElementById('pet-idade').value = pet.idade;
            document.getElementById('pet-tipoSanguineo').value = pet.tipoSanguineo || '';
            document.getElementById('pet-status').value = pet.status;
            document.getElementById('pet-descricao').value = pet.descricao;
            
            // Carregar foto existente
            if (pet.imageUrl) {
                currentPetFoto = pet.imageUrl;
                document.getElementById('pet-foto-preview').innerHTML = `
                    <img src="${pet.imageUrl}" alt="Foto do pet">
                    <button type="button" class="btn-remove-foto" onclick="removeFoto()">Remover Foto</button>
                `;
            } else {
                currentPetFoto = null;
                document.getElementById('pet-foto-preview').innerHTML = '';
            }
            
            document.getElementById('pet-modal-error').textContent = '';
            document.getElementById('pet-modal').style.display = 'block';
        }
    }
}

async function deletePet(petId) {
    if (!confirm('Tem certeza que deseja excluir este pet?')) {
        return;
    }

    try {
        const result = await window.api.deletePet(currentToken, petId);

        if (result.success) {
            loadPets();
        } else {
            alert('Erro ao excluir pet: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao excluir pet');
        console.error(error);
    }
}

// ============ Funções para Upload de Foto ============
let currentPetFoto = null;

// Preview da foto quando selecionada
document.getElementById('pet-foto')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) {
        currentPetFoto = null;
        document.getElementById('pet-foto-preview').innerHTML = '';
        return;
    }

    // Validar tamanho (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB');
        e.target.value = '';
        return;
    }

    // Converter para base64
    const reader = new FileReader();
    reader.onload = (event) => {
        currentPetFoto = event.target.result;
        document.getElementById('pet-foto-preview').innerHTML = `
            <img src="${currentPetFoto}" alt="Preview">
            <button type="button" class="btn-remove-foto" onclick="removeFoto()">Remover Foto</button>
        `;
    };
    reader.readAsDataURL(file);
});

function removeFoto() {
    currentPetFoto = null;
    document.getElementById('pet-foto').value = '';
    document.getElementById('pet-foto-preview').innerHTML = '';
}

document.getElementById('pet-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const petId = document.getElementById('pet-id').value;
    const nome = document.getElementById('pet-nome').value.trim();
    const especie = document.getElementById('pet-especie').value.trim();
    const idade = parseInt(document.getElementById('pet-idade').value);
    const tipoSanguineo = document.getElementById('pet-tipoSanguineo').value.trim();
    const status = document.getElementById('pet-status').value;
    const descricao = document.getElementById('pet-descricao').value.trim();

    if (!nome || !especie || !idade || !status) {
        document.getElementById('pet-modal-error').textContent = 'Por favor, preencha todos os campos obrigatórios';
        return;
    }

    document.getElementById('pet-modal-error').textContent = '';
    document.getElementById('pet-modal-loading').textContent = 'Salvando...';

    try {
        let result;
        const petData = { nome, especie, idade, tipoSanguineo, status, descricao };
        
        // Adicionar imageUrl se houver
        if (currentPetFoto) {
            petData.imageUrl = currentPetFoto;
        }
        
        if (petId) {
            result = await window.api.updatePet(currentToken, petId, petData);
        } else {
            result = await window.api.createPet(currentToken, petData);
        }

        if (result.success) {
            document.getElementById('pet-modal-loading').textContent = '';
            closePetModal();
            loadPets();
        } else {
            document.getElementById('pet-modal-loading').textContent = '';
            document.getElementById('pet-modal-error').textContent = result.error;
        }
    } catch (error) {
        document.getElementById('pet-modal-loading').textContent = '';
        document.getElementById('pet-modal-error').textContent = 'Erro ao salvar pet';
        console.error(error);
    }
});

// ============ Funções para CAMPANHAS ============

function showCampaignsScreen() {
    hideAllScreens();
    document.getElementById('campaigns-screen').classList.add('active');
    loadCampaigns();
}

async function loadCampaigns() {
    const campaignsList = document.getElementById('campaigns-list');
    campaignsList.innerHTML = '<div class="loading">Carregando campanhas...</div>';

    try {
        const result = await window.api.listCampaigns(currentToken);

        if (result.success) {
            const campaigns = result.campaigns || [];
            
            if (campaigns.length === 0) {
                campaignsList.innerHTML = '<div class="empty-state">Nenhuma campanha cadastrada ainda</div>';
                return;
            }

            campaignsList.innerHTML = campaigns.map(campaign => {
                // Tratar data que pode estar em diferentes formatos
                let dataFormatada = 'Data não disponível';
                if (campaign.data) {
                    try {
                        const dataObj = typeof campaign.data === 'string' ? new Date(campaign.data) : new Date(campaign.data);
                        dataFormatada = dataObj.toLocaleDateString('pt-BR');
                    } catch (e) {
                        console.error('Erro ao formatar data:', e);
                    }
                }
                
                return `
                    <div class="item-card">
                        <div class="item-header">
                            <h3>${campaign.titulo}</h3>
                        </div>
                        <div class="item-info">
                            <p><strong>Descrição:</strong> ${campaign.descricao}</p>
                            <p><strong>Data:</strong> ${dataFormatada}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-edit" onclick="editCampaign('${campaign._id}')">Editar</button>
                            <button class="btn-delete" onclick="deleteCampaign('${campaign._id}')">Excluir</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            campaignsList.innerHTML = `<div class="error-state">Erro ao carregar campanhas: ${result.error}</div>`;
        }
    } catch (error) {
        campaignsList.innerHTML = `<div class="error-state">Erro ao carregar campanhas</div>`;
        console.error(error);
    }
}

function showNewCampaignModal() {
    document.getElementById('campaign-modal-title').textContent = 'Nova Campanha';
    document.getElementById('campaign-id').value = '';
    document.getElementById('campaign-form').reset();
    document.getElementById('campaign-modal-error').textContent = '';
    document.getElementById('campaign-modal').style.display = 'block';
}

function closeCampaignModal() {
    document.getElementById('campaign-modal').style.display = 'none';
}

async function editCampaign(campaignId) {
    const campaignsResult = await window.api.listCampaigns(currentToken);
    if (campaignsResult.success) {
        const campaign = campaignsResult.campaigns.find(c => c._id === campaignId);
        if (campaign) {
            document.getElementById('campaign-modal-title').textContent = 'Editar Campanha';
            document.getElementById('campaign-id').value = campaign._id;
            document.getElementById('campaign-titulo').value = campaign.titulo;
            document.getElementById('campaign-descricao').value = campaign.descricao;
            document.getElementById('campaign-modal-error').textContent = '';
            document.getElementById('campaign-modal').style.display = 'block';
        }
    }
}

async function deleteCampaign(campaignId) {
    if (!confirm('Tem certeza que deseja finalizar esta campanha?')) {
        return;
    }

    try {
        const result = await window.api.deleteCampaign(currentToken, campaignId);

        if (result.success) {
            loadCampaigns();
        } else {
            alert('Erro ao finalizar campanha: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao finalizar campanha');
        console.error(error);
    }
}

document.getElementById('campaign-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const campaignId = document.getElementById('campaign-id').value;
    const titulo = document.getElementById('campaign-titulo').value.trim();
    const descricao = document.getElementById('campaign-descricao').value.trim();

    if (!titulo || !descricao) {
        document.getElementById('campaign-modal-error').textContent = 'Por favor, preencha todos os campos';
        return;
    }

    document.getElementById('campaign-modal-error').textContent = '';
    document.getElementById('campaign-modal-loading').textContent = 'Salvando...';

    try {
        let result;
        
        if (campaignId) {
            result = await window.api.updateCampaign(currentToken, campaignId, {
                titulo, descricao
            });
        } else {
            result = await window.api.createCampaign(currentToken, {
                titulo, descricao
            });
        }

        if (result.success) {
            document.getElementById('campaign-modal-loading').textContent = '';
            closeCampaignModal();
            loadCampaigns();
        } else {
            document.getElementById('campaign-modal-loading').textContent = '';
            document.getElementById('campaign-modal-error').textContent = result.error;
        }
    } catch (error) {
        document.getElementById('campaign-modal-loading').textContent = '';
        document.getElementById('campaign-modal-error').textContent = 'Erro ao salvar campanha';
        console.error(error);
    }
});

// ============ Funções para USER PROFILE ============

function showUserScreen() {
    hideAllScreens();
    document.getElementById('user-screen').classList.add('active');
    displayUserProfile();
}

async function displayUserProfile() {
    const userInfoContainer = document.getElementById('user-info-container');
    
    if (!currentUser) {
        userInfoContainer.innerHTML = '<div class="error-state">Usuário não autenticado</div>';
        return;
    }

    try {
        // Usar dados já armazenados do localStorage
        let userFullData = currentUser;
        console.log('Using user data:', userFullData);

        // Construir HTML dinamicamente baseado nos campos disponíveis
        let profileHTML = '';
        
        // Campos básicos
        if (userFullData.nome) {
            profileHTML += `
                <div class="user-info-item">
                    <label>Nome:</label>
                    <p>${userFullData.nome}</p>
                </div>
            `;
        }

        if (userFullData.email) {
            profileHTML += `
                <div class="user-info-item">
                    <label>Email:</label>
                    <p>${userFullData.email}</p>
                </div>
            `;
        }

        if (userFullData.tipo) {
            profileHTML += `
                <div class="user-info-item">
                    <label>Tipo de Usuário:</label>
                    <p>${userFullData.tipo}</p>
                </div>
            `;
        }

        // Campos específicos por tipo de usuário
        if (userFullData.tipo === 'ong') {
            if (userFullData.nomeOrganizacao) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>Nome da Organização:</label>
                        <p>${userFullData.nomeOrganizacao}</p>
                    </div>
                `;
            }
            if (userFullData.cnpj) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>CNPJ:</label>
                        <p>${userFullData.cnpj}</p>
                    </div>
                `;
            }
            if (userFullData.telefone) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>Telefone:</label>
                        <p>${userFullData.telefone}</p>
                    </div>
                `;
            }
            if (userFullData.endereco) {
                const enderecoCompleto = `${userFullData.endereco.rua || ''}, ${userFullData.endereco.cidade || ''} - ${userFullData.endereco.uf || ''}`;
                profileHTML += `
                    <div class="user-info-item">
                        <label>Endereço:</label>
                        <p>${enderecoCompleto}</p>
                    </div>
                `;
            }
        } else if (userFullData.tipo === 'clinica') {
            if (userFullData.nomeClinica) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>Nome da Clínica:</label>
                        <p>${userFullData.nomeClinica}</p>
                    </div>
                `;
            }
            if (userFullData.cnpj) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>CNPJ:</label>
                        <p>${userFullData.cnpj}</p>
                    </div>
                `;
            }
            if (userFullData.crmv) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>CRMV:</label>
                        <p>${userFullData.crmv}</p>
                    </div>
                `;
            }
            if (userFullData.telefone) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>Telefone:</label>
                        <p>${userFullData.telefone}</p>
                    </div>
                `;
            }
            if (userFullData.endereco) {
                const enderecoCompleto = `${userFullData.endereco.rua || ''}, ${userFullData.endereco.cidade || ''} - ${userFullData.endereco.uf || ''}`;
                profileHTML += `
                    <div class="user-info-item">
                        <label>Endereço:</label>
                        <p>${enderecoCompleto}</p>
                    </div>
                `;
            }
        } else if (userFullData.tipo === 'tutor') {
            if (userFullData.telefone) {
                profileHTML += `
                    <div class="user-info-item">
                        <label>Telefone:</label>
                        <p>${userFullData.telefone}</p>
                    </div>
                `;
            }
        }

        // ID sempre no final
        if (userFullData._id) {
            profileHTML += `
                <div class="user-info-item">
                    <label>ID:</label>
                    <p>${userFullData._id}</p>
                </div>
            `;
        }

        // Se não houver nenhuma informação
        if (!profileHTML) {
            profileHTML = '<div class="error-state">Nenhuma informação disponível</div>';
        }

        userInfoContainer.innerHTML = profileHTML;
    } catch (error) {
        console.error('Erro ao exibir perfil:', error);
        userInfoContainer.innerHTML = '<div class="error-state">Erro ao carregar informações do perfil</div>';
    }
}

// ============ Funções para EDITAR PERFIL ============

function showEditProfileModal() {
    if (!currentUser) {
        alert('Erro: usuário não encontrado');
        return;
    }

    // Preencher campos básicos
    document.getElementById('edit-nome').value = currentUser.nome || '';
    document.getElementById('edit-email').value = currentUser.email || '';
    document.getElementById('edit-telefone').value = currentUser.telefone || '';
    
    // Limpar senha
    document.getElementById('edit-senha').value = '';
    
    // Mostrar/ocultar campos específicos por tipo
    document.getElementById('edit-ong-fields').style.display = 'none';
    document.getElementById('edit-clinica-fields').style.display = 'none';
    
    if (currentUser.tipo === 'ong') {
        document.getElementById('edit-ong-fields').style.display = 'block';
        document.getElementById('edit-nomeOrganizacao').value = currentUser.nomeOrganizacao || '';
        document.getElementById('edit-cnpj').value = currentUser.cnpj || '';
    } else if (currentUser.tipo === 'clinica') {
        document.getElementById('edit-clinica-fields').style.display = 'block';
        document.getElementById('edit-nomeClinica').value = currentUser.nomeClinica || '';
        document.getElementById('edit-cnpj-clinica').value = currentUser.cnpj || '';
        document.getElementById('edit-crmv').value = currentUser.crmvResponsavel || '';
    }
    
    // Preencher endereço
    if (currentUser.endereco) {
        document.getElementById('edit-endereco-rua').value = currentUser.endereco.rua || '';
        document.getElementById('edit-endereco-cidade').value = currentUser.endereco.cidade || '';
        document.getElementById('edit-endereco-uf').value = currentUser.endereco.uf || '';
    } else {
        document.getElementById('edit-endereco-rua').value = '';
        document.getElementById('edit-endereco-cidade').value = '';
        document.getElementById('edit-endereco-uf').value = '';
    }
    
    document.getElementById('edit-profile-modal-error').textContent = '';
    document.getElementById('edit-profile-modal').style.display = 'block';
}

function closeEditProfileModal() {
    document.getElementById('edit-profile-modal').style.display = 'none';
}

// Handler do formulário de editar perfil
document.getElementById('edit-profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('edit-nome').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const telefone = document.getElementById('edit-telefone').value.trim();
    const senha = document.getElementById('edit-senha').value;

    if (!nome || !email) {
        document.getElementById('edit-profile-modal-error').textContent = 'Nome e email são obrigatórios';
        return;
    }

    document.getElementById('edit-profile-modal-error').textContent = '';
    document.getElementById('edit-profile-modal-loading').textContent = 'Salvando...';

    try {
        const dadosAtualizacao = {
            nome,
            email,
            telefone
        };

        // Adicionar senha se fornecida
        if (senha) {
            dadosAtualizacao.senha = senha;
        }

        // Adicionar dados específicos por tipo
        if (currentUser.tipo === 'ong') {
            dadosAtualizacao.nomeOrganizacao = document.getElementById('edit-nomeOrganizacao').value.trim();
            dadosAtualizacao.cnpj = document.getElementById('edit-cnpj').value.trim();
        } else if (currentUser.tipo === 'clinica') {
            dadosAtualizacao.nomeClinica = document.getElementById('edit-nomeClinica').value.trim();
            dadosAtualizacao.cnpj = document.getElementById('edit-cnpj-clinica').value.trim();
            dadosAtualizacao.crmvResponsavel = document.getElementById('edit-crmv').value.trim();
        }

        // Adicionar endereço
        const rua = document.getElementById('edit-endereco-rua').value.trim();
        const cidade = document.getElementById('edit-endereco-cidade').value.trim();
        const uf = document.getElementById('edit-endereco-uf').value.trim().toUpperCase();

        if (rua || cidade || uf) {
            dadosAtualizacao.endereco = { rua, cidade, uf };
        }

        const result = await window.api.updateUser(currentToken, currentUser._id, dadosAtualizacao);

        if (result.success) {
            document.getElementById('edit-profile-modal-loading').textContent = '';
            
            // Atualizar currentUser com os novos dados
            currentUser = { ...currentUser, ...result.user };
            window.api.setUser(currentUser);
            
            // Atualizar display do nome na home
            updateUserInfo();
            
            closeEditProfileModal();
            displayUserProfile();
            
            alert('Perfil atualizado com sucesso!');
        } else {
            document.getElementById('edit-profile-modal-loading').textContent = '';
            document.getElementById('edit-profile-modal-error').textContent = result.error;
        }
    } catch (error) {
        document.getElementById('edit-profile-modal-loading').textContent = '';
        document.getElementById('edit-profile-modal-error').textContent = 'Erro ao atualizar perfil';
        console.error(error);
    }
});

// Fechar modais ao clicar fora
window.addEventListener('click', (event) => {
    const petModal = document.getElementById('pet-modal');
    const campaignModal = document.getElementById('campaign-modal');
    
    if (event.target === petModal) {
        closePetModal();
    }
    if (event.target === campaignModal) {
        closeCampaignModal();
    }
});