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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md mb-6">
        {/* Botão de voltar */}
        <Link to="/settings" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
          <Undo2 size={20} />
          Voltar
        </Link>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${isError ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
            {message}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl mb-2 font-bold text-gray-800">Recuperar senha</h2>
              <p className="text-gray-500 text-sm">Digite seu e-mail para receber o código de verificação</p>
            </div>
            <input
              type="email"
              placeholder="seu@email.com"
              className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendEmail}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg w-full hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl mb-2 font-bold text-gray-800">Verificar código</h2>
              <p className="text-gray-500 text-sm">Digite o código que enviamos para seu e-mail</p>
            </div>
            <input
              type="text"
              placeholder="000000"
              className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-center text-2xl tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg w-full hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl mb-2 font-bold text-gray-800">Nova senha</h2>
              <p className="text-gray-500 text-sm">Escolha uma senha forte para sua conta</p>
            </div>
            <input
              type="password"
              placeholder="Digite a nova senha"
              className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg w-full hover:from-green-600 hover:to-green-700 font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redefinindo..." : "Redefinir senha"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}