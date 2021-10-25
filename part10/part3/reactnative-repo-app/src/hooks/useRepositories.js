import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = loading ? undefined : data.repositories;

  return {
    repositories,
    loading: loading,
  };
};

export default useRepositories;
