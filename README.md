
# Node.js User Management System

## Overview

This is a simple User Management System built using **Node.js** without the use of any frameworks like **Express.js**. The system allows users to:

- Submit user data (First Name and Last Name).
- Retrieve a list of stored users.
- Manage the data via file storage, simulating a simple database system.

## Features

- **User Registration**: Allows users to submit their First Name and Last Name, which will be stored in a text file.
- **User Retrieval**: Displays a list of all stored users in JSON format.
- **Data Persistence**: User data is saved and retrieved dynamically using file storage.
- **Error Handling**: Handles invalid inputs, missing data, and file read/write errors.
- **Proper HTTP Responses**: Returns proper HTTP status codes (200, 201, 400, 404, 500).

## Requirements

- **Node.js** (v14 or higher)
- **Postman** (or similar tool) for API testing

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/Sudip200/Node-assignment-1/
    ```

2. Navigate to the project directory:

    ```bash
    cd node-assignment-1
    ```

3. Install the dependencies (if any):

    ```bash
    npm install
    ```

    Note: In this case, there are no external dependencies as the code is built using pure Node.js.

## Running the Application

1. Start the Node.js server:

    ```bash
    node server.js
    ```

2. The server will be running on **http://localhost:3000**.

## API Endpoints

### 1. **Home Route**: `GET /`

- **Description**: Displays a welcome message.
- **Response**: Returns `200 OK` with a greeting message.
- **Example**:
  
    ```json
    "Welcome to employee management"
    ```

### 2. **Add User**: `POST /add-user`

- **Description**: Submits user data (First Name and Last Name) and stores it in a file. Prevents duplicate entries.
- **Request Body** (JSON format):

    ```json
    {
        "firstname": "John",
        "lastname": "Doe"
    }
    ```

- **Response**: 
  - **201 Created** if the user is successfully added.
  - **400 Bad Request** if any field is empty.
  - **409 Conflict** if the user already exists.
  - **500 Internal Server Error** if there’s an issue with file writing.

### 3. **User List**: `GET /users`

- **Description**: Retrieves a list of all stored users in JSON format.
- **Response**:
  - **200 OK** with a list of users.
  - **404 Not Found** if no users are stored.

### 4. **404 Not Found**: Any undefined route will return a **404** status code with a "Not Found" message.

## Error Handling

The application handles errors like:

- **Invalid input**: Returns `400 Bad Request` when the First Name or Last Name fields are missing.
- **Duplicate user**: Returns `409 Conflict` if the user already exists in the database (text file).
- **File read/write errors**: Returns `500 Internal Server Error` when there's an issue with file operations.
- 
```

## Status Codes Used

- **200 OK**: Successfully processed the request (e.g., Home route, User list).
- **201 Created**: Successfully created a new user.
- **400 Bad Request**: Invalid request (e.g., empty fields).
- **404 Not Found**: No users found or an invalid route accessed.
- **409 Conflict**: Duplicate user found (same First Name and Last Name).
- **500 Internal Server Error**: Server-side error, typically related to file operations.
