import React, { useState, useEffect } from 'react';

// Assuming Incident type is defined elsewhere and imported
interface Incident {
    id: string;
    patientId: string;
    title: string;
    description: string;
    comments: string;
    appointmentDate: string;
    cost?: number;
    status?: 'Completed' | 'Pending';
    files?: { name: string; url: string }[];
}

interface UpdateIncidentFormProps {
  incident: Incident;
  onUpdate: (incident: Incident) => void;
}

const UpdateIncidentForm: React.FC<UpdateIncidentFormProps> = ({ incident, onUpdate }) => {
  const [cost, setCost] = useState<number | undefined>(incident.cost);
  const [status, setStatus] = useState<'Completed' | 'Pending' | undefined>(incident.status);
  const [files, setFiles] = useState<{ name: string; url: string }[]>(incident.files || []);
  const [appointmentDate, setAppointmentDate] = useState<string>(incident.appointmentDate);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        // In a real app, you'd upload this and get a URL. For now, we'll use a placeholder.
        // Or convert to base64: const reader = new FileReader(); reader.readAsDataURL(file); ...
        url: URL.createObjectURL(file), 
      }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...incident, cost, status, files, appointmentDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
        <input type="number" value={cost || ''} onChange={(e) => setCost(Number(e.target.value))} className="w-full px-3 py-2 mt-1 border rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select value={status || 'Pending'} onChange={(e) => setStatus(e.target.value as 'Completed' | 'Pending')} className="w-full px-3 py-2 mt-1 border rounded-md">
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
        <input
          type="datetime-local"
          value={appointmentDate ? appointmentDate.slice(0, 16) : ''}
          onChange={e => setAppointmentDate(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Files</label>
        <input type="file" multiple onChange={handleFileChange} className="w-full px-3 py-2 mt-1" />
        <ul className="mt-2 space-y-1">
            {files.map((file, index) => <li key={index}><a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{file.name}</a></li>)}
        </ul>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md">Update Incident</button>
      </div>
    </form>
  );
};

export default UpdateIncidentForm; 