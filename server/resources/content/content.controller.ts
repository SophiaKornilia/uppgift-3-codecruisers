import connectToDatabase from "../../services/databaseConnection";

export const getContent = async (req, res) => {
    const db = await connectToDatabase();
    // Hämta innehåll baserat på prenumerationsnivå
}

export const addContent = async (req, res) => {
    const db = await connectToDatabase();
    // Lägg till innehåll (Admin)
}

export default { getContent, addContent };