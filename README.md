# Node.js Backend for GitHub

This is a Node.js backend template for creating a database-driven application. It uses MySQL as the database, and you can configure the database connection by providing a `db.config.js` file.

## Prerequisites

Before you get started, ensure you have the following dependencies installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)

## Getting Started

1. Clone this repository to your local machine:

git clone https://github.com/oscarvel821/CS490-individual-backend/tree/development
cd CS490-individual-backend

## Install the project dependencies by running:

2. npm install

## Create a directory in the app directory called config then create a db.config.js file in the config directory with the following content:

module.exports = {
    HOST: 'your-local-host',
    USER: 'your-root-user-for-sql',
    PASSWORD: 'your-sql-password',
    DB: 'sakila'
};

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
With Nodemon on localhost:3001 or your environment localhost 

### `npm test`

Runs the test Cases with Jest and Supertest