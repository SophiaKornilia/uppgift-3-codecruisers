import express from "express";
// import dotenv from "dotenv";
var cors = require("cors");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session")
import mysql from 'mysql2/promise';
import userRoutes from "./resources/users/users.router";
import subscriptionRoutes from "./resources/subscriptions/subscriptions.router";
import contentRoutes from "./resources/content/content.router";
import paymentRoutes from "./resources/payments/payments.router";

let app = express();

const PORT: Number = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60, // 1h
    httpOnly: true,
    secure: false, 
    sameSite: "lax"
}))

// if (typeof process.env.DATABASE_URL === "string") {
//   let url: string = process.env.DATABASE_URL;

//   let connectToDatabase = (url: string): void => {
//     console.log("connectToDatabase");
//     console.log("url", url);
//   };

//   connectToDatabase(url);
// }

app.use(express.json());

// ROUTES:
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "notSecureChangeMe",
    database: "test"
  });

  const [results, fields] = await connection.query(
    'SELECT * FROM `test1`'
  );
  
  res.json(results);
  res.send("Success");
  // const db = await connectToDatabase();
  // const [results, fields] = await db.query("SELECT * FROM `pages`");
  // res.json(results);
});

// AUTH:

// INNEHÅLL:

app.post("/content", async (req, res) => {
  
});

app.listen(PORT,() => {
  console.log('The application is listening '
        + 'on port http://localhost:'+PORT);
})
