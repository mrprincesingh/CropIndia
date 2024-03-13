import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCrop } from "../../Redux/action";
import {
  Box,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  useDisclosure,
  Select as ChakraSelect,
  Button,
} from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import { DataGrid } from "@mui/x-data-grid";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const allStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Puducherry",
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, CropData } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [stateName, setStateName] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    dispatch(getCrop({ state: stateName, year: selectYear, crop: selectedCrop }));
  }, [dispatch, stateName, selectYear, selectedCrop]);

  const data = CropData.data?.products || [];

  const rows = Array.isArray(data)
    ? data.map((row, index) => ({
        id: index + 1,
        Crop: row.Crop,
        Season: row.Season,
        Area: Number(row.Area),
        Year: Number(row.Year),
        Production: `${Number(row.Production)} Tonnes`,
        Area_Units: row.Area_Units,
        State: row.State,
        District: row.District,
        Yield: Number(row.Yield),
      }))
    : [];

    const columns = [
      { field: "id", headerName: "ID", flex: 1 },
      { field: "Crop", headerName: "Crop", flex: 1 },
      { field: "Season", headerName: "Season", flex: 1 },
      { field: "Area", headerName: "Area", flex: 1 },
      { field: "Year", headerName: "Year", flex: 1 },
      { field: "Production", headerName: "Production", flex: 1 },
      { field: "Area_Units", headerName: "Area Units", flex: 1 },
      { field: "State", headerName: "State", flex: 1 },
      { field: "District", headerName: "District", flex: 1 },
      { field: "Yield", headerName: "Yield", flex: 1 },
    ];

  const calculateMaxValue = (data) => {
    return Math.max(...data);
  };

  const cropData = CropData.totalProductionPerCropArray || [];
  const yearData = CropData.totalProductionPerYearArray || [];

  // Map data for the crop-wise bar chart
  const cropNames = cropData.map((item) => item.crop);
  const productionValues = cropData.map((item) => item.totalProduction);

  const cropChartData = {
    labels: cropNames,
    datasets: [
      {
        label: "Crop-wise Production",
        data: productionValues,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  // Map data for the year-wise table
  const yearRows = yearData.map((row, index) => ({
    id: index + 1,
    Year: row.year,
    Production: row.totalProduction,
  }));

  const yearNames = yearRows.map((item) => item.Year);
  const yearProductionValues = yearRows.map((item) => item.Production);

  const yearChartData = {
    labels: yearNames,
    datasets: [
      {
        label: "Year-wise Production",
        data: yearProductionValues,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
    ],
  };

  const maxCropValue = calculateMaxValue(productionValues);
  const maxYieldValue = calculateMaxValue(yearProductionValues);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Production of the Crops",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: maxCropValue,
      },
    },
  };

  const option1 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Production of the Year",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: maxYieldValue,
      },
    },
  };

  const chartRef = useRef();
  const charCropRef = useRef();

  const handleReset = () => {
    setStateName("");
    setSelectYear("");
    setSelectedCrop("");
  };

  const onClick = (e) => {
    if (getElementsAtEvent(chartRef.current, e).length > 0) {
      setSelectYear(yearChartData.labels[getElementsAtEvent(chartRef.current, e)[0].index]);
    }
  };

  const onCropClick = (e) => {
    if (getElementsAtEvent(charCropRef.current, e).length > 0) {
      setSelectedCrop(cropChartData.labels[getElementsAtEvent(charCropRef.current, e)[0].index]);
    }
  };
  const handleChange = (event, type) => {
    const {
      target: { value },
    } = event;
    if (type === "state") {
      setStateName(typeof value === "string" ? value.split(",") : value);
    }
    onClose();
  };

  return (
    <Box w="100%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select State</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <ChakraSelect
                placeholder="Select State"
                value={stateName}
                onChange={(e) => handleChange(e, "state")}
              >
                {allStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </ChakraSelect>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex p={4} alignItems="center" w="100%" gap={3} margin="auto">
        <Box>
          <FormControl>
            <ChakraSelect
              placeholder="Select State"
              value={stateName}
              onChange={(e) => handleChange(e, "state")}
            >
              {allStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </ChakraSelect>
          </FormControl>
        </Box>

        <Box>
          <Button onClick={handleReset} colorScheme="red">
            Reset
          </Button>
        </Box>
      </Flex>

      {isLoading ? (
        <Box w="80%" m="auto" mt={10}>
          <Stack spacing={4}>
            <Skeleton height="150px" />
            <Skeleton height="250px" />
            <Skeleton height="300px" />
          </Stack>
        </Box>
      ) : (
        <>
          {cropData.length > 0 ? (
            <Box w="90%" m="auto">
              <Bar options={options} onClick={onCropClick} ref={charCropRef} data={cropChartData} />
            </Box>
          ) : (
            <Box w="90%" m="auto" textAlign="center" mt={4}>
       
            </Box>
          )}

          <Box marginTop={100}>
            {yearData.length > 0 ? (
              <Box w="90%" m="auto" mt={4}>
                <Bar options={option1} data={yearChartData} onClick={onClick} ref={chartRef} />
              </Box>
            ) : (
              <Box w="90%" m="auto" textAlign="center" mt={4}>
             
              </Box>
            )}
          </Box>

          <Box marginTop={16}>
            {rows.length > 0 ? (
              <Box w="80%" margin="auto">
                <DataGrid
                  style={{ height: "350px" }}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  enableColumnResize
                  pageSizeOptions={[5, 25, 50, 100]}
                  disableRowSelectionOnClick
                  disableColumnMenu
                />
              </Box>
            ) : (
              <Box w="80%" margin="auto" textAlign="center" mt={4}>
                No data available.
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
