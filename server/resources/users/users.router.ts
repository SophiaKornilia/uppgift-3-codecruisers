import { Router } from "express";
import { login, logout, register } from "./users.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
