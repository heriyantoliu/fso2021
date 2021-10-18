export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonSSNPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
