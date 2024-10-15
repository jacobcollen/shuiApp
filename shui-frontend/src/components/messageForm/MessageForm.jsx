import React, { useState } from "react";
import { postMessage, updateMessage } from "../../api";
import "./MessageForm.css";

function MessageForm({
	onClose,
	currentUser,
	setUser,
	refreshMessages,
	messageToEdit = null,
}) {
	const [username, setUsername] = useState(currentUser || "");
	const [messageText, setMessageText] = useState(
		messageToEdit ? messageToEdit.messageText : ""
	);

	const isEditing = !!messageToEdit;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!username.trim() || !messageText.trim()) {
			alert("Username and message text are required.");
			return;
		}

		// Validering enligt backend-regler
		if (username.length < 3 || username.length > 42) {
			alert("The username must be between 3 and 42 characters.");
			return;
		}

		if (messageText.length < 1 || messageText.length > 280) {
			alert("The message must be between 1 and 280 characters.");
			return;
		}

		try {
			if (isEditing) {
				const response = await updateMessage(
					messageToEdit.id,
					{ messageText },
					currentUser
				);

				if (response.updatedMessage) {
					refreshMessages();
					onClose();
				} else {
					alert(`Error by updating ${response.error}`);
				}
			} else {
				const response = await postMessage({
					username,
					messageText,
				});

				if (response.newMessage) {
					refreshMessages();
					onClose();
					if (!currentUser) {
						setUser(username);
					}
				} else {
					alert(`Error by posting ${response.error}`);
				}
			}
		} catch (error) {
			console.error(
				`Error ${isEditing ? "Uppdate" : "Posting"}:`,
				error
			);
			alert(
				`Error ${isEditing ? "Uppdate" : "Posting"}: ${error.message}`
			);
		}
	};

	return (
		<div className="message-form-modal">
			<form onSubmit={handleSubmit}>
				{!currentUser && (
					<input
						type="text"
						placeholder="Your name"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				)}
				<textarea
					placeholder="Whats on your mind ..."
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					maxLength={280}
				/>
				<button className="edit-btn form-edit-btn" type="submit">
					{isEditing ? "Uppdate" : "Post"} Message
				</button>
				<button className="delete-btn form-edit-btn" type="button" onClick={onClose}>
					{" "} Cancel
				</button>
			</form>
		</div>
	);
}

export default MessageForm;
