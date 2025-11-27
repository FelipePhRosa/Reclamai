import { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) ?? { login: (token: any, data: any) => { } };
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    if (!token || !userParam) {
      console.error('Token ou user não encontrados nos query params');
      processedRef.current = true;
      toast.error('Erro ao processar login');
      navigate('/login');
      return;
    }

    try {
      console.log('AuthCallback - Processando login com Google...');
      
      // Tenta decodificar e parsear o userParam (pode estar double-encoded)
      let parsedUser = null;
      const attempts = [
        () => JSON.parse(decodeURIComponent(userParam)),
        () => JSON.parse(decodeURIComponent(decodeURIComponent(userParam))),
        () => JSON.parse(userParam)
      ];

      for (const attempt of attempts) {
        try {
          parsedUser = attempt();
          break;
        } catch (e) {
          // continua tentando próximo método
        }
      }

      if (!parsedUser) throw new Error('Falha ao decodificar dados do usuário');

      if (parsedUser.is_verified !== undefined && parsedUser.is_verified !== null) {
        parsedUser.is_verified = Number(parsedUser.is_verified);
      }

      // Marca como processado para evitar re-execução em StrictMode
      processedRef.current = true;
      login(token, parsedUser);
      localStorage.setItem('user', JSON.stringify(parsedUser));
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      processedRef.current = true;
      console.error('Erro ao processar login:', err);
      toast.error('Erro ao processar dados do login');
      navigate('/login');
    }
  }, [navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="animate-pulse">
        <p className="text-white text-2xl">Processando login com Google...</p>
      </div>
    </div>
  );
}