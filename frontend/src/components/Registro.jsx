import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Undo2, ArrowRight, ArrowLeft } from 'lucide-react';
import logo from "../assets/AppLogo2.png"

export default function Registro() {
  const [step, setStep] = useState(1);
  const [nameUser, setNameUser] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('http://localhost:3000/allCities'); 
        if (!res.ok) throw new Error('Erro ao buscar cidades');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCities();
  }, []);

  function handleNextStep(e) {
    e.preventDefault();
    if (!nameUser || !fullName || !email) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleRegistro(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameUser,
          fullName,
          email,
          telefone,
          cpf,
          birth_date: birthDate,
          city_id: cityId,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao registrar');
      }

      const data = await res.json();
      console.log('Registro response:', data);

      setError(null);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-600 via-blue-600 to-slate-500 p-4">
      <div className="flex bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Lado esquerdo - Imagem/Branding */}
        <div 
          className="hidden md:flex md:w-1/2 bg-cover bg-center p-12 flex-col justify-between relative overflow-hidden"
          style={{ backgroundImage: `url('/images/teste321.png')` }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10">
            <div className='flex'>
              <img src={logo} className='flex w-11 h-11 mr-3'/>
              <h1 className="text-4xl font-bold text-white mb-2">RECLAMAI</h1>
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sua voz importa!
            </h2>
            <p className="text-blue-100 text-lg">
              Junte-se à nossa comunidade e faça sua reclamação ser ouvida!
            </p>
          </div>

          {/* Elemento decorativo */}
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <Undo2 size={20} className="mr-2" />
              <span className="text-sm">Voltar ao login</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Criar conta</h2>
            <p className="text-slate-400">
              {step === 1 ? 'Etapa 1 de 2 - Informações básicas' : 'Etapa 2 de 2 - Complete seu cadastro'}
            </p>
          </div>

          {/* Indicador de progresso */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded ${step >= 1 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
            <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
          </div>

          {/* Etapa 1 */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Nome de usuário</label>
                <input
                  type="text"
                  placeholder="Seu apelido"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Nome completo</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Telefone (opcional)</label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 mt-6"
              >
                Prosseguir
                <ArrowRight size={20} />
              </button>
            </form>
          )}

          {/* Etapa 2 */}
          {step === 2 && (
            <form onSubmit={handleRegistro} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">CPF (opcional)</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Data de nascimento</label>
                <input
                  type="date"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Cidade</label>
                <select
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  required
                >
                  <option value="">Selecione sua cidade</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Senha</label>
                <input
                  type="password"
                  placeholder="Crie uma senha forte"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Confirmar senha</label>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all"
                >
                  Finalizar cadastro
                </button>
              </div>
            </form>
          )}

          <p className="text-slate-400 text-sm text-center mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}