import { useState } from 'react';
import Sidebar from '../componentes/Sidebar';
import Navbar from '../componentes/Navbar'; // ajuste o caminho se necessário
import { TriangleAlert, Droplet, Tornado } from 'lucide-react';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mostrarCompleto, setMostrarCompleto] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const textoCompleto = `A Ops Pel é uma plataforma digital desenvolvida para facilitar a comunicação entre os moradores da cidade e as autoridades responsáveis pela manutenção urbana. Nosso objetivo é criar um espaço colaborativo onde qualquer pessoa possa reportar problemas que impactam o dia a dia da comunidade, como alagamentos, buracos nas ruas, postes quebrados ou sem iluminação, entre outros.

Com a Ops Pel, você pode registrar facilmente ocorrências e acompanhar o status das soluções, promovendo uma cidade mais conectada, segura e bem cuidada. Acreditamos que, juntos, podemos tornar nossa cidade um lugar melhor para todos, valorizando a participação cidadã e a transparência na gestão pública.`;

  const textoResumo = textoCompleto.slice(0, 180) + "...";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixa à esquerda */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Conteúdo principal com Navbar */}
      <div
        className={`flex-1 transition-all duration-1000 ${
          isSidebarOpen ? 'ml-0' : 'ml-0'
        }`}
      >
        <Navbar />
        {/* Conteúdo da Home */}
        <div className="p-10 flex flex-col items-center text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">
            Bem-vindo à <span className="font-bold text-blue-600">OPS PEL</span>
          </h1>
          <p className="font-semibold mt-4 text-xl text-gray-500">
            {mostrarCompleto ? textoCompleto : textoResumo}
          </p>
          <button
            onClick={() => setMostrarCompleto(!mostrarCompleto)}
            className="text-white w-24 font-bold rounded-full hover:underline mt-2 bg-blue-600"
          >
            {mostrarCompleto ? "Ler menos" : "Ler mais"}
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default Home;
