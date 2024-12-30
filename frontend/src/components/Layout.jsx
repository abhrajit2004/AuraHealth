import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'pl-64' : 'pl-20'} transition-all duration-300`}>
        <Topbar isSidebarOpen={isSidebarOpen} />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed left-[242px] top-6 z-40 bg-blue-100 p-1 rounded-full hover:bg-blue-200 transition-all duration-300 shadow-md ${isSidebarOpen ? 'left-[242px]' : 'left-[62px]'}`}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
        <div className="p-4 mt-16">{children}</div>
      </div>
    </div>
  );
};

export default Layout;