// Função para carregar os cards de animais
function carregarAnimais() {
  const container = document.getElementById("lista-animais");
  if (!container) return;

  animais.forEach(animal => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${animal.imagem}" alt="${animal.tipo}">
      <h3>${animal.nome}</h3>
      <p>Tipo: ${animal.tipo}</p>
      <p>Idade: ${animal.idade}</p>
      <button onclick="window.location.href='animal-detalhes.html?id=${animal.id}'">Saiba Mais</button>
    `;
    container.appendChild(card);
  });
}

// Função para carregar os detalhes de um animal específico
function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id) return;

  const animal = animais.find(a => a.id === id);
  if (!animal) return;

  const container = document.getElementById("detalhes-animal");
  if (!container) return;

  container.innerHTML = `
    <img src="${animal.imagem}" alt="${animal.tipo}">
    <h2>${animal.nome}</h2>
    <p><strong>Tipo:</strong> ${animal.tipo}</p>
    <p><strong>Idade:</strong> ${animal.idade}</p>
    <p><strong>Status doador:</strong> ${animal.doador}</p>
    <p><strong>Tratamentos:</strong> ${animal.tratamentos}</p>
    <p><strong>Observações:</strong> ${animal.observacoes}</p>
    <h3>Contato do responsável</h3>
    <p><strong>Email:</strong> ${animal.responsavel.email}</p>
    <p><strong>Telefone:</strong> ${animal.responsavel.telefone}</p>
    <button class="btn">Falar com responsável</button>
  `;
}
