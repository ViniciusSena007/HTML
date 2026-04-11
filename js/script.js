// Função para verificar idade
function verificarIdade(){
    let idade = parseInt(document.getElementById("idade").value);
    if(idade < 18){
        alert("Para viajar sozinho. é nescessário ser maior de idade")
    }
}