// src/componentes/Layout.jsx
import { useState } from 'react';
import Sidebar2 from './Sidebar2';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebar');
    return saved === null ? true : JSON.parse(saved);
  })

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      localStorage.setItem('sidebar', JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative dark:bg-linear-to-tr from-gray-900 to-neutral-950 from-65%">
      <div className="hidden md:flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all duration-75 ease-linear ${
          isSidebarOpen ? 'ml-0 lg:ml-60' : 'ml-16'
        }`}
      >
        <div className="md:p-0">{children}</div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-999 md:hidden">
        <Sidebar2 />
      </div>
    </div>
  );
}

export default Layout;
