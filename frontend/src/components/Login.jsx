import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // pode ser email ou nome
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

            // Aqui, chama login passando token e objeto user completo
        login(data.token, {
          userId: data.userId,
          nameUser: data.name,  // aqui 'name', conforme backend
          email: data.email,
          role: data.role
        });


    setError(null);
    navigate('/');
  } catch (err) {
    setError(err.message);
  }
}


  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">

      <div>
        <Link to ="/"><Undo2  className='text-blue-500'/>
        </Link>
        </div>
      <h2 className="text-2xl mb-4 font-bold text-center text-blue-600">Login</h2>
      
          <input
        type="text"
        placeholder="Email ou nome de usuário"
        className="border p-2 w-full mb-4 rounded"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 w-full mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
     <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
      Entrar
    </button>

    <p className="mt-2 text-center text-sm">
      <Link to="/esqueceu-senha" className="text-blue-600 hover:underline">
        Esqueceu sua senha?
      </Link>
    </p>

    <p className="mt-4 text-center text-sm">
      Não tem uma conta?{' '}
      <Link to="/registro" className="text-blue-600 hover:underline">
        Registre-se aqui
      </Link>
    </p>

    </form>
  </div>
);
}
