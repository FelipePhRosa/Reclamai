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
    <div className="max-w-full max-h-[660px] overflow-y-auto p-2 bg-transparent">
        {/* Cards */}
        {reports.length === 0 ? (
        <div className="flex justify-center">
          <h1 className='text-center text-3xl mt-10'>
            Não há registros disponíveis.
          </h1>
        </div>
      ) : (
        reports.map((report) => (
          <ReportCard
            key={report.id}
            image={report.image}
            category={report.category}
            title={report.reportTitle}
            address={report.address}
            time={formatDistanceToNow(new Date(report.updated_at), {
              addSuffix: true,
              locale: ptBR,
            })}
            likes={8}
            comments={1}
          />
        ))
      )}
      </div>
  );
}

export default ReportCardHome;
