import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";

export const getSubscriptions = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
  // Hämta prenumerationsnivåer
}

export const upgradeSubscription = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Uppgradera prenumeration
}

export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
  // Avsluta prenumeration
}

export const renewSubscription = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
  // Betala förnyelse
}