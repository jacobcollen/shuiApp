import { getMessage } from '../functions/GetMessage/index.mjs';
import { getMessages } from '../functions/GetMessages/index.mjs';
import { postMessage } from '../functions/PostMessage/index.mjs';
import { updateMessage } from '../functions/UpdateMessage/index.mjs';
import { deleteMessage } from '../functions/DeleteMessage/index.mjs';
import { response, handleError } from '../responses/index.mjs'; 

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let dynamoDb;

export async function getDynamoDb() {
  if (!dynamoDb) {
    const client = new DynamoDBClient({ region: "eu-north-1" });
    dynamoDb = DynamoDBDocumentClient.from(client);
  }
  return dynamoDb;
};

export {
  getMessage,
  getMessages,
  postMessage,
  deleteMessage,
  updateMessage,
  response,
  handleError,
};
