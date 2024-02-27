import React from 'react';
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Tfoot } from '@chakra-ui/react';

const TableComponent = ({ cropData }) => {
  return (
    <div>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Crop Data</TableCaption>
          <Thead>
            <Tr>
              <Th>State</Th>
              <Th>Year</Th>
              <Th>Crop</Th>
              <Th>District</Th>
              <Th>Area</Th>
              <Th>Yield</Th>
              <Th>Production</Th>
              {/* Add more Th for additional properties in your data */}
            </Tr>
          </Thead>
          <Tbody>
            {cropData.map((data, index) => (
              <Tr key={index}>
                <Td>{data.state}</Td>
                <Td>{data.Year}</Td>
                <Td>{data.Crop}</Td>
                <Td>{data.District}</Td>
                <Td>{data.Area}</Td>
                <Td>{Math.floor(data.Yield)}</Td>
                <Td>{data.Production} Tonnes</Td>
                {/* Add more Td for additional properties in your data */}
              </Tr>
            ))}
          </Tbody>
        
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
