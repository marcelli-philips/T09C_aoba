function verificarAlertas() {
  const alertas = document.querySelectorAll('.alerts li');
  alertas.forEach(alerta => {
    if (alerta.textContent.includes("UTI com 90%")) {
      alerta.style.fontWeight = 'bold';
      alerta.style.animation = 'piscar 1s infinite';
    }
  });
}

setTimeout(verificarAlertas, 500);

function filtrarAlertas() {
  const texto = document.getElementById('buscaAlerta').value.toLowerCase();
  document.querySelectorAll('.alerts li').forEach(alerta => {
    alerta.style.display = alerta.textContent.toLowerCase().includes(texto) ? 'block' : 'none';
  });
}

function atualizarRelogio() {
  const agora = new Date();
  document.getElementById('relogio').textContent = agora.toLocaleTimeString();
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); // executa ao carregar
