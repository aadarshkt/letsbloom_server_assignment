import mysql from "mysql2/promise";

async function query(sqlquery, params) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "library_database",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }
    console.log("Connected to the database as ID " + connection.threadId);
  });

  try {
    const [results] = await connection.execute(sqlquery, params);
    return results;
  } catch (error) {
    throw new Error("error executing query " + error);
  }
}

export default query;
