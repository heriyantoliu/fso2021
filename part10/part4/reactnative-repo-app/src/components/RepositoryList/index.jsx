import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';

const RepositoryList = () => {
  const [filter, setFilter] = useState('latestRepo');
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 500);
  const { repositories } = useRepositories(filter, value);

  const onFilter = (value) => {
    setFilter(value);
  };

  const onSearch = (value) => {
    setSearch(value);
  };

  return (
    <>
      <RepositoryListContainer
        repositories={repositories}
        onFilter={onFilter}
        filter={filter}
        onSearch={onSearch}
        search={search}
      />
    </>
  );
};

export default RepositoryList;
