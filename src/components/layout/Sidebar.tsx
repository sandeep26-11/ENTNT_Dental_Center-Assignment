// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-full p-4 border-r border-gray-200 flex flex-col justify-between">
      <div>
        {user?.role === 'Admin' ? (
          <>
            <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
            <nav className="flex flex-col gap-4">
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/admin/calendar" className="text-gray-700 hover:text-blue-600">Calendar</Link>
              <Link to="/admin/appointments" className="text-gray-700 hover:text-blue-600">Appointments</Link>
              <Link to="/admin/patients" className="text-gray-700 hover:text-blue-600">Patients</Link>
            </nav>
          </>
        ) : (
          <h2 className="text-xl font-bold mb-4">Patient Menu</h2>
        )}
      </div>
      <button onClick={handleLogout} className="mt-8 text-red-600 hover:underline">Logout</button>
    </div>
  );
};

export default Sidebar; 