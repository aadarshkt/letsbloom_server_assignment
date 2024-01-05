import mysql from "mysql2/promise";
import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT, // PostgreSQL default port is usually 5432
});

async function query(sqlquery, params) {
  try {
    const [results] = await pool.execute(sqlquery, params);
    pool.end();
    return results;
  } catch (error) {
    throw new Error("error executing query " + error);
  }
}

export default query;
