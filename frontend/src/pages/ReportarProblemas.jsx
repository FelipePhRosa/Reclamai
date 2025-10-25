import Layout from '../components/Layout';
import { Lightbulb, Droplet, CircleHelp, UserMinus, House, CircleDashed } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function Problemas() {
  const { token, user } = useContext(AuthContext);
  const userId = user?.userId;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoProblema, setTipoProblema] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const tipos = [
    { id: 2, icon: <Droplet />, label: 'Alagamento' },
    { id: 6, icon: <CircleDashed />, label: 'Buraco na via' },
    { id: 3, icon: <UserMinus />, label: 'Assalto/Roubo' },
    { id: 7, icon: <House />, label: 'Desabamento' },
    { id: 5, icon: <Lightbulb />, label: 'Iluminação' },
    { id: 8, icon: <CircleHelp />, label: 'Outro' },
  ];

  // Adicionei
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('http://localhost:3000/allCities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Erro ao buscar cidades');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCities();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCity) {
      alert('Selecione a cidade do problema');
      return;
    }

    const novoRelato = {
      reportTitle: titulo,
      description: descricao,
      category_id: tipoProblema,
      address: endereco,
      city_id: selectedCity,//adicionei
      latitude: 0,
      longitude: 0,
      image: urlImagem,
    };

    try {
      const response = await fetch(`http://localhost:3000/report/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoRelato),
      });

      if (response.ok) {
        alert('Denúncia enviada com sucesso!');
        setTitulo('');
        setDescricao('');
        setTipoProblema(null);
        setEndereco('');
        setUrlImagem('');
        setSelectedCity('');
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
    <Layout>
      <div className="flex justify-center items-start min-h-[80vh] p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md max-w-2xl w-full space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800">Reportar Novo Problema</h2>
            <p className="text-gray-600 text-sm">Informe o problema que você identificou na cidade</p>
          </div>

          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Buraco na Rua Dom Pedro"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cidade adicionei */} 
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade <span className="text-red-600">*</span>
            </label>
            <select
              id="cidade"
              value={selectedCity}
              onChange={(e) => setSelectedCity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione a cidade</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição <span className="text-red-600">*</span>
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              placeholder="Descreva o problema com o máximo de detalhes possível..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipo de Problema */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Tipo de Problema <span className="text-red-600">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
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
          </div>

          {/* Endereço */}
          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
              Endereço <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua, número, bairro, cidade..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL da Imagem */}
          <div>
            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem
            </label>
            <input
              type="url"
              id="imagem"
              value={urlImagem}
              onChange={(e) => setUrlImagem(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Enviar Denúncia
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Problemas;
