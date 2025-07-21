import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const primeiroNome = user?.nameUser ? user.nameUser.split(" ")[0] : "Usuário";
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="w-full flex items-center bg-white shadow pr-0 py-2">
      <div className="ml-auto relative">
        <button
          onClick={() => setMenuAberto((prev) => !prev)}
          className="flex items-center text-sm text-gray-800 hover:text-blue-500"
        >
          <Menu size={24} />
        </button>

        {menuAberto && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-50 py-2">
            <p className="px-4 py-2 text-sm ">
              Olá, <span className="text-blue-500 font-bold">{primeiroNome}</span>
            </p>
            <hr className="my-1" />

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-bold hover:text-red-500"
              >
                Sair
              </button>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-bold text-blue-500 hover:text-blue-800"
              >
                Entrar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
