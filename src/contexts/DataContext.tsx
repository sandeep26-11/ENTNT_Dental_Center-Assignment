import React, { createContext, useState, useEffect, useContext } from 'react';

// Define types for our data
export interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

export interface Incident {
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

interface DataContextType {
  patients: Patient[];
  incidents: Incident[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  deletePatient: (id: string) => void;
  editPatient: (patient: Patient) => void;
  getPatientName: (patientId: string) => string;
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  getIncidentById: (id: string) => Incident | undefined;
  updateIncident: (incident: Incident) => void;
  getUpcomingAppointments: (count: number) => Incident[];
  getRevenue: () => { total: number };
  getTreatmentStatusCounts: () => { pending: number, completed: number };
  getIncidentsByPatient: (patientId: string) => Incident[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Load initial data from localStorage
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const storedIncidents = JSON.parse(localStorage.getItem('incidents') || '[]');
    setPatients(storedPatients);
    setIncidents(storedIncidents);
  }, []);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: `p${Date.now()}` }; // Simple unique ID
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter((p) => p.id !== id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const editPatient = (updatedPatient: Patient) => {
    const updatedPatients = patients.map((p) =>
      p.id === updatedPatient.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const addIncident = (incident: Omit<Incident, 'id'>) => {
    const newIncident = { ...incident, id: `i${Date.now()}`, status: 'Pending' as const };
    const updatedIncidents = [...incidents, newIncident];
    setIncidents(updatedIncidents);
    localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
  };

  const getIncidentById = (id: string) => {
    return incidents.find((i) => i.id === id);
  };

  const updateIncident = (updatedIncident: Incident) => {
    const updatedIncidents = incidents.map((i) =>
      i.id === updatedIncident.id ? updatedIncident : i
    );
    setIncidents(updatedIncidents);
    localStorage.setItem('incidents', JSON.stringify(updatedIncidents));
  };

  const getUpcomingAppointments = (count: number) => {
    return incidents
      .filter(i => new Date(i.appointmentDate) > new Date())
      .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
      .slice(0, count);
  };

  const getRevenue = () => {
    const total = incidents
      .filter(i => i.status === 'Completed' && i.cost)
      .reduce((sum, i) => sum + (i.cost || 0), 0);
    return { total };
  };

  const getTreatmentStatusCounts = () => {
    const pending = incidents.filter(i => i.status === 'Pending').length;
    const completed = incidents.filter(i => i.status === 'Completed').length;
    return { pending, completed };
  };

  const getIncidentsByPatient = (patientId: string) => {
    return incidents.filter(i => i.patientId === patientId);
  };

  return (
    <DataContext.Provider value={{ 
        patients, 
        incidents, 
        addPatient, 
        deletePatient, 
        editPatient, 
        getPatientName, 
        addIncident, 
        getIncidentById, 
        updateIncident,
        getUpcomingAppointments,
        getRevenue,
        getTreatmentStatusCounts,
        getIncidentsByPatient
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 