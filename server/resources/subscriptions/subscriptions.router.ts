import { Router } from "express";
import { getSubscriptionId} from "./subscriptions.controller";
const router = Router();

router.get("/subscriptionId", getSubscriptionId);



export default router;
