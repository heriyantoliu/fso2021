import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../../hooks/useSignIn';
import AuthStorage from '../../utils/AuthStorage';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    margin: 12,
  },
});

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

const SignInForm = ({ onSubmit, dirty, isValid }) => {
  return (
    <>
      <FormikTextInput
        name="username"
        placeholder="username"
        autoCapitalize="none"
      />
      <FormikTextInput
        name="password"
        placeholder="password"
        secureTextEntry={true}
      />
      <Button title="submit" onPress={onSubmit} disabled={!dirty || !isValid} />
    </>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async ({ username, password }) => {
    try {
      const data = await signIn({ username, password });
      const authStorage = new AuthStorage('Auth');
      authStorage.setAccesToken(data.authorize.accessToken);
      console.log(await authStorage.getAccessToken());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, dirty, isValid }) => (
          <SignInForm onSubmit={handleSubmit} dirty={dirty} isValid={isValid} />
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
