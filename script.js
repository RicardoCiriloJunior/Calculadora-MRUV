document.addEventListener("DOMContentLoaded", () => {
    const formValores = document.getElementById("inputs");
    const radios = document.querySelectorAll('input[name="tipo"]');
    const areaTexto = document.getElementById('calculo-resultado')
    const inputs = {
        velocidade: document.getElementById('inputVelocidade'),
        distancia: document.getElementById('inputDistancia'),
        aceleracao: document.getElementById('inputAceleracao'),
        velocidadeInicial: document.getElementById('inputVelocidadeInicial')
    };

    // Atualiza os inputs conforme a seleção do usuário
    function atualizarInputs(selecionado){
        for (let chave in inputs) {
            const inputFilho = inputs[chave].querySelector('input');
            if (chave === selecionado){
                inputs[chave].style.display = "none";
                inputFilho.value = "" //Limpa o campo escondido
                inputFilho.required = false;
            } else {
                inputs[chave].style.display = "flex";
                inputFilho.value = "";
                inputFilho.required = true;
            }
        }
        //Caso especial para a opção 'tempo'
        if (selecionado === "tempo"){
            inputs["velocidade"].style.display = "flex";
            inputs["velocidadeInicial"].style.display = "flex";
            inputs["aceleracao"].style.display = "flex";
            inputs["distancia"].style.display = "none";
            inputs["velocidade"].querySelector('input').required = true;
            inputs["velocidadeInicial"].querySelector('input').required = true;
            inputs["aceleracao"].querySelector('input').required = true;
            inputs["distancia"].querySelector('input').required = false;
        }
    }

    // Atualiza os inputs sempre que o usuário mudar a opção
    radios.forEach(opcao => {
        opcao.addEventListener('change', () => {
            atualizarInputs(opcao.value);
            areaTexto.innerHTML = "";
        })

    })

    // Inicia a página com todos os inputs sem aparecer
    for(let chave in inputs){
        inputs[chave].style.display = "none";
    }

    formValores.addEventListener('submit', (event) => {
        event.preventDefault() //Evita o recarregamento da página ao enviar o formulário

        const opcaoSelecionada = document.querySelector('input[name="tipo"]:checked').value
        if (!opcaoSelecionada){
            areaTexto.innerHTML = `<b>Por favor, insira os valores e escolha o que deseja calcular</b>`;
            return;
        }

        // Pega os valores de cada input
        let velocidadeInicial = parseFloat(inputs["velocidadeInicial"].querySelector('input').value) || 0;
        let velocidade = parseFloat(inputs["velocidade"].querySelector('input').value) || 0;
        let distancia = parseFloat(inputs["distancia"].querySelector('input').value) || 0;
        let aceleracao = parseFloat(inputs["aceleracao"].querySelector('input').value) || 0;

        // Variáveis para os cálculos
        let vo = velocidadeInicial * velocidadeInicial; //Calcula a velocidade inicial ao quadrado
        let velocidadeQuadradoFormula = (vo + 2 * aceleracao * distancia).toFixed(2) //Calcula v₀² + 2 * a * Δs
        let velocidadeQuadrado = (velocidade * velocidade).toFixed(2); //Calcula velocidade ao quadrado
        let velocidadeFinal = Math.sqrt(velocidadeQuadradoFormula).toFixed(2) //Calcula a velocidade final
        let v2MenosVo = (velocidadeQuadrado - vo).toFixed(2); //Calcula v² - v₀²
        let distanciaFinal = ((v2MenosVo)/(2*aceleracao)).toFixed(2); //Calcula a distância final
        let aceleracaoFinal = ((v2MenosVo/distancia) / 2).toFixed(2); //Calcula a aceleração final
        let velocidadeInicialCalculo = Math.sqrt((velocidadeQuadrado - (2 * aceleracao * distancia))).toFixed(2); //Calcula a velocidade inicial
        let velocidadeFinalMenosInicial = (velocidade - velocidadeInicial).toFixed(2); //Calcula a velocidade final menos a inicial
        let tempo = (velocidadeFinalMenosInicial / aceleracao).toFixed(2); //Calcula o tempo
        
        // Aplicando a lógica dos cálculos e mostrando ao usuário
        switch (opcaoSelecionada) {
            case "velocidade":
                areaTexto.innerHTML = `
                v² = v₀² + 2 * a * Δs <br>
                v² = ${velocidadeInicial}² + 2 * ${aceleracao} * ${distancia} <br>
                v² = ${vo} + ${(2 * aceleracao * distancia).toFixed(2)} <br>
                v² = ${velocidadeQuadradoFormula} <br>
                √v² = √${velocidadeQuadradoFormula} <br>
                v = = ${velocidadeFinal} <br>
                <b>velocidade final ~= ${velocidadeFinal}m/s</b>
                `;
                break;
            case "distancia":
                areaTexto.innerHTML = `
                v² = v₀² + 2 * a * Δs <br>
                ${velocidade}² = ${velocidadeInicial}² + 2 * ${aceleracao} * Δs <br>
                ${velocidadeQuadrado} = ${vo} + ${2 * aceleracao} * Δs <br>
                ${velocidadeQuadrado} - ${vo} = ${2*aceleracao} * Δs <br>
                ${v2MenosVo} = ${2*aceleracao} * Δs <br>
                ${v2MenosVo} / ${2*aceleracao} = Δs <br>
                ${distanciaFinal} ~= Δs <br>
                <b>Distância ~= ${distanciaFinal}m</br>
                `;
                break;
            case "aceleracao":
                areaTexto.innerHTML = `
                v² = v₀² + 2 * a * Δs <br>
                ${velocidade}² = ${velocidadeInicial}² + 2 * a * ${distancia} <br>
                ${velocidadeQuadrado} = ${vo} + 2 * a * ${distancia} <br>
                ${velocidadeQuadrado} - ${vo} = 2 * a * ${distancia} <br>
                ${v2MenosVo} = 2 * a * ${distancia} <br>
                ${v2MenosVo} / ${distancia} = 2 * a <br>
                ${(v2MenosVo/distancia).toFixed(2)} = 2 * a <br>
                ${(v2MenosVo/distancia).toFixed(2)} / 2 = a <br>
                ${aceleracaoFinal} ~= a <br>
                <b>Aceleração ~= ${aceleracaoFinal}m/s</b>
                `;
                break;
            case "velocidadeInicial":
                areaTexto.innerHTML = `
                v² = v₀² + 2 * a * Δs <br>
                ${velocidade}² = Vo² + 2 * ${aceleracao} * ${distancia} <br>
                ${velocidadeQuadrado} = Vo² + 2 * ${aceleracao} * ${distancia} <br>
                ${velocidadeQuadrado} = Vo² + ${(2 * aceleracao * distancia).toFixed(2)} <br>
                ${velocidadeQuadrado} - ${(2 * aceleracao * distancia).toFixed(2)} = Vo² <br>
                ${(velocidadeQuadrado - (2 * aceleracao * distancia)).toFixed(2)} = Vo² <br>
                √${(velocidadeQuadrado - (2 * aceleracao * distancia)).toFixed(2)} = √Vo² <br>
                ${isNaN(velocidadeInicialCalculo) ? 0 : velocidadeInicialCalculo} ~= Vo² <br>
                <b>Velocidade inicial ~= ${isNaN(velocidadeInicialCalculo) ? 0 : velocidadeInicialCalculo}m/s</b>
                `;
                break;
            case "tempo":
                areaTexto.innerHTML = `
                v = v₀ + a * t <br>
                ${velocidade} = ${velocidadeInicial} + ${aceleracao} * t <br>
                ${velocidade} - ${velocidadeInicial} = ${aceleracao} * t <br>
                ${velocidadeFinalMenosInicial} = ${aceleracao} * t <br>
                ${velocidadeFinalMenosInicial} / ${aceleracao} = t <br>
                ${tempo} ~= t <br>
                <b>Tempo do percurso ~= ${tempo}s</b>
                `;
                break;
            default:
                break;
        }
    })
});
