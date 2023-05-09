# Shopping List API

This is a RESTful API for a shopping list application, built with Node.js, TypeScript, and MongoDB. It allows users to manage their shopping lists and share them with other users.

## Installation

Clone the repository and navigate to the root directory.
Run `npm install` to install the dependencies.
Run `npm run start` to start the server in development mode, or npm start to start it in production mode.

## API Endpoints

Authentication
All endpoints except for /auth/register and /auth/login require authentication. Authentication is done using JSON Web Tokens (JWT). To authenticate, include an Authorization header in the request with a value of Bearer <token>, where <token> is the JWT obtained from logging in.


## Login
Logs in a user and returns a JWT.

URL: /login
Method: POST
Data Params:
{
  "email": "<email>",
  "password": "<password>"
}

Success Response:
Status Code: 200
{
  "token": "<jwt>"
}



URL: /shopping-lists
Method: POST
Data Params:
{
  "name": "<name>",
  "items": [
    {
      "name": "<name>",
      "quantity": <quantity>
    }
  ]
}
Success Response:
Status Code: 201
Content:
{
  "id": "<id>",
  "name": "<name>",
  "items": [
    {
      "name": "<name>",
      "quantity": <quantity>
    }
  ]
}

## Gets a shopping list by ID.

URL: /shopping-lists/:id
Method: GET
URL Params:
id=<id>
Success Response:
Status Code: 200
{
  "id": "<id>",
  "name": "<name>",
  "items": [
    {
      "name": "<name>",
      "quantity": <quantity>
    }
  ]
}


## Share a shopping list with User.

URL: /share-shopping-list/:id
Method: GET
URL Params:
id=<id>
Success Response:
Status Code: 200
{
  "id": "<id>",
  "name": "<name>",
  "items": [
    {
      "name": "<name>",
      "quantity": <quantity>
    }
  ]
}




