const dados = [
  {
    id: 1,
    titulo: "Bolo de Chocolate",
    descricao: "Bolo fofinho e bem chocolatudo, perfeito para festas.",
    conteudo:
      `Ingredientes:
- 4 ovos
- 2 xícaras de açúcar
- 2 xícaras de farinha
- 1 xícara de cacau
Modo de preparo: …`,
    autor: "Maria Souza",
    tempoPreparo: "50 min",
    rendimento: "10 porções",
    calorias: "320 kcal / porção",
    publicacao: "2025-04-20",
    imagem: "assets/img/bolo_chocolate.jpeg",
    fotos: [
      { url: "assets/img/bolo_fatia.jpg", titulo: "Fatia servida" },
    ],
    destaque: true
  },
  {
    id: 2,
    titulo: "Salada Colorida",
    descricao: "Mix de folhas e legumes crocantes para uma refeição leve.",
    conteudo:
      `Ingredientes:
- Alface
- Tomate-cereja
- Cenoura ralada
- Molho vinagrete
Modo de preparo: …`,
    autor: "João Lima",
    tempoPreparo: "15 min",
    rendimento: "4 porções",
    calorias: "90 kcal / porção",
    publicacao: "2025-04-18",
    imagem: "assets/img/salada.jpg",
    fotos: [
      { url: "assets/img/salada_pronta.webp", titulo: "Salada pronta" }
    ],
    destaque: false
  },
  {
    id: 3,
    titulo: "Sopa de Legumes",
    descricao: "Sopa reconfortante com legumes frescos e caldo aromático.",
    conteudo:
      `Ingredientes:
- Cenoura
- Batata
- Abóbora
- Caldo de legumes
Modo de preparo: …`,
    autor: "Ana Clara",
    tempoPreparo: "40 min",
    rendimento: "6 porções",
    calorias: "110 kcal / porção",
    publicacao: "2025-04-15",
    imagem: "assets/img/sopa_panela.jpeg",
    fotos: [
      { url: "assets/img/sopa.jpeg", titulo: "Servida na tigela" }
    ],
    destaque: true
  },
  {
    id: 4,
    titulo: "Penne ao Pesto",
    descricao: "Massa com molho pesto de manjericão fresco.",
    conteudo:
      `Ingredientes:
- 300 g penne
- 1 maço de manjericão
- 2 dentes de alho
- 50 g parmesão
Modo de preparo: …`,
    autor: "Luís Tavares",
    tempoPreparo: "25 min",
    rendimento: "3 porções",
    calorias: "420 kcal / porção",
    publicacao: "2025-04-22",
    imagem: "assets/img/penne.jpg",
    fotos: [
      { url: "assets/img/penne.jpg", titulo: "Close no pesto" }
    ],
    destaque: false
  },
  {
    id: 5,
    titulo: "Tacos Mexicanos",
    descricao: "Tortilhas crocantes com carne temperada e vegetais.",
    conteudo:
      `Ingredientes:
- 6 tortilhas
- 300 g carne moída
- Alface, tomate, queijo
Modo de preparo: …`,
    autor: "Carla Méndez",
    tempoPreparo: "30 min",
    rendimento: "6 unidades",
    calorias: "180 kcal / taco",
    publicacao: "2025-04-23",
    imagem: "assets/img/tacos.webp",
    fotos: [
      { url: "assets/img/tacos_montagem.jpeg", titulo: "Montagem dos tacos" }
    ],
    destaque: true
  },
  {
    id: 6,
    titulo: "Panqueca de Banana",
    descricao: "Panqueca saudável sem glúten, ideal para o café da manhã.",
    conteudo:
      `Ingredientes:
- 1 banana madura
- 1 ovo
- 2 col. sopa aveia
Modo de preparo: …`,
    autor: "Renata Lopes",
    tempoPreparo: "10 min",
    rendimento: "2 unidades",
    calorias: "120 kcal / unidade",
    publicacao: "2025-04-24",
    imagem: "assets/img/panqueca.jpeg",
    fotos: [
      { url: "assets/img/panqueca_mel.jpeg", titulo: "Servida com mel" }
    ],
    destaque: false
  },
  {
    id: 7,
    titulo: "Cheesecake de Frutas Vermelhas",
    descricao: "Cheesecake cremoso com cobertura de morangos e mirtilos.",
    conteudo:
      `Ingredientes:
- 200 g bolacha maisena
- 600 g cream cheese
- Geleia de frutas vermelhas
Modo de preparo: …`,
    autor: "Patrícia Andrade",
    tempoPreparo: "4 h (geladeira)",
    rendimento: "12 fatias",
    calorias: "350 kcal / fatia",
    publicacao: "2025-04-25",
    imagem: "assets/img/cake.jpeg",
    fotos: [
      { url: "assets/img/fatia.jpeg", titulo: "Fatia pronta" }
    ],
    destaque: true
  }
];

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function renderCarousel() {
  const wrap = document.getElementById("carousel-items");
  const dots = document.getElementById("carousel-dots");    
  if (!wrap || !dots) return;

  dados.filter(d => d.destaque).forEach((item, i) => {
    wrap.insertAdjacentHTML("beforeend", `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${item.imagem}" class="d-block w-100" alt="${item.titulo}">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
          <h5>${item.titulo}</h5>
          <p>${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn btn-sm btn-light">Ver detalhes</a>
        </div>
      </div>
    `);

    dots.insertAdjacentHTML("beforeend", `
      <button type="button" data-bs-target="#featuredCarousel"
              data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''} aria-label="Slide ${i + 1}">
      </button>
    `);
  });
}

