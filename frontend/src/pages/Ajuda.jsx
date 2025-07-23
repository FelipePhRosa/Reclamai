import React, { useState } from "react";
import Layout from "../components/Layout";

function Ajuda() {
  const [mensagens, setMensagens] = useState([
    {
      remetente: "bot",
      texto:
        "Olá, sou a assistente virtual.\n\nQual problema você está enfrentando?\n\n1️⃣ Cadastro\n2️⃣ Login\n3️⃣ Denúncia\n4️⃣ Denúncia pendente",
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const [etapa, setEtapa] = useState("inicio");

  const respostas = {
    "1": "Para se cadastrar, vá até a página de cadastro e preencha todos os campos obrigatórios.",
    "cadastro": "Para se cadastrar, vá até a página de cadastro e preencha todos os campos obrigatórios.",

    "2": "Se você está com problemas de login, verifique seu email e senha. Caso tenha esquecido a senha, clique em 'Esqueci minha senha'.",
    "login": "Se você está com problemas de login, verifique seu email e senha. Caso tenha esquecido a senha, clique em 'Esqueci minha senha'.",

    "3": "Para fazer uma denúncia, vá até a aba 'Reportar Problema' e preencha o formulário com os detalhes.",
    "denúncia": "Para fazer uma denúncia, vá até a aba 'Reportar Problema' e preencha o formulário com os detalhes.",
    "denuncia": "Para fazer uma denúncia, vá até a aba 'Reportar Problema' e preencha o formulário com os detalhes.",

    "4": "Sua denúncia está em análise. Em breve, um administrador irá aprovar ou reprovar, dependendo da veracidade da situação.",
    "denúncia pendente": "Sua denúncia está em análise. Em breve, um administrador irá aprovar ou reprovar, dependendo da veracidade da situação.",
    "denuncia pendente": "Sua denúncia está em análise. Em breve, um administrador irá aprovar ou reprovar, dependendo da veracidade da situação.",
  };

  const reiniciarAjuda = () => {
    setMensagens((prev) => [
      ...prev,
      {
        remetente: "bot",
        texto:
          "\nCom o que mais posso te ajudar?\n\n1️⃣ Cadastro\n2️⃣ Login\n3️⃣ Denúncia\n4️⃣ Denúncia pendente",
      },
    ]);
    setEtapa("inicio");
  };

  const handleEnviar = () => {
    const pergunta = entrada.trim().toLowerCase();
    if (!pergunta) return;

    const novaMensagemUsuario = { remetente: "usuário", texto: entrada };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setEntrada("");

    if (etapa === "inicio") {
      if (respostas[pergunta]) {
        const respostaBot = respostas[pergunta];
        setMensagens((prev) => [
          ...prev,
          { remetente: "bot", texto: respostaBot },
          { remetente: "bot", texto: "Posso te ajudar com mais alguma coisa? (Sim/Não)" },
        ]);
        setEtapa("continuar");
      } else {
        setMensagens((prev) => [
          ...prev,
          { remetente: "bot", texto: "Desculpe, não entendi. Escolha uma opção válida (1-4)." },
        ]);
      }
    } else if (etapa === "continuar") {
      if (pergunta === "sim") {
        reiniciarAjuda();
      } else if (pergunta === "não" || pergunta === "nao") {
        setMensagens((prev) => [
          ...prev,
          { remetente: "bot", texto: "Tudo bem! Se precisar de mais ajuda, é só digitar abaixo." },
        ]);
        setEtapa("final");
      } else {
        setMensagens((prev) => [
          ...prev,
          { remetente: "bot", texto: "Por favor, responda com 'Sim' ou 'Não'." },
        ]);
      }
    } else if (etapa === "final") {
     
      reiniciarAjuda();
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Central de Ajuda</h1>

        <div className="bg-white shadow rounded p-4">
          <div className="h-[350px]  overflow-y-auto border p-2 mb-2 rounded bg-gray-50">
            {mensagens.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  msg.remetente === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded max-w-[80%] whitespace-pre-wrap ${
                    msg.remetente === "bot"
                      ? "bg-blue-100 text-left"
                      : "bg-green-100 text-right"
                  }`}
                >
                  {msg.texto}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Digite aqui..."
              className="flex-1 border p-2 rounded-l"
            />
            <button
              onClick={handleEnviar}
              className="bg-blue-500 text-white px-4 rounded-r"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Ajuda;
