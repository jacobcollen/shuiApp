export async function response(statusCode, body = null) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    };
}

export async function handleError(operation, error) {
    console.error(`Error ${operation}:`, error.message || error);
    if (error.stack) {
        console.error(`Stack trace: ${error.stack}`);
    }

    return response(500, { 
        error: `Error ${operation}`, 
        details: error.message || "Unexpected error." 
    });
}