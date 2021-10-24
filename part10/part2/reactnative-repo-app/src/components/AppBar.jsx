import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    paddingBottom: 10,
    opacity: 0.7,
  },
});

const AppBar = () => {
  const repoPressed = () => {
    Alert.alert('clicked');
  };

  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" pressed={repoPressed} />
    </View>
  );
};

export default AppBar;
