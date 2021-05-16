# Back-end for Voters app for hackers

This is a backend application supporting the "hackers voting app". The main functionality is to load and store logged-in user activities, hackers info and also provode authentication capability. Following are the frameworks used : -


* Express.js to enable serve backend APIs.

* JWT for API security and user REST API authentication.

* bcrypt.js to encrypt and store user credentials

* Mongoose to provide ORM layer over the backend mongo collections.

* Mongo Atlas backend database

![database](https://github.com/saschak07/image-store/blob/main/Screenshot%202021-05-16%20at%2012.19.10%20PM.png)

# APIs exposed by the voters app backend

**Login API:-**

`POST: /user/login`

Request:

```
{
    "userName": "userName",
    "password": "password"
}

```

Response:

```
{
    "token": <JWT_TOKEN>,
    "userName": "userName",
    "isAdmin": true,
    "voted": false
}
```

**Sign-up:-**


`POST: /user/signUp`


Request:

```
{
    "userName": "userName",
    "password": "password"
}

```

Response:

```
{
    "userName": "userName",
    "token": "<JWT_TOKEN>"
}
```

**Add new Hacker:-**

`POST: /hacker`


header:


`Authorization: Baisc <JWT_TOKEN>`

Request:

```
{
    "name": "Rana balu",
    "noOfChanllenges": 6,
    "expertiseLevel": 5,
    "expertIn":{
        "java": 10
    }
}

```

Response:

```
{
    "expertIn": {
        "dataStructure": 0,
        "algorithm": 0,
        "cplusplus": 0,
        "java": 10,
        "python": 0
    },
    "noOfChanllenges": 6,
    "expertiseLevel": 5,
    "votes": 0,
    "_id": "60a0c59ea88b0b001799aa2e",
    "name": "Rana balu",
    "__v": 0
}
```



