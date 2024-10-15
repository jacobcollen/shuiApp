import React from "react";
import MessageItem from "../messageItem/MessageItem";
import "./MessageList.css";

function MessageList({ messages, currentUser, refreshMessages }) {
	return (
		<div className="message-list">
			{messages.length === 0 ? (
				<p>No messages to show.</p>
			) : (
				messages.map((message) => (
					<MessageItem
						key={message.id}
						message={message}
						currentUser={currentUser}
						refreshMessages={refreshMessages}
					/>
				))
			)}
		</div>
	);
}

export default MessageList;
