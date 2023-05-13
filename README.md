## Description

This is a simple authentication api for the users created with Nest.js.
The project uses MVCS as the main architecture.
The RDBMS is MySQL. The project uses docker image as the main database.
Prisma is the main ORM.
The project does not include any unit, integration or e2e test.

## Installation

```bash
$ yarn install
```

## Instructions to run the application

1. Create .env file in the project root directory and fill with the necessary variables(see .env.local file)

```bash
# Set up the database
$ docker-compose up

# apply the migrations
$ npx prisma db push

# Run the application

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
