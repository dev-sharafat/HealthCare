import express from "express";
import { UserController } from "./user.controller";


const userRouter = express.Router();

userRouter.post("/",UserController.createUser);

export default userRouter;