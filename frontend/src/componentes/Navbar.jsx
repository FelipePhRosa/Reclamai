import { MessageSquare, MapPin, AlignJustify } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
  return (
    <div className="bg-white text-black p-4 flex justify-between items-center border ">
      <div className="flex space-x-6">

        {/* Link para o Chat */}
        {/* location: se eu estiver na rota mencionada ele nao aparece */}
         {location.pathname !== '/ChatBot' && (
          <Link to="/ChatBot" className="flex items-center space-x-1 hover:text-blue-500">
            <MessageSquare />
            <span className="font-bold">ChatBOT</span>
          </Link>
        )}

        {/* Link para Denúncias */}
        <Link to="/Report" className="flex items-center space-x-1 hover:text-blue-500">
          <MapPin />
          <span className="font-bold">Denúncias</span>
        </Link>
      </div>

      {/* Botão para abrir sidebar */}
      <div className="cursor-pointer" onClick={toggleSidebar}>
        <AlignJustify />
      </div>
    </div>
  );
}

export default Navbar;
