import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Logo from "../assets/Reclamainobg.png"
import Gicon from "../assets/Gicon.png"
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // pode ser email ou nome
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

      // envia para o backend
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
      console.log("User Data: ", userData)

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        console.error("Erro do backend", errorText);
        throw new Error("Error login backend");
      }

      const data = await backendRes.json();
      login(data.token, data);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(provider + " login failed", error);
      alert(`Error to login with ${provider}`);
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

      console.log('Login response:', data);
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
    <div className="flex items-center justify-center min-h-screen w-screen bg-blue-200">
      <div className="w-screen h-[100vh] overflow-hidden relative">
        {/* Background Image Otimizado */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: 'url(/background.png)',
            imageRendering: 'crisp-edges',
            filter: 'brightness(1.09) contrast(1.15)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="flex flex-col absolute w-full h-screen bg-gradient-to-b from-sky-200/50 to-sky-200/10 backdrop-blur-[0.3px]">
          {/* Logo e Título */}
          <div className='flex items-center relative p-10 lg:mx-25 lg:my-10'>
            <img src={Logo} alt="Logo" className="size-24 top-0 drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-black mx-4 mb-2 drop-shadow-md">RECLAMAI</h1>
          </div>
          
          {/* Texto de Boas-vindas */}
          <div className='mx-15 lg:mx-30 lg:my-5'>
            <div className='flex flex-col justify-between gap-4'>
              <h1 className="text-3xl min-[360px]:text-5xl lg:text-[48px] font-bold drop-shadow-md">
                Entre na sua conta!
              </h1>
              <p className="text-2xl lg:text-3xl text-black font-semibold drop-shadow-sm">
                Bem-vindo ao Reclamai!
              </p>
              <p className="text-black/80 lg:text-2xl drop-shadow-sm">
                Aqui, tua voz ajuda a cidade a melhorar.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full flex justify-center h-fit lg:justify-end lg:pr-20 absolute bottom-50 lg:bottom-20 z-10">
          <div className='flex p-5 py-10 bg-slate-800/95 backdrop-blur-sm w-[80vw] min-w-[1081px]:w-[40vw] max-w-2xl rounded-3xl shadow-2xl border border-slate-700'>
            <div className='flex flex-col min-w-full'>
              <p className='self-start ml-2 mb-2 font-semibold text-slate-300'>
                Email ou nome de usuário
              </p>
              <input
                type="text"
                placeholder="Digite seu e-mail aqui..."
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              
              <p className='self-start ml-2 mb-2 font-semibold text-slate-300'>
                Senha de acesso
              </p>
              <input
                type="password"
                placeholder="Digite sua senha..."
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg w-full hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-0"
              >
                Entrar
              </button>
              
              <div className='flex justify-between font-semibold'>
                <p className="mt-2 text-sm self-baseline mr-[5%] mb-5 text-left">
                  <Link to="/esqueceu-senha" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Esqueceu sua senha?
                  </Link>
                </p>
                <p className="mt-2 text-sm text-slate-400 text-right">
                  Não tem conta?{' '}
                  <Link to="/registro" className='text-blue-400 hover:text-blue-300 transition-colors'>
                    Cadastre-se
                  </Link>
                </p>
              </div>
              
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-slate-600" />
                <span className="mx-3 font-semibold text-slate-400">Continuar com</span>
                <hr className="flex-grow border-t border-slate-600" />
              </div>
              
              <div className='flex justify-center my-3'>
                <button 
                  className='transition hover:scale-110 hover:drop-shadow-lg active:scale-95' 
                  onClick={handleLoginGoogle}
                >
                  <img src={Gicon} alt="Google Icon" className="w-12 h-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}