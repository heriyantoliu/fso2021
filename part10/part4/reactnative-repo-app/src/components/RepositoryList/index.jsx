import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  picker: {
    margin: 5,
    fontSize: 16,
  },
});

const RepositoryList = () => {
  const [selected, setSelected] = useState('latestRepo');
  const { repositories } = useRepositories(selected);

  return (
    <>
      <Picker
        style={styles.picker}
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          setSelected(itemValue);
        }}
      >
        <Picker.Item label="Latest Repositories" value="latestRepo" />
        <Picker.Item label="Highest Rate Repositories" value="highRateRepo" />
        <Picker.Item label="Lowest Rate Repositories" value="lowRateRepo" />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;
