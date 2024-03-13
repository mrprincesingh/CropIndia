import getAllProducts from "../server.js";



export const getDataByYearAndState = async (req, res) => {
  try {
    let products
    
    if(req.query.state){
    
      if(req.query.year){
      
        if(req.query.crop){
        
          products = await getAllProducts({
            KeyConditionExpression: "#s = :s AND begins_with(#c, :c)",
            FilterExpression: "begins_with(#y, :y)",
            ExpressionAttributeNames: {
              "#s": "State",
              "#y": "year_sort_id",
              "#c": "crop_sort_id",
        },
        ExpressionAttributeValues: { ":s": req.query.state, ":y": req.query.year, ":c": req.query.crop },
      });
    }else{
 
      products = await getAllProducts({
        IndexName: "State-year_sort_id-index",
        KeyConditionExpression: "#s = :s AND begins_with(#y, :y)",
        ExpressionAttributeNames: { "#s": "State", "#y": "year_sort_id" },
        ExpressionAttributeValues: { ":s": req.query.state, ":y": req.query.year },
      });
    }
   }else{
    
    if (req.query.crop ) {
   
      products = await getAllProducts({
        KeyConditionExpression: "#s = :s AND begins_with(#c , :c)",
        ExpressionAttributeNames: { "#s": "State", "#c": "crop_sort_id" },
        ExpressionAttributeValues: { ":s": req.query.state, ":c": req.query.crop },
      });
    } else {

    
      products = await getAllProducts({
        KeyConditionExpression: "#s = :s",
        ExpressionAttributeNames: { "#s": "State" },
        ExpressionAttributeValues: { ":s": req.query.state },
      });
    }
   }
  }else {
    console.log(" ")
  }

  const totalProductionPerCropArray = [];
  const totalProductionPerYearArray = [];
  
  // Iterate through products array
  if(products){
     products.forEach(product => {
    const crop = product.Crop;
    const year = product.Year;
    const production = parseFloat(product.Production); 
  
    // Calculate total production per crop
    const existingCropIndex = totalProductionPerCropArray.findIndex(item => item.crop === crop);
    if (existingCropIndex !== -1) {
      totalProductionPerCropArray[existingCropIndex].totalProduction += production;
    } else {
      totalProductionPerCropArray.push({
        crop,
        totalProduction: production
      });
    }
  
    // Calculate total production per year
    const existingYearIndex = totalProductionPerYearArray.findIndex(item => item.year === year);
    if (existingYearIndex !== -1) {
      totalProductionPerYearArray[existingYearIndex].totalProduction += production;
    } else {
      totalProductionPerYearArray.push({
        year,
        totalProduction: production
      });
    }
  });
  }
 
  

   res.status(200).json({ success: true,   data: { products },totalProductionPerCropArray,totalProductionPerYearArray });
  } catch (error) {
    console.error('Error getting data by year and state:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};














 
