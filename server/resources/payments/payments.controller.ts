import connectToDatabase from "../../services/databaseConnection";


export const checkout = async (req, res) => {
    const db = await connectToDatabase();
    // Genomför betalning via Stripe
}

export const retryPayment = async (req, res) => {
    const db = await connectToDatabase();
    // Hantera betalningsfel och försöka igen
}