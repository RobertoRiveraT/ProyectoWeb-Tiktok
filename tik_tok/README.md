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
uvicorn main:app --reload
```

## Run React App
```
cd tik_tok
npm start
```
