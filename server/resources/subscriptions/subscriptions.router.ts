import { Router } from "express";
import connectToDatabase from "../../services/databaseConnection";
import { cancelSubscription, getSubscriptionId, renewSubscription, upgradeSubscription } from "./subscriptions.controller";
const router = Router();

router.get("/subscriptionId", getSubscriptionId);

router.post("/upgrade", upgradeSubscription);

router.post("/cancel", cancelSubscription);

router.post("/renew", renewSubscription);

export default router;
