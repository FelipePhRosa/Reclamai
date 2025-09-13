import Layout from '../components/Layout';
import { useEffect, useState, useContext, useRef, useMemo, useCallback } from "react";
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { db } from '../Firebase/index';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { EllipsisVertical, Smile, ArrowDownCircleIcon, SendHorizonal, ChevronLeft } from 'lucide-react';
import logo from '../assets/AppLogo2.png'

function ChatComunidade() {
  const { token, user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState(localStorage.getItem("userName") || "Anônimo");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar_url") || "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg");
  const [currentTime, setCurrentTime] = useState(new Date());
  const ultimaMensagemRef = useRef(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      console.log('Atualizando automaticamente!');
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (user) {
      setRole(user?.role);
      setNome(user?.nameUser || "Anônimo");
    }

    if (user?.avatar_url) {
      setAvatar(user.avatar_url);
    }

  }, [user]);

  if (!token) return <Navigate to="/login" />;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("data", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensagens(msgs);
    });

    return () => unsubscribe();
  }, []);


  async function enviarMensagem(e) {
    e.preventDefault();
    if (!texto.trim()) return;

    const palavrasProibidas = [
      "merda", "bosta", "porra", "caralho", "puta", "put4", "pu74", "fod4", "porr4", "fdp", "foda", "desgraça", "desgraca", "arrombado", "viado", "piranha", "corno", "cu", "cuzao", "cacete", "babaca", "otario", "otário", "burro", "imbecil", "idiota",
    ];
    const contemPalavrao = palavrasProibidas.some(p => texto.toLowerCase().includes(p));
    if (contemPalavrao) {
      alert("Sua mensagem contém palavras inadequadas. Por favor, seja respeitoso.");
      return;
    }
    setTexto("")

    await addDoc(collection(db, "messages"), {
      texto,
      data: serverTimestamp(),
      user: {
        userName: nome || "Anônimo",
        foto: avatar || "",
        ano: user?.nameUser,
        uid: user?.userId || null,
      }
    });
  }

  async function chatClear() {
    const msgsRef = collection(db, "messages");
    const snapshot = await getDocs(msgsRef);

    if (snapshot.empty) {
      window.alert("Não a nada para apagar!")
      return
    }
    if (!window.confirm("Tem certeza que deseja apagar todas as mensagens do chat?")) return;
    const promises = snapshot.docs.map(docSnap => deleteDoc(doc(db, "messages", docSnap.id)));
    await Promise.all(promises);
    window.alert("Todas as mensagens foram apagadas!")
  }

  async function msgDelete(docId) {
    if (!["1", "2", "3"].includes(role)) {
      alert("Apenas Owner, Admin ou Moderador podem apagar essa Mensagem.");
      return;
    }
    try {
      if (!window.confirm("Quer mesmo apagar esta mensagem?")) return;
      await deleteDoc(doc(db, "messages", docId));
      console.log("Mensagem apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar mensagem:", error);
    }
  }

  useEffect(() => {
    ultimaMensagemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const mensagensComTempo = useMemo(() => {
    const calcularTempoRelativo = (timestamp) => {
      if (!timestamp) return '';
      const dataMsg = timestamp.toDate();

      const diffMs = currentTime.getTime() - dataMsg.getTime();
      const diffSeg = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSeg / 60);
      const diffHoras = Math.floor(diffMin / 60);
      const diffDias = Math.floor(diffHoras / 24);

      if (diffMs <= 60000) return
      if (diffMin < 60) return 
      if (diffHoras < 24) return
      if (diffDias === 1) return 'Ontem';
      return
    };

    return mensagens.map(msg => ({
      ...msg,
      tempoFormatado: msg.data instanceof Timestamp ? calcularTempoRelativo(msg.data) : ''
    }));
  }, [mensagens, currentTime]);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 border-white shadow-md w-full h-screen">
        <div className="grid grid-cols-3 p-3">
          <div className='my-auto flex justify-center items-center w-10 h-10 bg-gray-900 dark:bg-white rounded-lg shadow-2xl dark:hover:bg-gray-300 duration-200 cursor-pointer'>
            <Link to='/'>
              <ChevronLeft className='text-white dark:text-gray-900' />
            </Link>
          </div>
          <h2 className="text-2xl text-center dark:text-amber-50 xl:mt-2 font-[Poppins]">Espaço de Discussão</h2>
          <div className="justify-self-end">
            {["1", "2", "3"].includes(role) && (
              <button onClick={chatClear} className="bg-red-500 dark:bg-green-500 dark:hover:bg-green-800 hover:cursor-pointer text-amber-50 px-3 py-2 mt-3.5 xl:mt-2 rounded text-sm hover:bg-red-800" title="Limpar todas as mensagens">
                Limpar Chat
              </button>
            )}
          </div>
        </div>

        <div className='border-t border-gray-600 w-90 xl:w-full pb-2 ml-7 xl:ml-0'></div>

        <div className="text-sm bg-blue-100 dark:bg-gray-500 dark:text-neutral-300 text-blue-900 p-2 mx-5 rounded mb-6">
          Este é um espaço para discutir problemas da cidade. Mantenha o respeito e foque em soluções.
        </div>

        <div className="h-[640px] overflow-y-auto mb-2 scrollbar-theme p-3 xl:h-[790px] space-y-2">
          {mensagensComTempo.map((msg, i) => (
            <div key={i} className="bg-gray-100 p-2 dark:bg-gray-900 rounded-xl flex items-center">
              {i === mensagensComTempo.length - 1 && <div ref={ultimaMensagemRef}></div>}
              <img
                className="w-12 h-12 rounded-[10px]"
                src={
                  msg?.user?.foto ||
                  "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
                }
                alt="FOTO PERFIL"
              />
              <div className="flex flex-col ml-2 w-full relative">
                <div className="flex items-center dark:text-neutral-300">
                  <div className="flex items-center">
                    <strong>{msg.user?.userName ?? "Anônimo"}</strong>
                    <span>{msg.tempoFormatado}</span>
                  </div>
                  {["1", "2", "3"].includes(role) && (
                    <button className='cursor-pointer' onClick={() => msgDelete(msg.id)}>
                      <EllipsisVertical className='absolute top-1/2 -translate-y-1/2 right-0' />
                    </button>
                  )}
                </div>
                <p className="max-w-[79rem] text-gray-600 dark:text-white text-[16px] break-words overflow-wrap-anywhere">
                  {msg.texto}
                </p>
              </div>
            </div>
          ))}
          <div ref={ultimaMensagemRef}></div>
        </div>

          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 ">
          <form onSubmit={enviarMensagem} className="max-w-full pr-2 pl-2 mt-2 mx-auto">
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-2xl p-2 shadow-sm border border-gray-200/50 dark:border-gray-600/50">
              <button
                type="button"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200"
              >
                <Smile className='h-5 w-5 text-gray-600 dark:text-gray-300' />
              </button>
              
              <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Digite sua mensagem..."
              />
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-sm disabled:transform-none"
                disabled={!texto.trim()}
              >
                <SendHorizonal className='h-5 w-5' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChatComunidade;