import connectToDatabase from "../../services/databaseConnection";


export const register = async (req, res) => {
    const db = await connectToDatabase();
  // Registreringslogik
}

export const login = async (req, res) => {
    const db = await connectToDatabase();
  // Inloggningslogik
}

export const logout = (req, res) => {
    // Utloggningslogik - behöver denna vara async?
}