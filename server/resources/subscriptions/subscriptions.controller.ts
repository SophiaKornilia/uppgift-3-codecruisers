import connectToDatabase from "../../services/databaseConnection";


export const getSubscriptions = async (req, res) => {
    const db = await connectToDatabase();
  // Hämta prenumerationsnivåer
}

export const upgradeSubscription = async (req, res) => {
    const db = await connectToDatabase();
    // Uppgradera prenumeration
}

export const cancelSubscription = async (req,  res) => {
    const db = await connectToDatabase();
  // Avsluta prenumeration
}

export const renewSubscription = async (req, res) => {
    const db = await connectToDatabase();
  // Betala förnyelse
}