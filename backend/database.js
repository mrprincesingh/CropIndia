import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA57F2A3LJ5X6JUBX5",
    secretAccessKey: "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",
  },
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
  convertTopLevelContainer: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };
const documentClient = DynamoDBDocumentClient.from(dbClient, translateConfig);

export default documentClient;