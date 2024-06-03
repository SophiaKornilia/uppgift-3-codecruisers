import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import connectToDatabase from "./services/databaseConnection";
var cors = require("cors");
const bcrypt = require("bcrypt");

dotenv.config();

let app = express();
const PORT: Number = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (typeof process.env.DATABASE_URL === "string") {
  let url: string = process.env.DATABASE_URL;

  let connectToDatabase = (url: string): void => {
    console.log("connectToDatabase");
    console.log("url", url);
  };

  connectToDatabase(url);
}

app.get("/", async (req, res) => {
  res.send("Success");

  const db = await connectToDatabase();
  const [results, fields] = await db.query("SELECT * FROM `pages`");
  res.json(results);
});

// AUTH:

app.post("/login", async (req, res) => {
  // logik för login

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
        return res.status(400).json("Wrong user or password");
      } else {
        return res.status(200).json({ isLoggedIn: true });
      }
    } else {
      console.log("no email in the db");
    }
  } catch (error) {
    console.error("Error", error);
  }

  //sätt en flagga om att vi är inloggade.
});

app.post("/logout", async (req, res) => {
  // logik för att logga ut
  return res.status(200).json({ isLoggedIn: false });
});

app.post("/register", async (req, res) => {
  let { firstName, lastName, email, address, password } = req.body;

  if (!firstName || !lastName || !email || !address || !password) {
    return res.status(400).json({ error: "All fields are required" });
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

  // logik för register
});

app.get("/subscription", async (req, res) => {
  //logik för att hämta books baserat på vilken sub level man har
});

// INNEHÅLL:

app.get("/content", async (req, res) => {
  //logik för att hämta books baserat på vilken sub level man har
});

app.post("/content", async (req, res) => {
  // logik för admin att lägga till bok
  let { title, author, text, levelId } = req.body;

  if (!title || !author || !text || !levelId) {
    return res.status(400).json({ error: "All fields are required" });
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
});

// BETALNING:

app.post("/checkout", async (req, res) => {
  // logik för att betala via stripe
});

app.post("/checkout/retry", async (req, res) => {
  // logik för att betala misslyckad betalning
});

app.post("/subscriptions", async (req, res) => {
  // logik för att hämta kunder baserat på subscriptions. kan hända att denna är onödig
});

app.post("/subscriptions/cancel", async (req, res) => {
  // logik för att avsluta prenumeration
});

app.listen(PORT, () => {
  console.log("Started");
});
