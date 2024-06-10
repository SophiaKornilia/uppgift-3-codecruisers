import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";
import initStripe from "../../stripe";
import { RowDataPacket } from "mysql2";
import mysql from "mysql2/promise";
import Stripe from "stripe";

interface SubscriptionLevel extends RowDataPacket {
  stripePriceId: string;
}

export const checkout = async (req: Request, res: Response): Promise<void> => {
  // const stripe = initStripe();

  // if (!stripe) {
  //   res.status(500).send({ error: "Stripe initialization failed" });
  //   return;
  // }
  const { subscriptionLevel, user } = req.body;

  console.log("User: ", user);
  // // console.log("Sub level: ", subscriptionLevel);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Connected");

  // Genomför betalning via Stripe
  const [rows]: [SubscriptionLevel[], any] = await connection.query(
    "SELECT stripePriceId FROM subscriptionLevels WHERE levelId = ?",
    [subscriptionLevel]
  );
  if (rows.length === 0) {
    res.status(400).send({ error: "Invalid subscription level" });
    return;
  }

  const { stripePriceId } = rows[0];

  // console.log(price, "kr");
  console.log("Stripe Product ID: ", stripePriceId);

  //länka produkterna i databasen till ett id i stripe
  try {
    const stripeApi = new Stripe(process.env.STRIPE_KEY as string);

    // Hämta stripePriceId baserat på subscriptionLevel

    let session = await stripeApi.checkout.sessions.create({
      //customer_email: req.session?.user?.email,
      //payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId, // Använd pris-ID
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

    const stripeApi = new Stripe(process.env.STRIPE_KEY as string);

    const sessionId = req.body.sessionId;

    if (!stripeApi) {
      console.error("Stripe is not defined!");
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (!sessionId) {
      console.error("Session ID is missing!");
      res.status(400).json({ error: "Session ID is missing" });
      return;
    }

    let session: Stripe.Checkout.Session | undefined;

    try {
      session = await stripeApi.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error("Error retrieving session:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (!session) {
      console.error("Session not found!");
      res.status(404).json({ error: "Session not found" });
      return;
    }

    if (session.payment_status !== "paid") {
      console.error("Session not paid!");
      res.status(400).json({ error: "Session not paid" });
      return;
    }

    const lineItems = await stripeApi.checkout.sessions.listLineItems(
      sessionId
    );
    console.log("Lineitems: ", lineItems);

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Lägger till 7 dagar i millisekunder
    

    const order = {
      price: session.amount_total,
      email: "jennika2@gmail.com",
      //products: JSON.stringify(lineItems.data),
     // userId: session.customer_details,
      paymentStatus: "active",
      levelId: 2,
      startDate: startDate,
      endDate: endDate, // Du kan fylla i det här baserat på din logik
      isActive: true, // Du kan fylla i det här baserat på din logik
    };

    await connection.query(
      "INSERT INTO subscriptions SET ?",
      [order]
    );

    console.log("Subscription inserted successfully");
    res.status(200).json({ verified: true });
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
