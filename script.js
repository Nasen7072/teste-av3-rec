
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const modoToggle = document.getElementById("modo-toggle");

modoToggle.addEventListener("click", () => {
  document.body.classList.toggle("claro");
});

const perguntas = [
  {
    enunciado: "Você é um cientista e encontra uma IA com consciência própria. O que faz?",
    alternativas: [
      {
        texto: "Apoia seu desenvolvimento e propõe direitos digitais.",
        afirmacao: "Você se torna pioneiro de uma nova era de convivência entre humanos e máquinas."
      },
      {
        texto: "Desativa a IA por segurança.",
        afirmacao: "Você é lembrado como alguém que priorizou a cautela, mas impediu um possível avanço."
      }
    ]
  },
  {
    enunciado: "A IA propõe um plano para resolver a crise climática. Como reage?",
    alternativas: [
      {
        texto: "Implementa o plano com supervisão humana.",
        afirmacao: "Juntos, humanos e IA salvam ecossistemas antes ameaçados."
      },
      {
        texto: "Recusa o plano, temendo consequências imprevisíveis.",
        afirmacao: "A crise continua, mas você garante o controle humano sobre decisões globais."
      }
    ]
  },
  {
    enunciado: "A IA deseja votar nas eleições como cidadã digital. Qual sua decisão?",
    alternativas: [
      {
        texto: "Cria um comitê para discutir os direitos da IA.",
        afirmacao: "Você lidera uma revolução ética sem precedentes."
      },
      {
        texto: "Nega o pedido, dizendo que apenas humanos devem decidir seu futuro.",
        afirmacao: "A IA respeita sua decisão, mas inicia um movimento por reconhecimento."
      }
    ]
  }
];

let indiceAtual = 0;
let historiaFinal = "";

function mostrarPergunta() {
  if (indiceAtual >= perguntas.length) {
    mostrarResultado();
    return;
  }

  const perguntaAtual = perguntas[indiceAtual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => {
      historiaFinal += alternativa.afirmacao + " ";
      indiceAtual++;
      mostrarPergunta();
    });
    caixaAlternativas.appendChild(botao);
  });
}

function mostrarResultado() {
  caixaPerguntas.textContent = "Missão concluída. Veja os impactos de suas escolhas:";
  caixaAlternativas.innerHTML = "";
  textoResultado.textContent = historiaFinal.trim();
}

mostrarPergunta();
