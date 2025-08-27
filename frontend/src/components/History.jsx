import { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function History() {
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Usuário não autenticado');
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/myreports', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os relatos do usuário.');
        }
        return response.json();
      })
      .then((data) => {
        setUserReports(data.data || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar o histórico:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-6">
        <div className='flex gap-2 '>
        <Link to ="/settings"><Undo2  className='text-blue-500 h-10'/>
         </Link>
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Histórico de Denúncias</h1>
        </div>
         

      {userReports.length === 0 ? (
        <p className="text-center text-gray-500 mb-6">
          Você ainda não fez nenhuma denúncia.
        </p>
      ) : (
        <div className="w-full max-w-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" style={{ maxHeight: '60vh' }}>
          {userReports.map((report) => (
            <ReportCard
              key={report.id}
              id={report.id}
              image={report.image}
              status={report.status}
              statusColor="green"
              category={report.category}
              title={report.reportTitle}
              address={report.address}
              time={formatDistanceToNow(new Date(report.updated_at), {
                addSuffix: true,
                locale: ptBR,
              })}
              likes={report.likes}
              likedByCurrentUser={report.likedByCurrentUser}
              comments={1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
