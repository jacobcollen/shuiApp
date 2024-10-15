import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDb } from "../../services/index.mjs";
import { response, handleError } from "../../responses/index.mjs";

const TABLE_NAME = process.env.MESSAGES_TABLE;

export async function getMessage(event) {
	const { id } = event.pathParameters ?? {};

	if (!id) {
		console.error("ID is required but not provided.");
		return response(400, { error: "ID is required" });
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
			console.log(`Message with ID ${id} not found.`);
			return response(404, { error: "Message not found" });
		}

		return response(200, {
			message: {
				id: Item.sk,
				username: Item.username,
				messageText: Item.messageText,
				createdAt: Item.createdAt,
				updatedAt: Item.updatedAt || null,
			},
		});
	} catch (error) {
		console.error(`Error retrieving message with ID ${id}:`, error);
		return handleError("retrieving message", error);
	}
}
