import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

export default function Registro() {
  const [nameUser, setNameUser] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          password,  // aqui envia password, não password_hash
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleRegistro} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div>
        <Link to ="/login"
        ><Undo2  className='text-blue-500'/>
        </Link>
        </div>

        <h2 className="text-2xl mb-4 font-bold text-center text-blue-600">Registrar</h2>

        <input
          type="text"
          placeholder="Nome de usuário (apelido)"
          className="border p-2 w-full mb-4 rounded"
          value={nameUser}
          onChange={(e) => setNameUser(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nome completo"
          className="border p-2 w-full mb-4 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          className="border p-2 w-full mb-4 rounded"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <input
          type="text"
          placeholder="CPF"
          className="border p-2 w-full mb-4 rounded"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirme a senha"
          className="border p-2 w-full mb-4 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-400"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
