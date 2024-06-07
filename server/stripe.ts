import Stripe from 'stripe';

const initStripe = (): Stripe | undefined => {
    const apiKey = process.env.STRIPE_KEY as string;
    if (!apiKey) return;
    return new Stripe(apiKey, {
        apiVersion: '2024-04-10', // Uppdaterad till senaste versionen
    });
};

export default initStripe;
