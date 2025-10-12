import {
  MapPin,
  MessageSquare,
  UsersRound,
  Settings,
  TriangleAlert,
  House,
  FileWarning,
  Bot
} from 'lucide-react';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  if (location.pathname === '/chat') return null;


  const items = [
    { icon: <House size={24} />, path: '/' },
    { icon: <MessageSquare size={24} />, path: '/chat' },
    { icon: <FileWarning size={24} />, path: '/pendingreports' },
    { icon: <TriangleAlert size={24} />, path: '/report' },
    { icon: <img  //atualiza todas o avatar
  src={
    user?.avatar_url
      ? user.avatar_url.startsWith("blob:")
        ? user.avatar_url
        : user.avatar_url.startsWith("http")
        ? user.avatar_url
        : `http://localhost:3000/uploads/${user.avatar_url}`
      : "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
  }
  className="w-8 h-8 object-cover rounded-xl"
  alt="avatar"
/> , path:'/settings'}
  ];



  const handleClick = (path) => navigate(path);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-row bg-white shadow-lg rounded-full px-6 py-3 gap-6 justify-center items-center z-999 w-80 max-w-md md:hidden dark:bg-gray-700">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.path)}
          className={`flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 transition ${
            location.pathname === item.path ? 'bg-blue-400 text-white rounded-xl p-2' : ''
          }`}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}
