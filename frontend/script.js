const API = "http://localhost:3001";
//Carregar filmes
async function carregarFilmes() {

    const resposta = await fetch(`${API}/filmes`);

    const filmes = await resposta.json();

    let lista = "";

    filmes.forEach(filme => {

        lista += `
        <option value="${filme.id}">
            ${filme.titulo} 
        </option>
        `;

    });

    document.getElementById("filme_id").innerHTML = lista;
}
   carregarFilmes()

async function limparRanking() {

    await fetch(`${API}/ranking`, {

        method: "DELETE"

    });

    buscarRanking();

}
//Deletar filmes do cadastro
async function deletarFilme(id) {

    await fetch(`http://localhost:3001/filmes/${id}`, {

        method: "DELETE"

    });

    buscarFilmes();

}
// Cadastrar filmes
async function cadastrarFilme() {

    console.log("clicou");

    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const ano = document.getElementById("ano").value;


    const resposta = await fetch("http://localhost:3001/filmes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            titulo,
            genero,
            ano
        })

    });

    const dados = await resposta.json();

    console.log(dados);

    carregarFilmes();

}

// Buscar filmes
async function buscarFilmes(){

     const lista = document.getElementById("listaFilmes");

    // Se já tem conteúdo, esconde
    if (lista.innerHTML.trim() !== "") {
        lista.innerHTML = "";
        return;
    }

    const resposta = await fetch(`${API}/filmes`);

    const filmes = await resposta.json();


    let html = "";

    filmes.forEach(filme => {

        html += `
        <p>
        ${filme.titulo} -
        ${filme.genero} -
        ${filme.ano}

          <button onclick="deletarFilme(${filme.id})">
            Excluir
        </button>
        </p>
        `;

    });


    document.getElementById("listaFilmes").innerHTML = html;

}
//Deletar filmes do ranking
async function deletarFilme(id) {

    await fetch(`${API}/filmes/${id}`, {

        method: "DELETE"

    });
 buscarFilmes()

 carregarFilmes();
}


// Enviar avaliação
async function avaliarFilme(){

    const filme_id = document.getElementById("filme_id").value;

    const notaSelecionada = document.querySelector('input[name="nota"]:checked');

if (!notaSelecionada) {
    alert("Selecione uma nota!");
    return;
}

const nota = notaSelecionada.value;

    if (nota < 0 || nota > 5) {

        alert("A nota deve ser entre 0 e 5");

        return;

    }

    console.log("Enviando:", filme_id, nota);

    const resposta = await fetch(`${API}/avaliacoes`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            filme_id: filme_id,
            nota: nota
        })

    });

    const dados = await resposta.json();

    console.log("Resposta do servidor:", dados);

    alert("Avaliação enviada!");
}

//ranking
async function buscarRanking(){

    const resposta = await fetch(`${API}/ranking`);

    const dados = await resposta.json();

    let html = "";

    dados.forEach(item => {

        html += `
        <p>
            🎬 ${item.titulo}
            <br>
            ⭐ Média: ${Number(item.media).toFixed(1)}
        </p>
        `;

    });

    document.getElementById("ranking").innerHTML = html;

}
carregarFilmesSelect();