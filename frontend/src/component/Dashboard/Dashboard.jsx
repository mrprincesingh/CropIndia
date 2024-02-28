import React, { useEffect, useState } from 'react';

import loader from "../../asset/820.gif";
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCrop, getCrop1 } from '../../Redux/action';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Box, Grid, GridItem, Image, Button, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Total Production of the Crops',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      max: 10000000,
    },
  },
};

const names = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
const yearSelect = [
  "1997-98", "1998-99", "1999-00", "2000-01", "2001-02", "2002-03",
  "2003-04", "2004-05", "2005-06", "2006-07", "2007-08", "2008-09",
  "2009-10", "2010-11", "2011-12", "2012-13", "2013-14", "2014-15",
  "2015-16", "2016-17", "2017-18", "2018-19", "2019-20", "2020-21"
];

const Dashboard = () => {
  const { isLoading, isError, CropData } = useSelector((state) => state.reducer);

  const dispatch = useDispatch();
  const [personName, setPersonName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  

  const fetchData = () => {
    dispatch(getCrop({ state: personName, year: selectedYear }));
  };

  const fetchData1 = () => {
    dispatch(getCrop1());
  };
  useEffect(() => {
    fetchData();
    fetchData1()
  }, []);


  if (isLoading || isError || !CropData || !CropData.formattedCropData || !CropData.formattedYearlyData) {
    return (
      <div>
        <Box
          w="100%"
          h="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image margin="auto" w="100px" src={loader} alt="loader" />
        </Box>
      </div>
    );
  }
let updatedState = CropData.productionData
  const handleReset = () => {
    setPersonName("");
    setSelectedYear("");

    fetchData1();
  };

  const formattedCropData = Object.fromEntries(
    Object.entries(CropData.formattedCropData)
      .map(([key, value]) => [key, parseInt(value)])
      .filter(([key, value]) => !isNaN(value))
  );

  const cropLabels = Object.keys(formattedCropData);
  const cropProduction = Object.values(formattedCropData);

  const data = {
    labels: cropLabels,
    datasets: [
      {
        label: 'Crop Production Per Tonnes',
        data: cropProduction,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const sortedYearlyData = Object.entries(CropData.formattedYearlyData)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const yearlyData = {
    labels: Object.keys(sortedYearlyData),
    datasets: [
      {
        label: 'Yearly Crop Production Per Tonnes',
        data: Object.values(sortedYearlyData),
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <Box w="100%">
      <Grid w="95%" gap={2} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} m="auto" >
        <GridItem>
          <Bar options={options} data={data} />
        </GridItem>
        <GridItem>
          <Bar options={options} data={yearlyData} />
        </GridItem>
      </Grid>

      <Box w="80%" m='auto' mt="3" display="flex" justifyContent="space-between" >
        <Button onClick={handleReset}>
          Reset
        </Button>

        <Button onClick={handleSearch}>
          Search
        </Button>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">State</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-year-label">Year</InputLabel>
          <Select
            labelId="demo-multiple-year-label"
            id="demo-multiple-year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            input={<OutlinedInput label="Year" />}
            MenuProps={MenuProps}
          >
            {yearSelect.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
            </Tr>
          </Thead>
          <Tbody>
            {updatedState.map((data, index) => (
              <Tr key={index}>
                 <Td>{data.state}</Td> 
                <Td>{data.Year}</Td>
                <Td>{data.Crop}</Td>
                <Td>{data.District}</Td>
                <Td>{data.Area}</Td>
                <Td>{Math.floor(data.Yield)}</Td>
                <Td>{data.Production} Tonnes</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
