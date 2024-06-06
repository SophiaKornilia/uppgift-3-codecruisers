import { Router } from "express";
import { checkout, retryPayment, verifySession } from "./payments.controller";
const router = Router();

router.post("/checkout", checkout);

router.post("/verify-session", verifySession)

router.post("/retry", retryPayment);

export default router;
