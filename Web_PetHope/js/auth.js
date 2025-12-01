// Gerenciamento de autenticação e localStorage
class Auth {
    constructor() {
        this.tokenKey = 'token';
        this.userKey = 'user';
    }

    // Salvar token e dados do usuário após login
    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    setUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    // Recuperar token e dados do usuário
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    getUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getToken();
    }

    // Fazer logout
    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    // Redirecionar se não autenticado
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/pages/login.html';
        }
    }

    // Redirecionar se já autenticado
    requireGuest() {
        if (this.isAuthenticated()) {
            window.location.href = '/index.html';
        }
    }
}

// Instância global de autenticação
const auth = new Auth();

// Verificar autenticação no carregamento da página (se necessário)
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar informações do usuário no header se autenticado
    if (auth.isAuthenticated()) {
        const user = auth.getUser();
        console.log('Usuário autenticado:', user.nome);
    }
});
