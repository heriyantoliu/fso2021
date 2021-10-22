/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  description: string;
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type NewEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

type EntryFields = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<string>;
  type: EntryType;
  dischargeDate: string;
  dischargeCriteria: string;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  healthCheckRating: HealthCheckRating;
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  dischargeDate,
  dischargeCriteria,
  employerName,
  sickLeaveStartDate,
  sickLeaveEndDate,
  healthCheckRating,
}: EntryFields): NewEntry => {
  type NewEntryBase = Omit<BaseEntry, 'id'>;

  const newEntryBase: NewEntryBase = {
    date,
    description,
    specialist,
    diagnosisCodes,
  };

  switch (type) {
    case EntryType.Hospital:
      return {
        ...newEntryBase,
        type,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newEntryBase,
        type,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
      };
    case EntryType.HealthCheck:
      return {
        ...newEntryBase,
        type,
        healthCheckRating,
      };
  }
};
