import Layout from "./Layout";
import { Trash2, AtSign, Camera, Pencil, Mail, Phone, ALargeSmall, Calendar1, UserRound, KeyRound } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditarPerfil() {
  const { user } = useContext(AuthContext);

  function mascararCPF(cpf) {
    if (!cpf) return "CPF não disponível";
    return cpf.replace(/^(\d{3})\d{3}(\d{3})(\d{2})$/, "$1.***.$2-**");
  }
  const primeiroNome = user?.nameUser ? user.nameUser.split(" ")[0] : "Usuário";
  const segundoNome = user?.fullName || 'John Wick';
  const EmailUser = user?.email || "E-mail";
  const TelefoneUser = user?.telefone || "Número de Celular";
  const CpfUser = mascararCPF(user?.cpf);
  


return (
  <Layout>
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-transparent w-[100%] h-[100%] p-8 rounded-lg lg:w-[30%]">
        <div className="flex gap-1">
          <h1 className="font-bold text-black text-2xl mb-4 dark:text-white">Editar Perfil</h1>
        </div>

        <div className="flex flex-col items-center gap-5">
          <h2 className="text-xl font-semibold dark:text-white">Foto de perfil</h2>

          <div className="relative w-32 h-32">
        <img
          src={
            user?.avatar_url
              ? user.avatar_url.includes("http")
                ? user.avatar_url
                : `http://localhost:3000/uploads/${user.avatar_url.replace(/^\/+/, "")}`
              : "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
          }
          alt=""
          className="w-full h-full rounded-full object-cover border border-gray-400 bg-gray-100"
/>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-100">
              <Camera size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="text-center" />

        <div className="flex flex-col gap-4 mt-2">
          <div className="bg-gray-100 border border-gray-400 shadow-lg rounded-xl p-4 flex flex-col gap-5 mt-2 dark:bg-gray-700 dark:shadow-gray-600">
            <div className="flex gap-2 items-center">
                <UserRound className="dark:text-white "/>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-100">Nome:</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{segundoNome}</p>
                  </div>
            </div>
            <div className="flex gap-2 items-center">
                <AtSign className="dark:text-white"/>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-100">Nome de Usuário:</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{primeiroNome}</p>
                  </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
        <h2 className="text-black font-semibold mt-5 text-xl dark:text-white">Informações Privadas</h2>
          <div className="bg-gray-100 border border-gray-400 shadow-xl rounded-xl p-6 flex flex-col gap-5 dark:bg-gray-700 dark:shadow-gray-600">

            <div className="flex gap-2 items-center">
              <KeyRound className="dark:text-white"/>
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-700 dark:text-gray-100">Senha:</h2>
                <p className="text-lg font-bold text-gray-600 dark:text-gray-300">*************</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Calendar1 className="dark:text-white"/>
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-700 dark:text-gray-100">Data de Nascimento</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">21/11/2003</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center ">
              <Mail className="dark:text-white"/>
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-700 dark:text-gray-100">Email:</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{EmailUser}</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Phone className="dark:text-white"/>
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-700 dark:text-gray-100">Celular:</h2>
                <p className="text-sm text-gray-600 capitalize dark:text-gray-300">{TelefoneUser}</p>
              </div>
            </div>

            <div>
              <button className="text-blue-500 font-semibold hover:text-blue-300 hover:cursor-pointer">
                Redefinir senha
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center mb-20 mt-10">
            <div className="flex border rounded-xl p-3 hover:bg-red-500 hover:text-white transition-all duration-105 dark:bg-red-500 dark:border-gray-3 00">
              <Trash2 className="dark:text-white"/>
              <h2 className="font-semibold ml-2 dark:text-white">Deletar Conta</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
}