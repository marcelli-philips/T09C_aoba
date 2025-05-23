document.addEventListener("DOMContentLoaded", function () {
  const dados = localStorage.getItem("prescricao");

  document.getElementById("toggle-menu").addEventListener("click", function () {
    const sidebar = document.querySelector("aside");
    sidebar.classList.toggle("minimized");
  });

  if (dados) {
    const prescricao = JSON.parse(dados);

    document.getElementById("medicoPrescricao").textContent =
      prescricao.medico || "-";
    document.getElementById("medicamentoPrescricao").textContent =
      prescricao.medicamento || "-";
    document.getElementById("dosagemPrescricao").textContent =
      prescricao.dosagem || "-";
    document.getElementById("orientacaoPrescricao").textContent =
      prescricao.orientacao || "-";
  } else {
    document.getElementById("dadosPrescricao").innerHTML =
      "<p>Nenhuma prescrição encontrada.</p>";
  }
});

const pesquisaAlergia = document.getElementById("pesquisa");
const tabelaAlergia = document.getElementById("registro");
const btnBuscarAlergia = document.getElementById("myBtn");
const statusBusca = document.getElementById("buscar-alergia-status");

function inicializarTabela() {
  if (!tabelaAlergia.querySelector("thead")) {
    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
        <th>Nome da Alergia</th>
        <th>Descrição</th>
      </tr>
    `;
    tabelaAlergia.appendChild(thead);
  }

  if (!tabelaAlergia.querySelector("tbody")) {
    const tbody = document.createElement("tbody");
    tabelaAlergia.appendChild(tbody);
  }
}

btnBuscarAlergia.addEventListener("click", atualizarTabelaAlergia);

function atualizarTabelaAlergia() {
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const filtro = pesquisaAlergia.value.trim().toLowerCase();

  statusBusca.style.display = "none";

  if (!filtro) {
    tabelaAlergia.style.display = "none";
    return;
  }

  const alergias = registros.filter((r) => r.tipo === "alergia");

  const resultados = alergias.filter(
    (r) =>
      r.nomeAlergia.toLowerCase().includes(filtro) ||
      r.descricaoAlergia.toLowerCase().includes(filtro)
  );

  if (resultados.length === 0) {
    statusBusca.style.display = "block";
    return;
  }

  inicializarTabela();

  const tbody = tabelaAlergia.querySelector("tbody");

  resultados.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML += `
    <td>${r.nomeAlergia}</td>
    <td>${r.descricaoAlergia}</td>
    `;
    tbody.appendChild(tr);
  })

  tabelaAlergia.style.display = "table";
}