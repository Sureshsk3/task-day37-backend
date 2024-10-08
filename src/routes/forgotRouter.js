import { Router } from "express";
import forgotService from "../service/Forgot.js"
const router = Router();
router.post("",forgotService.forgotPassword)
router.put("/:id/:token",forgotService.resetPassword)
router.get("/:id/:token",forgotService.verifyOtp)
export default router;
