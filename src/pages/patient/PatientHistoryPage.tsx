import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { useData, type Incident } from '../../contexts/DataContext';

const PatientHistoryPage = () => {
  const { user } = useAuth();
  const { getIncidentsByPatient } = useData();

  const patientIncidents = user?.patientId ? getIncidentsByPatient(user.patientId) : [];
  
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">My Appointment History</h1>
      <div className="p-4 bg-white rounded-md shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Files</th>
            </tr>
          </thead>
          <tbody>
            {patientIncidents.length > 0 ? (
              patientIncidents.map((incident: Incident) => (
                <tr key={incident.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{incident.title}</td>
                  <td className="p-4">{new Date(incident.appointmentDate).toLocaleDateString()}</td>
                  <td className="p-4">{incident.status}</td>
                  <td className="p-4">{incident.cost ? `$${incident.cost.toFixed(2)}` : 'N/A'}</td>
                  <td className="p-4">
                    {incident.files && incident.files.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {incident.files.map((file, index) => (
                          <li key={index}>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No files'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">You have no appointment history.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default PatientHistoryPage; 