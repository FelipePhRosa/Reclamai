import { useState, useEffect, useContext } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Share2,
  MessageSquare,
  ChevronUp,
  Eye,
  ExternalLink,
  MapIcon
} from "lucide-react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import MiniMap from "../components/MiniMap";
import LikeButton from "../components/LikeButton";

export default function ReportPage() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
        );
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem('token');
    
    console.log('=== FRONTEND DEBUG ===');
    console.log('Report ID:', id);
    console.log('Token exists:', !!token);

    fetch(`http://localhost:3000/report/${id}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Importante!
      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('=== RESPONSE ===');
        console.log('Full data:', data);
        console.log('Report likes:', data.reportInf?.likes);
        console.log('Report likedByCurrentUser:', data.reportInf?.likedByCurrentUser);
        
        setReport(data.reportInf);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar o relatório:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'aprovado': 
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30';
      case 'pendente': 
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30';
      case 'rejeitado': 
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30';
      default: 
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'aprovado': return <CheckCircle size={18} className="text-white" />;
      case 'pendente': return <Clock size={18} className="text-white" />;
      case 'rejeitado': return <AlertTriangle size={18} className="text-white" />;
      default: return <Clock size={18} className="text-white" />;
    }
  };


  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800 mx-auto"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Carregando relatório...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <AlertTriangle className="h-20 w-20 text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ops! Algo deu errado</h2>
            <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Voltar
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <Eye className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Relatório não encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">O relatório que você está procurando não foi encontrado.</p>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Voltar
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Enhanced Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="p-3 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <ArrowLeft size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  Relatório #{report.id}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Detalhes completos do relatório
                </p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="capitalize">{report.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Hero Image */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse">
                        <div className="h-8 w-8 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  <img 
                    src={report.image  ? `http://localhost:3000/uploads/${report.image}` : '/placeholder.png'} 
                    alt={report.reportTitle}
                    className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text">
                  {report.reportTitle}
                </h2>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Interações
                </h3>
                <div className="flex flex-wrap gap-4">
                  <LikeButton
                    reportId={report.id}
                    initialLiked={report.likedByCurrentUser}
                    initialLikes={report.likes}
                  />
                  <button className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                    <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Comentar</span>
                  </button>
                  <button className="group flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                    <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              
              {/* Report Info */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 ml-3">
                  <Calendar size={20} className="text-blue-500" />
                  Informações
                </h3>
                <div className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Data de Criação
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(report.created_at)}
                      </p>
                    </div>
                  </div>

                  {report.updated_at !== report.created_at && (
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Clock size={18} className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Última Atualização
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(report.updated_at)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <User size={18} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Reportado por
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.fullName || 'Usuário'}
                      </p>
                    </div>
                  </div>

                  {report.approved_by && (
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Aprovado por
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Moderador #{report.approved_by}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Location */}
              {(report.latitude && report.longitude) && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-red-500" />
                    Localização
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <MapPin size={18} className="text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Endereço
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {report.address}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p><span className="font-medium">Latitude:</span> {report.latitude}</p>
                        <p><span className="font-medium">Longitude:</span> {report.longitude}</p>
                      </div>
                    </div>

                    <MiniMap lat={report.latitude} lng={report.longitude} category_id={report.category_id} darkMode={!darkMode} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}