// Configuração da API PetHope
const API_BASE_URL = 'http://localhost:3000';

// Classe para gerenciar requisições HTTP
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Método auxiliar para fazer requisições
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Adiciona token JWT se existir
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.error || `Erro ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Métodos de Usuário
    async registrarUsuario(nome, email, senha, tipo) {
        return this.request('/users/registrar', {
            method: 'POST',
            body: JSON.stringify({ nome, email, senha, tipo }),
        });
    }

    async loginUsuario(email, senha) {
        return this.request('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
        });
    }

    async listarUsuarios() {
        return this.request('/users');
    }

    // Métodos de Pets
    async criarPet(nome, especie, idade, descricao, status = 'adocao') {
        return this.request('/pets', {
            method: 'POST',
            body: JSON.stringify({ nome, especie, idade, descricao, status }),
        });
    }

    async listarPets() {
        return this.request('/pets');
    }

    async getPetPorId(id) {
        return this.request(`/pets/${id}`);
    }

    async atualizarPet(id, dados) {
        return this.request(`/pets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dados),
        });
    }

    async deletarPet(id) {
        return this.request(`/pets/${id}`, {
            method: 'DELETE',
        });
    }

    // Métodos de Campanhas
    async criarCampanha(titulo, descricao, status = 'ativa') {
        return this.request('/campaigns', {
            method: 'POST',
            body: JSON.stringify({ titulo, descricao, status }),
        });
    }

    async listarCampanhas() {
        return this.request('/campaigns');
    }

    // Métodos de Histórico
    async criarHistorico(tipo, descricao, petId = null, usuarioId = null) {
        return this.request('/history', {
            method: 'POST',
            body: JSON.stringify({ tipoEvento: tipo, descricao, petId, usuarioId }),
        });
    }

    async listarHistorico() {
        return this.request('/history');
    }

    async listarHistoricoPorUsuario(usuarioId) {
        return this.request(`/history/usuario/${usuarioId}`);
    }

    async listarHistoricoPorPet(petId) {
        return this.request(`/history/pet/${petId}`);
    }
}

// Instância global da API
const api = new ApiClient(API_BASE_URL);
