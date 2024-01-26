import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CourseCard from '../../components/course/course';
import { Searchbar } from 'react-native-paper';
import { COLORS } from '../../constants';
import { getListCourse } from '../../services/courseAPI';
import { mappingLevel } from '../../utils/mapping';
import { ceil, get, includes } from 'lodash';
import Pagination from '../../components/pagination/Pagination';

export const CoursesSreeen = () => {
  const arr = [0, 1, 4, 7];
  //const { i18n } = useContext(LocalizationContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataCourse, setDataCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const scrollRef = useRef();
  async function fetchData(page) {
    console.log(page);
    const response = await getListCourse({ page: page, size: 6, search: '' });
    setDataCourse(response.data.data.rows);
    setTotalPages(ceil(response.data?.data.count / 6));
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  useEffect(() => {
    fetchData(page);
    scrollRef.current.scrollTo({
      y: 30,
      animated: true
    });
  }, [page]);
  const handleSearch = async () => {
    setIsLoading(true);
    const response = await getListCourse({
      page: 1,
      size: 6,
      search: searchQuery
    });
    if (response.data.data.rows.length > 0) {
      setDataCourse(response.data.data.rows);
    } else {
      setDataCourse([]);
    }
    setIsLoading(false);
  };
  const handleClearSearch = async () => {
    setSearchQuery('');
    const response = await getListCourse({ page: 1, size: 6, search: '' });
    if (response.data.data.rows.length > 0) {
      setDataCourse(response.data.data.rows);
    } else {
      setDataCourse([]);
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 40,
        paddingHorizontal: 40
      }}
      ref={scrollRef}
    >
      <View>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/img/course.png')}
            style={styles.image}
            resizeMode='contain'
          ></Image>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.headingParagraph}>Khám phá các khóa học</Text>

            <Searchbar
              placeholder={'Tìm kiếm khóa học'}
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              style={styles.searchBar}
              onIconPress={handleSearch}
              //onClearIconPress={handleClearSearch}
            />
          </View>
        </View>

        <View>
          <Text style={styles.paragraph}>
            LiveTutor đã xây dựng nên các khóa học của các lĩnh vực trong cuộc
            sống chất lượng, bài bản và khoa học nhất cho những người đang có
            nhu cầu trau dồi thêm kiến thức về các lĩnh vực.
          </Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={COLORS.primary}
          style={styles.centerLoading}
        />
      ) : (
        <View style={{ paddingBottom: 30 }}>
          <View>
            <FlatList
              data={dataCourse}
              renderItem={({ item }) => (
                <CourseCard image={item?.imageUrl}>
                  <Text style={styles.nameCourse}>{item?.name}</Text>
                  <Text style={styles.subtitle}>{item?.description}</Text>
                  <View style={styles.levelContainer}>
                    {includes(arr, item?.level)}
                    <Text style={styles.levelText}>{`${get(
                      mappingLevel,
                      item?.level
                    )} • `}</Text>
                    <Text
                      style={styles.levelText}
                    >{`${item?.topics.length} bài học`}</Text>
                  </View>
                </CourseCard>
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
          {dataCourse && dataCourse?.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={() => {}}
              setCurrentPage={setPage}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    flexShrink: 1
  },
  image: {
    width: 100,
    height: 100
  },
  headingParagraph: {
    fontSize: 27,
    fontWeight: '600',
    color: COLORS.black,
    marginVertical: 10,
    marginLeft: 20,
    //flex: 1,
    flexShrink: 1
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20
  },
  blockquote: {
    borderLeftWidth: 3, // Adjust the width of the grey line as needed
    borderLeftColor: '4px solid hsla(0,0%,39.2%,.2)',
    opacity: '0.85',
    paddingLeft: 10, // Adjust the left padding for the text
    marginBottom: 10 // Adjust the margin between blockquotes
  },
  text: {
    fontSize: 25,
    fontWeight: '500'
  },
  authentication: {
    padding: 20
  },
  nameCourse: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '300',
    color: COLORS.gray
  },
  levelText: {
    fontSize: 14,
    fontWeight: '400'
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    paddingVertical: 15
  },
  searchBar: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: '#CCC'
  }
});
