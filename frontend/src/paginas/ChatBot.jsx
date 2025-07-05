import React, { useState } from "react";

export default function Chatbot() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  async function enviarPergunta() {
    const response = await fetch("/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta })
    });

    const data = await response.json();
    setResposta(data.resposta);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">💬 Chatbot Urbano</h1>

      <input
        type="text"
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
        placeholder="Digite sua pergunta..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={enviarPergunta}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Enviar
      </button>

      {resposta && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Resposta:</h3>
          <p className="text-gray-800 whitespace-pre-line">{resposta}</p>
        </div>
      )}
    </div>
  );
}