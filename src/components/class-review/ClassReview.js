import { isEmpty, isNil } from 'lodash';
import { StyleSheet, View, Text } from 'react-native';
import { Rating } from 'react-native-ratings';

export const ClassReview = ({ label, ratingValue, comment }) => {
  return (
    <View style={styles.line}>
      {!isEmpty(label) && !isEmpty(comment) && (
        <Text>{`${label}: ${comment}`}</Text>
      )}

      {!isNil(ratingValue) && (
        <Rating
          startingValue={ratingValue}
          style={styles.rating}
          imageSize={15}
          readonly
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  line: { flexDirection: 'row', justifyContent: 'space-between' },
  paragraph: {
    fontSize: 17
  }
});
