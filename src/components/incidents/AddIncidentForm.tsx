import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';

interface Incident {
    id: string;
    patientId: string;
    title: string;
    description: string;
    comments: string;
    appointmentDate: string;
}

interface AddIncidentFormProps {
  onAdd: (incident: Omit<Incident, 'id'>) => void;
  onClose: () => void;
}

const AddIncidentForm: React.FC<AddIncidentFormProps> = ({ onAdd, onClose }) => {
  const { patients } = useData();
  const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) {
        alert('Please select a patient.');
        return;
    }
    onAdd({ patientId, title, description, comments, appointmentDate });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md">
            <option value="" disabled>Select a patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
       <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
        <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md">Add Incident</button>
      </div>
    </form>
  );
};

export default AddIncidentForm; 