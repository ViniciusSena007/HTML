// Função para verificar idade
function verificarIdade() {
    let idade = parseInt(document.getElementById("idade").value);
    let mensagem = document.getElementById("mensagem");
    
    if (idade < 18) {
        mensagem.textContent = "⚠️ Menores de 18 anos precisam de autorização de responsável!";
        mensagem.style.color = "#ff6600";
    } else {
        mensagem.textContent = "✓ Idade válida para viagem independente";
        mensagem.style.color = "#28a745";
    }
}

// Função para validar datas
function validarDatas() {
    let dataIda = document.getElementById("dataIda").value;
    let dataVolta = document.getElementById("dataVolta").value;
    let erroData = document.getElementById("erroData");
    
    if (!dataIda || !dataVolta) {
        return true;
    }
    
    if (new Date(dataVolta) <= new Date(dataIda)) {
        erroData.textContent = "❌ Data de volta deve ser posterior à data de ida!";
        return false;
    } else {
        erroData.textContent = "";
        return true;
    }
}

// Validar datas ao mudar
document.addEventListener("DOMContentLoaded", function() {
    const dataIda = document.getElementById("dataIda");
    const dataVolta = document.getElementById("dataVolta");
    
    if (dataIda) {
        dataIda.addEventListener("change", validarDatas);
    }
    if (dataVolta) {
        dataVolta.addEventListener("change", validarDatas);
    }
});

async function buscarCep() {
    // receber o valor digitado no input do CEP

    let cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, "")

    if (cep.length !== 8) {
        document.getElementById("mensagem").textContent = "❌ CEP Inválido";
        document.getElementById("mensagem").style.color = "#dc3545";
        return;
    }

    try {
        //Faz a requisição para a api do ViaCEP
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // Converter a resposta o viacep para o json
        let dados = await resposta.json();
        //Verificar se o cep não foi encontrado
        if (dados.erro) {
            document.getElementById("mensagem").textContent = "❌ CEP não encontrado";
            document.getElementById("mensagem").style.color = "#dc3545";
            return;
        }

        // preencher os campos do formulario
        document.getElementById("logradouro").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("uf").value = dados.uf;

        document.getElementById("mensagem").textContent = "✓ Endereço encontrado com sucesso!";
        document.getElementById("mensagem").style.color = "#28a745";
    } catch (erro) {
        document.getElementById("mensagem").textContent = "❌ Erro ao buscar CEP";
        document.getElementById("mensagem").style.color = "#dc3545";
    }

}

function enviarFormulario(event) {
    event.preventDefault();

    // Validar datas antes de enviar
    if (!validarDatas()) {
        alert("❌ Corrija os erros de datas antes de enviar!");
        return;
    }

    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let destino = document.getElementById("destino").value;
    let tipo = document.getElementById("tipo").value;
    let dtIda = document.getElementById("dataIda").value;
    let dtVolta = document.getElementById("dataVolta").value;
    
    // Obter hobbies selecionados
    let hobbysSelecionados = [];
    document.querySelectorAll("input[name='hobbies']:checked").forEach(hobby => {
        hobbysSelecionados.push(hobby.value);
    });
    
    // Obter opção de promoção
    let promo = document.querySelector("input[name='promo']:checked").value;

    let resultado = document.getElementById("resultado")

    resultado.innerHTML = `
    <div class="card p-4 mt-4 border-success">
       <h4 class="text-success">✓ Dados de Cadastro Confirmados</h4>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Idade:</strong> ${idade} anos</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Tipo de Viagem:</strong> ${tipo}</p>
            <p><strong>Data de ida:</strong> ${new Date(dtIda).toLocaleDateString('pt-BR')}</p>
            <p><strong>Data de volta:</strong> ${new Date(dtVolta).toLocaleDateString('pt-BR')}</p>
            <p><strong>Hobbies:</strong> ${hobbysSelecionados.length > 0 ? hobbysSelecionados.join(", ") : "Nenhum"}</p>
            <p><strong>Receber promoções:</strong> ${promo === 'sim' ? '✓ Sim' : '✗ Não'}</p>
    `;
}