import {
  MapPin,
  MessageSquare,
  UsersRound,
  Settings,
  CircleHelp,
  TriangleAlert,
  Map,
  House,
  FileWarning
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();

  const items = [
    { label: 'Home', icon: <House />, path: '/' },
    { label: 'Chat da Comunidade', icon: <MessageSquare />, path: '/chat' },
    { label: 'Mapa de Problemas', icon: <Map />, path: '/mapa' },
    { label: 'Problemas Reportados', icon: <TriangleAlert />, path: '/Report' },
    { label: 'Reportar Problema', icon: <MapPin />, path: '/reportar' },
    { label: 'Denúncias Pendentes', icon: <FileWarning />, path: '/pendingreports' },
    { label: 'Usuários', icon: <UsersRound />, path: '/login' },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    navigate(item.path);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-gray-100 text-black p-4 space-y-6 transition-all duration-300 h-screen flex flex-col`}
    >
      {/* Logo e título */}
      <div className="flex items-center space-x-2 mb-6 cursor-pointer">
        <MapPin className="text-2xl bg-blue-600 fill-white text-white p-1 rounded-md" />
        {isSidebarOpen && <h1 className="text-xl font-bold">OPS PEL</h1>}
      </div>

      {/* Itens de navegação */}
      <div className="space-y-2 border-b pb-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-all ${
              activeItem === item.label ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon}
            {isSidebarOpen && (
              <span className="text-base">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="mt-auto space-y-4 border-t pt-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Settings />
          {isSidebarOpen && <span className="text-base">Configurações</span>}
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleSidebar}
        >
          <CircleHelp />
          {isSidebarOpen && <span className="text-base">Ajuda</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
