import { NextFunction, Request, Response } from "express";
import { status } from "http-status";
import z from "zod";
import { configs } from "../config";
import { zodErrorHelper } from "../errorHelpers/zodErrorHelper";
import { IZodErrorSource } from "../Interface/errorInterFace";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (configs.node_env === "development") {
    console.log("Error from Global Error Handler !!!");
  }

  let errorSource: IZodErrorSource[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";

  if (err instanceof z.ZodError) {
    const simplifiedError = zodErrorHelper(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = [...simplifiedError.errorSource];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSource, 
    error: configs.node_env === "DEVELOPMENT" ? err : undefined,
  });
};
