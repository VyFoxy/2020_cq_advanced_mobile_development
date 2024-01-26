import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import React, { useEffect, useContext, useRef } from 'react';
import TeacherCard from '../../components/teacher-card/TeacherCard';
import { COLORS, ROUTES } from '../../constants';
import { mappingSpecialties, mappingSelectCountry } from '../../utils/mapping';
import { ListTag } from '../../components/list-tag/ListTag';
import { useState } from 'react';
import AvatarContext from '../../context/AvatarProvider';
import {
  getListTutor,
  getNextBooking,
  searchTutor
} from '../../services/tutorAPI';
import MultiSelect from 'react-native-multiple-select';
import { ceil, compact, includes, isEmpty } from 'lodash';
import Pagination from '../../components/pagination/Pagination';
import NotFoundFilter from '../../components/not-found/NoteFound';
import { getTotalCourse } from '../../services/courseAPI';
import { MaterialIcons } from '@expo/vector-icons';
import {
  convertMinutesToHoursAndMinutes,
  formatTimestampRange,
  remainingTimeFromTimestamp
} from '../../utils/func';
import LocalizationContext from '../../context/LocalizationProvider';

export const Tutor = ({ navigation }) => {
  const { avatar } = useContext(AvatarContext);
  const [listTutor, setListTutor] = React.useState([]);
  const { i18n } = useContext(LocalizationContext);
  const [favoriteTutor, setFavoriteTutor] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingUpComing, setIsLoadingUpComing] = React.useState(true);
  const [isFavoriteTutor, setIsFavoriteTutor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef();
  const [totalPages, setTotalPages] = useState(5);
  const [total, setTotal] = useState({});
  const [upComingClass, setUpComingClass] = useState({});
  const [remainingTime, setRemainingTime] = useState('');
  let temp = 0;
  const fetchData = async () => {
    const response = await getListTutor(1, 60);
    const res_total = await getTotalCourse();
    setTotal(convertMinutesToHoursAndMinutes(res_total));
    const reponse_upcoming = await getNextBooking();
    if (reponse_upcoming?.data?.length > 0) {
      setUpComingClass(reponse_upcoming?.data[0]);
      setIsLoadingUpComing(false);
    }
    setFavoriteTutor(() => {
      const newListID = compact(
        response.favoriteTutor.map((item) => item.secondId)
      );

      return newListID;
    });

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
    setIsLoading(true);
    const response = await searchTutor(searchQuery);
    setTotalPages(ceil(response?.count / searchQuery.perPage));
    if (response.rows.length > 0) {
      setListTutor(response.rows);
    } else {
      setListTutor([]);
    }
    setIsLoading(false);
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
    scrollRef.current.scrollTo({
      y: 30,
      animated: true
    });
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
    setSearchQuery(initSearchQuery);
    setSpecialties((prevSpecialties) =>
      prevSpecialties.map((item) => ({
        ...item,
        status: item.value === 'ALL' ? 'active' : null
      }))
    );
  };

  const onPageChange = (pageNumber) => {
    setSearchQuery({ ...searchQuery, page: pageNumber });
  };
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.banner}>
        {isLoadingUpComing ? (
          <ActivityIndicator
            size='large'
            color={COLORS.white}
            style={styles.centerLoading}
          />
        ) : (
          <>
            <Text style={[styles.welcomeText, { fontSize: 30 }]}>
              {i18n.t('UpcomingLession')}
            </Text>
            <View style={{ marginTop: 20 }}>
              <View
                item
                xs={6}
                md={6}
                style={{ textAlign: 'center', alignItems: 'center' }}
              >
                {/* {console.log(upComingClass, 'up')} */}
                {!isEmpty(upComingClass) ? (
                  <Text style={styles.welcomeText}>
                    {formatTimestampRange(
                      upComingClass?.scheduleDetailInfo?.startPeriodTimestamp,
                      upComingClass?.scheduleDetailInfo?.endPeriodTimestamp
                    )}
                  </Text>
                ) : (
                  <Text style={styles.welcomeText}>
                    Không có buổi học nào sắp diễn ra
                  </Text>
                )}
              </View>
              <View item xs={6} md={6} style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => {
                    navigation.navigate(ROUTES.VIDEO_CALL, { upComingClass });
                  }}
                >
                  <MaterialIcons
                    name='queue-play-next'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.ButtonText}>
                    {i18n.t('EnterLessionRoom')}
                  </Text>
                </TouchableOpacity>
                <View item xs={6} md={6} style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, color: 'white' }}>{`${i18n.t(
                    'TotalTimeLearning'
                  )} ${total.hours} ${i18n.t('Hour')} ${total.minutes} ${i18n.t(
                    'Minute'
                  )}`}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeader}>{i18n.t('FindATutor')}</Text>
        <TextInput
          placeholder={i18n.t('EnterTutorName')}
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
            flex: 1,
            zIndex: 1000
          }}
        >
          <MultiSelect
            hideTags
            items={mappingSelectCountry}
            uniqueKey='id'
            onSelectedItemsChange={(e) => onSelectedItemsChange(e)}
            selectedItems={searchQuery.nationality}
            selectText={i18n.t('SelectTutorNation')}
            searchInputPlaceholderText='Chọn quốc tịch...'
            //onChangeInput={(text) => console.log(text)}
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
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            value={isFavoriteTutor}
            onValueChange={handleSelectFavoriteTutor}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Gia sư được yêu thích</Text>
        </View> */}
        <View style={{ paddingRight: 20 }}>
          <ListTag
            tags={specialties}
            handFilterSpecialties={handFilterSpecialties}
          />
        </View>

        <TouchableOpacity style={styles.ButtonReset} onPress={handleReset}>
          <Text style={styles.ButtonText}>{i18n.t('ResetFilter')}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={COLORS.primary}
          style={styles.centerLoading}
        />
      ) : (
        <>
          <View style={styles.filterContainer}>
            <Text style={styles.teacherHeader}>
              {i18n.t('RecommendedTutors')}
            </Text>
            {mappedTutors && mappedTutors?.length > 0 ? (
              mappedTutors.map((item, index) => (
                <TeacherCard key={index.toString()} item={item} />
              ))
            ) : (
              <NotFoundFilter />
            )}
          </View>
          {mappedTutors && mappedTutors?.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
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
    color: 'white',
    borderBottomLeftRadius: 5,
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
    justifyContent: 'space-around',
    width: 170,
    flexDirection: 'row',
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
    marginVertical: 20
  },
  ButtonText: {
    fontSize: 13,
    fontWeight: '500',
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
    fontWeight: '600',
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
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
