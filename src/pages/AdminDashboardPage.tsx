import MainLayout from '../components/layout/MainLayout';
import { useData, type Incident } from '../contexts/DataContext';

const AdminDashboardPage = () => {
  const { 
    getUpcomingAppointments, 
    getRevenue, 
    getTreatmentStatusCounts,
    getPatientName 
  } = useData();

  const nextAppointments = getUpcomingAppointments(10);
  const revenue = getRevenue();
  const statusCounts = getTreatmentStatusCounts();

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">${revenue.total.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Pending Treatments</h2>
          <p className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Completed Treatments</h2>
          <p className="text-3xl font-bold text-blue-600">{statusCounts.completed}</p>
        </div>
      </div>

      {/* Upcoming Appointments List */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Next 10 Appointments</h2>
        <ul className="divide-y divide-gray-200">
          {nextAppointments.length > 0 ? nextAppointments.map((appt: Incident) => (
            <li key={appt.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{appt.title} - {getPatientName(appt.patientId)}</p>
                <p className="text-sm text-gray-600">{new Date(appt.appointmentDate).toLocaleString()}</p>
              </div>
            </li>
          )) : (
            <p>No upcoming appointments.</p>
          )}
        </ul>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage; 