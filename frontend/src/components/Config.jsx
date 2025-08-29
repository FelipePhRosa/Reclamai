import React, { useState, useEffect, useContext } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Clock, 
  HelpCircle, 
  Info,
  CreditCard,
  Mail,
  Eye,
  EyeOff,
  Plus,
  MoreHorizontal,
  Check,
  Sun,
  Moon,
  Camera
} from 'lucide-react';
import Layout from './Layout'
import { AuthContext } from '../context/AuthContext';
import History from './History'
import About from './About'

const SettingsInterface = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const { user } = useContext(AuthContext);
  const primeiroNome = user?.nameUser ? user.nameUser.split(" ")[0] : "Usuário";
  const segundoNome = user?.fullName || 'John Wick';
  const EmailUser = user?.email || "E-mail";
  const TelefoneUser = user?.telefone || "Número de Celular";

  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const tabs = [
    { id: 'account', label: 'Minha Conta', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'billing', label: 'Cobrança', icon: CreditCard },
    { id: 'history', label: 'Histórico', icon: Clock },
    { id: 'help', label: 'Ajuda e Suporte', icon: HelpCircle },
    { id: 'about', label: 'Sobre', icon: Info }
  ];

  const recentProjects = [
    'Redação de Conteúdo',
    'Desenvolvimento de App',
    'Mídias Sociais'
  ];

  const billingHistory = [
    {
      id: 'LMS8040557SCN',
      type: 'Venda da Conta',
      date: '14 Abr, 2024',
      amount: '$3.050',
      status: 'Pendente',
      address: '319 Main Road, Sunderland'
    },
    {
      id: 'AZ9364403SUS',
      type: 'Venda da Conta',
      date: '24 Jun, 2008',
      amount: '$1.050',
      status: 'Cancelado',
      address: '56 Orange Road, Peterborough'
    },
    {
      id: '3S331605G4US',
      type: 'Assinatura Netflix',
      date: '28 Fev, 2024',
      amount: '$800',
      status: 'Reembolso',
      address: '2 New Street, Harrogate'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return 'text-yellow-600 bg-yellow-50';
      case 'Cancelado': return 'text-red-600 bg-red-50';
      case 'Reembolso': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xl dark:border-gray-400 dark:bg-linear-to-tr from-gray-900 to-neutral-500 from-84%">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Informações Pessoais</h3>
              <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-32">
                <img
                  src={user?.avatar_url || "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border border-gray-400 bg-gray-100"
                />
                <div className='absolute bottom-0 left-40'>
                  <h1 className='font-medium text-gray-600 dark:text-gray-300'>Nome:</h1>
                  <p className='font-semibold text-2xl dark:text-white'>{segundoNome}</p>
                  <h2 className='font-medium mt-5 dark:text-gray-300'>Usuário:</h2>
                  <p className='font-semibold text-2xl mt-1 dark:text-white'>@{primeiroNome}</p>
                </div>
                <div className="absolute bottom-0 left-23 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-100">
                  <Camera size={20} className="text-gray-600" />
                </div>
              </div>
              <div className='flex flex-col justify-center'>
                  <h1 className='text-xl font-semibold dark:text-white'>Status:</h1>
                  <span className='font-semibold text-red-500 text-3xl'>Não Verificado!</span>
                  <p className='font-semibold text-gray-500 dark:text-gray-300 text-lg w-75 mt-1'>Você precisa confirmar seu email para ser verificado.</p>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email:</label>
                  <p className='dark:text-gray-200 font-semibold border p-2 px-4 border-gray-700 w-90 rounded-xl'>{EmailUser}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Senha:</label>
                  <div className="relative">
                    <p className='dark:text-gray-200 font-semibold border p-2 px-4 border-gray-700 w-90 rounded-xl'>************</p>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Telefone:</label>
                  <p className='dark:text-gray-200 font-semibold border p-2 px-4 border-gray-700 w-90 rounded-xl'>{TelefoneUser}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Data de Nascimento:</label>
                  <p className='dark:text-gray-200 font-semibold border p-2 px-4 border-gray-700 w-90 rounded-xl'>21/11/2003</p>
                </div>
              </div>
              <button className="mt-8 font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Preferências de Notificação</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium capitalize">Notificações por {key === 'push' ? 'Push' : key === 'sms' ? 'SMS' : 'Email'}</h4>
                      <p className="text-sm text-gray-600">
                        Receber notificações via {key === 'push' ? 'push' : key === 'sms' ? 'SMS' : 'email'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6 ">
            <div className="bg-white rounded-lg border border-gray-500 p-6 dark:bg-gray-900 dark:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Configurações de Aparência</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 dark:text-white">Tema</h4>
                  <div className="flex gap-3">
                    <button className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-lg w-1/2 justify-center border transition-colors duration-150 cursor-pointer ${
                      !darkMode
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-100 border-gray-100 dark:border-gray-300 shadow-xl'
                      }`} onClick={() => setDarkMode(false)}>
                        <Sun className="w-5 h-5" />
                      Claro
                    </button>
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-lg w-1/2 justify-center border transition-colors duration-150 cursor-pointer ${
                        darkMode
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <Moon className="w-5 h-5" />
                      Escuro
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:text-white">
                      Automático
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 dark:text-white">Tamanho da Fonte</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-0.5 dark:text-white">
                    <option className='dark:bg-gray-900'>Pequeno</option>
                    <option className='dark:bg-gray-900' selected>Médio</option>
                    <option className='dark:bg-gray-900'>Grande</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Método de Pagamento</h3>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Plus size={16} />
                  Adicionar cartão
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-medium">Mayad Ahmed</p>
                    <p className="text-sm text-gray-600">**** **** **** 2538</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Expira</p>
                    <p className="font-medium">02/2028</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
                    <span className="text-sm">Mastercard</span>
                  </div>
                  <button>
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Email de Contato</h4>
                <div className="flex items-center gap-2">
                  <input type="radio" checked readOnly />
                  <label className="text-sm">Enviar para o email existente</label>
                </div>
                <p className="text-sm text-gray-600 ml-5">mayad.ahmed@ofspace.co</p>
                <button className="text-blue-600 text-sm mt-1 ml-5">Adicionar outro endereço de email</button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Histórico de Cobrança</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Fatura</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Endereço</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-blue-600">{item.id}</p>
                            <p className="text-sm text-gray-600">{item.type}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                        <td className="py-3 px-4 font-medium">{item.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.address}</td>
                        <td className="py-3 px-4">
                          <button>
                            <MoreHorizontal size={16} className="text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

        case 'history':
          return(
            <History/>
          )
        
        case 'about':
          return(
            <About/>
          )
      default:
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Em Desenvolvimento</h3>
            <p className="text-gray-600">Esta seção está sendo desenvolvida.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-linear-to-tr from-gray-900 to-neutral-950 from-65%">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Configurações</h1>
              <p className="text-gray-600 dark:text-gray-300">Gerencie suas configurações de conta e preferências.</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-500 cursor-pointer'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsInterface;