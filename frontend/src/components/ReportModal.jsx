import { useState, useContext } from 'react';
import { Lightbulb, Droplet, CircleHelp, UserMinus, House, CircleDashed } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function ReportModal({ isOpen, onClose, lat, lng }) {
  const { token, userId } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoProblema, setTipoProblema] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [imagens, setImagens] = useState([]);

  const tipos = [
    { id: 2, icon: <Droplet />, label: 'Alagamento' },
    { id: 6, icon: <CircleDashed />, label: 'Buraco na via' },
    { id: 3, icon: <UserMinus />, label: 'Assalto' },
    { id: 7, icon: <House />, label: 'Desabamento' },
    { id: 5, icon: <Lightbulb />, label: 'Iluminação' },
    { id: 8, icon: <CircleHelp />, label: 'Outro' },
  ];

  if (!isOpen || lat === null || lng === null) return null;

  const handleImagemChange = (e) => {
    const files = Array.from(e.target.files);
    const novasImagens = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImagens(prev => [...prev, ...novasImagens]);
  };

  const removerImagem = (index) => {
    setImagens(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoRelato = {
      reportTitle: titulo,
      description: descricao,
      category_id: tipoProblema,
      address: endereco,
      latitude: lat,
      longitude: lng,
      image: imagens.map(img => img.file.name), 
    };

    try {
      const response = await fetch(`http://localhost:3000/report/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(novoRelato),
      });

      if (response.ok) {
        alert('Denúncia enviada com sucesso!');
        setTitulo('');
        setDescricao('');
        setTipoProblema(null);
        setEndereco('');
        setImagens([]);
      } else {
        const erro = await response.json();
        console.error('Erro ao enviar:', erro);
        alert('Erro ao enviar a denúncia');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar a denúncia');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full sm:max-w-[80vw] xl:max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
          aria-label="Fechar modal"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Relatar Problema</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className='text-sm font-medium'>Título da Denúncia:</label>
          <textarea 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder='Exemplo: Acidente na rua Gonçalves Chaves...'
            className='border border-gray-300 rounded p-2 resize-none h-18'
          />

          <label className='text-sm font-medium'>Fotos:</label>
          <input 
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagemChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {imagens.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {imagens.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    alt={`preview-${index}`}
                    className="w-full h-24 object-cover rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removerImagem(index)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full px-2 text-xs hover:bg-opacity-80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="text-sm font-medium">Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder='Descreva o ocorrido: '
            className="border border-gray-300 rounded p-2 resize-none h-18"
          />

          <label className="text-sm font-medium">Endereço:</label>
          <textarea
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            placeholder='Confirme o endereço da denúncia: '
            className="border border-gray-300 rounded p-2 resize-none h-16"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Latitude:</label>
              <input
                type="text"
                value={lat}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Longitude:</label>
              <input
                type="text"
                value={lng}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-100"
              />
            </div>
          </div>

          <label className='text-sm font-medium'>Categorias: </label>
          <div className='grid grid-cols-2 gap-3'>
            {tipos.map((item) => (
              <div
                key={item.id}
                onClick={() => setTipoProblema(item.id)}
                className={`flex items-center gap-2 p-3 border rounded-md transition-colors cursor-pointer ${
                  tipoProblema === item.id
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 hover:bg-blue-50'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
