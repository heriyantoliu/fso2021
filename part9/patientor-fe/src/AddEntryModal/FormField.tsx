import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import { EntryType, HealthCheckRating } from '../types';

export type TypeOption = {
  value: EntryType;
  label: string;
};

export type RatingOption = {
  value: HealthCheckRating;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

type SelectFieldRatingProps = {
  name: string;
  label: string;
  options: RatingOption[];
};

export const SelectFieldRating = ({
  name,
  label,
  options,
}: SelectFieldRatingProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);
