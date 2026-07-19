import { NextFunction, Request, Response } from "express";
import { status } from "http-status";
import z from "zod";
import { configs } from "../config";
import { zodErrorHelper } from "../errorHelpers/zodErrorHelper";
import { IZodErrorSource } from "../Interface/errorInterFace";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (configs.NODE_ENV === "development") {
    console.log("Error from Global Error Handler !!!");
  }

  let errorSource: IZodErrorSource[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack :string = ""

  if (err instanceof z.ZodError) {
    const simplifiedError = zodErrorHelper(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = [...simplifiedError.errorSource];

  }else if(err instanceof AppError){
    statusCode = err.statusCode,
    message = err.message,
    stack = err.stack as string,
    errorSource =[{
      path:"",
      message:err.message 
    }]
  }
  
  
  
  
  else if(err instanceof Error){
    statusCode = status.INTERNAL_SERVER_ERROR,
    message = err.message,
    stack = err.stack as string
    errorSource = [{
      path:"",
      message:err.message
    }]

  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSource, 
    error: configs.NODE_ENV === "DEVELOPMENT" ? err : undefined,
    stack: configs.NODE_ENV=== "DEVELOPMENT" ? err.stack : undefined,
  });
};
