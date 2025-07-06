import Layout from '../components/Layout';
import MapaDenuncia from '../components/MapaLeaflet';
import ReportCard from '../components/ReportCardHome';
import { Link } from 'react-router-dom';
import {
  TriangleAlert,
  ChartColumn,
  Clock,
  CircleCheckBig,
  TrendingUp,
  Plus
} from 'lucide-react';

function Home() {
  return (
    <Layout>
      <div className="mt-4 mb-4 ml-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Bem-vindo ao <span className="text-blue-500">Reclamaí</span>
        </h1>
        <p className="text-gray-500 text-sm font-inter">
          Visualize e gerencie problemas reportados na nossa cidade
        </p>
      </div>

      {/* Cards Resumo */}
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {[
        { title: 'Total', value: 6, color: 'blue', Icon: ChartColumn },
        { title: 'Reportados', value: 3, color: 'red', Icon: TriangleAlert },
        { title: 'Em análise', value: 2, color: 'yellow', Icon: Clock },
        { title: 'Resolvidos', value: 1, color: 'green', Icon: CircleCheckBig },
        { title: 'Votos', value: 73, color: 'purple', Icon: TrendingUp }
      ].map(({ title, value, color, Icon }) => (
        <div
          key={title}
          className="flex justify-between items-center bg-white p-4 rounded-md border-2 border-gray-200"
        >
          <div>
            <h2 className="font-bold">{title}</h2>
            <p className={`font-bold text-${color}-500`}>{value}</p>
          </div>
      <Icon className={`text-${color}-600 bg-${color}-100 rounded p-1`} />
      </div>
      ))}
    </div>
      <div className='flex gap-5 py-3'>
        <div className='flex bg-gray-200 border border-blue-400 w-20 h-8 rounded-full justify-center hover:bg-blue-200 hover:cursor-pointer gap-1'>
          <button className='font-semibold'>Todos</button>
        </div>

        <div className='flex bg-gray-200 border border-blue-400 w-28 h-8 rounded-full justify-center pl-1 hover:bg-blue-200 hover:cursor-pointer gap-1'>
          <button className='font-semibold'>Reportados</button>
        </div>

        <div className='flex bg-gray-200 border border-blue-400 w-28 h-8 rounded-full justify-center pl-1 hover:bg-blue-200 hover:cursor-pointer gap-1'>
          <button className='font-semibold'>Em analise</button>
        </div>

        <div className='flex bg-gray-200 border border-blue-400 w-24 h-8 rounded-full justify-center pl-1 hover:bg-blue-200 hover:cursor-pointer gap-1'>
          <button className='font-semibold'>Resolvidos</button>
        </div>
      </div>

      {/* Mapa e Problemas */}
      <div className="grid grid-cols-2 gap-6 w-full m-2 mx-auto">
        <div className="max-h-[780px] overflow-hidden">
          <div className=" border-2 rounded-t-xl p-4">
            <h2 className="font-bold text-xl">Mapa de Problemas</h2>
            <p className="text-gray-500">
              Clique nos marcadores para ver detalhes dos problemas reportados
            </p>
          </div>
          <MapaDenuncia />
        </div>

        <div className="flex flex-col border-2 border-gray-200 p-8">
          <div className="flex justify-between items-center mb-4 rounded-xl">
            <h2 className="font-bold text-xl">Problemas Reportados</h2>
            <Link
              to="/reportar"
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 px-5 py-1.5 rounded-md text-white font-semibold"
            >
              <Plus size={20} className="animate-pulse" />
              Reportar
            </Link>
          </div>
          <ReportCard />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
