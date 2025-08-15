import Layout from '../components/Layout';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { db } from '../Firebase/index';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { ms } from 'date-fns/locale';

function ChatComunidade() {
  const { token, userId, foto, user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState(localStorage.getItem("userName") || "Anônimo");


  useEffect(() => {
    if (user) {
      setRole(user.role);
      setNome(user.nameUser || "Anônimo");
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


    await addDoc(collection(db, "messages"), {
      texto,
      data: serverTimestamp(),
      user: {
        userName: nome || "Anônimo",
        foto: foto || "",
        uid: userId || null,
      }
    });
    setTexto("")

  }


  async function limparChat() {
    if (!["1", "2", "3"].includes(role)) {
      alert("Apenas Owner, Admin ou Moderador podem limpar o chat.");
      return;
    }
    if (!window.confirm("Tem certeza que deseja apagar todas as mensagens do chat?")) return;
    const msgsRef = collection(db, "messages");
    const snapshot = await getDocs(msgsRef);
    const promises = snapshot.docs.map(docSnap => deleteDoc(doc(db, "messages", docSnap.id)));
    await Promise.all(promises);
  }


  return (
    <Layout>
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-4 mx-auto">
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="text-lg font-semibold">Chat da Comunidade</h2>
          {["1", "2", "3"].includes(role) && (
            <button onClick={limparChat} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600" title="Limpar todas as mensagens">Limpar Chat</button>
          )}
        </div>

        <div className="text-sm bg-blue-100 text-blue-900 p-2 rounded mb-3">
          Este é um espaço para discutir problemas da cidade. Mantenha o respeito e foque em soluções.
        </div>

        <div className="h-[640px] overflow-y-auto space-y-2 mb-2">
          {mensagens.map((msg, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded">
              <strong>{(msg.user?.userName ?? "Anônimo").toUpperCase()}</strong>{' '}
              <span className="text-xs text-gray-500">
                {msg.data instanceof Timestamp ? msg.data.toDate().toLocaleTimeString() : ''}
              </span>
              <p>{msg.texto}</p>
            </div>
          ))}
        </div>

        <form onSubmit={enviarMensagem} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="flex-1 border rounded p-2"
              placeholder="Digite sua mensagem..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-10 rounded"
            >
              &gt;
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ChatComunidade;
