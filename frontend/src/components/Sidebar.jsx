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
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : document.documentElement.classList.contains('dark');
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // atualiza a preferência de tema no localstorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const userRole = user?.role;
  const { logout } = useContext(AuthContext);

  const allItemsAdm = [
    { label: 'Home', icon: <House />, path: '/' },
    { label: 'Chat da Comunidade', icon: <MessageSquare />, path: '/chat' },
    { label: 'Mapa de Problemas', icon: <Map />, path: '/mapa' },
    { label: 'Problemas Reportados', icon: <TriangleAlert />, path: '/Report' },
    { label: 'Reportar Problema', icon: <MapPin />, path: '/reportar' },
    { label: 'Denúncias Pendentes', icon: <FileWarning />, path: '/pendingreports' },
    { label: 'Usuários', icon: <UsersRound />, path: '/userList' }
  ];

   const items2 = [
    { label: 'Configurações', icon: <Settings />, path: '/settings'},
    { label: 'Ajuda', icon: <CircleHelp />, path: '/help'},
    user 
      ? { label: 'Sair', icon: <LogOut />, path:'/login', isLogout: true }
      : { label: 'Entrar', icon: <LogOut />, path:'/login', isLogin: true }
  ];

  const allItemsUser = [
    { label: 'Home', icon: <House />, path: '/' },
    { label: 'Chat da Comunidade', icon: <MessageSquare />, path: '/chat' },
    { label: 'Mapa de Problemas', icon: <Map />, path: '/mapa' },
    { label: 'Problemas Reportados', icon: <TriangleAlert />, path: '/Report' },
    { label: 'Reportar Problema', icon: <MapPin />, path: '/reportar' }
  ];
  
  const items = userRole >= 1 && userRole <= 4 ? allItemsAdm : allItemsUser;

  const handleItemClick = (item) => {
    if (item.isLogout) {
      logout();
      navigate('/login');
    } else {
      navigate(item.path);
    }
  };
  
  return (
    <div
      className={`fixed top-0 left-0 h-full z-999 flex flex-col bg-white dark:bg-gray-900 dark:shadow-2xl text-black dark:text-white space-y-2 shadow-md transition-colors duration-200 ${
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

      <div className='flex-1 flex flex-col justify-start'>
        <div className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
          {items.map((item) => (
            <div
              key={item.label}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors duration-150 ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {isSidebarOpen && <span className="text-base font-semibold">{item.label}</span>}
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-2 pb-4 mt-5">
          {items2.map((item) => (
            <div
              key={item.label}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors duration-150 ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {isSidebarOpen && <span className="text-base font-semibold">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <Link to='/settings'>
        <div className="mt-auto flex gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-xl transition-colors duration-200">
          <img
            src={
              user?.avatar_url ||
              'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'
            }
            className="w-12 h-12 object-cover rounded-xl"
            alt="avatar"
          />
          {isSidebarOpen && (
            <div className="flex flex-col items-start justify-center ml-2 w-36 overflow-hidden">
              <h2 className="text-sm font-semibold text-black dark:text-white">{user?.nameUser}</h2>
              <h3 className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white duration-300">{user?.email}</h3>
            </div>
          )}
        </div>
      </Link>

      <div className='flex justify-center items-center w-full h-10 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-colors duration-200'>
        <button 
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-full h-full rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
          title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;