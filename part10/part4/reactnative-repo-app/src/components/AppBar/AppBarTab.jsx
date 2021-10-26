import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from '../../../theme';

const AppBarTab = ({ text, onPress }) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.appBarTextColor,
      fontSize: 15,
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
