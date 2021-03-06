/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  NonSSNPatientEntry,
  PatientEntry,
  NewPatientEntry,
  NewEntry,
} from '../types';

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

const AddEntry = (patient: PatientEntry, entry: NewEntry): PatientEntry => {
  const entryID: string = uuid();

  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat({ ...entry, id: entryID }),
  };

  patients.forEach((p, index) => {
    if (p.id === patient.id) {
      patients[index] = updatedPatient;
    }
  });

  return updatedPatient;
};

export default {
  getEntries,
  getNonSSNEntries,
  AddPatient,
  getPatientDetail,
  AddEntry,
};
