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
  Bot
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Home', icon: <House />, path: '/' },
    { label: 'Chat da Comunidade', icon: <MessageSquare />, path: '/chat' },
    { label: 'Mapa de Problemas', icon: <Map />, path: '/mapa' },
    { label: 'Problemas Reportados', icon: <TriangleAlert />, path: '/Report' },
    { label: 'ChatBot', icon: <Bot/>, path: '/ChatBot'},
    { label: 'Reportar Problema', icon: <MapPin />, path: '/reportar' },
    { label: 'Denúncias Pendentes', icon: <FileWarning />, path: '/pendingreports' },
    { label: 'Usuários', icon: <UsersRound />, path: '/login' }
  ];

  const handleItemClick = (item) => {
    navigate(item.path);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 bg-white text-black space-y-2 shadow-md ${
        isSidebarOpen ? 'w-60 p-4' : 'w-16 p-2'
      }`}
    >
      <div
        className="flex justify-center mt-5 items-center space-x-2 mb-6 cursor-pointer"
        onClick={toggleSidebar}
      >
        <MapPin className="text-xl bg-blue-500 fill-white text-white p-1 rounded-md" />
        {isSidebarOpen && <h1 className="text-xl font-bold">Reclamaí</h1>}
      </div>

      <div className="space-y-2 border-b pb-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'hover:bg-blue-100'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon}
            {isSidebarOpen && <span className="text-base font-semibold">{item.label}</span>}
          </div>
        ))}
      </div>

      <div className="space-y-2 pb-4">
        <div className="flex items-center space-x-3 p-2 rounded-md cursor-pointer">
          <Settings />
          {isSidebarOpen && <span className="text-base font-semibold">Configurações</span>}
        </div>
        <div
          className="flex items-center space-x-3 p-2 rounded-md cursor-pointer"
          onClick={toggleSidebar}
        >
          <CircleHelp />
          {isSidebarOpen && <span className="text-base font-semibold">Ajuda</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
