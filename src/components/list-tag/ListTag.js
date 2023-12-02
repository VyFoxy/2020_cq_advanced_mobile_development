import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TagItem from '../tag-item/TagItem';
import moment from 'moment';

export const ListTag = ({ tags, handFilterSpecialties }) => {
  return (
    <FlatList
      listKey={moment().valueOf().toString()}
      columnWrapperStyle={styles.listTag}
      numColumns={10}
      data={tags}
      renderItem={({ item }) => (
        <TagItem item={item} handFilterSpecialties={handFilterSpecialties} />
      )}
      keyExtractor={(item) => item}
      //style={styles.listTag}
    />
  );
};

const styles = StyleSheet.create({
  listTag: {
    flexWrap: 'wrap'
  }
});
