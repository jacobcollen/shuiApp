import React, { useState } from "react";
import MessageForm from "../messageForm/MessageForm";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { deleteMessage } from "../../api";
import "./MessageItem.css";

function MessageItem({ message, currentUser, refreshMessages }) {
	const [isEditing, setIsEditing] = useState(false);

	const canEditOrDelete = currentUser === message.username;

	const handleDelete = async () => {
		if (
			!window.confirm("Är du säker på att du vill ta bort detta meddelande?")
		) {
			return;
		}

		try {
			const response = await deleteMessage(message.id, currentUser);

			if (response.message === "Message deleted successfully") {
				refreshMessages();
			} else {
				alert(`Fel vid borttagning: ${response.error}`);
			}
		} catch (error) {
			console.error("Fel vid borttagning av meddelande:", error);
			alert(`Fel vid borttagning: ${error.message}`);
		}
	};

	return (
		<div className="message-item">
			<div className="message-header">
				<span className="username">{message.username}</span>
				<span className="created-at">
					{new Date(message.createdAt).toLocaleString()}
				</span>
			</div>
			<p className="message-text">{message.messageText}</p>
			{canEditOrDelete && (
				<div className="message-actions">
					<button className="edit-btn" onClick={() => setIsEditing(true)}>
						<LuPenSquare className="action-icon" />
						Edit
					</button>
					<button className="delete-btn" onClick={handleDelete}>
						<LuTrash2 className="action-icon" />
						Delete
					</button>
				</div>
			)}
			{isEditing && (
				<MessageForm
					onClose={() => setIsEditing(false)}
					currentUser={currentUser}
					refreshMessages={refreshMessages}
					messageToEdit={message}
				/>
			)}
		</div>
	);
}

export default MessageItem;
