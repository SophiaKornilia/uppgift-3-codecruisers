import { Router } from "express";
import { getContent, addContent, getSubContent, getNoAccessSubContent } from "./content.controller";
const router = Router();

router.post("/subBooks", getSubContent);

router.post("/noAccess", getNoAccessSubContent);

router.get("/", getContent);

router.post("/", addContent);

export default router;
