# JWT AUTH API

Interacting with this api, you are able to create and authenticate clients using Json Web Tokens which are needed to perform CRUD Operations on Transactions.

<!-- The API is live at ${{will_insert_api_url}} -->
## Getting Started
To get started, clone this repository to your local machine and run `npm install` to install the required dependencies. You will also need to create a `.env` file in the root directory of the project following the format in the env_example file located in the root of this repository. You can then start the server by running `npm start`.

---
## API Authentication

To access certain resources and perform certain operations, a client needs to be authenticated by being registering and logging in. Resources that require authentication will be tagged with **_'Authentication-Needed'_** and will require you to send a request `Authorization` header with value of `Bearer access_token`


### Register Client

POST `/api/v1/register`

The request body needs to be in JSON format and must include the following properties

- `firstName` - String - Required
- `lastName` - String - Required
- `email` - String - Required
- `password` - String - Required
-  `repeatPassword` - String -Required  - Reference to password

Example Request
```js
POST /api/v1/register
{
  "firstName": "Tobi",
  "lastName": "John",
  "email": "tobyjohn@gmail.com"
  "password": "randompasswordbelongingtotobyjohn",
  "repeatPassword": "randompasswordbelongingtotobyjohn"
}
```
Example, Successful Response

```js
{
  "success": "true",
  "message": "User Created",
  "status": "201"
  "data" : {
    "firstName": "tobi",
    "lastName": "john",
    "email": "tobyjohn@gmail.com"
  }
}
```
Example, Failure Response
```js
{
    "success": false,
    "message": "An error has occurred",
    "status": 409,
    "error": [
        {
            "message": "User Already Exists"
        }
    ]
}
```


### Login Client

POST `/api/v1/login`

The request body needs to be in JSON format and must include the following properties

- `email` - String - Required
- `password` - String - Required

Example Request
```js
POST /api/v1/login

{
  "email": "tobyjohn@gmail.com"
  "password": "randompasswordbelongingtotobyjohn"
}
```


Example Success Response
```js

{
  "email": "tobyjohn@gmail.com"
  "access_token": "${jwt_token_provided}"
}
```
`${jwt_token_provided}` will be the actual jwt provided by in the response. This jwt will last for 1 day from the time of logging in.

---

## Endpoints
---

### Check Api Status
GET `/api` <br> 
Returns status of api.



### Create Transaction
POST `/api/v1/transactions` <br>
Creates a transaction. **_'Authentication-Needed'_** 

The request body needs to be in JSON format and must include the following properties

- `depositorName` - String - Required
- `transactionAmount` - Number - Required

Example Request

```js
POST /api/v1/transactions
Authorization: Bearer <access_token>

{
  "depositorName": "Thomas Shelby"
  "transactionAmount": 2000
}
```

Example, Successful Response 
```js
{ 
  "success": "true",
  "message": "Transaction Created",
  "status:" 201
}
```

Example, Failed Response
```js
{
    "success": "false",
    "message": "An error has occurred",
    "status": 401,
    "error": [
        {
            "message": "Unauthorized"
        }
    ]
}
```

### Get Transactions
POST `/api/v1/transactions` <br>
Returns all transactions. **_'Authentication-Needed'_** 

### Get Transactions by filter
POST `/api/v1/transactions/` <br>
Returns all filtered transactions. **_'Authentication-Needed'_** 

The request query parameters are not required but can be added if a client wants to filter the transactions to be returned, they are: 

- `min-amount` - Number. If provided alone returns all transactions with transaction amounts greater than or equal to provided value
- `max-amount` - Number. If provided alone returns all transactions with transaction amounts less than or equal to provided value

If both `min-amount` and `max-amount` query parameters are provided, the api returns all transactions with transaction amounts between both.

- `name` - String. If provided returns transactions by name of depositor. 
<br>

### Get a Transaction
POST `/api/v1/transactions/:id` <br>
Returns a transaction. **_'Authentication-Needed'_** 

### Update a Transaction
PATCH `/api/v1/transactions/:id` <br>
Updates a transaction. **_'Authentication-Needed'_** 

The request body needs to be in JSON format and must include the following properties

- `depositorName` - String - Required
- `transactionAmount` - Number - Required

Example Request 
```js
PATCH /api/v1/transactions/:id
Authorization: Bearer <access_token>

{ 
  "depositorName": "charles winkage",
  "transactionAmount": 1500
}
```


### Delete Transaction
DELETE `/api/v1/transactions/:id` <br>
Deletes a transaction. **_'Authentication-Needed'_**