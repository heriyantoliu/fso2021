import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { Entry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

const EntryPatient = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (Object.values(diagnoses).length === 0) return <div>Loading...</div>;

  const assetNever = (value: unknown): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const healthyColor = (rating: HealthCheckRating): SemanticCOLORS => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'orange';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'black';
    }
  };
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Card key={entry.id} fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="user md" />
            </Card.Header>
            <Card.Description>
              <i>{entry.description}</i>
              <br />
              <Icon
                name="heart"
                color={healthyColor(entry.healthCheckRating)}
              />
            </Card.Description>
            <Card.Description>
              <ul>
                {entry.diagnosisCodes?.map((diagnose) => (
                  <li key={diagnose}>
                    {diagnose} {diagnoses[diagnose].name}
                  </li>
                ))}
              </ul>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case 'Hospital':
      return (
        <Card key={entry.id} fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" />
            </Card.Header>
            <Card.Description>
              <i>{entry.description}</i>
            </Card.Description>
            <Card.Description>
              <ul>
                {entry.diagnosisCodes?.map((diagnose) => (
                  <li key={diagnose}>
                    {diagnose} {diagnoses[diagnose].name}
                  </li>
                ))}
              </ul>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case 'OccupationalHealthcare':
      return (
        <Card key={entry.id} fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="stethoscope" />{' '}
              <b>{entry.employerName}</b>
            </Card.Header>
            <Card.Description>
              <i>{entry.description}</i>
            </Card.Description>
            <Card.Description>
              <ul>
                {entry.diagnosisCodes?.map((diagnose) => (
                  <li key={diagnose}>
                    {diagnose} {diagnoses[diagnose].name}
                  </li>
                ))}
              </ul>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    default:
      return assetNever(entry);
  }
};

export default EntryPatient;
