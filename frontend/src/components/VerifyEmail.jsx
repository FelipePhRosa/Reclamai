import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MailCheck, Undo2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function VerifyEmail() {
    const {user, setUser} = useContext(AuthContext);
    const [email, setEmail] = useState( user?.email ||"");
    const [code, setCode] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleVerificar(e) {
        e.preventDefault();

        if (!email || !code) {
            setError("Preencha todos os campos.");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Erro ao verificar e-mail.");
            }

            setMensagem("E-mail verificado com sucesso!");
                // Atualiza o estado do user localmente
                setUser(prev => ({ ...prev, is_verified: 1 }));
            setError(null);
            navigate("/settings")

        } catch (err) {
            setError(err.message || String(err));
        }
    }

    async function handleSendCode(e) {
        if (e && e.preventDefault) e.preventDefault();

        if (!email) {
            setError("Informe seu e-mail para reenviar o código.");
            return;
        }

        try {
            setError(null);
            setMensagem('Enviando código...');

            const res = await fetch('http://localhost:3000/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Erro ao reenviar código.');
            }

            setMensagem(data.message || 'Código reenviado com sucesso.');
            setError(null);
        } catch (err) {
            setError(err.message || String(err));
            setMensagem('');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleVerificar}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div>
                    <Link to="/login">
                        <Undo2 className="text-blue-500 mb-2" />
                    </Link>
                </div>

                <div className="flex justify-center mb-4">
                    <MailCheck className="text-blue-600 w-10 h-10" />
                </div>

                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Verificar E-mail
                </h2>

                <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="border p-2 w-full mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Código de verificação"
                    className="border p-2 w-full rounded"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <div className="mb-4">
                    <a onClick={handleSendCode} className="text-blue-500 cursor-pointer font-semibold rounded w-full">Reenviar código</a>
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {mensagem && <p className="text-green-600 mb-2">{mensagem}</p>}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-400"> Verificar</button>
            </form>
        </div>
    );
}
