import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import TeacherCard from '../../components/teacher-card/TeacherCard';
import { COLORS, ROUTES } from '../../constants';
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useState } from 'react';

export const Tutor = ({ navigation }) => {
  const [nation, setNation] = useState('');
  const arr = [1, 2, 3, 4];
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.welcomeText}>Buổi học sắp diễn ra</Text>
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
            <Text style={styles.welcomeText}>
              T7, 04 Thg 11 23 18:00 - 18:25
            </Text>
            <Text style={styles.remainingText}>{' (còn 43:26:09)'}</Text>
          </Grid>
          <Grid item xs={6} md={6}>
            <TouchableOpacity style={styles.Button}>
              {/* <OndemandVideoOutlinedIcon/> */}
              <Text style={styles.ButtonText}>Vào lớp học</Text>
            </TouchableOpacity>
          </Grid>
        </Grid>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterHeader}>Tìm kiếm gia sư</Text>
        <TextField
          placeholder={'Nhập tên gia sư'}
          size='small'
          InputProps={{
            style: {
              borderRadius: 50
            }
          }}
          style={{ width: 200 }}
        />
        {/* <Autocomplete
          id='listReferenceCode'
          fullWidth
          multiple
          freeSolo
          limitTags={1}
          blurOnSelect
          disableClearable={false}
          renderTags={(tagValue, getTagProps) => {
            return tagValue?.map((option, index) => (
              <Chip
                key={index}
                {...getTagProps({ index })}
                label={option}
                color='primary'
                size='small'
                // onDelete={() => handleDeleteItem(option)}
              />
            ));
          }}
          value={pageProps?.listReferenceCode}
          onChange={handleChangeSearch('ListReferenceCode')}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              name='referenceCode'
              label='Tìm kiếm nhiều mã SO'
              placeholder='Mã SO'
              variant='outlined'
              className={classes.autocompleteSearch}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <div className='MuiAutocomplete-endAdornment'>
                    {!isEmpty(pageProps?.listReferenceCode) && (
                      <IconButton
                        size='small'
                        className='ts-padding-remove'
                        onClick={(e) => {
                          handleChangeSearch('ListReferenceCode')(e, []);
                        }}
                      >
                        <Clear />
                      </IconButton>
                    )}
                    <IconButton
                      size='small'
                      className='ts-padding-remove'
                      onClick={(e) => {
                        handleChangeSearch('ListReferenceCode')(e, [
                          ...getListSearch('listReferenceCode')
                        ]);
                      }}
                    >
                      <Search />
                    </IconButton>
                  </div>
                )
              }}
            />
          )}
        /> */}
      </View>
      <FlatList
        data={arr}
        renderItem={({ item }) => <TeacherCard />}
        keyExtractor={(item) => item.toString()}
      />
    </View>
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
    marginTop: 30,
    padding: 20
  },
  filterHeader: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 40
  },
  filerInput: {
    borderRadius: 50
  }
});
