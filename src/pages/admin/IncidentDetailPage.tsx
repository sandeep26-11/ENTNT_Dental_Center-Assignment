import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useData } from '../../contexts/DataContext';
import UpdateIncidentForm from '../../components/incidents/UpdateIncidentForm';

const IncidentDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getIncidentById, updateIncident } = useData();
    const navigate = useNavigate();
    const incident = id ? getIncidentById(id) : undefined;

    if (!incident) {
        return <div>Incident not found</div>;
    }

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                {/* Post-Appointment Form */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Update Treatment</h2>
                    <UpdateIncidentForm
                        incident={incident}
                        onUpdate={(updatedIncident) => {
                            updateIncident(updatedIncident);
                            navigate('/admin/appointments'); // Or stay on page
                        }}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default IncidentDetailPage;
