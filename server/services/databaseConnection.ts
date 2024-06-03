import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};


let db: Connection;

const connectToDatabase = async (): Promise<Connection> => {
  if (!db) {
    db = await mysql.createConnection(dbConfig);
    console.log("Connected to the database");
  }
  return db;
};

export default connectToDatabase;
