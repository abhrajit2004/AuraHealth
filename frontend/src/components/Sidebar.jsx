import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, UserCog, MapPin, Settings, LogOut, ScrollText, ShoppingBag, Hospital } from 'lucide-react';

const navItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    customStyles: ""
  },
  {
    path: "/dashboard/medical-shop",
    name: "Medical Shop",
    icon: ShoppingBag,
    customStyles: ""
  },
  {
    path: "/dashboard/health-record",
    name: "Health Record",
    icon: ScrollText,
    customStyles: ""
  },
  {
    path: "/dashboard/rooms",
    name: "Rooms",
    icon: Hospital,
    customStyles: ""
  },
  // {
  //   path: "/dashboard/appointments",
  //   name: "Appointments",
  //   icon: Calendar,
  //   customStyles: ""
  // },
  {
    path: "/dashboard/doctors",
    name: "Doctors",
    icon: UserCog,
    customStyles: ""
  },
  {
    path: "/dashboard/locator",
    name: "Nearby Facilities",
    icon: MapPin,
    customStyles: ""
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: Settings,
    customStyles: ""
  },
  {
    path: "/",
    name: "Logout",
    icon: LogOut,
    customStyles: "text-red-700 hover:bg-red-200 mt-4"
  }
];

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`fixed bg-blue-100 ${isOpen ? 'w-64' : 'w-20'} min-h-screen p-4 flex flex-col transition-all duration-300 shadow-md`}>
      <div className={`text-3xl font-bold mb-8 ${!isOpen && 'text-center'}`}>
        {isOpen ? 'AuraHealth' : 'AH'}
      </div>
      <nav className='font-semibold text-xl'>
      {navItems.map((item) => (
        item.name === "Logout" ? (
          <div
            key={item.path}
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
            className={`flex items-center p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded-md hover:shadow-md cursor-pointer ${item.customStyles}`}
          >
            <item.icon size={24} />
            {isOpen && <span className="ml-2">{item.name}</span>}
          </div>
        ) : (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded-md hover:shadow-md ${item.customStyles}`}
          >
            <item.icon size={24} />
            {isOpen && <span className="ml-2">{item.name}</span>}
          </NavLink>
        )
      ))}
      </nav>
    </div>
  );
};

export default Sidebar;