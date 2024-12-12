import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Activity Overview</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">100 Appointments</div>
        <div className="p-4 bg-green-100 rounded shadow">50 New Patients</div>
        <div className="p-4 bg-yellow-100 rounded shadow">500 Medicines Sold</div>
        <div className="p-4 bg-purple-100 rounded shadow">100 Lab Tests</div>
      </div>
    </div>
  );
};

export default Dashboard;
