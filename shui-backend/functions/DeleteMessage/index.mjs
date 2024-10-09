import { DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDb } from "../../services/index.mjs";
import { response, handleError } from "../../responses/index.mjs";

const TABLE_NAME = process.env.MESSAGES_TABLE;

export async function deleteMessage(event) {
  const { id } = event.pathParameters ?? {};
  const { username } = JSON.parse(event.body) ?? {};

  if (!id || !username) {
    return response(400, { error: "ID and username are required" });
  }

  try {
    const dynamoDb = await getDynamoDb();

    const { Item: existingMessage } = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { pk: "MSG", sk: id },
      })
    );

    if (!existingMessage) {
      return response(404, { error: "Message not found" });
    }

    if (existingMessage.username !== username) {
      return response(403, {
        error: "You are not allowed to delete this message.",
      });
    }

    await dynamoDb.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { pk: "MSG", sk: id },
      })
    );

    return response(200, { message: "Message deleted successfully" });
  } catch (error) {
    return handleError("deleting message", error);
  }
}
