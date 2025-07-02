import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const IncidentsPage = () => {
  const { incidents, getPatientName } = useData();

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Incidents</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-4 border">Title</th>
            <th className="p-4 border">Patient</th>
            <th className="p-4 border">Date</th>
            <th className="p-4 border">Status</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.length > 0 ? incidents.map((incident) => (
            <tr key={incident.id}>
              <td className="p-4 border">{incident.title}</td>
              <td className="p-4 border">{getPatientName(incident.patientId)}</td>
              <td className="p-4 border">{new Date(incident.appointmentDate).toLocaleString()}</td>
              <td className="p-4 border">{incident.status}</td>
              <td className="p-4 border">
                <Link to={`/admin/incidents/${incident.id}`} className="text-blue-600 hover:underline">View</Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">No incidents found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default IncidentsPage; 