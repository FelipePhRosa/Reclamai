// src/componentes/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-75 ease-linear ${
          isSidebarOpen ? 'ml-60' : 'ml-16'
        }`}
      >
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
