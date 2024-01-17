import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage,
  setCurrentPage
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={handlePrevious} disabled={currentPage === 1}>
        <Text style={[styles.paginationButton]}>
          <Entypo name='chevron-thin-left' size={15} color='black' />
        </Text>
      </TouchableOpacity>

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <TouchableOpacity
          key={pageNumber + 1}
          onPress={() => handlePageClick(pageNumber + 1)}
        >
          <Text
            style={[
              styles.paginationButton,
              styles.paginationButtonText,
              currentPage === pageNumber + 1 && styles.activePage
            ]}
          >
            {pageNumber + 1}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleNext}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.paginationButton]}>
          <Entypo name='chevron-thin-right' size={15} color='black' />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  paginationButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  activePage: {
    backgroundColor: COLORS.primary,
    color: COLORS.white
  }
});

export default Pagination;
