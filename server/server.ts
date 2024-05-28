import express from "express";
import mysql from "mysql2/promise";

// type test = {
//     name: string
//     id: bigint
// }

let app = express();
const PORT: Number = 3000; //varför number?

app.get("/", async (req, res) => {
  res.send("Success");

  let db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "notSecureChangeMe",
    database: "test",
  });

  const [results, fields] = await db.query("SELECT * FROM `pages`");
  console.log(results, fields);
});

app.listen(PORT, () => {
  console.log("Started");
});