function renderCards() {
  const home = document.getElementById("cards-container");
  if (!home) return;

  dados.forEach(item => {
    home.insertAdjacentHTML("beforeend", `
      <div class="col-md-4">
        <article class="card h-100">
          <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text flex-grow-1">${item.descricao}</p>
            <a href="detalhes.html?id=${item.id}" class="btn btn-sm btn-dark mt-2">Ver detalhes</a>
          </div>
        </article>
      </div>
    `);
  });
}

function renderDetalhes() {
  const cont = document.getElementById("detalhe-container");
  if (!cont) return;

  const id = parseInt(getQueryParam("id"), 10);
  const item = dados.find(d => d.id === id);
  if (!item) {
    cont.innerHTML = `<p class="text-center">Item não encontrado.</p>`;
    return;
  }

  cont.innerHTML = `
    <div class="row g-5">
      <div class="col-lg-6">
        <img src="${item.imagem}" class="img-fluid rounded" alt="${item.titulo}">
        <ul class="list-group list-group-flush mt-4">
          <li class="list-group-item"><strong>Autor:</strong> ${item.autor}</li>
          <li class="list-group-item"><strong>Publicado em:</strong> ${item.publicacao}</li>
          <li class="list-group-item"><strong>Tempo de preparo:</strong> ${item.tempoPreparo}</li>
          <li class="list-group-item"><strong>Rendimento:</strong> ${item.rendimento}</li>
          <li class="list-group-item"><strong>Valor calórico:</strong> ${item.calorias}</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <h2>${item.titulo}</h2>
        <p class="lead">${item.descricao}</p>
        <pre style="white-space: pre-wrap;">${item.conteudo}</pre>
      </div>
    </div>

    <hr class="my-5">

    <h3 class="mb-4 text-center">Galeria de fotos</h3>
    <div class="row g-4">
      ${item.fotos.map(f => `
        <div class="col-sm-6 col-md-4">
          <figure class="figure">
            <img src="${f.url}" class="figure-img img-fluid rounded" alt="${f.titulo}">
            <figcaption class="figure-caption text-center">${f.titulo}</figcaption>
          </figure>
        </div>
      `).join('')}
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  renderCarousel();
  renderCards();
  renderDetalhes();
});