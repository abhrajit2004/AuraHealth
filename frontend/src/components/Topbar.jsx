import React from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const pathNameMap = {
    'dashboard': 'Dashboard',
    'locator': 'Find Nearby Facilities',
    'appointments': 'Appointment',
    'health-record': 'Health Record',
    'medicial-shop': 'Medical Shop',
    'patient-record': 'Patient Record',
  };

  const getPageTitle = (pathname) => {
    const pathParts = pathname.split('/').filter(Boolean);
    return pathParts.map(part => pathNameMap[part] || part.charAt(0).toUpperCase() + part.slice(1)).join(' -> ');
  }; // returing the title of the page after mapping the pathnames to the titles


  return (
    <div className={`fixed top-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-40 ${isSidebarOpen ? 'left-64' : 'left-20'} transition-all duration-300`}>
      <h1 className="text-3xl font-bold ml-2">{getPageTitle(location.pathname)}</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <img
            src={user.picture || "https://i.pravatar.cc/100"}
            alt="User Avatar"
            className="h-12 w-12 rounded-full"
          />
          <span className='font-medium'>{user.name} ( {JSON.parse(localStorage.getItem('userRole'))?.role} )</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
