import { Router } from "express";
import UserService from "../service/UserService.js";
import verifyUser from "../middleware/verifyUser.js";
const userRouter = Router();

userRouter.get("/:id", verifyUser, UserService.userOne);
userRouter.post("/", UserService.createUser);

export default userRouter;
