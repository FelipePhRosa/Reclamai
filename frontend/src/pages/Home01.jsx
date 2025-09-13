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
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Home() {
  const { user } = useContext(AuthContext);
  const primeiroNome = user?.nameUser ? user.nameUser.split(' ')[0] : 'Usuário';

  return (
    <Layout>
      <div className="mt-4 mb-4 ml-1 px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 dark:text-white">
          Olá, <span className="text-blue-500">{primeiroNome}</span> Bem-vindo ao <span className="text-blue-500">Reclamaí</span>
        </h1>
        <p className="text-gray-500 text-sm font-inter dark:text-gray-400">
          Visualize e gerencie problemas reportados na nossa cidade
        </p>
      </div>

      
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 px-4">
      {[
        { title: 'Total', value: 6, color: 'blue', Icon: ChartColumn },
        { title: 'Reportados', value: 3, color: 'red', Icon: TriangleAlert },
        { title: 'Resolvidos', value: 1, color: 'green', Icon: CircleCheckBig },
      ].map(({ title, value, color, Icon }) => (
        <div
          key={title}
          className="flex justify-between items-center bg-white p-4 rounded-md border-2 border-gray-200 dark:bg-gray-700 dark:border-gray-700"
        >
          <div className='dark:text-white'>
            <h2 className="font-bold">{title}</h2>
            <p className={`font-bold text-${color}-500`}>{value}</p>
          </div>
      <Icon className={`text-${color}-600 bg-${color}-100 rounded p-1`} />
      </div>
      ))}
    </div>

      <div className="grid grid-cols-2 gap-6 w-full m-2 mx-auto px-4">
        <div className="max-h-[770px] overflow-hidden mt-4">
          <MapaDenuncia />
        </div>

        <div className="hidden md:flex flex-col rounded-xl p-8 max-h-[810px]">
          <div className="flex justify-between items-center rounded-xl">
            <h2 className="font-bold text-xl dark:text-gray-200">Problemas Reportados</h2>
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
