  document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector(".leitos-table tbody");
    const btnAdicionar = document.querySelector(".btn-adicionar");
    const modalAdicionar = document.getElementById("modal-leito");
    const formAdicionar = document.getElementById("form-leito");

    const modalOcupar = document.getElementById("modal-ocupar-leito");
    const formOcupar = document.getElementById("form-ocupar-leito");
    const inputNomePaciente = document.getElementById("nomePaciente");

    const modalConfirmarLiberacao = document.getElementById("modal-confirmar-liberacao");
    const btnConfirmarLiberacao = document.getElementById("btn-confirmar-liberacao");

    let btnAtual = null;

    // Função para criar elementos de status
    function criarStatusSpan(status) {
      const span = document.createElement("span");
      span.classList.add("status", status.toLowerCase());
      span.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      return span;
    }

    // Função para atualizar a classe do botão com base no status
    function atualizarClasseBotao(btn, status) {
      btn.classList.remove("btn-ocupado", "btn-livre", "btn-manutencao");
      if (status === "ocupado") {
        btn.classList.add("btn-ocupado");
      } else if (status === "livre") {
        btn.classList.add("btn-livre");
      } else if (status === "manutenção") {
        btn.classList.add("btn-manutencao");
      }
    }

    // Função para ocupar um leito
    function ocuparLeito(btn) {
      btnAtual = btn;
      inputNomePaciente.value = "";
      modalOcupar.classList.remove("hidden");
      inputNomePaciente.focus();
    }

    // Função para liberar um leito
    function liberarLeito(btn) {
      btnAtual = btn;
      modalConfirmarLiberacao.classList.remove("hidden");
    }

    // Evento para o formulário de ocupar leito
    formOcupar.addEventListener("submit", function (e) {
      e.preventDefault();
      const paciente = inputNomePaciente.value.trim();
      if (!paciente) {
        alert("Por favor, insira o nome do paciente.");
        return;
      }

      const row = btnAtual.closest("tr");
      const statusCell = row.querySelector("td:nth-child(3)");
      statusCell.innerHTML = "";
      statusCell.appendChild(criarStatusSpan("ocupado"));
      row.querySelector("td:nth-child(4)").textContent = paciente;
      btnAtual.textContent = "Liberar";
      atualizarClasseBotao(btnAtual, "ocupado");
      btnAtual.onclick = () => liberarLeito(btnAtual);
      fecharModalOcupar();
    });

    // Evento para o botão de confirmar liberação
    btnConfirmarLiberacao.addEventListener("click", function () {
      const row = btnAtual.closest("tr");
      const statusCell = row.querySelector("td:nth-child(3)");
      statusCell.innerHTML = "";
      statusCell.appendChild(criarStatusSpan("livre"));
      row.querySelector("td:nth-child(4)").textContent = "-";
      btnAtual.textContent = "Ocupar";
      atualizarClasseBotao(btnAtual, "livre");
      btnAtual.onclick = () => ocuparLeito(btnAtual);
      fecharModalConfirmar();
    });

    // Função para fechar o modal de ocupar leito
    window.fecharModalOcupar = function () {
      modalOcupar.classList.add("hidden");
      btnAtual = null;
    };

    // Função para fechar o modal de confirmar liberação
    window.fecharModalConfirmar = function () {
      modalConfirmarLiberacao.classList.add("hidden");
      btnAtual = null;
    };

    // Abrir o modal ao clicar em "Adicionar Leito"
    btnAdicionar.addEventListener("click", () => {
      formAdicionar.reset();
      modalAdicionar.classList.remove("hidden");
    });

    // Fechar o modal de adicionar leito
    document.querySelector(".fechar-modal").addEventListener("click", () => {
      modalAdicionar.classList.add("hidden");
    });

    // Submeter o formulário do modal de adicionar leito
    formAdicionar.addEventListener("submit", (e) => {
      e.preventDefault();
      const ala = document.getElementById("alaLeito").value.trim();
      const nomeLeito = document.getElementById("nomeLeito").value.trim();

      if (!ala || !nomeLeito) {
        alert("Preencha todos os campos.");
        return;
      }

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${ala}</td>
        <td>${nomeLeito}</td>
        <td></td>
        <td>-</td>
        <td><button class="btn-acao">Ocupar</button></td>
      `;

      const statusCell = row.querySelector("td:nth-child(3)");
      statusCell.appendChild(criarStatusSpan("livre"));

      const btn = row.querySelector(".btn-acao");
      atualizarClasseBotao(btn, "livre");
      btn.onclick = () => ocuparLeito(btn);

      tabela.appendChild(row);
      modalAdicionar.classList.add("hidden");
    });

    // Inicializa botões existentes
    document.querySelectorAll(".btn-acao").forEach((btn) => {
      const statusText = btn.closest("tr").querySelector("td:nth-child(3)").textContent.trim().toLowerCase();
      atualizarClasseBotao(btn, statusText);
      if (statusText === "ocupado") {
        btn.onclick = () => liberarLeito(btn);
      } else if (statusText === "livre") {
        btn.onclick = () => ocuparLeito(btn);
      } else {
        btn.disabled = true;
      }
    });
  });
