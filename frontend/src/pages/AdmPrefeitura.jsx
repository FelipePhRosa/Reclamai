import Layout from "../components/Layout";
import { AuthContext } from '../context/AuthContext';
import React, { useContext, useEffect } from 'react';
import ReportCard from "../components/ReportCard";
import { Link } from 'react-router-dom';
import {
  TriangleAlert,
  CircleCheckBig,
  MessageCircle,
  DollarSign,
  Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const problemas = [
  { name: "Buraco na via", value: 40 },
  { name: "Assalto/Roubo", value: 20 },
  { name: "Desabamento", value: 20 },
  { name: "Iluminação", value: 10 },
  { name: "Outros", value: 5 },
];

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#9333ea", "#ca8a04"];

const bairros = [
  { nome: "Centro", cor: "#2563eb", valor: 342 },
  { nome: "Carvalho Bastos", cor: "#10b981", valor: 289 },
  { nome: "Cohab", cor: "#f59e0b", valor: 187 },
  { nome: "Floresta", cor: "#ef4444", valor: 156 },
  { nome: "Olaria", cor:"#9333ea", valor: 32 },
  { nome: "Santa Marta", cor: "#ca8a04", valor:88 },
];

function LegendaBairros({ bairros }) {
  const total = bairros.reduce((sum, b) => sum + b.valor, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-4 font-bold">
      {bairros.map((b) => {
        const perc = ((b.valor / total) * 100).toFixed(1);
        return (
          <div key={b.nome} className="flex justify-between items-center dark:text-white">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: b.cor }}
              />
              <span>{b.nome}</span>
            </div>
            <span className="font-semibold">
              {b.valor} ({perc}%)
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AdmPrefeitura() {
  const { user } = useContext(AuthContext);
  const cards = [
    { title: 'Total de Reclamações', value: 1257, color: 'blue', Icon: MessageCircle, subtitle: 'Este mês' },
    { title: 'Reclamações Resolvidas', value: 987, color: 'green', Icon: CircleCheckBig, subtitle: '78,7% do total' },
    { title: 'Pendentes', value: 3, color: 'red', Icon: TriangleAlert, subtitle: 'Aguardando ação' },
    { title: 'Orçamento Destinado', value: 250000, color: 'purple', Icon: DollarSign, subtitle: 'Para soluções', prefix: 'R$ ' },
  ];

  return (
    <Layout>
     
      <div className="mt-4 mb-4 ml-1 px-4 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 dark:text-white">
          Bem-vindo à sua <span className="text-blue-500">Dashboard</span> - Camaquã
        </h1>
        <p className="text-gray-500 text-sm sm:text-base font-inter dark:text-gray-400">
          Monitore e gerencie as reclamações da sua cidade em tempo real.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 ">
        {cards.map(({ title, value, color, Icon, subtitle, prefix }) => (
          <div
            key={title}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md border-2 border-gray-200 dark:bg-gray-700 dark:border-gray-700 "
          >
            <div className='dark:text-white mb-2 sm:mb-0'>
              <h2 className="font-bold">{title}</h2>
              <p className={`font-bold text-${color}-500 text-xl`}>
                {prefix || ''}{value.toLocaleString()}
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{subtitle}</p>
            </div>
            <Icon className={`text-${color}-600 bg-${color}-100 rounded p-1`} size={32} />
          </div>
        ))}
      </div>

        <div className="p-4 mb-20">
          <div 
            className="max-w-6xl mx-auto p-4 bg-white rounded-2xl shadow-2xl mt-6 dark:bg-gray-700 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">
              Reclamações por bairro
            </h2>

            <div 
              className="w-full h-60 sm:h-80"
              style={{ outline: 'none' }}
            >
              <ResponsiveContainer 
                width="100%" 
                height="100%"
                style={{ outline: 'none' }}
              >
                <PieChart style={{ outline: 'none' }}>
                  <defs>
                    <style>{`
                      .recharts-wrapper svg,
                      .recharts-wrapper svg *,
                      .recharts-surface,
                      .recharts-layer,
                      .recharts-sector,
                      .recharts-pie-sector {
                        outline: none !important;
                        border: none !important;
                      }
                    `}</style>
                  </defs>
                  <Pie
                    data={problemas}
                    cx="50%"
                    cy="50%"
                    outerRadius={80} 
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {value}
                      </text>
                    );
                  }}
                  >
                    {problemas.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  
                </PieChart>
              </ResponsiveContainer>
            </div>

            <LegendaBairros bairros={bairros} />
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-6 text-center bg-white rounded-2xl shadow-2xl dark:bg-gray-700 dark:border-gray-700 p-5">
            <h1 className="col-span-full font-bold text-2xl text-black dark:text-white">Ações Recomendadas</h1>

            <div className="bg-red-50 border dark:bg-gray-700 border-red-200 rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
              <div>
                <h3 className="text-red-600 font-bold text-lg dark:text-white">Ações Recomendadas - Urgente</h3>
                <p className="text-red-700 mt-2 dark:text-red-400">34 reclamações precisam de atenção imediata</p>
              </div>
              <button className="mt-4 bg-red-600 dark:bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition outline-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                Ver Detalhes
              </button>
            </div>

            <div className="bg-blue-50 border dark:bg-gray-700 border-blue-200 rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
              <div>
                <h3 className="text-blue-600 font-bold text-lg dark:text-white">Orçamento</h3>
                <p className="text-blue-700 mt-2 dark:text-blue-400">R$ 250.000 destinados para soluções este mês</p>
              </div>
              <button className="mt-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Gerenciar
              </button>
            </div>

            <div className="bg-green-50 border dark:bg-gray-700 border-green-200 rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
              <div>
                <h3 className="text-green-600 font-bold text-lg dark:text-white">Meta</h3>
                <p className="text-green-700 mt-2 dark:text-green-400">78% das reclamações resolvidas este mês</p>
              </div>
              <button className="mt-4 bg-green-600 dark:bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition outline-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Relatório
              </button>
            </div>
          </div>

      </div>
    </Layout>
  );
}