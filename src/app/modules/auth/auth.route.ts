import express from "express";
import { AuthController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register",AuthController.registerPatient);
authRouter.post("/login",AuthController.loginPatient);




export default authRouter;
