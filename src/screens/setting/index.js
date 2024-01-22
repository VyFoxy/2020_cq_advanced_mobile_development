import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useContext } from 'react';
import LocalizationContext from '../../context/LocalizationProvider';
import ThemeContext from '../../context/ThemeProvider';
import { ROUTES, IMGS, COLORS } from '../../constants';
export const Settings = () => {
  const { i18n, setLocale, locale } = useContext(LocalizationContext);
  const { themeData, setMode } = useContext(ThemeContext);
  const [currentNation, setCurrentNation] = useState({});
  const countriesWithFlags = [
    { title: 'vi', label: i18n.t('Vietnamese'), image: IMGS.vi },
    { title: 'en', label: i18n.t('English'), image: IMGS.usa }
  ];

  const theme = [
    { title: 'light', label: 'Light', image: IMGS.lightTheme },
    { title: 'dark', label: 'Dark', image: IMGS.darkTheme }
  ];

  useEffect(() => {
    setCurrentNation(countriesWithFlags.find((item) => locale == item.title));
  }, [locale]);
  return (
    <View
      style={[styles.container, { backgroundColor: themeData.backgroundColor }]}
    >
      <View style={styles.settingOptionContainer}>
        <Text style={(styles.settingOptionText, { color: themeData.color })}>
          {i18n.t('Language')}
        </Text>
        <SelectDropdown
          data={countriesWithFlags}
          onSelect={(selectedItem, index) => {
            setLocale(selectedItem.title);
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                <Image
                  source={
                    selectedItem ? selectedItem.image : currentNation.image
                  }
                  style={styles.dropdown3BtnImage}
                />
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.label : currentNation.label}
                </Text>
                <FontAwesome name='chevron-down' color={'#444'} size={18} />
              </View>
            );
          }}
          dropdownStyle={styles.dropdown3DropdownStyle}
          rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                <Image source={item.image} style={styles.dropdownRowImage} />
                <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.settingOptionContainer}>
        <Text style={(styles.settingOptionText, { color: themeData.color })}>
          {i18n.t('Theme')}
        </Text>
        <SelectDropdown
          data={theme}
          onSelect={(selectedItem, index) => {
            setMode(selectedItem.title);
            // EventRegister.emit("changeMode", selectedItem.title);
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                {selectedItem ? (
                  <Image
                    source={selectedItem.image}
                    style={styles.dropdown3BtnImage}
                  />
                ) : (
                  <Icon name='contrast-outline' color={'#444'} size={20} />
                )}
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.label : i18n.t('SelectTheme')}
                </Text>
                <FontAwesome name='chevron-down' color={'#444'} size={18} />
              </View>
            );
          }}
          dropdownStyle={styles.dropdown3DropdownStyle}
          rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                <Image source={item.image} style={styles.dropdownRowImage} />
                <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  settingOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  settingOptionText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  dropdown3BtnStyle: {
    width: 200,
    height: 40,
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444'
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  dropdown3BtnImage: {
    width: 40,
    height: 30,
    resizeMode: 'cover'
  },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12
  },
  dropdown3DropdownStyle: { backgroundColor: 'white' },
  dropdown3RowStyle: {
    backgroundColor: 'white',
    height: 45
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  dropdownRowImage: { width: 30, height: 30, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 12
  }
});
