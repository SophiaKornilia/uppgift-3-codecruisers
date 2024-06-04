import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import mysql from "mysql2/promise";

export const getContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await connectToDatabase();
  // Hämta böcker utanför pernumerationsnivå
};

export const getSubContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Hämta innehåll baserat på prenumerationsnivå

  let {loggedInUser} = req.body;
  console.log(loggedInUser);

  res.status(200).json([
    {
      isASubscriber: true,
      title: "Some Book Title",
      author: "Some Author",
      text: "Some text content of the book",
    },
  ]);
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
