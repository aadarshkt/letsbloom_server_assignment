import pkg from "pg";
const { Pool } = pkg;
import { configDotenv } from "dotenv";

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
