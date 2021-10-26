import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variabel) => {
  let queryVariables = { ...variabel };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    queryVariables = {
      ...queryVariables,
      after: data.repository.reviews.pageInfo.endCursor,
    };

    fetchMore({
      variables: queryVariables,
    });
  };

  const repository = loading ? undefined : data.repository;

  return {
    repository,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
