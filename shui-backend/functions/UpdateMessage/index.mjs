import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDb } from "../../services/index.mjs";
import { response, handleError } from "../../responses/index.mjs";

const TABLE_NAME = process.env.MESSAGES_TABLE;

export async function updateMessage(event) {
  const { id } = event.pathParameters ?? {};
  const { messageText } = JSON.parse(event.body ?? "{}");

  if (!id) {
    return response(400, { error: "ID is required" });
  }

  if (!messageText) {
    return response(400, { error: "Message text is required" });
  }

  try {
    const dynamoDb = await getDynamoDb();

    const { Item } = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { pk: "MSG", sk: id },
      })
    );

    if (!Item) {
      return response(404, { error: "Message not found" });
    }

    const { username: existingUsername } = Item;
    const currentUser = event.headers["x-username"];

    if (currentUser !== existingUsername) {
      return response(403, {
        error: "You are not allowed to update this message.",
      });
    }

    const updatedAt = new Date().toISOString();
    const { Attributes } = await dynamoDb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk: "MSG", sk: id },
        UpdateExpression:
          "set messageText = :messageText, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":messageText": messageText,
          ":updatedAt": updatedAt,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return response(200, { updatedMessage: Attributes });
  } catch (error) {
    return handleError("updating message", error);
  }
}
