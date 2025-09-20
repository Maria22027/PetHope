const animais = [
  //cards dos animais
  { id: 1, nome: "rodolfo", tipo: "Gato", idade: "2 anos", img: "img/gato1.jpg", link: "detalhes-gato1.html" },
  { id: 2, nome: "Luna", tipo: "Gato", idade: "3 anos", img: "img/gato2.jpg", link: "detalhes-gato2.html" },
  { id: 3, nome: "Snow", tipo: "Gato", idade: "1 ano", img: "img/gato3.jpg", link: "detalhes-gato3.html" },
  { id: 4, nome: "Bidu", tipo: "Gato", idade: "4 anos", img: "img/gato4.jpg", link: "detalhes-gato4.html" },
  { id: 5, nome: "Amora", tipo: "Gato", idade: "6 messes", img: "img/gato5.jpg", link: "detalhes-gato5.html" },
  { id: 6, nome: "Kiara", tipo: "Gato", idade: "5 anos", img: "img/gato6.jpg", link: "detalhes-gato6.html" },
  { id: 7, nome: "Zote", tipo: "Gato", idade: "3 anos", img: "img/gato7.jpg", link: "detalhes-gato7.html" },
  { id: 8, nome: "Sem nome", tipo: "Gato", idade: "1 Ano", img: "img/gato8.jpg", link: "detalhes-gato8.html" },
  { id: 9, nome: "Pingo", tipo: "Gato", idade: "6 anos", img: "img/gato9.jpg", link: "detalhes-gato9.html" },
  { id: 10, nome: "Sem nome", tipo: "Gato", idade: "2 messes", img: "img/gato10.jpg", link: "detalhes-gato10.html" },
  { id: 11, nome: "Rex", tipo: "Cachorro", idade: "3 anos", img: "img/cao1.jpg", link: "detalhes-cao1.html" },
  { id: 12, nome: "Max", tipo: "Cachorro", idade: "2 anos", img: "img/cao2.jpg", link: "detalhes-cao2.html" },
  { id: 13, nome: "Nina", tipo: "Cachorro", idade: "1 ano", img: "img/cao3.jpg", link: "detalhes-cao3.html" },
  { id: 14, nome: "Bob", tipo: "Cachorro", idade: "5 anos", img: "img/cao4.jpg", link: "ddetalhes-cao4.html" },
  { id: 15, nome: "Belinha", tipo: "Cachorro", idade: "4 anos", img: "img/cao4.jpg", link: "detalhes-cao5.html" },
  { id: 16, nome: "Lola", tipo: "Cachorro", idade: "2 anos", img: "img/cao5.jpg", link: "detalhes-cao6.html" },
  { id: 17, nome: "Thor", tipo: "Cachorro", idade: "3 anos", img: "img/cao6.jpg", link: "detalhes-cao7.html" },
  { id: 18, nome: "Simba", tipo: "Cachorro", idade: "6 anos", img: "img/cao7.jpg", link: "detalhes-cao8.html" },
  { id: 19, nome: "Bidu", tipo: "Cachorro", idade: "1 ano", img: "img/cao8.jpg", link: "detalhes-cao9.html" },
  { id: 20, nome: "Luna", tipo: "Cachorro", idade: "2 anos", img: "img/cao9.jpg", link: "detalhes-cao10.html" },
  { id: 21, nome: "Snowball", tipo: "Cachorro", idade: "2 anos", img: "img/cao10.jpg", link: "detalhes-cao11.html" },
  { id: 22, nome: "Pompom", tipo: "Cachorro", idade: "1 ano", img: "img/cao11.jpg", link: "detalhes-coelho2.html" },
  { id: 23, nome: "Nuvem", tipo: "Coelho", idade: "3 anos", img: "img/coe1.jpg", link: "detalhes-coelho3.html" },
  { id: 24, nome: "Fofo", tipo: "Coelho", idade: "4 anos", img: "img/coe2.jpg", link: "detalhes-coelho4.html" },
  { id: 25, nome: "Algodão", tipo: "Coelho", idade: "2 anos", img: "img/coe3.jpg", link: "detalhes-coelho5.html" },
  { id: 26, nome: "Bolota", tipo: "Coelho", idade: "1 ano", img: "img/coe4.jpg", link: "detalhes-coelho6.html" },
  { id: 27, nome: "Cenourinha", tipo: "Coelho", idade: "5 anos", img: "img/coe5.jpg", link: "detalhes-coelho7.html" },
  { id: 28, nome: "Pipoca", tipo: "Coelho", idade: "3 anos", img: "img/coe6.jpg", link: "detalhes-coelho8.html" },
  { id: 29, nome: "Docinho", tipo: "Furão", idade: "1 ano", img: "img/fu1.jpg", link: "detalhes-coelho9.html" },
  { id: 30, nome: "Neve", tipo: "Furão", idade: "2 anos", img: "img/fu2.jpg", link: "detalhes-coelho10.html" },
  { id: 31, nome: "Chico", tipo: "Porquinho-da-índia", idade: "1 ano", img: "img/por1.jpg", link: "detalhes-porquinho1.html" },
  { id: 32, nome: "Bolinha", tipo: "Porquinho-da-índia", idade: "2 anos", img: "img/por2.jpg", link: "detalhes-porquinho2.html" },
  { id: 33, nome: "Nina", tipo: "Porquinho-da-índia", idade: "3 anos", img: "img/por3.jpg", link: "detalhes-porquinho3.html" },
  { id: 34, nome: "Lulu", tipo: "Porquinho-da-índia", idade: "1 ano", img: "img/por4.jpg", link: "detalhes-porquinho4.html" },
  { id: 35, nome: "Amendoim", tipo: "Porquinho-da-índia", idade: "2 anos", img: "img/por5.jpg", link: "detalhes-porquinho5.html" },
  { id: 36, nome: "Biscoito", tipo: "Hamster", idade: "4 anos", img: "img/ha1.jpg", link: "detalhes-porquinho6.html" },
  { id: 37, nome: "Pipoca", tipo: "Hamster", idade: "3 anos", img: "img/ha2.jpg", link: "detalhes-porquinho7.html" },
  { id: 38, nome: "Mel", tipo: "Porquinho-da-índia", idade: "2 anos", img: "img/por3.jpg", link: "detalhes-hamster1.html" },
  { id: 39, nome: "Tico", tipo: "Porquinho-da-índia", idade: "5 anos", img: "img/por4.jpg", link: "detalhes-hamster2.html" },
  { id: 40, nome: "Fofinho", tipo: "Porquinho-da-índia", idade: "6 anos", img: "img/rat1.jpg", link: "detalhes-porquinho10.html" },
  { id: 41, nome: "Blue", tipo: "Agapornis", idade: "1 ano", img: "img/aga1.jpg", link: "detalhes-passaro1.html" },
  { id: 42, nome: "Kiwi", tipo: "Canário", idade: "2 anos", img: "img/ca1.jpg", link: "detalhes-passaro2.html" },
  { id: 43, nome: "Loro", tipo: "Canário", idade: "4 anos", img: "img/ca2.jpg", link: "detalhes-passaro3.html" },
  { id: 44, nome: "Piu", tipo: "Calopsita", idade: "3 anos", img: "img/lop1.jpg", link: "detalhes-passaro4.html" },
  { id: 45, nome: "Sunny", tipo: "Calopsita", idade: "5 anos", img: "img/lop2.jpg", link: "detalhes-passaro5.html" },
  { id: 46, nome: "Sky", tipo: "Porco-espinho", idade: "6 anos", img: "img/esp1.jpg", link: "detalhes-passaro6.html" },
  { id: 47, nome: "Arco", tipo: "Furão", idade: "2 anos", img: "img/fu3.jpg", link: "detalhes-passaro7.html" },
  { id: 48, nome: "Pipoca", tipo: "Periquito", idade: "1 ano", img: "img/pe1.jpg", link: "detalhes-passaro8.html" },
  { id: 49, nome: "Chico", tipo: "Maritaca", idade: "4 anos", img: "img/mar1.jpg", link: "detalhes-passaro9.html" },
  { id: 50, nome: "Estrela", tipo: "Porco", idade: "3 anos", img: "img/porco1.jpg", link: "detalhes-passaro10.html" },
  { id: 51, nome: "Ricardo", tipo: "Cavalo", idade: "1 anos", img: "img/cav1.jpg", link: "detalhes-passaro10.html" }
];

function carregarAnimais() {
  const lista = document.getElementById("lista-animais");

  animais.forEach(animal => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${animal.img}" alt="${animal.nome}">
      <h3>${animal.nome}</h3>
      <p><strong>Tipo:</strong> ${animal.tipo}</p>
      <p><strong>Idade:</strong> ${animal.idade}</p>
      <a href="${animal.link}">
        <button>Saiba Mais</button>
      </a>
    `;

    lista.appendChild(card);
  });
}
