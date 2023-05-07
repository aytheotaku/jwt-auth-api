# JWT AUTH API

Interacting with this api, you are able to create and authenticate clients using Json Web Tokens which are needed to perform CRUD Operations on Transactions.

<!-- The API is live at ${{will_insert_api_url}} -->

## API Authentication
---
To access certain resources and perform certain operations, a client needs to be authenticated by being registering and logging in. Resources that require authentication will be tagged with **_'authentication-needed'_** and will require you to send a request `Authorization` header with value of `Bearer token`


### Register Client

POST `/api/v1/register`

The request body needs to be in JSON format and must include the following properties

- `firstName` - String - Required
- `lastName` - String - Required
- `email` - String - Required
- `password` - String - Required
-  `repeatPassword` - String -Required  - Reference to password

Example
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
If a client is successfully created, the response object would be in the form 

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
The same goes for if an error occurred while creating the client, the only difference is that the data object would be replaced with an 'error' array containing an object with a property of 'message' which describes the nature of the array.


### Login Client

POST `/api/v1/login`

The request body needs to be in JSON format and must include the following properties

- `email` - String - Required
- `password` - String - Required

Example
```js
POST /api/v1/login

{
  "email": "tobyjohn@gmail.com"
  "password": "randompasswordbelongingtotobyjohn"
}
```
If a client is successfully logged in, the response object would be an object containing two properties - `email` which contains the email of the logged in client and  `access_token` which contains the JWT. This access_token must be sent in the Authorization Header of a request to a protected route. If the client does not send this header, the api will reject access.

Example Response
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
Create a transaction. **_'authentication-needed'_** 


