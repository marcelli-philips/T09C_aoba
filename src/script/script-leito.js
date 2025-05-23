const registros = JSON.parse(localStorage.getItem("registros")) || [];


document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});

//Popular tabelas com os leitos registrados
function popularTabelaLeitos() {

    const leitos = registros.filter(r => r.tipo === "leito");

    const tbody = document.querySelector(".leitos-table tbody");
    tbody.innerHTML = ""; // limpa o conteúdo atual da tabela

    leitos.forEach(leito => {
        const tr = document.createElement("tr");

        // O leito va estar livre inicialmente
        const status = "Livre";
        const statusClass = "livre";
        const nomePaciente = "-";
        const botao = `<button class="btn-acao-livre" id="btn-acao">Ocupar</button>`;

        tr.innerHTML = `
            <td>${leito.alaLeito}</td>
            <td>${leito.numeroLeito}</td>
            <td><span class="status ${statusClass}" >${status}</span></td>
            <td>${nomePaciente}</td>
            <td>${botao}</td>
        `;

        tbody.appendChild(tr);
    });
}

popularTabelaLeitos();

let acaoBtn = document.getElementById('btn-acao')
const modal_cadastro = document.getElementById('modal-cadastro-leito');



acaoBtn.addEventListener('click', () => {
    // Abre o modal
    modal_cadastro.classList.remove('modal-overlay-hidden');
    modal_cadastro.classList.add('modal-overlay');

    // Esconde a lista inicialmente
    const listaPacientesDiv = document.getElementById('listaPacientes');
    listaPacientesDiv.innerHTML = '';
    listaPacientesDiv.style.display = 'none';

    // Captura o campo de busca
    const inputBusca = document.getElementById('nome-paciente');

    // Limpa o campo ao abrir o modal
    inputBusca.value = '';

    // Recupera os pacientes
    const pacientes = registros.filter(r => r.tipo === "paciente");

    // Evento de digitação
    inputBusca.addEventListener('input', () => {
        const termo = inputBusca.value.trim().toLowerCase();
        listaPacientesDiv.innerHTML = '';

        if (termo === '') {
            listaPacientesDiv.style.display = 'none';
            return;
        }

        const resultados = pacientes.filter(p =>
            p.nomePaciente.toLowerCase().includes(termo)
        );

        if (resultados.length > 0) {
            const ul = document.createElement('ul');
            resultados.forEach(p => {
                const li = document.createElement('li');

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'pacienteSelecionado';
                radio.value = p.nomePaciente;

                const label = document.createElement('label');
                label.textContent = p.nomePaciente;
                label.style.marginLeft = '8px';

                li.appendChild(radio);
                li.appendChild(label);
                ul.appendChild(li);
            });
            listaPacientesDiv.appendChild(ul);
            listaPacientesDiv.style.display = 'block';
        } else {
            listaPacientesDiv.textContent = 'Nenhum paciente encontrado.';
            listaPacientesDiv.style.display = 'block';
        }
    });
});




function fechar_modal_cadastro() {
    modal_cadastro.classList.remove('modal-overlay')
    modal_cadastro.classList.add('modal-overlay-hidden')
}

