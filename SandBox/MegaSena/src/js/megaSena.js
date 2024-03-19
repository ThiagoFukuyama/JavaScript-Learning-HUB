const numerosApostados = [];
const resultado = [];
let valorAposta = 0;
let qtdAcertos = 0;


const btnApostar = document.getElementById("btnApostar");
btnApostar.disabled = true;

sortearNumeros();

function sortearNumeros() {  // otimizar essa funcao mais tarde
    for (i = 0; i < 6; i++) {
        let numeroSorteado = Math.round(Math.random() * 59 + 1);

        // verifica se o número sorteado exite na lista, enquanto exixtir ele vai sortear um nopvo número
        while (resultado.includes(numeroSorteado)) {
            let numeroSorteado = Math.round(Math.random() * 59 + 1);
        }
        resultado.push(numeroSorteado);// insere o número sorteado na lista
    }

};

function selecionarNumeros(numero) {
    if (numerosApostados.length >= 0 && numerosApostados.length < 20) {
        // add o numero a lista
        numerosApostados.push(numero);

        //desabilita o numero escolhido - nao funciona, ver 
        desabilitarNumeroEscolhido(numero);

        // condic que habilita o botao "Apostar"
        if (numerosApostados.length > 5) {
            btnApostar.disabled = false;

            valorAposta();
        };

        // mostra quantidade de numeros apostados
        const qtdApostas = document.getElementById("qtdNumeros");
        qtdApostas.innerHTML = "<p>Qtd Numeros</p><p class='valor'>" + numerosApostados.length + "</p > ";
    };

};

function desabilitarNumeroEscolhido(numero) {
    document.getElementById("num_" + numero).disabled = true;
    document.getElementById("num_" + numero).style.background = "#009e4c";
    document.getElementById("num_" + numero).style.color = "#fff";


};

function valordaAposta() { // nao funciona - ver 
    switch (numerosApostados.length) {
        case 6:
            valorAposta = "R$ 5,00"
            break;
        case 7:
            valorAposta = "R$ 35,00"
            break;
        case 8:
            valorAposta = "R$ 140,00"
            break;
        case 9:
            valorAposta = "R$ 420,00"
            break;
        case 10:
            valorAposta = "R$ 1.050,00"
            break;
        case 11:
            valorAposta = "R$ 2.310,00"
            break;
        case 12:
            valorAposta = "R$ 4.620,00"
            break;
        case 13:
            valorAposta = "R$ 8.580,00"
            break;
        case 14:
            valorAposta = "R$ 15.015,00"
            break;
        case 15:
            valorAposta = "R$ 25.025,00"
            break;
        case 16:
            valorAposta = "R$ 40.040,00"
            break;
        case 17:
            valorAposta = "R$  61.880,00"
            break;
        case 18:
            valorAposta = "R$ 92.820,00"
            break;
        case 19:
            valorAposta = "R$ 135.660,00"
            break;
        case 20:
            valorAposta = "R$ 193.800,00"
            break;
        default:
            valorAposta = "R$ 0,00"
            break;
    }

    const divValorAposta = document.getElementById("valor");
    divValorAposta.innerHTML = "<p>valor da Aposta</p><p class='valor'>" + valorAposta + "</p>";
};

function apostar() {
    for (i = 0; i < numerosApostados.length; i++) { //confere os acertos e coloca os valores na var qtdAcertos
        if (resultado.includes(numerosApostados[i])) {
            qtdAcertos++;
        }
    }
    //mostra o resultado
    const divResultado = document.getElementById("resultado");
    for (i = 0; i < resultado.length; i++) {
        divResultado.innerHTML += "<div class='resultadoCircle'>" + resultado[i] + "</div>";
    }

    //mostra qtd de acertos
    let divAcertos = document.getElementById("acertos")
    divAcertos.innerHTML = "<p>Acertos</p><p class='valor'>" + qtdAcertos + "</p>"

    //desabilitar todos botoes
    desabilitarTodosNumeros();

    //habilitar o botao reiniciar
    document.getElementById("btnReiniciar").style.display = 'inline';

};

function desabilitarTodosNumeros() {
    for (i = 0; i <= 60; i++)
        document.getElementById("num_" + i).disabled = true;


}

let btn = document.querySelector("#btnReiniciar");
btn.addEventListener("click", function () {
    location.reload();
});