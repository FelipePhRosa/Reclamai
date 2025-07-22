import Layout from "./Layout";
import { Camera, Pencil } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditarPerfil() {
  const { user } = useContext(AuthContext);

  function mascararCPF(cpf) {
    if (!cpf) return "CPF não disponível";
    return cpf.replace(/^(\d{3})\d{3}(\d{3})(\d{2})$/, "$1.***.$2-**");
  }
  const primeiroNome = user?.nameUser ? user.nameUser.split(" ")[0] : "Usuário";
  const EmailUser = user?.email || "email";
  const TelefoneUser = user?.telefone || "telefone";
  const CpfUser = mascararCPF(user?.cpf);
  


return (
  <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-[450px] p-6 rounded-lg shadow">
        <div className="flex gap-1">
          <h1 className="font-bold text-blue-500 text-2xl mb-4">Editar Perfil</h1>
          <Pencil className="h-8 text-blue-500" />
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          <h2 className="text-lg mb-2 font-semibold">Foto de perfil</h2>

          <div className="relative w-32 h-32">
            <img
              src={user?.fotoPerfil || "/default-avatar.png"}
              alt=""
              className="w-full h-full rounded-full object-cover border border-gray-400 bg-gray-100"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-100">
              <Camera size={20} className="text-gray-600" />
            </div>
          </div>
          <p className="text-lg font-medium text-gray-800">{primeiroNome}</p>
        </div>

        <div className="text-center" />

        <div className="flex flex-col gap-2">
          <h2 className="text-blue-500 font-bold text-center">Informações do usuário</h2>

          <div>
            <h2 className="font-semibold text-blue-500">Email:</h2>
            <p className="text-sm text-gray-500">{EmailUser}</p>
            <hr className="my-4 border-gray-300" />
          </div>

          <div>
            <h2 className="font-semibold text-blue-500">Celular:</h2>
            <p className="text-sm text-gray-500">{TelefoneUser}</p>
            <hr className="my-4 border-gray-300" />
          </div>

          <div>
            <h2 className="font-semibold text-blue-500">Cpf:</h2>
            <p className="text-sm text-gray-500">{CpfUser}</p>
            <hr className="my-4 border-gray-300" />
          </div>

          <div>
            <button className="text-blue-500 font-semibold hover:text-blue-300 hover:cursor-pointer">
              Redefinir senha
            </button>
            <hr className="my-4 border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
}
