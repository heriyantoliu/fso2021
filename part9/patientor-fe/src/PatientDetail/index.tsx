/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient, NewEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { Icon, Button } from 'semantic-ui-react';
import {
  useStateValue,
  addPatient,
  setDiagnosisList,
  addEntry,
} from '../state';
import EntryPatient from './EntryPatient';
import AddEntryModal from '../AddEntryModal';

type PatientDetailParams = {
  id: string;
};

const PatientDetail = () => {
  const { id } = useParams<PatientDetailParams>();
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }, dispatchDiagnosis] = useStateValue();

  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const findPatient: Patient = patients[id];

    const fetchPatientDetail = async () => {
      try {
        const { data: patientDetailFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        setPatient(patientDetailFromApi);

        dispatch(addPatient(patientDetailFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (findPatient) {
      setPatient(findPatient);
    } else {
      void fetchPatientDetail();
    }
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesListFormApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatchDiagnosis(setDiagnosisList(diagnosesListFormApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (Object.keys(diagnoses).length === 0) {
      void fetchDiagnoses();
    }
  }, []);

  if (!patient) {
    return null;
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: NewEntry) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addEntry(newEntry));
      setPatient(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'unknown Error');
    }
  };

  return (
    <div className="App">
      <h3>
        {patient.name}
        <Icon
          disabled
          size="big"
          color="black"
          name={
            patient.gender === 'male'
              ? 'mars'
              : patient.gender === 'female'
              ? 'venus'
              : 'genderless'
          }
        />
      </h3>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h4>entries</h4>
      {patient.entries.map((entry) => (
        <EntryPatient key={entry.id} entry={entry} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetail;
