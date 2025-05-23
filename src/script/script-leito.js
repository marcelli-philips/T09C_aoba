const adicionar_leito_btn = document.getElementById('btn-adicionar')
const fechar_modal_cadastro_btn = document.getElementById('fechar-modal');
const modal_cadastro = document.getElementById('modal-cadastro-leito');

const registros = JSON.parse(localStorage.getItem("registros")) || [];

const leitos = registros.filter(r => r.tipo === "leito");

console.log("Registros de leitos:", leitos);

adicionar_leito_btn.addEventListener('click', () =>{
    
    modal_cadastro.classList.remove('modal-overlay-hidden')
    modal_cadastro.classList.add('modal-overlay')
});


function fechar_modal_cadastro(){
    modal_cadastro.classList.remove('modal-overlay')
    modal_cadastro.classList.add('modal-overlay-hidden')
}

document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});

//Popular tabelas com os leitos registrados
function popularTabelaLeitos() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const leitos = registros.filter(r => r.tipo === "leito");

    const tbody = document.querySelector(".leitos-table tbody");
    tbody.innerHTML = ""; // limpa o conteúdo atual da tabela

    leitos.forEach(leito => {
        const tr = document.createElement("tr");

        // O leito va estar livre inicialmente
        const status = "Livre";
        const statusClass = "livre";
        const nomePaciente = "-";
        const botao = `<button class="btn-acao-livre">Ocupar</button>`;

        tr.innerHTML = `
            <td>${leito.alaLeito}</td>
            <td>${leito.numeroLeito}</td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td>${nomePaciente}</td>
            <td>${botao}</td>
        `;

        tbody.appendChild(tr);
    });
}

popularTabelaLeitos();