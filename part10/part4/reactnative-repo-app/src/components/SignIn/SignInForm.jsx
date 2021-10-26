import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min('2', 'Too Short!')
    .required('Username  is required'),
  password: yup.string().min('5', 'Too Short').required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, dirty, isValid }) => (
        <>
          <FormikTextInput
            testID="username"
            name="username"
            placeholder="username"
            autoCapitalize="none"
          />
          <FormikTextInput
            testID="password"
            name="password"
            placeholder="password"
            secureTextEntry={true}
          />
          <Pressable
            testID="submit"
            onPress={handleSubmit}
            disabled={!dirty || !isValid}
          >
            <Text>Submit</Text>
          </Pressable>
        </>
      )}
    </Formik>
  );
};

export default SignInForm;
