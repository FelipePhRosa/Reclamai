// src/componentes/Layout.jsx
import { useState } from 'react';
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
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-75 ease-linear ${
          isSidebarOpen ? 'ml-60' : 'ml-16'
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
