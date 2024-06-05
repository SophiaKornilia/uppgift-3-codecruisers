import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import initStripe from "../../stripe";
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";

interface SubscriptionLevel extends RowDataPacket {
  price: number;
}

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const stripe = initStripe();
  if (!stripe) {
    res.status(500).send({ error: "Stripe initialization failed" });
    return;
  }
  const { subscriptionLevel } = req.body;
  console.log("Sub level: ", subscriptionLevel);

  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "notSecureChangeMe",
    database: "codeCruisersWebShop",
  });

  console.log("Connected");

  // Genomför betalning via Stripe
  const [rows]: [SubscriptionLevel[], any] = await connection.query(
    "SELECT price FROM subscriptionLevels WHERE levelId = ?",
    [subscriptionLevel]
  );

  if (rows.length === 0) {
    res.status(400).send({ error: "Invalid subscription level" });
    return;
  }

  const price = rows[0].price;

  console.log(price, "kr");

  //länka produkterna i databasen till ett id i stripe 
  try {
    const session = await stripe.checkout.sessions.create({
    customer: req.session.user.email,
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: subscriptionLevel,
            },
            unit_amount: price * 100, // Stripe requires the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/Confirmation",
      cancel_url: `http://localhost:5173/cancel`,
    });

    
    res.status(200).send({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).send({ error: "Failed to create Stripe checkout session" });
  }
};

export const verifySession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3307,
      password: "notSecureChangeMe",
      database: "codeCruisersWebShop",
    });
    console.log("Connected verify");
    // Hantera betalningsfel och försöka igen
    const stripe = initStripe();
    console.log("CC Nu kommer jag hit!!!!!!");

    const sessionId = req.body.sessionId;

    if (stripe) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          sessionId
        );
        console.log("Lineitems: ", lineItems);

        const order = {
          price: session.amount_total,
          products: JSON.stringify(lineItems.data),
          userId: session.customer_details,
          startDate: new Date(),
          endDate: null, // Du kan fylla i det här baserat på din logik
          isActive: true, // Du kan fylla i det här baserat på din logik
        };

       const sql = "INSERT INTO subscriptions SET ?";
        await connection.execute(sql, order); // Använd execute-metoden för att köra SQL-frågan
        console.log("Subscription inserted successfully");
        res.status(200).json({ verified: true });
      }
    } else {
      console.error("Stripe is not defined!");
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const retryPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await connectToDatabase();
  // Hantera betalningsfel och försöka igen
  const stripe = initStripe();
};
