import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
  // Registreringslogik
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
  // Inloggningslogik
}

export const logoutUser = (req: Request, res: Response) => {
    // Utloggningslogik - behöver denna vara async?
}