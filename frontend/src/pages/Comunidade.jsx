// src/pages/Comunidade.jsx
import Layout from "../components/Layout";
import {
  Star,
  MapPin,
  CircleCheckBig,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Download,
  FileText,
} from "lucide-react";

import antesImg from "../assets/buraco.jpeg";
import depoisImg from "../assets/concertada.jpeg";

const problemas = [
  {
    destaque: true,
    titulo: "Iluminação da Rua das Flores Totalmente Restaurada",
    descricao: "Após 3 semanas, todos os postes de luz foram reparados e a via está 100% iluminada.",
    reportado: "14/08/2025",
    tempoResolucao: "26 dias",
    resolvido: "09/09/2025",
    local: "Centro",
    secretaria: "Secretaria da Infraestrutura",
    satisfacao: "4.8/5",
    metodologia: "Substituição completa dos postes e instalação de LED",
    empresa: "Iluminarte Ltda",
    custo: "R$ 75.000",
    especificacoes: "Iluminação de 300 lux, eficiência energética A+",
    antes: antesImg,
    depois: depoisImg,
    estatisticas: { views: 234, likes: 89, comentarios: 12 },
  },
  {
    destaque: false,
    titulo: "Buraco na Avenida Central Finalmente Reparado",
    descricao: "O buraco que causava transtornos há meses foi preenchido e a via recuperada.",
    reportado: "19/07/2025",
    tempoResolucao: "50 dias",
    resolvido: "07/09/2025",
    local: "Centro",
    secretaria: "Secretaria de Obras",
    satisfacao: "4.2/5",
    metodologia: "Recuperação asfáltica com massa asfáltica usinada",
    empresa: "Construtora Veti S.A",
    custo: "R$ 18.500",
    especificacoes: "Compactação 95%, tipo Proctor Normal",
    estatisticas: { views: 156, likes: 65, comentarios: 10 },
  },
  {
    destaque: false,
    titulo: "Nova Rede de Esgoto Instalada na Vila Esperança",
    descricao: "Sistema de esgotamento sanitário beneficia 200 famílias do bairro.",
    reportado: "04/09/2024",
    tempoResolucao: "67 dias",
    resolvido: "06/09/2024",
    local: "Vila Esperança",
    secretaria: "SANEPAR",
    satisfacao: "4.9/5",
    metodologia: "Instalação de rede coletora e estação elevatória",
    empresa: "Saneamento Sul Ltda",
    custo: "R$ 25.000",
    especificacoes: "Capacidade 50L, tratamento secundário",
    estatisticas: { views: 445, likes: 127, comentarios: 23 },
  },
  {
    destaque: false,
    titulo: "Posto de Saúde da Zona Norte Reformado",
    descricao: "Unidade recebeu nova pintura, equipamentos e ampliação do atendimento.",
    reportado: "14/05/2024",
    tempoResolucao: "107 dias",
    resolvido: "29/09/2024",
    local: "Zona Norte",
    secretaria: "Secretaria de Saúde",
    satisfacao: "4.6/5",
    metodologia: "Reforma estrutural e aquisição de equipamentos médicos",
    empresa: "Construmed S.A",
    custo: "R$ 18.100",
    especificacoes: "Adequação às normas ANVISA, acessibilidade total",
    estatisticas: { views: 298, likes: 70, comentarios: 15 },
  },
];

