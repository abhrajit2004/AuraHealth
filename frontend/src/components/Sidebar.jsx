import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-blue-100 w-64 h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">AuraHealth</div>
      <nav>
        <NavLink
          to="/dashboard"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/patients"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Patients
        </NavLink>
        <NavLink
          to="/dashboard/appointments"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Appointments
        </NavLink>
        <NavLink
          to="/dashboard/doctors"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Doctors
        </NavLink>
        <NavLink
          to="/dashboard/messages"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Messages
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className="block p-2 mb-2 text-blue-700 hover:bg-blue-200 rounded"
        >
          Settings
        </NavLink>
        <NavLink
          to="/"
          className="block p-2 mt-4 text-red-700 hover:bg-red-200 rounded"
        >
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
