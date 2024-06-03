import { Router } from "express";
import connectToDatabase from "../../services/databaseConnection";
import { cancelSubscription, getSubscriptions, renewSubscription, upgradeSubscription } from "./subscriptions.controller";
const router = Router();

router.get("/", getSubscriptions);

router.post("/upgrade", upgradeSubscription);

router.post("/cancel", cancelSubscription);

router.post("/renew", renewSubscription);

export default router;
