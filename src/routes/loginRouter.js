import { Router } from "express";
import loginService from "../service/login.js";
const router = Router();
router.post("/", loginService.login);

export default router;
