import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import mysql from "mysql2/promise";
const bcrypt = require("bcrypt");

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { firstName, lastName, email, address, password } = req.body;

  if (!firstName || !lastName || !email || !address || !password) {
    res.status(400).json({ error: "All fields are required" });
  }

  console.log(firstName);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    //KATODO: Kolla så användare in finns i db.
    // const existingUsers = await connection.query(
    //   "SELECT * FROM users WHERE email = ?",
    //   [email]
    // );

    // if (existingUsers) {
    //   return res.status(400).json({ error: "User already exists, try to log in" });
    // }
    //Kryptera lösenordet:
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await connection.query(
      "INSERT INTO users (firstName, lastName, email, address, password, isAdmin) VALUES (?, ?, ?, ?, ?,?)",
      [firstName, lastName, email, address, hashedPassword, false]
    );
  } catch (error) {
    console.error("Could not register a user", error);
  }
  res.status(200).json({ isRegistered: true });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  let { email, password } = req.body;
  console.log("email and password", email, password);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    //kolla i databasen om det finns någon mail som matchar
    const [rows]: [mysql.RowDataPacket[], any] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];
      console.log("Email är", user.email, "Lösenordet är", user.password);

      //jämför lösenorde med det haschade lösenordet i db.
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(400).json("Wrong user or password");
      } else {
        res.status(200).json({ isLoggedIn: true });
      }
    } else {
      console.log("no email in the db");
    }
  } catch (error) {
    console.error("Error", error);
  }

  //sätt en flagga om att vi är inloggade.
};

export const logoutUser = (req: Request, res: Response) => {
  // Utloggningslogik - behöver denna vara async?
  // logik för att logga ut
  return res.status(200).json({ isLoggedIn: false });
};

export const getUser = async (req: Request, res: Response) => {
  // hämta användarens id för att kolla vilken prenumerationsnivå.
  let { user } = req.body;
  console.log("user is", user);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    //kolla i databasen om det finns någon mail som matchar och hämta id
    const [rows]: [mysql.RowDataPacket[], any] = await connection.query(
      // "SELECT userId FROM users WHERE email = ?",
      // [user]
      "SELECT users.userId, subscriptions.* FROM users LEFT JOIN subscriptions ON users.userId = subscriptions.userId WHERE users.email = ?",
  [user]
    );

    console.log(user, rows[0].userId);
  
    if (rows.length > 0 && rows[0].subscriptionId) {
      console.log("Användaren har en prenumeration");
      res.status(200).json({ isASubscriber: true });
    } else {
      console.log("Användaren har ingen prenumeration");
      res.status(400).json({ isASubscriber: false });
    }
  } catch (error) {
    console.error("Error", error);
  }
};
