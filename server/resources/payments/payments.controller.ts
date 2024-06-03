import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";


export const checkout = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Genomför betalning via Stripe
}

export const retryPayment = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Hantera betalningsfel och försöka igen
}