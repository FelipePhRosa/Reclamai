import { Clock5, ThumbsUp, MessageSquare, Droplet, CircleDashed, Lightbulb } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReportCard from './ReportCard';

function ReportCardHome() {
  const [reports, setReports] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/reportList')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            setReports(data.data);
          } else {
            setReports([]);
            console.error('API retornou formato inesperado:', data);
          }
        })
        .catch(err => {
          console.error('Erro ao buscar os relatos:', err);
        });
    }, []);

  return (
    <div className="max-w-full max-h-[800px] bg-transparent overflow-y-scroll scrollbar-none scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {/* Cards */}
        {reports.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className='text-center text-5xl mt-50 dark:text-gray-200 font-black w-70'>
            Não há registros disponíveis.
          </h1>
        </div>
      ) : (
        reports.map((report) => (
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
        ))
      )}
      </div>
  );
}

export default ReportCardHome;
