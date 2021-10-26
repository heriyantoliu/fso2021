import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy) => {
  let queryVariables = {};

  switch (orderBy) {
    case 'latestRepo':
      queryVariables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
      break;
    case 'highRateRepo':
      queryVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      };
      break;
    case 'lowRateRepo':
      queryVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
      break;
    default:
      break;
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  const repositories = loading ? undefined : data.repositories;

  return {
    repositories,
    loading,
  };
};

export default useRepositories;
