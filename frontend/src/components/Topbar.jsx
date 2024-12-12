import React from 'react';

const Topbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="h-12 w-12 rounded-full"
          />
          <span>Jonitha Cathrine</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
