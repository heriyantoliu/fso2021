import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
});

const TextInput = ({ style, error, ...props }) => {
  let textInputStyle = [style, styles.input];

  if (error) {
    textInputStyle.push(styles.errorInput);
  }
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
