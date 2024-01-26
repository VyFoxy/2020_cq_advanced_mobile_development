import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TagItem from '../tag-item/TagItem';
import moment from 'moment';
import { isEmpty } from 'lodash';

export const ListTag = ({ tags, handFilterSpecialties }) => {
  return (
    <FlatList
      //listKey={moment().valueOf().toString()}
      columnWrapperStyle={styles.listTag}
      numColumns={10}
      data={tags}
      renderItem={({ item }) => (
        <TagItem item={item} handFilterSpecialties={handFilterSpecialties} />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.listTag}
      scrollEnabled={false}
    />
    // !isEmpty(tags) && (
    //   <View style={styles.listTag}>
    //     {tags.map((item) => (
    //       <TagItem item={item} handFilterSpecialties={handFilterSpecialties} />
    //     ))}
    //   </View>
    // )
  );
};

const styles = StyleSheet.create({
  listTag: {
    flexWrap: 'wrap'
  }
});
