import { UserPen, ClipboardList, PersonStanding, BellRing, Eclipse } from 'lucide-react';
import Layout from "./Layout";
import { useNavigate } from 'react-router-dom';


export default function Config() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/EditarPerfil');
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className="bg-white w-[450px] p-6 rounded-lg shadow">
          <div className="text-center">
            <h1 className="text-blue-500 font-bold text-2xl">Configurações</h1>
            <p className="text-gray-400 text-sm mt-1">
              Altere preferências da sua conta, personalize a experiência e mantenha seus dados atualizados.
            </p>
          </div>

          <div className='flex flex-col gap-5 py-5'>
            {/* Editar perfil */}
            <div className='transition-transform transform hover:scale-102 active:scale-95 duration-150'>
              <button onClick={handleProfile} className='flex items-center gap-1 text-left'>
                <span className='font-semibold text-blue-500 text-xl'>Editar perfil</span>
                <UserPen className="h-5 w-5" />
              </button>
              <p className='text-gray-400 text-sm'>
                Atualize seu nome, e-mail, telefone e outras informações pessoais.
              </p>
              <hr className="my-1 border-gray-300" />
            </div>

            {/* Histórico */}
            <div className='transition-transform transform hover:scale-102 active:scale-95 duration-150'>
              <button className='flex items-center gap-1 text-left'>
                <span className='font-semibold text-blue-500 text-xl'>Histórico</span>
                <ClipboardList className="h-5 w-5" />
              </button>
              <p className='text-gray-400 text-sm'>
                Visualize registros de atividades recentes e alterações feitas na sua conta.
              </p>
              <hr className="my-1 border-gray-300" />
            </div>

            {/* Acessibilidade */}
            <div className='transition-transform transform hover:scale-102 active:scale-95 duration-150'>
              <button className='flex items-center gap-1 text-left'>
                <span className='font-semibold text-blue-500 text-xl'>Acessibilidade</span>
                <PersonStanding className="h-5 w-5" />
              </button>
              <p className='text-gray-400 text-sm'>
                Ajuste opções para tornar a navegação mais acessível de acordo com suas necessidades.
              </p>
              <hr className="my-1 border-gray-300" />
            </div>

            {/* Notificações */}
            <div className='transition-transform transform hover:scale-102 active:scale-95 duration-150'>
              <button className='flex items-center gap-1 text-left'>
                <span className='font-semibold text-blue-500 text-xl'>Notificações</span>
                <BellRing className="h-5 w-5" />
              </button>
              <p className='text-gray-400 text-sm'>
                Defina como e quando deseja ser notificado sobre atualizações importantes.
              </p>
              <hr className="my-1 border-gray-300" />
            </div>

            {/* Ambiente */}
            <div className='transition-transform transform hover:scale-102 active:scale-95 duration-150'>
              <button className='flex items-center gap-1 text-left'>
                <span className='font-semibold text-blue-500 text-xl'>Ambiente</span>
                <Eclipse className="h-5 w-5" />
              </button>
              <p className='text-gray-400 text-sm'>
                Personalize o tema visual, idioma e outras preferências do sistema.
              </p>
              <hr className="my-1 border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
