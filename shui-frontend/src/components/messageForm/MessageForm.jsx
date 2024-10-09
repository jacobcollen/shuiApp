import { useState } from "react";
import "./Messageform.css";
import PropTypes from "prop-types";
import { postMessage } from "../../../api";

const MessageForm = ({ fetchMessages }) => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postMessage({ messageText });
    setMessageText("");
    fetchMessages(); // Refresh the message list after submitting
  };

  return (
    <form className="messageForm" onSubmit={handleSubmit}>
      <textarea
        className="messageForm__textarea"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Write your message..."
      />
      <button className="messageForm__submit" type="submit">
        Post
      </button>
    </form>
  );
};

MessageForm.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default MessageForm;
