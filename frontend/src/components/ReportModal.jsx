import { useState, useContext, useEffect } from 'react'; //adicionei o useEffect
import { Lightbulb, Droplet, CircleHelp, UserMinus, Home, CircleDashed, X, MapPin, Camera, CarFront, Upload, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function ReportModal({ isOpen, onClose, lat, lng }) {
  const { token, user } = useContext(AuthContext);
  const userId = user?.userId;
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoProblema, setTipoProblema] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [imagens, setImagens] = useState([]);
  //adicionei
const [cities, setCities] = useState([]);
const [selectedCity, setSelectedCity] = useState('');
//


//adicionei
useEffect(() => {
  if (!isOpen) return;

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
}, [isOpen, token]);
//

  const tipos = [
    { id: 2, icon: <Droplet className="w-5 h-5" />, label: 'Alagamento', color: 'blue' },
    { id: 6, icon: <CircleDashed className="w-5 h-5" />, label: 'Buraco na via', color: 'orange' },
    { id: 3, icon: <UserMinus className="w-5 h-5" />, label: 'Assalto', color: 'red' },
    { id: 7, icon: <CarFront className="w-5 h-5" />, label: 'Acidente de Trânsito', color: 'purple' },
    { id: 5, icon: <Lightbulb className="w-5 h-5" />, label: 'Iluminação', color: 'yellow' },
    { id: 8, icon: <CircleHelp className="w-5 h-5" />, label: 'Outro', color: 'gray' },
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
    setImagens(prev => {
      // Revoga a URL do objeto para liberar memória
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('reportTitle', titulo);
      formData.append('city_id', selectedCity) //adicionei
      formData.append('description', descricao);
      formData.append('category_id', tipoProblema); // se precisar, parseInt(tipoProblema)
      formData.append('address', endereco);
      formData.append('latitude', lat);
      formData.append('longitude', lng);

      imagens.forEach((imagem) => {
        formData.append('imagem', imagem.file); // ⚡ nome deve bater com multer.single('imagem')
      });

      try {
        const response = await fetch(`http://localhost:3000/report/${userId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          alert('Denúncia enviada com sucesso!');
          setTitulo('');
          setDescricao('');
          setTipoProblema(null);
          setEndereco('');
          imagens.forEach(imagem => URL.revokeObjectURL(imagem.preview));
          setImagens([]);
          onClose();
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


  const getCategoryColorClasses = (color, isSelected) => {
    const baseClasses = "flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-200 cursor-pointer group hover:scale-[1.02] hover:shadow-lg";
    
    if (isSelected) {
      const selectedColors = {
        blue: 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        orange: 'border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
        red: 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        purple: 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
        yellow: 'border-yellow-500 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
        gray: 'border-gray-500 bg-gray-50 dark:border-gray-400 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
      };
      return `${baseClasses} ${selectedColors[color]}`;
    }
    
    return `${baseClasses} border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-800/50`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 dark:border dark:border-gray-700 dark:text-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] transform transition-all duration-300 scale-100 overflow-y-scroll scrollbar-none scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <MapPin className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Relatar Problema</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                Ajude a melhorar sua comunidade
              </p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors text-gray-500 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Título da Denúncia
            </label>
            <textarea 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder='Exemplo: Acidente na rua Gonçalves Chaves...'
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 resize-none h-16 sm:h-20 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              required
            />
          </div>

          {/* Upload de Imagens */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              <Camera className="w-4 h-4 inline mr-2" />
              Imagens (Opcional)
            </label>
            
            {/* Botão de Upload */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleImagemChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                    Clique para fazer upload
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, JPEG até 10MB cada
                  </p>
                </div>
              </label>
            </div>

            {/* Preview das Imagens */}
            {imagens.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                {imagens.map((imagem, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imagem.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <button
                      onClick={() => removerImagem(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Remover imagem"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Descrição
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              placeholder='Descreva o ocorrido em detalhes...'
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 resize-none h-20 sm:h-24 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            />
          </div>

          {/* cidade adicionei */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Cidade
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(Number(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              required
            >
              <option value="">Selecione a cidade</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>


          {/* Endereço */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Endereço
            </label>
            <textarea
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              placeholder='Confirme o endereço da denúncia...'
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 resize-none h-16 sm:h-20 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            />
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Latitude
              </label>
              <input
                type="text"
                value={lat}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Longitude
              </label>
              <input
                type="text"
                value={lng}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-3 sm:space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Categoria do Problema
            </label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'>
              {tipos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setTipoProblema(item.id)}
                  className={getCategoryColorClasses(item.color, tipoProblema === item.id)}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de envio */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!titulo || !descricao || !endereco || !tipoProblema}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Enviar Denúncia
          </button>
        </div>
      </div>
    </div>
  );
}