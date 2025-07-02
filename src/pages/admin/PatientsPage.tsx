import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useData } from '../../contexts/DataContext';
import Modal from '../../components/common/Modal';
import AddPatientForm from '../../components/patients/AddPatientForm';
import EditPatientForm from '../../components/patients/EditPatientForm';

// Assuming Patient type is defined in DataContext, otherwise define it here
interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

const PatientsPage = () => {
  const { patients, addPatient, deletePatient, editPatient } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Patient
        </button>
      </div>
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Patient"
      >
        <AddPatientForm 
          onAdd={addPatient}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {selectedPatient && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Patient"
        >
          <EditPatientForm
            patient={selectedPatient}
            onEdit={editPatient}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}

      <div className="p-4 bg-white rounded-md shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Date of Birth</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{patient.name}</td>
                <td className="p-4">{patient.dob}</td>
                <td className="p-4">{patient.contact}</td>
                <td className="p-4">
                  <button onClick={() => handleEditClick(patient)} className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(patient.id)}
                    className="ml-4 text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default PatientsPage; 