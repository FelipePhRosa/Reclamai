import Layout from '../componentes/Layout';

function ChatComunidade() {
  const mensagens = [
    { nome: 'João cabeça', texto: 'Ta funcionando?', hora: '13:30' },
    { nome: 'Felipe', texto: 'Aparentemente', hora: '13:31' },
    { nome: 'Arthur', texto: 'Para cara não começa', hora: '13:32' },
    { nome: 'Cassio', texto: 'Bah paeeeeeeee', hora: '13:33' },
    { nome: 'João cabeça', texto: 'nothing', hora: '19:91' },
  ];

  return (
    <Layout>
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-4 mx-auto">
        <h2 className="text-lg font-semibold mb-2">Chat da Comunidade</h2>

        <div className="text-sm bg-blue-100 text-blue-900 p-2 rounded mb-3">
          Este é um espaço para discutir problemas da cidade. Mantenha o respeito e foque em soluções.
        </div>

        <div className="h-[440px] overflow-y-auto space-y-2 mb-2">
          {mensagens.map((msg, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded">
              <strong>{msg.nome}</strong>{' '}
              <span className="text-xs text-gray-500">{msg.hora}</span>
              <p>{msg.texto}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded p-2"
            placeholder="Digite sua mensagem..."
          />
          <button className="bg-blue-500 text-white p-2 rounded">&gt;</button>
        </div>
      </div>
    </Layout>
  );
}

export default ChatComunidade;
