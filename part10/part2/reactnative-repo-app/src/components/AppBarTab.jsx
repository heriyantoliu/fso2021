import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const AppBarTab = ({ text, pressed }) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.appBarTextColor,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <Pressable onPress={pressed}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
