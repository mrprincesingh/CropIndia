import {
  calculateProductionPerCrop,
  calculateProductionPerYear,
  convertProductionUnitsToTonnes,
  filterDataByCrop,
  filterDataByDistrict,
  filterDataByState,
  filterDataByYear,
  sortData,

} from "../Utils/ProductionUtils.js";
import getAllProducts from "../data.js";



const filterFunctions = [

  { key: 'state', filterFn: filterDataByState },
  { key: 'district', filterFn: filterDataByDistrict },
  { key: 'year', filterFn: filterDataByYear },
  { key: 'crop', filterFn: filterDataByCrop },
];

export const getDataByYearAndState = async (req, res, next) => {
  try {
    const cropsData = await getAllProducts();
    const year = req.query.year;
    const state = req.query.state;
    const district = req.query.district;
    const crop = req.query.crop;
    const page = req.query.page || 1;


    const itemsPerPage = 50;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let filteredData = cropsData;

    for (const filter of filterFunctions) {
      const { key, filterFn } = filter;
      if (req.query[key]) {
        filteredData = filterFn(filteredData, req.query[key]);
      }
    }

    if (district) {
      filteredData = filterDataByDistrict(filteredData, district);
    }

    if (crop) {
      filteredData = filterDataByCrop(filteredData, crop);
    }
    
    filteredData = convertProductionUnitsToTonnes(filteredData);
    const yearlyData = calculateProductionPerYear(filteredData);
    const cropdata = calculateProductionPerCrop(filteredData);


    const formatProductionData = (data) => {
      const formattedData = {};
      Object.entries(data).forEach(([key, production]) => {
        formattedData[key] = production;
      });
      return formattedData;
    };

    
    const formattedYearlyData = formatProductionData(yearlyData);
    const formattedCropData = formatProductionData(cropdata);

    
    if (state && !year) {
      let stateData = filterDataByState(filteredData, state);
      stateData = sortData(stateData, 'District');

      const paginatedData = stateData.slice(startIndex, endIndex);
      
      return res.json({
        success: true,
        formattedYearlyData,
        formattedCropData,
        productionData: paginatedData.map((row) => ({
          Year: row.Year,
          Crop: row.Crop,
          District: row.District,
          Area: row.Area,
          Production: parseFloat(row.Production),
          Yield: row.Yield,
          state: state,
        })),
        currentPage: page,
        totalPages: Math.ceil(stateData.length / itemsPerPage),
      });
    }


    const defaultSortColumn = 'District';
    filteredData = sortData(filteredData, defaultSortColumn);

    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.json({
      success: true,
      formattedYearlyData,
      formattedCropData,
      productionData: paginatedData.map((row) => ({
        Year: row.Year,
        Crop: row.Crop,
        District: row.District,
        Area: row.Area,
        Production: parseFloat(row.Production),
        Yield: row.Yield,
        state: state, 
      })),
      currentPage: page,
      totalPages: Math.ceil(filteredData.length / itemsPerPage),
    });
  } catch (error) {
    console.error("Error getting data by year and state:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};




