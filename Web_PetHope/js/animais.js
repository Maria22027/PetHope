const API_BASE_URL = 'https://pethope-aw8q.onrender.com';

// Função para carregar os animais da API com limite
async function carregarAnimais(limite = 6) {
    const container = document.getElementById("lista-animais");
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        if (!response.ok) {
            throw new Error('Erro ao buscar pets');
        }
        const pets = await response.json();
        
        if (pets.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum animal disponível</p>';
            return;
        }

        // Limitar número de pets exibidos
        const petsLimitados = pets.slice(0, limite);
        const temMaisPets = pets.length > limite;

        container.innerHTML = petsLimitados.map(pet => `
            <div class="card">
                ${pet.imageUrl ? `<img src="${pet.imageUrl}" alt="${pet.nome}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); border-radius: 10px; display: none; align-items: center; justify-content: center;"><i class="fas fa-paw" style="font-size: 50px; color: white;"></i></div>` : `<div style="width: 100%; height: 150px; background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-paw" style="font-size: 50px; color: white;"></i></div>`}
                <h3>${pet.nome}</h3>
                <p>Tipo: ${pet.especie}</p>
                <p>Idade: ${pet.idade || 'Desconhecida'}</p>
                <button class="btn" onclick="redirecionarParaDownload()">Solicitar Adoção</button>
            </div>
        `).join('');

        // Adicionar botão "Ver Mais" se houver mais pets
        if (temMaisPets) {
            container.innerHTML += `
                <div class="ver-mais-card" style="grid-column: 1/-1; text-align: center; padding: 30px;">
                    <p style="font-size: 18px; margin-bottom: 15px;">Quer ver mais animais disponíveis?</p>
                    <p style="color: #666; margin-bottom: 20px;">Baixe nosso aplicativo para acessar todos os pets e solicitar adoção!</p>
                    <button class="btn" onclick="redirecionarParaDownload()" style="font-size: 16px; padding: 12px 30px;">Baixar Aplicativo</button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar animais:', error);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Erro ao carregar animais</p>';
    }
}

function redirecionarParaDownload() {
    window.location.href = 'download.html';
}

// Carregar dados ao abrir página
document.addEventListener('DOMContentLoaded', () => {
    carregarAnimais(6); // Limitar a 6 pets
});
