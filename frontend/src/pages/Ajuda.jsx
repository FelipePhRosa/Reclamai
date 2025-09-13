import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, ToggleLeft } from "lucide-react";
import Perfil from '../icons/perfil.png'
import Chat from '../icons/chat.png'
import History from '../icons/history.png'
import Sobre from '../icons/image.png'
import Padlock from '../icons/padlock.png'
import Reports from '../icons/reports.png'
import Terms from '../icons/terms.png'


export default function Ajuda() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const toggleOpen = (item) => {
    setOpen(open === item ? null : item);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-100 via-blue-500 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen">
        <div className="min-w-80% min-h-fit flex flex-col items-center p-7">
          <p className="text-neutral-800 dark:text-white text-2xl font-[Poppins] font-semibold lg:mt-20 lg:text-3xl">Como podemos lhe ajudar?</p>
          <div className="w-[90%] bg-white opacity-80 h-13 mt-10 rounded-2xl flex items-center shadow-2xl">
            <Search className="size-7 ml-2" />
            <input type="text" placeholder="Pesquisar tópicos de ajuda..." className="min-w-[80%] focus:outline-0 p-1 font-sans bg-white/80 placeholder:text-gray-500 dark:placeholder:text-black" />
          </div>
        </div>

        <div className="p-7 bg-gradient-to-t from-blue-100 via-green-10 to-blue-250 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen">
          <p className="p-2 font-sans text-xl font-bold text-black dark:text-white">Todos os Tópicos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-7 gap-x-4 text-black">
            
            <div className="relative">
              <button onClick={() => toggleOpen("account")} className="bg-white/70 dark:bg-gray-500/80 min-h-[10rem] shadow-lg rounded-2xl  cursor-pointer flex flex-col relative w-full focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Account</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1 relative focus:outline-0">
                  <img src={Perfil} alt="perfil" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "account" ? "rotate-90" : "rotate-0"} dark:text-gray-800 dark:text-shadow-2lg`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "account" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p> Para visualizar seu perfil, vá em configurações e clique em {""}
                    <a onClick={() => navigate("/EditarPerfil")} className="text-blue-400 dark:text-white underline cursor-pointer">MINHA CONTA</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => toggleOpen("security")} className="bg-white/70 dark:bg-gray-500/80 min-h-[10rem] shadow-lg rounded-2xl cursor-pointer flex flex-col relative w-full focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Segurança</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={Padlock} alt="segurança" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "security" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "security" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p>Gerencie senhas, autenticação em duas etapas e privacidade da sua conta.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => toggleOpen("reports")} className="bg-white/70 dark:bg-gray-500/80 rounded-2xl min-h-[10rem] shadow-lg cursor-pointer flex flex-col w-full relative focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Denúncias</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={Reports} alt="reports" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "reports" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "reports" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p>Acompanhe e envie relatórios de problemas ou denúncias.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => toggleOpen("chat")} className="bg-white/70 dark:bg-gray-500/80 min-h-[10rem] shadow-lg rounded-2xl cursor-pointer flex flex-col w-full relative focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Chat</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={Chat} alt="chat" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "chat" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "chat" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p>Converse em tempo real com suporte ou outros usuários.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => toggleOpen("terms")} className="bg-white/70 dark:bg-gray-500/80 h-[10rem] shadow-lg rounded-2xl cursor-pointer flex flex-col w-full relative focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold md:text-lg dark:text-gray-200 dark:text-shadow-lg">Termos & Políticas</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={Terms} alt="terms" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "terms" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "terms" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p>Leia nossos termos de uso e políticas de privacidade.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <button onClick={() => toggleOpen("history")} className="bg-white/70 dark:bg-gray-500/80 h-[10rem] shadow-lg rounded-2xl cursor-pointer flex flex-col w-full relative focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Histórico</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={History} alt="history" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "history" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "history" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50 shadow-md rounded-xl p-4">
                  <p>Veja suas atividades e interações anteriores.</p>
                </div>
              </div>
            </div>

            <div className="relative col-span-full mb-20">
              <button onClick={() => toggleOpen("about")} className="bg-white/70 dark:bg-gray-500/80 h-[10rem] shadow-lg rounded-2xl cursor-pointer flex flex-col w-full relative focus:outline-none focus-visible:outline-none">
                <div className="p-1">
                  <p className="flex justify-center mt-3 text-xl font-semibold dark:text-gray-200 dark:text-shadow-lg">Sobre</p>
                </div>
                <div className="border-t opacity-10"></div>
                <div className="flex justify-center items-center flex-1">
                  <img src={Sobre} alt="about" className="size-18 p-2 dark:shadow-lg dark:shadow-gray-400 rounded-xl" />
                  <div className="absolute right-0 bottom-0 p-2 mx-2 my-2 dark:bg-white dark:rounded-xl">
                    <ArrowRight className={`transition-transform duration-300 ${open === "about" ? "rotate-90" : "rotate-0"}`} />
                  </div>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === "about" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"} dark:text-white/70`}>
                <div className="bg-white dark:bg-gray-400/50  shadow-md rounded-xl p-4">
                  <p>Informações sobre este aplicativo. <a onClick={() => navigate("/about")} className="underline cursor-pointer text-blue-400 dark:text-white">MAIS</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
