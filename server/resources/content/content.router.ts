import { Router } from "express";
import { getContent, addContent } from "./content.controller";
const router = Router();

router.get("/", getContent);

router.post("/", addContent);

export default router;
