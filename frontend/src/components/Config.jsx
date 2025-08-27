import {
  UserPen,
  ClipboardList,
  PersonStanding,
  BellRing,
  Eclipse,
  Info,
  HelpCircle,
  LogOut
} from 'lucide-react';
import Layout from "./Layout";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Config() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login'); // redireciona para tela de login
  };

  const menuItems = [
    { label: 'Conta', icon: UserPen, path: '/EditarPerfil' },
    { label: 'Notificações', icon: BellRing, path: '/notificacoes' },
    { label: 'Aparência', icon: Eclipse, path: '/aparencia' },
    { label: 'Histórico', icon: ClipboardList, path: '/historico' },
    { label: 'Ajuda e Suporte', icon: HelpCircle, path: '/suporte' },
    { label: 'Sobre', icon: Info, path: '/sobre' }
  ];

  return (
    <Layout>
      <div className="w-full h-screen">
        <div className="p-8">
          <h1 className="font-semibold text-xl text-center dark:text-white">Configurações</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto px-8 dark:text-white">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => item.path && navigate(item.path)}
                className="flex items-center justify-between w-full py-7 text-left"
              >
                <div className="flex items-center">
                  <item.icon className="w-6 h-6 mr-3" />
                  <span className="font-semibold text-xl">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="text-gray-500" />
              </button>
              <hr className="opacity-30 border-gray-400" />
            </div>
          ))}

          {/* Botão de Logout */}
          <div className="w-full mt-13 flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-30 h-10 py-7 bg-red-500 rounded-xl text-left"
            >
              <div className="flex items-center">
                <LogOut className="w-6 h-6 mr-3 text-white" />
                <span className="font-semibold text-xl text-white">
                  Sair
                </span>
              </div>
            </button>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
