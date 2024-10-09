import { useEffect, useState } from "react";
import MessageList from "./components/messageList/MessageList";
import MessageForm from "./components/messageForm/MessageForm";
import Button from "./components/button/button";
import { fetchMessages } from "../api";
import "./index.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");

  // Hämta och uppdatera meddelanden
  const fetchAndSetMessages = async () => {
    const fetchedMessages = await fetchMessages();
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    fetchAndSetMessages();
  }, []);

  // Hantera knapptryck för nytt inlägg
  const handleNewPostClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="app">
      {/* Visa lista med meddelanden */}
      <MessageList messages={messages} username={username} />

      {/* Visa formuläret om showForm är true */}
      {showForm && (
        <MessageForm fetchMessages={fetchAndSetMessages} username={username} />
      )}

      {/* Knapp för att lägga till nytt inlägg */}
      <Button onClick={handleNewPostClick} />
    </div>
  );
};

export default App;
