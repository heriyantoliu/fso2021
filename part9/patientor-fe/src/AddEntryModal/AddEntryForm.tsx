import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { EntryType, Entry, HealthCheckRating, NewEntry } from '../types';
import {
  TypeOption,
  SelectField,
  RatingOption,
  SelectFieldRating,
} from './FormField';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { toNewEntry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  {
    value: EntryType.OccupationalHealthcare,
    label: 'Occupational Healthcare',
  },
  { value: EntryType.HealthCheck, label: 'Health Check' },
];

const RatingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const EntrySpecific = (type: EntryType) => {
    switch (type) {
      case EntryType.Hospital:
        return (
          <div>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />
          </div>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
              component={TextField}
            />
          </div>
        );
      case EntryType.HealthCheck:
        return (
          <SelectFieldRating
            label="Rating"
            name="healthCheckRating"
            options={RatingOptions}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        type: EntryType.Hospital,
        employerName: '',
        dischargeDate: '',
        dischargeCriteria: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={(values) => onSubmit(toNewEntry(values))}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case EntryType.Hospital:
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            }
            if (!values.dischargeCriteria) {
              errors.DischargeCriteria = requiredError;
            }
            break;
          case EntryType.OccupationalHealthcare:
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (!values.sickLeaveStartDate) {
              errors.sickLeaveStartDate = requiredError;
            }
            if (!values.sickLeaveEndDate) {
              errors.sickLeaveEndDate = requiredError;
            }
            break;
          case EntryType.HealthCheck:
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {EntrySpecific(values.type)}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
