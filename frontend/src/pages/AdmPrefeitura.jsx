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
  Plus,
  TrendingUp,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const problemas = [
  { name: "Buraco na via", value: 40 },
  { name: "Assalto/Roubo", value: 20 },
  { name: "Desabamento", value: 20 },
  { name: "Iluminação", value: 10 },
  { name: "Outros", value: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f97316"];

const bairros = [
  { nome: "Centro", cor: "#3b82f6", valor: 342 },
  { nome: "Carvalho Bastos", cor: "#10b981", valor: 289 },
  { nome: "Cohab", cor: "#f59e0b", valor: 187 },
  { nome: "Floresta", cor: "#ef4444", valor: 156 },
  { nome: "Olaria", cor:"#8b5cf6", valor: 32 },
  { nome: "Santa Marta", cor: "#f97316", valor:88 },
];

// Dados para gráfico de tendências
const tendenciasMes = [
  { mes: 'Mai', reclamacoes: 980, resolvidas: 850 },
  { mes: 'Jun', reclamacoes: 1120, resolvidas: 920 },
  { mes: 'Jul', reclamacoes: 1050, resolvidas: 890 },
  { mes: 'Ago', reclamacoes: 1180, resolvidas: 950 },
  { mes: 'Set', reclamacoes: 1257, resolvidas: 987 },
];

function LegendaBairros({ bairros }) {
  const total = bairros.reduce((sum, b) => sum + b.valor, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
      {bairros.map((b) => {
        const perc = ((b.valor / total) * 100).toFixed(1);
        return (
          <div key={b.nome} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-xl border border-gray-100 dark:border-gray-500">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: b.cor }}
              />
              <span className="font-medium text-gray-700 dark:text-gray-200">{b.nome}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 dark:text-white">{b.valor}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{perc}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdmPrefeitura() {
  const { user } = useContext(AuthContext);
  
  const cards = [
    { 
      title: 'Total de Reclamações', 
      value: 1257, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      Icon: MessageCircle, 
      subtitle: 'Este mês',
      trend: '+12%',
      trendUp: true
    },
    { 
      title: 'Reclamações Resolvidas', 
      value: 987, 
      color: 'bg-gradient-to-r from-green-500 to-green-600', 
      Icon: CircleCheckBig, 
      subtitle: '78,7% do total',
      trend: '+5%',
      trendUp: true
    },
    { 
      title: 'Pendentes', 
      value: 3, 
      color: 'bg-gradient-to-r from-red-500 to-red-600', 
      Icon: TriangleAlert, 
      subtitle: 'Aguardando ação',
      trend: '-8%',
      trendUp: false
    },
    { 
      title: 'Orçamento Destinado', 
      value: 250000, 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600', 
      Icon: DollarSign, 
      subtitle: 'Para soluções', 
      prefix: 'R$ ',
      trend: '+3%',
      trendUp: true
    },
  ];

  return (
    <Layout>
      {/* Header com gradiente e informações contextuais */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-10"></div>
        <div className="relative px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard Municipal
                <span className="block text-xl lg:text-2xl font-medium text-blue-600 dark:text-blue-400 mt-1">
                  Camaquã - RS
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg max-w-2xl">
                Monitore e gerencie as reclamações da sua cidade em tempo real com inteligência e eficiência.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Users className="text-blue-500" size={24} />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">População</div>
                    <div className="font-bold text-gray-900 dark:text-white">67.498 hab</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Calendar className="text-green-500" size={24} />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Última Atualização</div>
                    <div className="font-bold text-gray-900 dark:text-white">Agora</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Métricas Modernos */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map(({ title, value, color, Icon, subtitle, prefix, trend, trendUp }) => (
            <div
              key={title}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${color} p-3 rounded-xl shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${!trendUp ? 'rotate-180' : ''}`} />
                    {trend}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-600 dark:text-gray-300 text-sm mb-1">{title}</h3>
                  <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">
                    {prefix || ''}{value.toLocaleString()}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-600 opacity-50"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Gráficos */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Gráfico de Tendências */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 pb-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Tendência de Reclamações
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Comparativo mensal entre reclamações recebidas e resolvidas
              </p>
            </div>
            
            <div className="h-64 px-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tendenciasMes}>
                  <defs>
                    <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="reclamacoes"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorReceived)"
                    name="Reclamações"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolvidas"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorResolved)"
                    name="Resolvidas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Pizza Modernizado */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 pb-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Tipos de Reclamações
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Distribuição por categoria de problema
              </p>
            </div>
            
            <div className="h-64 px-6 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          {value}
                        </text>
                      );
                    }}
                  >
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
                    {problemas.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Bairros */}
      <div className="px-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-blue-500" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Reclamações por Bairro
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Distribuição geográfica das demandas municipais
                </p>
              </div>
            </div>
            
            <LegendaBairros bairros={bairros} />
          </div>
        </div>
      </div>

      {/* Ações Recomendadas Modernizadas */}
      <div className="px-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Ações Recomendadas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-red-200 dark:border-red-800 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500 rounded-xl">
                      <TriangleAlert className="text-white" size={20} />
                    </div>
                    <h3 className="text-red-700 dark:text-red-300 font-bold text-lg">Urgente</h3>
                  </div>
                  <p className="text-red-600 dark:text-red-400 flex-grow mb-4">
                    34 reclamações precisam de atenção imediata
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Ver Detalhes
                  </button>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-xl">
                      <DollarSign className="text-white" size={20} />
                    </div>
                    <h3 className="text-blue-700 dark:text-blue-300 font-bold text-lg">Orçamento</h3>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 flex-grow mb-4">
                    R$ 250.000 destinados para soluções este mês
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Gerenciar
                  </button>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-green-200 dark:border-green-800 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-xl">
                      <CircleCheckBig className="text-white" size={20} />
                    </div>
                    <h3 className="text-green-700 dark:text-green-300 font-bold text-lg">Meta</h3>
                  </div>
                  <p className="text-green-600 dark:text-green-400 flex-grow mb-4">
                    78% das reclamações resolvidas este mês
                  </p>
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Relatório
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}