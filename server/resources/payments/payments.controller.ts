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
    console.log(subscriptionLevel);

    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    // Genomför betalning via Stripe
    const [rows]: [SubscriptionLevel[], any] = await connection.query('SELECT price FROM subscriptionLevels WHERE levelId = ?', [subscriptionLevel]);
    
    if (rows.length === 0) {
        res.status(400).send({ error: 'Invalid subscription level' });
        return;
    }
    

    const price = rows[0].price;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'sek',
                        product_data: {
                            name: subscriptionLevel,
                        },
                        unit_amount: price * 100, // Stripe requires the amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`,
        });

        res.status(200).send({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).send({ error: 'Failed to create Stripe checkout session' });
    }
};



export const retryPayment = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Hantera betalningsfel och försöka igen
    const stripe = initStripe();
}