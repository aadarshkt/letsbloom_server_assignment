import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;
import bookRouter from "./routes/bookRoutes.js";
import { configDotenv } from "dotenv";

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
