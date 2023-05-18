# About

A small and lightweight marketing competition monitoring
system for android apps.

### Technology Stack:

1. Client: NextJS and MaterialUI
2. Server: NodeJS, Express and PostgreSQL


# Environment variables

Environment variables can be added for both the client and the server project based on the intructions
given to you in the .env.example file. The environment variables are not required since the projects
revert to default values when a variable is not found.

## How to add environment variables

Follow the steps defined below in order to add environment variables correctly:

1. `cd client` or `cd server`
2. Create an .env file on the root of each project and populate the environment variables exactly as 
described in the .env.example file.


# How to run the projects in development mode

## Server Project

There are multiple ways to run this project:

### Using your local environment

Follow the steps defined below in order to run the server project:

1. Access the server folder by entering the command `cd server` on your terminal.
2. Install all required dependencies by entering the command `npm install`.
3. Make sure you have an active PostgreSQL database server running and provide your custom 
credentials in the .env file which you should create in the root of the folder.
4. Create a new database on your PostgreSQL server and provide the name of the database in 
the .env file.
5. Run the following command on the terminal `npm run start:dev`.

### Using docker

I have made it easy to run an instance of a PostgreSQL server and our server while using docker
containers. You can do that by following the steps below:

1. Make sure docker is installed and running in your system.
2. Run the following command `docker-compose up --build`.
3. The server will be initialized on port 4000 by default while the PostgreSQL server will run on port 5432.
Make sure these ports are available or simply change the docker configuration in the docker-compose.yml file.

## Client Project

Follow the steps defined below in order to run the client project:

1. Access the server folder by entering the command `cd client` on your terminal.
2. Install all required dependencies by entering the command `npm install`.
5. Run the following command on the terminal `npm run dev`.
