import express from "express";
import cors from "cors";
import { Pool } from "pg";
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
require("dotenv").config();
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT, // PostgreSQL default port is usually 5432
});

// Handling connection success
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

// Handling connection errors
pool.on("error", (err) => {
  console.error("Error connecting to PostgreSQL database:", err);
});

app.use("/api/books", bookRouter);

app.listen(port, () => console.log(`Server listening on ${port}`));
