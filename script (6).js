// Base de dados pronta para os alunos usarem no script
const dadosPesquisa = {
  mediaNacionalDiaria: 4, // Média de horas que o brasileiro passa nas redes
  alertaSaude: 6,         // Limite recomendado por especialistas
  sugestoes: [
    { limite: 2, mensagem: "Parabéns! Seu uso está equilibrado. Você tem mais tempo livre para hobbies e descanso." },
    { limite: 5, mensagem: "Atenção. Você está na média nacional, mas já gasta quase um dia inteiro da sua semana olhando para a tela." },
    { limite: 24, mensagem: "Cuidado! Seu uso é considerado muito alto. Isso pode afetar seu sono, foco e saúde mental. Que tal um detox digital?" }
  ]
};

// Elementos da página
const campo = document.getElementById("horas");
const botao = document.getElementById("calcular");
const caixaResultado = document.getElementById("resultado");
const textoSemana = document.getElementById("semana");
const textoMes = document.getElementById("mes");
const barra = document.getElementById("barra");
const textoComparacao = document.getElementById("comparacao");
const textoReflexao = document.getElementById("reflexao");
const textoErro = document.getElementById("erro");

// A barra mostra de 0 a 12 horas por dia
const ESCALA_MAXIMA = 12;

botao.addEventListener("click", mostrarResultado);
campo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") mostrarResultado();
});

// Descobre qual mensagem da base de dados combina com as horas digitadas
function escolherMensagem(horas) {
  for (const faixa of dadosPesquisa.sugestoes) {
    if (horas <= faixa.limite) return faixa.mensagem;
  }
  return "";
}

// Monta a frase de comparação com a média nacional
function compararComMedia(horas) {
  const media = dadosPesquisa.mediaNacionalDiaria;
  const semana = horas * 7;
  let frase = "Você passa " + semana + " horas por semana nas redes sociais. ";

  if (horas > media) {
    frase += "Isso é mais do que a média nacional de " + media + " horas por dia.";
  } else if (horas < media) {
    frase += "Isso é menos do que a média nacional de " + media + " horas por dia.";
  } else {
    frase += "Isso é exatamente a média nacional de " + media + " horas por dia.";
  }

  if (horas >= dadosPesquisa.alertaSaude) {
    frase += " Você chegou ao limite de " + dadosPesquisa.alertaSaude + " horas indicado por especialistas.";
  }
  return frase;
}

function mostrarResultado() {
  const horas = parseFloat(campo.value);

  // Entrada inválida: mostra o erro e esconde o resultado
  if (isNaN(horas) || horas < 0 || horas > 24) {
    textoErro.innerText = "Digite um número de horas entre 0 e 24.";
    caixaResultado.classList.add("escondido");
    return;
  }
  textoErro.innerText = "";

  // Contas
  textoSemana.innerText = horas * 7;
  textoMes.innerText = horas * 30;

  // Textos
  textoComparacao.innerText = compararComMedia(horas);
  textoReflexao.innerText = escolherMensagem(horas);

  // Barra: a largura vai de 0% a 100% (limitada em 12 horas)
  caixaResultado.classList.remove("escondido");
  const porcentagem = Math.min(horas / ESCALA_MAXIMA, 1) * 100;
  barra.style.width = porcentagem + "%";
}
