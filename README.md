# Fitness App Backend

This is the backend for a fitness app that allows users to track their fitness activities and progress. It is built using Node.js and Express, with a MySQL database for data storage.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
  
## Introduction

The fitness app backend provides core functionalities like user registration, login, user management, and activity tracking. It utilizes JWT (JSON Web Tokens) for user authentication and authorization. The MySQL database is used to store user and activity data securely.

## Requirements

To run the backend, you need to have the following installed:

- Node.js
- MySql

## Getting Started

To get started with the backend, follow these steps:

1. Clone the repository:

https://github.com/srikrishnas/FitBasix-Backend.git


2. Install dependencies:

npm install

3. Set up environment variables:

Create a `.env` file in the root directory with the following content:

DB_HOST = *****
DB_USER = *****
DB_PASSWORD = *****
DB_NAME = *****
PORT = 3000
JWTSECRET = ***

Add the requlired details

## Run Scripts from /sql -> to setup in local

1. users.sql
2. activity.sql

## USE postman collections -> postman_collections.json

1. Here you get all the required API end points for local.

## Usage

To start the backend server, run:

npm start

The server will start running on http://localhost:3000.

## API

1. Register 

2. Login

- Get JWT and then can be used for rest of the api's

