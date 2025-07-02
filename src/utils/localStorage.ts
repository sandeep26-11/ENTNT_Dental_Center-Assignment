import { users, patients, incidents } from './mockData';

export const seedInitialData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(patients));
  }
  if (!localStorage.getItem('incidents')) {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }
}; 