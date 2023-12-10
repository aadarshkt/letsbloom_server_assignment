# Table of contents

1. [Steps to run application](#Steps-to-run-application)
2. [Steps to load mock data](#Steps-to-load-mock-data)
3. [Steps to interact with server](#Steps-to-interact-with-server)
4. [Database design](#Database-design)
5. [API endpoints](#API-endpoints)
6. [Validation](#Validation)

# Steps to run application

1. Clone the project to local machine at any location using following command
   ```
   git clone https://github.com/aadarshkt/letsbloom_server_assignment.git
   cd letsbloom_server_assignment
   ```
2. If node is not available, download it from here. https://nodejs.org/en/download/
3. Run following command to install packages.
   ```
   npm install
   ```
4. Download XAMPP server to host local mySQL database from here. https://www.apachefriends.org/download.html
5. Start the mySQL and apache web server.
   <br />
   <br />
   <img width="336" alt="Screenshot 2023-12-09 at 18 21 37" src="https://github.com/aadarshkt/letsbloom_server_assignment/assets/72285744/323a23d8-2cb4-47a1-b91b-8c5d2d4a8972">
   
6. To start the server on localhost, use following command
   ```
   npm start
   ```
7. The server will start running at port 8080, terminal will show the following.
   ```
   Server listening on 8080
   Connected to the database as ID [your_id]
   ```
8. The application is running.

# Steps to load mock data

1. Go to this link to import database to local server. <a href="http://localhost/phpmyadmin/index.php?route=/server/import">Link to phpMyAdmin</a>
2. Choose library_database.sql file from github repository to import mock data to local server.

# Steps to interact with server

1. Go to this link to public postman workspace. If account is not availabe create postman account. <a href="https://www.postman.com/orbital-module-astronaut-928122/workspace/library-api-development/collection/13524604-4d044bb5-888e-49a4-80f4-985ae8aa94fc?action=share&creator=13524604">Link to postman workspace</a>
2. Use different files available in the workspace to interact with server.

Other way is to use curl commands in terminal to interact with server as specified in the API endpoint section.

# Database design

1. books table has five columns. id, title, author, year_published, ISBN.
2. id is the primary key with auto_increment property.
   <br />
   <br />
   <img width="595" alt="Screenshot 2023-12-09 at 19 30 08" src="https://github.com/aadarshkt/letsbloom_server_assignment/assets/72285744/ed191283-1ed9-4a75-825a-55ba674c3974">


# API endpoints

<h3>Get all books</h3>

1. Postman workspace has get all books folder, click on the send button to get all books from the database. Example response is given below.
   <br /><br />
2. API endpoint.
   ```
   http://localhost:8080/api/books
   ```
3. curl command
   ```
   curl http://localhost:8080/api/books
   ```
4. Response is array of json objects containing fields of id, title, author, year_published, ISBN.
   ```
   [
      {
         "id" : 1,
         "title" : "book's title",
         "author" : "book's author",
         "year_published" : "publication year",
         "ISBN" : "10 digit international standard book number"
      }
   ]
   ```
   <img width="530" alt="Screenshot 2023-12-09 at 19 37 13" src="https://github.com/aadarshkt/letsbloom_server_assignment/assets/72285744/851b6931-c87e-40e6-b3e3-7e09f0846442">

<h3>Create new book</h3>

1. API end point
   ```
      http://localhost:8080/api/books
   ```

2. req.body of create book request. Go to post book file of postman workspace. Use body tab of workspace and send the below format data to create a book in the database
   ```
   {
       "title": "Life 3.0",
       "author": "Max Tegmark",
       "year_published": "2017",
       "ISBN" : "978-1-101-94659-6"
   }
   ```
3. curl command
   ```
   curl -X POST -H "Content-Type: application/json" -d '{
    "title": "Life 3.0",
    "author": "Max Tegmark",
    "year_published": "2017",
    "ISBN" : "978-1-101-94659-6"
   }' http://localhost:8080/api/books
   ```
5. Response is returned in following format.
   ```
   {
       "fieldCount": 0,
       "affectedRows": 1,
       "insertId": 15,
       "info": "",
       "serverStatus": 2,
       "warningStatus": 0,
       "changedRows": 0
   }
   ```
6. Affected rows one means that data is successfully inserted in the database.
7. Referesh the phpMyAdmin database link to see updated data as below.
   <br /><br />
   <img width="610" alt="Screenshot 2023-12-09 at 20 17 34" src="https://github.com/aadarshkt/letsbloom_server_assignment/assets/72285744/a11c43ae-334c-476e-9fb9-aa5899fd0698">

<h3>Update book</h3>

1. API endpoint
   ```
      http://localhost:8080/api/books?id=16
   ```
2. curl command
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Life 3.0",
    "author": "Max Erik Tegmark",
    "year_published": "2017",
    "ISBN" : "978-1-101-94659-6"
   }' http://localhost:8080/api/books
   ```
4. Go to put book file of postman workspace. Use body tab of workspace and send the below request using the send button.
   ```
   {
       "title": "Life 3.0",
       "author": "Max Erik Tegmark",
       "year_published": "2017",
       "ISBN" : "978-1-101-94659-6"
   }
   ```

5. Response format.
   ```
   {
       "fieldCount": 0,
       "affectedRows": 1,
       "insertId": 0,
       "info": "Rows matched: 1  Changed: 1  Warnings: 0",
       "serverStatus": 2,
       "warningStatus": 0,
       "changedRows": 1
   }
   ```
6. If affectedRows has value 1 means book is successfully updated.

# Validation

<h3>Empty field validation</h3>

1. When making a create or update request if any of the fields is empty, server will return 400 bad request response as follows. In following request author is empty.
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Life 3.0",
    "author": "",                
    "year_published": "2017",
    "ISBN" : "978-1-101-94659-6"
   }' http://localhost:8080/api/books
   ```
2. Response is in following format
   ```
   {
       "errors": [
           {
               "type": "field",
               "value": "",
               "msg": "author not valid",
               "path": "author",
               "location": "body"
           }
       ]
   }
   ```
3. Location of error is req.body and path represents the value that is empty.

<h3>Empty query parameter validation</h3>

1. When making a update request if the query parameter is empty, error is returned.
   ```
   {
       "title": "Life 3.0",
       "author": "2018",
       "year_published": "2017",
       "ISBN" : "978-1-101-94659-6"
   }
   ```
2. Error response format.
   ```
   {
       "errors": [
           {
               "type": "field",
               "value": "",
               "msg": "Id not valid",
               "path": "id",
               "location": "query"
           }
       ]
   }
   ```
3. location value represents that req.query is empty.

<h3>Year validation</h3>

1. In create or update request the year should be in range of 868 to 2023. If following request is sent.
   ```
   {
      	 "title": "Life 3.0",
          "author": "Max Erik Tegmark",
          "year_published": "2024",
          "ISBN" : "978-1-101-94659-6"
   }
   ```
2. Error response is returned in following format.
   ```
   {
       "errors": [
           {
               "type": "field",
               "value": "2024",
               "msg": "Year range is wrong",
               "path": "year_published",
               "location": "body"
           }
       ]
   }
   ```
3. Path and location field in error response represents that error has happened in req.body with field year_published.

   

