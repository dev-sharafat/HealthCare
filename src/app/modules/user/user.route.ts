import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";


const userRouter = express.Router();

userRouter.post("/",validateRequest(UserValidation.create),UserController.createUser);

export default userRouter;