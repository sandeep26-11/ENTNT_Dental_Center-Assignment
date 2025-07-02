import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { useData, type Incident } from '../contexts/DataContext';
import EditPatientForm from '../components/patients/EditPatientForm';
import Modal from '../components/common/Modal';
import { useState } from 'react';

const PatientDashboardPage = () => {
  const { user } = useAuth();
  const { getIncidentsByPatient, patients, editPatient } = useData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const patientIncidents = user?.patientId ? getIncidentsByPatient(user.patientId) : [];
  const upcomingAppointments = patientIncidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 5); // Show next 5

  // Get patient details
  const patientDetails = user?.role === 'Patient' && user.patientId 
    ? patients.find(p => p.id === user.patientId) 
    : null;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      {/* Patient Details Section */}
      {patientDetails && (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">My Details</h2>
          <p><strong>Name:</strong> {patientDetails.name}</p>
          <p><strong>Date of Birth:</strong> {patientDetails.dob}</p>
          <p><strong>Contact:</strong> {patientDetails.contact}</p>
          <p><strong>Health Info:</strong> {patientDetails.healthInfo}</p>
          <button
            className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit My Info
          </button>
        </div>
      )}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit My Information"
      >
        {patientDetails && (
          <EditPatientForm
            patient={patientDetails}
            onEdit={(updatedPatient) => {
              editPatient(updatedPatient);
              setIsEditModalOpen(false);
            }}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Upcoming Appointments</h2>
        <ul className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appt: Incident) => (
              <li key={appt.id} className="py-3">
                <p className="font-semibold">{appt.title}</p>
                <p className="text-sm text-gray-600">{new Date(appt.appointmentDate).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>You have no upcoming appointments.</p>
          )}
        </ul>
      </div>
    </MainLayout>
  );
};

export default PatientDashboardPage; 