# Restful Factory API

This project is an API built in Node.js, Typescript, and also using Express and Sequelize for connecting to a PostgreSQL database. The API solutions also extract Seeding data/examples of the factory and sprocket from JSON files.

## Getting started

To get started, first clone the repository to your local machine:

```bash
git clone https://github.com/oteroleonardogh/restful-factory-api.git
```

Then, navigate to the project's root directory and install the dependencies using:

```bash
npm install 
```

### Environment Variables

The project uses environment variables for configuration. You can set them by creating a .env file at the root of the project. Here are the available environment variables:

```dotenv
NODE_ENV=development
PORT=3000

LOG_LEVEL=info
LOG_ENABLED=true
LOGGER_NAME=BACKEND-TEST-API


# DB config
POSTGRES_USER=POSTGRES_USER
POSTGRES_PASSWORD=POSTGRES_PASSWORD
POSTGRES_DB=POSTGRES_DB
# Comment this line and enable the next one if you ran the in your local machine instead if using docker-compose
# or alternatively you can also add an entry in your /etc/hosts files with "127.0.0.1  db" 
POSTGRES_HOST=db
#POSTGRES_HOST=localhost
```

### Setting up the Database

To set up the database without installing PostgreSQL in your local machine, you can run it using:

```bash
docker-compose up db
```

### Running the API in your local machine

Once the dependencies are installed and the environment variables are set, you can run the API in your local machine using:

```bash
npm start
```

This will start the API in development mode. It will use [ts-node](https://github.com/TypeStrong/ts-node) to run the TypeScript files.
If you prefer to use **nodemon**, to automatically reaload after any code change, you can use:|

```bash
npm run start:dev
```

### Building for production

To build the project for production, use:

```bash
npm run build
```

This will transpile the TypeScript files to JavaScript and put them in the `dist` directory.
To start the API in production mode, use:

```bash
npm run start:prod
```

### Database Migrations

The project uses [Sequelize](https://sequelize.org/) for database migrations. To run the migrations, use:

```bash
npm run migrate
```

To undo the last migration, use:

```bash
npm run migrate:undo
```

To undo all migrations, use:

```bash
npm run migrate:undo:all
```

### Running tests

To run the tests, use:

```bash
npm test
```

### Linting

To lint the code using ESLint, use:

```bash
npm run lint
```

To automatically fix linting issues, use:

```bash
npm run lint:fix
```

## Docker

The project includes a `docker-compose.yml` file that allows for easy setup of a PostgreSQL database and the API service. The following services are defined:

- `db`: The PostgreSQL database container
- `api`: The API service container

To use the `docker-compose.yml` file, ensure that Docker is installed and running on your machine. Then, in the root directory of the project, run the following command:

```bash
docker-compose up --force-recreate --build
```

This will build the API service container and start the two containers defined in the `docker-compose.yml` file.

## Postman Collection to test endpoints

This repository contains a Postman collection in the project root folder named: postman-collection.json with a set of endpoints to test the Factory API.

The collection includes endpoints to test various functionalities of Factory API, including retrieving information about factories, and sprockets.

## Conclusion

This project is built using the following libraries and frameworks:

- `axios`: Used for making HTTP requests to the Football Data API
- `axios-rate-limit`: Used to limit the number of requests made to the Football Data API
- `crypto`: Used to generate secure tokens for the API key
- `dotenv`: Used to load environment variables
- `express`: Used as the web server framework
- `express-pino-logger`: Used for logging
- `pg`: Used as the PostgreSQL driver
- `pg-hstore`: Used to serialize and deserialize JSON data in PostgreSQL
- `pino`: Used as the logging library
- `sequelize`: Used as the ORM for PostgreSQL
- `ts-node`: Used to run TypeScript files
- `typescript`: Used as the language for the project

In addition, several devDependencies were used for testing, linting, and other development tasks. Some notable ones include:

- `jest`: used for unit testing.
- `nodemon`: used to watch for changes in the source code and automatically restart the API.
- `eslint`: used for code linting and formatting.
- `husky`: used to set up Git hooks, including pre-commit linting.
- `docker-compose`: used to set up the database and API containers in a production-like environment.

In general, the decision-making for choosing these libraries and frameworks was based on the following criteria:

- Functionality: The library or framework should provide the necessary functionality for the task at hand, such as making HTTP requests, logging, or interacting with a database.
- Ease of use: The library or framework should be easy to use and have a good documentation.
- Community support: The library or framework should have an active community with frequent updates and bug fixes.
- Performance: The library or framework should be performant and not introduce significant overhead or latency.

I also considered other factors, such as familiarity with the library or framework, popularity, and compatibility with the project's architecture and design. Overall, our choices aimed to strike a balance between functionality, ease of use, and performance while considering the specific needs of the project.

In conclusion, this project provides a boilerplate for building a RESTful API with TypeScript, Express, and PostgreSQL. The project includes testing, linting, and Docker functionality to ensure that code quality is maintained and that the API can be easily deployed to production environments.

## Feedback

If you have any feedback or questions about this project, please contact Leonardo Otero at oteroleonardo@gmail.com. Thank you!
