import { useEffect, useState } from 'react';
import { Sun, Moon, Layout as LayoutIcon, Palette, Star, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import Layout from './Layout';

export default function Preferencias() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Layout>
      <div className="flex flex-col w-full max-w-md mx-auto px-6 py-8 space-y-6">
   
        <div className="flex items-center  gap-4">
          <Link to="/settings">
            <Undo2 className="text-blue-500 h-8 w-8 hover:text-blue-300 cursor-pointer" />
          </Link>
          <h1 className="text-3xl font-bold dark:text-gray-200">Preferências</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Tema</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg w-1/2 justify-center border transition-colors duration-150 cursor-pointer ${
                !darkMode
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              <Sun className="w-5 h-5" />
              Claro
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg w-1/2 justify-center border transition-colors duration-150 cursor-pointer ${
                darkMode
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}
            >
              <Moon className="w-5 h-5" />
              Escuro
            </button>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5" />
            <span>Tamanho da Fonte</span>
          </div>
          <span>Médio</span>
        </div>

     
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
          <div className="flex items-center gap-3">
            <LayoutIcon className="w-5 h-5" />
            <span>Layout</span>
          </div>
          <span>Padrão</span>
        </div>

     
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5" />
            <span>Paleta de cores</span>
          </div>
          <span>Azul</span>
        </div>

      
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5" />
            <span>Efeitos</span>
          </div>
          <span>Ativados</span>
        </div>

    
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5" />
            <span>Atualizações</span>
          </div>
          <span>Automáticas</span>
        </div>
      </div>
    </Layout>
  );
}
