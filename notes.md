# bubble task

split into api and web

## api

node, express, passportjs (sessions), mongodb

-   top / node / auth-basics
-   top / node / REST
    -   don't need uniqid

### schema

#### User

    username
    password

#### Worker

    name
    owner: User
    order

#### Task

    name
    owner: User
    order
    assignedTo: Worker
    percentComplete

## web

react
