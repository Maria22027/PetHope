const animais = [
  // 🐱 Gatos
  { id: 1, nome: "rodolfo", tipo: "Gato", idade: "2 anos", img: "img/gato1.jpg", link: "detalhes-gato1.html" },
  { id: 2, nome: "Luna", tipo: "Gato", idade: "3 anos", img: "img/gato2.jpg", link: "detalhes-gato2.html" },
  { id: 3, nome: "Snow", tipo: "Gato", idade: "1 ano", img: "https://placekitten.com/302/200", link: "detalhes-gato3.html" },
  { id: 4, nome: "Bidu", tipo: "Gato", idade: "4 anos", img: "https://placekitten.com/303/200", link: "detalhes-gato4.html" },
  { id: 5, nome: "Amora", tipo: "Gato", idade: "2 anos", img: "https://placekitten.com/304/200", link: "detalhes-gato5.html" },
  { id: 6, nome: "Kiara", tipo: "Gato", idade: "5 anos", img: "https://placekitten.com/305/200", link: "detalhes-gato6.html" },
  { id: 7, nome: "Thor", tipo: "Gato", idade: "3 anos", img: "https://placekitten.com/306/200", link: "detalhes-gato7.html" },
  { id: 8, nome: "Mel", tipo: "Gato", idade: "1 ano", img: "https://placekitten.com/307/200", link: "detalhes-gato8.html" },
  { id: 9, nome: "Pingo", tipo: "Gato", idade: "6 anos", img: "https://placekitten.com/308/200", link: "detalhes-gato9.html" },
  { id: 10, nome: "Fifi", tipo: "Gato", idade: "2 anos", img: "https://placekitten.com/309/200", link: "detalhes-gato10.html" },

  // 🐶 Cachorros
  { id: 11, nome: "Rex", tipo: "Cachorro", idade: "3 anos", img: "https://placedog.net/300/200?id=1", link: "detalhes-cachorro1.html" },
  { id: 12, nome: "Max", tipo: "Cachorro", idade: "2 anos", img: "https://placedog.net/301/200?id=2", link: "detalhes-cachorro2.html" },
  { id: 13, nome: "Nina", tipo: "Cachorro", idade: "1 ano", img: "https://placedog.net/302/200?id=3", link: "detalhes-cachorro3.html" },
  { id: 14, nome: "Bob", tipo: "Cachorro", idade: "5 anos", img: "https://placedog.net/303/200?id=4", link: "detalhes-cachorro4.html" },
  { id: 15, nome: "Belinha", tipo: "Cachorro", idade: "4 anos", img: "https://placedog.net/304/200?id=5", link: "detalhes-cachorro5.html" },
  { id: 16, nome: "Lola", tipo: "Cachorro", idade: "2 anos", img: "https://placedog.net/305/200?id=6", link: "detalhes-cachorro6.html" },
  { id: 17, nome: "Thor", tipo: "Cachorro", idade: "3 anos", img: "https://placedog.net/306/200?id=7", link: "detalhes-cachorro7.html" },
  { id: 18, nome: "Simba", tipo: "Cachorro", idade: "6 anos", img: "https://placedog.net/307/200?id=8", link: "detalhes-cachorro8.html" },
  { id: 19, nome: "Bidu", tipo: "Cachorro", idade: "1 ano", img: "https://placedog.net/308/200?id=9", link: "detalhes-cachorro9.html" },
  { id: 20, nome: "Luna", tipo: "Cachorro", idade: "2 anos", img: "https://placedog.net/309/200?id=10", link: "detalhes-cachorro10.html" },

  // 🐇 Coelhos
  { id: 21, nome: "Snowball", tipo: "Coelho", idade: "2 anos", img: "https://loremflickr.com/300/200/rabbit?lock=1", link: "detalhes-coelho1.html" },
  { id: 22, nome: "Pompom", tipo: "Coelho", idade: "1 ano", img: "https://loremflickr.com/301/200/rabbit?lock=2", link: "detalhes-coelho2.html" },
  { id: 23, nome: "Nuvem", tipo: "Coelho", idade: "3 anos", img: "https://loremflickr.com/302/200/rabbit?lock=3", link: "detalhes-coelho3.html" },
  { id: 24, nome: "Fofo", tipo: "Coelho", idade: "4 anos", img: "https://loremflickr.com/303/200/rabbit?lock=4", link: "detalhes-coelho4.html" },
  { id: 25, nome: "Algodão", tipo: "Coelho", idade: "2 anos", img: "https://loremflickr.com/304/200/rabbit?lock=5", link: "detalhes-coelho5.html" },
  { id: 26, nome: "Bolota", tipo: "Coelho", idade: "1 ano", img: "https://loremflickr.com/305/200/rabbit?lock=6", link: "detalhes-coelho6.html" },
  { id: 27, nome: "Cenourinha", tipo: "Coelho", idade: "5 anos", img: "https://loremflickr.com/306/200/rabbit?lock=7", link: "detalhes-coelho7.html" },
  { id: 28, nome: "Pipoca", tipo: "Coelho", idade: "3 anos", img: "https://loremflickr.com/307/200/rabbit?lock=8", link: "detalhes-coelho8.html" },
  { id: 29, nome: "Docinho", tipo: "Coelho", idade: "6 anos", img: "https://loremflickr.com/308/200/rabbit?lock=9", link: "detalhes-coelho9.html" },
  { id: 30, nome: "Neve", tipo: "Coelho", idade: "2 anos", img: "https://loremflickr.com/309/200/rabbit?lock=10", link: "detalhes-coelho10.html" },

  // 🐹 Porquinhos-da-índia
  { id: 31, nome: "Chico", tipo: "Porquinho-da-índia", idade: "1 ano", img: "https://loremflickr.com/300/200/guineapig?lock=1", link: "detalhes-porquinho1.html" },
  { id: 32, nome: "Bolinha", tipo: "Porquinho-da-índia", idade: "2 anos", img: "https://loremflickr.com/301/200/guineapig?lock=2", link: "detalhes-porquinho2.html" },
  { id: 33, nome: "Nina", tipo: "Porquinho-da-índia", idade: "3 anos", img: "https://loremflickr.com/302/200/guineapig?lock=3", link: "detalhes-porquinho3.html" },
  { id: 34, nome: "Lulu", tipo: "Porquinho-da-índia", idade: "1 ano", img: "https://loremflickr.com/303/200/guineapig?lock=4", link: "detalhes-porquinho4.html" },
  { id: 35, nome: "Amendoim", tipo: "Porquinho-da-índia", idade: "2 anos", img: "https://loremflickr.com/304/200/guineapig?lock=5", link: "detalhes-porquinho5.html" },
  { id: 36, nome: "Biscoito", tipo: "Porquinho-da-índia", idade: "4 anos", img: "https://loremflickr.com/305/200/guineapig?lock=6", link: "detalhes-porquinho6.html" },
  { id: 37, nome: "Pipoca", tipo: "Porquinho-da-índia", idade: "3 anos", img: "https://loremflickr.com/306/200/guineapig?lock=7", link: "detalhes-porquinho7.html" },
  { id: 38, nome: "Mel", tipo: "Porquinho-da-índia", idade: "2 anos", img: "https://loremflickr.com/307/200/guineapig?lock=8", link: "detalhes-porquinho8.html" },
  { id: 39, nome: "Tico", tipo: "Porquinho-da-índia", idade: "5 anos", img: "https://loremflickr.com/308/200/guineapig?lock=9", link: "detalhes-porquinho9.html" },
  { id: 40, nome: "Fofinho", tipo: "Porquinho-da-índia", idade: "6 anos", img: "https://loremflickr.com/309/200/guineapig?lock=10", link: "detalhes-porquinho10.html" },

  // 🐦 Pássaros
  { id: 41, nome: "Blue", tipo: "Pássaro", idade: "1 ano", img: "https://loremflickr.com/300/200/parrot?lock=1", link: "detalhes-passaro1.html" },
  { id: 42, nome: "Kiwi", tipo: "Pássaro", idade: "2 anos", img: "https://loremflickr.com/301/200/parrot?lock=2", link: "detalhes-passaro2.html" },
  { id: 43, nome: "Loro", tipo: "Pássaro", idade: "4 anos", img: "https://loremflickr.com/302/200/parrot?lock=3", link: "detalhes-passaro3.html" },
  { id: 44, nome: "Piu", tipo: "Pássaro", idade: "3 anos", img: "https://loremflickr.com/303/200/parrot?lock=4", link: "detalhes-passaro4.html" },
  { id: 45, nome: "Sunny", tipo: "Pássaro", idade: "5 anos", img: "https://loremflickr.com/304/200/parrot?lock=5", link: "detalhes-passaro5.html" },
  { id: 46, nome: "Sky", tipo: "Pássaro", idade: "6 anos", img: "https://loremflickr.com/305/200/parrot?lock=6", link: "detalhes-passaro6.html" },
  { id: 47, nome: "Arco", tipo: "Pássaro", idade: "2 anos", img: "https://loremflickr.com/306/200/parrot?lock=7", link: "detalhes-passaro7.html" },
  { id: 48, nome: "Pipoca", tipo: "Pássaro", idade: "1 ano", img: "https://loremflickr.com/307/200/parrot?lock=8", link: "detalhes-passaro8.html" },
  { id: 49, nome: "Chico", tipo: "Pássaro", idade: "4 anos", img: "https://loremflickr.com/308/200/parrot?lock=9", link: "detalhes-passaro9.html" },
  { id: 50, nome: "Estrela", tipo: "Pássaro", idade: "3 anos", img: "https://loremflickr.com/309/200/parrot?lock=10", link: "detalhes-passaro10.html" },
  { id: 51, nome: "Ricardo", tipo: "Cavalo", idade: "1 anos", img: "https://loremflickr.com/309/200/parrot?lock=10", link: "detalhes-passaro10.html" }
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
