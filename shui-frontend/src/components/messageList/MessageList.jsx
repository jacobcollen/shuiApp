import "./Messagelist.css";

const MessageList = ({ messages }) => {
  return (
    <ul className="messageList">
      {messages.map((message) => (
        <li key={message.sk} className="messageList__item">
          <p className="messageList__name">{message.username}</p>
          <p className="messageList__text">{message.messageText}</p>
          <p className="messageList__timestamp">
            {message.updatedAt
              ? `Edited: ${new Date(message.updatedAt).toLocaleString()}`
              : `Created: ${new Date(message.createdAt).toLocaleString()}`}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
