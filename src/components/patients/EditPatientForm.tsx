import React, { useState, useEffect } from 'react';

interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

interface EditPatientFormProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onClose: () => void;
}

const EditPatientForm: React.FC<EditPatientFormProps> = ({ patient, onEdit, onClose }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [healthInfo, setHealthInfo] = useState('');

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setDob(patient.dob);
      setContact(patient.contact);
      setHealthInfo(patient.healthInfo);
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({ ...patient, name, dob, contact, healthInfo });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Info</label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Health Info</label>
        <textarea value={healthInfo} onChange={(e) => setHealthInfo(e.target.value)} required className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Cancel</button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md">Save Changes</button>
      </div>
    </form>
  );
};

export default EditPatientForm; 