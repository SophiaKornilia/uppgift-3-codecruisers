import { Router } from "express";
import {
  cancel,
  checkout,
  retryPayment,
  verifySession,
  webhooks,
} from "./payments.controller";
const router = Router();

router.post("/checkout", checkout);

router.post("/verify-session", verifySession);

router.post("/cancel", cancel);

router.post("/retry", retryPayment);

router.post("/webhooks", webhooks);
export default router;
