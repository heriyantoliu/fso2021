/* eslint-disable @typescript-eslint/no-empty-interface */
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSSNPatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
