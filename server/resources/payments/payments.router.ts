import { Router } from "express";
import { checkout, retryPayment } from "./payments.controller";
const router = Router();

router.post("/checkout", checkout);

router.post("/retry", retryPayment);

export default router;
