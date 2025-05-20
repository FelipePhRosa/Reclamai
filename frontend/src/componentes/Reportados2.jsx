import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Droplet, CircleDashed, Lightbulb } from 'lucide-react';
import ReportCard from './ReportCard';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Report() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reports, setReports] = useState([  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
  fetch('http://localhost:3000/reportList')
    .then(response => response.json())
    .then(data => {
      console.log('Resposta da API:', data);
      if (Array.isArray(data.data)) {
        setReports(data.data);
      } else {
        setReports([]); // ou trate com erro
        console.error('API retornou formato inesperado:', data);
      }
    })
    .catch(err => {
      console.error('Erro ao buscar os relatos:', err);
    });
}, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixa na lateral */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Conteúdo ao lado da sidebar */}
      <main
        className={`flex-1 transition-all duration-300 bg-gray-200 ${
          isSidebarOpen ? '' : ''
        } `}
      >
        <div className="max-w-3xl mx-auto pt-5">
          {/* Header */}
            <div className="flex justify-end items-center border-b pb-3 mb-5 px-4 py-1 rounded-md">
            <Link
            to="/reportar"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-5 py-1.5 rounded-md text-white font-semibold"
          >
            <Plus size={20} className='animate-spin' />
            Reportar
          </Link>
          </div>

          {/* Cards */}
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              image={report.image}
              status={report.status}
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
            ))}
        </div>
      </main>
    </div>
  );
}

export default Report;
