import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Logo from "../assets/Reclamainobg.png"
import Gicon from "../assets/Gicon.png"
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    onSuccess: () => {
      toast.success("Login bem sucedido!");
    },
    redirect_uri: 'http://localhost:3000/auth/google/callback',
    onError: (error) => {
      console.error("Google login failed:", error);
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
        is_verified: data.is_verified,
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
      <div className="w-screen h-[100vh] overflow-hidden relative bg-[url(/bglg2.png)] bg-no-repeat bg-cover">
        <div className="flex flex-col absolute w-full h-screen bg-gradient-to-b from-sky-200/50 to-sky-200/10">
          <div className='flex items-center relative p-10 lg:mx-25 lg:my-10'>
            <img src={Logo} alt="Logo" className="size-24 top-0" />
            <h1 className="text-4xl font-bold text-black mx-4 mb-2">RECLAMAI</h1>
          </div>
          <div className='mx-15 lg:mx-30 lg:my-5'>
            <h1 className="text-3xl min-[360px]:text-5xl lg:text-[48px] font-bold">Entre na sua conta!</h1>
            <p className="text-2xl lg:text-3xl text-black font-semibold">Bem-vindo ao Reclamai!</p>
            <p className="text-black/80 lg:text-2xl">Aqui, tua voz ajuda a cidade a melhorar.</p>
          </div>
        </div>

        <div className="w-full flex justify-center h-fit lg:justify-end lg:pr-20 absolute bottom-50 lg:bottom-20">
          <div className='flex p-5 py-10 bg-slate-800 w-[80vw] min-w-[1081px]:w-[40vw] max-w-2xl rounded-3xl shadow-2xl'>
            <div className='flex flex-col min-w-full '>
              <p className='self-start ml-2 mb-2 font-semibold text-slate-300'>Email ou nome de usuário</p>
              <input
                type="text"
                placeholder="Digite seu e-mail aqui..."
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <p className='self-start ml-2 mb-2 font-semibold text-slate-300'>Senha de acesso</p>
              <input
                type="password"
                placeholder="Digite sua senha..."
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              <button type="submit" onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg w-full hover:from-blue-700 hover:to-blue-700 transition-all">
                Entrar
              </button>
              <div className='flex justify-between font-semibold'>
                <p className="mt-2 text-sm self-baseline mr-[5%] mb-5 text-left">
                  <Link to="/esqueceu-senha" className="text-blue-400 hover:text-blue-300">
                    Esqueceu sua senha?
                  </Link>
                </p>
                <p className="mt-2 text-sm text-slate-400 text-right">
                  Não tem conta?{' '}
                  <Link to="/registro" className='text-blue-400 hover:text-blue-300'>
                    Cadastre-se
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <hr className="flex-grow border-t border-slate-600" />
                <span className="mx-3 font-semibold text-slate-400">Continuar com</span>
                <hr className="flex-grow border-t border-slate-600" />
              </div>
              <div className='flex justify-center my-3'>
                <button className='transition hover:scale-110' onClick={handleLoginGoogle}>
                  <img src={Gicon} alt="Login com Google" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
