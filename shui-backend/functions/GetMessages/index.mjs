import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDb } from "../../services/index.mjs";
import { response, handleError } from "../../responses/index.mjs";

const TABLE_NAME = process.env.MESSAGES_TABLE;

export async function getMessages(event) {
	console.log("Received event:", JSON.stringify(event));

	try {
		const dynamoDb = await getDynamoDb();
		const { Items } = await dynamoDb.send(
			new QueryCommand({
				TableName: TABLE_NAME,
				IndexName: "CreatedAtIndex",
				KeyConditionExpression: "pk = :pk",
				ExpressionAttributeValues: { ":pk": "MSG" },
				ScanIndexForward: false,
			})
		);

		if (!Items || Items.length === 0) {
			console.log("No messages found in the database");
			return response(200, {
				messages: [],
				message: "The database contains no messages",
			});
		}

		const filteredItems = Items.map(
			({ sk, username, messageText, createdAt, updatedAt }) => ({
				id: sk,
				username,
				messageText,
				createdAt,
				updatedAt,
			})
		);

		return response(200, { messages: filteredItems });
	} catch (error) {
		console.error("Error retrieving messages:", error);
		return handleError("retrieving messages", error);
	}
}
