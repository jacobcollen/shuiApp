export function response(statusCode, body = null) {
	return {
		statusCode,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type, x-username",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		},
		body: body ? JSON.stringify(body) : null,
	};
}

export function handleError(operation, error) {
	console.error(`Error ${operation}:`, error.message || error);
	if (error.stack) {
		console.error(`Stack trace: ${error.stack}`);
	}

	return response(500, {
		error: `Error ${operation}`,
		details: error.message || "Unexpected error.",
	});
}
