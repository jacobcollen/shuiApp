import React, { useState } from "react";
import MessageForm from "../messageForm/MessageForm";
import { LuPenSquare } from "react-icons/lu";
import "./PostMessageBtn.css";

function PostMessageBtn({ currentUser, setUser, refreshMessages }) {
	const [showForm, setShowForm] = useState(false);

	const handleOpenForm = () => setShowForm(true);
	const handleCloseForm = () => setShowForm(false);

	return (
		<>
			<button className="post-message-btn" onClick={handleOpenForm}>
				<LuPenSquare className="pen-icon" />
			</button>
			{showForm && (
				<MessageForm
					onClose={handleCloseForm}
					currentUser={currentUser}
					setUser={setUser}
					refreshMessages={refreshMessages}
				/>
			)}
		</>
	);
}

export default PostMessageBtn;
