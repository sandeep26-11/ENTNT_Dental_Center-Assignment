import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import PatientsPage from './pages/admin/PatientsPage';
import AppointmentsPage from './pages/admin/AppointmentsPage';
import IncidentDetailPage from './pages/admin/IncidentDetailPage';
import CalendarPage from './pages/admin/CalendarPage';
import PatientHistoryPage from './pages/patient/PatientHistoryPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import './App.css';
import IncidentsPage from './pages/admin/IncidentsPage';

function App() {
  const { user, isLoading } = useAuth();

  // Simple component to handle root redirection logic
  const RootRedirect = () => {
    if (isLoading) {
      return <div>Loading...</div>; // Or a spinner
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to={user.role === 'Admin' ? '/admin/dashboard' : '/patient/dashboard'} replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/patients" 
        element={<ProtectedRoute allowedRoles={['Admin']}><PatientsPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/appointments" 
        element={<ProtectedRoute allowedRoles={['Admin']}><AppointmentsPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/incidents/:id" 
        element={<ProtectedRoute allowedRoles={['Admin']}><IncidentDetailPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/calendar" 
        element={<ProtectedRoute allowedRoles={['Admin']}><CalendarPage /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/incidents" 
        element={<ProtectedRoute allowedRoles={['Admin']}><IncidentsPage /></ProtectedRoute>} 
      />
      
      {/* Patient Routes */}
      <Route 
        path="/patient/dashboard" 
        element={<ProtectedRoute allowedRoles={['Patient']}><PatientDashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/patient/history" 
        element={<ProtectedRoute allowedRoles={['Patient']}><PatientHistoryPage /></ProtectedRoute>} 
      />

      {/* Common Routes */}
      <Route 
        path="/profile" 
        element={<ProtectedRoute allowedRoles={['Admin', 'Patient']}><ProfilePage /></ProtectedRoute>} 
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