export default function Comunidade() {
  return (
    <Layout>
      {/* Cabeçalho */}
      <div className="flex flex-col text-center py-4 px-2 sm:px-4 md:px-8 ">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl dark:text-white">
          Problemas Resolvidos
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-lg md:text-xl mt-1">
          Acompanhe as soluções implementadas em sua cidade
        </p>
      </div>

      {/* Estatísticas gerais */}
      <div className="flex gap-4 sm:gap-6 md:gap-10 flex-wrap justify-center py-3">
        {[
          { value: "5", label: "Problemas resolvidos", color: "text-green-400" },
          { value: "79 Dias", label: "Tempo Médio", color: "text-blue-500" },
          { value: "4", label: "Alto impacto", color: "text-purple-500" },
          { value: "4.6", label: "Satisfação", color: "text-amber-400" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center  border-2 border-gray-200 w-36 sm:w-40 md:w-44 h-28 sm:h-32 p-3 rounded-2xl dark:border-gray-700 bg-white dark:bg-gray-600 shadow-lg  hover:shadow-xl transition-all duration-300 hover:-translate-y-1 "
          >
            <h2 className={`font-bold text-xl sm:text-2xl md:text-3xl ${stat.color}`}>
              {stat.value}
            </h2>
            <p className="text-gray-400 text-center text-xs sm:text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Lista de problemas */}
      <div className="flex flex-col gap-6 py-3 px-2 sm:px-4 md:px-8">
        {problemas.map((p, idx) => (
          <div
            key={idx}
            className={`border-2  rounded-lg p-4 dark:border-gray-600 ${
              p.destaque ? "border-gray-300 dark:bg-gray-800 shadow-lg shadow-green-300 hover:-translate-y-1 transition-all duration-300" : "border-gray-200 dark:bg-gray-700 shadow-lg hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
            }`}
          >
            {/* Banner de destaque no topo do card (apenas se for destaque) */}
            {p.destaque && (
              <div className="flex items-center gap-2 bg-green-500  text-white px-4 py-2 rounded-xl mb-3 w-max hover:bg-green-400 shadow-lg ">
                <Star className="text-white" />
                <p className="font-semibold text-sm sm:text-base md:text-lg">
                  Destaque da Comunidade
                </p>
              </div>
            )}

            {/* Cabeçalho do problema */}
            <div className="flex justify-between flex-wrap gap-2">
              <h2 className="font-semibold text-base sm:text-lg md:text-xl dark:text-white">{p.titulo}</h2>
              <div className="flex gap-2 flex-wrap">
                <button
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-sm dark:text-white border-2 border-gray-300  dark:border-gray-400 shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer hover:shadow-xl ${
                    p.destaque ? "bg-black text-white" : "border-2 dark:border-gray-400"
                  }`}
                >
                  {p.destaque ? "Impacto" : "Solução"}
                </button>
                <button className="border-2 border-gray-300  shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer hover:shadow-xl  px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-sm dark:text-white dark:border-gray-400">
                  {p.destaque ? "Iluminação" : "Infraestrutura"}
                </button>
              </div>
            </div>

            {/* Descrição */}
            <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm sm:text-base md:text-lg">{p.descricao}</p>

            {/* Datas e tempo */}
            <div className="flex justify-center gap-2 sm:gap-4 flex-wrap py-2">
              {[
                { label: "Reportado", value: p.reportado, color: "text-red-600" },
                { label: "Tempo de Resolução", value: p.tempoResolucao, color: "text-blue-500" },
                { label: "Resolvido", value: p.resolvido, color: "text-green-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center border-2 border-gray-200 w-32 sm:w-40 md:w-44 p-2 rounded-xl dark:border-gray-600 shadow-lg hover:shadow-xl "
                >
                  <h2 className={`font-bold ${item.color} text-sm sm:text-lg md:text-xl`}>{item.value}</h2>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Local, secretaria e satisfação */}
            <div className="flex gap-2 sm:gap-4 flex-wrap py-2 text-gray-500 dark:text-gray-300 text-xs sm:text-sm md:text-base">
              <div className="flex gap-1 items-center"><MapPin /><p>{p.local}</p></div>
              <div className="flex gap-1 items-center"><CircleCheckBig /><p>{p.secretaria}</p></div>
              <div className="flex gap-1 items-center"><Star /><p>{p.satisfacao}</p></div>
            </div>

            {/* Apenas para o destaque: detalhes e fotos */}
            {p.destaque && (
              <div className="shadow-lg border border-gray-300 rounded p-2 mt-4">
                <div className="flex gap-2 items-center mb-2">
                  <FileText className="text-gray-400" />
                  <h2 className="text-gray-400 font-bold text-sm sm:text-base md:text-lg">Detalhes da solução</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <h2 className="font-bold text-gray-400 text-sm sm:text-base md:text-lg">Metodologia:</h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">{p.metodologia}</p>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-400 text-sm sm:text-base md:text-lg">Empresa:</h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">{p.empresa}</p>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-400 text-sm sm:text-base md:text-lg">Custo Total:</h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">{p.custo}</p>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-400 text-sm sm:text-base md:text-lg">Especificações:</h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">{p.especificacoes}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 h-1 bg-gray-300 mt-2 " />
                </div>

                <div className="flex pt-2 gap-2 items-center text-xs sm:text-sm md:text-base">
                  <FileText className="text-gray-400" />
                  <p className="text-gray-600  hover:cursor-pointer hover:text-blue-400 hover:font-semibold">Baixe o relatório completo para todos os detalhes técnicos, materiais utilizados e planos de manutenção.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <h2 className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg">Antes</h2>
                    <img src={p.antes} alt="Antes" className="w-full h-auto sm:h-60 object-cover rounded" />
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg">Depois</h2>
                    <img src={p.depois} alt="Depois" className="w-full h-auto sm:h-60 object-cover rounded" />
                  </div>
                </div>
              </div>
            )}

            {/* Estatísticas e ações finais */}
            <div className="border-t border-gray-300 dark:border-gray-600 mt-2 pt-2 flex flex-wrap justify-between items-center text-xs sm:text-sm md:text-base gap-2 ">
              {/* Estatísticas no começo */}
              <div className="flex gap-2 flex-wrap">
                <div className="flex gap-1 items-center text-gray-500  dark:text-white"><Eye /> <p>{p.estatisticas.views}</p></div>
                <div className="flex gap-1 items-center text-gray-500 dark:text-white"><ThumbsUp /> <p>{p.estatisticas.likes}</p></div>
                <div className="flex gap-1 items-center text-gray-500 dark:text-white "><MessageCircle /> <p>{p.estatisticas.comentarios}</p></div>
              </div>

              {/* Ações no final */}
              <div className="flex gap-2 flex-wrap">
                <button className="flex gap-1 items-center px-2 sm:px-3 py-1 border-2 border-gray-200 rounded dark:border-gray-400 dark:text-white shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer hover:shadow-xl">
                  <Download /> Relatório Detalhado
                </button>
                <button className="flex gap-1 items-center px-2 sm:px-3 py-1 border-2 border-gray-200 rounded dark:border-gray-400 dark:text-white shadow-lg hover:-translate-y-1 transition-all duration-300 hover:cursor-pointer hover:shadow-xl">
                  <Share2 /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
