import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import documentClient from "./database.js";

const TableName = "agriculture_india";

async function getAllProducts() {


  let item_count = 0;
  let allItems = []; // Array to store all scanned items
  try {
    let response;
    let params = {
      TableName: TableName,
    };
 
    do {
      response = await documentClient.send(new ScanCommand(params));
      item_count += response.Items.length;
 
      // Add scanned items to the allItems array
      response.Items.forEach(item => {
        allItems.push(item);
      });
 
      // If LastEvaluatedKey exists, set it in params to paginate
      if (response.LastEvaluatedKey) {
        params.ExclusiveStartKey = response.LastEvaluatedKey;
        console.log(`Fetched ${response.Items.length} items. Total items so far: ${item_count}`);
      }
    } while (response.LastEvaluatedKey);
 
    console.log("Total number of items found:", item_count);
    // console.log(allItems)
    return allItems; // Return the array containing all scanned items
  } catch (error) {
    console.error("Error scanning DynamoDB table:", error);
    throw error;
  }
}

export default getAllProducts;
