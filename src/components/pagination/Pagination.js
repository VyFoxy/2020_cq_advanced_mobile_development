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

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;
    let check = true;
    if (totalPages <= maxVisibleButtons) {
      // If total pages are less than or equal to maxVisibleButtons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(renderPageButton(i));
      }
    } else {
      // If total pages are more than maxVisibleButtons, show a subset
      const firstVisible = Math.max(
        currentPage > 1 ? currentPage - 2 : 1,
        currentPage - 1
      );
      const lastVisible = Math.min(
        totalPages,
        firstVisible + maxVisibleButtons - 1
      );

      // Always show the first page
      pageButtons.push(renderPageButton(firstVisible));

      // Show the visible pages
      for (let i = firstVisible + 1; i <= lastVisible; i++) {
        pageButtons.push(renderPageButton(i));
      }

      // Show '...' if the last page is not visible
      if (lastVisible < totalPages - 1) {
        pageButtons.push(renderEllipsis());
      }

      // Always show the last page
      if (check == true) {
        pageButtons.push(renderPageButton(totalPages));
        check = false;
      }
    }

    return pageButtons;
  };

  const renderPageButton = (pageNumber) => (
    <TouchableOpacity
      key={pageNumber}
      onPress={() => handlePageClick(pageNumber)}
    >
      <Text
        style={[
          styles.paginationButton,
          styles.paginationButtonText,
          currentPage === pageNumber && styles.activePage
        ]}
      >
        {pageNumber}
      </Text>
    </TouchableOpacity>
  );

  const renderEllipsis = () => (
    <Text key='ellipsis' style={styles.paginationButtonText}>
      ...
    </Text>
  );

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={handlePrevious} disabled={currentPage === 1}>
        <Text style={[styles.paginationButton]}>
          <Entypo name='chevron-thin-left' size={15} color={COLORS.primary} />
        </Text>
      </TouchableOpacity>

      {renderPageButtons()}

      <TouchableOpacity
        onPress={handleNext}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.paginationButton]}>
          <Entypo name='chevron-thin-right' size={15} color={COLORS.primary} />
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
    marginVertical: 40
  },
  paginationButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  paginationButtonText: {
    color: COLORS.primary
  },
  activePage: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 10
  }
});

export default Pagination;
