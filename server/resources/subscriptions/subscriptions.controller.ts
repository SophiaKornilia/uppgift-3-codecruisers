// import connectToDatabase from "../../services/databaseConnection";
// import { Request, Response } from "express";
// import mysql from "mysql2/promise";

// export const getSubscriptionId = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//   let userEmail = req.query.userEmail;
//   const isActive = req.query.isActive === '0' ? false : true;
  
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });

//   const [rows]: [mysql.RowDataPacket[], any] = await connection.query("SELECT DISTINCT stripeSubscriptionId, isActive FROM `subscriptions` WHERE email = ? AND isActive = ?", [userEmail, isActive]);
  
//   if (Array.isArray(rows) && rows.length > 0) {
//     res.status(200).json({ subscriptionId: rows[0].stripeSubscriptionId, isActive: rows[0].isActive });
//     console.log(rows[0].stripeSubscriptionId);
//   } else {
//     res.status(404).json({ error: 'Subscription not found' });
//   }

//   // res.status(200).json({
//   //   subscriptionId: rows[0],
//   // });
// } catch (error) {
//   console.error("Something is wrong", error);
// }
// };


// import { Request, Response } from "express";
// import mysql from "mysql2/promise";

// export const getSubscriptionId = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const userEmail = req.query.userEmail as string;
//     const isActive = req.query.isActive === '0' ? 0 : 1;

//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       port: Number(process.env.DB_PORT),
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });

//     const [rows]: [mysql.RowDataPacket[], any] = await connection.query(
//       "SELECT stripeSubscriptionId, isActive FROM `subscriptions` WHERE email = ? AND isActive = ?",
//       [userEmail, isActive]
//     );

//     if (Array.isArray(rows) && rows.length > 0) {
//       res.status(200).json({ subscriptionId: rows[0].stripeSubscriptionId, isActive: rows[0].isActive });
//       console.log("Subscription found: ", rows[0].stripeSubscriptionId);
//     } else {
//       res.status(404).json({ error: 'Subscription not found' });
//     }

//     await connection.end();
//   } catch (error) {
//     console.error("Something went wrong", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


import { Request, Response } from "express";
import mysql from "mysql2/promise";

export const getSubscriptionId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = req.query.userEmail as string;
    const isActive = req.query.isActive ? (req.query.isActive === '0' ? 0 : 1) : null;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    let query = "SELECT stripeSubscriptionId, isActive FROM `subscriptions` WHERE email = ?";
    const queryParams: (string | number)[] = [userEmail];

    if (isActive !== null) {
      query += " AND isActive = ?";
      queryParams.push(isActive);
    }

    const [rows]: [mysql.RowDataPacket[], any] = await connection.query(query, queryParams);

    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json({ subscriptionId: rows[0].stripeSubscriptionId, isActive: rows[0].isActive });
      console.log("Subscription found: ", rows[0].stripeSubscriptionId);
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }

    await connection.end();
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
