/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Gender,
  NewPatientEntry,
  Entry,
  NewEntryBase,
  DiagnoseEntry,
  NewEntry,
  EntryType,
  HealthCheckRating,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Array<DiagnoseEntry['code']> => {
  if (!Array.isArray(codes) || !codes.every((code) => isString(code))) {
    throw new Error('Incorrect diagnosis codes');
  }
  return codes;
};

const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name: ' + name);
  }
  return name;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newEntry;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  discharge: { date: string; criteria: string };
  employerName: unknown;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating: unknown;
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating,
}: EntryFields): NewEntry => {
  const newEntryBase: NewEntryBase = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseEntryType(type),
  };

  if (diagnosisCodes) {
    newEntryBase.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  const entry = { ...newEntryBase } as NewEntry;

  switch (entry.type) {
    case EntryType.Hospital:
      if (isDate(discharge.date) && isString(discharge.criteria)) {
        entry.discharge = discharge;
      }
      break;
    case EntryType.OccupationalHealthcare:
      entry.employerName = parseEmployerName(employerName);
      if (isDate(sickLeave.startDate) && isDate(sickLeave.endDate)) {
        entry.sickLeave = sickLeave;
      }
      break;
    case EntryType.HealthCheck:
      entry.healthCheckRating = parseHealthCheckRating(healthCheckRating);
      break;
    default:
      assertNever(entry);
  }

  return entry;
};

export default toNewPatientEntry;
