import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import initStripe from "../../stripe";
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";
import Stripe from "stripe";

interface SubscriptionLevel extends RowDataPacket {
  price: number;
  stripePriceId: string;
}

export const checkout = async (req: Request, res: Response): Promise<void> => {
  // const stripe = initStripe();

  // if (!stripe) {
  //   res.status(500).send({ error: "Stripe initialization failed" });
  //   return;
  // }
  // const { subscriptionLevel, user } = req.body;
  // // console.log("Sub level: ", subscriptionLevel);

  // const connection = await mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT),
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // });

  // console.log("Connected");

  // // Genomför betalning via Stripe
  // const [rows]: [SubscriptionLevel[], any] = await connection.query(
  //   "SELECT price, stripePriceId FROM subscriptionLevels WHERE levelId = ?",
  //   [subscriptionLevel]
  // );

  // if (rows.length === 0) {
  //   res.status(400).send({ error: "Invalid subscription level" });
  //   return;
  // }

  // const { price, stripePriceId } = rows[0];

  // console.log(price, "kr");
  // console.log("Stripe Product ID: ", stripePriceId);

  //länka produkterna i databasen till ett id i stripe
  try {
    const stripeApi = new Stripe(process.env.STRIPE_KEY as string);

    // Hämta stripePriceId baserat på subscriptionLevel

    let session = await stripeApi.checkout.sessions.create({
      //customer_email: req.session?.user?.email,
      //payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1POK1FEplf7W51DdDX7Kj16Z", // Använd pris-ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/Confirmation",
    });

    res.json(session);
    // res.status(200).send({ sessionId: session.id });
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
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

export const webhooks = async (req: Request, res: Response): Promise<void> => {
  

  switch(req.body.type) {
    case "customer.subscription.updated":
      console.log(req.body);
      break;
    default:
      console.log(req.body.type);
      break;
  }

  res.json({});
};
