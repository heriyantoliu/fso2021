import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import AppBarTab from './AppBarTab';
import theme from '../../../theme';
import { AUTHORIZED_USER } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    paddingBottom: 10,
    opacity: 0.7,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER);

  const history = useHistory();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  let authorizedUser = data ? data.authorizedUser : undefined;

  const toHome = () => {
    history.push('/');
  };

  const toSignIn = () => {
    history.push('/signin');
  };

  const toCreateReview = () => {
    history.push('/create-review');
  };

  const handleSignOut = async () => {
    console.log('signout');
    await authStorage.removeAccessToken();
    authorizedUser = undefined;
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" onPress={toHome} />

        {authorizedUser ? (
          <>
            <AppBarTab text="Create Review" onPress={toCreateReview} />
            <AppBarTab text="Sign Out" onPress={handleSignOut} />
          </>
        ) : (
          <AppBarTab text="Sign In" onPress={toSignIn} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
