import { useState } from 'react';
import { MessageSquare, MapPin, AlignJustify } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="bg-white text-black p-4 flex justify-between items-center border relative">
      <div className="text-xl font-bold">OPS PEL</div>

      {/* Ícone do menu (hamburger) */}
      <div className="cursor-pointer relative" onClick={toggleMenu}>
        <AlignJustify />
        {menuAberto && (
          <div className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-sm shadow-lg border rounded-md z-[9999]">
            {/* Condicional para esconder ChatBot na rota atual */}
            {location.pathname !== '/ChatBot' && (
              <Link
                to="/ChatBot"
                className="flex items-center p-2 hover:bg-gray-100 space-x-2"
                onClick={() => setMenuAberto(false)}
              >
                <MessageSquare />
                <span className="font-bold">ChatBOT</span>
              </Link>
            )}

            <Link
              to="/Report"
              className="flex items-center p-2 hover:bg-gray-100 space-x-2"
              onClick={() => setMenuAberto(false)}
            >
              <MapPin />
              <span className="font-bold">Denúncias</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
