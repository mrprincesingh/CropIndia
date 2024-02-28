import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA57F2A3LJ5X6JUBX5",
    secretAccessKey: "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",
  },
});
const documentClient = DynamoDBDocumentClient.from(dbClient);

export default documentClient;
