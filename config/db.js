import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// //local db_config
// const db_config = {
//   user: "postgres",
//   host: "localhost",
//   database: "library_database",
//   password: "17291729",
//   port: "5433",
// };

const db_config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: true,
};

async function query(sqlquery, params) {
  console.log(sqlquery, params);
  try {
    //create new connection.
    const pool = new Pool(db_config);
    // Handling connection success
    pool.on("connect", () => {
      console.log("Connected to PostgreSQL database");
    });

    // Handling connection errors
    pool.on("error", (err) => {
      console.error("Error connecting to PostgreSQL database:", err);
    });

    //executed the query.
    const result = await pool.query(sqlquery, params);
    pool.end();
    return result;
  } catch (error) {
    throw new Error("error executing query " + error);
  }
}

export { query };
