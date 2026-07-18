import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async(req:Request,res:Response)=>{
    const payload = req.body
    const result = await UserService.createUserIntoDb(payload)
    sendResponse(res,{
        httpStatusCode: 201,
        success: true,
        message: "User creation is successful!!!",
        data: result
    })
})


export const UserController = {
    createUser
}