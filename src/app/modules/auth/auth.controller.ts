import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const registerPatient = catchAsync(async(req:Request,res:Response)=>{
    const result = await AuthService.registerUserData(req)
    sendResponse(res,{
        httpStatusCode: 201,
        success: true,
        message: "Patient registered successfully",
        data: result
    })
})
const loginPatient = catchAsync(async(req:Request,res:Response)=>{
    const result = await AuthService.loginUserData(req)
    sendResponse(res,{
        httpStatusCode: 200,
        success: true,
        message: "Patient successfully logged in!!!",
        data: result
    })
})

export const AuthController = {
    registerPatient,
    loginPatient
}