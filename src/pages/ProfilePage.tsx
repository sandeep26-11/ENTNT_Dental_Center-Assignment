import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../contexts/DataContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { patients } = useData();

  const patientDetails = user?.role === 'Patient' && user.patientId 
    ? patients.find(p => p.id === user.patientId) 
    : null;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Account Information</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
          {patientDetails && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mt-6">Personal Information</h2>
              <p><strong>Name:</strong> {patientDetails.name}</p>
              <p><strong>Date of Birth:</strong> {patientDetails.dob}</p>
              <p><strong>Contact:</strong> {patientDetails.contact}</p>
              <p><strong>Health Info:</strong> {patientDetails.healthInfo}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage; 