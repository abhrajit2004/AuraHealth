import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {

    const userRole = JSON.parse(localStorage.getItem('userRole'))?.role;

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" replace />;
      }

  return children;
}

export default PrivateRoute;