import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDb } from "../../services/index.mjs";
import { response, handleError } from "../../responses/index.mjs";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.MESSAGES_TABLE;

export async function postMessage(event) {
	try {
		const { username, messageText } = JSON.parse(event.body ?? "{}");

		if (!username || !messageText) {
			console.error("Missing required fields: username or messageText.");
			return response(400, {
				error: "Both username and messageText are required",
			});
		}

		if (username.length < 3 || username.length > 42) {
			console.error("Username validation failed.");
			return response(400, {
				error: "Username must be between 3 and 42 characters long",
			});
		}

		if (messageText.length < 1 || messageText.length > 280) {
			console.error("MessageText validation failed.");
			return response(400, {
				error: "Message text must be between 1 and 280 characters long",
			});
		}

		const newMessage = {
			pk: "MSG",
			sk: uuidv4(),
			username,
			messageText,
			createdAt: new Date().toISOString(),
		};

		const dynamoDb = await getDynamoDb();
		await dynamoDb.send(
			new PutCommand({ TableName: TABLE_NAME, Item: newMessage })
		);
		console.log("Message successfully created:", newMessage);

		// Inkludera 'id' i svaret
		return response(201, { newMessage: { ...newMessage, id: newMessage.sk } });
	} catch (error) {
		console.error("Error creating message:", error);
		return handleError("creating message", error);
	}
}
