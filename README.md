# Project Overview

This project is a simplified TikTok clone built with React for the front-end and FastAPI for the back-end. It supports user registration, authentication, video browsing, likes and comments.

### Technology Stack
- React and React Router
- FastAPI with Uvicorn
- MariaDB/MySQL
- Node.js and npm

## Video Presentation

You can see the working project [here](https://drive.google.com/file/d/1n3a9NlVVKxmXFOwareGjA81LPaJz9Fyx/view?usp=sharing)

# Getting Started with Tik Tok React App

## Create DB
Run in MariaDB or MySQL the script __tik_tok/db/create-db.sql__ to create the schema

## Set up server for back-end
Change to **tik_tok/api** directory
```
cd tik_tok/api
```

Create a file called **config.py** and add a variable **DB_HOST** assigned to the address of the DB
```
DB_HOST = "127.0.0.1"
```

Start the server
```
pip install uvicorn
pip install fastapi
pip install mysql-connector-python
uvicorn main:app --reload
```

## Run React App
```
cd tik_tok
npm install
npm start
```
