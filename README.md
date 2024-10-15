# Shui Message Board Fullstack Mini Application
Shui Message Board is a browser-based fullstack mini application that allows users to read other people’s messages from a feed, as well as create, update, and delete their own messages. The application is designed to be simple yet efficient, using modern web development tools and cloud technologies.
## Development
- **Node.js (LTS)** – Required for running backend services and building the frontend.
- **Serverless Framework** – Manages AWS infrastructure and deploys the backend.
- **AWS CLI** – Configured with appropriate IAM permissions.
### Frontend
- **React + Vite** – For building, compiling, and bundling the frontend.
- **AWS S3** – Hosts the frontend as a static website.
- **Axios** – Handles HTTP requests to the backend.
### Backend
- **AWS Lambda** – Handles API requests in a serverless environment.
- **DynamoDB** – NoSQL database for storing messages.
- **API Gateway** – Manages API endpoints for backend interaction.
- **Serverless Framework** – Deploys and manage backend services.
## Base URL
`https://4a1acwbxsa.execute-api.eu-north-1.amazonaws.com/`
## API Endpoints
### 1. Get All Messages
**GET** `/messages`  
Retrieve all messages, sorted by creation date.
#### Response
- **200 OK** – Returns a list of messages.
```json
  {
    "messages": [
      {
        "username": "JohnDoe",
        "messageText": "This is a message",
        "createdAt": "2024-10-06T12:34:56.000Z"
      }
    ]
  }
```
- **200 OK** – Returns a message indicating no messages have been posted yet if the list is empty:
 ```json
{
  "messages": [],
  "message": "No messages have been posted yet"
}
```
<br>

### 2. Get a Single Message
**GET** `/messages/{id}`  
Retrieve a specific message by its ID.
#### Parameters
- **id** – (path parameter) – The ID of the message.
#### Response
- **200 OK** – Returns the message.
```json
 {
  "message": {
    "username": "JohnDoe",
    "messageText": "This is a message",
    "createdAt": "2024-10-06T12:34:56.000Z"
  }
}
```
- **404 Not Found** – Message not found.
```json
 {
  "error": "Message not found"
}
```
<br>

### 3. Create a Message
**POST** `/messages`  
Create a new message.
#### Request Body
```json
{
  "username": "JohnDoe",
  "messageText": "This is a message"
}
```
#### Response
- **201 Created** – Returns the newly created message.
```json
 {
  "newMessage": {
    "pk": "MSG",
    "sk": "123abc",
    "username": "JohnDoe",
    "messageText": "This is a message",
    "createdAt": "2024-10-06T12:34:56.000Z"
  }
}
```
- **400 Bad Request** – Invalid input.
 ```json
{
  "error": "Both username and message text are required"
}
```
<br>

### 4. Update a Message
**PUT** `/messages/{id}`  
Update an existing message by its ID. Only the message owner (the user who created the message) can update it.
#### Parameters
- **id** – (path parameter) – The ID of the message.
#### Headers
- **x-username** (header) – Get User ID from Localstorage to verify ownership.
#### Request Body
```json
{
  "messageText": "Uppdaterad text i meddelandet"
}
```
#### Response
- **200 OK** – Returns the updated message.
```json
{
  "updatedMessage": {
    "pk": "MSG",
    "sk": "123abc",
    "username": "JohnDoe",
    "messageText": "Updated message text",
    "updatedAt": "2024-10-06T13:00:00.000Z"
  }
}
```
- **403 Forbidden** – User is not allowed to update the message.
 ```json
{
  "error": "You are not allowed to update this message."
}
```
- **400 Bad Request** – Missing or invalid fields.
 ```json
{
  "error": "Both username and message text are required"
}
```
<br>

### 5. Delete a Message
**DELETE** `/messages/{id}`  
Delete a specific message by its ID.
#### Parameters
- **id** – (path parameter) – The ID of the message.
#### Headers
- **x-username** (header) – Get User ID from Localstorage to verify ownership.
#### Response
- **200 OK** – Message deleted successfully.
```json
{
  "message": "Message deleted successfully"
}
```
- **403 Forbidden** – User is not allowed to delete the message (if they try to delete someone else’s message).
```json
{
  "error": "You are not allowed to delete this message."
}
```
- **404 Not Found** – Message not found.
```json
{
  "error": "Message not found"
}
```
## Error Handling
#### Common error responses include:
- **400 Bad Request** – Invalid input or missing fields.
- **403 Forbidden** – User is not allowed to update or delete the message.
- **404 Not Found** – Resource not found.
- **500 Internal Server Error** – An unexpected error occurred.
