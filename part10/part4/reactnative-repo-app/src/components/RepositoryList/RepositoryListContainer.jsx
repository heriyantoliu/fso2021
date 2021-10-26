import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 5,
    fontSize: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => <RepositoryItem repo={item} />;

export default class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, onFilter, search, onSearch } = this.props;

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={onSearch}
          value={search}
        />
        <Picker
          style={styles.picker}
          selectedValue={filter}
          onValueChange={(itemValue, itemIndex) => {
            onFilter(itemValue);
          }}
        >
          <Picker.Item label="Latest Repositories" value="latestRepo" />
          <Picker.Item label="Highest Rate Repositories" value="highRateRepo" />
          <Picker.Item label="Lowest Rate Repositories" value="lowRateRepo" />
        </Picker>
      </>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
