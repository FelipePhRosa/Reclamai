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
    { label: 'Notificações', icon: BellRing, path: '/notifications' },
    { label: 'Preferências', icon: Eclipse, path: '/preferences' },
    { label: 'Histórico', icon: ClipboardList, path: '/myreports' },
    { label: 'Ajuda e Suporte', icon: HelpCircle, path: '/suporte' },
    { label: 'Sobre', icon: Info, path: '/about' }
  ];

  return (
    <Layout>
      <div className="w-full min-h-screen dark:text-white flex flex-col">
        {/* Header */}
        <div className="p-8">
          <h1 className="font-ios font-medium text-xl text-center">Configurações</h1>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-start items-center w-full max-w-md mx-auto px-8 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => item.path && navigate(item.path)}
                className="flex items-center justify-between w-full py-4 text-left cursor-pointer"
              >
                <div className="flex items-center">
                  <item.icon className="w-6 h-6 mr-3" />
                  <span className="font-semibold text-xl hover:text-gray-500 dark:hover:text-gray-400">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="text-gray-500" />
              </button>
              <hr className="opacity-30 border-gray-400" />
            </div>
          ))}

       {/* Botão de Logout */}
<div className="w-full mt-6 flex justify-center">
  <button
    onClick={handleLogout}
    className="flex items-center justify-center bg-red-600 rounded-xl hover:bg-red-500 transition-colors duration-150 py-3 px-6"
  >
    <div className="flex items-center gap-3">
      <LogOut className="w-6 h-6 text-white" />
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
