import { Router } from "express";
import { getContent, addContent, getSubContent } from "./content.controller";
const router = Router();

router.post("/subBooks", getSubContent);

router.get("/", getContent);

router.post("/", addContent);

export default router;
