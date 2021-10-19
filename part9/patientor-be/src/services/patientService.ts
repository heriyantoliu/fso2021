/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSSNPatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSSNEntries = (): NonSSNPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientDetail = (id: string): PatientEntry | undefined => {
  const entry = patients.find((p) => p.id === id);
  console.log('GET', entry);
  return entry;
};

const AddPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSSNEntries, AddPatient, getPatientDetail };
