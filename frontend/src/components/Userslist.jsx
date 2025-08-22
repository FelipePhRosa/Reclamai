import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";
import { UsersRound } from "lucide-react"

export default function UserList(){
    const { token } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("");

    useEffect(() => {
      fetch('http://localhost:3000/userList',{
        credentials: 'include',
        headers: {
        Authorization: `Bearer ${token}`, // se necessário
      },
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            setUsers(data.data);
          } else {
            setUsers([]);
            console.error('API retornou formato inesperado:', data);
          }
        })
        .catch(err => {
          console.error('Erro ao buscar os relatos:', err);
        });
    }, []);

    function formatDate(isoString) {
        if (!isoString) return "-";
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR', { 
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit' 
        }).format(date);
    }

    return(
        <>
            <Layout>
                <div className="p-6 max-w-7xl mx-auto">
                    <h1 className="font-[montserrat] font-semibold text-3xl dark:text-blue-500">
                        Usuários Cadastrados
                    </h1>
                    <div className="w-56 h-1 lg:w-[33vh] rounded-xl bg-blue-500 my-4 dark:bg-gray-200" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user, index) => (
                        <div
                        key={index}
                        className="flex flex-col bg-white gap-2 p-4 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-400">
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
                        </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}