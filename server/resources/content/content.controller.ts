import connectToDatabase from "../../services/databaseConnection";
import { Request, Response } from "express";

export const getContent = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Hämta innehåll baserat på prenumerationsnivå
}

export const addContent = async (req: Request, res: Response): Promise<void> => {
    const db = await connectToDatabase();
    // Lägg till innehåll (Admin)
}

export default { getContent, addContent };