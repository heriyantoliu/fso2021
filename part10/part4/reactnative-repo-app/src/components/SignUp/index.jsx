import React from 'react';
import { Alert, Button, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';
import FormikTextInput from '../SignIn/FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_USER } from '../../graphql/mutations';
import useSignIn from '../../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Minimun Length 1')
    .max(30, 'Max Length 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Minimun Length 5')
    .max(50, 'Max Length 50')
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    await createUser({
      variables: {
        username,
        password,
      },
    });

    await signIn({ username, password });
    history.push('/');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, dirty, isValid }) => (
        <>
          <FormikTextInput
            name="username"
            placeholder="Username"
            autoCapitalize="none"
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
          <Button
            title="submit"
            onPress={handleSubmit}
            disabled={!dirty || !isValid}
          />
        </>
      )}
    </Formik>
  );
};

export default SignUp;
