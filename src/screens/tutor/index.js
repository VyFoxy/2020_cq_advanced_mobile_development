import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  CheckBox
} from 'react-native';
import React, { useEffect, useContext } from 'react';
import TeacherCard from '../../components/teacher-card/TeacherCard';
import { COLORS, ROUTES } from '../../constants';
import { mappingSpecialties, mappingSelectCountry } from '../../utils/mapping';
import { ListTag } from '../../components/list-tag/ListTag';
import { useState } from 'react';
import AvatarContext from '../../context/AvatarProvider';
import { getListTutor, searchTutor } from '../../services/tutorAPI';
import MultiSelect from 'react-native-multiple-select';
import { compact, includes, isEmpty } from 'lodash';

export const Tutor = ({ navigation }) => {
  const [nation, setNation] = useState('');
  const { avatar } = useContext(AvatarContext);
  const [listTutor, setListTutor] = React.useState([]);
  const [favoriteTutor, setFavoriteTutor] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFavoriteTutor, setIsFavoriteTutor] = useState(false);
  const fetchData = async () => {
    const response = await getListTutor(1, 60);
    setFavoriteTutor(() => {
      const newListID = compact(
        response.favoriteTutor.map((item) => item.secondId)
      );
      return newListID;
    });
    // const data = response.tutors.rows.filter((item) => {
    //   return item.level != null;
    // });
    // setListTutor(data);
    // setIsLoading(false);
    handleSearch();
  };
  useEffect(() => {
    fetchData();
  }, [avatar]);
  const initSearchQuery = {
    name: '',
    country: '',
    nationality: [],
    page: '1',
    perPage: 12
  };
  const [searchQuery, setSearchQuery] = useState(initSearchQuery);
  const [specialties, setSpecialties] = useState(
    mappingSpecialties.map((item) => ({
      label: item.label,
      value: item?.value,
      status: item?.status || null
    })) || []
  );
  const onSelectedItemsChange = (selectedItems) => {
    setSearchQuery({ nationality: selectedItems });
  };
  const [mappedTutors, setMappedTutors] = useState([]);
  const handleSearch = async () => {
    const response = await searchTutor(searchQuery);
    if (response.rows.length > 0) {
      setListTutor(response.rows);
    } else {
      setListTutor([]);
    }
  };
  const mappingSpecialtiesTag = (value) => {
    return mappingSpecialties.find((item) => item?.value === value)?.label;
  };

  useEffect(() => {
    setMappedTutors(
      listTutor.map((tutor) => ({
        ...tutor,
        specialties: tutor.specialties.split(',').map(mappingSpecialtiesTag)
      }))
    );
  }, [listTutor]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handFilterSpecialties = (value) => {
    if (value === 'ALL') {
      setSearchQuery({ ...searchQuery, specialties: '' });
    } else {
      setSearchQuery({ ...searchQuery, specialties: value });
    }
    setSpecialties((prevSpecialties) =>
      prevSpecialties.map((item) => ({
        ...item,
        status: item.value === value ? 'active' : null
      }))
    );
  };

  const handleSelectFavoriteTutor = () => {
    if (isFavoriteTutor == false) {
      setIsFavoriteTutor(!isFavoriteTutor);
      setListTutor(
        listTutor.filter((tutor) => includes(favoriteTutor, tutor.id))
      );
    } else {
      setIsFavoriteTutor(!isFavoriteTutor);
      handleSearch();
    }
  };
  const handleReset = () => {
    setSearchQuery({ name: '', country: '' });
    setSpecialties((prevSpecialties) =>
      prevSpecialties.map((item) => ({
        ...item,
        status: item.value === 'ALL' ? 'active' : null
      }))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.welcomeText}>Buổi học sắp diễn ra</Text>
        <View style={{ marginTop: 20 }}>
          <View item xs={6} md={6} style={{ textAlign: 'center' }}>
            <Text style={styles.welcomeText}>
              T7, 04 Thg 11 23 18:00 - 18:25
            </Text>
            <Text style={styles.remainingText}>{' (còn 43:26:09)'}</Text>
          </View>
          <View item xs={6} md={6}>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>Vào lớp học</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeader}>Tìm kiếm gia sư</Text>
        <TextInput
          placeholder={'Nhập tên gia sư'}
          style={{
            width: 200,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20, // Adjust this value as needed
            paddingLeft: 10,
            marginBottom: 10
          }}
          value={searchQuery.name}
          onChangeText={(text) =>
            setSearchQuery({ ...searchQuery, name: text })
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
              handleSearch('name');
            }
          }}
        />
        <View
          style={{
            width: 200,
            height: 40,
            paddingLeft: 10,
            marginBottom: 10,
            flex: 1
          }}
        >
          <MultiSelect
            hideTags
            items={mappingSelectCountry}
            uniqueKey='id'
            onSelectedItemsChange={(e) => onSelectedItemsChange(e)}
            selectedItems={searchQuery.nationality}
            selectText='Chọn quốc tịch'
            searchInputPlaceholderText='Chọn quốc tịch...'
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor='#fff'
            tagBorderColor='#CCC'
            tagTextColor='#CCC'
            selectedItemTextColor='#CCC'
            selectedItemIconColor='#CCC'
            itemTextColor='#000'
            displayKey='name'
            searchInputStyle={{ color: '#CCC' }}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isFavoriteTutor}
            onValueChange={handleSelectFavoriteTutor}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Gia sư được yêu thích</Text>
        </View>
        <View style={{ paddingRight: 20 }}>
          <ListTag
            tags={specialties}
            handFilterSpecialties={handFilterSpecialties}
          />
        </View>

        <TouchableOpacity
          style={styles.ButtonReset}
          onPress={() => handleReset()}
        >
          <Text style={styles.ButtonText}>Đặt lại bộ tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.teacherHeader}>Gia sư được đề xuất</Text>
        <FlatList
          data={mappedTutors}
          renderItem={({ item }) => <TeacherCard item={item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  banner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'white',
    borderBottomLeftRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    backgroundColor:
      'linear-gradient(144deg, rgb(12, 61, 223) 0%, rgb(5, 23, 157) 100%)',
    height: 344
  },
  welcomeText: {
    fontSize: 20,
    color: 'white'
  },
  remainingText: {
    color: 'yellow',
    fontSize: 20
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 50
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  ButtonReset: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '50%',
    height: 30,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 100,
    borderColor: COLORS.primary,
    borderWidth: 1
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  seeMore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5
  },
  filterContainer: {
    marginTop: 10,
    padding: 20
  },
  filterHeader: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 30
  },
  filerInput: {
    borderRadius: 50
  },
  teacherHeader: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10
  },
  checkboxContainer: {
    flexDirection: 'row'
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    margin: 8
  }
});
