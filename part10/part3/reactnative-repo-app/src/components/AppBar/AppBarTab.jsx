import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../../theme';

const AppBarTab = ({ text, link }) => {
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.appBarTextColor,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <Link to={link}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
