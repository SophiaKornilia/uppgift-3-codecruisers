import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import connectToDatabase from "./services/databaseConnection";
import userRoutes from "./resources/users/users.router";
import subscriptionRoutes from "./resources/subscriptions/subscriptions.router";
import contentRoutes from "./resources/content/content.router";
import paymentRoutes from "./resources/payments/payments.router";

dotenv.config();

// type test = {
//     name: string
//     id: bigint
// }

let app = express();
const PORT: Number = 3000; //varför number?

if (typeof process.env.DATABASE_URL === "string") {
  let url: string = process.env.DATABASE_URL;

  let connectToDatabase = (url: string): void => {
    console.log("connectToDatabase");
    console.log("url", url);
  };

  connectToDatabase(url);
}

// ROUTES:
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", async (req, res) => {
  res.send("Success");

  const db = await connectToDatabase();
  const [results, fields] = await db.query("SELECT * FROM `pages`");
  res.json(results);
});

// AUTH:

app.post("/login", async (req, res) => {
  // logik för login
});

app.post("/logout", async (req, res) => {
  // logik för att logga ut
});

app.post("/register", async (req, res) => {
  // logik för register
});

// INNEHÅLL:

app.get("/content", async (req, res) => {
  //logik för att hämta books baserat på vilken sub level man har
});

app.post("/content", async (req, res) => {
  // logik för admin att lägga till bok
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
