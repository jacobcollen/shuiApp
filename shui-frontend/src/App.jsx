import React, { useState, useEffect } from "react";
import MessageList from "./components/messageList/MessageList";
import PostMessageBtn from "./components/postMessageBtn/PostMessageBtn";
import { getMessages } from "./api";
import "./index.css";

function App() {
	const [messages, setMessages] = useState([]);
	const [currentUser, setCurrentUser] = useState(
		localStorage.getItem("username") || ""
	);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const data = await getMessages();
			if (data.messages) {
				setMessages(data.messages);
			} else {
				console.error("Misslyckades med att ladda meddelanden:", data);
			}
		} catch (error) {
			console.error("Fel vid hämtning av meddelanden:", error);
		}
	};

	const handleSetUser = (username) => {
		setCurrentUser(username);
		localStorage.setItem("username", username);
	};

	return (
		<div className="app">
			<MessageList
				messages={messages}
				currentUser={currentUser}
				refreshMessages={fetchMessages}
			/>
			<PostMessageBtn
				currentUser={currentUser}
				setUser={handleSetUser}
				refreshMessages={fetchMessages}
			/>
		</div>
	);
}

export default App;
