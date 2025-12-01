// Função para gerenciar exibição de login/usuário
function updateUserUI() {
    const perfilLink = document.getElementById('perfil-link');
    const userLogout = document.getElementById('userLogout');
    const loginLink = document.getElementById('loginLink');
    
    if (auth.isAuthenticated()) {
        const user = auth.getUser();
        perfilLink.style.display = 'inline';
        perfilLink.textContent = `👤 ${user.nome}`;
        userLogout.style.display = 'inline';
        loginLink.style.display = 'none';
    } else {
        perfilLink.style.display = 'none';
        userLogout.style.display = 'none';
        loginLink.style.display = 'inline';
    }
}

function handleUserMenu(event) {
    const confirmed = confirm('Deseja fazer logout?');
    if (confirmed) {
        auth.logout();
        window.location.href = 'index.html';
    }
}

// Função para carregar os animais da API
async function carregarAnimais() {
    const container = document.getElementById("lista-animais");
    if (!container) return;

    try {
        const pets = await api.listarPets();
        
        if (pets.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum animal disponível</p>';
            return;
        }

        container.innerHTML = pets.map(pet => `
            <div class="card">
                <img src="../img/placeholder.jpg" alt="${pet.nome}">
                <h3>${pet.nome}</h3>
                <p>Tipo: ${pet.especie}</p>
                <p>Idade: ${pet.idade || 'Desconhecida'}</p>
                <a class="btn" href="pages/detalhes.html?id=${pet._id}">Saiba Mais</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar animais:', error);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Erro ao carregar animais</p>';
    }
}

// Carregar dados ao abrir página
document.addEventListener('DOMContentLoaded', () => {
    updateUserUI();
    carregarAnimais();
});
