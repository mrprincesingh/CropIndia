import express from "express";
import { config } from "dotenv";
import cors from "cors";
import crops from "./route/indiancropRoute.js";

config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/indiancrop", crops);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

async function getAllProducts(queryParams = {}) {
  let item_count = 0;
  let allItems = [];
  let lastEvaluatedKey = null;

  try {
    do {
      const params = {
        TableName: "the_crop_india",
        ...queryParams,
        ExclusiveStartKey: lastEvaluatedKey,
      };
      const response = await documentClient.query(params).promise();

      if (response.Items) {
        item_count += response.Items.length;

        response.Items.forEach((item) => {
          allItems.push(item);
        });
      }

      lastEvaluatedKey = response.LastEvaluatedKey;
      console.log(
        `Fetched ${response.Items.length} items. Total items so far: ${item_count}`
      );
    } while (lastEvaluatedKey);

    console.log("Total number of items found:", item_count);

    return allItems;
  } catch (error) {
    console.error("Error querying DynamoDB table:", error);
    throw error;
  }
}

export default getAllProducts;
