import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from './SignInForm';

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

const SignIn = () => {
  const [signIn] = useSignIn();

  const history = useHistory();

  const onSubmit = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
