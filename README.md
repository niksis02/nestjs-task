## Description

This is a simple authentication api for the users created with Nest.js.

1. The project uses MVCS as the main architecture.
2. The RDBMS is MySQL. The project uses docker image as the main database.
3. Prisma is the main ORM.
4. The project does not include any unit, integration or e2e test.

## Installation

```bash
$ yarn install
```

## Instructions to run the application

1. Create .env file in the project root directory and fill with the necessary variables(see .env.local file)

```bash
# Set up the database
$ docker-compose up

# Apply the migrations
$ npx prisma db push

# Run the application

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Available API endpoints

[POST] /auth/signUp # User login
[POST] /auth/signIn # User registration
[GET] /user # Get user data
