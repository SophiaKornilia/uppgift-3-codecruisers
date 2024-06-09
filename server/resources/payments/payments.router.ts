import { Router } from "express";
import {
  checkout,
  retryPayment,
  verifySession,
  webhooks,
} from "./payments.controller";
const router = Router();

router.post("/checkout", checkout);

router.post("/verify-session", verifySession);

router.post("/webhooks", webhooks);

router.post("/retry", retryPayment);

export default router;
