async function perguntarGemini(pergunta) {
    const apiKey = window.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
        contents: [
            { parts: [{ text: pergunta }] }
        ]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('Erro na API: ' + response.statusText);
    }

    const data = await response.json();

    return data.candidates[0].content.parts[0].text;
}

document.getElementById('btnPerguntar').addEventListener('click', async () => {
    const perguntaInput = document.getElementById('pergunta');
    const respostaDiv = document.getElementById('resposta');

    respostaDiv.textContent = "Carregando...";
    try {
        const resposta = await perguntarGemini(perguntaInput.value);
        respostaDiv.textContent = resposta;
    } catch (e) {
        respostaDiv.textContent = 'Erro: ' + e.message;
    }
});

console.log(window.env.GEMINI_API_KEY);