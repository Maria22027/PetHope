// campanhas.js - Funções para buscar e exibir campanhas

const API_BASE_URL = 'https://pethope-aw8q.onrender.com';

// Buscar todas as campanhas
async function buscarCampanhas() {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns`);
        if (!response.ok) {
            throw new Error('Erro ao buscar campanhas');
        }
        const campanhas = await response.json();
        return campanhas;
    } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
        return [];
    }
}

// Buscar campanha específica por ID
async function buscarCampanhaPorId(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar campanha');
        }
        const campanha = await response.json();
        return campanha;
    } catch (error) {
        console.error('Erro ao buscar campanha:', error);
        return null;
    }
}

// Renderizar carrossel de campanhas (para a home)
async function renderizarCarrosselCampanhas(containerId, limite = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const campanhas = await buscarCampanhas();
    
    if (campanhas.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Nenhuma campanha disponível no momento.</p>';
        return;
    }

    // Limitar número de campanhas exibidas
    const campanhasLimitadas = campanhas.slice(0, limite);

    container.innerHTML = '';
    
    campanhasLimitadas.forEach(campanha => {
        const campanhaCard = document.createElement('div');
        campanhaCard.className = 'carousel-card';
        campanhaCard.style.cursor = 'pointer';
        campanhaCard.onclick = () => window.location.href = `download.html`;
        
        campanhaCard.innerHTML = `
            <div class="campaign-image-placeholder">
                <i class="fas fa-hand-holding-heart" style="font-size: 50px; color: #f75d5a;"></i>
            </div>
            <h3>${campanha.titulo || 'Campanha'}</h3>
            <p>${campanha.descricao ? campanha.descricao.substring(0, 100) + '...' : 'Descrição não disponível'}</p>
            <span class="campaign-org">${campanha.organizacaoId?.nome || 'Organização'}</span>
        `;
        
        container.appendChild(campanhaCard);
    });

    // Inicializar funcionalidade do carrossel
    inicializarCarrossel();
}

// Renderizar lista completa de campanhas (para página de campanhas)
async function renderizarListaCampanhas(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const campanhas = await buscarCampanhas();
    
    if (campanhas.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">Nenhuma campanha disponível no momento.</p>';
        return;
    }

    container.innerHTML = '';
    
    campanhas.forEach(campanha => {
        const campanhaCard = document.createElement('div');
        campanhaCard.className = 'campaign-card';
        campanhaCard.style.cursor = 'pointer';
        campanhaCard.onclick = () => window.location.href = `download.html`;
        
        campanhaCard.innerHTML = `
            <div class="campaign-image-placeholder">
                <i class="fas fa-hand-holding-heart" style="font-size: 60px; color: #f75d5a;"></i>
            </div>
            <div class="campaign-content">
                <h3>${campanha.titulo || 'Campanha'}</h3>
                <p>${campanha.descricao || 'Descrição não disponível'}</p>
                <div class="campaign-info">
                    <span class="campaign-org"><i class="fas fa-building"></i> ${campanha.organizacaoId?.nome || 'Organização'}</span>
                    ${campanha.dataInicio ? `<span class="campaign-date"><i class="fas fa-calendar"></i> ${new Date(campanha.dataInicio).toLocaleDateString('pt-BR')}</span>` : ''}
                </div>
                <button class="btn-saiba-mais">Saiba Mais</button>
            </div>
        `;
        
        container.appendChild(campanhaCard);
    });
}

// Funcionalidade do carrossel (navegação)
function inicializarCarrossel() {
    const container = document.getElementById('campanhassCarrossel');
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
    
    if (!container || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = container.querySelectorAll('.carousel-card');
    const totalCards = cards.length;
    
    // Calcular quantos cards cabem na tela
    const containerWidth = container.parentElement.offsetWidth;
    const cardWidth = cards[0]?.offsetWidth || 300;
    const gap = 20;
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap)) || 1;
    
    function updateCarousel() {
        const offset = -(currentIndex * (cardWidth + gap));
        container.style.transform = `translateX(${offset}px)`;
        
        // Desabilitar botões quando necessário
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    updateCarousel();
}
