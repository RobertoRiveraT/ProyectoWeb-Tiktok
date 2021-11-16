# Getting Started with Tik Tok React App

## Create DB
Run in MariaDB or MySQL the script __tik_tok/db/create-db.sql__ to create the schema

## Set up server for back-end
```
cd tik_tok/api
pip install uvicorn
pip install fastapi
uvicorn main:app --reload
```

## Run React App
```
cd tik_tok
npm start
```
