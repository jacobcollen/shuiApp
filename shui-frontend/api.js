import axios from "axios";

const API_URL = "https://4a1acwbxsa.execute-api.eu-north-1.amazonaws.com/dev";

// Fetch all messages
export const fetchMessages = async () => {
  const response = await axios.get(`${API_URL}/messages`);
  return response.data.messages;
};

// Post a new message with dynamic username
export const postMessage = async ({ username, messageText }) => {
  const response = await axios.post(`${API_URL}/messages`, {
    username,
    messageText,
  });
  return response.data.newMessage;
};

// Update an existing message (PUT)
export const putMessage = async ({ id, username, messageText }) => {
  const response = await axios.put(
    `${API_URL}/messages/${id}`,
    {
      messageText,
    },
    {
      headers: { "username-x": username },
    }
  );
  return response.data.updatedMessage;
};

// Delete a message with dynamic username
export const deleteMessage = async (id, username) => {
  await axios.delete(`${API_URL}/messages/${id}`, {
    headers: { "username-x": username },
  });
};
