import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useData } from '../../contexts/DataContext';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { incidents, getPatientName } = useData();
  const navigate = useNavigate();

  const events = incidents.map(incident => ({
    id: incident.id,
    title: `${incident.title} (${getPatientName(incident.patientId)})`,
    start: new Date(incident.appointmentDate),
    end: new Date(new Date(incident.appointmentDate).getTime() + 60 * 60 * 1000), // Assuming 1-hour appointments
    allDay: false,
    resource: incident, // Attach the full incident object
  }));

  const handleSelectEvent = (event: any) => {
    navigate(`/admin/incidents/${event.id}`);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Appointments Calendar</h1>
      <div className="bg-white p-4 rounded-md shadow-md" style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          style={{ flex: 1 }}
        />
      </div>
    </MainLayout>
  );
};

export default CalendarPage; 