import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { ROUTES, COLORS } from '../../constants';
import { Collapse, Panel } from 'antd';

export const BookingCard = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>
    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <Text style={styles.headingParagraph}>CN, 05 Thg 11 23 </Text>
        <Text style={styles.paragraph}>1 week ago</Text>
      </View>
      <View style={styles.contentProfile}>
        <Image
          style={styles.avtimg}
          source={
            'https://sandbox.api.lettutor.com/avatar/4d54d3d7-d2a9-42e5-97a2-5ed38af5789aavatar1684484879187.jpg'
          }
        />
        <View>
          <Text style={styles.teacherName}>Keegan</Text>
          <View style={styles.row}>
            <Image
              source={
                'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/tn.svg'
              }
              style={styles.flagIcon}
            />
            <Text>Tunisia</Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.containerContent}>
        <Text style={{ fontSize: 20 }}>Thời gian học: </Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>19:30 - 19:55</Text>
        <Collapse items={items} defaultActiveKey={['1']} />
      </View>
      <View xs={12} style={styles.buttonContainer}>
        <View />
        <Button
          title='Vào buổi học'
          onPress={() => Alert.alert('Cannot press this one')}
          style={styles.buttonIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    marginVertical: 24,
    padding: 16
  },
  headingParagraph: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.black
  },
  paragraph: {
    fontSize: 17
  },
  containerContent: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  containerContentCol: {
    backgroundColor: '#FFF',
    marginVertical: 20
  },
  contentProfile: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20
  },
  avtimg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10
  },
  teacherName: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.black,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  flagIcon: {
    opacity: 1,
    width: 20,
    aspectRatio: 1,
    overflow: 'hidden',
    marginRight: 5
  },
  rowDescription: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  buttonText: {
    color: COLORS.primary
  },
  margin: {
    marginVertical: 20
  },
  buttonIn: {
    backgroundColor: '#1890ff',
    height: 40,
    width: '70%'
  }
});
