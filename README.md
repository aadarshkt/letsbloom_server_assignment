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
2. Choose library_database.sql file to import mock data to local server.

# Steps to interact with server

1. Go to this link to public postman workspace. If account is not availabe create postman account. <a href="https://www.postman.com/orbital-module-astronaut-928122/workspace/library-api-development/collection/13524604-4d044bb5-888e-49a4-80f4-985ae8aa94fc?action=share&creator=13524604">Link to postman workspace</a>
2. Use different files available in the workspace to interact with server.

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
3. Response is json with each book represented as JSON object containing fields of id, title, author, year_published, ISBN.
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



