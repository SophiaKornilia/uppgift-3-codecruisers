import { Router } from "express";
import { loginUser, logoutUser, registerUser, getUser } from "./users.controller";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/getUser", getUser);

export default router;
