const API = "http://localhost:3000/receitas";   
let dados = [];                             

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}


async function fetchAll() {
  const resp = await fetch(API);
  if (!resp.ok) throw new Error("Falha ao carregar lista");
  dados = await resp.json();                   
}

async function fetchById(id) {
  const resp = await fetch(`${API}/${id}`);
  if (!resp.ok) return null;
  return resp.json();
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

function renderDetalhes(item) {
  const cont = document.getElementById("detalhe-container");
  if (!cont) return;

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

window.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("cards-container")) {
    await fetchAll();
    renderCarousel();
    renderCards();
  }

  // Página de detalhes
  if (document.getElementById("detalhe-container")) {
    const id = parseInt(getQueryParam("id"), 10);
    const item = await fetchById(id);
    renderDetalhes(item);
  }
});
