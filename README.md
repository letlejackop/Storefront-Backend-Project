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