import Layout from '../components/Layout';
import { useEffect, useState, useContext, useRef, useMemo } from "react";
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { db } from '../Firebase/index';
import { collection, addDoc, onSnapshot, query, orderBy, getDocs, deleteDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { EllipsisVertical, Smile, SendHorizonal, ChevronLeft } from 'lucide-react';

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
    const interval = setInterval(() => setCurrentTime(new Date()), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      setRole(user?.role);
      setNome(user?.nameUser || "Anônimo");
      if (user?.avatar_url) setAvatar(user.avatar_url);
    }
  }, [user]);

  if (!token) return <Navigate to="/login" />;

  // Load messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("data", "asc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMensagens(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const palavrasProibidas = ["merda", "bosta", "porra", "caralho", "puta", "fod4", "fdp", "foda", "desgraça", "arrombado", "viado"];
    if (palavrasProibidas.some(p => texto.toLowerCase().includes(p))) {
      alert("Mensagem contém palavras inadequadas.");
      return;
    }

    setTexto("");
    await addDoc(collection(db, "messages"), {
      texto,
      data: serverTimestamp(),
      user: { userName: nome || "Anônimo", foto: avatar || "", uid: user?.userId || null }
    });
  };

  const chatClear = async () => {
    const snapshot = await getDocs(collection(db, "messages"));
    if (snapshot.empty) return alert("Não há mensagens para apagar!");
    if (!window.confirm("Deseja apagar todas as mensagens?")) return;
    await Promise.all(snapshot.docs.map(docSnap => deleteDoc(doc(db, "messages", docSnap.id))));
    alert("Mensagens apagadas!");
  };

  const msgDelete = async (docId) => {
    if (!["1", "2", "3"].includes(role)) return alert("Apenas Owner/Admin/Moderador podem apagar mensagens.");
    if (!window.confirm("Deseja realmente apagar esta mensagem?")) return;
    await deleteDoc(doc(db, "messages", docId));
  };

  useEffect(() => {
    ultimaMensagemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const mensagensComTempo = useMemo(() => {
    const calcularTempoRelativo = (timestamp) => {
      if (!timestamp) return '';
      const diffMs = currentTime.getTime() - timestamp.toDate().getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return 'Agora';
      if (diffMin < 60) return `${diffMin} min atrás`;
      const diffHoras = Math.floor(diffMin / 60);
      if (diffHoras < 24) return `${diffHoras} h atrás`;
      const diffDias = Math.floor(diffHoras / 24);
      return diffDias === 1 ? 'Ontem' : `${diffDias} dias atrás`;
    };
    return mensagens.map(msg => ({
      ...msg,
      tempoFormatado: msg.data instanceof Timestamp ? calcularTempoRelativo(msg.data) : ''
    }));
  }, [mensagens, currentTime]);

  return (
    <Layout>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Link to="/" className="p-2 bg-gray-900 dark:bg-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition">
            <ChevronLeft className="text-white dark:text-gray-900" />
          </Link>
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-amber-50 flex-1">Espaço de Discussão</h2>
          {["1","2","3"].includes(role) && (
            <button onClick={chatClear} className="bg-red-500 hover:bg-red-700 dark:bg-green-500 dark:hover:bg-green-700 text-white px-3 py-2 rounded transition">
              Limpar Chat
            </button>
          )}
        </div>

        {/* Info */}
        <div className="text-sm bg-blue-100 dark:bg-gray-600 dark:text-gray-200 text-blue-900 p-2 mx-5 my-2 rounded">
          Espaço para discutir problemas da cidade. Mantenha o respeito e foque em soluções.
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto scrollbar-theme p-3 space-y-2">
          {mensagensComTempo.map((msg, i) => (
            <div key={i} className="flex items-start space-x-2 p-2 rounded-xl bg-gray-100 dark:bg-gray-900">
              {i === mensagensComTempo.length - 1 && <div ref={ultimaMensagemRef} />}
              <img className="w-12 h-12 rounded-lg object-cover" src={msg.user?.foto || avatar} alt="Avatar" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <strong className="dark:text-white">{msg.user?.userName ?? "Anônimo"}</strong>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{msg.tempoFormatado}</span>
                  {["1","2","3"].includes(role) && (
                    <button onClick={() => msgDelete(msg.id)} className="ml-2">
                      <EllipsisVertical className="text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-200 break-words">{msg.texto}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={enviarMensagem} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex items-center space-x-2">
          <button type="button" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition">
            <Smile className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-xl outline-none placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={!texto.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-xl transition disabled:opacity-50"
          >
            <SendHorizonal className="h-5 w-5" />
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ChatComunidade;
