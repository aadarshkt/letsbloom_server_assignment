import express from "express";
import cors from "cors";
import { createConnection } from "mysql2";
import bookRouter from "./routes/bookRoutes.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//create database connection
const connection = createConnection({
  host: "localhost",
  user: "root",
  database: "library_database",
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as ID " + connection.threadId);
});

app.use("/api/books", bookRouter);

app.listen(port, () => console.log(`Server listening on ${port}`));
