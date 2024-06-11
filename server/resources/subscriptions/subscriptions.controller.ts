import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import mysql from "mysql2/promise";

export const getSubscriptionId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  let userEmail = req.query.userEmail;
  const isActive = req.query.isActive === 'false' ? false : true;
  
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows]: [mysql.RowDataPacket[], any] = await connection.query("SELECT DISTINCT stripeSubscriptionId, isActive FROM `subscriptions` WHERE email = ? AND isActive = ?", [userEmail, isActive]);
  
  if (Array.isArray(rows) && rows.length > 0) {
    res.status(200).json({ subscriptionId: rows[0].stripeSubscriptionId, isActive: rows[0].isActive });
  } else {
    res.status(404).json({ error: 'Subscription not found' });
  }

  // res.status(200).json({
  //   subscriptionId: rows[0],
  // });
} catch (error) {
  console.error("Something is wrong", error);
}
};

export const upgradeSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Uppgradera prenumeration
  console.log("test1");
};

export const cancelSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await connectToDatabase();
  // Avsluta prenumeration
};

export const renewSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await connectToDatabase();
  // Betala förnyelse
};
