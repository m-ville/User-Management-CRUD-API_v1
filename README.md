# User-Management-CRUD-API
- It's a User Management api, which can do CRUD operations. 
- It's built on `REST` api architecture.
- It's using `mongoDB atlas` for storing the data.
- Below is the description table. 

> A user can be created with by providing **username(unique + required), password (required), name, phone** (using  x-www-form-urlencoded, se SS below).

>Format : `{HostedURL}/{endPointURL}`

|   Task       |     Method/HTTP Verb      |    Path/ Endpoint URL      |
| :---------   |     :--------------:      |     :---------------:      |
| 1. Create a User ( se SS below. )        | POST |  `/users`  |
| 2. Update a user by username (except usename field).     | PATCH  |  `/users/{username}` |
| 3. Get details of a user based on username.              | GET    | `/users/{username}`  |
| 4. Get details of all the users.                         | GET    | `/users`             |
| 5. Delete a user based on username.                      | DELETE | `/users/{username}`  |
| 5. Delete all the users.                                 | DELETE | `/users`             |


## Demo/Usuge
> **1. Creating a user :**
> ![InkedUser Management CRUD API - Create User_LI](https://user-images.githubusercontent.com/94619482/159142923-4db5740d-4c01-43a0-ada0-7a589ebee6a4.jpg)
