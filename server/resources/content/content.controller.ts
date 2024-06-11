import { Request, Response } from "express";
import mysql from "mysql2/promise";

export const getContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.query("SELECT * FROM `books`");

    // console.log(rows);

    res.status(200).json({
      books: rows,
    });
  } catch (error) {
    console.error("Something is wrong", error);
  }
};

export const getSubContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Hämta innehåll baserat på prenumerationsnivå

  let { user } = req.body;
  console.log("Logged in: ", user);

  const userEmail = user;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(userEmail);

    const [rows] = await connection.query(
      `SELECT DISTINCT b.* 
       FROM books b 
       JOIN subscriptions s ON b.levelid <= s.levelid 
       JOIN users u ON s.email = u.email
       WHERE u.email = ? AND s.endDate > NOW()`,
      [userEmail]
    );

    console.log(rows);

    res.status(200).json({
      books: rows,
    });
  } catch (error) {
    console.error("Something is wrong", error);
  }
};

export const getNoAccessSubContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Hämta innehåll baserat på prenumerationsnivå

  let { user } = req.body;
  console.log("Logged in: ", user);

  const userEmail = user;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(userEmail);

    const [rows] = await connection.query(
      `SELECT DISTINCT b.* 
       FROM books b 
       LEFT JOIN subscriptions s ON s.email = ? 
       WHERE s.levelId IS NULL 
          OR b.levelId > COALESCE(s.levelId, 0) 
       LIMIT 0, 25`,
      [userEmail]
    );

    console.log(rows);

    res.status(200).json({
      unavailableBooks: rows,
    });
  } catch (error) {
    console.error("Something is wrong", error);
  }
};

export const addContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  // logik för admin att lägga till bok
  let { title, author, text, levelId } = req.body;

  if (!title || !author || !text || !levelId) {
    res.status(400).json({ error: "All fields are required" });
  }

  console.log(title);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.query(
      "INSERT INTO books (title, author, text, levelId) VALUES (?, ?, ?, ?)",
      [title, author, text, levelId]
    );
  } catch (error) {
    console.error("Could not register a book", error);
  }
  res.status(200).json({ isAdded: true });
};

export default { getContent, addContent };
