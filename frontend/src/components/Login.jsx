import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from "../assets/Reclamainobg.png";
import Gicon from "../assets/Gicon.png";
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleMidiaLogin = async (provider, token) => {
    try {
      let userData;

      if (provider === "google") {
        const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${token}` }
        });
        userData = await res.json();
      }

      const backendRes = await fetch("http://localhost:3000/loginMidia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          name: (userData.name || "").trim().split(" ")[0] || "Usuário",
          fullName: userData.name,
          avatar: userData.picture,
          birth_date: null,
          provider,
          providerId: userData.id,
          token,
        }),
      });

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        throw new Error(errorText || "Erro no backend");
      }

      const data = await backendRes.json();
      login(data.token, data);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(provider + " login failed", error);
      alert(`Erro ao logar com ${provider}`);
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      await handleMidiaLogin("google", response.access_token);
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      alert("Falha ao logar com Google");
    },
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (!res.ok) throw new Error('Login inválido');

      const data = await res.json();

      login(data.token, {
        userId: data.userId,
        nameUser: data.name,
        fullName: data.fullName,
        birth_date: data.birth_date,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        role: data.role,
        avatar_url: data.avatar_url,
        requiresOTP: data.requiresOTP
      });

      if (data.requiresOTP === "true" || data.requiresOTP === true) {
        navigate('/verifyEmail');
      } else {
        navigate('/');
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-screen bg-blue-200 relative">
      
      {/* Fundo */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
           style={{ backgroundImage: 'url(/background.png)', filter: 'brightness(1.09) contrast(1.15)' }}
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-sky-200/50 to-sky-200/10 backdrop-blur-[0.3px]" />

      {/* Conteúdo */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full px-4 md:px-16 lg:px-32 gap-8">

        {/* Lado esquerdo: Logo e texto */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:w-1/2">
          <img src={Logo} alt="Logo" className="w-28 md:w-36 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md">RECLAMAI</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-sm">
            Entre na sua conta!
          </h2>
          <p className="text-md sm:text-lg md:text-xl text-black/80 drop-shadow-sm">
            Bem-vindo ao Reclamai! Aqui, tua voz ajuda a cidade a melhorar.
          </p>
        </div>

        {/* Lado direito: Formulário */}
        <div className="flex justify-center md:justify-end md:w-1/2 w-full">
          <div className="flex flex-col w-full max-w-md p-6 bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700">
            
            {/* Email */}
            <label className="font-semibold text-slate-300 mb-1">Email ou nome de usuário</label>
            <input
              type="text"
              placeholder="Digite seu e-mail aqui..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />

            {/* Senha */}
            <label className="font-semibold text-slate-300 mb-1">Senha de acesso</label>
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg w-full mb-4 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-0"
            >
              Entrar
            </button>

            {/* Links */}
            <div className="flex flex-col sm:flex-row justify-between text-sm mb-4 gap-2">
              <Link to="/esqueceu-senha" className="text-blue-400 hover:text-blue-300 transition-colors">
                Esqueceu sua senha?
              </Link>
              <Link to="/registro" className="text-blue-400 hover:text-blue-300 transition-colors">
                Cadastre-se
              </Link>
            </div>

            {/* Login com Google */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-slate-600" />
              <span className="mx-3 font-semibold text-slate-400">Continuar com</span>
              <hr className="flex-grow border-t border-slate-600" />
            </div>
            <div className="flex justify-center my-3">
              <button onClick={handleLoginGoogle} className="transition hover:scale-110 hover:drop-shadow-lg active:scale-95">
                <img src={Gicon} alt="Google Icon" className="w-12 h-12" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
