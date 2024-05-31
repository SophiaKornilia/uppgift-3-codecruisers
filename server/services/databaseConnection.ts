import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};


let db: mysql.Connection;

const connectToDatabase = async () => {
  if (!db) {
    db = await mysql.createConnection(dbConfig);
  }
  return db;
};

export default connectToDatabase;
