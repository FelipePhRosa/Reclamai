import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";
import { UsersRound } from "lucide-react";
import ModalUpdate from "./UpdateRole";

export default function UserList() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/userList", {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) setUsers(data.data);
        else setUsers([]);
      })
      .catch((err) => console.error(err));
  }, []);

  function formatDate(isoString) {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }



  const [ isModal, setIsModal ] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ confirmAction, setConfirmAction] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const roleMap = {
  "Administrador": 1,
  "Moderador": 2,
  "Suporte": 3,
  "Prefeito": 4,
  "Vereador": 5,
  "Cidadão Comum": 6,
  "Banir": 7
};

  const handleAction = async (newRole) => {
    setLoading(true)
    try{
      const response = await fetch("http://localhost:3000/updateRole", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`},
        body: JSON.stringify({ 
          userId: selectedUser.id,
          newRole})
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      alert(`Sucesso ${data.message}`);
      setConfirmAction(null);
      OnClose();
    } catch (err){
      alert (`Error ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="font-[montserrat] font-semibold text-3xl dark:text-blue-500">
          Usuários Cadastrados
        </h1>
        <div className="w-56 h-1 lg:w-[33vh] rounded-xl bg-blue-500 my-4 dark:bg-gray-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id}>
              <div
                className="relative flex flex-col bg-white gap-2 p-4 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-400 cursor-pointer"
              >
                <UsersRound className="mb-2 dark:text-white"/>
                <p className="font-semibold text-md dark:text-gray-200">ID: <span className="font-normal">{user.id}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Nome: <span className="font-normal">{user.nameUser}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Email: <span className="font-normal">{user.email}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Criado: <span className="font-normal"> {formatDate(user.created_at)}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Cargo: <span className="font-normal">{user.role}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Último Login: <span className="font-normal">{formatDate(user.last_login)}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Total de denúncias: <span className="font-normal">{user.totalReports}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Aprovadas: <span className="text-green-600">{user.aprovados}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Rejeitadas: <span className="text-red-600">{user.rejeitados}</span></p>
                <p className="font-semibold text-md dark:text-gray-200">Pendentes: <span className="text-yellow-600">{user.pendentes}</span></p>
                
                <div className="relative w-full">
                  <button 
                  className="absolute bottom-0 right-2 w-30 bg-gradient-to-tr from-blue-400 to-blue-600 dark:bg-gradient-to-br 
                  dark:from-indigo-200/40 dark:to-gray-900 h-10 rounded-md 
                  font-semibold font-[Inter] text-white dark:text-gray-200 text-shadow-md shadow-lg 
                  shadow-black/22 dark:shadow-gray-900 cursor-pointer"
                  onClick={() => setSelectedUser(user) }
                  >
                    Mais Opções
                  </button>
                </div>
              </div>
              {selectedUser && (
                <ModalUpdate onClose={() => setSelectedUser(false)}>
                  <h2 className="text-lg mb-4 font-[Montserrat] font-semibold text-shadow-2xs">Gerenciar Cargos</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 duration-200 shadow-md shadow-blue-600/40 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Administrador
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 duration-200 shadow-md shadow-green-600/40 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Suporte
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 duration-200 shadow-md shadow-purple-700/40 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Moderador
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 duration-200 shadow-md shadow-yellow-700/40 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Prefeito
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-700 shadow-md duration-200 shadow-yellow-600/60 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Vereador
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs text-sm px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 duration-200 shadow-md shadow-gray-600/40 cursor-pointer focus:outline-none focus-visible:outline-none">
                          Cidadão Comum
                        </button>
                        <button className="font-[Montserrat] font-semibold text-shadow-2xs px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md duration-200 shadow-red-600/60 cursor-pointer focus:outline-none focus-visible:outline-none"
                          onClick={() => (setConfirmAction(true))}
                        >
                          Banir Conta
                        </button>
                    </div>
                          {confirmAction && (
                          <div className="mt-4 p-4 bg-white dark:bg-gray-700 border border-red-600 rounded-md text-center">
                            <p className="mb-2 font-semibold text-red-600">
                              Deseja realmente {confirmAction} esta conta?
                            </p>
                            <div className="flex justify-center gap-4">
                              <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                disabled={loading}
                                onClick={() => handleAction(confirmAction)}
                              >
                                {loading ? "Aguarde..." : "Sim"}
                              </button>
                              <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                                disabled={loading}
                                onClick={() => setConfirmAction(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )}
                </ModalUpdate>
              )}
            </div>
            
          ))}
        </div>
      </div>
    </Layout>
  );
}
