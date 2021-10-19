/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Icon } from 'semantic-ui-react';
import { useStateValue, addPatient } from '../state';

type PatientDetailParams = {
  id: string;
};

const PatientDetail = () => {
  const { id } = useParams<PatientDetailParams>();
  const [{ patients }, dispatch] = useStateValue();

  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

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
  }, []);

  if (!patient) {
    return null;
  }

  return (
    <div>
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
    </div>
  );
};

export default PatientDetail;
