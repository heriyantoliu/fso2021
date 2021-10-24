import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />

      <Button title="submit" onPress={() => console.log(username, password)} />
    </View>
  );
};

export default SignIn;
