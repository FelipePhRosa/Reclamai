import {
  MapPin,
  MessageSquare,
  UsersRound,
  Settings,
  CircleHelp,
  TriangleAlert,
  Map,
  House,
  FileWarning,
  Bot,
} from 'lucide-react';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import noprofile from '../assets/noprofile.png';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  const commonItems = [
    { label: 'Home', icon: <House />, path: '/' },
    { label: 'Chat da Comunidade', icon: <MessageSquare />, path: '/chat' },
    { label: 'Mapa de Problemas', icon: <Map />, path: '/mapa' },
    { label: 'Problemas Reportados', icon: <TriangleAlert />, path: '/Report' },
    { label: 'ChatBot', icon: <Bot />, path: '/ChatBot' },
    { label: 'Reportar Problema', icon: <MapPin />, path: '/reportar' },
  ];

  const adminExtra = [
    { label: 'Denúncias Pendentes', icon: <FileWarning />, path: '/pendingreports' },
    { label: 'Usuários', icon: <UsersRound />, path: '/userList' },
  ];

  const userExtra = [
    { label: 'Denúncias Em Análise', icon: <FileWarning />, path: '/Analise' },
  ];

  const bottomItems = [
    { label: 'Configurações', icon: <Settings />, path: '/settings' },
    { label: 'Ajuda', icon: <CircleHelp />, path: '/help' },
  ];

  const navigationItems = [
    ...commonItems,
    ...(userRole >= 1 && userRole <= 4 ? adminExtra : userExtra),
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 bg-white text-black shadow-md flex flex-col overflow-y-auto transition-all duration-300
      ${isSidebarOpen ? 'w-60 p-4' : 'w-16 p-2'}`}
    >
      {/* Topo */}
      <div className="flex justify-center mt-5 items-center space-x-2 mb-6 cursor-pointer" onClick={toggleSidebar}>
        <MapPin className="text-xl bg-blue-500 fill-white text-white p-1 rounded-md" />
        {isSidebarOpen && <h1 className="text-xl font-bold">Reclamaí</h1>}
      </div>

      {/* Navegação principal */}
      <div className="space-y-2 border-b pb-4">
        {navigationItems.map(({ label, icon, path }) => (
          <div
            key={label}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer 
            ${isActive(path) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            onClick={() => handleItemClick(path)}
          >
            {icon}
            {isSidebarOpen && <span className="text-base font-semibold">{label}</span>}
          </div>
        ))}
      </div>

      {/* Configurações e ajuda */}
      <div className="space-y-2 mt-4 pb-4">
        {bottomItems.map(({ label, icon, path }) => (
          <div
            key={label}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer 
            ${isActive(path) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            onClick={() => handleItemClick(path)}
          >
            {icon}
            {isSidebarOpen && <span className="text-base font-semibold">{label}</span>}
          </div>
        ))}
      </div>

      {/* Perfil fixado */}
      <div className="mt-auto flex gap-2 p-2 bg-gray-200 rounded-xl">
        <img src={noprofile} className="w-10 h-10 rounded-xl border border-gray-100 p-1 object-cover" />
        {isSidebarOpen && (
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user?.name || 'Nome de Usuário'}</span>
            <span className="text-gray-600">{user?.email || 'teste@gmail.com'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
