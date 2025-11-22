import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import ReportCard from './ReportCard';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

function Report() {
  const { user, token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3000/reportList', { 
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          const parsedReports = data.data.map(report => ({
            ...report,
            likedByCurrentUser: !!report.likedByCurrentUser,
          }));
          setReports(parsedReports);
        } else {
          setReports([]);
          console.error('API retornou formato inesperado:', data);
        }
      })
      .catch(err => console.error('Erro ao buscar os relatos:', err));
  }, [token]);

  // Define filtros de acordo com a role
const filtros = [
  { label: 'Todas', value: 'all' },
  { label: 'Aprovadas', value: 'aprovado' },
  { label: 'Resolvidas', value: 'resolvida' },
];

// Role 1 recebe aba de rejeitados separada
if (user?.role === '1') {
  filtros.push({ label: 'Rejeitado', value: 'rejeitado' });
}

// Aplica filtro de status
const filtroReports = reports.filter(report => {
  if (statusFilter === 'all') {
    // Para usuários comuns, "Todas" só mostra aprovadas + resolvidas
    return user?.role !== '1' 
      ? ['aprovado', 'resolvida'].includes(report.status)
      : ['aprovado', 'resolvida'].includes(report.status); // adm também poderia incluir rejeitado se quiser
  }
  return report.status === statusFilter;
});

  return (
    <Layout>
      <div className="mx-auto pt-5 p-5">
        {/* Header */}
        <div className="flex justify-end items-center pb-3 mb-5 px-4 py-1 rounded-md">
          <Link
            to="/reportar"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 px-5 py-1.5 rounded-md text-white font-semibold"
          >
            <Plus size={20} className="animate-pulse" />
            Reportar
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex justify-between items-center pb-3 mb-5 px-4 py-1 rounded-md">
          <div className="flex gap-2 flex-wrap">
            {filtros.map(f => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1 rounded-md font-semibold ${
                  statusFilter === f.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="xl:grid grid-cols-3 gap-4">
          {filtroReports.map(report => (
            <ReportCard
              key={report.id}
              id={report.id}
              image={report.image ? `http://localhost:3000/uploads/${report.image}` : '/placeholder.png'}
              status={report.status}
              statusColor={
                report.status === 'aprovado' ? 'green' :
                report.status === 'resolvida' ? 'blue' :
                report.status === 'rejeitado' ? 'red' :
                'gray'
              }
              category={report.category}
              title={report.reportTitle}
              address={report.address}
              time={formatDistanceToNow(new Date(report.updated_at), { addSuffix: true, locale: ptBR })}
              likes={report.likes}
              likedByCurrentUser={report.likedByCurrentUser}
              comments={1}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Report;
