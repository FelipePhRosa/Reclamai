import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Undo2 } from 'lucide-react';


export default function RedefinirSenha() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Erro ao enviar código.");
        return;
      }

      setIsError(false);
      setMessage(data.message || "Código enviado com sucesso!");
      setStep(2);
    } catch (error) {
      setIsError(true);
      setMessage("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Código inválido.");
        return;
      }

      setIsError(false);
      setMessage(data.message || "Código verificado com sucesso!");
      setStep(3);
    } catch (error) {
      setIsError(true);
      setMessage("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/resetpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "Erro ao redefinir senha.");
        return;
      }

      setIsError(false);
      setMessage(data.message || "Senha redefinida com sucesso!");
      
      setTimeout(() => {
        navigate("/settings");
      }, 1000);
      
    } catch (error) {
      setIsError(true);
      setMessage("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <div className="w-full max-w-sm mb-4">




        {/* Botão de voltar */}
    <Link to="/settings" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
      <Undo2 size={20} />
      Voltar
    </Link>
  </div>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        
        {message && (
          <p className={`mb-4 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl mb-4 font-bold text-center text-blue-600">Recuperar senha</h2>
            <input
              type="email"
              placeholder="Seu e-mail"
              className="border p-2 w-full mb-4 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendEmail}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl mb-4 font-bold text-blue-600 text-center">Verificar código</h2>
            <input
              type="text"
              placeholder="Código recebido"
              className="border p-2 w-full mb-4 rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl mb-4 font-bold text-blue-600 text-center">Nova senha</h2>
            <input
              type="password"
              placeholder="Digite a nova senha"
              className="border p-2 w-full mb-4 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
            >
              {loading ? "Redefinindo..." : "Redefinir senha"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
