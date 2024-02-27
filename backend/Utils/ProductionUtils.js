// productionUtils.js

const calculateProductionPerYear = (data) => {
   
    const productionPerYear = {};

    for (const row of data) {
      const year = row.Year;
      const production = parseFloat(row.Production);
    
      if (!productionPerYear[year]) {
        productionPerYear[year] = 0;
      }
    
      productionPerYear[year] += production;
    }
  
    return productionPerYear;
};

const calculateProductionPerCrop = (data) => {
    const productionPerCrop = {};
  
    for (const row of data) {
      const crop = row.Crop;
      const production = parseFloat(row.Production);
  
      if (!productionPerCrop[crop]) {
        productionPerCrop[crop] = 0;
      }
  
      productionPerCrop[crop] += production;
    }
  
    return productionPerCrop;
  };
  
  const convertProductionUnitsToTonnes = (data) => {
    if (!Array.isArray(data)) {
      console.error('Error: Data is not an array.');
      return [];
    }
  
    const unitConversionFactors = {
      tonnes: 1,
      bales: 0.002,
      nuts:1.4*0.001
    };
  
    return data.map((row) => {
      if (!row || typeof row !== 'object') {
        console.error('Error: Invalid row format.', row);
        return row;
      }
  
      const production = parseFloat(row.Production);
      const productionUnits = (row['Production Units'] || '').toLowerCase();
  
      if (unitConversionFactors[productionUnits] !== undefined) {
        const conversionFactor = unitConversionFactors[productionUnits];
        const convertedProduction = production * conversionFactor;
  
        // Round to 2 decimal places
        const roundedProduction = Math.round(convertedProduction * 100) / 100;
  
        return { ...row, Production: roundedProduction, 'Production Units': 'tonnes' };
      }
  
      console.error('Error: Unknown production unit.', productionUnits);
      return row;
    });
  };
  

// Function to filter data based on year
const filterDataByYear = (data, year) => {
    return data.filter((row) => row.Year === year);
  };
  
  // Function to filter data based on state
  const filterDataByState = (data, state) => {
    return data.filter((row) => row.State === state);
    
  };
  
  // Function to filter data based on district
  const filterDataByDistrict = (data, district) => {
    return data.filter((row) => row.District === district);
  };

  const sortData = (data, column) => {
    return data.slice().sort((a, b) => {
      const valueA = (a[column] || '').toLowerCase(); // Ensure it's a string and handle potential undefined
      const valueB = (b[column] || '').toLowerCase();
  
      // Compare districts and then crops within the same district
      if (column === 'District') {
        if (valueA === valueB) {
          // If the districts are the same, compare crops
          const cropA = (a['Crop'] || '').toLowerCase();
          const cropB = (b['Crop'] || '').toLowerCase();
          return cropA.localeCompare(cropB);
        }
      }
  
      return valueA.localeCompare(valueB);
    });
  };
  
  export const filterDataByCrop = (data, crop) => {
    if (!crop) {
      return data;
    }
    return data.filter((row) => row.Crop.toLowerCase() === crop.toLowerCase());
  };

  
  

  
export { calculateProductionPerYear,filterDataByYear,filterDataByState ,filterDataByDistrict,calculateProductionPerCrop,convertProductionUnitsToTonnes,sortData};