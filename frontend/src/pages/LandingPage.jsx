import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to  AuraHealth</h1>
      <Link to="/dashboard" className="text-blue-500 underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default LandingPage;
