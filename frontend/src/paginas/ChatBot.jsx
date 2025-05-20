import React, { useState } from "react";

export default function App() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handlePerguntar() {
    setCarregando(true);
    setResposta("Carregando...");
    try {
      const apiKey = window.env?.GEMINI_API_KEY;
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
      setResposta(data.candidates[0].content.parts[0].text);
    } catch (e) {
      setResposta('Erro: ' + e.message);
    }
    setCarregando(false);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h2>BotChat Gemini</h2>
      <input
        id="pergunta"
        type="text"
        placeholder="Digite sua pergunta"
        style={{ width: "80%" }}
        value={pergunta}
        onChange={e => setPergunta(e.target.value)}
        disabled={carregando}
      />
      <button id="btnPerguntar" onClick={handlePerguntar} disabled={carregando}>
        Perguntar
      </button>
      <div
        id="resposta"
        style={{ whiteSpace: "pre-wrap", marginTop: 20 }}
      >
        {resposta}
      </div>
    </div>
  );
}