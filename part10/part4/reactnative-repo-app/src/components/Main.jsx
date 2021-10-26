import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import RepositoryItem from './RepositoryList/RepositoryItem';
import CreateReview from './CreateReview';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: theme.fonts.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repo/:id">
          <RepositoryItem />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/create-review">
          <CreateReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
