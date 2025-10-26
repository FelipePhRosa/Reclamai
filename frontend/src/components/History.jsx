import { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

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
        if (!response.ok) throw new Error('Erro ao buscar os relatos do usuário.');
        return response.json();
      })
      .then((data) => setUserReports(data.data || []))
      .catch((error) => console.error('Erro ao buscar o histórico:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    
      <div className="flex w-full max-w-screen">
        {userReports.length === 0 ? (
          <div className='w-full flex justify-center items-center mt-50'>
              <p className="text-center text-4xl dark:text-gray-200 font-semibold mt-4">
                Você ainda não fez nenhuma denúncia.
                <hr className='text-blue-400 mt-2 w-63'/>
              </p>
          </div>
        ) : (
          <div>
            <h1 className='text-3xl font-bold dark:text-gray-200'>Suas denúncias:</h1>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {userReports.map((report) => (
                <ReportCard
                  key={report.id}
                  id={report.id}
                  image={report.image ? `http://localhost:3000/uploads/${report.image}` : '/placeholder.png'} 
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
          </div>
        )}
      </div>
    
  );
}

export default History;
