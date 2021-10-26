import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, searchKeyword, variabel) => {
  let queryVariables = { ...variabel };

  switch (orderBy) {
    case 'latestRepo':
      queryVariables = {
        ...queryVariables,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
      break;
    case 'highRateRepo':
      queryVariables = {
        ...queryVariables,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      };
      break;
    case 'lowRateRepo':
      queryVariables = {
        ...queryVariables,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
      break;
    default:
      break;
  }

  if (searchKeyword) {
    queryVariables = {
      ...queryVariables,
      searchKeyword,
    };
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    queryVariables = {
      ...queryVariables,
      after: data.repositories.pageInfo.endCursor,
    };

    fetchMore({
      variables: queryVariables,
    });
  };

  const repositories = loading ? undefined : data.repositories;

  return {
    repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
