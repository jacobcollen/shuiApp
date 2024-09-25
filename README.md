# Shui backend API

This is a serverless API endpoint documentation for Shui application.
Built with AWS Lambda, DynamoDB and Node.js using ES6 modules.

## API Endpoints

### Headers
- Content-Type: application/json

## User endpoints:

### GET _/messages_
- Fetch all messages.

**URL:** GET  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/messages`

_Response:_
```json
{
  "messages": [
    {
      "username": "testuser",
      "text": "Hello, World!",
      "createdAt": "2024-09-25T01:30:44.141Z"
    }
  ]
}
```

### POST ***/messages***  
- Create a new message (requires `username` and `text`).  

**URL:** POST  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/messages`  

_Example Request Body:_
```json
{
"username": "testuser",
"text": "Hello, World!"
}
```
_Response:_
```json
{
  "newMessage": {
    "pk": "MESSAGE",
    "sk": "xxxxxx",
    "username": "testuser",
    "text": "Hello, World!",
    "createdAt": "2024-09-25T01:30:44.141Z"
  }
}
```

### PUT ***/messages/{id}***  
-Update an message (requires `id` and `text`).  

**URL:** PUT  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/messages/{id}`  

_Example Request Body:_
```json
{
"text": "Updated text"
}
```
_Response:_
```json
{
  "updatedMessage": {
    "pk": "MESSAGE",
    "sk": "xxxxxx",
    "username": "testuser",
    "text": "Updated text",
    "createdAt": "2024-09-25T01:30:44.141Z",
    "updatedAt": "2024-09-25T01:40:00.000Z"
  }
}
```

### DELETE ***/messages/{id}***  
- Delete a message (requires `id`).
  
**URL:** DELETE  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/messages/{id}`  

_Response:_  
`204 No Content` if delete is successfull.

## Admin endpoints:

### GET ****/admin/messages****  
- Fetch all messages.
  
**URL:** GET  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/admin/messages`  

_Response:_
```json
{
  "messages": [
    {
      "pk": "MESSAGE",
      "sk": "xxxxxx",
      "username": "testuser",
      "text": "Hello, World!",
      "createdAt": "2024-09-25T01:30:44.141Z"
    }
  ]
}
```

### GET ***/admin/messages/{username}***  
- Fetch messages by username
  
**URL:** GET  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/admin/messages/{username}`  

_Response:_
```json
{
  "messages": [
    {
      "pk": "MESSAGE",
      "sk": "xxxxxx",
      "username": "testuser",
      "text": "Hello, World!",
      "createdAt": "2024-09-25T01:30:44.141Z"
    }
  ]
}
```
  
### DELETE ***/admin/messages/{id}***  
- Delete any message  

**URL:**  DELETE  
`https://k2lrugk7kg.execute-api.eu-north-1.amazonaws.com/admin/messages/{id}`  

_Response:_  
`204 No Content` if delete is successfull.
