import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useData } from '../../contexts/DataContext';
import Modal from '../../components/common/Modal';
import AddIncidentForm from '../../components/incidents/AddIncidentForm';

const AppointmentsPage = () => {
  const { incidents, getPatientName, addIncident } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Incident
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Incident"
      >
        <AddIncidentForm
          onAdd={addIncident}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <div className="p-4 bg-white rounded-md shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Patient</th>
              <th className="p-4">Title</th>
              <th className="p-4">Appointment Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{getPatientName(incident.patientId)}</td>
                <td className="p-4">{incident.title}</td>
                <td className="p-4">{new Date(incident.appointmentDate).toLocaleString()}</td>
                <td className="p-4">{incident.status}</td>
                <td className="p-4">
                  <Link to={`/admin/incidents/${incident.id}`} className="text-sm text-blue-600 hover:underline">
                    View/Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage; 