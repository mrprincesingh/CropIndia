import React from 'react';
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Tfoot, Button, Box } from '@chakra-ui/react';

const TableComponent = ({ cropData, onPageChange, currentPage, totalPage }) => {

  console.log('cropData:', cropData);
  console.log('currentPage:', currentPage);
  console.log('totalPage:', totalPage);
  const itemsPerPage = 5; 

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          colorScheme={currentPage === i ? 'blue' : 'gray'}
          onClick={() => handleClick(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = cropData.slice(startIndex, endIndex);

  return (
    <div>
    
    </div>
  );
};

export default TableComponent;
