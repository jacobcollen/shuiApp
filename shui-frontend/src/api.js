const API_ENDPOINT =
	"https://a7lsd82pcf.execute-api.eu-north-1.amazonaws.com/prod/messages";

export const getMessages = async () => {
	const response = await fetch(`${API_ENDPOINT}`);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error || "Något gick fel vid hämtning av meddelanden."
		);
	}
	return response.json();
};

export const postMessage = async (message) => {
	const response = await fetch(`${API_ENDPOINT}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-username": message.username,
		},
		body: JSON.stringify({
			username: message.username,
			messageText: message.messageText,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error || "Något gick fel vid postning av meddelande."
		);
	}

	return response.json();
};

export const updateMessage = async (id, message, username) => {
	const response = await fetch(`${API_ENDPOINT}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-username": username,
		},
		body: JSON.stringify(message),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error || "Något gick fel vid uppdatering av meddelande."
		);
	}

	return response.json();
};

export const deleteMessage = async (id, username) => {
	const response = await fetch(`${API_ENDPOINT}/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error || "Något gick fel vid borttagning av meddelande."
		);
	}

	return response.json();
};
