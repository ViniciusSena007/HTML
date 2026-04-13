// Função para verificar idade
function verificarIdade() {
    let idade = parseInt(document.getElementById("idade").value);
    if (idade < 18) {
        alert("Para viajar sozinho. é nescessário ser maior de idade")
    }
}

function enviarFormulario(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let destino = document.getElementById("destino").value;
    let dtIda = document.getElementById("dataIda").value;
    let dtVolta = document.getElementById("dataVolta").value;

    let resultado = document.getElementById("resultado")

    resultado.innerHTML = `
    <div class="card p-3 mt-3">
       <h4> Dados de Cadastro </h4>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Idade:</strong> ${idade}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Data de ida:</strong> ${dtIda}</p>
            <p><strong>Data de volta:</strong> ${dtVolta}</p>
    `;
}