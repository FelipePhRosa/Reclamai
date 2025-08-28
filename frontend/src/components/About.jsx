import React, { useState } from 'react';
import { 
  MapPin, 
  Shield, 
  Users, 
  Eye, 
  Mail, 
  Github, 
  ChevronDown, 
  ChevronRight,
  Heart,
  Star,
  Info,
  Lock,
  Phone,
  ExternalLink,
  TableOfContents,
  Infinity
} from 'lucide-react';

const AboutPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const ExpandableSection = ({ id, title, icon: Icon, children }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-400">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-900"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-blue-600 dark:text-white" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="p-4 pt-0 bg-gray-50">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 dark:bg-blue-400 dark:shadow-2xl dark:shadow-blue-600 dark:border dark:border-blue-300">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-200">
            Reclamaí
          </h1>
          <p className="text-2lg text-gray-600 max-w-2xl mx-auto dark:text-white font-semibold">
            Plataforma desenvolvida para reportar e acompanhar problemas urbanos, 
            conectando cidadãos e comunidades para construir cidades melhores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8  ">
          <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-500 dark:text-white" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Nossa Missão</h2>
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-gray-100 font-medium">
              Dar voz á cidadãos que necessitam de melhora em suas comunidades através de uma plataforma 
              colaborativa que facilita o reporte, acompanhamento e resolução de problemas urbanos.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-500 dark:text-white" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Nossa Visão</h2>
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-gray-100">
              Criar cidades mais seguras, organizadas e eficientes através da participação 
              ativa dos cidadãos e transparência na gestão pública.
            </p>
          </div>
        </div>

        
        <div className="space-y-4 mb-8 transition-all duration-100">
          <ExpandableSection id="como-funciona" title="Como Funciona" icon={Info}>
            <div className="space-y-4">
              <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mt-2">
                  <span className="text-gray-700 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Reporte Problemas</h4>
                  <p className="text-gray-600 text-sm">
                    Identifique um problema na sua comunidade e faça o reporte através do mapa interativo, 
                    adicionando fotos e descrições detalhadas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Visualização Comunitária</h4>
                  <p className="text-gray-600 text-sm">
                    A comunidade e autoridades podem visualizar todos os problemas reportados em tempo real 
                    através do mapa interativo.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center ">
                  <span className="text-gray-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Acompanhamento</h4>
                  <p className="text-gray-600 text-sm">
                    Sistema de status permite acompanhar o progresso da resolução, 
                    mantendo todos informados sobre as ações tomadas.
                  </p>
                </div>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection id="categorias" title="Categorias de Problemas" icon={MapPin}>
            <div className="grid md:grid-cols-2 gap-4 py-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-gray-800">Segurança Pública</span>
                </div>
                <p className="text-sm text-gray-600 ml-6 mb-3">
                  Assaltos, vandalismo, iluminação deficiente, áreas de risco
                </p>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-800">Trânsito e Mobilidade</span>
                </div>
                <p className="text-sm text-gray-600 ml-6 mb-3">
                  Acidentes, buracos, semáforos quebrados, falta de sinalização
                </p>

                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-800">Infraestrutura</span>
                </div>
                <p className="text-sm text-gray-600 ml-6 mb-3">
                  Falta de água, energia, problemas de esgoto, calçadas danificadas
                </p>
              </div>

              <div className="space-y-1 py-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="font-medium text-gray-800">Saúde Pública</span>
                </div>
                <p className="text-sm text-gray-600 ml-6 mb-3">
                  Falta de medicamentos, problemas sanitários, pragas urbanas
                </p>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-gray-800">Meio Ambiente</span>
                </div>
                <p className="text-sm text-gray-600 ml-6 mb-3">
                  Poluição, áreas degradadas, descarte irregular de lixo
                </p>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-gray-800">Serviços Públicos</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Falta de transporte, problemas em escolas, unidades de saúde
                </p>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection id="privacidade" title="Privacidade e Segurança" icon={Lock}>
            <div className="space-y-4">
                 <div className="grid md:grid-cols-1 py-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-gray-800">Proteção de Dados</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6 mb-3">
                        Seus dados pessoais são protegidos com criptografia de ponta a ponta. 
                        Coletamos apenas as informações necessárias para o funcionamento da plataforma.
                        </p>

                        <div className="flex items-center gap-2">
                        <TableOfContents className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">Moderação de Conteúdo</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6 mb-3">
                        Todos os reportes passam por verificação para garantir veracidade e adequação. 
                        Conteúdo ofensivo ou falso é removido automaticamente.
                        </p>

                        <div className="flex items-center gap-2">
                        <Infinity className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-800">Uso Responsável</span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">
                            Incentivamos o uso responsável da plataforma para reportes legítimos. 
                            Spam ou uso malicioso pode resultar na suspensão da conta.
                        </p>
                    </div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">Informações Técnicas</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className='dark:text-white dark:font-semibold'>Versão:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">v1.2.5</span>
              </div>
              <div className="flex justify-between">
                <span className='dark:text-white dark:font-semibold'>Última Atualização:</span>
                <span className='dark:text-white dark:font-semibold'>27/08/2025</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2 dark:text-white dark:font-semibold">Últimas Melhorias</h3>
              <ul className="text-sm text-gray-600 space-y-1 dark:text-white">
                <li>• Melhoria na velocidade de carregamento do mapa</li>
                <li>• Implementado o DarkMode</li>
                <li>• Novos Marker's de sinalização no mapa</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800 dark:shadow-2xl ">
            <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">Contato e Suporte</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 dark:text-white" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Suporte Técnico</p>
                  <a href="mailto:suporte@reclamai.com.br" className="text-blue-600 text-sm hover:underline">
                    suporte@reclamai.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Atendimento</p>
                  <span className="text-gray-600 text-sm dark:text-gray-400">(53) 98148-3621</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-gray-700 dark:text-white" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Código Aberto</p>
                  <a href="https://github.com/felipephrosa/reclamai" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                    GitHub Repository
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 dark:bg-gray-800  dark:shadow-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">Créditos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 dark:text-gray-200">Equipe de Desenvolvimento</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className='font-semibold dark:text-white'>• Felipe Rosa <span className='font-normal'> - Desenvolvedor Full Stack</span></li>
                <li className='font-semibold dark:text-white'>• Lennon Costa - <span className='font-normal'>Desenvolvedor Front-End</span></li>
                <li className='font-semibold dark:text-white'>• João Vitor Martins - <span className='font-normal'>Desenvolvedor Front-End</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 dark:text-white">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {['ReactJS', 'TailwindCSS', 'TypeScript', 'Knex', 'MySQL', 'FireBase'].map((tech) => (
                  <span key={tech} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="text-center space-y-4">
          <p className="text-gray-500 text-sm mb-3 dark:text-white font-bold text-shadow-2xl">
            © 2025 Reclamaí.
          </p>
          <p className='text-gray-500 font-semibold mb-15 dark:text-white dark:text-shadow-2xl'>Desenvolvido para melhorar sua qualidade de vida.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;