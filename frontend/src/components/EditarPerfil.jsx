import Layout from "./Layout";
import { Trash2, AtSign, Camera, Pencil, Mail, Phone, UserRound, KeyRound, Calendar1 } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditarPerfil() {
  const { user, setUser } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.nameUser || "");
  const [email, setEmail] = useState(user?.email || "");
  const [telefone, setTelefone] = useState(user?.telefone || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || null);

  useEffect(() => {
    // Sempre que o user mudar, atualiza os campos
    setNome(user?.fullName || "");
    setUsername(user?.nameUser || "");
    setEmail(user?.email || "");
    setTelefone(user?.telefone || "");
    setAvatarPreview(user?.avatar_url || null);
  }, [user]);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setAvatarFile(file);
  setAvatarPreview(URL.createObjectURL(file));
};

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullName", nome);
      formData.append("nameUser", username);
      formData.append("email", email);
      formData.append("telefone", telefone);
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await fetch("http://localhost:3000/api/user/update", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Erro: ${data.details || data.message}`);
        return;
      }

      alert("Alterações salvas com sucesso!");
      setUser((prev) => ({ ...prev, ...data.data }));
      setEditMode(false);
      setAvatarPreview(data.data.avatar_url);
      setAvatarFile(null);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar informações do usuário");
    }
  };

  function mascararCPF(cpf) {
    if (!cpf) return "CPF não disponível";
    return cpf.replace(/^(\d{3})\d{3}(\d{3})(\d{2})$/, "$1.***.$2-**");
  }

  return (
    <Layout>
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-transparent w-[100%] h-[100%] p-8 rounded-lg lg:w-[30%]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-black text-2xl dark:text-white">Editar Perfil</h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-300"
            >
              <Pencil size={18} /> {editMode ? "Cancelar" : "Editar"}
            </button>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h2 className="text-xl font-semibold dark:text-white">Foto de perfil</h2>
            <div className="relative w-32 h-32">
             <img
  src={
    avatarPreview
      ? avatarPreview.startsWith("blob:")
        ? avatarPreview
        : avatarPreview.startsWith("http")
        ? avatarPreview
        : `http://localhost:3000/uploads/${avatarPreview}`
      : "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
  }
  alt="Avatar"
  className="w-full h-full rounded-full object-cover border border-gray-400 bg-gray-100"
/>  {/*garante que  preview da img  carregue */}

              {editMode && (
                <>
                  <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-100">
                    <Camera size={20} className="text-gray-600" />
                  </label>
                  <input id="avatarUpload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <div className="bg-gray-100 border border-gray-400 shadow-lg rounded-xl p-4 flex flex-col gap-5 dark:bg-gray-700 dark:shadow-gray-600">
              <div className="flex gap-2 items-center">
                <UserRound className="dark:text-white" />
                <div className="flex flex-col w-full">
                  <h2 className="font-semibold text-gray-700 dark:text-gray-100">Nome:</h2>
                  {editMode ? (
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full p-2 border rounded-md dark:text-gray-200 dark:bg-gray-700"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user?.fullName || "John Wick"}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <AtSign className="dark:text-white" />
                <div className="flex flex-col w-full">
                  <h2 className="font-semibold text-gray-700 dark:text-gray-100">Nome de Usuário:</h2>
                  {editMode ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 border rounded-md dark:text-gray-200 dark:bg-gray-700"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user?.nameUser || "Usuário"}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Mail className="dark:text-white" />
                <div className="flex flex-col w-full">
                  <h2 className="font-semibold text-gray-700 dark:text-gray-100">Email:</h2>
                  {editMode ? (
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-md dark:text-gray-200 dark:bg-gray-700"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user?.email || "E-mail"}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Phone className="dark:text-white" />
                <div className="flex flex-col w-full">
                  <h2 className="font-semibold text-gray-700 dark:text-gray-100">Celular:</h2>
                  {editMode ? (
                    <input
                      type="text"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full p-2 border rounded-md dark:text-gray-200 dark:bg-gray-700"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user?.telefone || "Número de Celular"}</p>
                  )}
                </div>
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="mt-4 w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-500 transition"
              >
                Salvar Alterações
              </button>
            )}

            <div className="flex justify-center items-center mb-20 mt-10">
              <div className="flex  rounded-xl p-3 bg-red-600 hover:bg-red-500 hover:text-white transition-all duration-105 dark:bg-red-600 dark:border-gray-300 dark:hover:bg-red-500">
                <Trash2 className="dark:text-white text-white" />
                <h2 className="font-semibold ml-2 dark:text-white text-white">Deletar Conta</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
