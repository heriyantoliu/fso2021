import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const apolloClient = useApolloClient();
  // const authStorage = useContext(AuthStorageContext);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });

    await authStorage.setAccessToken(data.authorize.accessToken);

    apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
