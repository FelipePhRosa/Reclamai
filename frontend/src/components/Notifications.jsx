import { useState } from 'react';
import { Bell, Mail, MessageCircle, Smartphone, Shield, RefreshCw, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Notificacoes() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [communityMessages, setCommunityMessages] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [updateAlerts, setUpdateAlerts] = useState(true);

  return (
    <Layout>
      <div className="flex flex-col w-full max-w-md mx-auto px-6 py-8 space-y-6">


        <div className="flex items-center gap-4">
          <Link to="/settings">
            <Undo2 className="text-blue-500 h-8 w-8 hover:text-blue-300 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-bold dark:text-gray-200">Notificações</h1>
        </div>

        <div
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          onClick={() => setEmailAlerts(!emailAlerts)}
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <span>Alertas por E-mail</span>
          </div>
          <span>{emailAlerts ? 'Ativado' : 'Desativado'}</span>
        </div>

        <div
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          onClick={() => setCommunityMessages(!communityMessages)}
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5" />
            <span>Mensagens da Comunidade</span>
          </div>
          <span>{communityMessages ? '3 não lidas' : 'Sem mensagens'}</span>
        </div>

        <div
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          onClick={() => setMobileNotifications(!mobileNotifications)}
        >
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5" />
            <span>Notificações no Celular</span>
          </div>
          <span>{mobileNotifications ? 'Ativado' : 'Desativado'}</span>
        </div>

        <div
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          onClick={() => setSecurityAlerts(!securityAlerts)}
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <span>Alertas de Segurança</span>
          </div>
          <span>{securityAlerts ? 'Ativado' : 'Desativado'}</span>
        </div>
        <div
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
          onClick={() => setUpdateAlerts(!updateAlerts)}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5" />
            <span>Alertas de Atualizações</span>
          </div>
          <span>{updateAlerts ? 'Ativado' : 'Desativado'}</span>
        </div>

      </div>
    </Layout>
  );
}
