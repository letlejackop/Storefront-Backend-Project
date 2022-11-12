# Storefront Backend Project

## Getting Started

first of all you need to have docker installed in you machine, and perferbally use linux terminal to interact with it, and since some commands for the packages that we will install cannot work on windows terminal, please use linux terminal or command prompt.

- The port that the database will be exposed to is 5432 and the api will work on port 3000

## Database setup

- run: docker-compose up , to start the database then in the terminal write the command: docker ps , and copy the running container id for the container name storefront-backend-project-postgres-1, after that just run: docker exec -it [put id here] psql -U postgres then you will be in the database.

- Now run these commands in the database:
1- CREATE USER full_stack_user WITH PASSWORD 'password123';
2- CREATE DATABASE full_stack_dev;
3- CREATE DATABASE full_stack_test;
4- \c full_stack_dev
5- GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
   GRANT ALL ON SCHEMA public TO full_stack_user;
6- \c full_stack_test
7- GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;
   GRANT ALL ON SCHEMA public TO full_stack_user;

now the database is set.
## packages and scripts to start 

1- first of all use: npm install , to download all packages or use yarn, you can use yarn by:
npm install --global yarn

2- now download the db-migrate package to use db-migrate commands by: npm install -g db-migrate
now after setting up everything

3- now, before startign any script other than test you need to use the command in your terminal (any terminal but not windows terminal) : db-migrate --env dev up, to get all the tables in the database, 
and you can use db-migrate --env dev down if you want to take down the migrations and the tables.
you can learn more in the documentation here: https://db-migrate.readthedocs.io/en/latest/.

5- run: npm run build , to make the build and start the server.

4- there is a watch script you can run using: npm run watch or use yarn watch, you can use yarn by downloading 

5- test script using: npm run test , but makee sure to read the note below


**NOTE IMPORTANT**
when using test script make sure that in the .env file you change the ENV vatiable from dev to test or the other way around.

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
