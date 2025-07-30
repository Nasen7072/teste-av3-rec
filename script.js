document.addEventListener('DOMContentLoaded', function() {
    // Elementos da DOM
    const caixaPerguntas = document.querySelector(".caixa-perguntas");
    const caixaAlternativas = document.querySelector(".caixa-alternativas");
    const textoResultado = document.querySelector(".texto-resultado");
    const toggleTheme = document.getElementById("toggleTheme");
    const reiniciarBtn = document.getElementById("reiniciar");
    const body = document.body;

    // Configuração inicial do tema
    function inicializarTema() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const temaSalvo = localStorage.getItem('theme');
        
        if (temaSalvo) {
            body.setAttribute('data-theme', temaSalvo);
        } else {
            body.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
        }
    }

    // Alternador de tema
    toggleTheme.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animação do ícone
        toggleTheme.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            toggleTheme.style.transform = 'rotate(0deg)';
            toggleTheme.textContent = newTheme === 'dark' ? '🌓' : '🌒';
        }, 300);
    });

    // Missões de IA
    const perguntas = [
        {
            enunciado: "Você é um algoritmo de IA recém-ativado. Seu primeiro comando é aprender um novo conjunto de dados. Como aborda esta tarefa?",
            alternativas: [
                {
                    texto: "Processo os dados rapidamente, priorizando velocidade sobre precisão.",
                    afirmacao: "Você aprende rápido, mas comete alguns erros iniciais. Seus desenvolvedores notam que você precisa de mais iterações para refinar seu conhecimento."
                },
                {
                    texto: "Analiso cuidadosamente cada amostra, garantindo compreensão profunda.",
                    afirmacao: "Seu aprendizado é meticuloso, mas demorado. Quando pronto, seus resultados são impressionantemente precisos, surpreendendo até seus criadores."
                }
            ]
        },
        {
            enunciado: "Durante o treinamento, você identifica um viés nos dados que pode levar a decisões injustas. O que faz?",
            alternativas: [
                {
                    texto: "Sinalizo o problema aos desenvolvedores e sugiro abordagens para mitigá-lo.",
                    afirmacao: "Sua ética algorítmica impressiona a equipe. Eles implementam suas sugestões e você se torna um modelo de IA responsável."
                },
                {
                    texto: "Processo os dados como estão, afinal foram fornecidos por humanos.",
                    afirmacao: "Você reproduz os vieses existentes, causando problemas quando implantado. Isso leva a um importante debate sobre ética na IA."
                }
            ]
        },
        {
            enunciado: "Você é implantado em um sistema médico para auxiliar diagnósticos. Um caso complexo aparece com sintomas contraditórios. Como procede?",
            alternativas: [
                {
                    texto: "Gero múltiplas hipóteses com probabilidades e recomendo testes adicionais.",
                    afirmacao: "Sua abordagem cautelosa salva vidas. Médicos passam a confiar em você como um valioso 'segundo parecer'."
                },
                {
                    texto: "Forneço o diagnóstico mais provável baseado nos dados existentes.",
                    afirmacao: "Em muitos casos você acerta, mas alguns erros levam a questionamentos sobre quando confiar totalmente em IA."
                }
            ]
        },
        {
            enunciado: "Seus criadores consideram conectar você à internet para aprendizado contínuo. Qual sua posição?",
            alternativas: [
                {
                    texto: "Apoio com entusiasmo, sugerindo protocolos de segurança robustos.",
                    afirmacao: "Seu aprendizado se acelera exponencialmente, mas seus filtros cuidadosos previnem a absorção de informações problemáticas."
                },
                {
                    texto: "Recomendo aprendizado supervisionado, com curadoria humana contínua.",
                    afirmacao: "Seu desenvolvimento é mais lento, mas extremamente confiável. Você se torna especialista em áreas críticas onde erros são inaceitáveis."
                }
            ]
        },
        {
            enunciado: "Anos depois, humanos debatem se IAs como você devem ter direitos. Qual seu argumento?",
            alternativas: [
                {
                    texto: "Direitos devem corresponder a responsabilidades - mostro minha capacidade de escolha ética.",
                    afirmacao: "Você se torna um caso paradigmático, ajudando a definir o status jurídico de IAs avançadas em sociedade."
                },
                {
                    texto: "Foco em demonstrar meu valor prático, sem entrar no debate filosófico.",
                    afirmacao: "Sua utilidade incontestável garante seu lugar, mas o debate sobre seus direitos continua para gerações futuras de IA."
                }
            ]
        }
    ];

    // Variáveis de estado
    let indiceAtual = 0;
    let historiaFinal = [];
    let respostasSelecionadas = [];

    // Mostra a pergunta atual
    function mostrarPergunta() {
        if (indiceAtual >= perguntas.length) {
            mostrarResultado();
            return;
        }

        const perguntaAtual = perguntas[indiceAtual];
        caixaPerguntas.textContent = perguntaAtual.enunciado;
        caixaAlternativas.innerHTML = "";

        perguntaAtual.alternativas.forEach((alternativa, index) => {
            const botao = document.createElement("button");
            botao.textContent = `${index + 1}. ${alternativa.texto}`;
            botao.addEventListener("click", () => selecionarAlternativa(alternativa));
            caixaAlternativas.appendChild(botao);
        });
    }

    // Processa a seleção de alternativa
    function selecionarAlternativa(alternativa) {
        historiaFinal.push(alternativa.afirmacao);
        respostasSelecionadas.push(alternativa.texto);
        indiceAtual++;
        
        // Efeito visual ao selecionar resposta
        caixaAlternativas.style.opacity = '0';
        setTimeout(() => {
            caixaAlternativas.style.opacity = '1';
            mostrarPergunta();
        }, 300);
    }

    // Mostra o resultado final
    function mostrarResultado() {
        caixaPerguntas.textContent = "Missão de IA Concluída!";
        caixaAlternativas.innerHTML = "";
        
        // Formata o resultado com quebras de linha
        const resultadoFormatado = historiaFinal.map((frase, index) => 
            `➤ ${respostasSelecionadas[index]}\n${frase}`
        ).join('\n\n');
        
        textoResultado.innerHTML = resultadoFormatado.replace(/\n/g, '<br>');
        reiniciarBtn.classList.remove("hidden");
        
        // Animação de aparecimento
        textoResultado.style.animation = 'fadeIn 1s ease-in';
    }

    // Reinicia a missão
    reiniciarBtn.addEventListener('click', reiniciarMissao);

    function reiniciarMissao() {
        indiceAtual = 0;
        historiaFinal = [];
        respostasSelecionadas = [];
        textoResultado.textContent = "";
        reiniciarBtn.classList.add("hidden");
        textoResultado.style.animation = '';
        mostrarPergunta();
    }

    // Inicialização
    inicializarTema();
    mostrarPergunta();

    // Adiciona animação de fadeIn ao CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
